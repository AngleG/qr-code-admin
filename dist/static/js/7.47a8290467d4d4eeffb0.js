webpackJsonp([7],{"Q/ps":function(e,t){},xfnt:function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var s=a("Xxa5"),l=a.n(s),i=a("exGp"),n=a.n(i),r=a("mvHQ"),o=a.n(r),u=a("ZEg/"),c={name:"index",data:function(){var e=this;this.$createElement;return{tableListLoading:!1,requestParams:{pagenum:0,agentaccountuser:"ALL",from:"ALL"},searchRequestParams:null,totalPages:0,options:{userSourceList:[{label:"全部",value:"ALL"},{label:"微信",value:"w"},{label:"支付宝",value:"z"},{label:"批量激活",value:"m"}],dealerList:[],sexList:[{label:"男",value:"m"},{label:"女",value:"f"},{label:"未知",value:"o"}]},tableColumn:[{title:"经销商名称",align:"center",key:"agentcompany"},{title:"支付时间",align:"center",key:"lastupdatime"},{title:"支付金额",align:"center",key:"distotal"},{title:"状态",align:"center",key:"status",render:function(t,a){return t("span",[e.$options.filters.paymentOrderStatusToText(a.row.status)])}},{title:"操作",align:"center",key:"agentcompany",render:function(t,a){var s=a.index;return t("el-button",{props:{size:"medium",type:"text"},on:{click:function(){return e.openDialogFn(s)}}},"查看")}}],tableData:[],dialogOption:{isVisible:!1,title:"详细信息"},detail:{}}},created:function(){this.getDealerList(),this.searchRequestParams=JSON.parse(o()(this.requestParams)),this.getPaymentOrderList()},methods:{getDealerList:function(){var e=this;return n()(l.a.mark(function t(){var a;return l.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,u.a.getDealerList();case 2:"success"===(a=t.sent).flags?a.data&&a.data.length&&(a.data.map(function(t){return e.options.dealerList.push({label:t.name,value:t.adminuser})}),e.options.dealerList.unshift({label:"全部经销商",value:"ALL"})):e.$toast(a.message,"error");case 4:case"end":return t.stop()}},t,e)}))()},getPaymentOrderList:function(e){var t=this;return n()(l.a.mark(function a(){var s,i;return l.a.wrap(function(a){for(;;)switch(a.prev=a.next){case 0:return t.tableListLoading=!0,(s=t.$_.cloneDeep(t.requestParams)).pagenum="number"==typeof e?e:0,a.next=5,u.a.getPaymentOrderList(s);case 5:"success"===(i=a.sent).flags?i.data&&(t.tableData=i.data.pagedorders?i.data.pagedorders:[],t.totalPages=i.data.totalpages):(t.tableData=[],t.totalPages=0,t.$toast(i.message,"error")),t.tableListLoading=!1;case 8:case"end":return a.stop()}},a,t)}))()},searchHandle:function(){this.searchRequestParams=JSON.parse(o()(this.requestParams)),this.getPaymentOrderList()},downloadPaymentOrder:function(){var e=this;return n()(l.a.mark(function t(){var a;return l.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,u.a.downloadPaymentOrder();case 2:"success"===(a=t.sent).flags?window.open(a.url):e.$toast(a.message,"error");case 4:case"end":return t.stop()}},t,e)}))()},openDialogFn:function(e){this.dialogOption.isVisible=!0,this.detail=this.tableData[e]}}},d={render:function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"payment-order"},[a("div",{staticClass:"payment-order_search"},[a("el-select",{attrs:{size:"small",placeholder:"请选择"},model:{value:e.requestParams.agentaccountuser,callback:function(t){e.$set(e.requestParams,"agentaccountuser",t)},expression:"requestParams.agentaccountuser"}},e._l(e.options.dealerList,function(e){return a("el-option",{key:e.value,attrs:{label:e.label,value:e.value}})}),1),e._v(" "),a("el-select",{attrs:{size:"small",placeholder:"请选择"},model:{value:e.requestParams.from,callback:function(t){e.$set(e.requestParams,"from",t)},expression:"requestParams.from"}},e._l(e.options.userSourceList,function(e){return a("el-option",{key:e.value,attrs:{label:e.label,value:e.value}})}),1),e._v(" "),a("el-button",{attrs:{size:"small",type:"primary",round:""},on:{click:e.searchHandle}},[e._v("过滤")]),e._v(" "),a("el-button",{attrs:{size:"small",type:"primary",round:""},on:{click:e.downloadPaymentOrder}},[e._v("下载全部（每周一三五更新）")])],1),e._v(" "),a("div",{staticClass:"payment-order_content"},[a("element-table",{attrs:{"table-columns":e.tableColumn,"table-data":e.tableData,"element-loading-background":"rgba(0, 0, 0, 0.5)"}}),e._v(" "),a("customize-pagination",{attrs:{"page-count":e.totalPages},on:{getList:e.getPaymentOrderList}})],1),e._v(" "),a("el-dialog",{attrs:{width:"600px",visible:e.dialogOption.isVisible,title:e.dialogOption.title},on:{"update:visible":function(t){return e.$set(e.dialogOption,"isVisible",t)}}},[a("div",{staticClass:"dialog-content"},[a("div",{staticClass:"clearfix"},[a("base-item",{staticClass:"w_50",attrs:{inline:""}},[a("template",{slot:"label"},[e._v("支付账号:")]),e._v(e._s(e.detail.accountuser))],2),e._v(" "),a("base-item",{staticClass:"w_50",attrs:{inline:""}},[a("template",{slot:"label"},[e._v("礼券名称/礼券id:")]),e._v(e._s(""+e.detail.couponname)+" "),e.detail.couponid?[e._v("/")]:e._e(),e._v(" "+e._s(e.detail.couponid))],2),e._v(" "),a("base-item",{staticClass:"w_50",attrs:{inline:""}},[a("template",{slot:"label"},[e._v("下单时间:")]),e._v(e._s(e.detail.createtime))],2),e._v(" "),a("base-item",{staticClass:"w_50",attrs:{inline:""}},[a("template",{slot:"label"},[e._v("折扣:")]),e._v(e._s(e.detail.discount))],2),e._v(" "),a("base-item",{staticClass:"w_50",attrs:{inline:""}},[a("template",{slot:"label"},[e._v("张数:")]),e._v(e._s(e.detail.couponum))],2),e._v(" "),a("base-item",{staticClass:"w_50",attrs:{inline:""}},[a("template",{slot:"label"},[e._v("原单价:")]),e._v(e._s(e.detail.nodisvalue))],2),e._v(" "),a("base-item",{staticClass:"w_50",attrs:{inline:""}},[a("template",{slot:"label"},[e._v("来源:")]),e._v(e._s(e._f("formatConfigValueToLabel")(e.detail.from,e.options.userSourceList)))],2),e._v(" "),a("base-item",{staticClass:"w_50",attrs:{inline:""}},[a("template",{slot:"label"},[e._v("昵称:")]),e._v(e._s(e.detail.usernick))],2),e._v(" "),a("base-item",{staticClass:"w_50",attrs:{inline:""}},[a("template",{slot:"label"},[e._v("性别:")]),e._v(e._s(e._f("formatConfigValueToLabel")(e.detail.usergender,e.options.sexList)))],2),e._v(" "),a("base-item",{staticClass:"w_50",attrs:{inline:""}},[a("template",{slot:"label"},[e._v("头像:")]),e.detail.userhead?a("img",{staticClass:"user-head",attrs:{src:e.detail.userhead,width:"100%",height:"100%"}}):e._e()],2)],1)]),e._v(" "),a("div",{attrs:{slot:"footer"},slot:"footer"},[a("el-button",{attrs:{size:"small",round:""},on:{click:function(t){e.dialogOption.isVisible=!1}}},[e._v("关 闭")])],1)])],1)},staticRenderFns:[]};var m=a("VU/8")(c,d,!1,function(e){a("Q/ps")},"data-v-bc7b8148",null);t.default=m.exports}});
//# sourceMappingURL=7.47a8290467d4d4eeffb0.js.map