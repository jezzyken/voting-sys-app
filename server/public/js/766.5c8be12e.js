"use strict";(self["webpackChunkclient"]=self["webpackChunkclient"]||[]).push([[766],{8766:function(t,e,s){s.r(e),s.d(e,{default:function(){return x}});var i=s(3740),a=s(3698),n=s(2938),o=s(4414),r=s(3449),l=s(6814),c=s(9991),d=s(6930),h=s(2756),u=s(7150),m=s(1034),v=s(7112),g=function(){var t=this,e=t._self._c;return e(r.A,{attrs:{fluid:""}},[e(a.A,{staticClass:"elevation-2"},[e(n.ri,{staticClass:"headline"},[t._v(" Users "),e(m.A),e(v.A,{staticClass:"mr-4",staticStyle:{"max-width":"300px"},attrs:{"prepend-inner-icon":"mdi-magnify",label:"Search users",clearable:"",outlined:"",rounded:"",dense:"","hide-details":""},model:{value:t.search,callback:function(e){t.search=e},expression:"search"}}),e(i.A,{attrs:{color:"primary"},on:{click:t.openCreateDialog}},[e(d.A,{attrs:{left:""}},[t._v("mdi-plus")]),t._v(" Add New User ")],1)],1),e(l.A,{staticClass:"elevation-1",attrs:{headers:t.headers,items:t.users,search:t.search,"items-per-page":10,loading:t.loading,"loading-text":"Loading users... Please wait","no-data-text":"No users found","footer-props":{"items-per-page-options":[5,10,15,20]}},scopedSlots:t._u([{key:"item",fn:function({item:s,index:a}){return[e("tr",{class:a%2===0?"grey lighten-4":""},[e("td",[t._v(t._s(s.name))]),e("td",[t._v(t._s(s.username))]),e("td",[t._v(t._s(s.role))]),e("td",{staticClass:"text-right"},[e(i.A,{staticClass:"mr-2",attrs:{icon:"",small:""},on:{click:function(e){return t.openEditDialog(s)}}},[e(d.A,{attrs:{small:""}},[t._v("mdi-pencil")])],1),e(i.A,{attrs:{icon:"",small:""},on:{click:function(e){return t.openDeleteDialog(s)}}},[e(d.A,{attrs:{small:""}},[t._v("mdi-delete")])],1)],1)])]}}])})],1),e(c.A,{attrs:{"max-width":"500px"},model:{value:t.dialog,callback:function(e){t.dialog=e},expression:"dialog"}},[e(a.A,[e(n.ri,[e("span",{staticClass:"headline"},[t._v(t._s(t.formTitle))])]),e(n.OQ,[e(r.A,[e(h.A,[e(o.A,{attrs:{cols:"12"}},[e(v.A,{attrs:{label:"Name",rules:[t=>!!t||"Name is required"],required:""},model:{value:t.editedItem.name,callback:function(e){t.$set(t.editedItem,"name",e)},expression:"editedItem.name"}})],1),e(o.A,{attrs:{cols:"12"}},[e(v.A,{attrs:{label:"Username",rules:[t=>!!t||"Username is required"],required:""},model:{value:t.editedItem.username,callback:function(e){t.$set(t.editedItem,"username",e)},expression:"editedItem.username"}})],1),e(o.A,{attrs:{cols:"12"}},[e(v.A,{attrs:{label:"Password",rules:[t=>!!t||"Password is required"],type:"password",required:"",disabled:t.editedIndex>-1},model:{value:t.editedItem.password,callback:function(e){t.$set(t.editedItem,"password",e)},expression:"editedItem.password"}})],1)],1)],1)],1),e(n.SL,[e(m.A),e(i.A,{attrs:{color:"blue darken-1",text:""},on:{click:t.closeDialog}},[t._v("Cancel")]),e(i.A,{attrs:{color:"blue darken-1",text:""},on:{click:t.saveUser}},[t._v("Save")])],1)],1)],1),e(c.A,{attrs:{"max-width":"500px"},model:{value:t.deleteDialog,callback:function(e){t.deleteDialog=e},expression:"deleteDialog"}},[e(a.A,[e(n.ri,{staticClass:"headline"},[t._v("Delete User")]),e(n.OQ,[t._v("Are you sure you want to delete this user?")]),e(n.SL,[e(m.A),e(i.A,{attrs:{color:"blue darken-1",text:""},on:{click:t.closeDeleteDialog}},[t._v("Cancel")]),e(i.A,{attrs:{color:"red darken-1",text:""},on:{click:t.deleteUser}},[t._v("Delete")])],1)],1)],1),e(u.A,{attrs:{color:t.snackbarColor,timeout:3e3},scopedSlots:t._u([{key:"action",fn:function({attrs:s}){return[e(i.A,t._b({attrs:{text:""},on:{click:function(e){t.snackbar=!1}}},"v-btn",s,!1),[t._v("Close")])]}}]),model:{value:t.snackbar,callback:function(e){t.snackbar=e},expression:"snackbar"}},[t._v(" "+t._s(t.snackbarText)+" ")])],1)},p=[],f=(s(4114),{name:"UserManagementPage",data:()=>({dialog:!1,deleteDialog:!1,snackbar:!1,snackbarColor:"",snackbarText:"",loading:!1,search:"",headers:[{text:"Name",value:"name",align:"start",sortable:!0},{text:"Username",value:"username",align:"start",sortable:!0},{text:"Role",value:"role",align:"start",sortable:!0},{text:"Actions",value:"actions",sortable:!1,align:"end"}],users:[],roles:["admin","user"],editedIndex:-1,editedItem:{_id:"",name:"",username:"",password:""},defaultItem:{name:"",username:"",password:""}}),computed:{formTitle(){return-1===this.editedIndex?"New User":"Edit User"}},created(){this.fetchUsers()},methods:{async fetchUsers(){this.loading=!0;try{const t=await this.$http.get("/user");this.users=t.data.data,console.log({user:this.users})}catch(t){console.error("Error fetching users:",t),this.showSnackbar("Error fetching users","error")}finally{this.loading=!1}},openCreateDialog(){this.editedIndex=-1,this.editedItem=Object.assign({},this.defaultItem),this.dialog=!0},openEditDialog(t){this.editedIndex=this.users.indexOf(t),this.editedItem=Object.assign({},t),this.editedItem.password="",this.dialog=!0},openDeleteDialog(t){this.editedItem=Object.assign({},t),this.deleteDialog=!0},closeDialog(){this.dialog=!1,this.$nextTick((()=>{this.editedItem=Object.assign({},this.defaultItem),this.editedIndex=-1}))},closeDeleteDialog(){this.deleteDialog=!1,this.$nextTick((()=>{this.editedItem=Object.assign({},this.defaultItem)}))},async saveUser(){if(!this.editedItem.username||!this.editedIndex>-1&&!this.editedItem.password)this.showSnackbar("Please fill all required fields","error");else try{if(this.editedIndex>-1)this.editedItem.password||delete this.editedItem.password,await this.$http.put(`/user/${this.editedItem._id}`,this.editedItem),Object.assign(this.users[this.editedIndex],this.editedItem),this.showSnackbar("User updated successfully","success");else{const t=await this.$http.post("/user",this.editedItem);this.users.push(t.data.data),this.showSnackbar("User created successfully","success")}this.closeDialog()}catch(t){console.error("Error saving user:",t),this.showSnackbar(t.response?.data?.message||"Error saving user","error")}},async deleteUser(){try{await this.$http.delete(`/user/${this.editedItem._id}`);const t=this.users.findIndex((t=>t._id===this.editedItem._id));this.users.splice(t,1),this.closeDeleteDialog(),this.showSnackbar("User deleted successfully","success")}catch(t){console.error("Error deleting user:",t),this.showSnackbar("Error deleting user","error")}},showSnackbar(t,e){this.snackbarText=t,this.snackbarColor=e,this.snackbar=!0}}}),k=f,A=s(1656),b=(0,A.A)(k,g,p,!1,null,null,null),x=b.exports},9991:function(t,e,s){s.d(e,{A:function(){return g}});var i=s(4596),a=s(5030),n=s(2031),o=s(7631),r=s(5949),l=s(7198),c=s(5648),d=s(4598),h=s(5803),u=s(6988),m=s(4152);const v=(0,h.A)(n.A,o.A,r.A,l.A,c.A,a.A);var g=v.extend({name:"v-dialog",directives:{ClickOutside:d.A},props:{dark:Boolean,disabled:Boolean,fullscreen:Boolean,light:Boolean,maxWidth:[String,Number],noClickAnimation:Boolean,origin:{type:String,default:"center center"},persistent:Boolean,retainFocus:{type:Boolean,default:!0},scrollable:Boolean,transition:{type:[String,Boolean],default:"dialog-transition"},width:[String,Number]},data(){return{activatedBy:null,animate:!1,animateTimeout:-1,stackMinZIndex:200,previousActiveElement:null}},computed:{classes(){return{[`v-dialog ${this.contentClass}`.trim()]:!0,"v-dialog--active":this.isActive,"v-dialog--persistent":this.persistent,"v-dialog--fullscreen":this.fullscreen,"v-dialog--scrollable":this.scrollable,"v-dialog--animated":this.animate}},contentClasses(){return{"v-dialog__content":!0,"v-dialog__content--active":this.isActive}},hasActivator(){return Boolean(!!this.$slots.activator||!!this.$scopedSlots.activator)}},watch:{isActive(t){var e;t?(this.show(),this.hideScroll()):(this.removeOverlay(),this.unbind(),null===(e=this.previousActiveElement)||void 0===e||e.focus())},fullscreen(t){this.isActive&&(t?(this.hideScroll(),this.removeOverlay(!1)):(this.showScroll(),this.genOverlay()))}},created(){this.$attrs.hasOwnProperty("full-width")&&(0,u.rq)("full-width",this)},beforeMount(){this.$nextTick((()=>{this.isBooted=this.isActive,this.isActive&&this.show()}))},beforeDestroy(){"undefined"!==typeof window&&this.unbind()},methods:{animateClick(){this.animate=!1,this.$nextTick((()=>{this.animate=!0,window.clearTimeout(this.animateTimeout),this.animateTimeout=window.setTimeout((()=>this.animate=!1),150)}))},closeConditional(t){const e=t.target;return!(this._isDestroyed||!this.isActive||this.$refs.content.contains(e)||this.overlay&&e&&!this.overlay.$el.contains(e))&&this.activeZIndex>=this.getMaxZIndex()},hideScroll(){this.fullscreen?document.documentElement.classList.add("overflow-y-hidden"):r.A.options.methods.hideScroll.call(this)},show(){!this.fullscreen&&!this.hideOverlay&&this.genOverlay(),this.$nextTick((()=>{this.$nextTick((()=>{var t,e;(null===(t=this.$refs.dialog)||void 0===t?void 0:t.contains(document.activeElement))||(this.previousActiveElement=document.activeElement,null===(e=this.$refs.dialog)||void 0===e||e.focus()),this.bind()}))}))},bind(){window.addEventListener("focusin",this.onFocusin)},unbind(){window.removeEventListener("focusin",this.onFocusin)},onClickOutside(t){this.$emit("click:outside",t),this.persistent?this.noClickAnimation||this.animateClick():this.isActive=!1},onKeydown(t){if(t.keyCode===m.uP.esc&&!this.getOpenDependents().length)if(this.persistent)this.noClickAnimation||this.animateClick();else{this.isActive=!1;const t=this.getActivator();this.$nextTick((()=>t&&t.focus()))}this.$emit("keydown",t)},onFocusin(t){if(!t||!this.retainFocus)return;const e=t.target;if(e&&this.$refs.dialog&&![document,this.$refs.dialog].includes(e)&&!this.$refs.dialog.contains(e)&&this.activeZIndex>=this.getMaxZIndex()&&!this.getOpenDependentElements().some((t=>t.contains(e)))){const t=this.$refs.dialog.querySelectorAll('button, [href], input:not([type="hidden"]), select, textarea, [tabindex]:not([tabindex="-1"])'),e=[...t].find((t=>!t.hasAttribute("disabled")&&!t.matches('[tabindex="-1"]')));e&&e.focus()}},genContent(){return this.showLazyContent((()=>[this.$createElement(i.A,{props:{root:!0,light:this.light,dark:this.dark}},[this.$createElement("div",{class:this.contentClasses,attrs:{role:"dialog","aria-modal":this.hideOverlay?void 0:"true",...this.getScopeIdAttrs()},on:{keydown:this.onKeydown},style:{zIndex:this.activeZIndex},ref:"content"},[this.genTransition()])])]))},genTransition(){const t=this.genInnerContent();return this.transition?this.$createElement("transition",{props:{name:this.transition,origin:this.origin,appear:!0}},[t]):t},genInnerContent(){const t={class:this.classes,attrs:{tabindex:this.isActive?0:void 0},ref:"dialog",directives:[{name:"click-outside",value:{handler:this.onClickOutside,closeConditional:this.closeConditional,include:this.getOpenDependentElements}},{name:"show",value:this.isActive}],style:{transformOrigin:this.origin}};return this.fullscreen||(t.style={...t.style,maxWidth:(0,m.Dg)(this.maxWidth),width:(0,m.Dg)(this.width)}),this.$createElement("div",t,this.getContentSlot())}},render(t){return t("div",{staticClass:"v-dialog__container",class:{"v-dialog__container--attached":""===this.attach||!0===this.attach||"attach"===this.attach}},[this.genActivator(),this.genContent()])}})},7150:function(t,e,s){s.d(e,{A:function(){return h}});var i=s(8184),a=s(8743),n=s(3381),o=s(428),r=s(6763),l=s(5803),c=s(4152),d=s(6988),h=(0,l.A)(i.A,a.A,o.A,(0,r.P)(["absolute","bottom","left","right","top"])).extend({name:"v-snackbar",props:{app:Boolean,centered:Boolean,contentClass:{type:String,default:""},multiLine:Boolean,text:Boolean,timeout:{type:[Number,String],default:5e3},transition:{type:[Boolean,String],default:"v-snack-transition",validator:t=>"string"===typeof t||!1===t},vertical:Boolean},data:()=>({activeTimeout:-1}),computed:{classes(){return{"v-snack--absolute":this.absolute,"v-snack--active":this.isActive,"v-snack--bottom":this.bottom||!this.top,"v-snack--centered":this.centered,"v-snack--has-background":this.hasBackground,"v-snack--left":this.left,"v-snack--multi-line":this.multiLine&&!this.vertical,"v-snack--right":this.right,"v-snack--text":this.text,"v-snack--top":this.top,"v-snack--vertical":this.vertical}},hasBackground(){return!this.text&&!this.outlined},isDark(){return this.hasBackground?!this.light:n.A.options.computed.isDark.call(this)},styles(){if(this.absolute||!this.app)return{};const{bar:t,bottom:e,footer:s,insetFooter:i,left:a,right:n,top:o}=this.$vuetify.application;return{paddingBottom:(0,c.Dg)(e+s+i),paddingLeft:(0,c.Dg)(a),paddingRight:(0,c.Dg)(n),paddingTop:(0,c.Dg)(t+o)}}},watch:{isActive:"setTimeout",timeout:"setTimeout"},mounted(){this.isActive&&this.setTimeout()},created(){this.$attrs.hasOwnProperty("auto-height")&&(0,d.rq)("auto-height",this),0==this.timeout&&(0,d.CI)('timeout="0"',"-1",this)},methods:{genActions(){return this.$createElement("div",{staticClass:"v-snack__action "},[(0,c.$c)(this,"action",{attrs:{class:"v-snack__btn"}})])},genContent(){return this.$createElement("div",{staticClass:"v-snack__content",class:{[this.contentClass]:!0},attrs:{role:"status","aria-live":"polite"}},[(0,c.$c)(this)])},genWrapper(){const t=this.hasBackground?this.setBackgroundColor:this.setTextColor,e=t(this.color,{staticClass:"v-snack__wrapper",class:i.A.options.computed.classes.call(this),style:i.A.options.computed.styles.call(this),directives:[{name:"show",value:this.isActive}],on:{pointerenter:()=>window.clearTimeout(this.activeTimeout),pointerleave:this.setTimeout}});return this.$createElement("div",e,[this.genContent(),this.genActions()])},genTransition(){return this.$createElement("transition",{props:{name:this.transition}},[this.genWrapper()])},setTimeout(){window.clearTimeout(this.activeTimeout);const t=Number(this.timeout);this.isActive&&![0,-1].includes(t)&&(this.activeTimeout=window.setTimeout((()=>{this.isActive=!1}),t))}},render(t){return t("div",{staticClass:"v-snack",class:this.classes,style:this.styles},[!1!==this.transition?this.genTransition():this.genWrapper()])}})}}]);
//# sourceMappingURL=766.5c8be12e.js.map