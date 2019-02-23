<template>
    <div class="base-gift-certificate">
      <div class="base-gift-certificate_upload">
        <div class="file-box"></div>
        <el-button type="text">浏览..</el-button>
        <el-button class="upload-btn" type="primary" size="small" round>上传产品图</el-button>
      </div>
      <div class="base-gift-certificate_form">
        <p>当前折扣:
          <el-input size="small" style="width: 50px;" v-modle="formData.currentDiscount"></el-input>折(0折表示原价)
        </p>
        <p>
          <el-date-picker
            v-model="formData.datePoint"
            type="date"
            placeholder="选择日期">
          </el-date-picker>
          后(含当天)折扣为
          <el-input size="small" v-modle="formData.afterDiscount"></el-input>折
        </p>
        <p>原价:
          <el-input size="small" v-modle="formData.defaultPrice"></el-input>元
        </p>
        <p>
          <el-date-picker
            v-model="formData.upperShelfDate"
            type="date"
            placeholder="选择日期">
          </el-date-picker>
          上架(含当天)
        </p>
        <p>
          <el-date-picker
            v-model="formData.lowerShelfDate"
            type="date"
            placeholder="选择日期">
          </el-date-picker>
          下架(含当天)
        </p>
        <el-button type="primary" size="small">保存修改</el-button>
      </div>
    </div>
</template>

<script>
    export default {
      name: "base-gift-certificate",
      formData: {
        currentDiscount: 88,
        datePoint: null,
        afterDiscount: 98,
        defaultPrice: 288,
        upperShelfDate: null,
        lowerShelfDate: null,
      }
    }
</script>

<style lang="scss" scoped>
.base-gift-certificate{
  width: 600px;
  background-color: rgb(24, 35, 55);
  border-radius: 5px;
  border: 1px solid rgb(26, 39, 58);
  padding: 20px;
  overflow: auto;
  .base-gift-certificate_upload{
    float: left;
    width: 105px;
    text-align: center;
    .file-box{
      width: 100%;
      height: 105px;
      border-radius: 5px;
      margin-bottom: 5px;
      background-color: #7e8c8d;
    }
    .upload-btn{
      margin-top: 10px;
    }
  }
  .base-gift-certificate_form{
    position: relative;
    margin-left: 125px;
  }
}
</style>
