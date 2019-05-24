<template>
  <div class="automatic-delivery-content">
    <div class="automatic-delivery-content__date">
      <base-item inline>
        <template slot="label">年:</template>
        <el-select placeholder="选择年份" style="width: 100px;" size="small" @change="changeTimeType('year')" v-model="year" :value="year" clearable>
          <el-option v-for="item in configObject.years" :key="item" :value="item" :label="item"/>
        </el-select>
      </base-item>
      <base-item label-width="30px" inline>
        <template slot="label">月:</template>
        <el-select placeholder="选择月份" style="width: 100px;" size="small" @change="changeTimeType('month')" v-model="month" :value="month" clearable>
          <el-option v-for="(item, index) in configObject.months" :key="index" :value="index+1" :label="`${index+1}月`"/>
        </el-select>
      </base-item >
      <base-item label-width="30px" inline>
        <template slot="label">日:</template>
        <el-select placeholder="选择日期" style="width: 100px;" size="small"  @change="changeTimeType('day')" v-model="day" :value="day" clearable>
          <el-option v-for="(item, index) in configObject.days" :key="index" :value="index+1" :label="`${index+1}日`"/>
        </el-select>
      </base-item>
      <base-item label-width="0" inline>
        <el-button @click="clearDateData" size="small" type="primary" round>刷新自动发货年月日下拉框</el-button>
      </base-item>
    </div>
    <base-item>
      <template slot="label">过滤:</template>
      <el-select placeholder="选择来源礼券" v-model="filterOption.fromcouponname" size="small" clearable>
        <el-option v-for="(item, index) in configObject.couponList" :key="index" :value="item.value" :label="item.label"/>
      </el-select>
      <el-select placeholder="选择目标礼券" v-model="filterOption.tocouponname" size="small" clearable>
        <el-option v-for="(item, index) in configObject.couponList" :key="index" :value="item.value" :label="item.label"/>
      </el-select>
      <el-select placeholder="请选择" size="small" v-model="filterOption.shipSituation" clearable>
        <el-option v-for="(item, index) in configObject.shipSituation" :key="index" :value="item" :label="item"/>
      </el-select>
    </base-item>
    <div class="automatic-delivery-content__list">
      <div class="summary"><span>订单列表：{{summary.currentDate}}</span><span>总兑换订单数：{{summary.totalex}}</span><span>待发货：{{summary.totaltodel}}</span></div>
      <element-table ref="multipleTable" @selection-change="handleSelectionChange" :table-columns="tableColumns" :table-data="tableData" element-loading-background="rgba(0, 0, 0, 0.5)"></element-table>
    </div>
    <base-item label-width="110px">
      <template slot="label">发货操作:</template>
      <el-select @change="delid = null" placeholder="选择快递公司" size="small" v-model="delcom" :value="delcom" clearable>
        <el-option v-for="item in configObject.expressCompanyList" :key="item.value" :label="item.label" :value="item.value"/>
      </el-select>
      <el-input v-model="delid" placeholder="快递单号" style="width: 200px;"  size="small" clearable/>
      <el-button size="small" type="primary" @click="setAutomaticDeliveryCombined" round>合并发货</el-button>
      <el-button size="small" type="primary" @click="setAutomaticDeliveryBulkShipment" round>批量发货</el-button>
    </base-item>
  </div>
</template>

<script>
  import webApi from '../../../lib/api'
	export default {
    data(){
      return {
        year: null,
        month: null,
        day: null,
        delcom: null,
        delid: null,
        filterOption: {
          fromcouponname: null,
          tocouponname: null,
          shipSituation: null
        },
        summary: {
          currentDate: null,
          totalex: null,
          totaltodel: null
        },
        exorderkeys: [],
        configObject:{
          years: [],
          months: [],
          days: [],
          expressCompanyList: [],
          couponList: [],
          shipSituation: ['全部', '合并发货']
        },
        totalpages: 0,
        currentIndex: 1,
        tableColumns: [
          {type: 'selection', width: 55, selectable: row => !(row.delcom || row.delid)},
          {title: '来源礼券', key: 'fromcouponname' },
          {title: '目标礼券', key: 'tocouponname' },
          {title: '数量', key: 'couponum' },
          {title: '收货地址', formatter: row => `${row.recprov}${row.recity}${row.recounty}${row.recstreet}`},
          {title: '收货人', key: 'recontact' },
          {title: '兑换人', key: 'helloer' },
          {title: '兑换人手机号', key: 'usermobile' },
          {title: '祝福语', key: 'hello' },
          {title: '快递公司', key: 'delcom' },
          {title: '快递单号', key: 'delid' },
          {title: '操作', render: (h, params) => <el-button size="medium" type="text">查看详情</el-button>}
        ],
        tableData: [],
        selectedRows: []
      }
    },
    created() {
      this.init();
    },
    computed: {
      currentDate() {
        return this.year && this.month && this.day ? `${this.year}-${this.month < 10 ? '0' : ''}${this.month}-${this.day < 10 ? '0' : ''}${this.day}` : '';
      }
    },
    methods: {
      init() {
        this.getCouponList();
        this.getExpressCompanyList();
        this.getAutomaticDeliveryYears();
        this.getAutomaticDeliveryOrderList();
      },
      handleSelectionChange(items) {
        this.selectedRows = items;
        this.exorderkeys = items.map(item => item.orderkey);
      },
      //日期条件改变出发方法
      changeTimeType(type) {
        const {configObject} = this.$data;
        if (type === 'year') {
          this.month = '';
          this.day = '';
          this.getAutomaticDeliveryMonths();
        } else if (type === 'month'){
          this.day = '';
          configObject.days = this.month ? configObject.months[this.month].days : [];
        } else if (type === 'day'){
          this.getSummaryData();
          this.getAutomaticDeliveryOrderList();
        }
      },
      //清除日期选择条件
      clearDateData() {
        this.year = null;
        this.month = null;
        this.day = null;
        this.getAutomaticDeliveryYears();
      },
      //获取年份列表
      async getAutomaticDeliveryYears() {
        let res = await webApi.getAutomaticDeliveryYears();
        if (res.flags === 'success') {
         if (res.data) {
           this.configObject.years = res.data;
         }
        } else {
          this.$toast(res.message, 'error');
        }
      },
      //获取月份列表
      async getAutomaticDeliveryMonths() {
        const {year} = this.$data;
        if (!year) {
          return
        }
        let res = await webApi.getAutomaticDeliveryMonths({year});
        if (res.flags === 'success') {
          if (res.data) {
            this.configObject.months = res.data;
          }
        } else {
          this.$toast(res.message, 'error');
        }
      },
      //获取兑换订单列表
      async getAutomaticDeliveryOrderList() {
        const date = this.currentDate;
        if (!date) {
          return
        }
        // const params = {date: '2019-05-23', pagenum: 0};
        const params = {date, pagenum: 0};
        let res = await webApi.getAutomaticDeliveryOrderList(params);
        if (res.flags === 'success') {
          this.tableData = [];
          const result = res.data;
          if (result) {
            this.totalpages = result.totalpages;
            this.tableData = [...this.tableData, ...result.orders];
            const promiseList = [];
            if (this.totalpages > 1) {
              while (this.currentIndex < this.totalpages) {
                promiseList.push(webApi.getAutomaticDeliveryOrderList({date: '2019-05-23', pagenum: this.currentIndex}));
                this.currentIndex++;
              }
            }
            Promise.all(promiseList).then(promiseResult => {
              promiseResult.forEach(item => {
                if (item.flags === 'success') {
                  const promiseResultData = item.data;
                  if (promiseResultData) {
                    this.tableData = [...this.tableData, ...promiseResultData.orders];
                  }
                } else {
                  this.$toast(promiseResult.message, 'error');
                }
              })
            })
          }
        } else {
          this.$toast(res.message, 'error');
        }
      },
      /**
       * 获取礼券列表
       */
      async getCouponList(){
        let res = await webApi.getCouponList({});
        if(res.flags === 'success'){
          this.configObject.couponList = [];
          if(res.data && res.data.length){
            this.configObject.couponList = res.data.map(item => ({label: item.name, value: item.couponkey}));
            this.filterOption.tocouponname = this.filterOption.fromcouponname = this.configObject.couponList[0].value || null;
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
            this.configObject.expressCompanyList = res.data.map(item => Object.assign({}, {label: item.name, value: item.value}));
          }
        }else {
          this.$toast(res.message, 'error');
        }
      },
      //批量发货
      async setAutomaticDeliveryBulkShipment() {
        const {exorderkeys, delcom, delid} = this.$data;
        if (exorderkeys.length === 0) {
          return this.$toast('请勾选订单后批量发货')
        }
        let res = await webApi.setAutomaticDeliveryBulkShipment({exorderkeys, delcom, delid});
        if(res.flags === 'success'){
          const result = res.data;
          this.combinedDeliveryAndBulkShipmentCallback(result);
        }else {
          this.$toast(res.message, 'error');
        }
      },
      //合并发货
      async setAutomaticDeliveryCombined() {
        const {exorderkeys, delcom, delid} = this.$data;
        if (exorderkeys.length === 0) {
          return this.$toast('请勾选订单后合并发货')
        }
        let res = await webApi.setAutomaticDeliveryCombined({exorderkeys, delcom, delid});
        if(res.flags === 'success'){
          const result = res.data;
          this.combinedDeliveryAndBulkShipmentCallback(result);
        }else {
          this.$toast(res.message, 'error');
        }
      },
      //批量发货和合并发货callback
      combinedDeliveryAndBulkShipmentCallback(result) {
        if (result) {
          if (result.delresult && result.delresult.length) {
            this.selectedRows.forEach((item, index) => {
              const {delcom, delid} = result.delresult[index];
              item = Object.assign(item, {delcom, delid});
            })
          }
          if (result.delmessage) {
            this.$toast(result.delmessage, 'success');
          }
        }
        this.$refs.multipleTable.$refs['customize-table'].clearSelection();
      },
      /**
       * 获取summary数据
       */
      getSummaryData(){
        let monthList = this.configObject.months;
        let daysResult = {};
        if(!this.day || !this.month || !this.year){
          return
        }
        if(monthList && monthList.length){
          monthList.forEach( (month,monthIndex) => {
            if(this.month === monthIndex+1){
              month.days.forEach( (day,index) => {
                if(this.day === index){
                  daysResult = {totalex: day.totalex, totaltodel: day.totaltodel};
                }
              })
            }
          })
        }
        this.summary.currentDate = this.currentDate;
        this.summary.totalex = daysResult.totalex;
        this.summary.totaltodel = daysResult.totaltodel;
      }
    }
	}
</script>

<style lang="scss" scoped>
  .automatic-delivery-content{
    max-width: 1400px;
    margin: 0 auto;
    .automatic-delivery-content__date{
      text-align: left;
    }
    .automatic-delivery-content__list{
      margin-top: 20px;
      padding: 0 40px;
    }
    .summary{
      line-height: 30px;
      text-align: left;
      font-size: 14px;
      color: #fff;
      span{
        margin-right: 20px;
      }
    }
  }

</style>
