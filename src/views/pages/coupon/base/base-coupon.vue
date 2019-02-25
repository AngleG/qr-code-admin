<template>
    <div class="base-coupon" v-if="requestParams">
      <div class="base-coupon_upload">
        <div class="file-box"><img width="100%" height="100%" :src="couponCacheUrl" v-if="couponCacheUrl"></div>
        <input @change="getCacheFile" type="file" accept="image/png,image/jpeg,image/gif" name="file" id="file" style="visibility: hidden;width: 0;height: 0;">
        <label for="file"><span style="font-size: 14px;color: #409EFF;cursor: pointer;">浏览..</span></label>
        <el-button class="upload-btn" type="primary" size="small" round @click="upload">上传产品图</el-button>
      </div>
      <div class="base-coupon_form">
        <p><el-input size="small" style="width: 50%;" v-model="requestParams.name" maxlength="50"></el-input></p>
        <p>当前折扣:
          <el-input size="small" style="width: 50px;" v-model="requestParams.discount"></el-input> 折(0折表示原价)
        </p>
        <p>
          <el-date-picker
            size="small"
            v-model="requestParams.nextdiscountdate"
            type="date"
            format="yyyy/MM/dd"
            value-format="yyyy/MM/dd"
            placeholder="选择日期">
          </el-date-picker>
          后(含当天)折扣为
          <el-input size="small" style="width: 50px;" v-model="requestParams.nextdiscount"></el-input> 折
        </p>
        <p>原价:
          <el-input size="small" style="width: 105px;" v-model="requestParams.value"></el-input> 元
        </p>
        <p>
          <el-date-picker
            size="small"
            v-model="requestParams.timeon"
            type="date"
            format="yyyy/MM/dd"
            value-format="yyyy/MM/dd"
            placeholder="选择日期">
          </el-date-picker>
          上架(含当天)
        </p>
        <p>
          <el-date-picker
            size="small"
            v-model="requestParams.timeoff"
            type="date"
            format="yyyy/MM/dd"
            value-format="yyyy/MM/dd"
            placeholder="选择日期">
          </el-date-picker>
          下架(含当天)
        </p>
        <el-button class="confirm" type="primary" size="small" round @click="saveHandle">保存修改</el-button>
      </div>
    </div>
</template>

<script>
  import webApi from '../../../../lib/api'
    export default {
      name: "base-coupon",
      props: {
        couponDetail: {
          type: Object,
          require: true
        }
      },
      data () {
        return {
          requestParams: null,
          paramsDefault: {
            loginkey: localStorage.getItem('loginkey') ? JSON.parse(localStorage.getItem('loginkey')).loginkey : '',
            eid: localStorage.getItem('loginkey') ? JSON.parse(localStorage.getItem('loginkey')).eid : ''
          },
          couponCacheUrl: null,
          couponFile: null
        }
      },
      created(){
        this.requestParams = JSON.parse(JSON.stringify(this.couponDetail));
        delete this.requestParams.couponid;
        this.requestParams = Object.assign({}, this.requestParams, this.paramsDefault);
      },
      methods: {
        /**
         * 保存修改
         */
        async saveHandle(){
          let res = await webApi.modifyCoupon(this.requestParams);
          if(res.flags === 'success'){
            this.$toast("修改成功，立即生效", 'success');
            this.$emit('callback');
          }else {
            this.$toast(res.message, 'error');
          }
        },
        /**
         * 获取上传文件信息
         * @param event
         */
        getCacheFile(event){
          let files = event.target.files[0];
          this.couponCacheUrl = this.getObjectURL(files);
          this.couponFile = files;
        },
        /**
         * 兼容性获取图片本地缓存地址
         * @param file
         * @returns {*}
         */
        getObjectURL(file) {
          let url = null;
          // 下面函数执行的效果是一样的，只是需要针对不同的浏览器执行不同的 js 函数而已
          if (window.createObjectURL) { // basic
            url = window.createObjectURL(file)
          } else if (window.URL) { // mozilla(firefox)
            url = window.URL.createObjectURL(file)
          } else if (window.webkitURL) { // webkit or chrome
            url = window.webkitURL.createObjectURL(file)
          }
          return url ;
        },
        /**
         * 上传产品图
         */
        async upload(){
          console.log(this.couponFile);
          if (!this.couponFile) {
            return this.$toast('请浏览图片后上传')
          }

          let res = await webApi.uploadCoupon(this.couponFile, Object.assign({}, this.paramsDefault, {couponkey: this.couponDetail.couponkey} ));
          if (res.flags === 'success') {
            this.$toast('请浏览图片后上传')
          } else {
            this.$toast(res.message, 'error');
          }
        }
      }
    }

</script>

<style lang="scss" scoped>
.base-coupon{
  width: 500px;
  background-color: rgb(24, 35, 55);
  border-radius: 5px;
  border: 1px solid rgb(26, 39, 58);
  padding: 30px 20px 20px;
  color: #FEFEFE;
  font-size: 12px;
  overflow: auto;
  margin: 0 35px 25px 0;
  .base-coupon_upload{
    float: left;
    width: 105px;
    text-align: center;
    .file-box{
      width: 100%;
      height: 105px;
      border-radius: 5px;
      margin-bottom: 8px;
      background-color: #7e8c8d;
    }
    .upload-btn{
      margin-top: 10px;
    }
  }
  .base-coupon_form{
    position: relative;
    margin-left: 125px;
    text-align: left;
    p{
      padding-bottom: 10px;
      border-bottom: 1px solid #2f3743;
      margin-bottom: 10px;
    }
  }
  .el-date-editor.el-input{
    width: 150px;
  }
  .confirm{
    padding: 5px 30px;
  }
}
</style>
