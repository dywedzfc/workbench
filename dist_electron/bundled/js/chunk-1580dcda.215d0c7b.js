(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-1580dcda"],{"4ca1":function(t,e,a){},"5fcd":function(t,e,a){},6972:function(t,e,a){},a7a3:function(t,e,a){"use strict";a("6972")},ac7e:function(t,e,a){"use strict";a.r(e);var i=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("page",{attrs:{title:"日报",icon:"el-icon-s-home"},on:{back:t.handlePageBack}},[a("panel-query",[a("el-form",{staticClass:"query-form",attrs:{slot:"query-bar",inline:""},slot:"query-bar"},[a("el-form-item",[a("el-input",{attrs:{placeholder:"名称"},model:{value:t.query.name,callback:function(e){t.$set(t.query,"name",e)},expression:"query.name"}})],1),a("el-form-item",[a("picker-month",{model:{value:t.query.month,callback:function(e){t.$set(t.query,"month",e)},expression:"query.month"}})],1),a("el-form-item",[a("el-button",{attrs:{type:"primary"},on:{click:t.handleQueryClick}},[t._v("查询")]),a("el-button",{attrs:{type:"primary"},on:{click:t.handleQueryTodayClick}},[t._v("当月")]),a("el-button",{attrs:{type:"primary"},on:{click:t.handleAddDailyClick}},[t._v("添加日报")])],1)],1),a("card-list",{ref:"card-list",attrs:{width:"600px"}},["add"==t.daily.type?a("card-item",[a("el-form",{staticClass:"form-card",attrs:{"label-width":"80px"}},[a("el-form-item",{attrs:{label:"项目名称"}},[a("el-select",{staticClass:"input-block",attrs:{filterable:""},model:{value:t.daily.add.projectId,callback:function(e){t.$set(t.daily.add,"projectId",e)},expression:"daily.add.projectId"}},t._l(t.projectOptions(),(function(e){return a("el-option-group",{key:e.label,attrs:{label:e.label}},t._l(e.options,(function(t){return a("el-option",{key:t.value,attrs:{value:t.value,label:t.label}})})),1)})),1)],1),a("el-form-item",{attrs:{label:"任务信息"}},[a("div",{staticClass:"task-list"},t._l(t.daily.add.task,(function(e,i){return a("el-input",{key:i,ref:"task_"+i,refInFor:!0,staticClass:"input-block",on:{blur:function(a){return t.handleTaskBlur(a,e.value,i)}},nativeOn:{keydown:function(e){return t.handleTaskKeydown.apply(null,arguments)},keyup:function(a){return t.handleTaskKeyup(a,e.value,i)},paste:function(e){return t.handleTaskPaste(e,i)}},model:{value:e.value,callback:function(a){t.$set(e,"value","string"===typeof a?a.trim():a)},expression:"item.value"}})})),1)]),a("el-form-item",{staticClass:"form-center",attrs:{"label-width":"0"}},[a("el-button",{on:{click:t.handleAddTaskCancelClick}},[t._v("取消")]),a("el-button",{attrs:{type:"primary"},on:{click:t.handleAddTaskSubmitClick}},[t._v("保存")])],1)],1)],1):t._e(),t._l(t.filterDailyList,(function(e){return a("card-item",{key:e.date,attrs:{title:e.date+"（"+t.dateWeek(e.date)+"）"}},t._l(e.data,(function(i){return a("task-box",{key:i.id,attrs:{date:e.date,data:i,query:t.query.name},on:{"title-remove":t.handleTaskTitleRemove,"task-change":t.handleTaskItemRemove}})})),1)}))],2)],1)],1)},s=[],l=a("2ef0"),n=a.n(l),o=a("c1df"),r=a.n(o),d=a("2f62"),c=a("7651"),h=a("7f21"),u=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("el-date-picker",{staticClass:"query-input",attrs:{type:"month","value-format":"yyyy-MM",placeholder:t.placeholder},model:{value:t.data,callback:function(e){t.data=e},expression:"data"}})},k=[],p={name:"PickerYear",props:{value:{type:String,required:!0},placeholder:{type:String,default:"月份"}},data(){return{loading:!1,data:""}},watch:{value:{handler(t){this.data=t||""},immediate:!0},data:{handler(t){this.$listeners["update:value"]&&this.$emit("update:value",t||""),this.$listeners["input"]&&this.$emit("input",t||"")},immediate:!0}}},m=p,y=(a("a7a3"),a("2877")),f=Object(y["a"])(m,u,k,!1,null,"a9f84c66",null),v=f.exports,b=a("0963"),C=a("bfb7"),T=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"task-box"},[a("div",{class:{"task-title":!0,edit:t.title.edit},on:{mouseenter:t.handleTaskTitleMouseenter,mouseleave:t.handleTaskTitleMouseleave}},[this.title.edit?[a("el-select",{ref:"input_task_title",staticClass:"task-input",attrs:{size:"mini",filterable:""},nativeOn:{keyup:function(e){return t.handleTaskSelectKeyup(e)}},model:{value:t.title.value,callback:function(e){t.$set(t.title,"value",e)},expression:"title.value"}},t._l(t.projectOptions,(function(t){return a("el-option",{key:t.value,attrs:{value:t.value,label:t.label}})})),1),a("div",{staticClass:"task-toolbar"},[a("el-button",{staticClass:"button-icon",attrs:{type:"primary",size:"mini",icon:"el-icon-check"},on:{click:t.handleTitleEditSubmitClick}}),a("el-button",{staticClass:"button-icon",attrs:{size:"mini",icon:"el-icon-close"},on:{click:t.handleTitleEditCloseClick}})],1)]:[a("el-button",{class:["button-icon",{"not-button":!t.hasJianName}],attrs:{type:"primary",size:"mini"},on:{click:t.handleTitleNameClick}},[t._v(" "+t._s(t.projectButtonText)+" ")]),a("span",{class:{"title-name":t.hasJianName},on:{click:t.handleTitleNameClick}},[t._l(t.titleHighlight(t.projectTitleName),(function(e,i){var s=e.title,l=e.type;return["text"==l?[t._v(t._s(s))]:t._e(),"mark"==l?a("span",{key:i,staticClass:"highlight"},[t._v(t._s(s))]):t._e()]}))],2),t.title.hover?a("div",{staticClass:"task-toolbar"},[a("el-button",{staticClass:"button-icon",attrs:{type:"primary",icon:"el-icon-edit"},on:{click:t.handleTitleEditClick}}),a("el-popover",{attrs:{placement:"top",width:"160"},model:{value:t.title.remove,callback:function(e){t.$set(t.title,"remove",e)},expression:"title.remove"}},[a("p",[t._v("确定要删除“"+t._s(t.projectName)+"”的任务吗？")]),a("div",{staticStyle:{"text-align":"right",margin:"0"}},[a("el-button",{attrs:{size:"mini",type:"text"},on:{click:t.handleTitleDCloseClick}},[t._v("取消")]),a("el-button",{attrs:{type:"primary",size:"mini"},on:{click:t.handleTitleDSubmitClick}},[t._v("确定")])],1),a("el-button",{staticClass:"button-icon",attrs:{slot:"reference",type:"danger",icon:"el-icon-delete"},slot:"reference"})],1)],1):t._e()]],2),a("div",{staticClass:"task-content"},t._l(t.data.task.split("|:|"),(function(e,i){return a("p",{key:i,staticClass:"task-word",class:{hover:i===t.task.hover,edit:i===t.task.index},on:{mouseenter:function(e){return t.handleTaskItemMouseenter(i)},mouseleave:t.handleTaskItemMouseleave}},[t.task.index!=i||""===t.task.index?[t._l(t.titleHighlight(e),(function(e,i){var s=e.title,l=e.type;return["text"==l?[t._v(t._s(s))]:t._e(),"mark"==l?a("span",{key:i,staticClass:"highlight"},[t._v(t._s(s))]):t._e()]})),i===t.task.hover?a("span",{staticClass:"task-toolbar"},[a("el-button",{staticClass:"button-icon",attrs:{size:"mini",type:"primary",icon:"el-icon-edit"},on:{click:function(a){return t.handleTaskEditClick(e,i)}}}),a("el-popover",{attrs:{placement:"top",width:"160"},model:{value:t.task.remove,callback:function(e){t.$set(t.task,"remove",e)},expression:"task.remove"}},[a("p",[t._v("确定要删除“"+t._s(e)+"”吗？")]),a("div",{staticStyle:{"text-align":"right",margin:"0"}},[a("el-button",{attrs:{size:"mini",type:"text"},on:{click:t.handleTaskDCloseClick}},[t._v("取消")]),a("el-button",{attrs:{type:"primary",size:"mini"},on:{click:function(a){return t.handleTaskDSubmitClick(e)}}},[t._v("确定")])],1),a("el-button",{staticClass:"button-icon",attrs:{slot:"reference",size:"mini",type:"danger",icon:"el-icon-delete"},slot:"reference"})],1)],1):t._e()]:[a("el-input",{ref:"input_"+i,refInFor:!0,staticClass:"task-input",attrs:{size:"mini"},nativeOn:{keyup:function(a){return t.handleTaskInputKeyup(a,e,i)}},model:{value:t.task.value,callback:function(e){t.$set(t.task,"value",e)},expression:"task.value"}}),a("span",{staticClass:"task-toolbar"},[a("el-button",{staticClass:"button-icon",attrs:{type:"primary",size:"mini",icon:"el-icon-check"},on:{click:function(a){return t.handleTaskEditSubmitClick(e,i)}}}),a("el-button",{staticClass:"button-icon",attrs:{size:"mini",icon:"el-icon-close"},on:{click:t.handleTaskEditCloseClick}})],1)]],2)})),0)])},j=[],g=a("12db"),_=a("4260"),I={name:"TaskBox",props:{data:{type:Object,required:!0},date:{type:String,required:!0},query:{type:String,default:""},loading:Boolean},data(){return{title:{hover:!1,value:"",edit:!1,remove:!1,type:!1},task:{hover:"",index:"",value:"",edit:!1,remove:!1}}},computed:{...Object(d["b"])({projectList:g["m"]}),projectName(){const t=n.a.filter(this.projectList,t=>t.value==this.data.projectId);return t.length>0?t[0].label:""},projectInfo(){const t=n.a.filter(this.projectList,t=>t.value==this.data.projectId);return t.length?t[0]:void 0},projectButtonText(){return this.title.type&&!this.projectTitleName&&this.$set(this.title,"type",!1),this.title.type?"简":"全"},projectTitleName(){const t=this.projectInfo;return t?this.title.type?t.title:t.label:""},projectJianName(){const t=this.projectInfo;return t&&t.title?"简："+t.title:""},projectOptions(){return this.projectList},hasJianName(){const t=this.projectInfo;return!!(t&&t.title&&t.title.trim())}},watch:{loading(t){t||(this.title.edit&&this.handleTitleEditCloseClick(),this.task.edit&&this.handleTaskEditCloseClick())},"title.remove"(t){t||(this.title.hover=!1)},"task.remove"(t){t||(this.task.hover="")}},mounted(){Object(g["J"])(),this.title.type=!!this.hasJianName},methods:{handleTaskTitleMouseenter(){this.title.remove||(this.title.hover=!0)},handleTaskTitleMouseleave(){this.title.remove||(this.title.hover=!1)},handleTitleNameClick(){this.hasJianName?this.title.type=!this.title.type:this.title.type=!1},handleTitleEditClick(){this.title.edit=!0,this.title.value=this.data.projectId,this.task.edit&&this.handleTaskEditCloseClick(),this.$nextTick(()=>this.$refs["input_task_title"].focus())},handleTaskSelectKeyup(t){return 13==t.keyCode?this.handleTitleEditSubmitClick():27==t.keyCode?this.handleTitleEditCloseClick():void 0},handleTitleEditSubmitClick(){const t={data:n.a.cloneDeep(this.data)};t.query={date:this.date,projectId:this.data.projectId},t.data.projectId=this.title.value,this.$listeners["task-change"]&&this.$emit("task-change",t,t=>200==t&&this.handleTitleEditCloseClick())},handleTitleEditCloseClick(){this.title.value="",this.title.edit=!1},handleTitleDCloseClick(){this.title.remove=!1},handleTitleDSubmitClick(){const t={date:this.date,projectId:this.data.projectId};this.$listeners["title-remove"]&&this.$emit("title-remove",t),this.title.remove=!1},handleTaskItemMouseenter(t){this.task.remove||(this.task.hover=t)},handleTaskItemMouseleave(){this.task.remove||(this.task.hover="")},handleTaskEditClick(t,e){this.task.index=e,this.task.value=t,this.task.edit=!0,this.title.edit&&this.handleTitleEditCloseClick(),this.$store.commit("hotkey/CLOSE_HOTKEYS"),this.$nextTick(()=>this.$refs["input_"+e][0].focus())},handleTaskInputKeyup(t,e,a){return 13==t.keyCode?this.handleTaskEditSubmitClick(e,a):27==t.keyCode?this.handleTaskEditCloseClick():void 0},handleTaskEditSubmitClick(t,e){const a="|:|",{value:i}=this.task,s=this.data.task.split(a),l={data:n.a.cloneDeep(this.data)};l.data.task=n.a.map(s,(a,s)=>a==t&&s==e?i:a).join(a),l.query={date:this.date,projectId:this.data.projectId},this.$listeners["task-change"]&&this.$emit("task-change",l),this.handleTaskEditCloseClick()},handleTaskEditCloseClick(){this.task.index="",this.task.value="",this.task.edit=!1},handleTaskDCloseClick(){this.task.remove=!1},handleTaskDSubmitClick(t){const e="|:|",a=e=>e&&e!=t;this.data.task=n.a.filter(this.data.task.split(e),a).join(e);const i={data:this.data,query:{date:this.date,projectId:this.data.projectId}};this.$listeners["task-change"]&&this.$emit("task-change",i),this.task.remove=!1},titleHighlight(t){const e=this.query.trim()||"";return Object(_["l"])(t,e)}}},O=I,D=(a("c9ae"),Object(y["a"])(O,T,j,!1,null,"6236c44e",null)),$=D.exports,x=a("9637"),q={name:"Daily",components:{Page:c["a"],PanelQuery:h["a"],PickerMonth:v,CardList:b["a"],CardItem:C["a"],TaskBox:$},data(){return{loading:!1,query:{name:"",month:""},daily:{type:"",add:{projectId:"",task:[]},data:[]}}},computed:{...Object(d["b"])({projectList:g["m"],dailyList:g["d"],dailyIsHistory:g["c"],dailyHistoryTotal:g["b"],dailyHistoryShowNumber:g["a"]}),originalProjectOptions(){return n.a.orderBy(this.projectList,"label","asc")},filterDailyList(){const{name:t}=this.query,e=n.a.filter(this.projectList,({label:e,title:a})=>e.includes(t)||a&&a.includes(t)),a=n.a.map(e,"value"),i=JSON.parse(JSON.stringify(this.dailyList)),s=n.a.map(i,e=>(e.data=n.a.filter(e.data,e=>{const i=a.includes(e.projectId);let s=!t.includes("|:|")&&e.task.includes(t);return i||s}),e)),l=n.a.filter(s,t=>t.data.length);return n.a.orderBy(l,"date","desc")}},watch:{"query.month"(){this.getDailyInfo()},"daily.add.projectId"(t,e){if(!t)return;const a="|:|",i=r()().format("YYYY-MM-DD");let s=!1;n.a.each(this.dailyList,l=>{const o=n.a.filter(l.data,e=>e.projectId==t);if(l.date==i){const t=this.daily.add.task;if(o[0]){const i=[].concat(n.a.map(t,"value"),o[0].task.split(a)),l=n.a.filter(n.a.uniq(i)).join(a),r=n.a.map(l.split(a),t=>({value:t}));if(!e&&l.length>0){const t=n.a.map(r,t=>(t.size=Object(_["b"])(t.value),t)),e=n.a.orderBy(t,"size");this.daily.add.task=e}else this.daily.add.task=r;s=!0}}});const{task:l}=this.daily.add;!e&&l.length&&(s=!0),s||(this.daily.add.task=[{value:""}])}},mounted(){console.info("data-mounted:",Object(x["c"])()),Object(x["c"])()||Object(x["d"])([]),this.query.month=r()().format("YYYY-MM"),this.daily.add.task=[],this.daily.add.task.push({value:""}),this.getDailyInfo(),Object(g["J"])()},methods:{getDailyInfo(){this.loading=!0,this.$refs["card-list"].$el.parentNode.scrollTop=0,Object(g["D"])(this.query.month||"",()=>{this.loading=!1})},addDailyInfo(){const{projectId:t,task:e}=this.daily.add;let a=this.resetTaskCenter(e);const i={id:Date.now(),projectId:t,task:a};Object(g["y"])({date:r()().format("YYYY-MM-DD"),data:i},({code:e,msg:a})=>{200==e?(this.getDailyInfo(),this.handleAddTaskCancelClick(),Object(_["g"])(a),this.setLocalStorage(t)):Object(_["h"])(a)})},updDailyInfo(t,e){const{projectId:a,task:i}=t.data;t.data.task=this.resetTaskCenter(n.a.map(i.split("|:|"),t=>({value:t}))),Object(g["fb"])(t,({code:t,msg:i})=>{200==t?(this.getDailyInfo(),Object(_["g"])(i),this.setLocalStorage(a),e&&e(t)):Object(_["h"])(i)})},delDailyInfo(t){Object(g["E"])(t,({code:t,msg:e})=>{200==t?(this.getDailyInfo(),Object(_["g"])(e)):Object(_["h"])(e)})},handlePageBack(){this.$router.push({name:"Home"})},handleQueryClick(){this.getDailyInfo()},handleQueryTodayClick(){this.query.month=r()().format("YYYY-MM")},handleAddDailyClick(){this.daily.type="add",this.$refs["card-list"].$el.parentNode.scrollTop=0},handleTaskKeydown(t){"ArrowUp"!=t.key&&"ArrowDown"!=t.key||t.preventDefault()},handleTaskKeyup(t,e,a){"Enter"==t.key?this.taskKeyEnter(e,a):"ArrowUp"==t.key?this.taskKeyUp(a):"ArrowDown"==t.key&&this.taskKeyDown(a)},handleTaskBlur(t,e,a){!e&&this.daily.add.task.length>1&&this.daily.add.task.splice(a,1)},async handleTaskPaste(t,e){const a=await navigator.clipboard.readText(),i=n.a.filter(a.split("\n"));if(i.length>1){for(let t=0;t<i.length;t++){const a=i[t];t&&this.daily.add.task.splice(e+t,0,{value:""}),this.daily.add.task[e+t].value=a}setTimeout(()=>this.$refs["task_"+(e+(i.length-1))][0].focus())}},handleAddTaskCancelClick(){this.daily.type="",this.daily.add.projectId="",this.daily.add.task=[],this.daily.add.task.push({value:""})},handleAddTaskSubmitClick(){const t=r()().format("YYYY-MM-DD"),{projectId:e,task:a}=this.daily.add;if(this.verificationSubmit())return;let i=null;const s=n.a.filter(this.dailyList,({date:a,data:s})=>{const l=a==t;return l&&(i=n.a.filter(s,t=>t.projectId==e)),a==t&&i.length>=0});if(s.length&&i.length){const s=Object.assign(i[0],{task:n.a.map(a,"value").join("|:|")}),l={data:s,query:{date:t,projectId:e}};this.updDailyInfo(l,this.handleAddTaskCancelClick)}else this.addDailyInfo()},handleTaskTitleRemove(t){this.delDailyInfo(t)},handleTaskItemRemove(t,e){t.data.task?this.updDailyInfo(t,e):this.delDailyInfo(t.query)},taskKeyEnter(t,e){(t+"").length?(this.daily.add.task.length-1==e?this.daily.add.task.push({value:""}):this.daily.add.task.splice(e+1,0,{value:""}),setTimeout(()=>this.$refs["task_"+(e+1)][0].focus(),30)):this.daily.add.task.length-1>e&&setTimeout(()=>{this.$refs["task_"+(e+1)][0].focus(),setTimeout(()=>this.$refs["task_"+e][0].focus(),30)},30)},taskBackspace(t){this.$refs["task_"+(t-1)][0].focus()},taskKeyUp(t){t&&setTimeout(()=>this.$refs["task_"+(t-1)][0].focus(),30)},taskKeyDown(t){this.daily.add.task.length-1>t&&setTimeout(()=>this.$refs["task_"+(t+1)][0].focus(),30)},verificationSubmit(){const{projectId:t,task:e}=this.daily.add;return t?!(!e||0!=n.a.map(e,"value").join("").length)&&(Object(_["h"])("请输入任务信息"),!0):(Object(_["h"])("请选着项目名称"),!0)},dateWeek(t){const e="日一二三四五六".split("");return"星期"+e[r()(t).format("d")]},resetTaskCenter(t){let e=n.a.map(t,t=>(t.size=Object(_["b"])(t.value),t));return e=n.a.orderBy(e,"size"),e=n.a.filter(n.a.uniq(n.a.map(e,t=>t.value.trim()))).join("|:|"),e},projectOptions(){const t=[];if(this.dailyIsHistory){const e=Object(x["a"])().reverse(),a=this.dailyHistoryShowNumber;t.push({label:"历史记录",options:e.slice(0,a)})}return t.push({options:this.originalProjectOptions}),t},setLocalStorage(t){const e=n.a.filter(this.originalProjectOptions,e=>e.value==t),a=Object(x["a"])(),i=n.a.indexOf(n.a.map(a,"value"),t);i>=0&&a.splice(i,1),a.push(e[0]),a.length>this.dailyHistoryTotal&&a.shift(),Object(x["d"])(a)}}},E=q,S=(a("f106"),Object(y["a"])(E,i,s,!1,null,"17a2fdf6",null));e["default"]=S.exports},c9ae:function(t,e,a){"use strict";a("4ca1")},f106:function(t,e,a){"use strict";a("5fcd")}}]);