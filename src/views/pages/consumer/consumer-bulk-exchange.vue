<template>
    <div class="bulk-exchange-content">
      <div class="clearfix">
        <base-item class="w_310">
          <template slot="label">礼券来源:</template>
          <el-select
            size="small"
            v-model="requestParams.couponkeyfrom"
            :value="requestParams.couponkeyfrom"
            placeholder="请选择礼劵"
          @change="couponkeyfromChange"
            clearable>
            <el-option
              v-for="item in configObject.couponList"
              :label="item.label"
              :key="item.value"
              :value="item.value"/>
          </el-select>
        </base-item>
        <base-item class="w_310">
          <template slot="label">礼券起始编号:</template>
          <el-input size="small" placeholder="请输入礼券起始编号" v-model="requestParams.serialfrom" clearable></el-input>
        </base-item>
        <base-item class="w_310">
          <template slot="label">兑换张数:</template>
          <el-input size="small" placeholder="请输入兑换张数" v-model="requestParams.num" clearable></el-input>
        </base-item>
        <base-item class="w_310">
          <template slot="label">兑换目标礼券:</template>
          <el-select
            size="small"
            v-model="requestParams.couponkeyto"
            :value="requestParams.couponkeyto"
            placeholder="请选择礼劵" clearable>
            <el-option
              v-for="item in configObject.couponList"
              :label="item.label"
              :key="item.value"
              :value="item.value"/>
          </el-select>
        </base-item>
        <base-item class="w_310">
          <template slot="label">收货省:</template>
          <el-select placeholder="请选择收货省" @change="changeProvinceFn" size="samll" v-model="requestParams.recprov" :value="requestParams.recprov" clearable><el-option v-for="province in cityData" :label="province.name" :value="province.name" :key="province.name"/></el-select>
        </base-item>
        <base-item class="w_310">
          <template slot="label">收货市:</template>
          <el-select placeholder="请选择收货市" @change="changeCityFn" size="samll" v-model="requestParams.recity" :value="requestParams.recity" clearable><el-option v-for="city in configObject.cityList" :label="city.name" :value="city.name" :key="city.name"/></el-select>
        </base-item>
        <base-item class="w_310">
          <template slot="label">收货区县:</template>
          <el-select placeholder="请选择收货区县" size="samll" v-model="requestParams.recounty" :value="requestParams.recounty" clearable><el-option v-for="county in configObject.countyList" :label="county.name" :value="county.name" :key="county.name"/></el-select>
        </base-item>
        <base-item class="w_310">
          <template slot="label">收货街道详细地址 :</template>
          <el-input size="small" v-model="requestParams.recstreet"  placeholder="请输入收货详细街道地址" maxlength="100" clearable/>
        </base-item>
        <base-item class="w_310">
          <template slot="label">收货人姓名:</template>
          <el-input size="small" v-model="requestParams.recontact"  placeholder="请输入收货人姓名" maxlength="50" clearable/>
        </base-item>
        <base-item class="w_310">
          <template slot="label">收货人手机:</template>
          <el-input size="small" v-model="requestParams.recphone"  placeholder="请输入收货人手机" maxlength="11" clearable/>
        </base-item>
        <base-item class="w_310">
          <template slot="label">兑换人姓名:</template>
          <el-input size="small" v-model="requestParams.helloer" placeholder="请输入兑换人姓名" maxlength="11" clearable/>
        </base-item>
        <base-item class="w_310">
          <template slot="label">兑换人手机:</template>
          <el-input size="small" v-model="requestParams.usermobile" placeholder="请输入兑换人手机" maxlength="11" clearable/>
        </base-item>
        <base-item class="w_310">
          <template slot="label">祝福语:</template>
          <el-select placeholder="请选择祝福语" v-model="requestParams.hello" size="samll" clearable>
            <el-option v-for="item in configObject.wishList" :label="item.label" :value="item.value" :key="item.name" :disabled="item.isDisabled" clearable></el-option>
          </el-select>
        </base-item>
        <base-item class="w_310">
          <template slot="label">经销商账户:</template>
          <el-input size="small" v-model="requestParams.ageaccount" placeholder="请输入经销商账户" clearable/>
        </base-item>
      </div>
      <p style="margin-top: 30px; line-height: 30px;">
        <el-button @click="downloadBulkExchangeTemplate" class="confirm" type="primary" size="small" round>下载批量兑换订单模版</el-button>
        <el-button @click="saveBulkExchange" class="confirm" type="primary" size="small" round>生成兑换订单</el-button>
        <input @change="getCacheFile" type="file" accept="/*" name="exorder" id="upload_bulk_exchange" style="visibility: hidden;width: 0;height: 0;">
        <label for="upload_bulk_exchange"><span class="el-button el-button--primary el-button--small is-round" style="margin-right: 20px;">上传批量兑换订单</span></label>
      </p>
      <div style="padding: 20px" >
        <p style="text-align: left">
          <base-item inline><template slot="label">上传总兑换订单数:</template>{{ bulkExchangeTotals }}</base-item>
          <base-item inline><template slot="label">成功兑换订单数:</template>{{ bulkExchangeSuccessCounts }}</base-item>
        </p>
        <element-table :table-columns="tableColumns" :table-data="tableData" element-loading-background="rgba(0, 0, 0, 0.5)"></element-table>
      </div>
      <el-dialog
        width="600px"
        :visible.sync="dialogOption.visible"
        title="信息确认">
        <div class="dialog-content">
          <div>
            <span class="label">礼券来源:</span>
            <span class="text-field" v-if="configObject.couponList.length">{{requestParams.couponkeyfrom ? configObject.couponList.find(item => item.value === requestParams.couponkeyfrom).label : ''}}</span>
            <span class="label">礼券起始编号:</span>
            <span class="text-field">{{requestParams.serialfrom}}</span>
          </div>
          <div>
            <span class="label">兑换张数:</span>
            <span class="text-field">{{requestParams.num}}</span>
            <span class="label">兑换目标礼券:</span>
            <span class="text-field" v-if="configObject.couponList.length">{{requestParams.couponkeyto ? configObject.couponList.find(item => item.value === requestParams.couponkeyto).label : ''}}</span>
          </div>
          <div>
            <span class="label">收货省:</span>
            <span class="text-field">{{requestParams.recprov}}</span>
            <span class="label">收货市:</span>
            <span class="text-field">{{requestParams.recity}}</span>
          </div>
          <div>
            <span class="label">收货区县:</span>
            <span class="text-field">{{requestParams.recounty}}</span>
            <span class="label">收货街道详细地址:</span>
            <span class="text-field">{{requestParams.recstreet}}</span>
          </div>
          <div>
            <span class="label">收货人姓名:</span>
            <span class="text-field">{{requestParams.recontact}}</span>
            <span class="label">收货人手机:</span>
            <span class="text-field">{{requestParams.recphone}}</span>
          </div>
          <div>
            <span class="label">兑换人姓名:</span>
            <span class="text-field">{{requestParams.helloer}}</span>
            <span class="label">兑换人手机:</span>
            <span class="text-field">{{requestParams.usermobile}}</span>
          </div>
          <div>
            <span class="label">祝福语:</span>
            <span class="text-field">{{requestParams.hello}}</span>
            <span class="label">经销商账户:</span>
            <span class="text-field">{{requestParams.ageaccount}}</span>
          </div>
        </div>
        <div slot="footer">
          <el-button round @click="dialogOption.visible = false">取消</el-button>
          <el-button round type="primary" @click="confirmEntureHandle">确定生成兑换订单</el-button>
        </div>
      </el-dialog>
    </div>
</template>

<script>
  import webApi from '../../../lib/api'
  import cityAllData from '../../../conf/city'
  const cityData = cityAllData.filter(item => !['西藏自治区', '新疆维吾尔自治区', '香港特别行政区', '澳门特别行政区', '台湾省'].includes(item.name));
	export default {
    data() {
      return {
        cityData,
        tableColumns: [
          {title: '失败表单名称', align: 'center', key: 'sheetname'},
          {title: '失败表单行号', align: 'center', key: 'row'},
          {title: '失败原因', align: 'center', key: 'reason'}
        ],
        tableData: [],
        configObject: {
          couponList: [],
          cityList: [],
          countyList: [],
          wishList: []
        },
        requestParams: {
          couponkeyfrom: null,
          serialfrom: null,
          num: null,
          couponkeyto: null,
          recprov: null,
          recity: null,
          recounty: null,
          recstreet: null,
          recontact: null,
          recphone: null,
          usermobile: null,
          helloer: null,
          hello: null,
          ageaccount: null
        },
        dialogOption: {
          visible: false
        },
        paramsConfirm: null,
        bulkExchangeFile: null,
        bulkExchangeTotals: 0,
        bulkExchangeSuccessCounts: 0
      }
    },
    created() {
      this.getCouponList();
      this.getWishList();
    },
    methods: {
      //下载批量兑换模板
      downloadBulkExchangeTemplate() {
        window.open(`http://cdn.jedge.cn/批量兑换订单模版.xlsx`);
      },
      /**
       * 获取上传文件信息
       * @param event
       */
      getCacheFile(event) {
        this.bulkExchangeFile = event.target.files[0];
        if (this.bulkExchangeFile) {
          this.uploadBulkExchange();
        }
      },
      /**
       * 上传文件
       * @returns {Promise<void>}
       */
      async uploadBulkExchange() {
        let res = await webApi.uploadBulkExchange(this.bulkExchangeFile);
        if (res.flags === 'success') {
          this.tableData = [];
          this.bulkExchangeTotals = 0;
          this.bulkExchangeSuccessCounts = 0;
          const result = res.data;
          if (result && result.fails) {
            this.tableData = result.fails;
            this.bulkExchangeTotals = result.total;
            this.bulkExchangeSuccessCounts = result.success;
          }
        } else {
          this.$toast(res.message, 'error');
        }
        this.bulkExchangeFile = null;
      },
      /**
       * 获取礼券列表
       */
      async getCouponList(){
        let res = await webApi.getCouponList({});
        if(res.flags === 'success'){
          this.configObject.couponList = [];
          if(res.data && res.data.length){
            this.configObject.couponList = res.data.reverse().map(item => ({label: item.name, value: item.couponkey}));
            this.requestParams.couponkeyto = this.requestParams.couponkeyfrom = this.configObject.couponList[0].value || null;
          }
        }else {
          this.$toast(res.message, 'error');
        }
      },
      /**
       * 获取祝福语列表
       */
      async getWishList(){
        let res = await webApi.getWishList({});
        if(res.flags === 'success'){
          this.configObject.wishList = [];
          if(res.data && res.data.length){
            this.configObject.wishList = res.data.reverse().map(item => ({label: item.value === '' ? `--------${item.name}--------` : item.name, value: item.value, isDisabled: item.value === ''}));
          }
        }else {
          this.$toast(res.message, 'error');
        }
      },
      /**
       * 切换省份触发方法
       * @param province
       */
      changeProvinceFn(province) {
        if (province) {
          this.requestParams.recity = null;
          this.requestParams.recounty = null;
        }
        let sendProvince = this.requestParams.recprov;
        this.configObject.cityList =  !sendProvince ? [] : this.cityData.find(province => province.name === sendProvince).children;
      },
      /**
       * 切换城市触发方法
       * @param city
       */
      changeCityFn(city) {
        if (city) {
          this.requestParams.recounty = null;
        }
        let sendCity = this.requestParams.recity;
        let cityList = this.configObject.cityList;
        this.configObject.countyList =  !sendCity || !cityList.length ? [] : cityList.find(city => city.name === sendCity).children;
      },
      async saveBulkExchange() {
        let params = this.requestParams;
        let {serialfrom, num} = params;
        if (serialfrom === null || serialfrom === '' || num === null || num === '') {
          return this.$toast('礼券起始编号和兑换张数不能为空')
        }
        params.serialfrom = serialfrom = serialfrom - 0;
        params.num = num = num - 0;
        if (typeof serialfrom !== 'number' || typeof num !== 'number') {
          return this.$toast('礼券起始编号和兑换张数必须为数字')
        }
        if (serialfrom < 1) {
          return this.$toast(`礼券起始编号必须大于或等于1`)
        }
        if (num < 0 || num > 1000) {
          return this.$toast(`兑换张数必须大于0且小于或等于1000`)
        }
        this.paramsConfirm = params;
        this.dialogOption.visible = true;

      },
      /**
       * 选择礼券来源事件
       */
      couponkeyfromChange(val){
        this.requestParams.couponkeyto = this.requestParams.couponkeyfrom;
      },
      /**
       * 确定confirm事件
       */
      async confirmEntureHandle(){
        let res = await webApi.saveBulkExchange(this.paramsConfirm);
        if(res.flags === 'success'){
          this.$toast('批量兑换成功', 'success')
        }else {
          this.$toast(res.message, 'error');
        }
      }
    }
	}
</script>

<style lang="scss" scoped>
  .bulk-exchange-content{
    max-width: 1400px;
    margin: 0 auto;
    .el-input, .el-select{
      width: 170px;
    }
    /deep/ {
      @include customFormItem(135px, 40px, #afafaf, #fff, false);
      .w_50{
        width: 50%;
        float: left;
      }
      .w_310{
        width: 310px;
        float: left;
      }
    }
  }
  .el-dialog{
    .dialog-content div{
      padding-bottom: 5px;
      /*border-bottom: 1px solid #737373;*/
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
      vertical-align: top;
      line-height: 18px;
    }
    .label{
      width: 118px;
      color: #AFAFAF;
      text-align: right;
    }
    .text-field{
      text-align: left;
      width: 150px;
      color: #eee;
    }
  }
</style>
