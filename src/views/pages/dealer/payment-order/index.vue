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
      <el-dialog
        width="600px"
      :visible.sync="dialogOption.isVisible"
      :title="dialogOption.title">
        <div class="dialog-content">
          <div>
            <span class="label">支付账号:</span>
            <span class="text-field">{{detail.accountuser}}</span>
            <span class="label">礼券名称/礼券id:</span>
            <span class="text-field">{{`${detail.couponname}/${detail.couponid}`}}</span>
          </div>
          <div>
            <span class="label">下单时间:</span>
            <span class="text-field">{{detail.createtime}}</span>
            <span class="label">折扣:</span>
            <span class="text-field">{{detail.discount}}</span>
          </div>
          <div>
            <span class="label">张数:</span>
            <span class="text-field">{{detail.couponum}}</span>
            <span class="label">原单价:</span>
            <span class="text-field">{{detail.nodisvalue}}</span>
          </div>
          <div>
            <span class="label">来源:</span>
            <span class="text-field">{{detail.from}}</span>
            <span class="label">昵称:</span>
            <span class="text-field">{{detail.usernick}}</span>
          </div>
          <div class="avatar">
            <span class="label">性别:</span>
            <span class="text-field">{{detail.usergender && options.sexList.find(item => item.value === detail.usergender).label}}</span>
            <span class="label">头像:</span>
            <span class="text-field" v-if="detail.userhead">
              <i><img :src="detail.userhead" width="100%" height="100%"></i>
            </span>
          </div>
        </div>
        <div slot="footer" class="dialog-footer">
          <el-button size="small" @click="dialogOption.isVisible = false">关 闭</el-button>
        </div>
      </el-dialog>
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
            dealerList: [],
            sexList: [
              { label: '男', value: 'm'},
              { label: '女', value: 'f'},
              { label: '未知', value: 'o'}
            ]
          },
          tableColumn: [
            {title: '经销商名称', align: 'center', key: 'agentcompany' },
            {title: '支付时间', align: 'center', key: 'lastupdatime' },
            {title: '支付金额', align: 'center', key: 'distotal' },
            {title: '状态', align: 'center', key: 'status', render: (h, params) => <span>{ this.$options.filters.paymentOrderStatusToText(params.row.status) }</span>},
            {title: '操作', align: 'center', key: 'agentcompany', render: (h, params) => {
              let index = params.index;
              return h('el-button', {
                props: {
                  size: 'medium',
                  type: 'text'
                },
                on: {
                  click: () =>{
                    return this.openDialogFn(index);
                  }
                }
              }, '查看')
              }
            },
          ],
          tableData: [],
          dialogOption: {
            isVisible: false,
            title: '详细信息'
          },
          detail: {}
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
            this.$downloadFile(res.data,`支付订单.xlsx`, false, true)
          }else {
            this.$toast(res.message, 'error');
          }
        },
        /**
         * 打开详情弹窗
         */
        openDialogFn(index){
          this.dialogOption.isVisible = true;
          this.detail = this.tableData[index];
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
      vertical-align: middle;
      line-height: 18px;
    }
    .label{
      width: 65px;
      color: #AFAFAF;
      text-align: left;
    }
    .text-field{
      width: 200px;
      color: #eee;
    }
    .dialog-footer{
      text-align: center;
    }
  }
}
</style>
