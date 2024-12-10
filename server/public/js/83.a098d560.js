"use strict";(self["webpackChunkclient"]=self["webpackChunkclient"]||[]).push([[83],{4083:function(t,e,i){i.r(e),i.d(e,{default:function(){return w}});var s=i(375),a=i(7210),n=i(8834),o=i(1526),r=i(6278),l=i(8327),c=i(4155),h=i(9456),d=i(8412),u=i(3021),m=i(7410),p=i(9940),v=i(7402),g=function(){var t=this,e=t._self._c;return e(r.A,{attrs:{fluid:""}},[e(a.A,{staticClass:"elevation-2"},[e(n.ri,{staticClass:"headline"},[t._v(" Parties "),e(m.A),e(p.A,{staticClass:"mr-4",staticStyle:{"max-width":"300px"},attrs:{"prepend-inner-icon":"mdi-magnify",label:"Search parties",clearable:"",outlined:"",dense:"","hide-details":"",rounded:""},model:{value:t.search,callback:function(e){t.search=e},expression:"search"}}),e(s.A,{attrs:{color:"primary"},on:{click:t.openCreateDialog}},[e(h.A,{attrs:{left:""}},[t._v("mdi-plus")]),t._v(" Add New Party ")],1)],1),e(l.A,{staticClass:"elevation-1",attrs:{headers:t.headers,items:t.parties,search:t.search,"items-per-page":10,loading:t.loading,"loading-text":"Loading parties... Please wait","no-data-text":"No parties found"},scopedSlots:t._u([{key:"item.actions",fn:function({item:i}){return[e(s.A,{staticClass:"mr-2",attrs:{icon:"",small:""},on:{click:function(e){return t.openEditDialog(i)}}},[e(h.A,{attrs:{small:""}},[t._v("mdi-pencil")])],1),e(s.A,{attrs:{icon:"",small:""},on:{click:function(e){return t.openDeleteDialog(i)}}},[e(h.A,{attrs:{small:""}},[t._v("mdi-delete")])],1)]}}])})],1),e(c.A,{attrs:{"max-width":"500px"},model:{value:t.dialog,callback:function(e){t.dialog=e},expression:"dialog"}},[e(a.A,[e(n.ri,[e("span",{staticClass:"headline"},[t._v(t._s(t.formTitle))])]),e(n.OQ,[e(r.A,[e(d.A,[e(o.A,{attrs:{cols:"12"}},[e(p.A,{attrs:{label:"Party Name",required:""},model:{value:t.editedItem.name,callback:function(e){t.$set(t.editedItem,"name",e)},expression:"editedItem.name"}})],1),e(o.A,{attrs:{cols:"12"}},[e(v.A,{attrs:{label:"Party Platform",rows:"3"},model:{value:t.editedItem.platform,callback:function(e){t.$set(t.editedItem,"platform",e)},expression:"editedItem.platform"}})],1)],1)],1)],1),e(n.SL,[e(m.A),e(s.A,{attrs:{color:"blue darken-1",text:""},on:{click:t.closeDialog}},[t._v("Cancel")]),e(s.A,{attrs:{color:"blue darken-1",text:""},on:{click:t.saveParty}},[t._v("Save")])],1)],1)],1),e(c.A,{attrs:{"max-width":"500px"},model:{value:t.deleteDialog,callback:function(e){t.deleteDialog=e},expression:"deleteDialog"}},[e(a.A,[e(n.ri,{staticClass:"headline"},[t._v("Delete Party")]),e(n.OQ,[t._v("Are you sure you want to delete this party?")]),e(n.SL,[e(m.A),e(s.A,{attrs:{color:"blue darken-1",text:""},on:{click:t.closeDeleteDialog}},[t._v("Cancel")]),e(s.A,{attrs:{color:"red darken-1",text:""},on:{click:t.deleteParty}},[t._v("Delete")])],1)],1)],1),e(u.A,{attrs:{color:t.snackbarColor,timeout:3e3},scopedSlots:t._u([{key:"action",fn:function({attrs:i}){return[e(s.A,t._b({attrs:{text:""},on:{click:function(e){t.snackbar=!1}}},"v-btn",i,!1),[t._v("Close")])]}}]),model:{value:t.snackbar,callback:function(e){t.snackbar=e},expression:"snackbar"}},[t._v(" "+t._s(t.snackbarText)+" ")])],1)},f=[],k=(i(4114),{name:"PartyManagementPage",data:()=>({dialog:!1,deleteDialog:!1,snackbar:!1,snackbarColor:"",snackbarText:"",loading:!1,search:"",headers:[{text:"Party Name",value:"name"},{text:"Platform",value:"platform"},{text:"Actions",value:"actions",sortable:!1}],parties:[],editedIndex:-1,editedItem:{_id:"",name:"",platform:""},defaultItem:{name:"",platform:""}}),computed:{formTitle(){return-1===this.editedIndex?"New Party":"Edit Party"}},created(){this.fetchParties()},methods:{async fetchParties(){this.loading=!0;try{const t=await this.$http.get("/party");this.parties=t.data.data.items}catch(t){console.error("Error fetching parties:",t),this.showSnackbar("Error fetching parties","error")}finally{this.loading=!1}},openCreateDialog(){this.editedIndex=-1,this.editedItem=Object.assign({},this.defaultItem),this.dialog=!0},openEditDialog(t){this.editedIndex=this.parties.indexOf(t),this.editedItem=Object.assign({},t),this.dialog=!0},openDeleteDialog(t){this.editedItem=Object.assign({},t),this.deleteDialog=!0},closeDialog(){this.dialog=!1,this.$nextTick((()=>{this.editedItem=Object.assign({},this.defaultItem),this.editedIndex=-1}))},closeDeleteDialog(){this.deleteDialog=!1,this.$nextTick((()=>{this.editedItem=Object.assign({},this.defaultItem)}))},async saveParty(){try{if(this.editedIndex>-1)await this.$http.put(`/party/${this.editedItem._id}`,this.editedItem),Object.assign(this.parties[this.editedIndex],this.editedItem),this.showSnackbar("Party updated successfully","success");else{const t=await this.$http.post("/party",this.editedItem);this.parties.push(t.data.data.item),this.showSnackbar("Party created successfully","success")}this.closeDialog(),this.fetchParties()}catch(t){console.error("Error saving party:",t),this.showSnackbar("Error saving party","error")}},async deleteParty(){try{await this.$http.delete(`/party/${this.editedItem._id}`);const t=this.parties.findIndex((t=>t._id===this.editedItem._id));this.parties.splice(t,1),this.closeDeleteDialog(),this.showSnackbar("Party deleted successfully","success")}catch(t){console.error("Error deleting party:",t),this.showSnackbar("Error deleting party","error")}},showSnackbar(t,e){this.snackbarText=t,this.snackbarColor=e,this.snackbar=!0}}}),y=k,A=i(1656),b=(0,A.A)(y,g,f,!1,null,null,null),w=b.exports},4155:function(t,e,i){i.d(e,{A:function(){return v}});var s=i(9084),a=i(4462),n=i(9623),o=i(103),r=i(123),l=i(326),c=i(7768),h=i(8734),d=i(3507),u=i(5604),m=i(6960);const p=(0,d.A)(n.A,o.A,r.A,l.A,c.A,a.A);var v=p.extend({name:"v-dialog",directives:{ClickOutside:h.A},props:{dark:Boolean,disabled:Boolean,fullscreen:Boolean,light:Boolean,maxWidth:[String,Number],noClickAnimation:Boolean,origin:{type:String,default:"center center"},persistent:Boolean,retainFocus:{type:Boolean,default:!0},scrollable:Boolean,transition:{type:[String,Boolean],default:"dialog-transition"},width:[String,Number]},data(){return{activatedBy:null,animate:!1,animateTimeout:-1,stackMinZIndex:200,previousActiveElement:null}},computed:{classes(){return{[`v-dialog ${this.contentClass}`.trim()]:!0,"v-dialog--active":this.isActive,"v-dialog--persistent":this.persistent,"v-dialog--fullscreen":this.fullscreen,"v-dialog--scrollable":this.scrollable,"v-dialog--animated":this.animate}},contentClasses(){return{"v-dialog__content":!0,"v-dialog__content--active":this.isActive}},hasActivator(){return Boolean(!!this.$slots.activator||!!this.$scopedSlots.activator)}},watch:{isActive(t){var e;t?(this.show(),this.hideScroll()):(this.removeOverlay(),this.unbind(),null===(e=this.previousActiveElement)||void 0===e||e.focus())},fullscreen(t){this.isActive&&(t?(this.hideScroll(),this.removeOverlay(!1)):(this.showScroll(),this.genOverlay()))}},created(){this.$attrs.hasOwnProperty("full-width")&&(0,u.rq)("full-width",this)},beforeMount(){this.$nextTick((()=>{this.isBooted=this.isActive,this.isActive&&this.show()}))},beforeDestroy(){"undefined"!==typeof window&&this.unbind()},methods:{animateClick(){this.animate=!1,this.$nextTick((()=>{this.animate=!0,window.clearTimeout(this.animateTimeout),this.animateTimeout=window.setTimeout((()=>this.animate=!1),150)}))},closeConditional(t){const e=t.target;return!(this._isDestroyed||!this.isActive||this.$refs.content.contains(e)||this.overlay&&e&&!this.overlay.$el.contains(e))&&this.activeZIndex>=this.getMaxZIndex()},hideScroll(){this.fullscreen?document.documentElement.classList.add("overflow-y-hidden"):r.A.options.methods.hideScroll.call(this)},show(){!this.fullscreen&&!this.hideOverlay&&this.genOverlay(),this.$nextTick((()=>{this.$nextTick((()=>{var t,e;(null===(t=this.$refs.dialog)||void 0===t?void 0:t.contains(document.activeElement))||(this.previousActiveElement=document.activeElement,null===(e=this.$refs.dialog)||void 0===e||e.focus()),this.bind()}))}))},bind(){window.addEventListener("focusin",this.onFocusin)},unbind(){window.removeEventListener("focusin",this.onFocusin)},onClickOutside(t){this.$emit("click:outside",t),this.persistent?this.noClickAnimation||this.animateClick():this.isActive=!1},onKeydown(t){if(t.keyCode===m.uP.esc&&!this.getOpenDependents().length)if(this.persistent)this.noClickAnimation||this.animateClick();else{this.isActive=!1;const t=this.getActivator();this.$nextTick((()=>t&&t.focus()))}this.$emit("keydown",t)},onFocusin(t){if(!t||!this.retainFocus)return;const e=t.target;if(e&&this.$refs.dialog&&![document,this.$refs.dialog].includes(e)&&!this.$refs.dialog.contains(e)&&this.activeZIndex>=this.getMaxZIndex()&&!this.getOpenDependentElements().some((t=>t.contains(e)))){const t=this.$refs.dialog.querySelectorAll('button, [href], input:not([type="hidden"]), select, textarea, [tabindex]:not([tabindex="-1"])'),e=[...t].find((t=>!t.hasAttribute("disabled")&&!t.matches('[tabindex="-1"]')));e&&e.focus()}},genContent(){return this.showLazyContent((()=>[this.$createElement(s.A,{props:{root:!0,light:this.light,dark:this.dark}},[this.$createElement("div",{class:this.contentClasses,attrs:{role:"dialog","aria-modal":this.hideOverlay?void 0:"true",...this.getScopeIdAttrs()},on:{keydown:this.onKeydown},style:{zIndex:this.activeZIndex},ref:"content"},[this.genTransition()])])]))},genTransition(){const t=this.genInnerContent();return this.transition?this.$createElement("transition",{props:{name:this.transition,origin:this.origin,appear:!0}},[t]):t},genInnerContent(){const t={class:this.classes,attrs:{tabindex:this.isActive?0:void 0},ref:"dialog",directives:[{name:"click-outside",value:{handler:this.onClickOutside,closeConditional:this.closeConditional,include:this.getOpenDependentElements}},{name:"show",value:this.isActive}],style:{transformOrigin:this.origin}};return this.fullscreen||(t.style={...t.style,maxWidth:(0,m.Dg)(this.maxWidth),width:(0,m.Dg)(this.width)}),this.$createElement("div",t,this.getContentSlot())}},render(t){return t("div",{staticClass:"v-dialog__container",class:{"v-dialog__container--attached":""===this.attach||!0===this.attach||"attach"===this.attach}},[this.genActivator(),this.genContent()])}})},3021:function(t,e,i){i.d(e,{A:function(){return d}});var s=i(3858),a=i(8767),n=i(3661),o=i(9748),r=i(9923),l=i(3507),c=i(6960),h=i(5604),d=(0,l.A)(s.A,a.A,o.A,(0,r.P)(["absolute","bottom","left","right","top"])).extend({name:"v-snackbar",props:{app:Boolean,centered:Boolean,contentClass:{type:String,default:""},multiLine:Boolean,text:Boolean,timeout:{type:[Number,String],default:5e3},transition:{type:[Boolean,String],default:"v-snack-transition",validator:t=>"string"===typeof t||!1===t},vertical:Boolean},data:()=>({activeTimeout:-1}),computed:{classes(){return{"v-snack--absolute":this.absolute,"v-snack--active":this.isActive,"v-snack--bottom":this.bottom||!this.top,"v-snack--centered":this.centered,"v-snack--has-background":this.hasBackground,"v-snack--left":this.left,"v-snack--multi-line":this.multiLine&&!this.vertical,"v-snack--right":this.right,"v-snack--text":this.text,"v-snack--top":this.top,"v-snack--vertical":this.vertical}},hasBackground(){return!this.text&&!this.outlined},isDark(){return this.hasBackground?!this.light:n.A.options.computed.isDark.call(this)},styles(){if(this.absolute||!this.app)return{};const{bar:t,bottom:e,footer:i,insetFooter:s,left:a,right:n,top:o}=this.$vuetify.application;return{paddingBottom:(0,c.Dg)(e+i+s),paddingLeft:(0,c.Dg)(a),paddingRight:(0,c.Dg)(n),paddingTop:(0,c.Dg)(t+o)}}},watch:{isActive:"setTimeout",timeout:"setTimeout"},mounted(){this.isActive&&this.setTimeout()},created(){this.$attrs.hasOwnProperty("auto-height")&&(0,h.rq)("auto-height",this),0==this.timeout&&(0,h.CI)('timeout="0"',"-1",this)},methods:{genActions(){return this.$createElement("div",{staticClass:"v-snack__action "},[(0,c.$c)(this,"action",{attrs:{class:"v-snack__btn"}})])},genContent(){return this.$createElement("div",{staticClass:"v-snack__content",class:{[this.contentClass]:!0},attrs:{role:"status","aria-live":"polite"}},[(0,c.$c)(this)])},genWrapper(){const t=this.hasBackground?this.setBackgroundColor:this.setTextColor,e=t(this.color,{staticClass:"v-snack__wrapper",class:s.A.options.computed.classes.call(this),style:s.A.options.computed.styles.call(this),directives:[{name:"show",value:this.isActive}],on:{pointerenter:()=>window.clearTimeout(this.activeTimeout),pointerleave:this.setTimeout}});return this.$createElement("div",e,[this.genContent(),this.genActions()])},genTransition(){return this.$createElement("transition",{props:{name:this.transition}},[this.genWrapper()])},setTimeout(){window.clearTimeout(this.activeTimeout);const t=Number(this.timeout);this.isActive&&![0,-1].includes(t)&&(this.activeTimeout=window.setTimeout((()=>{this.isActive=!1}),t))}},render(t){return t("div",{staticClass:"v-snack",class:this.classes,style:this.styles},[!1!==this.transition?this.genTransition():this.genWrapper()])}})},7402:function(t,e,i){i.d(e,{A:function(){return o}});var s=i(9940),a=i(3507);const n=(0,a.A)(s.A);var o=n.extend({name:"v-textarea",props:{autoGrow:Boolean,noResize:Boolean,rowHeight:{type:[Number,String],default:24,validator:t=>!isNaN(parseFloat(t))},rows:{type:[Number,String],default:5,validator:t=>!isNaN(parseInt(t,10))}},computed:{classes(){return{"v-textarea":!0,"v-textarea--auto-grow":this.autoGrow,"v-textarea--no-resize":this.noResizeHandle,...s.A.options.computed.classes.call(this)}},noResizeHandle(){return this.noResize||this.autoGrow}},watch:{autoGrow(t){this.$nextTick((()=>{var e;t?this.calculateInputHeight():null===(e=this.$refs.input)||void 0===e||e.style.removeProperty("height")}))},lazyValue(){this.autoGrow&&this.$nextTick(this.calculateInputHeight)},rowHeight(){this.autoGrow&&this.$nextTick(this.calculateInputHeight)}},mounted(){setTimeout((()=>{this.autoGrow&&this.calculateInputHeight()}),0)},methods:{calculateInputHeight(){const t=this.$refs.input;if(!t)return;t.style.height="0";const e=t.scrollHeight,i=parseInt(this.rows,10)*parseFloat(this.rowHeight);t.style.height=Math.max(i,e)+"px"},genInput(){const t=s.A.options.methods.genInput.call(this);return t.tag="textarea",delete t.data.attrs.type,t.data.attrs.rows=this.rows,t},onInput(t){s.A.options.methods.onInput.call(this,t),this.autoGrow&&this.calculateInputHeight()},onKeyDown(t){this.isFocused&&13===t.keyCode&&t.stopPropagation(),this.$emit("keydown",t)}}})}}]);
//# sourceMappingURL=83.a098d560.js.map