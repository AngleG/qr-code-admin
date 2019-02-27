<template>
    <div class="troubleshoot">
      <div class="troubleshoot-search">
          <input type="file" accept="image/png,image/jpeg,image/gif" name="file" id="file" style="font-size: 12px;">
        <el-button size="small" type="primary" round style="margin-right: 20px;">二维码图片查询</el-button>
          <!--<label for="file"><span class="file-button">请选择文件</span></label>-->
        <el-input size="small" placeholder="请输入二维码" style="width: 200px; margin-right: 5px;"></el-input>
        <el-button size="small" type="primary" round>查询</el-button>
      </div>
      <div class="troubleshoot-content">
        <div class="troubleshoot-content-item">
          <p>
            <span>状态:</span> 已支付
            <el-button type="primary" size="small" round>手工激活</el-button>
            <el-button type="primary" size="small" round>删除支付订单</el-button>
          </p>
          <p>
            <span class="label">经销商名称:</span> 傻逼
            <span class="label">支付账号:</span>foolish
          </p>
          <p>
            <span class="label">折扣:</span> 88 折
            <span class="label">支付金额:</span> 250
          </p>
          <p>
            <span class="label">礼券id/礼券名称:</span> 222222222222/傻逼礼券
          </p>
          <p>
            <span class="label">下单时间/支付时间:</span> 2019-02-22 22:22/2019-02-26 14:25
          </p>
          <p>
            <span class="label">张数:</span> 22
            <span class="label">原单价:</span> 290
          </p>
          <p>
            <span class="label">来源:</span> 不知
            <span class="label">昵称:</span> 二傻子
          </p>
          <p>
            <span class="label">性别:</span> 男
            <span class="label">头像:</span>
          </p>
        </div>
      </div>
    </div>
</template>

<script>
    export default {
        name: "index"
    }
</script>

<style lang="scss" scoped>
  .troubleshoot{
    .troubleshoot-search{
      min-height: 50px;
      line-height: 36px;
      padding: 7px 30px;
      text-align: left;
      /*overflow: hidden;*/
      .file-button{
        display: inline-block;
        width: 92px;
        height: 24px;
        border-radius: 20px;
        background: #eee;
        text-align: center;
        color: #606266;
        font-size: 12px;
        line-height: 24px
      }
    }
    .troubleshoot-content{
      padding: 20px 30px;
      overflow: hidden;
        .troubleshoot-content-item{
          float: left;
          width: 400px;
          height: 350px;
          background-color: #182337;
          border-radius: 5px;
          border: 1px solid #1a273a;
          padding: 30px 20px 20px;
          color: #FEFEFE;
          font-size: 12px;
          margin: 0 30px 25px 0;
          p{
            padding-bottom: 10px;
            border-bottom: 1px solid #2f3743;
            margin-bottom: 10px;
          }
          .label{
            display: inline-block;
            /*width: 65px;*/
            /*text-align: right;*/
          }
        }
    }

  }
</style>
