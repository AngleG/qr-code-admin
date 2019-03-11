<template>
  <div class="coupon-operating">
    <div class="coupon-operating_search">
      <el-select
        size="small"
        v-model="searchParams.couponkey"
        :value="searchParams.couponkey"
        placeholder="请选择礼劵">
        <el-option
          v-for="item in configObject.couponList"
          :label="item.label"
          :key="item.value"
          :value="item.value"/>
      </el-select>
      <el-button @click="getCouponOperatingList" size="small" type="primary" round>查询</el-button>
      <el-select
        size="small"
        style="margin-left: 20px;"
        v-model="requestParams.agentcompanykey"
        :value="requestParams.agentcompanykey"
        placeholder="请选择经销商">
        <el-option
          v-for="item in configObject.dealerList"
          :label="item.label"
          :key="item.value"
          :value="item.value"/>
      </el-select>
      <base-item inline><template slot="label">激活起始序列号:</template><el-input v-model="requestParams.activation.serialfrom" size="small"/></base-item>
      <base-item label-width="45px" inline><template slot="label">张数:</template><el-input v-model="requestParams.activation.num" size="small"/> <el-button @click="setCouponStatus('activation')" size="small" type="primary" round>激活</el-button></base-item>
      <base-item inline><template slot="label">撤销起始序列号:</template><el-input v-model="requestParams.cancel.serialfrom" size="small"/></base-item>
      <base-item label-width="45px" inline><template slot="label">张数:</template><el-input v-model="requestParams.cancel.num" size="small"/><el-button @click="setCouponStatus('cancel')" size="small" type="primary" round>撤销</el-button></base-item>
    </div>
    <div class="coupon-operating_content">
      <element-table v-loading="isLoading" :table-columns="tableColumns" :table-data="tableData" element-loading-background="rgba(0, 0, 0, 0.5)"></element-table>
      <customize-pagination @getList="getCouponOperatingList" :total="total"/>
    </div>
  </div>
</template>

<script>
  import webApi from '../../../lib/api'
  import {COUPON_STATUS} from '../../../conf/config-list'
  export default {
    data() {
      return {
        configObject: {
          COUPON_STATUS,
          couponList: [],
          dealerList: []
        },
        searchParams: {
          couponkey: null,
          pagenum: 0
        },
        requestParams: {
          agentcompanykey: null,
          activation: {
            serialfrom: null,
            num: null
          },
          cancel: {
            serialfrom: null,
            num: null
          }
        },
        tableColumns: [
          {title: '时间', width: 160, align: 'center', key: 'time' },
          {title: '起始编号', align: 'center', key: 'sfrom' },
          {title: '终止编号', align: 'center', key: 'sto' },
          {title: '事件', align: 'center', key: 'action', render: (h, params) => <span>{ this.$options.filters.formatConfigValueToLabel(params.row.action, this.configObject.COUPON_STATUS) }</span>},
          {title: '成功张数', align: 'center', key: 'successnum' },
          {title: '失败张数', align: 'center', key: 'failnum' }
        ],
        tableData: [],
        isLoading: false,
        total: 0
      }
    },
    created() {
      this.getDealerList();
      this.getCouponList();
    },
    methods: {
      /**
       * 获取经销商列表
       */
      async getDealerList(){
        let res = await webApi.getDealerList();
        if (res.flags === 'success') {
          this.configObject.dealerList = [];
          if (res.data && res.data.length) {
            this.configObject.dealerList = res.data.map(item => Object.assign(item, {label: item.name, value: item.companykey}));
          }
        }else {
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
            this.configObject.couponList = res.data.reverse().map(item => ({label: item.name, value: item.couponkey}));
          }
        }else {
          this.$toast(res.message, 'error');
        }
      },
      //获取经销商激活和撤销列表
      async getCouponOperatingList(currentPage) {
        this.isLoading = true;
        let params = this.$_.cloneDeep(this.searchParams);
        if (typeof currentPage === 'number') {
          params.pagenum = currentPage;
        }
        let res = await webApi.getCouponOperatingList(params);
        if (res.flags === 'success') {
          this.tableData = [];
          this.total = 0;
          if (res.data) {
            this.total = this.$config.PAGE_SIZE * res.data.totalpages;
            this.tableData = res.data.list;
          }
          this.isLoading = false;
        } else {
          this.$toast(res.message, 'error');
        }
      },
      //设置礼劵状态
      async setCouponStatus(status) {
        if (!status) {
          return this.$toast('礼劵状态不能为空')
        }
        let isCancel = status === 'cancel';
        let statusStr = isCancel ? '撤销' : '激活';
        let params = this.$_.cloneDeep(this.requestParams[status]);
        let {serialfrom, num} = params;

        let agentcompanykey = this.requestParams.agentcompanykey;
        let couponkey = this.searchParams.couponkey;

        if (!couponkey) {
          return this.$toast(`请选择礼劵后${statusStr}`)
        }
        params = Object.assign(params, {couponkey});

        if (!agentcompanykey) {
          return this.$toast(`请选择经销商后${statusStr}`)
        }

        if (serialfrom === null || serialfrom === '' || num === null || num === '') {
          return this.$toast('起始序列号和张数不能为空')
        }
        params.serialfrom = serialfrom = serialfrom - 0;
        params.num = num = num - 0;
        if (typeof serialfrom !== 'number' || typeof num !== 'number') {
          return this.$toast('起始序列号和张数必须为数字')
        }
        if (serialfrom < 1) {
          return this.$toast(`${statusStr}起始序列号必须大于或等于1`)
        }
        if (num < 0 || num > 1000) {
          return this.$toast(`${statusStr}张数必须大于0且小于或等于1000`)
        }
        let res = isCancel ? await webApi.setCouponForCancel(params) : await webApi.setCouponForActivation(params);
        if (res.flags === 'success') {
          this.setCouponStatusConfirm(res.data, params, isCancel);
        } else {
          this.$toast(res.message, 'error');
        }
      },
      /**
       * 确定激活api
       * @param result
       * @param params
       * @param isCancel
       * @returns {Promise<void>}
       */
      async enterCouponStatus(result, params, isCancel) {
        let agentcompanykey = this.requestParams.agentcompanykey;
        let requestParams = Object.assign({}, {couponkey: result.couponkey, action: result.action}, {serialfrom: params.serialfrom, num: params.num, agentcompanykey});
        let res = await webApi.enterCouponStatus(requestParams);
        if (res.flags === 'success') {
          this.$toast(`${isCancel ? '撤销' : '激活'}成功`, 'success');
          this.getCouponOperatingList(0);
        } else {
          this.$toast(res.message, 'error');
        }
      },
      /**
       * 确定弹窗
       * @param result
       * @param params
       * @param isCancel
       */
      setCouponStatusConfirm(result, params, isCancel) {
        this.$confirm(`请确认${result.serialfrom}到${result.serialto}范围内第一张支付码${result.codestart}的序列号为${result.serialfrom}，最后一张支付码${result.codelast}的序列号为${result.serialto}，是否确认${isCancel ? '撤销' : '激活'}?`, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          roundButton: true,
          type: 'warning'
        }).then(() => this.enterCouponStatus(result, params, isCancel)).catch(() => {
        });
      }
    }
  }
</script>

<style lang="scss" scoped>
  /deep/ {
    @include customFormItem(125px, 36px, #fff, #fff, false);
    .custom-form-item{
      vertical-align: middle;
    }
  }
  .coupon-operating {
    .coupon-operating_search {
      min-height: 50px;
      line-height: 36px;
      padding: 7px 30px;
      text-align: left;
      overflow: hidden;
      .el-select {
        margin-right: 5px;
      }
      .el-input {
        width: 80px;
        margin-right: 5px;
      }
    }
    .coupon-operating_content {
      height: 100%;
      padding: 20px 30px;
      overflow-y: auto;
    }
  }
</style>
