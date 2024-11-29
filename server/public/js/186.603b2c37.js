"use strict";(self["webpackChunkclient"]=self["webpackChunkclient"]||[]).push([[186],{1186:function(t,e,s){s.r(e),s.d(e,{default:function(){return T}});var i=s(1965),o=s(3740),n=s(48),a=n.C.extend({name:"button-group",provide(){return{btnToggle:this}},computed:{classes(){return n.C.options.computed.classes.call(this)}},methods:{genData:n.C.options.methods.genData}}),r=s(8743),l=s(5803),c=(0,l.A)(a,r.A).extend({name:"v-btn-toggle",props:{backgroundColor:String,borderless:Boolean,dense:Boolean,group:Boolean,rounded:Boolean,shaped:Boolean,tile:Boolean},computed:{classes(){return{...a.options.computed.classes.call(this),"v-btn-toggle":!0,"v-btn-toggle--borderless":this.borderless,"v-btn-toggle--dense":this.dense,"v-btn-toggle--group":this.group,"v-btn-toggle--rounded":this.rounded,"v-btn-toggle--shaped":this.shaped,"v-btn-toggle--tile":this.tile,...this.themeClasses}}},methods:{genData(){const t=this.setTextColor(this.color,{...a.options.methods.genData.call(this)});return this.group?t:this.setBackgroundColor(this.backgroundColor,t)}}}),d=s(3698),u=s(2938),h=s(3180),p=s(4414),m=s(3449),g=s(9483),v=s(152),y=s(6930),f=s(5420),_=s(8924),C=s(8907),b=s(1554),A=s(2756),x=s(4312),B=function(){var t=this,e=t._self._c;return e("div",[e(m.A,[e(d.A,{staticClass:"mb-6 primary",attrs:{dark:""}},[e(u.OQ,{staticClass:"text-center"},[e("h1",{staticClass:"text-h4 font-weight-bold mb-2"},[t._v(" MEET THE CANDIDATES ")]),e("p",{staticClass:"subtitle-1 mb-0"},[t._v("View candidates for all elections")])])],1),e(o.A,{staticClass:"mb-6",attrs:{color:"primary",outlined:""},on:{click:function(e){return t.$router.go(-1)}}},[e(y.A,{attrs:{left:""}},[t._v("mdi-arrow-left")]),t._v(" Back ")],1),e(d.A,{staticClass:"mb-6"},[e(u.OQ,[e(c,{staticClass:"mb-4",attrs:{mandatory:"",color:"primary"},model:{value:t.viewType,callback:function(e){t.viewType=e},expression:"viewType"}},[e(o.A,{attrs:{value:"positions"}},[e(y.A,{attrs:{left:""}},[t._v("mdi-account-group")]),t._v(" By Positions ")],1),e(o.A,{attrs:{value:"parties"}},[e(y.A,{attrs:{left:""}},[t._v("mdi-flag")]),t._v(" By Parties ")],1)],1),e(x.A,{attrs:{items:t.electionTypes,label:"Select Election Status",outlined:""},on:{change:t.fetchElectionsByType},model:{value:t.selectedElectionType,callback:function(e){t.selectedElectionType=e},expression:"selectedElectionType"}}),t.elections.length>0?e(x.A,{attrs:{items:t.elections,"item-text":"name","item-value":"_id",label:"Select Election",outlined:""},on:{change:t.fetchCandidates},scopedSlots:t._u([{key:"selection",fn:function({item:e}){return[t._v(" "+t._s(e.name)+" ")]}},{key:"item",fn:function({item:s}){return[e(_.pr,[e(_.UZ,[t._v(t._s(s.name))]),e(_.w,[t._v(" "+t._s(t.formatDateRange(s.startDate,s.endDate))+" ")])],1)]}}],null,!1,4283173076),model:{value:t.selectedElectionId,callback:function(e){t.selectedElectionId=e},expression:"selectedElectionId"}}):t._e()],1)],1),e(C.A,{attrs:{value:t.loading}},[e(b.A,{attrs:{indeterminate:"",size:"64"}})],1),t.error?e(i.A,{staticClass:"mb-4",attrs:{type:"error",dismissible:""},on:{input:function(e){t.error=null}}},[t._v(" "+t._s(t.error)+" ")]):t._e(),t.loading||0!==t.candidates.length?t._e():e(d.A,{staticClass:"text-center pa-6"},[e(y.A,{staticClass:"mb-2",attrs:{large:"",color:"grey"}},[t._v("mdi-account-question")]),e("div",{staticClass:"text-h6 grey--text"},[t._v(" "+t._s(t.selectedElectionType?t.selectedElectionId?"No candidates found for this election":"Please select an election":"Please select an election status")+" ")])],1),"positions"===t.viewType&&t.candidates.length>0?t._l(t.groupedCandidatesByPosition,(function(s,i){return e(d.A,{key:i,staticClass:"mb-6"},[e(u.ri,{staticClass:"primary--text d-flex align-center"},[e(y.A,{attrs:{left:"",color:"primary"}},[t._v("mdi-account-group")]),t._v(" "+t._s(i.toUpperCase())+" ")],1),e(u.OQ,[e(A.A,t._l(s,(function(s){return e(p.A,{key:s._id,attrs:{cols:"12",sm:"6",md:"4"}},[e(v.A,{scopedSlots:t._u([{key:"default",fn:function({hover:i}){return[e(d.A,{staticClass:"candidate-card",class:{"elevation-4":i},attrs:{outlined:""}},[e(f.A,{staticClass:"rounded-circle ma-4",attrs:{src:s.imageUrl,height:"200px",contain:""},scopedSlots:t._u([{key:"placeholder",fn:function(){return[e(A.A,{staticClass:"fill-height ma-0",attrs:{align:"center",justify:"center"}},[e(b.A,{attrs:{indeterminate:""}})],1)]},proxy:!0}],null,!0)}),e(u.ri,{staticClass:"justify-center text-h6 text-center"},[t._v(" "+t._s(t.getFullName(s.studentId).toUpperCase())+" ")]),e(u.ZR,{staticClass:"text-center"},[t._v(" "+t._s(s.position.toUpperCase())+" ")]),e(u.OQ,[e(g.A,{staticClass:"mb-3"}),s.partyId?e("div",{staticClass:"text-center mb-3"},[e(h.A,{attrs:{color:"primary",small:""}},[t._v(" Party: "+t._s(s.partyId.name)+" ")])],1):t._e(),e("div",{staticClass:"text-subtitle-1 font-weight-medium mb-2"},[t._v(" Campaign Message: ")]),e("div",{staticClass:"manifesto-preview"},[t._v(" "+t._s(s.manifesto)+" ")])],1)],1)]}}],null,!0)})],1)})),1)],1)],1)})):t._e(),"parties"===t.viewType&&t.candidates.length>0?t._l(t.groupedCandidatesByParty,(function(s,i){return e(d.A,{key:i,staticClass:"mb-6"},[e(u.ri,{staticClass:"primary--text d-flex align-center"},[e(y.A,{attrs:{left:"",color:"primary"}},[t._v("mdi-flag")]),t._v(" "+t._s(i||"Independent Candidates")+" ")],1),e(u.OQ,[e(A.A,t._l(s,(function(s){return e(p.A,{key:s._id,attrs:{cols:"12",sm:"6",md:"4"}},[e(v.A,{scopedSlots:t._u([{key:"default",fn:function({hover:i}){return[e(d.A,{staticClass:"candidate-card",class:{"elevation-4":i},attrs:{outlined:""}},[e(f.A,{staticClass:"rounded-circle ma-4",attrs:{src:s.imageUrl,height:"200px",contain:""},scopedSlots:t._u([{key:"placeholder",fn:function(){return[e(A.A,{staticClass:"fill-height ma-0",attrs:{align:"center",justify:"center"}},[e(b.A,{attrs:{indeterminate:""}})],1)]},proxy:!0}],null,!0)}),e(u.ri,{staticClass:"justify-center text-h6 text-center"},[t._v(" "+t._s(t.getFullName(s.studentId).toUpperCase())+" ")]),e(u.ZR,{staticClass:"text-center"},[t._v(" "+t._s(s.position.toUpperCase())+" ")]),e(u.OQ,[e(g.A,{staticClass:"mb-3"}),s.partyId?e("div",{staticClass:"text-center mb-3"},[e(h.A,{attrs:{color:"primary",small:""}},[t._v(" Party: "+t._s(s.partyId.name)+" ")])],1):t._e(),e("div",{staticClass:"text-subtitle-1 font-weight-medium mb-2"},[t._v(" Campaign Message: ")]),e("div",{staticClass:"manifesto-preview"},[t._v(" "+t._s(s.manifesto)+" ")])],1)],1)]}}],null,!0)})],1)})),1)],1)],1)})):t._e()],2)],1)},E=[],$=(s(4114),{data(){return{viewType:"positions",candidates:[],elections:[],selectedElectionId:null,selectedElectionType:null,electionTypes:[{text:"Ongoing Elections",value:"ongoing"},{text:"Upcoming Elections",value:"upcoming"},{text:"Completed Elections",value:"completed"}],loading:!1,error:null}},computed:{groupedCandidatesByPosition(){return this.candidates.reduce(((t,e)=>(t[e.position]||(t[e.position]=[]),t[e.position].push(e),t)),{})},groupedCandidatesByParty(){return this.candidates.reduce(((t,e)=>{const s=e.partyId?.name||"Independent";return t[s]||(t[s]=[]),t[s].push(e),t}),{})}},methods:{formatDateRange(t,e){const s={year:"numeric",month:"short",day:"numeric"},i=new Date(t).toLocaleDateString(void 0,s),o=new Date(e).toLocaleDateString(void 0,s);return`${i} - ${o}`},async fetchElectionsByType(){if(this.selectedElectionType){this.loading=!0,this.selectedElectionId=null,this.candidates=[];try{const t=await this.$http.get(`/election/${this.selectedElectionType}/events`);this.elections=t.data}catch(t){console.error("Error fetching elections:",t),this.error="Failed to load elections list"}finally{this.loading=!1}}},async fetchCandidates(){if(this.selectedElectionId){this.loading=!0;try{const t=await this.$http.get(`/candidate/ongoing/election/${this.selectedElectionId}`);this.candidates=t.data,console.log(this.candidates)}catch(t){console.error("Error fetching candidates:",t),this.error="Failed to load candidates. Please try again later."}finally{this.loading=!1}}else this.candidates=[]},getFullName(t){return t?`${t.firstName} ${t.middleName} ${t.lastName}`:""}}}),k=$,I=s(1656),S=(0,I.A)(k,B,E,!1,null,"646c0eaf",null),T=S.exports},1965:function(t,e,s){s.d(e,{A:function(){return p}});var i=s(9375),o=s(4728),n=s(569),a=s(428),r=s(3381),l=s(5471),c=l.Ay.extend({name:"transitionable",props:{mode:String,origin:String,transition:String}}),d=s(5803),u=s(6988),h=s(4152),p=(0,d.A)(i.A,a.A,c).extend({name:"v-alert",props:{border:{type:String,validator(t){return["top","right","bottom","left"].includes(t)}},closeLabel:{type:String,default:"$vuetify.close"},coloredBorder:Boolean,dense:Boolean,dismissible:Boolean,closeIcon:{type:String,default:"$cancel"},icon:{default:"",type:[Boolean,String],validator(t){return"string"===typeof t||!1===t}},outlined:Boolean,prominent:Boolean,text:Boolean,type:{type:String,validator(t){return["info","error","success","warning"].includes(t)}},value:{type:Boolean,default:!0}},computed:{__cachedBorder(){if(!this.border)return null;let t={staticClass:"v-alert__border",class:{[`v-alert__border--${this.border}`]:!0}};return this.coloredBorder&&(t=this.setBackgroundColor(this.computedColor,t),t.class["v-alert__border--has-color"]=!0),this.$createElement("div",t)},__cachedDismissible(){if(!this.dismissible)return null;const t=this.iconColor;return this.$createElement(o.A,{staticClass:"v-alert__dismissible",props:{color:t,icon:!0,small:!0},attrs:{"aria-label":this.$vuetify.lang.t(this.closeLabel)},on:{click:()=>this.isActive=!1}},[this.$createElement(n.A,{props:{color:t}},this.closeIcon)])},__cachedIcon(){return this.computedIcon?this.$createElement(n.A,{staticClass:"v-alert__icon",props:{color:this.iconColor}},this.computedIcon):null},classes(){const t={...i.A.options.computed.classes.call(this),"v-alert--border":Boolean(this.border),"v-alert--dense":this.dense,"v-alert--outlined":this.outlined,"v-alert--prominent":this.prominent,"v-alert--text":this.text};return this.border&&(t[`v-alert--border-${this.border}`]=!0),t},computedColor(){return this.color||this.type},computedIcon(){return!1!==this.icon&&("string"===typeof this.icon&&this.icon?this.icon:!!["error","info","success","warning"].includes(this.type)&&`$${this.type}`)},hasColoredIcon(){return this.hasText||Boolean(this.border)&&this.coloredBorder},hasText(){return this.text||this.outlined},iconColor(){return this.hasColoredIcon?this.computedColor:void 0},isDark(){return!(!this.type||this.coloredBorder||this.outlined)||r.A.options.computed.isDark.call(this)}},created(){this.$attrs.hasOwnProperty("outline")&&(0,u.q4)("outline","outlined",this)},methods:{genWrapper(){const t=[(0,h.$c)(this,"prepend")||this.__cachedIcon,this.genContent(),this.__cachedBorder,(0,h.$c)(this,"append"),this.$scopedSlots.close?this.$scopedSlots.close({toggle:this.toggle}):this.__cachedDismissible],e={staticClass:"v-alert__wrapper"};return this.$createElement("div",e,t)},genContent(){return this.$createElement("div",{staticClass:"v-alert__content"},(0,h.$c)(this))},genAlert(){let t={staticClass:"v-alert",attrs:{role:"alert"},on:this.listeners$,class:this.classes,style:this.styles,directives:[{name:"show",value:this.isActive}]};if(!this.coloredBorder){const e=this.hasText?this.setTextColor:this.setBackgroundColor;t=e(this.computedColor,t)}return this.$createElement("div",t,[this.genWrapper()])},toggle(){this.isActive=!this.isActive}},render(t){const e=this.genAlert();return this.transition?t("transition",{props:{name:this.transition,origin:this.origin,mode:this.mode}},[e]):e}})},152:function(t,e,s){var i=s(7391),o=s(428),n=s(5803),a=s(6988);e.A=(0,n.A)(i.A,o.A).extend({name:"v-hover",props:{disabled:{type:Boolean,default:!1},value:{type:Boolean,default:void 0}},methods:{onMouseEnter(){this.runDelay("open")},onMouseLeave(){this.runDelay("close")}},render(){if(!this.$scopedSlots.default&&void 0===this.value)return(0,a.OP)("v-hover is missing a default scopedSlot or bound value",this),null;let t;return this.$scopedSlots.default&&(t=this.$scopedSlots.default({hover:this.isActive})),Array.isArray(t)&&1===t.length&&(t=t[0]),t&&!Array.isArray(t)&&t.tag?(this.disabled||(t.data=t.data||{},this._g(t.data,{mouseenter:this.onMouseEnter,mouseleave:this.onMouseLeave})),t):((0,a.OP)("v-hover should only contain a single element",this),t)}})}}]);
//# sourceMappingURL=186.603b2c37.js.map