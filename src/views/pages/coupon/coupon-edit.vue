<template>
    <div class="coupon">
      <div class="coupon_header">
        <el-input size="small" placeholder="礼券名称" v-model="requestParams.name"></el-input>
        <el-button type="primary" size="small" round @click="createCouponHandle">创建礼券</el-button>
      </div>
      <div class="coupon_content">
        <div class="fl" v-if="couponList.length" v-for="item in couponList">
          <base-coupon :coupon-detail="item" @callback="updateCouponList"/>
        </div>
      </div>
    </div>
</template>

<script>
  import baseCoupon from "./base/base-coupon"
  import webApi from '../../../lib/api'
    export default {
      name: "index",
      components: {
        baseCoupon
      },
      data () {
        return {
          requestParams: {
            name: null
          },
          couponList: []
        }
      },
      created () {
        this.getCouponList();
      },
      methods: {
        /**
         * 创建礼券
         */
        async createCouponHandle(){
          if(!this.requestParams.name){
            return this.$toast('请输入礼券名称！');
          }
          let res = await webApi.createCoupon(this.requestParams);
          if(res.flags === 'success'){
            this.$toast('礼券创建成功!', 'success');
            this.getCouponList();
          }else {
            this.$toast(res.message, 'error');
          }
        },
        /**
         * 获取礼券列表
         */
        async getCouponList(){
          let params = JSON.parse(JSON.stringify(this.requestParams));
          delete params.name;
          let res = await webApi.getCouponList(params);
          if(res.flags === 'success'){
            if(res.data && res.data.length){
              this.couponList = res.data;
            }
          }else {
            this.$toast(res.message, 'error');
          }
        },
        /**
         * 更新礼券列表
         */
        updateCouponList(){
          this.requestParams.name = null;
          this.getCouponList();
        }
      }
    }
</script>

<style lang="scss" scoped>
.coupon{
  width: 100%;
  /*height: auto;*/
  .coupon_header{
    min-height: 50px;
    line-height: 36px;
    padding: 7px 30px;
    text-align: left;
    overflow: hidden;
    .el-input{
      width: 300px;
      margin-right: 5px;
    }
  }
  .coupon_content{
    height: 100%;
    padding: 20px 30px;
    overflow-y: auto;
  }
}
</style>
