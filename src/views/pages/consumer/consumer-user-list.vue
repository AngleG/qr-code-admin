<template>
  <div class="exchange-order">
    <div class="exchange-order_search">
      <el-input style="width: 215px;" v-model="searchParams.mobile" size="small" />
      <el-button @click="getUserList" size="small" type="primary" round>查询</el-button>
    </div>
    <div class="exchange-order_content">
      <element-table v-loading="isLoading" :table-columns="tableColumns" :table-data="tableData" element-loading-background="rgba(0, 0, 0, 0.5)"></element-table>
      <customize-pagination @getList="getUserList" :page-count="totalPages"/>
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
          SEX_LIST
        },
        searchParams: {
          mobile: null,
          pagenum: 0
        },
        tableColumns: [
          {title: '昵称', align: 'center', key: 'usernick'},
          {title: '性别', width: 50, align: 'center', key: 'usergender', formatter: (row) => this.$options.filters.formatConfigValueToLabel(row.usergender, this.configObject.SEX_LIST, false)},
          {title: '头像', width: 70, align: 'center', key: 'userhead', render: (h, params) => {
            return <img width="100%" style="border-radius: 50%" src={params.row.userhead}/>
            }},
          {title: '来源', width: 80, align: 'center', key: 'from', formatter: (row) => this.$options.filters.formatConfigValueToLabel(row.from, this.configObject.SOURCE_LIST, false)},
          {title: 'ID', align: 'center', key: 'userid'},
          {title: '兑换人手机号', width: 120, align: 'center', key: 'usermobile' },
          {title: '省', width: 80, align: 'center', key: 'recprov' },
          {title: '市', width: 80, align: 'center', key: 'recity' },
          {title: '区', width: 80, align: 'center', key: 'recounty' },
          {title: '街道', align: 'center', key: 'recstreet' },
          {title: '收货人姓名', align: 'center', key: 'recontact' },
          {title: '收货人手机号', width: 120, align: 'center', key: 'recphone' },
        ],
        tableData: [],
        isLoading: false,
        totalPages: 0
      }
    },
    created() {
      this.getUserList();
    },
    methods: {
      /**
       * 获取用户分页列表
       * @returns {Promise<void>}
       */
      async getUserList(currentPage) {
        this.isLoading = true;
        let params = this.$_.cloneDeep(this.searchParams);
        params.pagenum = currentPage ? currentPage : 0;
        let res = await webApi.getUserList(params);
        if (res.flags === 'success') {
          this.tableData = [];
          this.totalPages = 0;
          if (res.data) {
            this.totalPages = res.data.totalpages;
            this.tableData = res.data.pagedlist;
          }
        } else {
          this.$toast(res.message, 'error');
        }
        this.isLoading = false;
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
