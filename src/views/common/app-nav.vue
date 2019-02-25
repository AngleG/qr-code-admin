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
        active-text-color="#fff"
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
  import subMenus from '../base/base-menu'
  const { body } = document;
  const WIDTH = 1024;
  const RATIO = 3;
  export default {
        data() {
          return {
            menus: [
              {
                description: "企业信息",
                iconClass: "iconfont fonts-qiye",
                id: 1,
                path: "/company-info",
                subMenuList: [],
                type: 1
              },
              {
                description: "礼劵管理",
                iconClass: "iconfont fonts-youhuiquan",
                id: 2,
                path: "/coupon",
                subMenuList: [],
                type: 1
              },
              {
                description: "经销商",
                iconClass: "iconfont fonts-jingxiaoshang",
                id: 3,
                path: "/dealer",
                subMenuList: [],
                type: 1
              },
              {
                description: "问题排查",
                iconClass: "iconfont fonts-paicha",
                id: 4,
                path: "/company-info?312321",
                subMenuList: [],
                type: 1
              }
            ],
            defaultIndex: this.$route.fullPath,
            defaultOpens: [],
            isCollapse: false
          }
        },
        created() {
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
        mounted() {
            // this.$nextTick(() => {
            //   window.addEventListener('resize', this.resizeHandler, false)
            // })
        },
        methods: {
          resizeHandler() {
            (this.$_.throttle(() => {
              if (!document.hidden) {
                this.isCollapse = this.isMobile();
              }
            }, 200))()
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
