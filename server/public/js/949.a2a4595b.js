"use strict";(self["webpackChunkclient"]=self["webpackChunkclient"]||[]).push([[949],{9949:function(t,e,s){s.r(e),s.d(e,{default:function(){return b}});var a=s(3740),i=s(3698),o=s(2938),l=s(4414),n=s(3449),r=s(6930),c=s(8983),d=s(7296),u=s(2659),g=s(3138),m=s(1376),h=s(8907),v=s(1554),p=s(2756),C=s(8184),_=function(){var t=this,e=t._self._c;return e(n.A,[e(p.A,{attrs:{align:"center",justify:"center"}},[e(l.A,{attrs:{cols:"12",md:"8",lg:"6"}},[e(i.A,{staticClass:"mt-5 text-center primary-gradient"},[e(o.ri,{staticClass:"justify-center display-1 font-weight-bold white--text"},[t._v(" Welcome to the Student Elections Portal ")]),e(o.OQ,[e("p",{staticClass:"subtitle-1 white--text"},[t._v(" Make your voice heard! Participate in shaping the future of our student community. ")])])],1)],1)],1),e(p.A,{staticClass:"mt-10"},[e(l.A,{attrs:{cols:"12"}},[t.ongoingElections.length>0?e(i.A,{staticClass:"elevation-2"},[e(o.ri,{staticClass:"headline primary--text"},[e(r.A,{staticClass:"mr-2",attrs:{large:"",color:"primary"}},[t._v("mdi-vote")]),t._v(" Ongoing Elections ")],1),e(o.OQ,[e(p.A,t._l(t.ongoingElections,(function(s){return e(l.A,{key:s._id,attrs:{cols:"12",md:"4"}},[e(i.A,{staticClass:"h-100",attrs:{outlined:""}},[e(o.ri,{staticClass:"subtitle-1 font-weight-bold"},[t._v(" "+t._s(s.name)+" ")]),e(o.OQ,[e(d.A,{attrs:{"two-line":"",dense:""}},[e(m.pr,[e(m.w,{staticClass:"mb-1"},[e(r.A,{staticClass:"mr-1",attrs:{small:""}},[t._v("mdi-calendar")]),t._v(" "+t._s(t.formatDateRange(s.startDate,s.endDate))+" ")],1),e(m.w,[e(r.A,{staticClass:"mr-1",attrs:{small:""}},[t._v("mdi-tag")]),t._v(" "+t._s(s.electionType)+" ")],1)],1)],1)],1),e(o.SL,{staticClass:"justify-center pb-4"},[e(a.A,{attrs:{color:"primary",outlined:"",rounded:""},on:{click:function(e){return t.goToVoting(s._id)}}},[e(r.A,{attrs:{left:""}},[t._v("mdi-vote")]),t._v(" Cast Your Vote ")],1)],1)],1)],1)})),1)],1)],1):e(i.A,{staticClass:"text-center pa-6"},[e(r.A,{staticClass:"mb-2",attrs:{large:"",color:"grey"}},[t._v("mdi-calendar-blank")]),e("div",{staticClass:"text-h6 grey--text"},[t._v(" No ongoing elections at the moment ")]),e("div",{staticClass:"text-subtitle-1 grey--text text--darken-1"},[t._v(" Please check back later for upcoming elections ")])],1)],1)],1),e(p.A,{staticClass:"mt-10"},[e(l.A,{attrs:{cols:"12",md:"6"}},[e(i.A,{staticClass:"elevation-2",attrs:{height:"100%",hover:""}},[e(o.ri,{staticClass:"justify-center headline"},[e(r.A,{staticClass:"mr-2",attrs:{large:"",color:"success"}},[t._v("mdi-poll")]),t._v(" Election Results ")],1),e(o.OQ,[t.completedElections.length>0?e(c.A,t._l(t.completedElections,(function(s){return e(d.A,{key:s._id,staticClass:"mb-2",on:{click:function(e){return t.viewElectionResults(s._id)}}},[e(g.A,[e(r.A,{attrs:{color:t.getElectionStatusColor(s.status),large:""}},[t._v(" mdi-chart-bar ")])],1),e(m.pr,[e(m.UZ,{staticClass:"font-weight-medium"},[t._v(" "+t._s(s.name)+" ")]),e(m.w,[e(r.A,{staticClass:"mr-1",attrs:{small:""}},[t._v("mdi-calendar")]),t._v(" "+t._s(t.formatDateRange(s.startDate,s.endDate))+" ")],1)],1),e(u.A,[e(a.A,{attrs:{color:"success",outlined:"",small:""},on:{click:function(e){return e.stopPropagation(),t.viewElectionResults(s._id)}}},[t._v(" View Results ")])],1)],1)})),1):e(C.A,{staticClass:"text-center pa-4"},[e(r.A,{staticClass:"mb-2",attrs:{large:"",color:"grey"}},[t._v("mdi-poll-box-outline")]),e("div",{staticClass:"text-subtitle-1 grey--text text--darken-1"},[t._v(" No election results available yet ")])],1)],1),e(h.A,{attrs:{value:t.loadingResults,absolute:""}},[e(v.A,{attrs:{indeterminate:""}})],1)],1)],1),e(l.A,{attrs:{cols:"12",md:"6"}},[e(i.A,{staticClass:"elevation-2",attrs:{height:"100%",hover:""}},[e(o.ri,{staticClass:"justify-center headline"},[e(r.A,{staticClass:"mr-2",attrs:{large:"",color:"info"}},[t._v("mdi-account-group")]),t._v(" Candidate Information ")],1),e(o.OQ,{staticClass:"text-center"},[e("p",{staticClass:"mb-6"},[t._v(" Learn about the candidates running for various positions. ")]),e(a.A,{attrs:{color:"primary",large:"",rounded:"",dark:""},on:{click:t.viewCandidates}},[e(r.A,{attrs:{left:""}},[t._v("mdi-account-details")]),t._v(" Meet the Candidates ")],1)],1)],1)],1)],1)],1)},f=[],A=(s(4114),{data(){return{ongoingElections:[],completedElections:[],loading:!1,loadingResults:!1,error:null}},methods:{formatDateRange(t,e){const s={year:"numeric",month:"short",day:"numeric"},a=new Date(t).toLocaleDateString(void 0,s),i=new Date(e).toLocaleDateString(void 0,s);return`${a} - ${i}`},getElectionStatusColor(t){const e={completed:"success",ongoing:"warning",upcoming:"info"};return e[t]||"grey"},async goToVoting(t){try{await this.$router.push(`/election/portal/votes/${t}`)}catch(e){console.error("Navigation error:",e)}},async fetchCompletedElections(){console.log("test"),this.loadingResults=!0;try{const t=await this.$http.get("/election/completed/events");this.completedElections=t.data}catch(t){console.error("Error fetching completed elections:",t),alert("Failed to load election results")}finally{this.loadingResults=!1}},async viewElectionResults(t){try{await this.$router.push(`/election/results/${t}`)}catch(e){console.error("Navigation error:",e)}},viewCandidates(){this.$router.push("/election/portal/candidates")},async fetchOngoingElections(){this.loading=!0;try{const t=await this.$http.get("/election/ongoing/events");this.ongoingElections=t.data}catch(t){console.error("Error fetching ongoing elections:",t),this.error="Failed to load elections. Please try again later."}finally{this.loading=!1}}},async created(){await Promise.all([this.fetchOngoingElections(),this.fetchCompletedElections()])}}),y=A,w=s(1656),E=(0,w.A)(y,_,f,!1,null,"7914229a",null),b=E.exports}}]);
//# sourceMappingURL=949.a2a4595b.js.map