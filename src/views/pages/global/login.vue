<template>
  <div class="login-container">
    <div class="login-content">
      <p class="form-label">
        <el-input @keyup.enter.native="login" size="medium" prefix-icon="iconfont icon-yonghu" placeholder="请输入账号" v-model="username" maxlength="20"/>
      </p>
      <p class="form-label">
        <el-input @keyup.enter.native="login" size="medium" prefix-icon="iconfont icon-mima" type="password" placeholder="请输入密码" v-model="password" maxlength="20"/>
      </p>
      <el-button class="confirm" @click="login" type="primary" round>登录</el-button>
    </div>
  </div>
</template>

<script>
  import webApi from '../../../lib/api'

  export default {
    data() {
      return {
        username: null, //'testadmin'
        password: null //1
      }
    },
    methods: {
      async login() {
        let params = {user: this.username, pass: this.password};
        if (!params.user) {
          return this.$toast('请输入账号')
        }
        if (!params.pass) {
          return this.$toast('请输入密码')
        }
        let res = await webApi.login({user: this.username, pass: this.password});
        if (res.flags === 'success') {
          if (res.data) {
            let firstPageRouter =  '/welcome';
            localStorage.setItem('loginkey', JSON.stringify(res.data));
            localStorage.setItem('sidebar', `${res.data.menus && res.data.menus.length ? JSON.stringify(res.data.menus) : ''}`);
            let currentActiveRouter = sessionStorage.getItem('menuOptions');
            currentActiveRouter = currentActiveRouter ? JSON.parse(currentActiveRouter) : {
              defaultIndex: null,
              defaultOpens: []
            };
            currentActiveRouter.defaultIndex = firstPageRouter;
            sessionStorage.setItem('menuOptions', JSON.stringify(currentActiveRouter));
            this.$router.push(firstPageRouter);
          }
        } else {
          this.$toast(res.message, 'error');
        }
      }
    },
  }
</script>

<style lang="scss" scoped>
  .login-container {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
    background: url("../../../static/images/login-bg.jpg") center center no-repeat;

    .login-content {
      box-sizing: border-box;
      padding-top: 150px;
      width: 658px;
      height: 466px;
      background: url("../../../static/images/login-form.png") center center no-repeat;
      text-align: center;

      .form-label {
        margin-top: 25px;

        .iconfont {
          font-size: 14px;
          color: #fff;
        }

        /deep/ .el-input {
          display: inline-block;
          width: 400px;
        }
      }

      .confirm {
        margin-top: 40px;
        padding: 9px 50px;
      }
    }
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
