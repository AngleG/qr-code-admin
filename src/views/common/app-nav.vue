<template>
    <div class="nav" :class="{active: isCollapse}">
      <div
        class="collapse"
        :style="{textAlign: isCollapse ? 'center' : 'right'}">
        <span
          @click="changeCollapse"
          :title="isCollapse ? '打开侧边栏'  : '缩小侧边栏'"
          :class="['iconfont', 'el-fonts-exp-hidesidebarhoriz', isCollapse ? 'close' : '']"></span>
      </div>
      <el-menu
        mode="vertical"
        background-color="#191d2a"
        active-text-color="#2c97fb"
        text-color="#909090"
        :default-active="defaultIndex"
        :default-openeds="defaultOpens"
        class="el-menu-vertical-demo"
        :collapse="isCollapse"
        @select="handelSelect"
        @open="handleOpen"
        @close="handleClose"
        router
        unique-opened>
        <subMenus
          :menu="menu"
          :index="''+menuIndex"
          v-for="(menu, menuIndex) in menus"
          :key="menuIndex"></subMenus>
      </el-menu>
    </div>
</template>

<script>
  import {routes} from "../../router";
  import subMenus from '../base/base-menu'
  const { body } = document;
  const WIDTH = 1024;
  const RATIO = 3;
  export default {
        data() {
          return {
            menuIndex: 0,
            menus: [],
            defaultIndex: this.$route.fullPath,
            defaultOpens: [],
            isCollapse: false
          }
        },
        created() {
          this.setMenusDefault();

            let menuOptions = this.getMenuOptions();
            if (menuOptions) {
              Object.keys(menuOptions).forEach(key => {
                this[key] = menuOptions[key]
              })
            }
        },
        computed:{
          env: function(){
            return process.env.NODE_ENV;
          },
        },
        methods: {
          setMenusDefault(){
            let sidebar = localStorage.getItem('sidebar') ? JSON.parse(localStorage.getItem('sidebar')) : null;
            console.log('sidebar=',sidebar);
            if(sidebar && sidebar.length){

            }else {
              this.getMenus();
            }
          },
          getMenus() {
            const currentMenus = routes.filter(route => route.children);
            const menus = currentMenus.map(item => {
              this.menuIndex++;
              if (item.name) {
                return {
                  description: item.name,
                  iconClass: item.iconClass,
                  id: this.menuIndex,
                  path: item.path,
                  subMenuList: this.getSubMenuList(item.children),
                  type: 0
                }
              } else {
                const currentItem = item.children && item.children[0];
                return currentItem ? {
                  description: currentItem.name,
                  iconClass: item.iconClass,
                  id: this.menuIndex,
                  path: currentItem.path,
                  type: 1
                } : null
              }
            });
            this.menus = menus.filter(item => item);
          },
          getSubMenuList(childrens) {
            if (!childrens || childrens.length === 0) {
              return [];
            }
            return childrens.map(child => {
              this.menuIndex++;
              return {
                description: child.name,
                type: 1,
                iconClass: '',
                path: child.path,
                id: this.menuIndex,
                subMenuList: this.getSubMenuList(child.children)
              }
            })
          },
          resizeHandler() {
            return null;
          },
          isMobile() {
            const rect = body.getBoundingClientRect();
            return rect.width - RATIO < WIDTH
          },
          changeCollapse() {
              window.removeEventListener('resize', this.resizeHandler, false);
              this.isCollapse = !this.isCollapse;
          },
          /**
           * 打开导航下级
           * @param key
           * @param keyPath
           */
          handleOpen(key, keyPath){
            this.setMenuOptions(keyPath);
          },
          /**
           * 关闭导航下级
           * @param key
           * @param keyPath
           */
          handleClose(key, keyPath){
            this.setMenuOptions(keyPath);
          },
          /**
           * 将左侧导航选中菜单和展开菜单保存在浏览器缓存中
           */
          setMenuOptions(keyPath) {
              let menuOptions = JSON.stringify({defaultIndex: this.defaultIndex, defaultOpens: keyPath});
              window.sessionStorage.setItem('menuOptions', menuOptions)
          },
          /**
           * 获取保存在浏览器缓存中左侧导航选中菜单和展开菜单
           */
          getMenuOptions() {
              return window.sessionStorage.getItem('menuOptions') ? JSON.parse(window.sessionStorage.getItem('menuOptions')) : null;
          },
          /**
           * 切换路由设置MenuOptions
           */
          setMenuDefaultIndex() {
            let currentMenuOptions = this.getMenuOptions();
            if(currentMenuOptions){
              this.setMenuOptions(currentMenuOptions.defaultOpens)
            } else{
              this.setMenuOptions([])
            }
          },
          /**
           * 选中菜单触发回调
           * @param index
           * @param indexPath
           */
          handelSelect(index,indexPath) {
            this.defaultIndex = index;
            this.setMenuDefaultIndex();
          }
        },
        components: {
          subMenus
        },
        beforeDestroy() {
          window.removeEventListener('resize', this.resizeHandler, false);
        }
    }
</script>

<style scoped>
    .nav{
      height: 100%;
      overflow: hidden;
      overflow-y: auto;
      width: 185px;
      transition: width .3s ease;
    }
    .nav.active{
        width: 50px;
    }
    .el-aside .el-menu{
      border-right: 0;
    }
    .el-aside .el-menu i{
      margin-right: 5px;
    }
    .collapse{
      height: 60px;
      line-height: 60px;
    }
    .collapse span{
        color: #1890FF;
        cursor: pointer;
        margin-right: 16px;
        font-size: 14px;
    }
    .collapse span.close{
        transform: rotate(180deg);
        margin: 0;
    }
</style>
