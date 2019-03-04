<template>
    <el-pagination
      layout="sizes, prev, pager, next"
      :total="total"
      :page-size="pageSize"
      :current-page.sync="currentPage"
      :page-sizes="pageSizes"
      @current-change="currentPageChange"
      @size-change="pageSizeChange"></el-pagination>
</template>

<script>
    export default {
      name: "customize-pagination",
      props: {
        total: {
          type: Number,
          required: true,
          default: 0
        },
        pageSizes: {
          type: Array,
          default: function () {
            return [10, 20, 30, 40, 50]
          }
        },
        defaultPageSize: {
          type: Number,
          default: 10
        }
      },
      data(){
        return{
          pageSize: 10,
          currentPage: 1
        }
      },
      created() {
        this.pageSize = this.defaultPageSize;
      },
      methods: {
        /**
         * 当前页改变时触发的函数
         * @param index
         */
        currentPageChange(index){
          console.log('当前页-',index)
        },
        /**
         * 当前每页数量改变时触发的函数
         * @param number
         */
        pageSizeChange(number){
          console.log('每页-', number, '条')
        }
      }
    }
</script>

<style scoped>

</style>
