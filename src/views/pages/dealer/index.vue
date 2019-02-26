<template>
    <div class="dealer-container">
      <div class="dealer-header">
        <div class="dealer-create">
          <el-input size="small" v-model="dealerParams.name" style="margin-left: 0" placeholder="经销商名称" maxlength="20"></el-input>
          <el-input size="small" v-model="dealerParams.cname" placeholder="联系人姓名" maxlength="20"></el-input>
          <el-input size="small" v-model="dealerParams.cphone" placeholder="联系人电话" maxlength="20"></el-input>
          <el-button style="margin-left: 5px;" type="primary" size="small" @click="createDealer" round>创建经销商</el-button>
        </div>
        <div class="dealer-search">
          <el-input size="small" v-model="name" style="margin-left: 0" placeholder="查经销商名称" maxlength="20"></el-input>
          <el-input size="small" v-model="adminuser" placeholder="查主账号" maxlength="20"></el-input>
          <el-button style="margin-left: 5px;" type="primary" size="small" @click="setSearchParams" round>查询</el-button>
        </div>
      </div>
      <div class="dealer-content">
        <el-row :gutter="12">
          <el-col :xs="12" :sm="12" :md="8" :lg="6" :xl="4" v-for="dealer in currentDealerList" :key="dealer.companykey">
            <div class="dealer-list">
              <el-input size="small" v-model="dealer.name" prefix-icon="iconfont icon-qiye1" placeholder="经销商名称"/>
              <el-input size="small" v-model="dealer.cname" prefix-icon="iconfont icon-dizhi" placeholder="联系人姓名"/>
              <el-input size="small" v-model="dealer.cphone" prefix-icon="iconfont icon-yonghu" placeholder="联系人电话"/>
              <div class="clearfix" style="text-align: right;">
                <el-select size="small" style="width: 120px;float: left;" v-model="dealer.status">
                  <el-option v-for="option in options" :label="option.label" :value="option.value" :key="option.value" />
                </el-select>
                <el-button type="primary" size="small" @click="saveDealerByCompanyKey(dealer)" round>保存修改</el-button>
              </div>
              <div class="clearfix dealer-user"><span>主账号:{{ dealer.adminuser }}</span><el-button @click="resetDealerPassword(dealer)" type="primary" size="small" round>重置密码</el-button></div>
              <p class="dealer-pass"><template v-if="dealer.pass">长按复制主账号新密码: {{ dealer.pass | filterDealerList }}</template>&nbsp;</p>
            </div>
          </el-col>
        </el-row>
      </div>
    </div>
</template>

<script>
  import webApi from '../../../lib/api'
	export default {
	  data() {
	    return {
        dealerList: [],
        options: [
          {label: '开启', value: '1'},
          {label: '禁用', value: '0'}
        ],
        preDealerParams: {
          name: null,
          cname: null,
          cphone: null
        },
        dealerParams: {
          name: null,
          cname: null,
          cphone: null
        },
        searchParams: {
          name: null,
          adminuser: null
        },
        name: null,
        adminuser: null
      }
    },
    created() {
	    this.getDealerList()
    },
    computed: {
	    currentDealerList() {
	      let {name, adminuser} = this.searchParams;
	      return (name || adminuser) ? this.dealerList.filter(item => item.name.toLowerCase().indexOf(name) > -1 || item.adminuser.toLowerCase().indexOf(adminuser) > -1) : this.dealerList;
      }
    },
    methods: {
      setSearchParams() {
        this.$set(this.searchParams,'name',this.name);
        this.$set(this.searchParams,'adminuser',this.adminuser);
      },
	    async getDealerList() {
	      let res = await webApi.getDealerList();
        if (res.flags === 'success') {
          if (res.data) {
            this.dealerList = res.data.reverse();
          }
        } else {
          this.$toast(res.message, 'error');
        }
      },
      async createDealer() {
	      let params = this.$_.cloneDeep(this.dealerParams);
	      if (!params.name) {
	        return this.$toast('经销商名称');
        }
        if (!params.cname) {
          return this.$toast('联系人姓名');
        }
        if (!params.cphone) {
          return this.$toast('联系人电话');
        }
        let res = await webApi.createDealer(params);
        if (res.flags === 'success') {
          this.$toast('创建成功', 'success');
          this.dealerParams = this.$_.cloneDeep(this.preDealerParams);
          this.getDealerList();
        } else {
          this.$toast(res.message, 'error');
        }
      },
      async saveDealerByCompanyKey(dealer) {
	      if (!dealer) {
	        return this.$toast('经销商信息不存在');
        }
        let res = await webApi.saveDealerByCompanyKey(dealer);
        if (res.flags === 'success') {
          this.$toast('修改成功', 'success');
        } else {
          this.$toast(res.message, 'error');
        }
      },
      async resetDealerPassword(dealer) {
        if (!dealer) {
          return this.$toast('经销商信息不存在');
        }
        let res = await webApi.resetDealerPassword({accountkey: dealer.adminkey});
        if (res.flags === 'success') {
          this.$toast('重置成功', 'success');
          if (res.data) {
            let pass = res.data.pass;
            this.$set(dealer,'pass',pass);
          }
        } else {
          this.$toast(res.message, 'error');
        }
      }
    }
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
        width: 100%;
        margin-bottom: 20px;
        @include list-layout;
        padding: 20px 20px 5px 20px;
        .el-input{
          margin-bottom: 10px;
        }
        .clearfix{
          text-align: left;
          &.dealer-user{
            margin-top: 8px;
            line-height: 28px;
            .el-button{
              float: right;
              margin-top: 2px;
            }
            span {
              display: inline-block;
              border: 1px solid #323c54;
              border-radius: 15px;
              padding: 0 15px;
              color: #c0c4cc;
              font-size: 14px;
            }
          }
        }
        .dealer-pass{
          text-align: center;
          font-size: 12px;
          color: #409EFF;
          line-height: 28px;
        }
      }
    }
  }
</style>
