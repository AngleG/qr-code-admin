webpackJsonp([11],{SN4m:function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var s=a("Xxa5"),l=a.n(s),n=a("exGp"),r=a.n(n),i=a("ZEg/"),c=a("mJM1").a.filter(function(e){return!["西藏自治区","新疆维吾尔自治区","香港特别行政区","澳门特别行政区","台湾省"].includes(e.name)}),o={data:function(){return{cityData:c,tableColumns:[{title:"失败表单名称",align:"center",key:"sheetname"},{title:"失败表单行号",align:"center",key:"row"},{title:"失败原因",align:"center",key:"reason"}],tableData:[],configObject:{couponList:[],cityList:[],countyList:[],wishList:[]},requestParams:{couponkeyfrom:null,serialfrom:null,num:null,couponkeyto:null,recprov:null,recity:null,recounty:null,recstreet:null,recontact:null,recphone:null,usermobile:null,helloer:null,hello:null},dialogOption:{visible:!1},paramsConfirm:null,bulkExchangeFile:null,bulkExchangeTotals:0,bulkExchangeSuccessCounts:0}},created:function(){this.getCouponList(),this.getWishList()},methods:{downloadBulkExchangeTemplate:function(){window.open("http://cdn.jedge.cn/批量兑换订单模版.xlsx")},getCacheFile:function(e){this.bulkExchangeFile=e.target.files[0],this.bulkExchangeFile&&this.uploadBulkExchange()},uploadBulkExchange:function(){var e=this;return r()(l.a.mark(function t(){var a,s;return l.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,i.a.uploadBulkExchange(e.bulkExchangeFile);case 2:"success"===(a=t.sent).flags?(e.tableData=[],e.bulkExchangeTotals=0,e.bulkExchangeSuccessCounts=0,(s=a.data)&&s.fails&&(e.tableData=s.fails,e.bulkExchangeTotals=s.total,e.bulkExchangeSuccessCounts=s.success)):e.$toast(a.message,"error"),e.bulkExchangeFile=null;case 5:case"end":return t.stop()}},t,e)}))()},getCouponList:function(){var e=this;return r()(l.a.mark(function t(){var a;return l.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,i.a.getCouponList({});case 2:"success"===(a=t.sent).flags?(e.configObject.couponList=[],a.data&&a.data.length&&(e.configObject.couponList=a.data.reverse().map(function(e){return{label:e.name,value:e.couponkey}}),e.requestParams.couponkeyto=e.requestParams.couponkeyfrom=e.configObject.couponList[0].value||null)):e.$toast(a.message,"error");case 4:case"end":return t.stop()}},t,e)}))()},getWishList:function(){var e=this;return r()(l.a.mark(function t(){var a;return l.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,i.a.getWishList({});case 2:"success"===(a=t.sent).flags?(e.configObject.wishList=[],a.data&&a.data.length&&(e.configObject.wishList=a.data.reverse().map(function(e){return{label:""===e.value?"--------"+e.name+"--------":e.name,value:e.value,isDisabled:""===e.value}}))):e.$toast(a.message,"error");case 4:case"end":return t.stop()}},t,e)}))()},changeProvinceFn:function(e){e&&(this.requestParams.recity=null,this.requestParams.recounty=null);var t=this.requestParams.recprov;this.configObject.cityList=t?this.cityData.find(function(e){return e.name===t}).children:[]},changeCityFn:function(e){e&&(this.requestParams.recounty=null);var t=this.requestParams.recity,a=this.configObject.cityList;this.configObject.countyList=t&&a.length?a.find(function(e){return e.name===t}).children:[]},saveBulkExchange:function(){var e=this;return r()(l.a.mark(function t(){var a,s,n;return l.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:if(a=e.requestParams,s=a.serialfrom,n=a.num,null!==s&&""!==s&&null!==n&&""!==n){t.next=4;break}return t.abrupt("return",e.$toast("礼券起始编号和兑换张数不能为空"));case 4:if(a.serialfrom=s-=0,a.num=n-=0,"number"==typeof s&&"number"==typeof n){t.next=8;break}return t.abrupt("return",e.$toast("礼券起始编号和兑换张数必须为数字"));case 8:if(!(s<1)){t.next=10;break}return t.abrupt("return",e.$toast("礼券起始编号必须大于或等于1"));case 10:if(!(n<0||n>1e3)){t.next=12;break}return t.abrupt("return",e.$toast("兑换张数必须大于0且小于或等于1000"));case 12:e.paramsConfirm=a,e.dialogOption.visible=!0;case 14:case"end":return t.stop()}},t,e)}))()},couponkeyfromChange:function(e){this.requestParams.couponkeyto=this.requestParams.couponkeyfrom},confirmEntureHandle:function(){var e=this;return r()(l.a.mark(function t(){var a;return l.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,i.a.saveBulkExchange(e.paramsConfirm);case 2:"success"===(a=t.sent).flags?e.$toast("批量兑换成功","success"):e.$toast(a.message,"error");case 4:case"end":return t.stop()}},t,e)}))()}}},u={render:function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"bulk-exchange-content"},[a("div",{staticClass:"clearfix"},[a("base-item",{staticClass:"w_310"},[a("template",{slot:"label"},[e._v("礼券来源:")]),e._v(" "),a("el-select",{attrs:{size:"small",value:e.requestParams.couponkeyfrom,placeholder:"请选择礼劵"},on:{change:e.couponkeyfromChange},model:{value:e.requestParams.couponkeyfrom,callback:function(t){e.$set(e.requestParams,"couponkeyfrom",t)},expression:"requestParams.couponkeyfrom"}},e._l(e.configObject.couponList,function(e){return a("el-option",{key:e.value,attrs:{label:e.label,value:e.value}})}),1)],2),e._v(" "),a("base-item",{staticClass:"w_310"},[a("template",{slot:"label"},[e._v("礼券起始编号:")]),e._v(" "),a("el-input",{attrs:{size:"small",placeholder:"请输入礼券起始编号"},model:{value:e.requestParams.serialfrom,callback:function(t){e.$set(e.requestParams,"serialfrom",t)},expression:"requestParams.serialfrom"}})],2),e._v(" "),a("base-item",{staticClass:"w_310"},[a("template",{slot:"label"},[e._v("兑换张数:")]),e._v(" "),a("el-input",{attrs:{size:"small",placeholder:"请输入兑换张数"},model:{value:e.requestParams.num,callback:function(t){e.$set(e.requestParams,"num",t)},expression:"requestParams.num"}})],2),e._v(" "),a("base-item",{staticClass:"w_310"},[a("template",{slot:"label"},[e._v("兑换目标礼券:")]),e._v(" "),a("el-select",{attrs:{size:"small",value:e.requestParams.couponkeyto,placeholder:"请选择礼劵"},model:{value:e.requestParams.couponkeyto,callback:function(t){e.$set(e.requestParams,"couponkeyto",t)},expression:"requestParams.couponkeyto"}},e._l(e.configObject.couponList,function(e){return a("el-option",{key:e.value,attrs:{label:e.label,value:e.value}})}),1)],2),e._v(" "),a("base-item",{staticClass:"w_310"},[a("template",{slot:"label"},[e._v("收货省:")]),e._v(" "),a("el-select",{attrs:{placeholder:"请选择收货省",size:"samll",value:e.requestParams.recprov},on:{change:e.changeProvinceFn},model:{value:e.requestParams.recprov,callback:function(t){e.$set(e.requestParams,"recprov",t)},expression:"requestParams.recprov"}},e._l(e.cityData,function(e){return a("el-option",{key:e.name,attrs:{label:e.name,value:e.name}})}),1)],2),e._v(" "),a("base-item",{staticClass:"w_310"},[a("template",{slot:"label"},[e._v("收货市:")]),e._v(" "),a("el-select",{attrs:{placeholder:"请选择收货市",size:"samll",value:e.requestParams.recity},on:{change:e.changeCityFn},model:{value:e.requestParams.recity,callback:function(t){e.$set(e.requestParams,"recity",t)},expression:"requestParams.recity"}},e._l(e.configObject.cityList,function(e){return a("el-option",{key:e.name,attrs:{label:e.name,value:e.name}})}),1)],2),e._v(" "),a("base-item",{staticClass:"w_310"},[a("template",{slot:"label"},[e._v("收货区县:")]),e._v(" "),a("el-select",{attrs:{placeholder:"请选择收货区县",size:"samll",value:e.requestParams.recounty},model:{value:e.requestParams.recounty,callback:function(t){e.$set(e.requestParams,"recounty",t)},expression:"requestParams.recounty"}},e._l(e.configObject.countyList,function(e){return a("el-option",{key:e.name,attrs:{label:e.name,value:e.name}})}),1)],2),e._v(" "),a("base-item",{staticClass:"w_310"},[a("template",{slot:"label"},[e._v("收货街道详细地址 :")]),e._v(" "),a("el-input",{attrs:{size:"small",placeholder:"请输入收货详细街道地址",maxlength:"100"},model:{value:e.requestParams.recstreet,callback:function(t){e.$set(e.requestParams,"recstreet",t)},expression:"requestParams.recstreet"}})],2),e._v(" "),a("base-item",{staticClass:"w_310"},[a("template",{slot:"label"},[e._v("收货人姓名:")]),e._v(" "),a("el-input",{attrs:{size:"small",placeholder:"请输入收货人姓名",maxlength:"50"},model:{value:e.requestParams.recontact,callback:function(t){e.$set(e.requestParams,"recontact",t)},expression:"requestParams.recontact"}})],2),e._v(" "),a("base-item",{staticClass:"w_310"},[a("template",{slot:"label"},[e._v("收货人手机:")]),e._v(" "),a("el-input",{attrs:{size:"small",placeholder:"请输入收货人手机",maxlength:"11"},model:{value:e.requestParams.recphone,callback:function(t){e.$set(e.requestParams,"recphone",t)},expression:"requestParams.recphone"}})],2),e._v(" "),a("base-item",{staticClass:"w_310"},[a("template",{slot:"label"},[e._v("兑换人姓名:")]),e._v(" "),a("el-input",{attrs:{size:"small",placeholder:"请输入兑换人姓名",maxlength:"11"},model:{value:e.requestParams.helloer,callback:function(t){e.$set(e.requestParams,"helloer",t)},expression:"requestParams.helloer"}})],2),e._v(" "),a("base-item",{staticClass:"w_310"},[a("template",{slot:"label"},[e._v("兑换人手机:")]),e._v(" "),a("el-input",{attrs:{size:"small",placeholder:"请输入兑换人手机",maxlength:"11"},model:{value:e.requestParams.usermobile,callback:function(t){e.$set(e.requestParams,"usermobile",t)},expression:"requestParams.usermobile"}})],2),e._v(" "),a("base-item",{staticClass:"w_310"},[a("template",{slot:"label"},[e._v("祝福语:")]),e._v(" "),a("el-select",{attrs:{placeholder:"请选择祝福语",size:"samll"},model:{value:e.requestParams.hello,callback:function(t){e.$set(e.requestParams,"hello",t)},expression:"requestParams.hello"}},e._l(e.configObject.wishList,function(e){return a("el-option",{key:e.name,attrs:{label:e.label,value:e.value,disabled:e.isDisabled}})}),1)],2)],1),e._v(" "),a("p",{staticStyle:{"margin-top":"30px","line-height":"30px"}},[a("el-button",{staticClass:"confirm",attrs:{type:"primary",size:"small",round:""},on:{click:e.downloadBulkExchangeTemplate}},[e._v("下载批量兑换订单模版")]),e._v(" "),a("el-button",{staticClass:"confirm",attrs:{type:"primary",size:"small",round:""},on:{click:e.saveBulkExchange}},[e._v("生成兑换订单")]),e._v(" "),a("input",{staticStyle:{visibility:"hidden",width:"0",height:"0"},attrs:{type:"file",accept:"/*",name:"exorder",id:"upload_bulk_exchange"},on:{change:e.getCacheFile}}),e._v(" "),e._m(0)],1),e._v(" "),a("div",{staticStyle:{padding:"20px"}},[a("p",{staticStyle:{"text-align":"left"}},[a("base-item",{attrs:{inline:""}},[a("template",{slot:"label"},[e._v("上传总兑换订单数:")]),e._v(e._s(e.bulkExchangeTotals))],2),e._v(" "),a("base-item",{attrs:{inline:""}},[a("template",{slot:"label"},[e._v("成功兑换订单数:")]),e._v(e._s(e.bulkExchangeSuccessCounts))],2)],1),e._v(" "),a("element-table",{attrs:{"table-columns":e.tableColumns,"table-data":e.tableData,"element-loading-background":"rgba(0, 0, 0, 0.5)"}})],1),e._v(" "),a("el-dialog",{attrs:{width:"600px",visible:e.dialogOption.visible,title:"信息确认"},on:{"update:visible":function(t){return e.$set(e.dialogOption,"visible",t)}}},[a("div",{staticClass:"dialog-content"},[a("div",[a("span",{staticClass:"label"},[e._v("礼券来源:")]),e._v(" "),e.configObject.couponList.length?a("span",{staticClass:"text-field"},[e._v(e._s(e.requestParams.couponkeyfrom?e.configObject.couponList.find(function(t){return t.value===e.requestParams.couponkeyfrom}).label:""))]):e._e(),e._v(" "),a("span",{staticClass:"label"},[e._v("礼券起始编号:")]),e._v(" "),a("span",{staticClass:"text-field"},[e._v(e._s(e.requestParams.serialfrom))])]),e._v(" "),a("div",[a("span",{staticClass:"label"},[e._v("兑换张数:")]),e._v(" "),a("span",{staticClass:"text-field"},[e._v(e._s(e.requestParams.num))]),e._v(" "),a("span",{staticClass:"label"},[e._v("兑换目标礼券:")]),e._v(" "),e.configObject.couponList.length?a("span",{staticClass:"text-field"},[e._v(e._s(e.requestParams.couponkeyto?e.configObject.couponList.find(function(t){return t.value===e.requestParams.couponkeyto}).label:""))]):e._e()]),e._v(" "),a("div",[a("span",{staticClass:"label"},[e._v("收货省:")]),e._v(" "),a("span",{staticClass:"text-field"},[e._v(e._s(e.requestParams.recprov))]),e._v(" "),a("span",{staticClass:"label"},[e._v("收货市:")]),e._v(" "),a("span",{staticClass:"text-field"},[e._v(e._s(e.requestParams.recity))])]),e._v(" "),a("div",[a("span",{staticClass:"label"},[e._v("收货区县:")]),e._v(" "),a("span",{staticClass:"text-field"},[e._v(e._s(e.requestParams.recounty))]),e._v(" "),a("span",{staticClass:"label"},[e._v("收货街道详细地址:")]),e._v(" "),a("span",{staticClass:"text-field"},[e._v(e._s(e.requestParams.recstreet))])]),e._v(" "),a("div",[a("span",{staticClass:"label"},[e._v("收货人姓名:")]),e._v(" "),a("span",{staticClass:"text-field"},[e._v(e._s(e.requestParams.recontact))]),e._v(" "),a("span",{staticClass:"label"},[e._v("收货人手机:")]),e._v(" "),a("span",{staticClass:"text-field"},[e._v(e._s(e.requestParams.recphone))])]),e._v(" "),a("div",[a("span",{staticClass:"label"},[e._v("兑换人姓名:")]),e._v(" "),a("span",{staticClass:"text-field"},[e._v(e._s(e.requestParams.helloer))]),e._v(" "),a("span",{staticClass:"label"},[e._v("兑换人手机:")]),e._v(" "),a("span",{staticClass:"text-field"},[e._v(e._s(e.requestParams.usermobile))])]),e._v(" "),a("div",[a("span",{staticClass:"label"},[e._v("祝福语:")]),e._v(" "),a("span",{staticClass:"text-field"},[e._v(e._s(e.requestParams.hello))])])]),e._v(" "),a("div",{attrs:{slot:"footer"},slot:"footer"},[a("el-button",{attrs:{round:""},on:{click:function(t){e.dialogOption.visible=!1}}},[e._v("取消")]),e._v(" "),a("el-button",{attrs:{round:"",type:"primary"},on:{click:e.confirmEntureHandle}},[e._v("确定生成兑换订单")])],1)])],1)},staticRenderFns:[function(){var e=this.$createElement,t=this._self._c||e;return t("label",{attrs:{for:"upload_bulk_exchange"}},[t("span",{staticClass:"el-button el-button--primary el-button--small is-round",staticStyle:{"margin-right":"20px"}},[this._v("上传批量兑换订单")])])}]};var m=a("VU/8")(o,u,!1,function(e){a("zmzm")},"data-v-2bd8dde8",null);t.default=m.exports},zmzm:function(e,t){}});
//# sourceMappingURL=11.fe704a6e614bc83bcc90.js.map