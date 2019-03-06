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
  import subMenus from '../base/base-menu'
  const { body } = document;
  const WIDTH = 1024;
  const RATIO = 3;
  export default {
        data() {
          return {
            menus: [
              {
                description: "账号管理",
                iconClass: "iconfont icon-qiye1",
                id: 1,
                path: "/",
                subMenuList: [
                  {description: "企业信息", iconClass: "", id: 21, path: '/company-info', type: 1},
                ],
                type: 0
              },
              {
                description: "礼劵管理",
                iconClass: "iconfont icon-youhuiquan",
                id: 2,
                path: "/",
                subMenuList: [
                  {description: "创建与修改", iconClass: "", id: 22, path: '/coupon-edit', type: 1},
                  // {description: "礼券分发", iconClass: "", id: 23, path: '/coupon-distribution', type: 1},
                  {description: "激活与撤销", iconClass: "", id: 24, path: '/coupon-operating', type: 1},
                ],
                type: 0
              },
              {
                description: "经销商管理",
                iconClass: "iconfont icon-jingxiaoshang",
                id: 3,
                path: "/",
                subMenuList: [
                  {description: "经销商账号", iconClass: "", id: 25, path: '/dealer-account', type: 1},
                  {description: "支付订单", iconClass: "", id: 26, path: '/dealer-payment-order', type: 1},
                  // {description: "进销存报表", iconClass: "", id: 27, path: '/dealer-payment-order', type: 1},
                ],
                type: 0
              },
              {
                description: "消费者管理",
                iconClass: "iconfont icon-xiaofeizhe1",
                id: 3,
                path: "/",
                subMenuList: [
                  {description: "兑换订单", iconClass: "", id: 28, path: '/consumer-exchange-order', type: 1},
                  // {description: "收货地址列表", iconClass: "", id: 29, path: '/shipping-address', type: 1},
                ],
                type: 0
              },
              {
                description: "发货",
                iconClass: "iconfont icon-fahuo",
                id: 4,
                path: "/ship",
                subMenuList: [],
                type: 1
              },
              {
                description: "问题排查",
                iconClass: "iconfont icon-paicha",
                id: 4,
                path: "/troubleshoot",
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
            return null;
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
