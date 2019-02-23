<template>
    <div class="gift-certificate">
      <div class="gift-certificate_header">
        <el-input size="small" placeholder="礼券名称"></el-input>
        <el-button type="primary" size="small" round="">创建礼券</el-button>
      </div>
      <!--<base-gift-certificate></base-gift-certificate>-->
      <el-row>
        <el-col :xs="24" :sm="24" :md="24" :lg="12" :xl="12">
          <base-gift-certificate></base-gift-certificate>
        </el-col>
      </el-row>
    </div>
</template>

<script>
  import baseGiftCertificate from "./base/base-gift-certificate"
    export default {
        name: "index",
      components: {
        baseGiftCertificate
      }
    }
</script>

<style lang="scss" scoped>
.gift-certificate{
  width: 100%;
  /*height: auto;*/
  .gift-certificate_header{
    width: 100%;
    height: 50px;
    text-align: left;
    .el-input{
      width: 300px;
      margin-right: 5px;
    }
  }
}
</style>
