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
  position: relative;
  .hello{
    position: absolute;
    width: 100%;
    top: 40%;
    left: 0;
    padding: 0 20px;
    text-align: center;
    color: #C8C8C8;
    font-size: 26px;
    line-height: 32px;
  }
}
</style>
