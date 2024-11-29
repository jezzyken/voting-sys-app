"use strict";(self["webpackChunkclient"]=self["webpackChunkclient"]||[]).push([[613],{9613:function(t,e,a){a.r(e),a.d(e,{default:function(){return _}});var s=a(3740),r=a(3698),o=a(2938),n=a(3180),i=a(4414),l=a(3449),c=a(6814),d=a(5961),u=a(6930),h=a(8907),m=a(3299),p=a(2756),v=a(4312),f=a(7112),g=function(){var t=this,e=t._self._c;return e(l.A,{attrs:{fluid:""}},[e(r.A,{staticClass:"report-card",attrs:{elevation:"2"}},[e(o.ri,{staticClass:"report-header pa-6"},[e("div",{staticClass:"d-flex flex-wrap justify-space-between align-center w-100"},[e("div",{staticClass:"text-h4 primary--text font-weight-bold"},[t._v(" Voting Status Report ")]),e("div",{staticClass:"d-flex align-center"},[e(v.A,{staticClass:"election-select mr-4",attrs:{items:t.elections,"item-text":"name","item-value":"_id",label:"Select Election",outlined:"",dense:"","hide-details":"",loading:!t.elections.length},on:{change:t.generateReport},scopedSlots:t._u([{key:"prepend",fn:function(){return[e(u.A,{attrs:{color:"primary"}},[t._v("mdi-vote")])]},proxy:!0}]),model:{value:t.selectedElection,callback:function(e){t.selectedElection=e},expression:"selectedElection"}}),e(s.A,{staticClass:"export-button align-self-end",attrs:{color:"primary",disabled:!t.reportData.length,elevation:"2"},on:{click:t.exportToExcel}},[e(u.A,{attrs:{left:""}},[t._v("mdi-microsoft-excel")]),t._v(" Export to Excel "),e(d.mM,[t.reportData.length?t._e():e(h.A,{staticClass:"export-overlay",attrs:{absolute:"",opacity:"0.2"}})],1)],1)],1)])]),e(o.OQ,{staticClass:"pa-6"},[e(p.A,[e(i.A,{attrs:{cols:"12",sm:"6",md:"3"}},[e(r.A,{staticClass:"summary-card primary",attrs:{outlined:""}},[e(o.OQ,{staticClass:"text-center py-6"},[e("div",{staticClass:"text-subtitle-1 white--text mb-2"},[t._v(" Total Students ")]),e("div",{staticClass:"text-h3 white--text font-weight-bold"},[t._v(" "+t._s(t.summary.totalStudents)+" ")])])],1)],1),e(i.A,{attrs:{cols:"12",sm:"6",md:"3"}},[e(r.A,{staticClass:"summary-card success",attrs:{outlined:""}},[e(o.OQ,{staticClass:"text-center py-6"},[e("div",{staticClass:"text-subtitle-1 white--text mb-2"},[t._v("Voted")]),e("div",{staticClass:"text-h3 white--text font-weight-bold"},[t._v(" "+t._s(t.summary.voted)+" ")])])],1)],1),e(i.A,{attrs:{cols:"12",sm:"6",md:"3"}},[e(r.A,{staticClass:"summary-card error",attrs:{outlined:""}},[e(o.OQ,{staticClass:"text-center py-6"},[e("div",{staticClass:"text-subtitle-1 white--text mb-2"},[t._v("Not Voted")]),e("div",{staticClass:"text-h3 white--text font-weight-bold"},[t._v(" "+t._s(t.summary.notVoted)+" ")])])],1)],1),e(i.A,{attrs:{cols:"12",sm:"6",md:"3"}},[e(r.A,{staticClass:"summary-card teal darken-1",attrs:{outlined:""}},[e(o.OQ,{staticClass:"text-center py-6"},[e("div",{staticClass:"text-subtitle-1 white--text mb-2"},[t._v(" Voting Progress ")]),e("div",{staticClass:"text-h3 white--text font-weight-bold"},[t._v(" "+t._s(t.summary.votingPercentage)+"% ")])])],1)],1)],1),e(r.A,{staticClass:"mt-6",attrs:{outlined:""}},[e(o.ri,[e(f.A,{staticClass:"table-search",attrs:{"prepend-inner-icon":"mdi-magnify",label:"Search Students","single-line":"","hide-details":"",filled:"",rounded:"",dense:""},model:{value:t.search,callback:function(e){t.search=e},expression:"search"}})],1),e(c.A,{staticClass:"elevation-0",attrs:{headers:t.headers,items:t.reportData,search:t.search,loading:t.loading,"items-per-page":10,"footer-props":{"items-per-page-options":[10,25,50,100],"show-current-page":!0,"show-first-last-page":!0}},scopedSlots:t._u([{key:"item.hasVoted",fn:function({item:a}){return[e(n.A,{staticClass:"font-weight-medium",attrs:{color:a.hasVoted?"success":"error",small:"",label:""}},[e(u.A,{attrs:{left:"",small:""}},[t._v(" "+t._s(a.hasVoted?"mdi-check":"mdi-close")+" ")]),t._v(" "+t._s(a.hasVoted?"Voted":"Not Voted")+" ")],1)]}},{key:"progress",fn:function(){return[e(m.A,{attrs:{indeterminate:"",color:"primary"}})]},proxy:!0}])})],1)],1)],1)],1)},y=[],x=(a(4114),a(4603),a(7566),a(8721),{name:"VotingReport",data:()=>({selectedElection:null,elections:[],reportData:[],loading:!1,search:"",summary:{totalStudents:0,voted:0,notVoted:0,votingPercentage:0},headers:[{text:"Student No.",value:"studentNo"},{text:"First Name",value:"firstName"},{text:"Last Name",value:"lastName"},{text:"Program",value:"program"},{text:"Year Level",value:"yearLevel"},{text:"Voting Status",value:"hasVoted"}]}),async created(){await this.fetchElections()},methods:{async fetchElections(){try{const t=await this.$http.get("/election");console.log(t),this.elections=t.data.data.items}catch(t){console.error("Error fetching elections:",t)}},async generateReport(){if(this.selectedElection){this.loading=!0;try{const t=await this.$http.get(`/report/voting-status/${this.selectedElection}`);console.log(t),this.reportData=t.data.data,this.summary=t.data.summary}catch(t){console.error("Error generating report:",t)}finally{this.loading=!1}}},exportToExcel(){const t=this.reportData.map((t=>({"Student No.":t.studentNo,"First Name":t.firstName,"Last Name":t.lastName,Program:t.program,"Year Level":t.yearLevel,"Voting Status":t.hasVoted?"Voted":"Not Voted"}))),e=this.convertToCSV(t),a=new Blob([e],{type:"text/csv;charset=utf-8;"}),s=document.createElement("a");s.href=URL.createObjectURL(a),s.download=`voting_report_${(new Date).toISOString()}.csv`,s.click()},convertToCSV(t){const e=Object.keys(t[0]),a=[];a.push(e.join(","));for(const s of t){const t=e.map((t=>{const e=s[t];return`"${e}"`}));a.push(t.join(","))}return a.join("\n")}}}),b=x,w=a(1656),C=(0,w.A)(b,g,y,!1,null,"e883c3bc",null),_=C.exports},6955:function(t,e,a){var s=a(2140),r=a(4901),o=a(2195),n=a(8227),i=n("toStringTag"),l=Object,c="Arguments"===o(function(){return arguments}()),d=function(t,e){try{return t[e]}catch(a){}};t.exports=s?o:function(t){var e,a,s;return void 0===t?"Undefined":null===t?"Null":"string"==typeof(a=d(e=l(t),i))?a:c?o(e):"Object"===(s=o(e))&&r(e.callee)?"Arguments":s}},2106:function(t,e,a){var s=a(283),r=a(4913);t.exports=function(t,e,a){return a.get&&s(a.get,e,{getter:!0}),a.set&&s(a.set,e,{setter:!0}),r.f(t,e,a)}},2140:function(t,e,a){var s=a(8227),r=s("toStringTag"),o={};o[r]="z",t.exports="[object z]"===String(o)},655:function(t,e,a){var s=a(6955),r=String;t.exports=function(t){if("Symbol"===s(t))throw new TypeError("Cannot convert a Symbol value to a string");return r(t)}},2812:function(t){var e=TypeError;t.exports=function(t,a){if(t<a)throw new e("Not enough arguments");return t}},4603:function(t,e,a){var s=a(6840),r=a(9504),o=a(655),n=a(2812),i=URLSearchParams,l=i.prototype,c=r(l.append),d=r(l["delete"]),u=r(l.forEach),h=r([].push),m=new i("a=1&a=2&b=3");m["delete"]("a",1),m["delete"]("b",void 0),m+""!=="a=2"&&s(l,"delete",(function(t){var e=arguments.length,a=e<2?void 0:arguments[1];if(e&&void 0===a)return d(this,t);var s=[];u(this,(function(t,e){h(s,{key:e,value:t})})),n(e,1);var r,i=o(t),l=o(a),m=0,p=0,v=!1,f=s.length;while(m<f)r=s[m++],v||r.key===i?(v=!0,d(this,r.key)):p++;while(p<f)r=s[p++],r.key===i&&r.value===l||c(this,r.key,r.value)}),{enumerable:!0,unsafe:!0})},7566:function(t,e,a){var s=a(6840),r=a(9504),o=a(655),n=a(2812),i=URLSearchParams,l=i.prototype,c=r(l.getAll),d=r(l.has),u=new i("a=1");!u.has("a",2)&&u.has("a",void 0)||s(l,"has",(function(t){var e=arguments.length,a=e<2?void 0:arguments[1];if(e&&void 0===a)return d(this,t);var s=c(this,t);n(e,1);var r=o(a),i=0;while(i<s.length)if(s[i++]===r)return!0;return!1}),{enumerable:!0,unsafe:!0})},8721:function(t,e,a){var s=a(3724),r=a(9504),o=a(2106),n=URLSearchParams.prototype,i=r(n.forEach);s&&!("size"in n)&&o(n,"size",{get:function(){var t=0;return i(this,(function(){t++})),t},configurable:!0,enumerable:!0})}}]);
//# sourceMappingURL=613.b14271a1.js.map