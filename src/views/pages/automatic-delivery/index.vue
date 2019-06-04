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
        <el-select placeholder="选择月份" style="width: 180px;" size="small" @change="changeTimeType('month')" v-model="month" :value="month" clearable>
          <el-option v-for="(item, index) in configObject.months" :key="index" :value="index+1" :label="`${index+1}月订单数${item.totalex} (待发${item.totaltodel})`"/>
        </el-select>
      </base-item >
      <base-item label-width="30px" inline>
        <template slot="label">日:</template>
        <el-select placeholder="选择日期" style="width: 180px;" size="small"  @change="changeTimeType('day')" v-model="day" :value="day" clearable>
          <el-option v-for="(item, index) in configObject.days" :key="index" :value="index+1" :label="`${index+1}日订单数${item.totalex} (待发${item.totaltodel})`"/>
        </el-select>
      </base-item>
      <base-item label-width="0" inline>
        <el-button @click="clearDateData" size="small" type="primary" round>刷新自动发货年月日下拉框</el-button>
      </base-item>
    </div>
    <base-item>
      <template slot="label">过滤:</template>
      <el-select placeholder="选择来源礼券" v-model="filterOption.fromcouponid" :value="filterOption.fromcouponid" size="small" clearable>
        <el-option v-for="(item, index) in configObject.couponList" :key="index" :value="item.value" :label="item.label"/>
      </el-select>
      <el-select placeholder="选择目标礼券" v-model="filterOption.tocouponid" :value="filterOption.tocouponid" size="small" clearable>
        <el-option v-for="(item, index) in configObject.couponList" :key="index" :value="item.value" :label="item.label"/>
      </el-select>
      <el-select placeholder="请选择发货情况" size="small" v-model="filterOption.shipSituation" :value="filterOption.shipSituation" @change="changeShipSituation">
        <el-option v-for="item in configObject.shipSituation" :key="item.value" :value="item.value" :label="item.label"/>
      </el-select>
    </base-item>
    <div class="automatic-delivery-content__list">
      <div class="summary"><span>订单列表：{{summary.currentDate}}日兑换订单数：{{summary.totalex}}</span><span>待发货：{{summary.totaltodel}}</span></div>
      <div class="order-table-content">
        <table class="order-table">
          <thead>
            <tr>
              <th class="order-table-column" v-for="column in tableColumns">
                <span v-if="column.type === 'selection'"  style="padding-left: 10px;"><el-checkbox :disabled="!tableData.length" v-model="isSelectedAll" @change="selectedAllRows"/></span>
                <span v-else-if="column.title === '操作'"  style="padding-right: 10px;">操作</span>
                <template v-else>{{ column.title }}</template>
              </th>
            </tr>
          </thead>
        </table>
      </div>
      <div class="order-table--empty" v-if="tableData.length === 0">暂无数据</div>
      <div class="order-table-content order-table-content__scroll">
        <table class="order-table">
          <template v-for="(combinedOrder, index) in combinedOrderList">
            <tbody class="order-table-body">
            <tr v-for="item in filterOrder(combinedOrder, filterOption.fromcouponid, filterOption.tocouponid)">
              <td v-for="column in tableColumns" class="order-table-td">
                <span v-if="column.type === 'selection'" style="padding-left: 10px;"><el-checkbox :disabled="!!(item.delcom || item.delid)" :label="item.orderkey" :value="selectedRows.includes(item.orderkey)" @change="value => changeSelectRow(value, item.orderkey)">{{ '' }}</el-checkbox></span>
                <span v-else-if="column.title === '操作'"  style="padding-right: 10px;"><el-button size="medium" type="text" @click="getExchangeDetail(item)">查看</el-button></span>
                <span v-else><span :title="column.title === '收货地址' ? `${item.recprov}${item.recity}${item.recounty}${item.recstreet}` : item[column.key]">{{
                  column.title === '收货地址' ? `${item.recprov}${item.recity}${item.recounty}${item.recstreet}` : item[column.key]
                  }}</span></span>
              </td>
            </tr>
            </tbody>
            <tbody v-if="index !== combinedOrderList.length - 1 && filterOrder(combinedOrder, filterOption.fromcouponid, filterOption.tocouponid).length">
              <tr><td style="height: 20px;"></td></tr>
            </tbody>
          </template>
          <tbody v-if="[10 ,30].includes(filterOption.shipSituation)">
            <tr v-for="item in filterOrder(singleOrderList, filterOption.fromcouponid, filterOption.tocouponid)">
              <td v-for="column in tableColumns" class="order-table-td">
                <span v-if="column.type === 'selection'" style="padding-left: 10px;"><el-checkbox :disabled="!!(item.delcom || item.delid)" :label="item.orderkey" :value="selectedRows.includes(item.orderkey)" @change="value => changeSelectRow(value, item.orderkey)">{{ '' }}</el-checkbox></span>
                <span v-else-if="column.title === '操作'"  style="padding-right: 10px;"><el-button size="medium" type="text" @click="getExchangeDetail(item)">查看</el-button></span>
                <span v-else><span :title="column.title === '收货地址' ? `${item.recprov}${item.recity}${item.recounty}${item.recstreet}` : item[column.key]">{{
                  column.title === '收货地址' ? `${item.recprov}${item.recity}${item.recounty}${item.recstreet}` : item[column.key]
                  }}</span></span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    <div  class="automatic-delivery-footer">
      <p v-if="isShowProcess" style="color: #fff; text-align: center;line-height: 34px; font-size: 18px;">{{ (totalpages ? pagenum + 1 : 0)/totalpages * 100 | formatToFixed}}{{ totalpages ? '%' : '' }}已加载</p>
      <base-item label-width="110px">
        <template slot="label">发货操作:</template>
        <el-select @change="delid = null" placeholder="选择快递公司" size="small" v-model="delcom" clearable>
          <el-option v-for="item in configObject.expressCompanyList" :key="item.value" :label="item.label" :value="item.value"/>
        </el-select>
        <el-button size="small" type="primary" @click="setAutomaticDeliveryCombined" round>合并发货</el-button>
        <el-button size="small" type="primary" @click="setAutomaticDeliveryBulkShipment" round>批量发货</el-button>
        <el-input v-model="delid" placeholder="快递单号" style="width: 200px;"  size="small" clearable/>
        <el-button size="small" type="primary" @click="manualDelivery" round>手动发货</el-button>
      </base-item>
      <el-dialog
        title="兑换单详情"
        :visible.sync="dialogVisible"
        :close-on-click-modal="false"
        @close="closeDialog"
        width="600px">
        <div class="exchange-dialog-content" v-if="exchangeDetail">
          <div class="clearfix">
            <base-item class="w_50" inline><template slot="label">来源礼券ID:</template>{{ exchangeDetail.fromcouponid }}</base-item>
            <base-item class="w_50" inline><template slot="label">目标礼券ID:</template>{{ exchangeDetail.tocouponid }}</base-item>
            <base-item class="w_50" inline><template slot="label">下单时间:</template>{{ exchangeDetail.createtime }}</base-item>
            <base-item class="w_50" inline><template slot="label">数量:</template>{{ exchangeDetail.couponum }}</base-item>
          </div>
          <base-item><template slot="label">收货地址:</template>{{ exchangeDetail.recprov }}{{exchangeDetail.recity}}{{exchangeDetail.recounty}}{{exchangeDetail.recstreet}}</base-item>
          <div class="clearfix">
            <base-item class="w_50" inline><template slot="label">收货人名称:</template>{{ exchangeDetail.recontact }}</base-item>
            <base-item class="w_50" inline><template slot="label">收货人电话:</template>{{ exchangeDetail.recphone }}</base-item>
          </div>
          <base-item><template slot="label">发货地址:</template>{{ exchangeDetail.sendprov }}{{exchangeDetail.sendcity}}{{exchangeDetail.sendcounty}}{{exchangeDetail.sendstreet}}</base-item>
          <div class="clearfix">
            <base-item class="w_50" inline><template slot="label">兑换人手机:</template>{{ exchangeDetail.usermobile }}</base-item>
            <base-item class="w_50" inline><template slot="label">祝福语:</template>{{ exchangeDetail.hello }}</base-item>
            <base-item class="w_50" inline><template slot="label">发货人名称:</template>{{ exchangeDetail.sendcontact }}</base-item>
            <base-item class="w_50" inline><template slot="label">发货人电话:</template>{{ exchangeDetail.sendphone }}</base-item>
            <base-item class="w_50" inline><template slot="label">来源:</template>{{ exchangeDetail.from | formatConfigValueToLabel(configObject.SOURCE_LIST) }}</base-item>
            <!--<base-item class="w_50" inline><template slot="label">昵称:</template>{{ exchangeDetail.usernick }}</base-item>-->
            <base-item class="w_50" inline><template slot="label">快递公司:</template><template v-if="exchangeDetail.delcom">{{ exchangeDetail.delcom | formatConfigValueToLabel(configObject.expressCompanyList)}}</template></base-item>
            <base-item class="w_50" inline><template slot="label">快递单号:</template><template v-if="exchangeDetail.delid">{{ exchangeDetail.delid }}</template></base-item>
            <!--<base-item class="w_50" inline><template slot="label">性别:</template>{{ exchangeDetail.usergender | formatConfigValueToLabel(configObject.SEX_LIST)}}</base-item>-->
            <!--<base-item class="w_50" inline><template slot="label">头像:</template><template v-if="exchangeDetail.userhead"><span class="user-head"><img :src="exchangeDetail.userhead" width="100%" height="100%"></span></template></base-item>-->
          </div>
        </div>
        <span slot="footer" class="dialog-footer">
        <el-button size="small" @click="closeDialog" round>关闭</el-button>
      </span>
      </el-dialog>
    </div>
  </div>
</template>

<script>
  import webApi from '../../../lib/api'
  import {SOURCE_LIST, SEX_LIST} from '../../../conf/config-list'
  import {mapMutations} from 'vuex'
	export default {
    data(){
      return {
        year: null,
        month: null,
        day: null,
        delcom: null,
        delid: null,
        filterOption: {
          fromcouponid: null,
          tocouponid: null,
          shipSituation: 10
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
          shipSituation: [
            {label: '全部', value: 10},
            {label: '合并发货', value: 20},
            {label: '未发货', value: 30}
          ],
          SOURCE_LIST,
          SEX_LIST
        },
        pagenum: 0,
        totalpages: 0,
        isShowProcess: false,
        currentIndex: 1,
        tableColumns: [
          {type: 'selection', width: 55, selectable: row => !(row.delcom || row.delid)},
          {title: '来源礼券', key: 'fromcouponname' },
          {title: '目标礼券', key: 'tocouponname' },
          {title: '数量', key: 'couponum' },
          {title: '收货地址',key:'recprov', formatter: row => `${row.recprov}${row.recity}${row.recounty}${row.recstreet}`},
          {title: '收货人', key: 'recontact' },
          {title: '兑换人', key: 'helloer' },
          {title: '兑换人手机号', key: 'usermobile' },
          {title: '祝福语', key: 'hello' },
          {title: '快递公司', key: 'delcomname' },
          {title: '快递单号', key: 'delid' },
          {title: '操作', render: (h, params) => <el-button size="medium" type="text" onClick={this.getExchangeDetail.bind(this, params.row)}>查看详情</el-button>}
        ],
        tableData: [],
        combinedOrderList: [],
        singleOrderList: [],
        selectedRows: [],
        isSelectedAll: false,
        dialogVisible: false,
        exchangeDetail: {}
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
      ...mapMutations([
          'changeGlobalLoading'
        ]),
      init() {
        this.getCouponList();
        this.getExpressCompanyList();
        this.getAutomaticDeliveryYears();
        this.getAutomaticDeliveryOrderList();
      },
      changeShipSituation(value){
        if (value === 30) {
          this.getCombinedAndSingleOrderList(true)
        } else if (10) {
          this.getCombinedAndSingleOrderList()
        }
      },
      selectedAllRows(value) {
        if (value) {
          this.selectedRows = this.tableData.filter(item => !(item.delcom || item.delid)).map(item => item.orderkey);
          this.isSelectedAll = true;
        } else {
          this.selectedRows = [];
          this.isSelectedAll = false;
        }
      },
      changeSelectRow(value, orderkey) {
        let index = this.selectedRows.indexOf(orderkey);
        if (index > -1) {
          this.selectedRows.splice(index, 1);
        } else {
          this.selectedRows.push(orderkey)
        }
        this.isSelectedAll = this.selectedRows.length && this.selectedRows.length === this.tableData.filter(item => !(item.delcom || item.delid)).length;
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
          configObject.days = this.month ? configObject.months[this.month - 1].days : [];
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
        this.$restObjectAttribute(this.summary);
        this.getAutomaticDeliveryYears();
        this.tableData = [];
        this.getCombinedAndSingleOrderList()
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
        this.isShowProcess = true;
        if (res.flags === 'success') {
          this.tableData = [];
          this.currentIndex = 1;
          const result = res.data;
          if (result) {
            this.pagenum = 0;
            this.totalpages = result.totalpages;
            this.tableData = [...this.tableData, ...result.orders];
            const promiseList = [];
            if (this.totalpages > 1) {
              while (this.currentIndex < this.totalpages) {
                promiseList.push(this.currentIndex);
                this.currentIndex++;
              }
            }
            const processArray = async arr => {
              for (let pagenum of arr) {
                let resultData = await webApi.getAutomaticDeliveryOrderList({date: params.date, pagenum});
                if (resultData.flags === 'success') {
                  const promiseResultData = resultData.data;
                  if (promiseResultData) {
                    this.tableData = [...this.tableData, ...promiseResultData.orders];
                  }
                } else {
                  this.$toast(resultData.message, 'error');
                }
                this.pagenum = pagenum;
              }
            };
            await processArray(promiseList);
            this.getCombinedAndSingleOrderList();
          }
        } else {
          this.$toast(res.message, 'error');
        }
        const timer = setTimeout(() => {
          this.isShowProcess = false;
          clearTimeout(timer)
        }, 500);
      },
      getCombinedAndSingleOrderList(isUnShipped = false) {
        let tableData = this.$_.cloneDeep(this.tableData);
        if (isUnShipped) {
          tableData = tableData.filter(item => !(item.delcom || item.delid));
        }
        this.$Progress.start();
        this.changeGlobalLoading(true);
        let combinedValueKeyList = [];
        let combinedValueList = [];
        tableData.forEach(item => {
          const {recprov, recity, recounty, recstreet, recontact, recphone, helloer, usermobile} = item;
          const combinedValueKey = `${recprov}${recity}${recounty}${recstreet}${recontact}${recphone}${helloer}${usermobile}`;
          let combinedValueKeyIndex = combinedValueKeyList.findIndex(key => key === combinedValueKey);
          if (combinedValueKeyIndex === -1) {
            combinedValueKeyList.push(combinedValueKey);
            combinedValueList.push([item]);
          } else {
            combinedValueList[combinedValueKeyIndex].push(item);
          }
        });
        const combinedOrderList = [];
        let singleOrderList = [];
        combinedValueList.forEach(combinedValue => {
          if (combinedValue.length === 1) {
            singleOrderList = singleOrderList.concat(combinedValue)
          } else {
            combinedOrderList.push(combinedValue)
          }
        });
        this.combinedOrderList = combinedOrderList;
        this.singleOrderList = singleOrderList;
        this.$Progress.finish();
        this.changeGlobalLoading(false);
      },
      /**
       * 获取礼券列表
       */
      async getCouponList(){
        let res = await webApi.getCouponList({});
        if(res.flags === 'success'){
          this.configObject.couponList = [];
          if(res.data && res.data.length){
            this.configObject.couponList = res.data.map(item => ({label: item.name, value: item.couponid}));
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
        const {selectedRows, delcom} = this.$data;
        if (selectedRows.length === 0) {
          return this.$toast('请勾选订单后批量发货')
        }
        let res = await webApi.setAutomaticDeliveryBulkShipment({exorderkeys: selectedRows, delcom});
        if(res.flags === 'success'){
          const result = res.data;
          this.combinedDeliveryAndBulkShipmentCallback(result);
        }else {
          this.$toast(res.message, 'error');
        }
      },
      //手动发货
      manualDelivery() {
        const {delcom, delid} = this.$data;
        if (!delcom) {
          return this.$toast('请选择快递公司后手动发货')
        }
        if (!delid) {
          return this.$toast('请输入单号后手动发货')
        }
        this.setAutomaticDeliveryCombined();
      },
      //合并发货
      async setAutomaticDeliveryCombined() {
        const {selectedRows, delcom} = this.$data;
        if (selectedRows.length === 0) {
          return this.$toast('请勾选订单后合并发货')
        }
        let res = await webApi.setAutomaticDeliveryCombined({exorderkeys: selectedRows, delcom});
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
            result.delresult.forEach((item, index) => {
              const {delcom, delcomname, delid} = result.delresult[index];
              const currentOrder = this.tableData.find(order => order.orderkey === item.exorderkey);
              currentOrder.delcom = delcom;
              currentOrder.delcomname = delcomname;
              currentOrder.delid = delid;
            });
            this.selectedRows = [];
            this.getCombinedAndSingleOrderList();
          }
          if (result.delmessage) {
            this.$toast(result.delmessage, 'success');
          }
        }
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
                if(this.day === index+1){
                  daysResult = {totalex: day.totalex, totaltodel: day.totaltodel};
                }
              })
            }
          })
        }
        this.summary.currentDate = this.currentDate;
        this.summary.totalex = daysResult.totalex;
        this.summary.totaltodel = daysResult.totaltodel;
      },
      openDialog(){
        this.dialogVisible = true;
      },
      closeDialog(){
        this.dialogVisible = false;
      },
      /**
       * 打开详情弹窗
       * @param row
       */
      getExchangeDetail(row){
        if (row) {
          this.exchangeDetail = this.$_.cloneDeep(row);
          this.openDialog();
        }
      },
      filterOrder(orderList, fromcouponid, tocouponid) {
        if (!orderList.length) {
          return orderList;
        }
        return orderList.filter( item => (!fromcouponid || item.fromcouponid === fromcouponid) && (!tocouponid || item.tocouponid === tocouponid));
      }
    }
	}
</script>

<style lang="scss" scoped>
  .automatic-delivery-content{
    min-width: 1400px;
    height: 100%;
    padding-bottom: 60px;
    position: relative;
    .automatic-delivery-footer{
      position: absolute;
      width: 100%;
      left: 0;
      bottom: 0;
    }
    .order-table-content{
      &.order-table-content__scroll{
        max-height: 550px;
        overflow: hidden;
        overflow-y: auto;
        margin-bottom: 10px;
      }
    }
    .order-table--empty{
      text-align: center;
      color: #fff;
      padding: 12px 0;
      background-color: #24304A;
      font-size: 14px;
    }
    .order-table{
      table-layout: fixed;
      width: 100%;
      color: #fff;
      background-color: #182337;
      font-size: 14px;
      .order-table-thead__hidden{
        visibility: hidden;
        .order-table-column{
          padding: 0;
        }
      }
      .order-table-body{
        border: 1px solid #323c54;
      }
      .order-table-column, .order-table-td{
        padding: 12px 0;
        min-width: 0;
        -webkit-box-sizing: border-box;
        box-sizing: border-box;
        text-overflow: ellipsis;
        white-space: nowrap;
        overflow: hidden;
        vertical-align: middle;
        position: relative;
        text-align: center;
        line-height: 16px;
        &:first-child{
          width: 30px;
        }
        &:last-child{
          width: 90px;
        }
      }
      .order-table-td{
        padding: 12px 4px;
        color: #828282;
      }
    }
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
  .exchange-dialog-content{
    text-align: left;
    /deep/ {
      @include customFormItem(85px, 34px, #afafaf, #fff, false);
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
  }
</style>
