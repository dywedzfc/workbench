(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-2b91fefe"],{"11a6":function(e,n,i){"use strict";i("2252")},"11b8":function(e,n,i){"use strict";i("6fd5")},"12ca":function(e,n,i){},"1b3f":function(e,n,i){"use strict";var o=function(){var e=this,n=e.$createElement,i=e._self._c||n;return i("div",{staticClass:"dialog-drawer",class:{show:e.display,search:"search"==e.type,close:e.close}},[i("div",{staticClass:"dialog-drawer-header"},[i("div",{staticClass:"title"},[e._t("title",(function(){return[e._v(e._s(e.title))]}))],2),i("div",{staticClass:"button-close el-icon-close",on:{click:e.handleCloseClick}})]),i("div",{staticClass:"dialog-drawer-body"},[i("div",{ref:"flexWrapper",staticClass:"flex-wrapper"},[e._t("default")],2)])])},a=[],t={name:"DialogDrawer",props:{display:{type:Boolean,default:!1},title:String,type:String},data(){return{close:!1}},computed:{},watch:{display:{handler(e){e&&this.$refs["flexWrapper"].scrollTo(0,0)}}},mounted(){},destroyed(){this.close=!0},methods:{handleCloseClick(){this.$listeners["update:display"]&&this.$emit("update:display",!1)}}},c=t,l=(i("11b8"),i("2877")),s=Object(l["a"])(c,o,a,!1,null,"06cd7eb5",null);n["a"]=s.exports},2252:function(e,n,i){},2366:function(e,n,i){"use strict";i("eeb9")},"2a2b":function(e,n,i){},3824:function(e,n,i){e.exports=i.p+"img/logo.551fb1bc.png"},4013:function(e,n,i){"use strict";i("f95a")},4308:function(e,n,i){},4979:function(e,n,i){"use strict";i("12ca")},"6a98":function(e,n,i){e.exports=i.p+"img/logo-w.99293fdd.png"},"6fd5":function(e,n,i){},7651:function(e,n,i){"use strict";var o=function(){var e=this,n=e.$createElement,i=e._self._c||n;return i("div",{staticClass:"page"},[i("div",{staticClass:"page-header"},[e.back?i("div",{staticClass:"page-button btn-back",class:e.icon,on:{click:e.handleBackClick}}):e._e(),i("div",{staticClass:"title"},[e._t("title",(function(){return[e._v(e._s(e.title))]}))],2),e.$slots.tool?i("div",{staticClass:"tool"},[e._t("tool")],2):e._e()]),i("div",{staticClass:"page-body"},[e._t("default")],2)])},a=[],t={name:"Page",props:{title:String,back:{type:Boolean,default:!0},icon:{type:String,default:"el-icon-back"}},methods:{handleBackClick(){this.$listeners["back"]?this.$emit("back"):this.$router.back()}}},c=t,l=(i("4013"),i("2877")),s=Object(l["a"])(c,o,a,!1,null,"53c7c5c6",null);n["a"]=s.exports},"89ca":function(e,n,i){"use strict";var o=function(){var e=this,n=e.$createElement,o=e._self._c||n;return o("div",{staticClass:"logo-box",style:e.logoBoxStyle},[e.isTime?o("div",{staticClass:"datetime-box"},[o("div",{staticClass:"date"},[e._v(e._s(e.formatterDate))]),o("div",{staticClass:"time"},[e._v(e._s(e.formatterTime))])]):e._e(),e.resetTheme?o("img",{staticClass:"logo",attrs:{alt:"Work Bench logo",src:i("6a98")}}):o("img",{staticClass:"logo",attrs:{alt:"Work Bench logo",src:i("3824")}})])},a=[],t={name:"Logo",inject:["pro_datetime","pro_theme"],data(){return{}},props:{size:{type:String,default:"200px"},isTime:{type:Boolean,default:!0}},computed:{resetTheme(){return"dark"==this.pro_theme()},logoBoxStyle(){const e={},n=/0|(([0-9]|[1-9][0-9]*)(px|%|em|rem|vw))/,i=/0|([0-9]|[1-9][0-9]*)/;return this.size&&n.test(this.size)?e.width=e.height=this.size:this.size&&i.test(this.size)&&(e.width=e.height=this.size+"px"),e},formatterDate(){let e=this.pro_datetime();if(!e)return"";const[n]=e.split(" ");return n},formatterTime(){let e=this.pro_datetime();if(!e)return"";const[,n]=e.split(" ");return n}},mounted(){},methods:{}},c=t,l=(i("d633"),i("2877")),s=Object(l["a"])(c,o,a,!1,null,"fd8fa0fc",null);n["a"]=s.exports},"8e03":function(e,n,i){},9163:function(e){e.exports=JSON.parse('{"b":[{"name":"通用","children":[{"name":"星星","icon":"el-icon-star-on"},{"name":"星星","icon":"el-icon-star-off"},{"name":"书签","icon":"el-icon-s-management"},{"name":"书签","icon":"el-icon-collection"},{"name":"书签","icon":"el-icon-collection-tag"},{"name":"书签","icon":"el-icon-discount"},{"name":"书签","icon":"el-icon-price-tag"},{"name":"提醒","icon":"el-icon-message-solid"},{"name":"提醒","icon":"el-icon-bell"},{"name":"提醒","icon":"el-icon-close-notification"},{"name":"提醒","icon":"el-icon-news"},{"name":"分享","icon":"el-icon-share"},{"name":"链接","icon":"el-icon-link"},{"name":"链接","icon":"el-icon-connection"},{"name":"刷新","icon":"el-icon-refresh"},{"name":"刷新","icon":"el-icon-refresh-right"},{"name":"刷新","icon":"el-icon-refresh-left"},{"name":"人","icon":"el-icon-user-solid"},{"name":"人","icon":"el-icon-user"},{"name":"人","icon":"el-icon-s-custom"},{"name":"包","icon":"el-icon-s-cooperation"},{"name":"包","icon":"el-icon-suitcase"},{"name":"包","icon":"el-icon-suitcase-1"},{"name":"包","icon":"el-icon-first-aid-kit"},{"name":"盒子","icon":"el-icon-takeaway-box"},{"name":"盒子","icon":"el-icon-receiving"},{"name":"控制器","icon":"el-icon-s-operation"},{"name":"控制器","icon":"el-icon-set-up"},{"name":"开关","icon":"el-icon-open"},{"name":"开关","icon":"el-icon-turn-off"},{"name":"开关","icon":"el-icon-switch-button"},{"name":"关锁","icon":"el-icon-lock"},{"name":"开锁","icon":"el-icon-unlock"},{"name":"钥匙","icon":"el-icon-key"},{"name":"篮球","icon":"el-icon-basketball"},{"name":"足球","icon":"el-icon-football"},{"name":"橄榄球","icon":"el-icon-soccer"},{"name":"棒球","icon":"el-icon-baseball"},{"name":"风力","icon":"el-icon-wind-power"},{"name":"影像","icon":"el-icon-magic-stick"},{"name":"帮助","icon":"el-icon-question"},{"name":"帮助","icon":"el-icon-s-help"},{"name":"帮助","icon":"el-icon-help"},{"name":"帮助","icon":"el-icon-s-opportunity"},{"name":"奖牌","icon":"el-icon-medal-1"},{"name":"奖牌","icon":"el-icon-medal"},{"name":"奖牌","icon":"el-icon-trophy"},{"name":"奖牌","icon":"el-icon-trophy-1"},{"name":"旗子","icon":"el-icon-s-flag"},{"name":"房子","icon":"el-icon-s-home"},{"name":"房子","icon":"el-icon-house"},{"name":"房子","icon":"el-icon-s-shop"},{"name":"房子","icon":"el-icon-office-building"},{"name":"房子","icon":"el-icon-school"},{"name":"指针","icon":"el-icon-odometer"},{"name":"指针","icon":"el-icon-stopwatch"},{"name":"指针","icon":"el-icon-discover"},{"name":"指针","icon":"el-icon-guide"},{"name":"组","icon":"el-icon-s-grid"},{"name":"菜单","icon":"el-icon-menu"},{"name":"烟","icon":"el-icon-no-smoking"},{"name":"烟","icon":"el-icon-smoking"}]},{"name":"开发工具","children":[{"name":"sass","icon":"icon-sass-logo"},{"name":"css3","icon":"icon-css-logo"},{"name":"nodejs","icon":"icon-nodejs-logo"},{"name":"vue","icon":"icon-vue-logo"},{"name":"angular","icon":"icon-angular-logo"},{"name":"Element UI","icon":"el-icon-platform-eleme"},{"name":"Element UI","icon":"el-icon-eleme"},{"name":"Ant Design","icon":"icon-antdesign"}]},{"name":"日期","children":[{"name":"日历","icon":"el-icon-date"},{"name":"手表","icon":"el-icon-watch-1"},{"name":"手表","icon":"el-icon-watch"},{"name":"时间","icon":"el-icon-time"},{"name":"闹钟","icon":"el-icon-alarm-clock"},{"name":"计时","icon":"el-icon-timer"}]},{"name":"文稿","children":[{"name":"文件夹","icon":"el-icon-folder"},{"name":"文件夹","icon":"el-icon-folder-opened"},{"name":"文件夹","icon":"el-icon-folder-add"},{"name":"文件夹","icon":"el-icon-folder-remove"},{"name":"文件夹","icon":"el-icon-folder-delete"},{"name":"文件夹","icon":"el-icon-folder-checked"},{"name":"文件","icon":"el-icon-s-order"},{"name":"文件","icon":"el-icon-s-release"},{"name":"文件","icon":"el-icon-s-claim"},{"name":"文件","icon":"el-icon-tickets"},{"name":"文件","icon":"el-icon-document-copy"},{"name":"文件","icon":"el-icon-document-remove"},{"name":"文件","icon":"el-icon-document-delete"},{"name":"文件","icon":"el-icon-document-checked"},{"name":"文件","icon":"el-icon-document-add"},{"name":"文件","icon":"el-icon-document"},{"name":"文具","icon":"el-icon-notebook-1"},{"name":"文具","icon":"el-icon-notebook-2"},{"name":"文具","icon":"el-icon-paperclip"},{"name":"影像","icon":"el-icon-scissors"}]},{"name":"影像","children":[{"name":"图片","icon":"el-icon-picture"},{"name":"图片","icon":"el-icon-picture-outline"},{"name":"图片","icon":"el-icon-picture-outline-round"},{"name":"影像","icon":"el-icon-camera-solid"},{"name":"影像","icon":"el-icon-camera"},{"name":"影像","icon":"el-icon-video-camera-solid"},{"name":"影像","icon":"el-icon-video-camera"},{"name":"影像","icon":"el-icon-film"},{"name":"影像","icon":"el-icon-video-pause"},{"name":"影像","icon":"el-icon-video-play"},{"name":"影像","icon":"el-icon-headset"},{"name":"影像","icon":"el-icon-service"},{"name":"影像","icon":"el-icon-microphone"},{"name":"影像","icon":"el-icon-turn-off-microphone"},{"name":"影像","icon":"el-icon-mic"}]},{"name":"定位","children":[{"name":"定位","icon":"el-icon-position"},{"name":"定位","icon":"el-icon-aim"},{"name":"定位","icon":"el-icon-coordinate"},{"name":"定位","icon":"el-icon-place"},{"name":"定位","icon":"el-icon-location"},{"name":"定位","icon":"el-icon-location-outline"},{"name":"定位","icon":"el-icon-location-information"},{"name":"定位","icon":"el-icon-add-location"},{"name":"定位","icon":"el-icon-delete-location"},{"name":"定位","icon":"el-icon-map-location"}]},{"name":"操作","children":[{"name":"添加","icon":"el-icon-circle-plus"},{"name":"添加","icon":"el-icon-circle-plus-outline"},{"name":"删除","icon":"el-icon-remove"},{"name":"删除","icon":"el-icon-remove-outline"},{"name":"修改","icon":"el-icon-edit"},{"name":"删除","icon":"el-icon-delete-solid"},{"name":"删除","icon":"el-icon-delete"},{"name":"删除","icon":"el-icon-error"},{"name":"删除","icon":"el-icon-circle-close"},{"name":"修改","icon":"el-icon-edit-outline"},{"name":"添加","icon":"el-icon-plus"},{"name":"删除","icon":"el-icon-minus"},{"name":"成功","icon":"el-icon-success"},{"name":"成功","icon":"el-icon-circle-check"},{"name":"成功","icon":"el-icon-s-check"},{"name":"成功","icon":"el-icon-check"},{"name":"删除","icon":"el-icon-close"},{"name":"设置","icon":"el-icon-s-tools"},{"name":"设置","icon":"el-icon-setting"},{"name":"信息","icon":"el-icon-info"},{"name":"放大","icon":"el-icon-zoom-in"},{"name":"缩小","icon":"el-icon-zoom-out"},{"name":"设置","icon":"el-icon-s-open"},{"name":"设置","icon":"el-icon-brush"},{"name":"上传","icon":"el-icon-upload"},{"name":"信息","icon":"el-icon-warning"},{"name":"信息","icon":"el-icon-warning-outline"},{"name":"更多","icon":"el-icon-more"},{"name":"更多","icon":"el-icon-more-outline"},{"name":"上传","icon":"el-icon-upload2"},{"name":"上传","icon":"el-icon-download"}]},{"name":"通讯","children":[{"name":"通讯","icon":"el-icon-phone"},{"name":"通讯","icon":"el-icon-phone-outline"},{"name":"通讯","icon":"el-icon-s-promotion"},{"name":"通讯","icon":"el-icon-chat-round"},{"name":"通讯","icon":"el-icon-chat-dot-round"},{"name":"通讯","icon":"el-icon-chat-line-round"},{"name":"通讯","icon":"el-icon-chat-square"},{"name":"通讯","icon":"el-icon-chat-dot-square"},{"name":"通讯","icon":"el-icon-chat-line-square"},{"name":"通讯","icon":"el-icon-s-comment"},{"name":"通讯","icon":"el-icon-message"}]},{"name":"图表","children":[{"name":"图表","icon":"el-icon-s-marketing"},{"name":"图表","icon":"el-icon-s-data"},{"name":"图表","icon":"el-icon-data-board"},{"name":"图表","icon":"el-icon-data-line"},{"name":"图表","icon":"el-icon-data-analysis"},{"name":"图表","icon":"el-icon-pie-chart"}]},{"name":"票","children":[{"name":"票","icon":"el-icon-s-ticket"},{"name":"票","icon":"el-icon-s-finance"},{"name":"票","icon":"el-icon-wallet"},{"name":"票","icon":"el-icon-postcard"},{"name":"票","icon":"el-icon-bank-card"},{"name":"票","icon":"el-icon-money"},{"name":"票","icon":"el-icon-coin"},{"name":"票","icon":"el-icon-c-scale-to-original"},{"name":"票","icon":"el-icon-files"}]},{"name":"电器","children":[{"name":"电器","icon":"el-icon-s-platform"},{"name":"电器","icon":"el-icon-monitor"},{"name":"电器","icon":"el-icon-mouse"},{"name":"电器","icon":"el-icon-mobile"},{"name":"电器","icon":"el-icon-mobile-phone"},{"name":"电器","icon":"el-icon-refrigerator"},{"name":"打印机","icon":"el-icon-printer"}]},{"name":"交通工具","children":[{"name":"车","icon":"el-icon-bicycle"},{"name":"车","icon":"el-icon-truck"},{"name":"车","icon":"el-icon-ship"}]},{"name":"购物","children":[{"name":"购物","icon":"el-icon-shopping-cart-1"},{"name":"购物","icon":"el-icon-shopping-cart-2"},{"name":"购物","icon":"el-icon-shopping-cart-full"},{"name":"购物","icon":"el-icon-shopping-bag-1"},{"name":"购物","icon":"el-icon-shopping-bag-2"},{"name":"购物","icon":"el-icon-sold-out"},{"name":"购物","icon":"el-icon-sell"},{"name":"购物","icon":"el-icon-present"}]},{"name":"公司","children":[{"name":"苹果","icon":"icon-apple-logo"},{"name":"windows","icon":"icon-windows-logo"},{"name":"索尼","icon":"icon-sony"},{"name":"GitHub","icon":"icon-github"},{"name":"GitHub","icon":"icon-github-logo"},{"name":"psp","icon":"icon-psp-logo"},{"name":"xbox","icon":"icon-xbox-logo"},{"name":"哔哩哔哩","icon":"icon-bilibili"},{"name":"哔哩哔哩","icon":"icon-bilibili-logo"},{"name":"微信","icon":"icon-weixin-logo"},{"name":"QQ","icon":"icon-qq-logo"},{"name":"钉钉","icon":"icon-dingding-logo"},{"name":"支付宝","icon":"icon-alipay-logo"},{"name":"支付宝","icon":"icon-alipay1-logo"},{"name":"微博","icon":"icon-weibo-logo"},{"name":"高德地图","icon":"icon-gaode-logo"},{"name":"印象笔记","icon":"icon-evernote-logo"},{"name":"百度","icon":"icon-baidu-logo"},{"name":"火狐","icon":"icon-firefox-logo"},{"name":"谷歌","icon":"icon-google-logo"},{"name":"IE","icon":"icon-ie-logo"},{"name":"顺丰","icon":"icon-sf-logo"}]},{"name":"通信","children":[{"name":"联通","icon":"icon-liantong-logo"},{"name":"电信","icon":"icon-dianxin-logo"},{"name":"移动","icon":"icon-yidong-logo"}]},{"name":"银行","children":[{"name":"交通银行","icon":"icon-jiaotong-logo"},{"name":"中国工商银行","icon":"icon-gongshang-logo"},{"name":"兴业银行","icon":"icon-xingye-logo"},{"name":"中国农业银行","icon":"icon-nongye-logo"},{"name":"中国建设银行","icon":"icon-jianshe-logo"},{"name":"上海浦东发展银行","icon":"icon-shanghaipudong-logo"},{"name":"中国邮政","icon":"icon-youzheng-logo"},{"name":"广州市商业银行","icon":"icon-shangye-logo"},{"name":"中国银行","icon":"icon-zhongguo-logo"},{"name":"深圳发展银行","icon":"icon-shenzhenfazhan-logo"},{"name":"北京农村商业银行","icon":"icon-beijingnongye-logo"},{"name":"广州市商业银行","icon":"icon-guangdongshangye-logo"},{"name":"盛京银行","icon":"icon-shengjing-logo"},{"name":"华夏银行","icon":"icon-huaxia-logo"},{"name":"北京银行","icon":"icon-beijing-logo"},{"name":"南京银行","icon":"icon-nanjing-logo"},{"name":"徽商银行","icon":"icon-huishang-logo"},{"name":"浙商银行","icon":"icon-zheshang-logo"}]},{"name":"天气","children":[{"name":"雨天","icon":"el-icon-light-rain"},{"name":"雷雨","icon":"el-icon-lightning"},{"name":"大雨","icon":"el-icon-heavy-rain"},{"name":"日出","icon":"el-icon-sunrise"},{"name":"日出","icon":"el-icon-sunrise-1"},{"name":"日落","icon":"el-icon-sunset"},{"name":"晴天","icon":"el-icon-sunny"},{"name":"多云的","icon":"el-icon-cloudy"},{"name":"多云","icon":"el-icon-partly-cloudy"},{"name":"多云晴","icon":"el-icon-cloudy-and-sunny"},{"name":"月亮","icon":"el-icon-moon"},{"name":"月夜","icon":"el-icon-moon-night"}]},{"name":"餐具","children":[{"name":"餐具","icon":"el-icon-dish"},{"name":"餐具","icon":"el-icon-dish-1"},{"name":"餐具","icon":"el-icon-food"},{"name":"餐具","icon":"el-icon-fork-spoon"},{"name":"餐具","icon":"el-icon-knife-fork"},{"name":"餐具","icon":"el-icon-tableware"},{"name":"餐具","icon":"el-icon-hot-water"},{"name":"餐具","icon":"el-icon-water-cup"},{"name":"餐具","icon":"el-icon-coffee-cup"},{"name":"餐具","icon":"el-icon-cold-drink"},{"name":"餐具","icon":"el-icon-goblet"},{"name":"餐具","icon":"el-icon-goblet-full"},{"name":"餐具","icon":"el-icon-goblet-square"},{"name":"餐具","icon":"el-icon-goblet-square-full"},{"name":"餐具","icon":"el-icon-coffee"},{"name":"餐具","icon":"el-icon-ice-tea"},{"name":"餐具","icon":"el-icon-ice-drink"},{"name":"餐具","icon":"el-icon-milk-tea"}]},{"name":"食物","children":[{"name":"食物","icon":"el-icon-chicken"},{"name":"食物","icon":"el-icon-burger"},{"name":"食物","icon":"el-icon-sugar"},{"name":"食物","icon":"el-icon-dessert"},{"name":"食物","icon":"el-icon-ice-cream"},{"name":"食物","icon":"el-icon-grape"},{"name":"食物","icon":"el-icon-watermelon"},{"name":"食物","icon":"el-icon-cherry"},{"name":"食物","icon":"el-icon-apple"},{"name":"食物","icon":"el-icon-pear"},{"name":"食物","icon":"el-icon-orange"},{"name":"食物","icon":"el-icon-potato-strips"},{"name":"食物","icon":"el-icon-lollipop"},{"name":"食物","icon":"el-icon-ice-cream-square"},{"name":"食物","icon":"el-icon-ice-cream-round"}]}],"a":"el-icon-star-off"}')},"927d":function(e,n,i){"use strict";i("8e03")},a439:function(e,n,i){"use strict";i("4308")},c173:function(e,n,i){},c3bf:function(e,n,i){},d0ce:function(e,n,i){"use strict";i("2a2b")},d2eb:function(e,n,i){"use strict";i.r(n);var o=function(){var e=this,n=e.$createElement,i=e._self._c||n;return i("page",{staticClass:"page-home",attrs:{title:"开心每一天",back:!1},scopedSlots:e._u([{key:"tool",fn:function(){return[i("el-button",{staticClass:"page-button",attrs:{type:"text",icon:e.edit?"el-icon-monitor":"el-icon-edit"},on:{click:e.handleIconTypeClick}})]},proxy:!0}])},[i("div",{staticClass:"template-wrapper"},[i("logo",{attrs:{size:"16vw"}}),i("search-bar",{attrs:{value:e.search.query,auto:""},on:{query:e.handleSearchQueryClick}}),i("group-card",{attrs:{data:e.shortcutMenuList,type:e.edit},on:{add:e.handleAddGroupClick,edit:e.handleEditGroupClick,remove:e.handleDeleteGroupClick}})],1),i("dialog-box",{staticClass:"home-dialog",attrs:{visible:e.dialog.display},on:{"update:visible":function(n){return e.$set(e.dialog,"display",n)}}},[e.dialog.display?i("shortcut-menu-dialog",{attrs:{"form-data":e.dialog.data},on:{cancel:e.handleSMCancel,submit:e.handleSMSubmit}}):e._e()],1),i("search-engine-drawer",{attrs:{visible:e.search.display,query:e.search.query},on:{"update:visible":function(n){return e.$set(e.search,"display",n)},"update:query":function(n){return e.$set(e.search,"query",n)}}})],1)},a=[],t=i("7651"),c=i("89ca"),l=function(){var e=this,n=e.$createElement,i=e._self._c||n;return e.visible?i("div",{class:["dialog-model",{show:e.show}]},[i("div",{ref:"flexWrapper",staticClass:"dialog-box"},[e._t("default")],2)]):e._e()},s=[],r=i("2f62"),d=i("12db"),m=i("9637"),h={name:"DialogBox",props:{visible:{type:Boolean,default:!1}},data(){return{show:!0}},computed:{...Object(r["b"])({menuShow:d["h"]})},watch:{display:{handler(e){e&&(this.$refs["flexWrapper"].scrollTo(0,0),this.show=Object(m["b"])().show)}},menuShow(e){this.show=e}},created(){this.show=Object(m["b"])().show},destroyed(){},methods:{handleCloseClick(){this.$listeners["update:display"]&&this.$emit("update:display",!1)}}},p=h,u=(i("4979"),i("2877")),g=Object(u["a"])(p,l,s,!1,null,"fc080ab6",null),f=g.exports,b=function(){var e=this,n=e.$createElement,i=e._self._c||n;return i("dialog-drawer",{attrs:{display:e.search.display,type:"search"},on:{"update:display":function(n){return e.$set(e.search,"display",n)}}},[i("search-bar",{staticClass:"dialog-drawer-search",attrs:{value:e.search.query},on:{query:e.handleDSearchQueryClick}}),e.search.display?i("div",{staticClass:"search-list"},[i("webView",{ref:"oneIframe",staticClass:"search-iframe",attrs:{src:"https://www.baidu.com/s?wd="+e.search.query,allowpopups:""}}),i("webView",{ref:"twoIframe",staticClass:"search-iframe",attrs:{src:"https://m.cn.bing.com/search?q="+e.search.query+"&ensearch=1",allowpopups:""}}),i("webView",{ref:"theIframe",staticClass:"search-iframe",attrs:{src:"https://www.sogou.com/web?query="+e.search.query,allowpopups:""}})],1):e._e()],1)},y=[],_=i("1b3f"),w=function(){var e=this,n=e.$createElement,i=e._self._c||n;return i("div",{class:["search-bar",{auto:e.auto}]},[i("el-input",{staticClass:"search-input",attrs:{"prefix-icon":"el-icon-search",placeholder:"请输入内容"},nativeOn:{keyup:function(n){return!n.type.indexOf("key")&&e._k(n.keyCode,"enter",13,n.key,"Enter")?null:e.handleSearchKeyup.apply(null,arguments)}},model:{value:e.query,callback:function(n){e.query=n},expression:"query"}}),i("el-button",{staticClass:"search-button",attrs:{type:"primary"},on:{click:e.handleSearchButtonClick}},[e._v(" 搜 索 ")])],1)},v=[],k={name:"Home",props:{value:{type:String,required:!0},auto:{type:Boolean,default:!1}},data(){return{query:""}},computed:{},watch:{value:{handler(e){this.query=e},immediate:!0}},mounted(){},methods:{handleSearchKeyup(){this.query&&this.$listeners.query&&this.$emit("query",this.query)},handleSearchButtonClick(){this.query&&this.$listeners.query&&this.$emit("query",this.query)}}},C=k,x=(i("2366"),Object(u["a"])(C,w,v,!1,null,"6f722edd",null)),D=x.exports,$={name:"SearchEngineDrawer",components:{DialogDrawer:_["a"],SearchBar:D},props:{visible:{type:Boolean,default:!1},query:{type:String,required:!0}},data(){return{search:{display:!1,query:""}}},watch:{visible:{handler(e){this.search.display=e,e&&this.$nextTick(()=>{const{oneIframe:e,twoIframe:n,theIframe:i}=this.$refs;e.addEventListener("did-stop-loading",()=>{console.log("did-stop-loading..."),this.initIframePreload(e,"baidu")}),n.addEventListener("did-stop-loading",()=>{console.log("did-stop-loading..."),this.initIframePreload(n,"bing")}),i.addEventListener("did-stop-loading",()=>{console.log("did-stop-loading..."),this.initIframePreload(i,"sogou")})})},immediate:!0},"search.display"(e){this.$listeners["update:visible"]&&this.$emit("update:visible",e)},query:{handler(e){this.search.query=e},immediate:!0},"search.query"(e){this.$listeners["update:query"]&&this.$emit("update:query",e||"")}},methods:{handleDSearchQueryClick(e){this.search.display=!1,this.$nextTick(()=>{this.search.display=!0,this.search.query=e})},initIframeData(e){const n={};return"baidu"==e?(n.style=["head, body { min-width: 680px !important; }","#wrapper #head { display: none; min-width: 700px; }","#wrapper #s_tab { width: auto; padding-top: 15px; padding-left: 30px; }","#wrapper #container.sam_newgrid { box-sizing: border-box; width: auto; margin: 0; padding-left: 30px; }","#wrapper #container.sam_newgrid #content_right { display: none; }","#wrapper .rs-normal-width_2T91A { width: 100%; }","#wrapper .page-inner_2jZi2 { padding-left: 30px; }","#wrapper #foot { display: none; }"].join(" "),n.script="const sponsored = document.querySelectorAll('[tpl=\"softdown\"],[class*=\"EC_\"],._8pnr6st'); for(let i = 0; i < sponsored.length; i++) { const item = sponsored[i]; item.style.display = 'none'; }"):"bing"==e?n.style=["html, body { min-width: 680px !important; }",".b_respl #b_header { min-width: 100%; }",".b_respl #b_header #est_switch { position: absolute; right: 0; margin 0; }",".b_respl #b_header .b_scopebar { margin-left: 30px; }",".b_respl #b_content { padding-left: 30px; }",".b_respl .b_adTop, .b_respl .b_adBottom, .b_respl .sb_adTA { display: none; }",'.b_respl #b_header #sb_form, .b_respl #b_header #id_h, #b_content .ev_talkbox_wrapper, #ev_talkbox_wrapper, aside[aria-label="更多结果"], aside[aria-label="Additional Results"], #b_footer { display: none; }',".b_respl #b_results .b_rc_gb_template .b_widgetContainer { left: calc(100% + 127px); visibility: visible !important; padding-left: 0; padding-right: 8px; border-radius: 0 15px 15px 0; }",".b_respl #b_results .b_rc_gb_w_content { padding: 8px 8px 8px 0; border-radius: 0 10px 10px 0; }",".b_respl #b_results .b_rc_gb_template .b_rc_gb_widget_link:hover { border-radius: 0 6px 6px 0; }",".b_respl #b_results .b_widgetGrad { left: 0; background: linear-gradient(90deg,rgba(0,0,0,.15) -68.75%,rgba(0,0,0,0) 81.25%); }"].join(" "):"sogou"==e&&(n.style=["html, body, #sogou_wrap_id, #sogou_wrap_id .header { min-width: 680px !important; }","#sogou_wrap_id .header .logo, #sogou_wrap_id .header .top-bar, #sogou_wrap_id .header #searchForm, #sogou_wrap_id #right, #sogou_wrap_id #s_footer, #sogou_wrap_id #float_uphint, #sogou_wrap_id .sponsored { display: none; }","#sogou_wrap_id .header .searchnav { display: block; padding-left: 15px; }","#sogou_wrap_id .header.headsearch { min-height: 30px; }","#sogou_wrap_id .header.headsearch .searchnav { padding-top: 15px; }","#sogou_wrap_id #wrapper, #sogou_wrap_id #pagebar_container, #sogou_wrap_id .hintBox { padding-left: 30px; }","#sogou_wrap_id #pagebar_container { width: 640px; }"].join(" ")),n},initIframePreload(e,n){const{style:i,script:o}=this.initIframeData(n);i&&e.insertCSS(i),o&&e.executeJavaScript(o)}}},S=$,j=(i("11a6"),Object(u["a"])(S,b,y,!1,null,"04108106",null)),q=j.exports,O=function(){var e=this,n=e.$createElement,i=e._self._c||n;return i("div",{staticClass:"group-card"},[e._l(e.data,(function(n){return[e.type&&1===n.operate?i("el-popover",{key:"popover_"+n.id,attrs:{title:n.title,trigger:"hover"},model:{value:n.show,callback:function(i){e.$set(n,"show",i)},expression:"item.show"}},[i("el-dropdown-item",{attrs:{divided:""}}),i("el-dropdown-item",{staticClass:"primary",nativeOn:{click:function(i){return e.handleEditGroupClick(n)}}},[i("i",{staticClass:"el-icon-edit"}),e._v("编辑 ")]),i("el-dropdown-item",{staticClass:"danger",nativeOn:{click:function(i){return e.handleDeleteGroupClick(n)}}},[i("i",{staticClass:"el-icon-delete"}),e._v("删除 ")]),i("div",{staticClass:"group-item",attrs:{slot:"reference"},slot:"reference"},[i("i",{class:e.iconClassName(n.icon)})])],1):i("div",{key:"group_"+n.id,staticClass:"group-item",on:{click:function(i){return e.handleGroupItemClick(n)}}},[i("i",{class:e.iconClassName(n.icon)}),i("span",{staticClass:"title"},[e._v(e._s(n.title))])])]})),e.type?i("div",{staticClass:"group-item button-add",on:{click:e.handleAddGroupClick}},[i("i",{staticClass:"el-icon-plus"})]):e._e()],2)},T=[],E=i("4260");const{ipcRenderer:B}=window.require("electron");var I={name:"GroupCard",props:{data:{type:Array,required:!0},type:{type:Boolean}},computed:{},mounted(){},methods:{handleGroupItemClick(e){this.edit||e.href&&(e.hrefType?B.invoke("open-browser",e.href):this.$router.push(e.href))},handleAddGroupClick(){this.$listeners.add&&this.$emit("add")},handleEditGroupClick(e){this.$listeners.edit&&this.$emit("edit",e)},handleDeleteGroupClick(e){this.$listeners.remove&&this.$emit("remove",e)},iconClassName(e){return Object(E["d"])(e)}}},M=I,z=(i("def1"),Object(u["a"])(M,O,T,!1,null,"9aff11d6",null)),G=z.exports,A=function(){var e=this,n=e.$createElement,i=e._self._c||n;return i("dialog-form",{attrs:{"label-width":"5em"}},[i("dialog-form-item",{attrs:{label:"标签名称"}},[i("el-input",{model:{value:e.formData.title,callback:function(n){e.$set(e.formData,"title",n)},expression:"formData.title"}})],1),i("dialog-form-item",{attrs:{label:"图标"}},[i("el-select",{staticClass:"select-palace",attrs:{"popper-class":"palace-popper"},scopedSlots:e._u([{key:"prefix",fn:function(){return[i("i",{class:["input-icon",e.iconClassName(e.formData.icon)]})]},proxy:!0}]),model:{value:e.formData.icon,callback:function(n){e.$set(e.formData,"icon",n)},expression:"formData.icon"}},e._l(e.options.icon,(function(n){return i("el-option-group",{key:n.name,attrs:{label:n.name}},e._l(n.children,(function(n,o){return i("el-option",{key:o,attrs:{value:n.icon,label:n.name}},[i("i",{class:["icon",e.iconClassName(n.icon)]})])})),1)})),1)],1),i("dialog-form-item",{attrs:{label:"连接"},scopedSlots:e._u([{key:"tool",fn:function(){return[i("el-radio-group",{model:{value:e.formData.hrefType,callback:function(n){e.$set(e.formData,"hrefType",n)},expression:"formData.hrefType"}},[i("el-radio",{attrs:{label:0}},[e._v("站内")]),i("el-radio",{attrs:{label:1}},[e._v("站外")])],1)]},proxy:!0}])},[0===e.formData.hrefType?i("el-select",{model:{value:e.formData.href,callback:function(n){e.$set(e.formData,"href",n)},expression:"formData.href"}},e._l(e.options.menu,(function(e){return i("el-option",{key:e.id,attrs:{value:e.href,label:e.title,disabled:e.disabled}})})),1):i("el-input",{model:{value:e.formData.href,callback:function(n){e.$set(e.formData,"href",n)},expression:"formData.href"}})],1),e.protocol?i("dialog-form-item",{attrs:{label:"协议"}},[i("el-button",{on:{click:e.handleHttpsClick}},[e._v("https")]),i("el-button",{on:{click:e.handleHttpClick}},[e._v("http")])],1):e._e(),i("dialog-form-item",{attrs:{type:"button"}},[i("el-button",{on:{click:e.handleCancelClick}},[e._v("取消")]),i("el-button",{attrs:{type:"primary"},on:{click:e.handleSubmitClick}},[e._v("提交")])],1)],1)},F=[],L=i("2ef0"),W=i.n(L),H=function(){var e=this,n=e.$createElement,i=e._self._c||n;return i("div",{staticClass:"dialog-form"},[e._t("default")],2)},N=[],P={name:"DialogForm",props:{labelWidth:String},provide(){return{dialogForm:this}}},Q=P,Z=Object(u["a"])(Q,H,N,!1,null,"1d1353fc",null),J=Z.exports,R=function(){var e=this,n=e.$createElement,i=e._self._c||n;return i("div",{staticClass:"dialog-form-item"},[i("div",{staticClass:"label",style:e.labelStyle},[e._t("label",(function(){return[e._v(e._s(e.label))]}))],2),i("div",{class:["center",{"button-tool":"button"==e.type}]},[e._t("default")],2),e.$slots.tool?i("div",{staticClass:"tool"},[e._t("tool")],2):e._e()])},V=[],K={name:"DialogFormItem",props:{label:String,labelWidth:String,type:String},provide(){return{elFormItem:this}},inject:["dialogForm"],computed:{labelStyle(){const e={};return(this.labelWidth||this.dialogForm.labelWidth)&&(e.width=this.labelWidth||this.dialogForm.labelWidth),e}},mounted(){}},U=K,X=(i("d0ce"),Object(u["a"])(U,R,V,!1,null,"4489237c",null)),Y=X.exports,ee=i("5566");const ne=/^(?:https?:\/\/)?[a-zA-Z0-9][-a-zA-Z0-9]{0,62}(?:\.[a-zA-Z0-9][-a-zA-Z0-9]{0,62})+$/;var ie=i("9163"),oe={name:"ShortcutMenuDialog",components:{DialogForm:J,DialogFormItem:Y},props:{formData:{type:Object,required:!0}},data(){return{options:{menu:[],icon:[]},station:{inside:"",outside:""},protocol:!1}},computed:{...Object(r["b"])({shortcutMenuList:d["t"]})},created(){this.options.icon=ie["b"],this.formData.icon||(this.formData.icon=ie["a"]),this.resetMenuList()},watch:{"formData.hrefType"(e,n){0==n?(this.station.inside=this.formData.href,this.formData.href=this.station.outside):1==n&&(this.station.outside=this.formData.href,this.formData.href=this.station.inside)},"formData.href":{handler(e){1==this.formData.hrefType&&(ne.test(e)?this.protocol=!/^https?:\/\//.test(e):0==e.length&&(this.protocol=!1))},immediate:!0}},methods:{handleCancelClick(){this.$listeners.cancel&&this.$emit("cancel")},handleSubmitClick(){this.$listeners.submit&&this.$emit("submit")},handleHttpsClick(){this.formData.href="https://"+this.formData.href},handleHttpClick(){this.formData.href="http://"+this.formData.href},resetMenuList(){const e=["home","setting","about"],n=W.a.filter(ee["b"],n=>!e.includes(n.id)),i=W.a.map(this.shortcutMenuList,e=>e.href),o=W.a.map(n,e=>(e.disabled=i.includes(e.href),e));this.options.menu=W.a.orderBy(o,"disabled","asc")},iconClassName(e){return Object(E["d"])(e)}}},ae=oe,te=(i("927d"),Object(u["a"])(ae,A,F,!1,null,"1896bb51",null)),ce=te.exports,le={name:"Home",components:{Page:t["a"],Logo:c["a"],DialogBox:f,SearchEngineDrawer:q,SearchBar:D,GroupCard:G,ShortcutMenuDialog:ce},data(){return{datetime:"",times:{datetime:null},edit:!1,dialog:{display:!1,type:"",data:{}},search:{display:!1,query:""}}},computed:{...Object(r["b"])({shortcutMenuList:d["t"]})},mounted(){this.getDateTime(),Object(d["db"])()},methods:{getDateTime(){this.datetime=Object(E["c"])(new Date),this.times.datetime&&clearTimeout(this.times.datetime),this.times.datetime=setTimeout(this.getDateTime,1e3)},addShortcutMenu(){Object(d["A"])(this.dialog.data,({code:e,msg:n})=>{200==e?(Object(E["g"])(n),Object(d["db"])(),this.dialog.display=!1):Object(E["h"])(n)})},updShortcutMenu(){const e=this.dialog.data;"show"in e&&delete e.show,Object(d["hb"])(e,({code:e,msg:n})=>{200==e?(Object(E["g"])(n),Object(d["db"])(),this.dialog.display=!1):Object(E["h"])(n)})},delShortcutMenu(e){const n=this.dialog.data;"show"in n&&delete n.show,Object(d["F"])(e,({code:e})=>{200==e?(Object(E["g"])("删除成功"),Object(d["db"])()):Object(E["h"])("删除失败")})},handleIconTypeClick(){this.edit=!this.edit},handleSearchQueryClick(e){this.search.display=!0,this.search.query=e},handleAddGroupClick(){this.setDialogData(),this.dialog.display=!0,this.dialog.type="A"},handleEditGroupClick(e){0!==e.operate&&(e.show&&(e.show=!1),this.setDialogData(e),this.dialog.display=!0,this.dialog.type="E")},handleDeleteGroupClick(e){0!==e.operate&&Object(E["f"])(`“${e.title}”是否确认删除？`).then(()=>{this.delShortcutMenu(e.id)}).catch(()=>{})},handleSMCancel(){this.dialog.display=!1},handleSMSubmit(){this.verifyShortcutMenuFormData()||("A"==this.dialog.type?this.addShortcutMenu():"E"==this.dialog.type&&this.updShortcutMenu())},readFile(e){let n=null,i="file"===document.location.protocol?0:200;return n=new XMLHttpRequest,n.open("GET",e,!1),n.overrideMimeType("text/html;charset=utf-8"),n.send(null),n.status===i?n.responseText:null},setDialogData(e={}){const n={};e.id&&(n.id=e.id),n.title=e.title||"",n.icon=e.icon||"",n.operate=0===e.operate||1===e.operate?e.operate:1,n.href=e.href||"",n.hrefType=0===e.hrefType||1===e.hrefType?e.hrefType:0,this.dialog.data=n},verifyShortcutMenuFormData(){const{title:e,href:n,hrefType:i}=this.dialog.data;return e?n?!(!i||/^https?:\/\//.test(n))&&(Object(E["h"])("请选择对应的协议"),!0):i?(Object(E["h"])("请输入连接"),!0):(Object(E["h"])("请选择连接"),!0):(Object(E["h"])("请输入标签名"),!0)},iconClassName(e){return Object(E["d"])(e)}}},se=le,re=(i("a439"),Object(u["a"])(se,o,a,!1,null,"e9557dda",null));n["default"]=re.exports},d633:function(e,n,i){"use strict";i("c173")},def1:function(e,n,i){"use strict";i("c3bf")},eeb9:function(e,n,i){},f95a:function(e,n,i){}}]);