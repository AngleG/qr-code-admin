<template>
    <el-pagination
      v-bind="$attrs"
      v-on="$listeners"
      layout="prev, pager, next"
      :total="total"
      :page-size="pageSize"
      :current-page.sync="currentPage"
      @current-change="currentPageChange"
      @size-change="pageSizeChange"></el-pagination>
</template>

<script>
    import config from '../../conf/config'
    export default {
      name: "customize-pagination",
      props: {
        total: {
          type: Number,
          required: true,
          default: 0
        }
      },
      data(){
        return{
          pageSize: config.PAGE_SIZE,
          currentPage: 1
        }
      },
      methods: {
        /**
         * 当前页改变时触发的函数
         * @param index
         */
        currentPageChange(index){
          this.$emit('getList', index - 1);
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
