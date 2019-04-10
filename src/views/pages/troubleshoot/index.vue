<template>
    <div class="troubleshoot">
      <div class="troubleshoot-search">
        <span class="file-name" v-if="qrCodeFile">{{ qrCodeFile.name }}</span>
        <input @change="getCacheFile" type="file" accept="image/png,image/jpeg,image/gif" name="file" id="file_troubleshoot" style="visibility: hidden;width: 0;height: 0;">
        <label for="file_troubleshoot"><span class="el-button el-button--primary el-button--small is-round" style="margin-right: 20px;">上传二维码查询</span></label>
        <el-input size="small" @keyup.enter.native="getTroubleshootDetail" maxLength="20" v-model="searchParams.code" placeholder="请输入二维码" style="width: 200px; margin-right: 5px;"></el-input>
        <el-button size="small" type="primary" @click="getTroubleshootDetail" round>查询</el-button><br>
        <el-select
          clearable
          v-model="searchParams.couponkey"
          size="small"
          placeholder="请选择">
          <el-option
            v-for="item in configObject.couponList"
            :label="item.label"
            :key="item.value"
            :value="item.value">
          </el-option>
        </el-select>
        <el-input size="small" @keyup.enter.native="getTroubleshootDetail" maxLength="20" v-model="searchParams.serialNumber" placeholder="请输入序列号" style="width: 200px; margin-right: 5px;"></el-input>
        <el-button size="small" type="primary" @click="getTroubleshoot" round>查询</el-button>
      </div>
      <div class="troubleshoot-content" v-if="troubleshootDetail">
        <p class="distribute-desc">
          <span v-if="troubleshootDetail.codeinfo && troubleshootDetail.codeinfo.agentcompany">已分发给经销商 <font color="orange">{{troubleshootDetail.codeinfo.agentcompany}}</font></span>
          <span v-if="troubleshootDetail.codeinfo && !troubleshootDetail.codeinfo.agentcompany">未分发</span>
        </p>
        <div v-if="troubleshootDetail.payorderinfo" class="troubleshoot-content-item">
          <p class="status clearfix" style="line-height: 34px">
            <base-item class="w_50"><template slot="label">状态:</template>{{ payBtnStatus.statusText | paymentOrderStatusToText }}</base-item>
            <!--<span style="color: #909090">状态:</span> <template>{{ payBtnStatus.statusText  | paymentOrderStatusToText}}</template>-->
            <!--<span class="fr">-->
              <!--<el-button @click="manualQuestionPayOrder" type="success" size="small" v-if="payBtnStatus.isManual" round>手工激活</el-button>-->
              <!--<el-button @click="deleteQuestionPayOrder" type="danger" size="small" v-if="payBtnStatus.isDelete" round>删除支付订单</el-button>-->
            <!--</span>-->
          </p>
          <p class="clearfix">
            <base-item class="w_50" inline><template slot="label">经销商名称:</template>{{ troubleshootDetail.payorderinfo.agentcompany }}</base-item>
            <base-item class="w_50" inline><template slot="label">支付账号:</template>{{ troubleshootDetail.payorderinfo.accountuser }}</base-item>
          </p>
          <p class="clearfix">
            <base-item class="w_50" inline><template slot="label">支付金额:</template>{{ troubleshootDetail.payorderinfo.distotal }}</base-item>
            <base-item class="w_50" inline><template slot="label">折扣:</template>{{ troubleshootDetail.payorderinfo.discount }}<template v-if="troubleshootDetail.payorderinfo.discount">折</template></base-item>
          </p>
          <p class="clearfix">
            <base-item class="w_50" inline><template slot="label">礼券名称:</template>{{ troubleshootDetail.payorderinfo.couponname }}</base-item>
            <base-item class="w_50" inline><template slot="label">礼券id:</template>{{ troubleshootDetail.payorderinfo.couponid }}</base-item>
          </p>
          <p class="clearfix">
            <base-item class="w_50" inline><template slot="label">下单时间:</template>{{ troubleshootDetail.payorderinfo.createtime }}</base-item>
            <base-item class="w_50" inline><template slot="label">支付时间:</template>{{ troubleshootDetail.payorderinfo.lastupdatime }}</base-item>
          </p>
          <p class="clearfix">
            <base-item class="w_50" inline><template slot="label">原单价:</template>{{ troubleshootDetail.payorderinfo.nodisvalue }}</base-item>
            <base-item class="w_50" inline><template slot="label">张数:</template>{{ troubleshootDetail.payorderinfo.couponum }}</base-item>
          </p>
          <p class="clearfix">
            <base-item class="w_50" inline><template slot="label">来源:</template>{{ troubleshootDetail.payorderinfo.from | formatConfigValueToLabel(configObject.fromList)}}</base-item>
            <base-item class="w_50" inline><template slot="label">昵称:</template>{{ troubleshootDetail.payorderinfo.usernick }}</base-item>
          </p>
          <p class="avatar clearfix">
            <base-item class="w_50" inline><template slot="label">性 别:</template>{{ troubleshootDetail.payorderinfo.usergender | formatConfigValueToLabel(configObject.SEX_LIST)}}</base-item>
            <base-item class="w_50" inline v-if="troubleshootDetail.payorderinfo.userhead"><template slot="label">头 像:</template>
              <template v-if="troubleshootDetail.payorderinfo.userhead">
                <span class="user-head"><img :src="troubleshootDetail.payorderinfo.userhead" width="100%" height="100%"></span>
              </template>
            </base-item>
          </p>
        </div>
        <div v-if="troubleshootDetail.exorderinfo" class="troubleshoot-content-item custom-height">
          <p class="status clearfix" style="line-height: 34px">
            <base-item class="w_50"><template slot="label">状态:</template>{{ exchange.statusText }}</base-item>
            <!--<span class="fr" v-if="exchange.isShowOperate">-->
              <!--<el-button @click="deleteQuestionExChangedOrder" type="danger" size="small" round>删除兑换订单</el-button>-->
              <!--<el-button @click="saveQuestionExChangedOrder" type="primary" size="small" round>保存修改订单</el-button>-->
            <!--</span>-->
          </p>
          <p class="clearfix">
            <base-item class="w_50" inline><template slot="label">兑换来源:</template>{{ troubleshootDetail.exorderinfo.fromcouponname }}</base-item>
            <base-item class="w_50" inline><template slot="label">兑换目标<font color="orange">(数量)</font>:</template>{{ troubleshootDetail.exorderinfo.tocouponname }}<font color="orange">（{{ troubleshootDetail.exorderinfo.couponum }}）</font></base-item>
          </p>
          <p class="clearfix">
            <base-item><template slot="label">配送地址:</template>{{ troubleshootDetail.exorderinfo.recprov }}{{ troubleshootDetail.exorderinfo.recity }}{{ troubleshootDetail.exorderinfo.recounty }}{{ troubleshootDetail.exorderinfo.recstreet }}</base-item>
          </p>
          <p class="clearfix">
            <base-item class="w_50" inline><template slot="label">收货联系人:</template>{{ troubleshootDetail.exorderinfo.recontact }}</base-item>
            <base-item class="w_50" inline><template slot="label">收货人电话:</template>{{ troubleshootDetail.exorderinfo.recphone }}</base-item>
          </p>
          <p class="clearfix">
            <base-item class="w_50" inline><template slot="label">兑换人手机:</template>{{ troubleshootDetail.exorderinfo.usermobile }}</base-item>
            <base-item class="w_50" inline><template slot="label">祝福语:</template>{{ troubleshootDetail.exorderinfo.hello }}</base-item>
          </p>
          <p class="troubleshoot-content_address clearfix">
            <base-item><template slot="label">发货地址:</template>{{ troubleshootDetail.exorderinfo.sendprov }}{{ troubleshootDetail.exorderinfo.sendcity }}{{ troubleshootDetail.exorderinfo.sendcounty }}{{ troubleshootDetail.exorderinfo.sendstreet }}</base-item>
            <!--<el-select @change="changeProvinceFn" size="samll" v-model="troubleshootDetail.exorderinfo.sendprov">-->
              <!--<el-option v-for="province in cityData" :label="province.name" :value="province.name" :key="province.name"/>-->
            <!--</el-select>-->
            <!--<el-select @change="changeCityFn" size="samll" v-model="troubleshootDetail.exorderinfo.sendcity">-->
              <!--<el-option v-for="city in configObject.cityList" :label="city.name" :value="city.name" :key="city.name"/>-->
            <!--</el-select>-->
            <!--<el-select  size="samll" v-model="troubleshootDetail.exorderinfo.sendcounty">-->
              <!--<el-option v-for="county in configObject.countyList" :label="county.name" :value="county.name" :key="county.name"/>-->
            <!--</el-select>-->
            <!--<el-input size="small" style="width: 145px" maxlength="100" v-model="troubleshootDetail.exorderinfo.sendstreet" placeholder="请输入街道地址"></el-input>-->
          </p>
          <p class="clearfix">
            <base-item class="w_50" inline><template slot="label">发货联系人:</template>{{ troubleshootDetail.exorderinfo.sendcontact }}</base-item>
            <base-item class="w_50" inline><template slot="label">发货人电话:</template>{{ troubleshootDetail.exorderinfo.sendphone }}</base-item>
          </p>
          <p class="avatar clearfix">
            <base-item class="w_50" inline><template slot="label">快递公司:</template>{{ troubleshootDetail.exorderinfo.delcomname | formatConfigValueToLabel(configObject.expressCompanyList) }}</base-item>
            <base-item class="w_50" inline><template slot="label">快递单号:</template>{{ troubleshootDetail.exorderinfo.delid }}</base-item>
          </p>
          <p>
            <base-item><template slot="label">写给用户:</template>{{ troubleshootDetail.exorderinfo.log }}</base-item>
          </p>
          <p class="clearfix">
            <base-item class="w_50" inline><template slot="label">来源:</template>{{ troubleshootDetail.exorderinfo.from | formatConfigValueToLabel(configObject.fromList)}}</base-item>
            <base-item class="w_50" inline><template slot="label">昵称:</template>{{ troubleshootDetail.exorderinfo.usernick }}</base-item>
          </p>
          <p class="avatar clearfix">
            <base-item class="w_50" inline><template slot="label">性 别:</template>{{ troubleshootDetail.exorderinfo.usergender | formatConfigValueToLabel(configObject.SEX_LIST)}}</base-item>
            <base-item class="w_50" inline v-if="troubleshootDetail.exorderinfo.userhead"><template slot="label">头 像:</template>
              <template v-if="troubleshootDetail.exorderinfo.userhead">
                <span class="user-head"><img :src="troubleshootDetail.exorderinfo.userhead" width="100%" height="100%"></span>
              </template>
            </base-item>
          </p>
        </div>
      </div>
    </div>
</template>

<script>
  import cityData from '../../../conf/city'
  import webApi from '../../../lib/api'
  import config from '../../../conf/config'
  import {SEX_LIST} from '../../../conf/config-list'
    export default {
      name: "index",
      data(){
        return {
          config,
          cityData,
          searchParams: {
            serialNumber: null,
            code: null, // '0211fbfe40'
            couponkey: null
          },
          requestParams: {
            Sendprov: null,
            sendcity: null,
            sendcounty: null,
            sendstreet: null,
            sendontact: null,
            sendphone: null
          },
          troubleshootDetail: null,
          configObject: {
            couponList: [],
            cityList: [],
            countyList: [],
            expressCompanyList: [],
            fromList: [
              {label: '全部', value: 'ALL'},
              {label: '微信', value: 'w'},
              {label: '支付宝', value: 'z'},
              {label: '批量激活', value: 'm'}
            ],
            SEX_LIST
          },
          qrCodeFile: null,
          searchType: null,
        }
      },
      computed: {
        payBtnStatus() {
          let troubleshootDetail = this.troubleshootDetail;
          let payStatus = {isManual: false, isDelete: false, statusText: ''};
          if (!troubleshootDetail) {
           return payStatus
          }
          if (troubleshootDetail.codeinfo.payorderkey === undefined) {
            payStatus.isManual = true;
            payStatus.statusText = '未激活';
          } else {
            payStatus.isDelete = true;
            payStatus.statusText = troubleshootDetail.paystatus === undefined ? troubleshootDetail.payorderinfo.status : troubleshootDetail.paystatus;
          }
          return payStatus
        },
        exchange() {
          let troubleshootDetail = this.troubleshootDetail;
          let exchangeStatus = {isShowOperate: false, statusText: ''};
          if (!troubleshootDetail) {
            return exchangeStatus
          }
          if (troubleshootDetail.codeinfo.exorderkey === undefined) {
            exchangeStatus.isShowOperate = false;
            exchangeStatus.statusText = '未兑换';
          } else {
            exchangeStatus.isShowOperate = true;
            exchangeStatus.statusText = '已兑换';
          }
          return exchangeStatus;
        }
      },
      created(){
        this.getCouponList();
        this.getExpressCompanyList();
      },
      methods: {
        /**
         * 获取礼券列表
         */
        async getCouponList(){
          let res = await webApi.getCouponList();
          if(res.flags === 'success'){
            this.configObject.couponList = [];
            if(res.data && res.data.length){
              this.configObject.couponList = res.data.map(item => Object.assign({}, item, {label: item.name, value: item.couponkey}));
              this.searchParams.couponkey = this.configObject.couponList[0].value;
            }
          }else {
            this.$toast(res.message, 'error');
          }
        },
        /**
         * 获取快递公司列表
         */
        async getExpressCompanyList(){
          let res = await webApi.getExpressCompanyList();
          if(res.flags === 'success'){
            this.configObject.expressCompanyList = [];
            if(res.data && res.data.length){
              this.configObject.expressCompanyList = res.data;
            }
          }else {
            this.$toast(res.message, 'error');
          }
        },
        /**
         * 公司页面初始化函数
         */
        init() {
          let sendProvince = this.troubleshootDetail.exorderinfo.sendprov;
          let sendCounty = this.troubleshootDetail.exorderinfo.sendcounty;
          if (sendProvince) {
            this.changeProvinceFn();
          }
          if (sendCounty) {
            this.changeCityFn();
          }
        },
        /**
         * 切换省份触发方法
         * @param province
         */
        changeProvinceFn(province){
          if(province){
            this.troubleshootDetail.exorderinfo.sendcity = null;
            this.troubleshootDetail.exorderinfo.sendcounty = null;
          }
          let sendProvince = this.troubleshootDetail.exorderinfo.sendprov;
          this.configObject.cityList =  !sendProvince ? [] : this.cityData.find(province => province.name === sendProvince).children;
        },
        /**
         * 切换城市触发方法
         * @param city
         */
        changeCityFn(city){
          if(city){
            this.troubleshootDetail.exorderinfo.sendcounty = null;
          }
          let sendCity = this.troubleshootDetail.exorderinfo.sendcity;
          let cityList = this.configObject.cityList;
          this.configObject.countyList = !sendCity || !cityList.length ? [] : cityList.find(city => city.name === sendCity).children;
        },
        /**
         * 根据二维码查询详情
         */
        async getTroubleshootDetail() {
          if (!this.searchParams.code) {
            return this.$toast('请输入二维码号码')
          }
          let res = await webApi.getTroubleshootDetail({code: this.searchParams.code});
          if (res.flags === 'success') {
            if (res.data) {
              this.troubleshootDetail = res.data;
            }
            this.searchType = 'code';
            if (this.troubleshootDetail && this.troubleshootDetail.exorderinfo) {
              this.init();
            }
          } else {
            this.$toast(res.message, 'error');
          }
        },
        /**
         * 根据序列号查询详情
         */
        async getTroubleshoot() {
          if (!this.searchParams.serialNumber) {
            return this.$toast('请输入序列号')
          }
          let res = await webApi.getTroubleshootDetail({code: this.searchParams.serialNumber, couponkey: this.searchParams.couponkey});
          if (res.flags === 'success') {
            if (res.data) {
              this.troubleshootDetail = res.data;
            }
            this.searchType = 'code';
            if (this.troubleshootDetail && this.troubleshootDetail.exorderinfo) {
              this.init();
            }
          } else {
            this.$toast(res.message, 'error');
          }
        },
        /**
         * 上传文件
         * @returns {Promise<void>}
         */
        async upload() {
          if (!this.qrCodeFile) {
            return this.$toast('请浏览图片后上传')
          }
          let res = await webApi.upload(this.qrCodeFile, {}, `/rqrcbp`);
          if (res.flags === 'success') {
            if (res.data) {
             this.troubleshootDetail = res.data;
            }
            this.searchType = 'file';
            if (this.troubleshootDetail && this.troubleshootDetail.exorderinfo) {
              this.init();
            }
          } else {
            this.$toast(res.message, 'error');
          }
        },
        getTroubleshootDetailByType() {
          if (this.searchType === 'file') {
            this.upload();
          } else if (this.searchType === 'code'){
            this.getTroubleshootDetail()
          }
        },
        /**
         * 获取上传文件信息
         * @param event
         */
        getCacheFile(event) {
          this.qrCodeFile = event.target.files[0];
          if (this.qrCodeFile) {
            this.upload();
          }
        },
        /**
         * 保存修改订单（问题排查）
         * @returns {Promise<void>}
         */
        async saveQuestionExChangedOrder() {
          let params = {};
          if (this.troubleshootDetail) {
            let {codekey, exorderkey} = this.troubleshootDetail.codeinfo;
            let {recprov, recity, recounty, recstreet, recontact, recphone, delcom, delid, sendprov, sendcity, sendcounty, sendstreet, sendcontact, sendphone, log} = this.troubleshootDetail.exorderinfo;
            params = Object.assign(params, {codekey, exorderkey}, {recprov, recity, recounty, recsteet: recstreet, recontact, recphone, delcom, delid, sendprov, sendcity, sendcounty, sendstreet, sendcontact, sendphone, log})
          } else {
            return this.$toast('请求参数不存在')
          }
          let res = await webApi.saveQuestionExChangedOrder(params);
          if (res.flags === 'success') {
            this.$toast('修改成功', 'success');
            this.getTroubleshootDetailByType();
          } else {
            this.$toast(res.message, 'error');
          }
        },
        /**
         * 删除兑换订单（问题排查）
         * @returns {Promise<void>}
         */
        async deleteQuestionExChangedOrder() {
          let params = {};
          if (this.troubleshootDetail) {
            let {codekey} = this.troubleshootDetail.codeinfo;
            params = Object.assign(params, {codekey})
          } else {
            return this.$toast('请求参数不存在')
          }
          let res = await webApi.deleteQuestionExChangedOrder(params);
          if (res.flags === 'success') {
            this.$toast('删除成功', 'success');
            this.getTroubleshootDetailByType();
          } else {
            this.$toast(res.message, 'error');
          }
        },
        /**
         * 删除支付订单（问题排查）
         * @returns {Promise<void>}
         */
        async deleteQuestionPayOrder() {
          let params = {};
          if (this.troubleshootDetail) {
            let {codekey} = this.troubleshootDetail.codeinfo;
            params = Object.assign(params, {codekey})
          } else {
            return this.$toast('请求参数不存在')
          }
          let res = await webApi.deleteQuestionPayOrder(params);
          if (res.flags === 'success') {
            this.$toast('删除成功', 'success');
            this.getTroubleshootDetailByType();
          } else {
            this.$toast(res.message, 'error');
          }
        },
        async manualQuestionPayOrder() {
          let params = {};
          if (this.troubleshootDetail) {
            let {codekey} = this.troubleshootDetail.codeinfo;
            params = Object.assign(params, {codekey})
          } else {
            return this.$toast('请求参数不存在')
          }
          let res = await webApi.deleteQuestionPayOrder(params);
          if (res.flags === 'success') {
            this.$toast('激活成功', 'success');
            this.getTroubleshootDetailByType();
          } else {
            this.$toast(res.message, 'error');
          }
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
      .file-name{
        font-size: 12px;
        color: #fff;
      }
    }
    .troubleshoot-content{
      padding: 20px 30px;
      overflow: hidden;
        .troubleshoot-content-item{
          float: left;
          width: 630px;
          /*height: 450px;*/
          height: 618px;
          background-color: #182337;
          border-radius: 5px;
          border: 1px solid #1a273a;
          padding: 20px 15px;
          color: #FEFEFE;
          font-size: 12px;
          margin: 0 10px 20px 0;
          p{
            padding: 10px 0;
            border-bottom: 1px solid #2f3743;
            text-align: left;
          }
          .status{
            line-height: 34px;
          }
        }
      .custom-height{
        height: 618px;
      }
      /deep/ {
        @include customFormItem(110px, 24px, #909090, #fff, false);
        .w_50{
          width: 50%;
          float: left;
        }
        .user-head{
          display: inline-block;
          width: 40px;
          height: 40px;
          border-radius: 50%;
          overflow: hidden;
        }
      }
      .distribute-desc{
        width: 630px;
        line-height: 34px;
        background-color: #182337;
        color: #fff;
        text-align: left;
        padding-left: 15px;
        margin-bottom: 10px;
      }
    }
</style>
