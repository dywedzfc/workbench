(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-f78bd2f4"],{"354d":function(t){t.exports=JSON.parse('{"code":{"baseCode":[{"type":"html","data":"<t-container class=\\"my-container\\">"},{"type":"html","data":"  <t-header class=\\"my-header\\">Header</t-header>"},{"type":"html","data":"  <t-body class=\\"my-body\\">Body</t-body>"},{"type":"html","data":"</t-container>"},{"type":"html","data":"<t-container class=\\"my-container\\">"},{"type":"html","data":"  <t-header class=\\"my-header\\">Header</t-header>"},{"type":"html","data":"  <t-body class=\\"my-body\\">Body</t-body>"},{"type":"html","data":"  <t-footer class=\\"my-footer\\">Footer</t-footer>"},{"type":"html","data":"</t-container>"},{"type":"html","data":"<t-container class=\\"my-container\\">"},{"type":"html","data":"  <t-header class=\\"my-header\\">Header</t-header>"},{"type":"html","data":"  <t-container class=\\"my-container\\">"},{"type":"html","data":"    <t-aside class=\\"my-aside\\">Aside</t-aside>"},{"type":"html","data":"    <t-body class=\\"my-body\\">Body</t-body>"},{"type":"html","data":"  </t-container>"},{"type":"html","data":"  <t-footer class=\\"my-footer\\">Footer</t-footer>"},{"type":"html","data":"</t-container>"},{"type":"html","data":"<t-container class=\\"my-container\\">"},{"type":"html","data":"  <t-aside class=\\"my-aside\\">Aside</t-aside>"},{"type":"html","data":"  <t-body class=\\"my-body\\">"},{"type":"html","data":"    <t-container class=\\"my-container\\">"},{"type":"html","data":"      <t-header class=\\"my-header\\">Header</t-header>"},{"type":"html","data":"      <t-body class=\\"my-body\\">Body</t-body>"},{"type":"html","data":"      <t-footer class=\\"my-footer\\">Footer</t-footer>"},{"type":"html","data":"    </t-container>"},{"type":"html","data":"  </t-body>"},{"type":"html","data":"</t-container>"},{"type":"html","data":""},{"type":"html","data":""},{"type":"html","data":"<style lang=\\"scss\\" scoped>"},{"type":"css","data":".my-container {"},{"type":"css","data":"  height: 240px;"},{"type":"css","data":"  margin-bottom: 20px;"},{"type":"css","data":"  border: 1px solid #eeeeee;"},{"type":"css","data":"  border-radius: 5px;     "},{"type":"css","data":""},{"type":"css","data":"  &:last-child {"},{"type":"css","data":"    margin-bottom: 0;"},{"type":"css","data":"  }"},{"type":"css","data":""},{"type":"css","data":"  .my-container {"},{"type":"css","data":"    margin-bottom: 0;"},{"type":"css","data":"    border: none;"},{"type":"css","data":"    border-radius: 0;"},{"type":"css","data":"  }"},{"type":"css","data":"}"},{"type":"css","data":""},{"type":"css","data":".my-header,"},{"type":"css","data":".my-footer {"},{"type":"css","data":"  background-color: #b3c0d1;"},{"type":"css","data":"}"},{"type":"css","data":".my-aside {"},{"type":"css","data":"  text-align: center;"},{"type":"css","data":"  background-color: #d3dce6;"},{"type":"css","data":""},{"type":"css","data":"  &:first-child {"},{"type":"css","data":"    border-top-left-radius: inherit;"},{"type":"css","data":"    border-bottom-left-radius: inherit;"},{"type":"css","data":"  }"},{"type":"css","data":"  &:last-child {"},{"type":"css","data":"    border-top-right-radius: inherit;"},{"type":"css","data":"    border-bottom-right-radius: inherit;"},{"type":"css","data":"  }"},{"type":"css","data":""},{"type":"css","data":"  ~ .my-body {"},{"type":"css","data":"    &:last-child {"},{"type":"css","data":"      border-top-right-radius: inherit;"},{"type":"css","data":"      border-bottom-right-radius: inherit;"},{"type":"css","data":"    }"},{"type":"css","data":"  }"},{"type":"css","data":"}"},{"type":"css","data":".my-body {"},{"type":"css","data":"  width: 100%;"},{"type":"css","data":"  background-color: #e9eef3;"},{"type":"css","data":""},{"type":"css","data":"  > .my-container {"},{"type":"css","data":"    border-top-right-radius: inherit;"},{"type":"css","data":"    border-bottom-right-radius: inherit;"},{"type":"css","data":"  }"},{"type":"css","data":"}"},{"type":"css","data":".my-footer {"},{"type":"css","data":"  line-height: 60px;"},{"type":"css","data":"}"},{"type":"css","data":".my-header,"},{"type":"css","data":".my-aside::v-deep .t-aside-wrapper,"},{"type":"css","data":".my-body,"},{"type":"css","data":".my-footer::v-deep .t-footer-wrapper {"},{"type":"css","data":"  display: flex;"},{"type":"css","data":"  justify-content: center;"},{"type":"css","data":"  align-items: center;"},{"type":"css","data":"  color: #333333;"},{"type":"css","data":"}"},{"type":"css","data":".my-header,"},{"type":"css","data":".my-body,"},{"type":"css","data":".my-footer {"},{"type":"css","data":"  &:first-child {"},{"type":"css","data":"    border-top-left-radius: inherit;"},{"type":"css","data":"    border-top-right-radius: inherit;"},{"type":"css","data":"  }"},{"type":"css","data":"  &:last-child {"},{"type":"css","data":"    border-bottom-left-radius: inherit;"},{"type":"css","data":"    border-bottom-right-radius: inherit;"},{"type":"css","data":"  }"},{"type":"css","data":"}"},{"type":"html","data":"</style>"}],"showCode":[{"type":"html","data":"<t-container class=\\"my-container\\">"},{"type":"html","data":"  <t-header class=\\"my-header\\">Header</t-header>"},{"type":"html","data":"  <t-container class=\\"my-container\\">"},{"type":"html","data":"    <t-aside class=\\"my-aside\\" control-strip>Aside</t-aside>"},{"type":"html","data":"    <t-body class=\\"my-body\\">Body</t-body>"},{"type":"html","data":"    <t-aside class=\\"my-aside\\" control-strip control-type=\\"move\\">Aside</t-aside>"},{"type":"html","data":"  </t-container>"},{"type":"html","data":"  <t-footer class=\\"my-footer\\" control-strip>Footer</t-footer>"},{"type":"html","data":"</t-container>"}]},"attributes":[{"parameter":"direction","directions":"子元素的排列方向","type":"String","optional":"horizontal / vertical","default":"子元素中有 t-container-header 或 t-container-footer 时为 vertical，否则为 horizontal"},{"parameter":"border","directions":"是否显示边框","type":"Boolean","optional":"—","default":"false","keyPoint":true}],"headerAttributes":[{"parameter":"height","directions":"顶栏高度","type":"String","optional":"—","default":"60px"},{"parameter":"border","directions":"是否显示边框","type":"Boolean","optional":"—","default":"false","keyPoint":true}],"asideAttributes":[{"parameter":"width","directions":"侧边栏宽度","type":"String","optional":"—","default":"300px"},{"parameter":"border","directions":"是否显示边框","type":"Boolean","optional":"—","default":"false","keyPoint":true},{"parameter":"control-strip","directions":"是否使用控制条","type":"Boolean","optional":"—","default":"false","keyPoint":true},{"parameter":"control-type","directions":"控制条使用的类型","type":"String","optional":"click / move","default":"click","keyPoint":true}],"foolerAttributes":[{"parameter":"height","directions":"底栏高度","type":"String","optional":"—","default":"60px"},{"parameter":"min-height","directions":"底栏最小高度","type":"String","optional":"—","default":"50px","keyPoint":true},{"parameter":"border","directions":"是否显示边框","type":"Boolean","optional":"—","default":"false","keyPoint":true},{"parameter":"control-strip","directions":"是否使用控制条","type":"Boolean","optional":"—","default":"false","keyPoint":true}]}')},"414f":function(t,e,a){},5920:function(t,e,a){"use strict";a("f4a4")},"66dd":function(t,e,a){"use strict";var s=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"page-navigation"},[t._t("default"),t.display?a("page-navigation-item",{staticClass:"page-return-top",attrs:{target:t.returnTop}},[[a("i",{staticClass:"el-icon-top"})],[t._v(t._s("返回顶部"))]],2):t._e()],2)},r=[],o=a("d4ec"),i=a("bee2"),n=a("262e"),c=a("2caf"),d=a("9ab4"),l=a("60a3"),y=a("e84c"),p=function(t){Object(n["a"])(a,t);var e=Object(c["a"])(a);function a(){var t;return Object(o["a"])(this,a),t=e.apply(this,arguments),t.display=!1,t}return Object(i["a"])(a,[{key:"returnTop",get:function(){return this.target?this.target:"returnTop"}},{key:"mounted",value:function(){var t=this;this.$nextTick((function(){window.addEventListener("scroll",t.handleScroll)}))}},{key:"destroyed",value:function(){window.removeEventListener("scroll",this.handleScroll)}},{key:"handleScroll",value:function(){window.scrollY>=300?this.display=!0:this.display=!1}},{key:"handleReturnTopClick",value:function(){window.scrollTo(0,0)}}]),a}(l["c"]);Object(d["a"])([Object(l["b"])({type:String})],p.prototype,"target",void 0),p=Object(d["a"])([Object(l["a"])({components:{PageNavigationItem:y["a"]}})],p);var u=p,h=u,m=(a("5920"),a("2877")),b=Object(m["a"])(h,s,r,!1,null,"2e0e5d22",null);e["a"]=b.exports},"680e":function(t,e,a){"use strict";var s=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("span",{class:[t.codeClassName],domProps:{innerHTML:t._s(t.codeType)}})},r=[],o=a("d4ec"),i=a("bee2"),n=a("262e"),c=a("2caf"),d=a("9ab4"),l=a("60a3"),y=a("2e62"),p=function(t){Object(n["a"])(a,t);var e=Object(c["a"])(a);function a(){return Object(o["a"])(this,a),e.apply(this,arguments)}return Object(i["a"])(a,[{key:"codeType",get:function(){return Object(y["c"])(this.type||"",this.code)}},{key:"codeClassName",get:function(){return Object(y["b"])(this.type||"")}}]),a}(l["c"]);Object(d["a"])([Object(l["b"])({type:String})],p.prototype,"type",void 0),Object(d["a"])([Object(l["b"])({type:String,required:!0})],p.prototype,"code",void 0),p=Object(d["a"])([l["a"]],p);var u=p,h=u,m=a("2877"),b=Object(m["a"])(h,s,r,!1,null,null,null);e["a"]=b.exports},"73bd":function(t,e,a){"use strict";a("414f")},8327:function(t,e,a){},"89f2":function(t,e,a){"use strict";var s=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"demo-block",class:[t.blockClass,{hover:t.hovering}],on:{mouseenter:function(e){t.hovering=!0},mouseleave:function(e){t.hovering=!1}}},[a("div",{staticClass:"source"},[t._t("source")],2),a("div",{ref:"meta",staticClass:"meta",style:{"max-height":t.maxHeight}},[t.$slots.default?a("div",{staticClass:"description code-panel"},[t._t("default")],2):t._e(),a("div",{ref:"code-panel",staticClass:"highlight code-panel"},[t._t("highlight")],2)]),a("transition",{attrs:{name:"control"}},[t.fixedControl?a("div",{ref:"control-hidden",staticClass:"demo-block-control is-fixed",on:{click:function(e){t.isExpanded=!t.isExpanded}}},[a("i",{class:[t.iconClass,{hovering:t.hovering}]}),a("transition",{attrs:{name:"text-slide"}},[a("span",{directives:[{name:"show",rawName:"v-show",value:t.hovering,expression:"hovering"}]},[t._v(t._s(t.controlText))])])],1):t._e()]),a("div",{ref:"control",staticClass:"demo-block-control",on:{click:function(e){t.isExpanded=!t.isExpanded}}},[a("i",{class:[t.iconClass,{hovering:t.hovering}]}),a("transition",{attrs:{name:"text-slide"}},[a("span",{directives:[{name:"show",rawName:"v-show",value:t.hovering,expression:"hovering"}]},[t._v(t._s(t.controlText))])])],1)],1)},r=[],o=a("d4ec"),i=a("bee2"),n=a("262e"),c=a("2caf"),d=a("9ab4"),l=a("60a3"),y=function(t){Object(n["a"])(a,t);var e=Object(c["a"])(a);function a(){var t;return Object(o["a"])(this,a),t=e.apply(this,arguments),t.codePan={script:"",html:"",style:""},t.maxHeight=0,t.hovering=!1,t.isExpanded=!1,t.fixedControl=!1,t}return Object(i["a"])(a,[{key:"blockClass",get:function(){return""}},{key:"iconClass",get:function(){return this.isExpanded?"el-icon-caret-top":"el-icon-caret-bottom"}},{key:"controlText",get:function(){return this.isExpanded?"隐藏代码":"显示代码"}},{key:"watchIsExpanded",value:function(t){var e=this,a=this.$refs["code-panel"];t?(this.maxHeight="".concat(a.offsetHeight,"px"),setTimeout((function(){var t=e.isInViewPortOfMeta();e.fixedControl=t&&!e.isInViewPortOfControl()}),500)):(this.maxHeight=0,this.fixedControl=!1)}},{key:"mounted",value:function(){var t=this;this.$nextTick((function(){document.addEventListener("scroll",(function(){if(t.isExpanded){var e=t.isInViewPortOfMeta();t.fixedControl=e&&!t.isInViewPortOfControl()}}))}))}},{key:"isInViewPortOfControl",value:function(){return this.elementOffsetTop(this.$refs.control)+88<=this.viewPortHeight()}},{key:"isInViewPortOfMeta",value:function(){return this.elementOffsetTop(this.$refs.meta)+88<=this.viewPortHeight()}},{key:"viewPortHeight",value:function(){var t=document,e=t.documentElement,a=t.body;return window.innerHeight||e.clientHeight||a.clientHeight}},{key:"elementOffsetTop",value:function(t){var e=t.offsetTop,a=document.documentElement.scrollTop;return e-a}}]),a}(l["c"]);Object(d["a"])([Object(l["b"])({type:String})],y.prototype,"msg",void 0),Object(d["a"])([Object(l["d"])("isExpanded")],y.prototype,"watchIsExpanded",null),y=Object(d["a"])([l["a"]],y);var p=y,u=p,h=(a("a095"),a("2877")),m=Object(h["a"])(u,s,r,!1,null,null,null);e["a"]=m.exports},"972f":function(t,e,a){"use strict";var s=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("table",{staticClass:"table-props"},[t._m(0),a("tbody",t._l(t.data,(function(e,s){return a("tr",{key:s},[a("td",{staticClass:"parameter"},[t._v(" "+t._s(e.parameter)+" "),e.keyPoint?a("span",{staticClass:"key-point"},[t._v("*")]):t._e()]),a("td",{staticClass:"directions"},[t._v(t._s(e.directions))]),a("td",{staticClass:"type"},[t._v(t._s(e.type))]),a("td",{staticClass:"optional"},[t._v(t._s(e.optional))]),a("td",{staticClass:"default"},[t._v(t._s(e.default))])])})),0)])},r=[function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("thead",[a("tr",[a("th",[t._v("参数")]),a("th",[t._v("说明")]),a("th",[t._v("类型")]),a("th",[t._v("可选值")]),a("th",[t._v("默认值")])])])}],o=a("d4ec"),i=a("262e"),n=a("2caf"),c=a("9ab4"),d=a("60a3"),l=function(t){Object(i["a"])(a,t);var e=Object(n["a"])(a);function a(){return Object(o["a"])(this,a),e.apply(this,arguments)}return a}(d["c"]);Object(c["a"])([Object(d["b"])({type:Array})],l.prototype,"data",void 0),l=Object(c["a"])([d["a"]],l);var y=l,p=y,u=a("2877"),h=Object(u["a"])(p,s,r,!1,null,null,null);e["a"]=h.exports},a095:function(t,e,a){"use strict";a("8327")},ddd5:function(t,e,a){"use strict";a.r(e);var s=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"page-container"},[a("h2",{attrs:{id:"header"}},[t._v("Container 布局容器")]),a("p",[t._v("用于布局的容器组件，方便快速搭建页面的基本结构：")]),t._m(0),t._m(1),t._m(2),t._m(3),t._m(4),t._m(5),a("page-navigation",{attrs:{target:"header"}},[a("page-navigation-item",{attrs:{target:"base-code"}},[t._v("常见页面布局")]),a("page-navigation-item",{attrs:{target:"show-code"}},[t._v("展示、隐藏与拖拽")]),a("page-navigation-item",{attrs:{target:"container-attributes",text:"Container Attributes"}}),a("page-navigation-item",{attrs:{target:"header-attributes",text:"Header Attributes"}}),a("page-navigation-item",{attrs:{target:"aside-attributes",text:"Aside Attributes"}}),a("page-navigation-item",{attrs:{target:"footer-attributes",text:"Footer Attributes"}})],1),a("h3",{attrs:{id:"base-code"}},[t._v("常见页面布局")]),a("demo-block",{scopedSlots:t._u([{key:"source",fn:function(){return[a("t-container",{staticClass:"my-container"},[a("t-header",{staticClass:"my-header"},[t._v("Header")]),a("t-body",{staticClass:"my-body"},[t._v("Body")])],1),a("t-container",{staticClass:"my-container"},[a("t-header",{staticClass:"my-header"},[t._v("Header")]),a("t-body",{staticClass:"my-body"},[t._v("Body")]),a("t-footer",{staticClass:"my-footer"},[t._v("Footer")])],1),a("t-container",{staticClass:"my-container"},[a("t-header",{staticClass:"my-header"},[t._v("Header")]),a("t-container",{staticClass:"my-container"},[a("t-aside",{staticClass:"my-aside"},[t._v("Aside")]),a("t-body",{staticClass:"my-body"},[t._v("Body")])],1),a("t-footer",{staticClass:"my-footer"},[t._v("Footer")])],1),a("t-container",{staticClass:"my-container"},[a("t-aside",{staticClass:"my-aside"},[t._v("Aside")]),a("t-body",{staticClass:"my-body"},[a("t-container",{staticClass:"my-container"},[a("t-header",{staticClass:"my-header"},[t._v("Header")]),a("t-body",{staticClass:"my-body"},[t._v("Body")]),a("t-footer",{staticClass:"my-footer"},[t._v("Footer")])],1)],1)],1)]},proxy:!0},{key:"highlight",fn:function(){return[a("pre",[a("code",t._l(t.baseCode,(function(t,e){return a("code-line",{key:e,attrs:{type:t.type,code:t.data}})})),1)])]},proxy:!0}])}),a("h3",{attrs:{id:"show-code"}},[t._v("展示、隐藏与拖拽")]),a("demo-block",{scopedSlots:t._u([{key:"source",fn:function(){return[a("t-container",{staticClass:"my-container"},[a("t-header",{staticClass:"my-header"},[t._v("Header")]),a("t-container",{staticClass:"my-container"},[a("t-aside",{staticClass:"my-aside",attrs:{"control-strip":""}},[t._v("Aside")]),a("t-body",{staticClass:"my-body"},[t._v("Body")]),a("t-aside",{staticClass:"my-aside",attrs:{"control-strip":"","control-type":"move"}},[t._v("Aside")])],1),a("t-footer",{staticClass:"my-footer",attrs:{"control-strip":""}},[t._v("Footer")])],1)]},proxy:!0},{key:"highlight",fn:function(){return[a("pre",[a("code",t._l(t.showCode,(function(t,e){return a("code-line",{key:e,attrs:{type:t.type,code:t.data}})})),1)])]},proxy:!0}])}),a("h3",{attrs:{id:"container-attributes"}},[t._v("Container Attributes")]),a("table-props",{attrs:{data:t.tableAttributes}}),a("h3",{attrs:{id:"header-attributes"}},[t._v("Header Attributes")]),a("table-props",{attrs:{data:t.tableHeaderAttributes}}),a("h3",{attrs:{id:"aside-attributes"}},[t._v("Aside Attributes")]),a("table-props",{attrs:{data:t.tableAsideAttributes}}),a("h3",{attrs:{id:"footer-attributes"}},[t._v("Footer Attributes")]),a("table-props",{attrs:{data:t.tableFoolerAttributes}}),a("br"),a("br"),a("br")],1)},r=[function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("p",[a("code",[t._v("<t-container>")]),t._v("：外层容器。当子元素中包含 <t-container-header> 或 <t-container-footer> 时，全部子元素会垂直上下排列，否则会水平左右排列。 ")])},function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("p",[a("code",[t._v("<t-header>")]),t._v("：顶栏容器。")])},function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("p",[a("code",[t._v("<t-aside>")]),t._v("：侧边栏容器。")])},function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("p",[a("code",[t._v("<t-body>")]),t._v("：主要区域容器。")])},function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("p",[a("code",[t._v("<t-footer>")]),t._v("：底栏容器。")])},function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"tip"},[a("p",[t._v(" 以上组件采用了 flex 布局，使用前请确定目标浏览器是否兼容。此外， "),a("code",[t._v("<t-container>")]),t._v(" 的子元素只能是后四者，后四者的父元素也只能是 "),a("code",[t._v("<t-container>")]),t._v("。 ")])])}],o=a("d4ec"),i=a("bee2"),n=a("262e"),c=a("2caf"),d=a("9ab4"),l=a("60a3"),y=a("680e"),p=a("89f2"),u=a("972f"),h=a("66dd"),m=a("e84c"),b=function(t){Object(n["a"])(s,t);var e=Object(c["a"])(s);function s(){return Object(o["a"])(this,s),e.apply(this,arguments)}return Object(i["a"])(s,[{key:"baseCode",get:function(){return a("354d").code.baseCode}},{key:"showCode",get:function(){return a("354d").code.showCode}},{key:"tableAttributes",get:function(){return a("354d").attributes}},{key:"tableHeaderAttributes",get:function(){return a("354d").headerAttributes}},{key:"tableAsideAttributes",get:function(){return a("354d").asideAttributes}},{key:"tableFoolerAttributes",get:function(){return a("354d").foolerAttributes}}]),s}(l["c"]);b=Object(d["a"])([Object(l["a"])({components:{CodeLine:y["a"],DemoBlock:p["a"],TableProps:u["a"],PageNavigation:h["a"],PageNavigationItem:m["a"]}})],b);var f=b,v=f,g=(a("73bd"),a("2877")),_=Object(g["a"])(v,s,r,!1,null,"4cd93124",null);e["default"]=_.exports},f4a4:function(t,e,a){}}]);