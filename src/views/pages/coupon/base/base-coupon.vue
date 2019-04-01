<template>
    <div class="base-coupon">
      <div class="base-coupon_upload">
        <div class="file-box"><img width="100%" height="100%" :src="logoUrl" v-if="couponDetail.picture || couponCacheUrl"></div>
        <input @change="getCacheFile" type="file" accept="image/png,image/jpeg,image/gif" name="file" :id="`file_${couponDetail.couponid}`" style="visibility: hidden;width: 0;height: 0;">
        <label :for="`file_${couponDetail.couponid}`"><span style="font-size: 14px;color: #409EFF;cursor: pointer;">浏览..</span></label>
        <el-button class="upload-btn" type="primary" size="small" round @click="upload">上传产品图</el-button>
      </div>
      <div class="base-coupon_form">
        <p>礼券名称：
          <el-input size="small" style="width: 50%; margin-right: 5px;" v-model="requestParams.name" maxlength="20"></el-input>
          <span> 礼券ID:</span> {{requestParams.couponid}}
        </p>
        <p>当前折扣：
          <el-input size="small" style="width: 50px;" v-model="requestParams.discount" maxlength="2"></el-input>
        </p>
        <p>下一折扣日期：
          <el-date-picker
            size="small"
            v-model="requestParams.nextdiscountdate"
            type="date"
            format="yyyy/MM/dd"
            value-format="yyyy/MM/dd"
            placeholder="选择日期">
          </el-date-picker>
        </p>
        <p>下一折扣：
          <el-input size="small" style="width: 50px;" v-model="requestParams.nextdiscount" maxlength="2"></el-input>
        </p>
        <p>原价：
          <el-input size="small" style="width: 105px;" v-model="requestParams.value"></el-input> 元
        </p>
        <p>上架时间：
          <el-date-picker
            size="small"
            v-model="requestParams.timeon"
            type="date"
            format="yyyy/MM/dd"
            value-format="yyyy/MM/dd"
            placeholder="选择日期">
          </el-date-picker>
        </p>
        <p>下架时间：
          <el-date-picker
            size="small"
            v-model="requestParams.timeoff"
            type="date"
            format="yyyy/MM/dd"
            value-format="yyyy/MM/dd"
            placeholder="选择日期">
          </el-date-picker>
        </p>
        <el-button class="confirm" type="primary" size="small" round @click="saveHandle">保存修改</el-button>
      </div>
    </div>
</template>

<script>
  import webApi from '../../../../lib/api'
  import config from '../../../../conf/config'
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
          config,
          requestParams: null,
          couponCacheUrl: null,
          couponFile: null
        }
      },
      computed:{
        logoUrl() {
          return this.couponCacheUrl ? this.couponCacheUrl : this.couponDetail.picture ? `${this.config.DOWNLOAD_URL}${this.couponDetail.picture}` : null;
        }
      },
      created(){
        this.requestParams = this.couponDetail;
      },
      watch: {
        couponDetail: {
          handler (val){
            console.log(val, 1233);
            this.requestParams = val;
          },
          deep: true
        }
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
          console.log(event.target, '获取上传文件信息');
          let file = event.target.files[0];
          this.couponCacheUrl = this.getObjectURL(file);
          this.couponFile = file;
          if(this.couponFile){
            this.$toast('请点击“上传产品图”按钮以完成上传', 'info');
          }
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
          if (!this.couponFile) {
            return this.$toast('请浏览图片后上传')
          }
          let res = await webApi.upload(this.couponFile, {couponkey: this.requestParams.couponkey},`/mcp`);
          if (res.flags === 'success') {
            this.couponDetail.picture = res.data.picpath;
            this.$toast('上传图片成功', 'success');
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
  margin: 0 30px 25px 0;
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
