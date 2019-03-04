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
      <element-table v-loading="isLoading" :table-columns="tableColumns" :table-data="tableData"></element-table>
      <customize-pagination :total="total" :currentPage="totalpages"/>
    </div>
  </div>
</template>

<script>
  import webApi from '../../../../lib/api'
  import {SOURCE_LIST} from '../../../../conf/config-list'
  export default {
    data() {
      return {
        configObject: {
          SOURCE_LIST,
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
          {title: '操作', align: 'center', render: (h, params) => <el-button size="medium" type="text">查看</el-button>},
        ],
        tableData: [],
        isLoading: false,
        total: 0,
        totalpages: 0
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
      async getExchangeOrderList() {
        this.isLoading = true;
        let res = await webApi.getExchangeOrderList(this.searchParams);
        if (res.flags === 'success') {
          this.tableData = [];
          this.total = 0;
          this.totalpages = 0;
          if (res.data) {
            this.total = res.data.totalitems;
            this.tableData = res.data.pagedorders;
            this.totalpages = res.data.totalpages;
          }
          this.isLoading = false;
        } else {
          this.$toast(res.message, 'error');
        }
      },
      /**
       * 下载全部
       */
      async downloadExchangeOrder(){
        let res = await webApi.downloadExchangeOrder();
        if(res.flags === 'success'){
          this.$downloadFile(res.data,`兑换订单.xlsx`, false, true)
        }else {
          this.$toast(res.message, 'error');
        }
      }
    }
  }
</script>

<style lang="scss" scoped>
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
