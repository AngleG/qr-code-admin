<template>
  <div class="login-container">
    <!--<el-row >-->
      <!--<el-col :span="5" :offset="1" :xs="{span: 24, offset: 0}" :sm="{span: 7, offset: 1}" :lg="{span: 5, offset: 1}" :xl="{span: 4, offset: 0.8}"><div class="grid-content bg-purple"></div></el-col>-->
      <!--<el-col :span="5" :offset="1" :xs="{span: 24, offset: 0}" :sm="{span: 7, offset: 1}" :lg="{span: 5, offset: 1}" :xl="{span: 4, offset: 0.8}"><div class="grid-content bg-purple-light"></div></el-col>-->
      <!--<el-col :span="5" :offset="1" :xs="{span: 24, offset: 0}" :sm="{span: 7, offset: 1}" :lg="{span: 5, offset: 1}" :xl="{span: 4, offset: 0.8}"><div class="grid-content bg-purple"></div></el-col>-->
      <!--<el-col :span="5" :offset="1" :xs="{span: 24, offset: 0}" :sm="{span: 7, offset: 1}" :lg="{span: 5, offset: 1}" :xl="{span: 4, offset: 0.8}"><div class="grid-content" style="background-color: red"></div></el-col>-->
      <!--<el-col :span="5" :offset="1" :xs="{span: 24, offset: 0}" :sm="{span: 7, offset: 1}" :lg="{span: 5, offset: 1}" :xl="{span: 4, offset: 0.8}"><div class="grid-content" style="background-color: yellow"></div></el-col>-->
    <!--</el-row>-->
  </div>
</template>

<script>
	export default {
		name: "login"
	}
</script>

<style scoped>
  .login-container{
    width: 100%;
    height: 100%;
    background-image: url("../../../static/assets/login-bg.jpg");
    background-position: center center;
  }
  .el-row {
    margin-bottom: 20px;
    &:last-child {
      margin-bottom: 0;
    }
  }
  .el-col {
    border-radius: 4px;
  }
  .bg-purple-dark {
    background: #99a9bf;
  }
  .bg-purple {
    background: #d3dce6;
  }
  .bg-purple-light {
    background: #e5e9f2;
  }
  .grid-content {
    border-radius: 4px;
    min-height: 236px;
  }
  .row-bg {
    padding: 10px 0;
    background-color: #f9fafc;
  }
</style>
