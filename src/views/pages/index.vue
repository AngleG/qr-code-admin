<template>
  <el-container>
    <el-aside style="width: auto;">
      <side-bar/>
      <ul class="options">
        <li><span @click="loginOutConfirm"><i class="iconfont icon-tuichu"></i>退出登录</span></li>
        <!--<li @click="dialogVisible = true"><span><i class="iconfont icon-xiugaimima"></i>修改密码</span></li>-->
      </ul>
    </el-aside>
    <el-container>
      <el-header>欢迎登录智能唯一二维码系统</el-header>
      <el-main>
        <router-view/>
      </el-main>
    </el-container>
    <el-dialog
      title="修改密码"
      :visible.sync="dialogVisible"
      :close-on-click-modal="false"
      @close="closeDialog"
      width="400px">
      <div class="change-password">
        <el-input v-model="requestParams.newPassword" type="password" size="small" maxlength="50" placeholder="新密码"/>
        <el-input v-model="requestParams.enterPassword" type="password" size="small" maxlength="50" placeholder="确定密码"/>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button size="small" @click="closeDialog" round>取 消</el-button>
        <el-button size="small" type="primary" @click="changePassword" round>确 定</el-button>
      </span>
    </el-dialog>
  </el-container>

</template>

<script>
  import sideBar from '../../views/common/app-nav'
  import {loginOut} from "../../lib/utils";
  import webApi from '../../lib/api'
  export default {
    components: {
      sideBar
    },
    data() {
      return {
        dialogVisible: false,
        requestParams: {
          newPassword: null,
          enterPassword: null
        }
      }
    },
    methods: {
      loginOut,
      loginOutConfirm() {
        this.$confirm('您确定退出智能唯一二维码系统吗?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          roundButton: true,
          type: 'warning'
        }).then(() => this.loginOut()).catch(() => {
          this.$toast('已取消退出登录', 'info');
        });
      },
      async changePassword() {
        let newPassword = this.requestParams.newPassword;
        let enterPassword = this.requestParams.enterPassword;
        if (!newPassword && newPassword !== 0) {
          return this.$toast('请输入新密码')
        }
        if (!enterPassword && enterPassword !== 0) {
          return this.$toast('请输入确认新密码')
        }
        if (newPassword !== enterPassword) {
          return this.$toast('两次密码输入不一致')
        }
        let res = await webApi.changePassword({newpass: newPassword});
        if (res.flags === 'success') {
          this.$toast('密码修改成功，下次登录时生效', 'success');
          this.closeDialog();
        } else {
          this.$toast(res.message, 'error');
        }
      },
      closeDialog() {
        this.dialogVisible = false;
        this.$restObjectAttribute(this.requestParams);
      }
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
  .el-main-content{
    box-sizing: border-box;
    padding: 30px 50px;
    height: 100%;
  }
  .change-password{
    .el-input{
      height: 40px;
      line-height: 40px;
      margin-top: 10px;
    }
  }
</style>
