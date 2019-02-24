<template>
    <div class="base-gift-certificate">
      <div class="base-gift-certificate_upload">
        <div class="file-box"></div>
        <el-button type="text">浏览..</el-button>
        <el-button class="upload-btn" type="primary" size="small" round>上传产品图</el-button>
      </div>
      <div class="base-gift-certificate_form">
        <p>当前折扣:
          <el-input size="small" style="width: 50px;" v-model="formData.currentDiscount"></el-input> 折(0折表示原价)
        </p>
        <p>
          <el-date-picker
            size="small"
            v-model="formData.datePoint"
            type="date"
            placeholder="选择日期">
          </el-date-picker>
          后(含当天)折扣为
          <el-input size="small" style="width: 50px;" v-model="formData.afterDiscount"></el-input> 折
        </p>
        <p>原价:
          <el-input size="small" style="width: 100px;" v-model="formData.defaultPrice"></el-input> 元
        </p>
        <p>
          <el-date-picker
            size="small"
            v-model="formData.upperShelfDate"
            type="date"
            placeholder="选择日期">
          </el-date-picker>
          上架(含当天)
        </p>
        <p>
          <el-date-picker
            size="small"
            v-model="formData.lowerShelfDate"
            type="date"
            placeholder="选择日期">
          </el-date-picker>
          下架(含当天)
        </p>
        <el-button class="confirm" type="primary" size="small" round>保存修改</el-button>
      </div>
    </div>
</template>

<script>
    export default {
      name: "base-gift-certificate",
      data () {
        return {
          formData: {
            currentDiscount: 88,
            datePoint: null,
            afterDiscount: 98,
            defaultPrice: 288,
            upperShelfDate: null,
            lowerShelfDate: null,
          }
        }
      }
    }

</script>

<style lang="scss" scoped>
.base-gift-certificate{
  width: 465px;
  background-color: rgb(24, 35, 55);
  border-radius: 5px;
  border: 1px solid rgb(26, 39, 58);
  padding: 30px 20px 20px;
  color: #FEFEFE;
  font-size: 12px;
  overflow: auto;
  margin: 0 40px 30px 0;
  .base-gift-certificate_upload{
    float: left;
    width: 105px;
    text-align: center;
    .file-box{
      width: 100%;
      height: 105px;
      border-radius: 5px;
      margin-bottom: 8px;
      background-color: #7e8c8d;
    }
    .upload-btn{
      margin-top: 10px;
    }
  }
  .base-gift-certificate_form{
    position: relative;
    margin-left: 125px;
    text-align: left;
    p{
      padding-bottom: 10px;
      border-bottom: 1px solid #2f3743;
      margin-bottom: 10px;
    }
  }
  .el-date-editor.el-input{
    width: 160px;
  }
  .confirm{
    padding: 5px 30px;
  }
}
</style>
