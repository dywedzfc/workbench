(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-fbb3e874"],{"204d":function(e,t,s){"use strict";s("9abc")},"873a":function(e,t,s){},"90cb":function(e,t,s){"use strict";s("f31f")},"9abc":function(e,t,s){},c041:function(e,t,s){"use strict";s("873a")},d72f:function(e,t,s){"use strict";s.r(t);var a=function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("page",{attrs:{title:"添加项目详情"},on:{back:e.handlePageBack}},[s("div",{staticClass:"template-wrapper"},[s("el-form",{staticClass:"panel-form",attrs:{inline:"","label-width":"90px"}},[s("el-form-item",{attrs:{label:"项目名称"}},[s("div",{staticClass:"input-box input-inline_medium"},[e._v(e._s(e.form.title))])]),s("el-form-item",{attrs:{label:"项目简称"}},[s("div",{staticClass:"input-box input-inline_mini"},[e._v(e._s(e.form.abbreviation))])]),s("el-form-item",{attrs:{label:"文件名称"}},[s("div",{staticClass:"input-box input-inline"},[e._v(e._s(e.form.fileName))])]),s("el-form-item",{attrs:{label:"项目类型"}},[s("div",{staticClass:"input-box input-inline"},[e._v(e._s(e.form.type))])]),s("el-form-item",[s("path-label",{attrs:{slot:"label",title:"服务器地址",memo:e.form.serverAddressMemo},slot:"label"}),s("path-box",{staticClass:"input-block",attrs:{url:e.form.serverAddress,memo:e.form.serverAddressMemo,"move-click":""},on:{"command-click":e.handleServerAddressCommandClick}})],1),s("el-form-item",[s("path-label",{attrs:{slot:"label",title:"本地地址",memo:e.form.localAddressMemo},slot:"label"}),s("path-box",{staticClass:"input-block",attrs:{url:e.form.localAddress,memo:e.form.localAddressMemo}})],1),s("el-form-item",[s("path-label",{attrs:{slot:"label",title:"SVN地址",memo:e.form.svnAddressMemo},slot:"label"}),s("path-box",{staticClass:"input-block",attrs:{url:e.form.svnAddress,memo:e.form.svnAddressMemo,"move-click":""},on:{"command-click":e.handleSvnAddressCommandClick}})],1),s("el-form-item",{attrs:{label:"API地址"}},[s("path-label",{attrs:{slot:"label",title:"API地址",memo:e.form.apiAddressMemo},slot:"label"}),s("path-box",{staticClass:"input-block",attrs:{url:e.form.apiAddress,memo:e.form.apiAddressMemo,"move-click":""},on:{"command-click":e.handleApiAddressCommandClick}})],1),s("el-form-item",{attrs:{label:"备注"}},[s("div",{staticClass:"input-box input-block"},[e._v(e._s(e.form.remark))])])],1)],1)])},o=[],i=(s("d9e2"),s("2ef0")),l=s.n(i),r=s("2f62"),m=s("7651"),n=function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("div",{staticClass:"path-box__label"},[s("span",[e._v(e._s(e.title))]),e.memo?s("span",{staticClass:"path-box-label"},[e._v("说明")]):e._e()])},c=[],d={name:"PathLabel",props:{title:String,memo:String}},h=d,b=(s("c041"),s("2877")),u=Object(b["a"])(h,n,c,!1,null,"71d64074",null),p=u.exports,f=function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("div",{staticClass:"path-box__content"},[s("div",{staticClass:"path-box-item",class:{"path-box-url":e.memo,move:e.mouse.move},on:{click:e.handlePathClick,mousemove:e.handlePathMousemove,mouseleave:e.handlePathMouseleave}},[s("span",[e._v(e._s(e.url))])]),e.memo?s("div",{staticClass:"path-box-item path-box-textarea"},[e._v(e._s(e.memo))]):e._e()])},v=[],k=s("12db"),j={name:"PathBox",props:{url:String,memo:{type:String,default:""},moveClick:{type:Boolean,default:!1}},data(){return{mouse:{move:!1}}},computed:{...Object(r["b"])({hotkeys:k["g"]})},mounted(){},methods:{handlePathClick(){this.moveClick&&"Command"==this.hotkeys&&this.$listeners["command-click"]?this.$emit("command-click",this.url):this.$listeners["click"]&&this.$emit("click")},handlePathMousemove(){this.moveClick&&("Command"==this.hotkeys?this.mouse.move=!0:this.mouse.move=!1)},handlePathMouseleave(){this.moveClick&&this.mouse.move&&(this.mouse.move=!1)}}},C=j,_=(s("90cb"),Object(b["a"])(C,f,v,!1,null,"6648a78e",null)),A=_.exports,P=s("4260");const{ipcRenderer:x}=window.require("electron");var O={name:"ProjectEdit",components:{Page:m["a"],PathLabel:p,PathBox:A},data(){return{update:!1,type:"",oldFileName:"",form:{title:"",abbreviation:"",fileName:"",remotelyAddress:"",localAddress:"",svnAddress:"",apiAddress:"",remark:""}}},computed:{...Object(r["b"])({projectList:k["l"],projectItem:k["n"]})},watch:{projectItem:{handler(e){"id"in e||this.$router.push({name:"项目列表"}),this.form=e},deep:!0,immediate:!0}},mounted(){this.projectItem.fileName?(this.type="upd",this.oldFileName=this.projectItem.fileName):this.type="add"},methods:{requestSubmitProject(){Object(k["gb"])(this.form,({code:e,msg:t})=>{200==e?(Object(P["g"])(t),Object(k["J"])(),this.update=!0,this.oldFileName=this.form.fileName):Object(P["h"])(t)})},handlePageBack(){this.update||Object(k["J"])(),this.$router.push({name:"项目列表"})},handleSubmitClick(){if(this.verificationProjectForm())return;const{title:e}=this.form,t=l.a.filter(this.projectList,t=>t.title==e).length;t>1?Object(P["f"])("项目名称已重复，是否修改？").then(this.hasRepeatFolder).catch(()=>{}):this.hasRepeatFolder()},handleServerAddressCommandClick(e){Object(P["k"])(e)&&x.send("open-browser",Object(P["j"])(e))},handleSvnAddressCommandClick(e){Object(P["k"])(e)&&x.send("open-browser",Object(P["j"])(e))},handleApiAddressCommandClick(e){Object(P["k"])(e)&&x.send("open-browser",Object(P["j"])(e))},verificationProjectForm(){const{title:e,fileName:t}=this.form;if(!e)return Object(P["h"])("请输入项目名称"),!0;if(!t)return Object(P["h"])("请输入文件名称"),!0;const s=l.a.filter(this.projectList,e=>e.fileName==t).length;return s>1&&(Object(P["h"])("文件名已重复，无法添加！"),!0)},hasRepeatFolder(){const{fileName:e}=this.form;x.invoke("has-repeat-folder",{fileName:e}).then(async t=>{"add"==this.type&&300==t.code?this.requestSubmitProject():"upd"==this.type?this.oldFileName!=e?300==t.code?this.resetFileName():301==t.code&&Object(P["h"])("文件夹已存在，无法修改！"):this.requestSubmitProject():"add"==this.type?Object(P["h"])("文件夹已存在，无法添加！"):Object(P["h"])("文件夹已存在，无法修改！")})},async resetFileName(){try{const e={oldPath:this.oldFileName,newPath:this.form.fileName},{code:t}=await x.invoke("rename",e);if(400==t)throw new Error("替换失败");this.requestSubmitProject()}catch(e){console.error(e)}}}},w=O,N=(s("204d"),Object(b["a"])(w,a,o,!1,null,"8f7842b6",null));t["default"]=N.exports},f31f:function(e,t,s){}}]);