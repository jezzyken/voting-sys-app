"use strict";(self["webpackChunkclient"]=self["webpackChunkclient"]||[]).push([[74],{6074:function(t,e,s){s.r(e),s.d(e,{default:function(){return C}});var i=s(1965),a=s(3740),o=s(3698),n=s(2938),r=s(3180),l=s(4414),d=s(3449),c=s(6814),h=s(9991),u=s(9483),m=s(6930),v=s(2756),p=s(4312),g=s(7150),f=s(1034),A=s(7112),b=function(){var t=this,e=t._self._c;return e(d.A,{attrs:{fluid:""}},[e(o.A,{staticClass:"elevation-2"},[e(n.ri,{staticClass:"headline"},[t._v(" Student "),e(f.A),e(A.A,{staticClass:"mr-4",staticStyle:{"max-width":"300px"},attrs:{"prepend-inner-icon":"mdi-magnify",label:"Search students",clearable:"",outlined:"",dense:"","hide-details":"",rounded:""},model:{value:t.search,callback:function(e){t.search=e},expression:"search"}}),e(a.A,{attrs:{color:"primary"},on:{click:t.openCreateDialog}},[e(m.A,{attrs:{left:""}},[t._v("mdi-plus")]),t._v(" Add New Student ")],1)],1),e(c.A,{staticClass:"elevation-1",attrs:{headers:t.headers,items:t.students,search:t.search,"items-per-page":10,loading:t.loading,"loading-text":"Loading students... Please wait","no-data-text":"No students found"},scopedSlots:t._u([{key:"item.status",fn:function({item:s}){return[e(r.A,{attrs:{color:"active"===s.status?"green":"red","text-color":"white",small:""}},[t._v(" "+t._s(s.status)+" ")])]}},{key:"item.actions",fn:function({item:s}){return[e(a.A,{staticClass:"mr-2",attrs:{icon:"",small:""},on:{click:function(e){return t.openEditDialog(s)}}},[e(m.A,{attrs:{small:""}},[t._v("mdi-pencil")])],1),e(a.A,{attrs:{icon:"",small:""},on:{click:function(e){return t.openDeleteDialog(s)}}},[e(m.A,{attrs:{small:""}},[t._v("mdi-delete")])],1)]}}])})],1),e(h.A,{attrs:{"max-width":"900px"},model:{value:t.dialog,callback:function(e){t.dialog=e},expression:"dialog"}},[e(o.A,[e(n.ri,[e("span",{staticClass:"headline"},[t._v(t._s(t.formTitle))])]),e(n.OQ,[e(d.A,[e(v.A,[e(l.A,{attrs:{cols:"12",sm:"12",md:"4"}},[e(A.A,{attrs:{label:"Student ID",required:""},model:{value:t.editedItem.StudentIdNo,callback:function(e){t.$set(t.editedItem,"StudentIdNo",e)},expression:"editedItem.StudentIdNo"}})],1)],1),e(v.A,[e(l.A,{attrs:{cols:"12",sm:"6",md:"4"}},[e(A.A,{attrs:{label:"First Name",required:""},model:{value:t.editedItem.firstName,callback:function(e){t.$set(t.editedItem,"firstName",e)},expression:"editedItem.firstName"}})],1),e(l.A,{attrs:{cols:"12",sm:"6",md:"4"}},[e(A.A,{attrs:{label:"Middle Name",required:""},model:{value:t.editedItem.middleName,callback:function(e){t.$set(t.editedItem,"middleName",e)},expression:"editedItem.middleName"}})],1),e(l.A,{attrs:{cols:"12",sm:"6",md:"4"}},[e(A.A,{attrs:{label:"Last Name",required:""},model:{value:t.editedItem.lastName,callback:function(e){t.$set(t.editedItem,"lastName",e)},expression:"editedItem.lastName"}})],1),e(l.A,{attrs:{cols:"12",sm:"6",md:"4"}},[e(p.A,{attrs:{items:["First","Second","Third","Fourth"],label:"Year Level",required:""},model:{value:t.editedItem.yearLevel,callback:function(e){t.$set(t.editedItem,"yearLevel",e)},expression:"editedItem.yearLevel"}})],1),e(l.A,{attrs:{cols:"12",sm:"6",md:"4"}},[e(p.A,{attrs:{items:["Male","Female"],label:"Gender",required:""},model:{value:t.editedItem.gender,callback:function(e){t.$set(t.editedItem,"gender",e)},expression:"editedItem.gender"}})],1),e(l.A,{attrs:{cols:"12",sm:"6",md:"4"}},[e(A.A,{attrs:{label:"Email",type:"email",required:""},model:{value:t.editedItem.email,callback:function(e){t.$set(t.editedItem,"email",e)},expression:"editedItem.email"}})],1),e(l.A,{attrs:{cols:"12",sm:"12",md:"12"}},[e(p.A,{attrs:{items:t.programs,"item-text":"programName","item-value":"_id",label:"Program",required:""},model:{value:t.editedItem.programId,callback:function(e){t.$set(t.editedItem,"programId",e)},expression:"editedItem.programId"}})],1),e(l.A,{attrs:{cols:"12",sm:"6",md:"4"}},[e(p.A,{attrs:{items:t.classrooms,"item-text":"name","item-value":"_id",label:"Section"},model:{value:t.editedItem.classroomId,callback:function(e){t.$set(t.editedItem,"classroomId",e)},expression:"editedItem.classroomId"}})],1),e(l.A,{attrs:{cols:"12",sm:"6",md:"4"}},[e(p.A,{attrs:{items:["active","inactive"],label:"Status",required:""},model:{value:t.editedItem.status,callback:function(e){t.$set(t.editedItem,"status",e)},expression:"editedItem.status"}})],1)],1),e(u.A,{staticClass:"my-5"}),e(v.A,[e(l.A,{attrs:{cols:"12"}},[e(i.A,{attrs:{color:"info",border:"left","colored-border":"",dense:""}},[t._v(" Student Password Information ")])],1)],1),e(v.A,[e(l.A,{attrs:{cols:"12",sm:"6"}},[e(A.A,{attrs:{type:t.showPassword?"text":"password",label:"Student Password","append-icon":t.showPassword?"mdi-eye-off":"mdi-eye",outlined:"",dense:""},on:{"click:append":function(e){t.showPassword=!t.showPassword}},model:{value:t.editedItem.password,callback:function(e){t.$set(t.editedItem,"password",e)},expression:"editedItem.password"}})],1)],1)],1)],1),e(n.SL,[e(f.A),e(a.A,{attrs:{color:"blue darken-1",text:""},on:{click:t.closeDialog}},[t._v("Cancel")]),e(a.A,{attrs:{color:"blue darken-1",text:""},on:{click:t.saveStudent}},[t._v("Save")])],1)],1)],1),e(h.A,{attrs:{"max-width":"500px"},model:{value:t.deleteDialog,callback:function(e){t.deleteDialog=e},expression:"deleteDialog"}},[e(o.A,[e(n.ri,{staticClass:"headline"},[t._v("Delete Student")]),e(n.OQ,[t._v("Are you sure you want to delete this student?")]),e(n.SL,[e(f.A),e(a.A,{attrs:{color:"blue darken-1",text:""},on:{click:t.closeDeleteDialog}},[t._v("Cancel")]),e(a.A,{attrs:{color:"red darken-1",text:""},on:{click:t.deleteStudent}},[t._v("Delete")])],1)],1)],1),e(g.A,{attrs:{color:t.snackbarColor,timeout:3e3},scopedSlots:t._u([{key:"action",fn:function({attrs:s}){return[e(a.A,t._b({attrs:{text:""},on:{click:function(e){t.snackbar=!1}}},"v-btn",s,!1),[t._v("Close")])]}}]),model:{value:t.snackbar,callback:function(e){t.snackbar=e},expression:"snackbar"}},[t._v(" "+t._s(t.snackbarText)+" ")])],1)},k=[],I=(s(4114),{name:"StudentManagementPage",data:()=>({dialog:!1,deleteDialog:!1,snackbar:!1,snackbarColor:"",snackbarText:"",loading:!1,search:"",showPassword:!1,headers:[{text:"Student ID",value:"StudentIdNo"},{text:"First Name",value:"firstName"},{text:"Middle Name",value:"middleName"},{text:"Last Name",value:"lastName"},{text:"Year Level",value:"yearLevel"},{text:"Gender",value:"gender"},{text:"Email",value:"email"},{text:"Program",value:"programId.programName"},{text:"Classroom",value:"classroomId.name"},{text:"Status",value:"status"},{text:"Actions",value:"actions",sortable:!1}],students:[],programs:[],classrooms:[],editedIndex:-1,editedItem:{_id:"",firstName:"",middleName:"",lastName:"",StudentIdNo:"",yearLevel:null,gender:null,email:"",programId:null,classroomId:null,status:"active"},defaultItem:{firstName:"",middleName:"",lastName:"",StudentIdNo:"",yearLevel:null,gender:null,email:"",programId:null,classroomId:null,status:"active"},showPassword:!1}),computed:{formTitle(){return-1===this.editedIndex?"New Student":"Edit Student"}},created(){this.fetchStudents(),this.fetchPrograms(),this.fetchClassrooms()},methods:{async fetchStudents(){this.loading=!0;try{const t=await this.$http.get("/student");this.students=t.data.data.items}catch(t){console.error("Error fetching students:",t),this.showSnackbar("Error fetching students","error")}finally{this.loading=!1}},async fetchPrograms(){try{const t=await this.$http.get("/program");this.programs=t.data.data.items}catch(t){console.error("Error fetching programs:",t),this.showSnackbar("Error fetching programs","error")}},async fetchClassrooms(){try{const t=await this.$http.get("/classroom");this.classrooms=t.data.data.items}catch(t){console.error("Error fetching classrooms:",t),this.showSnackbar("Error fetching classrooms","error")}},openCreateDialog(){this.editedIndex=-1,this.editedItem=Object.assign({},this.defaultItem),this.dialog=!0},openEditDialog(t){this.editedIndex=this.students.indexOf(t),this.editedItem=Object.assign({},t),this.dialog=!0},openDeleteDialog(t){this.editedItem=Object.assign({},t),this.deleteDialog=!0},closeDialog(){this.showPassword=!1,this.dialog=!1,this.$nextTick((()=>{this.editedItem=Object.assign({},this.defaultItem),this.editedIndex=-1}))},closeDeleteDialog(){this.deleteDialog=!1,this.$nextTick((()=>{this.editedItem=Object.assign({},this.defaultItem)}))},async saveStudent(){try{if(this.editedIndex>-1)await this.$http.put(`/student/${this.editedItem._id}`,this.editedItem),Object.assign(this.students[this.editedIndex],this.editedItem),this.showSnackbar("Student updated successfully","success");else{const t=await this.$http.post("/student",this.editedItem);this.students.push(t.data.data.item),this.showSnackbar("Student created successfully","success")}this.closeDialog(),this.fetchStudents()}catch(t){console.error("Error saving student:",t),this.showSnackbar("Error saving student","error")}},async deleteStudent(){try{await this.$http.delete(`/student/${this.editedItem._id}`);const t=this.students.findIndex((t=>t._id===this.editedItem._id));this.students.splice(t,1),this.closeDeleteDialog(),this.showSnackbar("Student deleted successfully","success")}catch(t){console.error("Error deleting student:",t),this.showSnackbar("Error deleting student","error")}},showSnackbar(t,e){this.snackbarText=t,this.snackbarColor=e,this.snackbar=!0}},watch:{dialog(t){t||(this.showPassword=!1)}}}),x=I,y=s(1656),w=(0,y.A)(x,b,k,!1,null,null,null),C=w.exports},1965:function(t,e,s){s.d(e,{A:function(){return m}});var i=s(9375),a=s(4728),o=s(569),n=s(428),r=s(3381),l=s(5471),d=l.Ay.extend({name:"transitionable",props:{mode:String,origin:String,transition:String}}),c=s(5803),h=s(6988),u=s(4152),m=(0,c.A)(i.A,n.A,d).extend({name:"v-alert",props:{border:{type:String,validator(t){return["top","right","bottom","left"].includes(t)}},closeLabel:{type:String,default:"$vuetify.close"},coloredBorder:Boolean,dense:Boolean,dismissible:Boolean,closeIcon:{type:String,default:"$cancel"},icon:{default:"",type:[Boolean,String],validator(t){return"string"===typeof t||!1===t}},outlined:Boolean,prominent:Boolean,text:Boolean,type:{type:String,validator(t){return["info","error","success","warning"].includes(t)}},value:{type:Boolean,default:!0}},computed:{__cachedBorder(){if(!this.border)return null;let t={staticClass:"v-alert__border",class:{[`v-alert__border--${this.border}`]:!0}};return this.coloredBorder&&(t=this.setBackgroundColor(this.computedColor,t),t.class["v-alert__border--has-color"]=!0),this.$createElement("div",t)},__cachedDismissible(){if(!this.dismissible)return null;const t=this.iconColor;return this.$createElement(a.A,{staticClass:"v-alert__dismissible",props:{color:t,icon:!0,small:!0},attrs:{"aria-label":this.$vuetify.lang.t(this.closeLabel)},on:{click:()=>this.isActive=!1}},[this.$createElement(o.A,{props:{color:t}},this.closeIcon)])},__cachedIcon(){return this.computedIcon?this.$createElement(o.A,{staticClass:"v-alert__icon",props:{color:this.iconColor}},this.computedIcon):null},classes(){const t={...i.A.options.computed.classes.call(this),"v-alert--border":Boolean(this.border),"v-alert--dense":this.dense,"v-alert--outlined":this.outlined,"v-alert--prominent":this.prominent,"v-alert--text":this.text};return this.border&&(t[`v-alert--border-${this.border}`]=!0),t},computedColor(){return this.color||this.type},computedIcon(){return!1!==this.icon&&("string"===typeof this.icon&&this.icon?this.icon:!!["error","info","success","warning"].includes(this.type)&&`$${this.type}`)},hasColoredIcon(){return this.hasText||Boolean(this.border)&&this.coloredBorder},hasText(){return this.text||this.outlined},iconColor(){return this.hasColoredIcon?this.computedColor:void 0},isDark(){return!(!this.type||this.coloredBorder||this.outlined)||r.A.options.computed.isDark.call(this)}},created(){this.$attrs.hasOwnProperty("outline")&&(0,h.q4)("outline","outlined",this)},methods:{genWrapper(){const t=[(0,u.$c)(this,"prepend")||this.__cachedIcon,this.genContent(),this.__cachedBorder,(0,u.$c)(this,"append"),this.$scopedSlots.close?this.$scopedSlots.close({toggle:this.toggle}):this.__cachedDismissible],e={staticClass:"v-alert__wrapper"};return this.$createElement("div",e,t)},genContent(){return this.$createElement("div",{staticClass:"v-alert__content"},(0,u.$c)(this))},genAlert(){let t={staticClass:"v-alert",attrs:{role:"alert"},on:this.listeners$,class:this.classes,style:this.styles,directives:[{name:"show",value:this.isActive}]};if(!this.coloredBorder){const e=this.hasText?this.setTextColor:this.setBackgroundColor;t=e(this.computedColor,t)}return this.$createElement("div",t,[this.genWrapper()])},toggle(){this.isActive=!this.isActive}},render(t){const e=this.genAlert();return this.transition?t("transition",{props:{name:this.transition,origin:this.origin,mode:this.mode}},[e]):e}})},9991:function(t,e,s){s.d(e,{A:function(){return p}});var i=s(4596),a=s(5030),o=s(2031),n=s(7631),r=s(5949),l=s(7198),d=s(5648),c=s(4598),h=s(5803),u=s(6988),m=s(4152);const v=(0,h.A)(o.A,n.A,r.A,l.A,d.A,a.A);var p=v.extend({name:"v-dialog",directives:{ClickOutside:c.A},props:{dark:Boolean,disabled:Boolean,fullscreen:Boolean,light:Boolean,maxWidth:[String,Number],noClickAnimation:Boolean,origin:{type:String,default:"center center"},persistent:Boolean,retainFocus:{type:Boolean,default:!0},scrollable:Boolean,transition:{type:[String,Boolean],default:"dialog-transition"},width:[String,Number]},data(){return{activatedBy:null,animate:!1,animateTimeout:-1,stackMinZIndex:200,previousActiveElement:null}},computed:{classes(){return{[`v-dialog ${this.contentClass}`.trim()]:!0,"v-dialog--active":this.isActive,"v-dialog--persistent":this.persistent,"v-dialog--fullscreen":this.fullscreen,"v-dialog--scrollable":this.scrollable,"v-dialog--animated":this.animate}},contentClasses(){return{"v-dialog__content":!0,"v-dialog__content--active":this.isActive}},hasActivator(){return Boolean(!!this.$slots.activator||!!this.$scopedSlots.activator)}},watch:{isActive(t){var e;t?(this.show(),this.hideScroll()):(this.removeOverlay(),this.unbind(),null===(e=this.previousActiveElement)||void 0===e||e.focus())},fullscreen(t){this.isActive&&(t?(this.hideScroll(),this.removeOverlay(!1)):(this.showScroll(),this.genOverlay()))}},created(){this.$attrs.hasOwnProperty("full-width")&&(0,u.rq)("full-width",this)},beforeMount(){this.$nextTick((()=>{this.isBooted=this.isActive,this.isActive&&this.show()}))},beforeDestroy(){"undefined"!==typeof window&&this.unbind()},methods:{animateClick(){this.animate=!1,this.$nextTick((()=>{this.animate=!0,window.clearTimeout(this.animateTimeout),this.animateTimeout=window.setTimeout((()=>this.animate=!1),150)}))},closeConditional(t){const e=t.target;return!(this._isDestroyed||!this.isActive||this.$refs.content.contains(e)||this.overlay&&e&&!this.overlay.$el.contains(e))&&this.activeZIndex>=this.getMaxZIndex()},hideScroll(){this.fullscreen?document.documentElement.classList.add("overflow-y-hidden"):r.A.options.methods.hideScroll.call(this)},show(){!this.fullscreen&&!this.hideOverlay&&this.genOverlay(),this.$nextTick((()=>{this.$nextTick((()=>{var t,e;(null===(t=this.$refs.dialog)||void 0===t?void 0:t.contains(document.activeElement))||(this.previousActiveElement=document.activeElement,null===(e=this.$refs.dialog)||void 0===e||e.focus()),this.bind()}))}))},bind(){window.addEventListener("focusin",this.onFocusin)},unbind(){window.removeEventListener("focusin",this.onFocusin)},onClickOutside(t){this.$emit("click:outside",t),this.persistent?this.noClickAnimation||this.animateClick():this.isActive=!1},onKeydown(t){if(t.keyCode===m.uP.esc&&!this.getOpenDependents().length)if(this.persistent)this.noClickAnimation||this.animateClick();else{this.isActive=!1;const t=this.getActivator();this.$nextTick((()=>t&&t.focus()))}this.$emit("keydown",t)},onFocusin(t){if(!t||!this.retainFocus)return;const e=t.target;if(e&&this.$refs.dialog&&![document,this.$refs.dialog].includes(e)&&!this.$refs.dialog.contains(e)&&this.activeZIndex>=this.getMaxZIndex()&&!this.getOpenDependentElements().some((t=>t.contains(e)))){const t=this.$refs.dialog.querySelectorAll('button, [href], input:not([type="hidden"]), select, textarea, [tabindex]:not([tabindex="-1"])'),e=[...t].find((t=>!t.hasAttribute("disabled")&&!t.matches('[tabindex="-1"]')));e&&e.focus()}},genContent(){return this.showLazyContent((()=>[this.$createElement(i.A,{props:{root:!0,light:this.light,dark:this.dark}},[this.$createElement("div",{class:this.contentClasses,attrs:{role:"dialog","aria-modal":this.hideOverlay?void 0:"true",...this.getScopeIdAttrs()},on:{keydown:this.onKeydown},style:{zIndex:this.activeZIndex},ref:"content"},[this.genTransition()])])]))},genTransition(){const t=this.genInnerContent();return this.transition?this.$createElement("transition",{props:{name:this.transition,origin:this.origin,appear:!0}},[t]):t},genInnerContent(){const t={class:this.classes,attrs:{tabindex:this.isActive?0:void 0},ref:"dialog",directives:[{name:"click-outside",value:{handler:this.onClickOutside,closeConditional:this.closeConditional,include:this.getOpenDependentElements}},{name:"show",value:this.isActive}],style:{transformOrigin:this.origin}};return this.fullscreen||(t.style={...t.style,maxWidth:(0,m.Dg)(this.maxWidth),width:(0,m.Dg)(this.width)}),this.$createElement("div",t,this.getContentSlot())}},render(t){return t("div",{staticClass:"v-dialog__container",class:{"v-dialog__container--attached":""===this.attach||!0===this.attach||"attach"===this.attach}},[this.genActivator(),this.genContent()])}})},7150:function(t,e,s){s.d(e,{A:function(){return h}});var i=s(8184),a=s(8743),o=s(3381),n=s(428),r=s(6763),l=s(5803),d=s(4152),c=s(6988),h=(0,l.A)(i.A,a.A,n.A,(0,r.P)(["absolute","bottom","left","right","top"])).extend({name:"v-snackbar",props:{app:Boolean,centered:Boolean,contentClass:{type:String,default:""},multiLine:Boolean,text:Boolean,timeout:{type:[Number,String],default:5e3},transition:{type:[Boolean,String],default:"v-snack-transition",validator:t=>"string"===typeof t||!1===t},vertical:Boolean},data:()=>({activeTimeout:-1}),computed:{classes(){return{"v-snack--absolute":this.absolute,"v-snack--active":this.isActive,"v-snack--bottom":this.bottom||!this.top,"v-snack--centered":this.centered,"v-snack--has-background":this.hasBackground,"v-snack--left":this.left,"v-snack--multi-line":this.multiLine&&!this.vertical,"v-snack--right":this.right,"v-snack--text":this.text,"v-snack--top":this.top,"v-snack--vertical":this.vertical}},hasBackground(){return!this.text&&!this.outlined},isDark(){return this.hasBackground?!this.light:o.A.options.computed.isDark.call(this)},styles(){if(this.absolute||!this.app)return{};const{bar:t,bottom:e,footer:s,insetFooter:i,left:a,right:o,top:n}=this.$vuetify.application;return{paddingBottom:(0,d.Dg)(e+s+i),paddingLeft:(0,d.Dg)(a),paddingRight:(0,d.Dg)(o),paddingTop:(0,d.Dg)(t+n)}}},watch:{isActive:"setTimeout",timeout:"setTimeout"},mounted(){this.isActive&&this.setTimeout()},created(){this.$attrs.hasOwnProperty("auto-height")&&(0,c.rq)("auto-height",this),0==this.timeout&&(0,c.CI)('timeout="0"',"-1",this)},methods:{genActions(){return this.$createElement("div",{staticClass:"v-snack__action "},[(0,d.$c)(this,"action",{attrs:{class:"v-snack__btn"}})])},genContent(){return this.$createElement("div",{staticClass:"v-snack__content",class:{[this.contentClass]:!0},attrs:{role:"status","aria-live":"polite"}},[(0,d.$c)(this)])},genWrapper(){const t=this.hasBackground?this.setBackgroundColor:this.setTextColor,e=t(this.color,{staticClass:"v-snack__wrapper",class:i.A.options.computed.classes.call(this),style:i.A.options.computed.styles.call(this),directives:[{name:"show",value:this.isActive}],on:{pointerenter:()=>window.clearTimeout(this.activeTimeout),pointerleave:this.setTimeout}});return this.$createElement("div",e,[this.genContent(),this.genActions()])},genTransition(){return this.$createElement("transition",{props:{name:this.transition}},[this.genWrapper()])},setTimeout(){window.clearTimeout(this.activeTimeout);const t=Number(this.timeout);this.isActive&&![0,-1].includes(t)&&(this.activeTimeout=window.setTimeout((()=>{this.isActive=!1}),t))}},render(t){return t("div",{staticClass:"v-snack",class:this.classes,style:this.styles},[!1!==this.transition?this.genTransition():this.genWrapper()])}})}}]);
//# sourceMappingURL=74.cac7ade2.js.map