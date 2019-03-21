<template>
    <div class="bulk-exchange-content">
      <div class="clearfix">
        <base-item class="w_25">
          <template slot="label">礼券:</template>
          <el-select
            size="small"
            v-model="requestParams.couponkeyfrom"
            :value="requestParams.couponkeyfrom"
            placeholder="请选择礼劵">
            <el-option
              v-for="item in configObject.couponList"
              :label="item.label"
              :key="item.value"
              :value="item.value"/>
          </el-select>
        </base-item>
        <base-item class="w_25">
          <template slot="label">礼券起始编号:</template>
          <el-input size="small" placeholder="请输入礼券起始编号" v-model="requestParams.serialfrom"></el-input>
        </base-item>
        <base-item class="w_25">
          <template slot="label">兑换张数:</template>
          <el-input size="small" placeholder="请输入兑换张数" v-model="requestParams.num"></el-input>
        </base-item>
        <base-item class="w_25">
          <template slot="label">礼券:</template>
          <el-select
            size="small"
            v-model="requestParams.couponkeyto"
            :value="requestParams.couponkeyto"
            placeholder="请选择礼劵">
            <el-option
              v-for="item in configObject.couponList"
              :label="item.label"
              :key="item.value"
              :value="item.value"/>
          </el-select>
        </base-item>
      </div>
      <div class="clearfix">
        <base-item class="w_25">
          <template slot="label">收货省:</template>
          <el-select placeholder="请选择收货省" @change="changeProvinceFn" size="samll" v-model="requestParams.recprov" :value="requestParams.recprov"><el-option v-for="province in cityData" :label="province.name" :value="province.name" :key="province.name"/></el-select>
        </base-item>
        <base-item class="w_25">
          <template slot="label">收货市:</template>
          <el-select placeholder="请选择收货市" @change="changeCityFn" size="samll" v-model="requestParams.recity" :value="requestParams.recity"><el-option v-for="city in configObject.cityList" :label="city.name" :value="city.name" :key="city.name"/></el-select>
        </base-item>
        <base-item class="w_25">
          <template slot="label">收货区县:</template>
          <el-select placeholder="请选择收货区县" size="samll" v-model="requestParams.recounty" :value="requestParams.recounty"><el-option v-for="county in configObject.countyList" :label="county.name" :value="county.name" :key="county.name"/></el-select>
        </base-item>
        <base-item class="w_25">
          <template slot="label">收货街道详细地址 :</template>
          <el-input size="small" v-model="requestParams.recstreet"  placeholder="请输入收货详细街道地址" maxlength="100" />
        </base-item>
      </div>
      <div class="clearfix">
        <base-item class="w_25">
          <template slot="label">收货人姓名:</template>
          <el-input size="small" v-model="requestParams.recontact"  placeholder="请输入收货人姓名" maxlength="50" />
        </base-item>
        <base-item class="w_25">
          <template slot="label">收货人手机:</template>
          <el-input size="small" v-model="requestParams.recphone"  placeholder="请输入收货人手机" maxlength="11" />
        </base-item>
      </div>
      <div class="clearfix">
        <base-item class="w_25">
          <template slot="label">兑换人姓名:</template>
          <el-input size="small" v-model="requestParams.helloer" placeholder="请输入兑换人姓名" maxlength="11" />
        </base-item>
        <base-item class="w_25">
          <template slot="label">兑换人手机:</template>
          <el-input size="small" v-model="requestParams.usermobile" placeholder="请输入兑换人手机" maxlength="11" />
        </base-item>
        <base-item class="w_25">
          <template slot="label">祝福语:</template>
          <el-input size="small" v-model="requestParams.hello"  placeholder="请输入祝福语" maxlength="50" />
        </base-item>
      </div>
      <p style="margin-top: 30px;"><el-button @click="saveBulkExchange" class="confirm" type="primary" size="small" round>生成兑换订单</el-button></p>
    </div>
</template>

<script>
  import webApi from '../../../lib/api'
  import cityData from '../../../conf/city'
	export default {
    data() {
      return {
        cityData,
        configObject: {
          couponList: [],
          cityList: [],
          countyList: []
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
          hello: null
        }
      }
    },
    created() {
      this.getCouponList();
    },
    methods: {
      /**
       * 获取礼券列表
       */
      async getCouponList(){
        let res = await webApi.getCouponList({});
        if(res.flags === 'success'){
          this.configObject.couponList = [];
          if(res.data && res.data.length){
            this.configObject.couponList = res.data.reverse().map(item => ({label: item.name, value: item.couponkey}));
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
        let res = await webApi.saveBulkExchange(params);
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
    min-width: 1400px;
    .el-input, .el-select{
      width: 215px;
    }
    /deep/ {
      @include customFormItem(135px, 40px, #afafaf, #fff, false);
      .w_50{
        width: 50%;
        float: left;
      }
      .w_25{
        width: 25%;
        float: left;
      }
    }
  }
</style>
