<template>
  <el-container>
    <el-aside style="width: auto;">
      <side-bar/>
      <ul class="options">
        <li><span><i class="iconfont icon-tuichu"></i>退出登录</span></li>
        <li><span><i class="iconfont icon-xiugaimima"></i>修改密码</span></li>
      </ul>
    </el-aside>
    <el-container>
      <el-header>欢迎登陆智能唯一二维码系统</el-header>
      <el-main>
        <router-view/>
      </el-main>
    </el-container>
  </el-container>

</template>

<script>
  import sideBar from '../../views/common/app-nav'
	export default {
    components: {
      sideBar
    }
	}
</script>

<style lang="scss">
  .options{
    position: absolute;
    width: 100%;
    bottom: 30px;
    left: 0;
    i{
      margin-right: 10px;
      font-size: 16px;
    }
    li {
      height: 40px;
      line-height: 40px;
      text-align: left;
      padding: 0 50px;
      font-size: 14px;
      color: rgb(144, 144, 144);
      background-color: rgb(25, 29, 42);
    }
    span{
      cursor: pointer;
    }
  }
</style>
