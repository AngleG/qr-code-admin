<template>
    <div class="welcome">
      <div class="hello">欢迎登录智能唯一二维码系统</div>
    </div>
</template>

<script>
    export default {
        name: "welcome",
      data(){
          return {
            loginTime: null
          }
      }
    }
</script>

<style lang="scss" scoped>
.welcome{
  width: 100%;
  height: 100%;
  .hello{
    padding: 0 20px;
    color: #C8C8C8;
    font-size: 26px;
    line-height: 32px;
    text-align: center;
    margin-top: 40%;
  }
}
</style>
