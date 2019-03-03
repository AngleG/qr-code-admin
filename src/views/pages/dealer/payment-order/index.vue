<template>
    <div class="payment-order">
      <div class="payment-order_search">
        <el-select
          v-model="requestParams.agentaccountuser"
          size="small"
          placeholder="请选择">
          <el-option
            v-for="item in options.dealerList"
            :label="item.label"
            :key="item.value"
            :value="item.value">
          </el-option>
        </el-select>
        <el-select
        v-model="requestParams.from"
        size="small"
        placeholder="请选择">
          <el-option
          v-for="item in options.userSourceList"
          :label="item.label"
          :key="item.value"
          :value="item.value">
          </el-option>
        </el-select>
        <el-button size="small" type="primary" round @click="searchHandle">过滤</el-button>
        <el-button size="small" type="primary" round @click="downloadPaymentOrder">下载全部（每周一三五更新）</el-button>
      </div>
      <div class="payment-order_content">
        <element-table v-loading="tableListLoading" :table-columns="tableColumn" :table-data="tableData"></element-table>
        <customize-pagination ref="customizePaginationPaymentOrder" :total="total" :search-params="searchRequestParams"></customize-pagination>
      </div>
    </div>
</template>

<script>
  import webApi from '../../../../lib/api'
    export default {
      name: "index",
      data(){
        return{
          tableListLoading: false,
          requestParams: {
            pagenum: 0,  //默认从第一页开始：0
            agentaccountuser: 'ALL',
            from: 'ALL'
          },
          searchRequestParams: null,
          total: 0,
          options: {
            userSourceList: [
              {label: '全部', value: 'ALL'},
              {label: '微信', value: 'w'},
              {label: '支付宝', value: 'z'}
            ],
            dealerList: []
          },
          tableColumn: [
            {title: '经销商名称', align: 'center', key: 'agentcompany' },
            {title: '支付时间', align: 'center', key: 'lastupdatime' },
            {title: '支付金额', align: 'center', key: 'distotal' },
            {title: '状态', align: 'center', key: 'status', render: (h, params) => {
                let status = params.row.status;
                let str = '';
                if(status){
                  if(status === 'd'){
                    str = '已支付';
                  } else if (status === 'i') {
                    str = '支付中';
                  } else if (status === 'c') {
                    str = '已取消';
                  } else if (status === 'f') {
                    str = '支付失败';
                  }
                }
                return <span>{ str }</span>
              }},
            {title: '操作', align: 'center', key: 'agentcompany', render: (h, params) => {
              return h('el-button', {
                props:{
                  size: 'medium',
                  type: 'text'
                },
              }, '查看')
              }
            },
          ],
          tableData: []
        }
      },
      created() {
        this.getDealerList();
        this.searchRequestParams = JSON.parse(JSON.stringify(this.requestParams));
        this.getPaymentOrderList();
      },
      methods: {
        /**
         * 获取经销商列表
         */
        async getDealerList(){
          let res = await webApi.getDealerList();
          if(res.flags === 'success'){
            if (res.data && res.data.length) {
              res.data.map( item => this.options.dealerList.push({label: item.name, value: item.adminuser}))
              this.options.dealerList.unshift({label: '全部经销商', value: 'ALL'})
            }
          }else {
            this.$toast(res.message, 'error');
          }
        },
        /**
         * 获取支付订单列表
         * @returns {Promise<void>}
         */
        async getPaymentOrderList(){
          this.tableListLoading = true;
          let res = await webApi.getPaymentOrderList(this.searchRequestParams);
          if(res.flags === 'success'){
            if(res.data){
              this.tableData = res.data.pagedorders ? res.data.pagedorders : [];
              this.total = res.data.totalitems;
            }
          }else {
            this.tableData = [];
            this.total = 0;
            this.$toast(res.message, 'error');
          }
          this.tableListLoading = false;
        },
        /**
         * 过滤
         */
        searchHandle(){
          this.searchRequestParams = JSON.parse(JSON.stringify(this.requestParams));
          this.getPaymentOrderList();
        },
        /**
         * 下载全部
         */
        async downloadPaymentOrder(){
          let res = await webApi.downloadPaymentOrder();
          if(res.flags === 'success'){
            console.log(res);
          }else {
            this.$toast(res.message, 'error');
          }
        }
      }
    }
</script>

<style lang="scss" scoped>
.payment-order{
  .payment-order_search{
    min-height: 50px;
    line-height: 36px;
    padding: 7px 30px;
    text-align: left;
    overflow: hidden;
    .el-select{
      margin-right: 5px;
    }
    .el-input{
      width: 300px;
      margin-right: 5px;
    }
  }
  .payment-order_content{
    height: 100%;
    padding: 20px 30px;
    overflow-y: auto;
  }
}
</style>
