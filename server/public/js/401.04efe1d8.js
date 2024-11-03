"use strict";(self["webpackChunkclient"]=self["webpackChunkclient"]||[]).push([[401],{401:function(t,e,s){s.r(e),s.d(e,{default:function(){return w}});var a=s(4112),i=s(3740),o=s(3698),r=s(2938),n=s(3180),l=s(4414),c=s(3449),m=s(6930),u=s(5420),d=s(2756),f=function(){var t=this,e=t._self._c;return e(c.A,[e(d.A,{staticClass:"fill-height",attrs:{justify:"center",align:"center"}},[e(l.A,{attrs:{cols:"12",md:"8",lg:"6"}},[e(o.A,{staticClass:"text-center pa-6 success-card"},[e(r.OQ,[e(a.A,{staticClass:"mb-6",attrs:{size:"120"}},[e(u.A,{attrs:{src:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQBY1UftFxb9DVTzyUN8YWM5YnAwF0pOKOG4A&s",alt:"Success"},scopedSlots:t._u([{key:"placeholder",fn:function(){return[e(m.A,{attrs:{size:"80",color:"success"}},[t._v("mdi-check-circle")])]},proxy:!0}])})],1),e("h1",{staticClass:"text-h4 font-weight-bold success--text mb-4"},[t._v(" Vote Submitted Successfully! ")]),e("p",{staticClass:"text-subtitle-1 grey--text text--darken-1 mb-6"},[t._v(" Thank you for participating in the student election. Your vote has been recorded. ")]),e(o.A,{staticClass:"mb-6",attrs:{outlined:""}},[e(r.OQ,[e(d.A,{staticClass:"mb-2",attrs:{align:"center"}},[e(l.A,{staticClass:"text-sm-right grey--text",attrs:{cols:"12",sm:"4"}},[t._v(" Election: ")]),e(l.A,{staticClass:"text-sm-left font-weight-medium",attrs:{cols:"12",sm:"8"}},[t._v(" "+t._s(t.electionDetails?.name||"Student Election")+" ")])],1),e(d.A,{staticClass:"mb-2",attrs:{align:"center"}},[e(l.A,{staticClass:"text-sm-right grey--text",attrs:{cols:"12",sm:"4"}},[t._v(" Date Submitted: ")]),e(l.A,{staticClass:"text-sm-left font-weight-medium",attrs:{cols:"12",sm:"8"}},[t._v(" "+t._s(t.formatDate(new Date))+" ")])],1),e(d.A,{attrs:{align:"center"}},[e(l.A,{staticClass:"text-sm-right grey--text",attrs:{cols:"12",sm:"4"}},[t._v(" Reference ID: ")]),e(l.A,{staticClass:"text-sm-left",attrs:{cols:"12",sm:"8"}},[e(n.A,{staticClass:"font-weight-medium",attrs:{small:"",color:"primary"}},[t._v(" "+t._s(t.generateReferenceId())+" ")])],1)],1)],1)],1),e(r.SL,{staticClass:"justify-center"},[e(i.A,{staticClass:"mr-2",attrs:{color:"primary",outlined:"",to:{path:"/election/portal"}}},[e(m.A,{attrs:{left:""}},[t._v("mdi-home")]),t._v(" Back to Home ")],1),e(i.A,{attrs:{color:"primary",to:{name:"ElectionResults",params:{id:t.electionId}},disabled:!t.showResults}},[e(m.A,{attrs:{left:""}},[t._v("mdi-poll")]),t._v(" View Results ")],1)],1)],1)],1)],1)],1),t.showConfetti?e("vue-confetti",{attrs:{config:t.confettiConfig}}):t._e()],1)},h=[],g=s(6044),p=s.n(g),C={name:"VoteSuccess",components:{VueConfetti:p()},data(){return{electionDetails:null,showConfetti:!0,loading:!1,error:null,socialSharing:[{type:"facebook",icon:"mdi-facebook",color:"blue darken-4"},{type:"twitter",icon:"mdi-twitter",color:"light-blue"},{type:"whatsapp",icon:"mdi-whatsapp",color:"green"}],confettiConfig:{angle:90,spread:100,startVelocity:45,elementCount:70,dragFriction:.1,duration:3e3,delay:0,width:"10px",height:"10px",colors:["#ff0000","#00ff00","#0000ff"]}}},computed:{electionId(){return this.$route.params.id},showResults(){return this.electionDetails?.showResults||!1}},methods:{async fetchElectionDetails(){this.loading=!0;try{const t=await this.$http.get(`/election/${this.electionId}`);this.electionDetails=t.data}catch(t){console.error("Error fetching election details:",t),this.error="Failed to load election details"}finally{this.loading=!1}},formatDate(t){return new Intl.DateTimeFormat("en-US",{dateStyle:"long",timeStyle:"short"}).format(t)},generateReferenceId(){const t=Date.now().toString(36),e=Math.random().toString(36).substring(2,8);return`VOTE-${t}-${e}`.toUpperCase()},startConfetti(){this.$confetti.start(),setTimeout((()=>{this.$confetti.stop()}),3e3)}},async created(){await this.fetchElectionDetails()},mounted(){this.startConfetti()},beforeDestroy(){this.$confetti.stop()}},y=C,A=s(1656),b=(0,A.A)(y,f,h,!1,null,"44175854",null),w=b.exports}}]);
//# sourceMappingURL=401.04efe1d8.js.map