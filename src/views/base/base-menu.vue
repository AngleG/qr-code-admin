<template>
      <el-menu-item v-if="menu.type === 1" :class="['single']" :key="menu.id" :index="menu.path" :route="menu.path">
          <i :class="menu.iconClass"></i><span slot="title">{{ menu.description }}</span>
      </el-menu-item>
      <el-submenu :key="menu.id" :index="''+index" v-else>
        <template slot="title"><i :class="menu.iconClass"></i><span slot="title">{{ menu.description }}</span></template>
        <template v-if="menu.subMenuList && menu.subMenuList.length">
          <subMenus :menu="submenu" :index="`${index}-${submenuIndex}`" v-for="(submenu, submenuIndex) in menu.subMenuList" :key="submenuIndex"></subMenus>
        </template>
      </el-submenu>
</template>
<script>
    import subMenus from './base-menu'
    export default {
        name: 'subMenus',
        data() {
            return {

            }
        },
        props: ['menu', 'index'],
        components:{
          subMenus
        }
    }
</script>

<style scoped>
  .el-submenu,.el-menu-item{
    text-align: left;
  }
  .el-menu-item a{
    color: #fff;
  }
  .el-submenu__title i{
    margin-right: 5px;
  }
</style>
