<template>
    <div class="dealer-container">
      <div class="dealer-header">
        <div class="dealer-create">
          <el-input size="small" style="margin-left: 0" placeholder="经销商名称" maxlength="20"></el-input>
          <el-input size="small" placeholder="联系人姓名" maxlength="20"></el-input>
          <el-input size="small" placeholder="联系人电话" maxlength="20"></el-input>
          <el-button style="margin-left: 5px;" type="primary" size="small" round>创建经销商</el-button>
        </div>
        <div class="dealer-search">
          <el-input size="small" style="margin-left: 0" placeholder="查经销商名称" maxlength="20"></el-input>
          <el-input size="small" placeholder="查主账号" maxlength="20"></el-input>
          <el-button style="margin-left: 5px;" type="primary" size="small" round>查询</el-button>
        </div>
      </div>
      <div class="dealer-content">
        <div class="dealer-list"></div>
        <el-row>
          <el-col :span="5" :offset="1" :xs="{span: 24, offset: 0}" :sm="{span: 7, offset: 1}" :lg="{span: 5, offset: 1}" :xl="{span: 4, offset: 0.8}"><div class="grid-content bg-purple"></div></el-col>
          <el-col :span="5" :offset="1" :xs="{span: 24, offset: 0}" :sm="{span: 7, offset: 1}" :lg="{span: 5, offset: 1}" :xl="{span: 4, offset: 0.8}"><div class="grid-content bg-purple-light"></div></el-col>
          <el-col :span="5" :offset="1" :xs="{span: 24, offset: 0}" :sm="{span: 7, offset: 1}" :lg="{span: 5, offset: 1}" :xl="{span: 4, offset: 0.8}"><div class="grid-content bg-purple"></div></el-col>
          <el-col :span="5" :offset="1" :xs="{span: 24, offset: 0}" :sm="{span: 7, offset: 1}" :lg="{span: 5, offset: 1}" :xl="{span: 4, offset: 0.8}"><div class="grid-content" style="background-color: red"></div></el-col>
          <el-col :span="5" :offset="1" :xs="{span: 24, offset: 0}" :sm="{span: 7, offset: 1}" :lg="{span: 5, offset: 1}" :xl="{span: 4, offset: 0.8}"><div class="grid-content" style="background-color: yellow"></div></el-col>
        </el-row>
      </div>
    </div>
</template>

<script>
	export default {
	}
</script>

<style lang="scss" scoped>
  .dealer-container{
    height: 100%;
    padding-bottom: 50px;
    overflow: hidden;
    .dealer-header{
      min-height: 50px;
      line-height: 36px;
      padding: 7px 30px;
      text-align: left;
      overflow: hidden;
      .el-input{
        width: 200px;
        margin-left: 10px;
      }
      .dealer-create{
        float: left;
      }
      .dealer-search{
        float: right;
      }
    }
    .dealer-content{
      height: 100%;
      padding: 20px 30px;
      overflow-y: auto;
      .dealer-list{
        width: 360px;
        height: 300px;
        @include list-layout;
      }
    }
  }
</style>
