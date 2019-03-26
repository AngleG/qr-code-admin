<template>
  <div class="exchange-order">
    <div class="exchange-order_search">
      <el-select
        size="small"
        v-model="searchParams.couponkey"
        :value="searchParams.couponkey"
        placeholder="请选择">
        <el-option
          v-for="item in configObject.couponList"
          :label="item.label"
          :key="item.value"
          :value="item.value"/>
      </el-select>
      <el-select
        v-model="searchParams.from"
        :value="searchParams.from"
        size="small"
        placeholder="请选择">
        <el-option
          v-for="item in configObject.SOURCE_LIST"
          :label="item.label"
          :key="item.value"
          :value="item.value" />
      </el-select>
      <el-button @click="getExchangeOrderList" size="small" type="primary" round>过滤</el-button>
      <el-button @click="downloadExchangeOrder" size="small" type="primary" round>下载全部（每周一三五更新）</el-button>
    </div>
    <div class="exchange-order_content">
      <element-table v-loading="isLoading" :table-columns="tableColumns" :table-data="tableData" element-loading-background="rgba(0, 0, 0, 0.5)"></element-table>
      <customize-pagination @getList="getExchangeOrderList" :page-count="totalPages"/>
    </div>
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
          <base-item class="w_50" inline><template slot="label">来源:</template>{{ exchangeDetail.from }}</base-item>
          <base-item class="w_50" inline><template slot="label">昵称:</template>{{ exchangeDetail.usernick }}</base-item>
          <base-item class="w_50" inline><template slot="label">快递公司:</template><template v-if="exchangeDetail.delcom">{{ exchangeDetail.delcom | formatConfigValueToLabel(configObject.EXPRESS_COMPANY_LIST)}}</template></base-item>
          <base-item class="w_50" inline><template slot="label">快递单号:</template><template v-if="exchangeDetail.delid">{{ exchangeDetail.delid }}</template></base-item>
          <base-item class="w_50" inline><template slot="label">性别:</template>{{ exchangeDetail.usergender | formatConfigValueToLabel(configObject.SEX_LIST)}}</base-item>
          <base-item class="w_50" inline><template slot="label">头像:</template><template v-if="exchangeDetail.userhead"><span class="user-head"><img :src="exchangeDetail.userhead" width="100%" height="100%"></span></template></base-item>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button size="small" @click="closeDialog" round>关闭</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
  import webApi from '../../../lib/api'
  import {SOURCE_LIST, EXPRESS_COMPANY_LIST, SEX_LIST} from '../../../conf/config-list'
  export default {
    data() {
      return {
        configObject: {
          SOURCE_LIST,
          SEX_LIST,
          EXPRESS_COMPANY_LIST,
          couponList: []
        },
        searchParams: {
          from: 'ALL',
          couponkey: 'ALL',
          pagenum: 0
        },
        tableColumns: [
          {title: '兑换来源', align: 'center', key: 'fromcouponname' },
          {title: '兑换目标', align: 'center', key: 'tocouponname' },
          {title: '更新时间', align: 'center', key: 'lastupdatime' },
          {title: '操作', align: 'center', render: (h, params) => <el-button onClick={this.setCurrentExchangeDetail.bind(this, params.row)} size="medium" type="text">查看</el-button>},
        ],
        tableData: [],
        isLoading: false,
        totalPages: 0,
        dialogVisible: false,
        exchangeDetail: null
      }
    },
    created() {
      this.getCouponList();
      this.getExchangeOrderList();
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
            this.configObject.couponList.unshift({label: '全部礼券', value: 'ALL'});
          }
        }else {
          this.$toast(res.message, 'error');
        }
      },
      /**
       * 获取兑换订单分页列表
       * @returns {Promise<void>}
       */
      async getExchangeOrderList(currentPage) {
        this.isLoading = true;
        let params = this.$_.cloneDeep(this.searchParams);
        params.pagenum = typeof currentPage === 'number' ? currentPage : 0;
        let res = await webApi.getExchangeOrderList(params);
        if (res.flags === 'success') {
          this.tableData = [];
          this.totalPages = 0;
          if (res.data) {
            this.totalPages = res.data.totalpages;
            this.tableData = res.data.pagedorders;
          }
        } else {
          this.$toast(res.message, 'error');
        }
        this.isLoading = false;
      },
      /**
       * 下载全部
       */
      async downloadExchangeOrder(){
        let res = await webApi.downloadExchangeOrder();
        if(res.flags === 'success'){
          this.$downloadFile(res.data,`兑换订单`, false, true)
        }else {
          this.$toast(res.message, 'error');
        }
      },
      openDialog() {
        this.dialogVisible = true;
      },
      closeDialog() {
        this.dialogVisible = false;
        if (this.exchangeDetail) {
          this.$restObjectAttribute(this.exchangeDetail)
        }
      },
      setCurrentExchangeDetail(row) {
        if (row) {
          this.exchangeDetail = this.$_.cloneDeep(row);
          this.openDialog();
        }
      }
    }
  }
</script>

<style lang="scss" scoped>
  .exchange-dialog-content{
    text-align: left;
    /deep/ {
      @include customFormItem(85px, 40px, #afafaf, #fff, false);
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
  .exchange-order {
    .exchange-order_search {
      min-height: 50px;
      line-height: 36px;
      padding: 7px 30px;
      text-align: left;
      overflow: hidden;
      .el-select {
        margin-right: 5px;
      }
      .el-input {
        width: 300px;
        margin-right: 5px;
      }
    }
    .exchange-order_content {
      height: 100%;
      padding: 20px 30px;
      overflow-y: auto;
    }
  }
</style>
