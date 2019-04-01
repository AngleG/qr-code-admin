<template>
  <div class="ship">
    <div class="ship_search">
      <el-select
        v-model="searchRequestParams.couponkey"
        size="small"
        placeholder="请选择">
        <el-option
          v-for="item in configObject.couponList"
          :label="item.label"
          :key="item.value"
          :value="item.value">
        </el-option>
      </el-select>
      <el-select
        v-model="searchRequestParams.from"
        size="small"
        placeholder="请选择">
        <el-option
          v-for="item in configObject.SOURCE_LIST"
          :label="item.label"
          :key="item.value"
          :value="item.value">
        </el-option>
      </el-select>
      <el-button size="small" type="primary" round @click="getShipList">刷新发货列表</el-button>
    </div>
    <div class="ship_content" v-loading="isLoading" element-loading-background="rgba(0, 0, 0, 0.5)">
      <div class="ship_content-item" v-if="shipOrderList.length" v-for="(item, index) in shipOrderList" :key="index">
        <div>
          <span class="label">兑换来源:</span>
          <span class="text-field">{{ item.fromcouponname }}</span>
          <span class="label">兑换目标:</span>
          <span class="text-field">{{ item.tocouponname }}</span>
        </div>
        <div>
          <span class="label">配送物品:</span>
          <span class="text-field" v-if="item.fromcouponid && item.tocouponid && item.fromcouponid === item.tocouponid">产品实物<font color="red">{{item.couponum}}</font>盒</span>
          <span class="text-field" v-if="item.fromcouponid && item.tocouponid && item.fromcouponid !== item.tocouponid">产品礼券<font color="red">{{item.couponum}}</font>张</span>
        </div>
        <div>
          <span class="label">配送地址:</span>
          <span class="text-field">{{ item.recprov }}{{ item.recity }}{{ item.recounty }}{{ item.recstreet }}</span>
        </div>
        <div>
          <span class="label">收货联系人:</span>
          <span class="text-field">{{ item.recontact }}</span>
          <span class="label">收货人电话:</span>
          <span class="text-field">{{ item.recphone }}</span>
        </div>
        <div>
          <span class="label">兑换人手机:</span>
          <span class="text-field">{{ item.usermobile }}</span>
          <span class="label">祝福语:</span>
          <span class="text-field">{{ item.hello }}</span>
        </div>
        <div class="ship_content_address">
          <span class="label">发货地址:</span>
          <el-select @change="changeProvinceCityFn(index)" size="samll" v-model="item.sendprov" :value="item.sendprov">
            <el-option v-for="province in cityData" :label="province.name" :value="province.name" :key="province.name"/>
          </el-select>
          <el-select @change="changeProvinceCityFn(index, false)" size="samll" v-model="item.sendcity" :value="item.sendcity">
            <el-option v-for="city in getCurrentCityList(cityData, item.sendprov)" :label="city.name" :value="city.name" :key="city.name"/>
          </el-select>
          <el-select  size="samll" v-model="item.sendcounty" :value="item.sendcounty">
            <el-option v-for="county in getCurrentCountyList(cityData, item.sendprov, item.sendcity)" :label="county.name" :value="county.name" :key="county.name"/>
          </el-select>
          <el-input size="small" style="width: 145px" maxlength="100" v-model="item.sendstreet" placeholder="请输入街道地址"></el-input>
        </div>
        <div>
          <span class="label">发货联系人:</span>
          <span class="text-field">
              <el-input size="small" style="width: 160px" v-model="item.sendcontact" maxlength="50" placeholder="请输入联系人姓名"></el-input>
            </span>
          <span class="label">发货人电话:</span>
          <span class="text-field">
              <el-input size="small" style="width: 160px" v-model="item.sendphone" maxlength="50" placeholder="请输入发货人电话"></el-input>
          </span>
        </div>
        <div>
          <span class="label">快递公司:</span>
          <span class="text-field">
              <el-select size="samll" style="width: 160px" v-model="item.delcom">
                <el-option v-for="item in configObject.EXPRESS_COMPANY_LIST" :label="item.label" :value="item.value" :key="item.value"/>
              </el-select>
            </span>
          <span class="label">快递单号:</span>
          <span class="text-field">
               <el-input size="small" maxlength="50" style="width: 160px" v-model="item.delid" placeholder="请输入快递单号"></el-input>
            </span>
        </div>
        <div>
          <span class="label">写给用户:</span>
          <span class="text-field">
               <el-input size="small"  v-model="item.log" placeholder="写给用户"></el-input>
            </span>
        </div>
        <el-button size="small" type="primary" round style="margin-top: 5px;" @click="saveHandle(index)">保存发货信息</el-button>
      </div>
      <div class="no-data" v-if="!shipOrderList.length">暂无数据</div>
    </div>
  </div>
</template>

<script>
  import cityData from '../../../conf/city'
  import webApi from '../../../lib/api'
  import {SOURCE_LIST, EXPRESS_COMPANY_LIST} from "../../../conf/config-list";

  export default {
      data(){
        return {
          cityData,
          isLoading: false,
          searchRequestParams: {
            couponkey: null,
            from: 'w'
          },
          preShipOrderList: [],
          shipOrderList: [],
          configObject: {
            couponList: [],
            SOURCE_LIST: [
              {label: '微信', value: 'w'},
              {label: '支付宝', value: 'z'},
              {label: '批量兑换', value: 'm'}
            ],
            EXPRESS_COMPANY_LIST
          }
        }
      },
      created(){
        this.getCouponList().then(this.getShipList);
      },
      methods: {
        getCurrentCityList(cityData, province) {
          return !province ? [] : cityData.find(provinceList => provinceList.name === province).children;
        },
        getCurrentCountyList(cityData, province, city) {
          return !province || !city ? [] : cityData.find(provinceList => provinceList.name === province).children.find(cityList => cityList.name === city).children;
        },
        /**
         * 获取礼券列表
         */
        async getCouponList(){
          let res = await webApi.getCouponList();
          if(res.flags === 'success'){
            this.configObject.couponList = [];
            if(res.data && res.data.length){
              this.configObject.couponList = res.data.map(item => Object.assign({}, item, {label: item.name, value: item.couponkey}));
              this.searchRequestParams.couponkey = this.configObject.couponList[0].value;
            }
          }else {
            this.$toast(res.message, 'error');
          }
        },
        /**
         * 获取发货订单列表
         */
        async getShipList(){
          this.isLoading = true;
          let res = await webApi.getShipList(this.searchRequestParams);
          if(res.flags === 'success'){
            this.shipOrderList = [];
            this.preShipOrderList = [];
            if(res.data && res.data.length){
              this.preShipOrderList = res.data.slice();
              this.shipOrderList = res.data;
            }
          }else {
            this.$toast(res.message, 'error');
          }
          this.isLoading = false;
        },
        /**
         * 保存发货信息
         */
        async saveHandle(index){
          let params = this.$_.cloneDeep(this.shipOrderList[index]);
          params.exorderkey = params.orderkey;
          delete params.orderkey;
          let res = await webApi.saveShipInformation(params);
          if(res.flags === 'success'){
            this.$toast('保存成功！', 'success');
          }else {
            this.$toast(res.message, 'error');
          }
        },
        changeProvinceCityFn(index, isChangeProvince = true) {
          if (isChangeProvince) {
            this.shipOrderList[index].sendcity = null;
          }
          this.shipOrderList[index].sendcounty = null;
        }
      }
    }
</script>

<style lang="scss" scoped>
.ship_search{
  min-height: 50px;
  line-height: 36px;
  padding: 7px 30px;
  text-align: left;
}
.ship_content{
  padding: 20px 30px;
  overflow: hidden;
  background-color: #060b17;
  .ship_content-item{
    float: left;
    width: 630px;
    height: 400px;
    background-color: #182337;
    border-radius: 5px;
    border: 1px solid #1a273a;
    padding: 20px 15px;
    color: #FEFEFE;
    font-size: 12px;
    margin: 0 10px 20px 0;
    > div{
      padding-bottom: 5px;
      border-bottom: 1px solid #2f3743;
      margin-bottom: 10px;
      text-align: left;
    }
    .label, .text-field{
      display: inline-block;
      vertical-align: middle;
    }
    .label{
      width: 65px;
      color: #909090;
      text-align: left;
    }
    .text-field{
      width: 220px;
      line-height: 18px ;
    }
    .ship_content_address{
      .el-select, .el-input{
        /*margin: 0 5px;*/
        width: 120px;
      }
    }
  }
  .no-data{
    text-align: center;
    font-size: 14px;
    color: #eee;
    line-height: 40px;
    background: #182337;
    margin-top: 20px;
  }
}
</style>
