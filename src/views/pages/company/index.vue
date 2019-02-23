<template>
    <div class="company-wrap">
      <div class="company-content">
        <div class="company-upload">
          <div class="file-box"></div>
          <el-button type="text">浏览..</el-button>
          <el-button class="upload-btn" type="primary" size="small" round>上传企业logo</el-button>
        </div>
        <div class="company-form">
          <el-input size="small" prefix-icon="iconfont icon-qiye1" placeholder="企业名称"/>
          <el-input size="small" prefix-icon="iconfont icon-dizhi" placeholder="企业地址"/>
          <el-input size="small" prefix-icon="iconfont icon-yonghu" placeholder="企业联系人姓名"/>
          <el-input size="small" prefix-icon="iconfont icon-shouji" placeholder="企业联系人电话"/>
          <el-input size="small" prefix-icon="iconfont icon-youxiang" placeholder="企业邮箱"/>
          <el-input size="small" prefix-icon="iconfont icon-wangzhan" placeholder="企业官网"/>
          <div class="company-address">
            <i class="iconfont icon-dizhi1"></i>发货省<el-select size="samll"></el-select>发货市<el-select  size="samll"></el-select>发货区县<el-select  size="samll"></el-select>
          </div>
          <el-input size="small" prefix-icon="iconfont icon-yonghu" placeholder="发货联系人姓名"/>
          <el-input size="small" prefix-icon="iconfont icon-shouji" placeholder="发货联系人电话"/>
        </div>
      </div>
      <el-button class="confirm" type="primary" round>保存修改</el-button>
    </div>
</template>

<script>
	export default {
		name: "index"
	}
</script>

<style lang="scss" scoped>
  .company-wrap{
    padding: 20px;
    background-color: rgb(24, 35, 55);
    border-radius: 5px;
    border: 1px solid rgb(26, 39, 58);
    width: 600px;
    line-height: 24px;
    .company-content{
      overflow: auto;
      color: #909090;
      .company-upload{
        float: left;
        width: 105px;
        text-align: center;
        .file-box{
          width: 100%;
          height: 105px;
          border: 1px solid rgb(22, 28, 42);
          border-radius: 5px;
          background-color: rgb(40, 49, 66);
        }
        .upload-btn{
          margin: 5px 0 0 0;
        }
      }
      .company-form{
        position: relative;
        margin-left: 105px;
        padding: 0 25px;
        text-align: left;
        .el-input{
          margin-bottom: 10px;
          width: 230px;
        }
        .company-address{
          font-size: 12px;
          margin-bottom: 10px;
          .el-select{
            margin: 0 5px;
            width: 90px;
          }
        }
      }
    }
    .confirm{
      margin-top: 40px;
      padding: 5px 30px;
    }
  }
</style>
