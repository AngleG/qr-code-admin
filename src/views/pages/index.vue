<template>
  <el-container>
    <el-aside style="width: auto;">
      <side-bar/>
      <ul class="options">
        <li></li>
        <li></li>
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

<style>
  .el-header {
    background-color: #101421;
    color: #909090;
    line-height: 60px;
    text-align: right;
  }
  .el-aside {
    background-color: #191d2a;
    text-align: center;
  }
  .el-main {
    background-color: #060b17;
    color: #333;
    text-align: center;
    line-height: 160px;
  }
</style>
