<template>
  <div class="company-layout">
    <div class="company-wrap">
      <div class="company-content">
        <div class="company-upload">
          <div class="file-box"><img width="100%" height="100%" :src="logoUrl" v-if="requestParams.elogo || logoCacheUrl"></div>
          <input @change="getCacheFile" type="file" accept="image/png,image/jpeg,image/gif" name="file" id="file_company" style="visibility: hidden;width: 0;height: 0;"/>
          <label for="file_company"><span style="font-size: 14px;color: #409EFF;cursor: pointer;">浏览..</span></label>
          <el-button @click="upload" class="upload-btn" type="primary" size="small" round>上传企业logo</el-button>
        </div>
        <div class="company-form">
          <el-input v-model="requestParams.ename" size="small" maxlength="50" prefix-icon="iconfont icon-qiye1" placeholder="企业名称"/>
          <el-input v-model="requestParams.eaddr" size="small" maxlength="100" prefix-icon="iconfont icon-dizhi" placeholder="企业地址"/>
          <el-input v-model="requestParams.econtact" size="small" maxlength="100" prefix-icon="iconfont icon-yonghu" placeholder="企业联系人姓名"/>
          <el-input v-model="requestParams.ephone" size="small" maxlength="20" prefix-icon="iconfont icon-shouji" placeholder="企业联系人电话"/>
          <el-input v-model="requestParams.email" size="small" maxlength="100" prefix-icon="iconfont icon-youxiang" placeholder="企业邮箱"/>
          <el-input v-model="requestParams.eweb" size="small" maxlength="100" prefix-icon="iconfont icon-wangzhan" placeholder="企业官网"/>
          <div class="company-address">
            <div class="company-address-select">
              <i class="iconfont icon-dizhi1"></i>
              发货省<el-select @change="changeProvinceFn" size="samll" v-model="requestParams.sendprovince"><el-option v-for="province in cityData" :label="province.name" :value="province.name" :key="province.name"/></el-select>
              发货市<el-select @change="changeCityFn" size="samll" v-model="requestParams.sendcity"><el-option v-for="city in configObject.cityList" :label="city.name" :value="city.name" :key="city.name"/></el-select>
              发货区县<el-select  size="samll" v-model="requestParams.sendcounty"><el-option v-for="county in configObject.countyList" :label="county.name" :value="county.name" :key="county.name"/></el-select>
            </div>
            <el-input maxlength="100" v-model="requestParams.sendstreet" size="small" placeholder="发货详细街道地址"/>
          </div>
          <el-input maxlength="50" v-model="requestParams.sendcontact" size="small" prefix-icon="iconfont icon-yonghu" placeholder="发货联系人姓名"/>
          <el-input maxlength="50" v-model="requestParams.sendphone" size="small" prefix-icon="iconfont icon-shouji" placeholder="发货联系人电话"/>
        </div>
      </div>
      <el-button @click="editCompanyInfo" class="confirm" type="primary" size="small" round>{{ isEdit ? '保存修改' : '创建' }}</el-button>
    </div>
  </div>
</template>

<script>
  import cityData from './data/city'
  import config from '../../../../conf/config'
  import webApi from '../../../../lib/api'
	export default {
    data() {
      return {
        config,
        cityData,
        logoFile: null,
        logoCacheUrl: null,
        requestParams: {
          companykey: null,
          eaddr: null,
          econtact: null,
          elogo: null,
          email: null,
          ename: null,
          ephone: null,
          eweb: null,
          sendcity: null,
          sendcontact: null,
          sendcounty: null,
          sendphone: null,
          sendprovince: null,
          sendstreet: null
        },
        configObject: {
          cityList: [],
          countyList: []
        },
        preCompanyInfo: null
      }
    },
    computed: {
      logoUrl() {
        return this.logoCacheUrl ? this.logoCacheUrl : `${this.config.DOWNLOAD_URL}${this.requestParams.elogo}`;
      },
      isEdit() {
        return this.preCompanyInfo && this.preCompanyInfo.ename;
      }
    },
    created() {
      this.getCompanyInfo();
    },
    methods: {
      /**
       * 获取公司信息
       * @returns {Promise<void>}
       */
      async getCompanyInfo() {
        let res = await webApi.getCompanyInfo();
        if (res.flags === 'success') {
          if (res.data) {
            this.preCompanyInfo = this.$_.cloneDeep(res.data);
            this.requestParams = res.data;
          }
          this.init();
        } else {
          this.$toast(res.message, 'error');
        }
      },
      /**
       * 上传文件
       * @returns {Promise<void>}
       */
      async upload() {
        if (!this.logoFile) {
          return this.$toast('请浏览图片后上传')
        }
        let res = await webApi.upload(this.logoFile, {loginkey: JSON.parse(localStorage.getItem('loginkey')).loginkey, companykey: this.requestParams.companykey}, `/mccl`);
        if (res.flags === 'success') {
          if (res.data) {
            this.requestParams.elogo = res.data.picpath;
            this.$toast('上传图片成功', 'success');
          }
          this.init();
        } else {
          this.$toast(res.message, 'error');
        }
      },
      /**
       * 创建或编辑公司信息
       * @returns {Promise<void>}
       */
      async editCompanyInfo() {
        let params = this.$_.cloneDeep(this.requestParams);
        delete params.companykey;
        delete params.elogo;
        let res = this.isEdit ? await webApi.saveCompanyInfo(params) : await webApi.createCompanyInfo(params);
        if (res.flags === 'success') {
          this.$toast(this.isCreate ? '创建成功' : '保存成功', 'success');
        } else {
          this.$toast(res.message, 'error');
        }
      },
      /**
       * 公司页面初始化函数
       */
      init() {
        let sendProvince = this.requestParams.sendprovince;
        let sendCounty = this.requestParams.sendcounty;
        if (sendProvince) {
          this.changeProvinceFn();
        }
        if (sendCounty) {
          this.changeCityFn();
        }
      },
      /**
       * 切换省份触发方法
       * @param province
       */
      changeProvinceFn(province) {
        if (province) {
          this.requestParams.sendcity = null;
          this.requestParams.sendcounty = null;
        }
        let sendProvince = this.requestParams.sendprovince;
        this.configObject.cityList =  !sendProvince ? [] : this.cityData.find(province => province.name === sendProvince).children;
      },
      /**
       * 切换城市触发方法
       * @param city
       */
      changeCityFn(city) {
        if (city) {
          this.requestParams.sendcounty = null;
        }
        let sendCity = this.requestParams.sendcity;
        let cityList = this.configObject.cityList;
        this.configObject.countyList =  !sendCity || !cityList.length ? [] : cityList.find(city => city.name === sendCity).children;
      },
      /**
       * 兼容性获取图片本地缓存地址
       * @param file
       * @returns {*}
       */
      getObjectURL(file) {
        let url = null ;
        // 下面函数执行的效果是一样的，只是需要针对不同的浏览器执行不同的 js 函数而已
        if (window.createObjectURL) { // basic
          url = window.createObjectURL(file)
        } else if (window.URL) { // mozilla(firefox)
          url = window.URL.createObjectURL(file)
        } else if (window.webkitURL) { // webkit or chrome
          url = window.webkitURL.createObjectURL(file)
        }
        return url ;
      },
      /**
       * 获取上传文件信息
       * @param event
       */
      getCacheFile(event) {
        let files = event.target.files[0];
        this.logoCacheUrl = this.getObjectURL(files);
        this.logoFile = files
      }
    }
	}
</script>

<style lang="scss" scoped>
  .company-layout{
    height: 100%;
    padding: 30px 50px;
    .company-wrap{
      width: 650px;
      line-height: 24px;
      @include list-layout;
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
            display: block;
            margin-bottom: 10px;
            width: 230px;
          }
          .company-address{
            font-size: 12px;
            margin-bottom: 10px;
            .el-input{
              display: inline-block;
              margin: 0 0 0 60px;
            }
            .company-address-select{
              margin-bottom: 10px;
              .el-select{
                margin: 0 5px;
                width: 90px;
              }
            }
          }
        }
      }
      .confirm{
        margin-top: 20px;
        padding: 5px 30px;
      }
    }
  }

</style>
