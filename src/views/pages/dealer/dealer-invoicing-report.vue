<template>
  <div class="exchange-order">
    <div class="exchange-order_search">
      <el-select style="width: 215px;" v-model="searchParams.agentcompanykey" :value="searchParams.agentcompanykey" size="small">
        <el-option v-for="item in configObject.dealerList" :label="item.label" :value="item.value" :key="item.value"/>
      </el-select>
      <el-button @click="getInvoicingReportList" size="small" type="primary" round>查看</el-button>
    </div>
    <div class="exchange-order_content">
      <element-table v-loading="isLoading" :table-columns="tableColumns" :table-data="tableData" element-loading-background="rgba(0, 0, 0, 0.5)"></element-table>
      <element-table v-loading="isLoading2" max-height="500px" :table-columns="tableColumns2" :table-data="tableData2" element-loading-background="rgba(0, 0, 0, 0.5)"></element-table>
    </div>
  </div>
</template>

<script>
  import webApi from '../../../lib/api'
  import {SOURCE_LIST, SEX_LIST} from '../../../conf/config-list'
  export default {
    data() {
      return {
        configObject: {
          SOURCE_LIST,
          SEX_LIST,
          dealerList: []
        },
        searchParams: {
          agentcompanykey: 'ALL',
          pagenum: 0
        },
        tableColumns: [
          {title: '经销商', align: 'center', key: 'name'},
          {title: '总共张数', align: 'center', key: 'couponum'},
          {title: '激活张数', align: 'center', key: 'paidnum'},
          {title: '未激活张数', align: 'center', key: 'unpaynum'},
          {title: '兑换张数', align: 'center', key: 'exnum'},
          {title: '未兑换张数', align: 'center', key: 'unexnum'},
        ],
        tableColumns2: [
          {title: '礼券名称', align: 'center', key: 'name'},
          {title: '总共张数', align: 'center', key: 'total'},
          {title: '激活张数', align: 'center', key: 'pay'},
          {title: '未激活张数', align: 'center', key: 'nopay'},
          {title: '兑换张数', align: 'center', key: 'ex'},
          {title: '未兑换张数', align: 'center', key: 'noex'},
        ],
        tableData: [],
        tableData2: [],
        isLoading: false,
        isLoading2: false,
      }
    },
    created() {
      this.getDealerList();
      this.getInvoicingReportList();
      this.getInvoicingCouponList();
    },
    methods: {
      /**
       * 获取经销商列表
       */
      async getDealerList(){
        let res = await webApi.getDealerList();
        if (res.flags === 'success') {
          this.configObject.dealerList = [{label: '全部经销商', value: 'ALL'}];
          if (res.data && res.data.length) {
            this.configObject.dealerList = [...this.configObject.dealerList, ...res.data.map(item => Object.assign(item, {label: item.name, value: item.companykey}))];
          }
        }else {
          this.$toast(res.message, 'error');
        }
      },
      /**
       * 获取进销存列表
       * @returns {Promise<void>}
       */
      async getInvoicingReportList(currentPage) {
        this.isLoading = true;
        let params = this.$_.cloneDeep(this.searchParams);
        let res = await webApi.getInvoicingReportList(params);
        if (res.flags === 'success') {
          this.tableData = [];
          if (res.data) {
            this.tableData = res.data;
          }
        } else {
          this.$toast(res.message, 'error');
        }
        this.isLoading = false;
      },
      /**
       * 获取进销存礼券列表
       * @returns {Promise<void>}
       */
      async getInvoicingCouponList() {
        this.isLoading2 = true;
        const loginkey = JSON.parse(localStorage.getItem('loginkey'));
        let res = await webApi.getInvoicingCouponList({loginkey: loginkey.loginkey, eid: loginkey.eid});
        if (res.flags === 'success') {
          this.tableData2 = [];
          if (res.data) {
            this.tableData2 = res.data;
          }
        } else {
          this.$toast(res.message, 'error');
        }
        this.isLoading2 = false;
      },
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
