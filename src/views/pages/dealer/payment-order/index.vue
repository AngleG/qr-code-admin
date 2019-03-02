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
        <el-button size="small" type="primary" round>过滤</el-button>
        <el-button size="small" type="primary" round>下载全部（每周一三五更新）</el-button>
      </div>
      <div class="payment-order_content">
        <element-table :table-columns="tableColumn" :table-data="tableData"></element-table>
      </div>
    </div>
</template>

<script>
    export default {
      name: "index",
      data(){
        return{
          requestParams: {
            agentaccountuser: null,
            from: 'ALL'
          },
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
            {title: '状态', align: 'center', key: 'status' },
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
          tableData: [
            {agentcompany: '测试经销商1测试经销商1测试经销商1测试经销商1测试经销商1测试经销商1', lastupdatime: '2019/01/22', distotal: '0.01', status: '已支付'},
            {agentcompany: '测试经销商2', lastupdatime: '2019/01/22', distotal: '0.01', status: '已支付'},
            {agentcompany: '测试经销商3', lastupdatime: '2019/01/22', distotal: '0.01', status: '已支付'},
          ]
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
