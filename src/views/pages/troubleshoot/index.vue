<template>
    <div class="troubleshoot">
      <div class="troubleshoot-search">
          <input type="file" accept="image/png,image/jpeg,image/gif" name="file" id="file" style="font-size: 12px;">
        <el-button size="small" type="primary" round style="margin-right: 20px;">上传二维码查询</el-button>
          <!--<label for="file"><span class="file-button">请选择文件</span></label>-->
        <el-input size="small" placeholder="请输入二维码" style="width: 200px; margin-right: 5px;"></el-input>
        <el-button size="small" type="primary" round>查询</el-button>
      </div>
      <div class="troubleshoot-content">
        <div class="troubleshoot-content-item">
          <p class="status clearfix" style="line-height: 34px">
            <span style="color: #909090">状态:</span> 已支付
            <span class="fr">
              <el-button type="success" size="small" round>手工激活</el-button>
              <el-button type="danger" size="small" round>删除支付订单</el-button>
            </span>
          </p>
          <p>
            <span class="label">经销商名称:</span>
            <span class="text-field">傻逼</span>
            <span class="label">支付账号:</span>
            <span class="text-field">foolish</span>
          </p>
          <p>
            <span class="label">折扣:</span>
            <span class="text-field">88 折</span>
            <span class="label">支付金额:</span>
            <span class="text-field">250</span>
          </p>
          <p>
            <span class="label">礼券id:</span>
            <span class="text-field">222222222222</span>
            <span class="label">礼券名称:</span>
            <span class="text-field">傻逼礼券傻逼礼券傻逼礼券傻逼礼券傻逼礼券</span>
          </p>
          <p>
            <span class="label">下单时间:</span>
            <span class="text-field">2019-02-22 22:22</span>
            <span class="label">支付时间:</span>
            <span class="text-field">2019-02-26 14:25</span>
          </p>
          <p>
            <span class="label">张数:</span>
            <span class="text-field">22</span>
            <span class="label">原单价:</span>
            <span class="text-field">290</span>
          </p>
          <p>
            <span class="label">来源:</span>
            <span class="text-field">不知</span>
            <span class="label">昵称:</span>
            <span class="text-field">二傻子</span>
          </p>
          <p class="avatar">
            <span class="label">性 别:</span>
            <span class="text-field">男</span>
            <span class="label">头 像:</span>
            <span class="text-field">
              <i><img src="../../../static/images/avatar.png" alt=""></i>
            </span>
          </p>
        </div>
        <div class="troubleshoot-content-item custom-width">
          <p class="status clearfix" style="line-height: 34px">
            <span style="color: #909090">状态:</span> 已兑换
            <span class="fr">
              <el-button type="danger" size="small" round>删除兑换订单</el-button>
              <el-button type="primary" size="small" round>保存修改订单</el-button>
            </span>
          </p>
          <p>
            <span class="label">兑换来源:</span>
            <span class="text-field">傻逼</span>
            <span class="label">兑换目标:</span>
            <span class="text-field">foolish</span>
          </p>
          <p>
            <span class="label">配送地址:</span>
            <span class="text-field">上海市长宁区延安西路2558号1号楼</span>
          </p>
          <p>
            <span class="label">收货联系人:</span>
            <span class="text-field">某某某</span>
            <span class="label">收货人电话:</span>
            <span class="text-field">18516114512</span>
          </p>
          <p>
            <span class="label">兑换人手机:</span>
            <span class="text-field">18516116628</span>
            <span class="label">祝福语:</span>
            <span class="text-field">胖20斤</span>
          </p>
          <p class="troubleshoot-content_address">
            <span class="label">发货地址:</span>
            <el-select @change="changeProvinceFn" size="samll" v-model="requestParams.Sendprov">
              <el-option v-for="province in cityData" :label="province.name" :value="province.name" :key="province.name"/>
            </el-select>
            <el-select @change="changeCityFn" size="samll" v-model="requestParams.sendcity">
              <el-option v-for="city in configObject.cityList" :label="city.name" :value="city.name" :key="city.name"/>
            </el-select>
            <el-select  size="samll" v-model="requestParams.sendcounty">
              <el-option v-for="county in configObject.countyList" :label="county.name" :value="county.name" :key="county.name"/>
            </el-select>
            <el-input size="small" style="width: 160px" v-model="requestParams.sendstreet" placeholder="请输入街道地址"></el-input>
          </p>
          <p>
            <span class="label">发货联系人:</span>
            <span class="text-field">
              <el-input size="small" style="width: 160px" v-model="requestParams.sendontact" placeholder="请输入联系人姓名"></el-input>
            </span>
            <span class="label">发货人电话:</span>
            <span class="text-field">
              <el-input size="small" style="width: 160px" v-model="requestParams.sendphone" placeholder="请输入发货人电话"></el-input>
            </span>
          </p>
          <p class="avatar">
            <span class="label">快递公司:</span>
            <span class="text-field">
              <el-select size="samll" style="width: 160px" v-model="requestParams.delcom">
                <el-option v-for="city in configObject.cityList" :label="city.name" :value="city.name" :key="city.name"/>
              </el-select>
            </span>
            <span class="label">头 像:</span>
            <span class="text-field">
              <i><img src="../../../static/images/avatar.png" alt=""></i>
            </span>
          </p>
        </div>
      </div>
    </div>
</template>

<script>
  import cityData from '../company/data/city'
    export default {
      name: "index",
      data(){
        return {
          cityData,
          requestParams: {
            Sendprov: null,
            sendcity: null,
            sendcounty: null,
            sendstreet: null,
            sendontact: null,
            sendphone: null
          },
          configObject: {
            cityList: [],
            countyList: []
          }
        }
      },
      created(){
      },
      methods: {
        /**
         * 切换省份触发方法
         * @param province
         */
        changeProvinceFn(province){
          if(province){
            this.requestParams.sendcity = null;
            this.requestParams.sendcounty = null;
          }
          let sendProvince = this.requestParams.Sendprov;
          this.configObject.cityList =  !sendProvince ? [] : this.cityData.find(province => province.name === sendProvince).children;
        },
        /**
         * 切换城市触发方法
         * @param city
         */
        changeCityFn(city){
          if(city){
            this.requestParams.sendcounty = null;
          }
          let sendCity = this.requestParams.sendcity;
          let cityList = this.configObject.cityList;
          this.configObject.countyList = !sendCity || !cityList.length ? [] : cityList.find(city => city.name === sendCity).children;
        }
      }
    }
</script>

<style lang="scss" scoped>
    .troubleshoot-search{
      min-height: 50px;
      line-height: 36px;
      padding: 7px 30px;
      text-align: left;
      .file-button{
        display: inline-block;
        width: 92px;
        height: 24px;
        border-radius: 20px;
        background: #eee;
        text-align: center;
        color: #606266;
        font-size: 12px;
        line-height: 24px
      }
    }
    .troubleshoot-content{
      padding: 20px 30px;
      overflow: hidden;
        .troubleshoot-content-item{
          float: left;
          width: 480px;
          height: 400px;
          background-color: #182337;
          border-radius: 5px;
          border: 1px solid #1a273a;
          padding: 30px 20px 20px;
          color: #FEFEFE;
          font-size: 12px;
          margin: 0 10px 25px 0;
          &.custom-width{
            width: 680px;
            .text-field {
              width: 200px;
            }
          }
          p{
            padding-bottom: 5px;
            border-bottom: 1px solid #2f3743;
            margin-bottom: 10px;
            text-align: left;
            &.avatar{
              i{
                display: inline-block;
                width: 50px;
                height: 50px;
                border-radius: 50%;
                overflow: hidden;
                img{
                  width: 100%;
                  height: 100%;
                  vertical-align: middle;
                }
              }
            }
          }
          .label,.text-field{
            display: inline-block;
            vertical-align: middle;
          }
          .label{
            width: 65px;
            color: #909090;
            text-align: left;
          }
          .text-field{
            width: 140px;
            line-height: 18px ;
          }
          .status{
            line-height: 34px;
          }
        }
      .troubleshoot-content_address{
        .el-select, .el-input{
          /*margin: 0 5px;*/
          width: 130px;
        }
      }
    }
</style>
