if(!self.define){let s,l={};const n=(n,r)=>(n=new URL(n+".js",r).href,l[n]||new Promise((l=>{if("document"in self){const s=document.createElement("script");s.src=n,s.onload=l,document.head.appendChild(s)}else s=n,importScripts(n),l()})).then((()=>{let s=l[n];if(!s)throw new Error(`Module ${n} didn’t register its module`);return s})));self.define=(r,i)=>{const e=s||("document"in self?document.currentScript.src:"")||location.href;if(l[e])return;let u={};const c=s=>n(s,e),o={module:{uri:e},exports:u,require:c};l[e]=Promise.all(r.map((s=>o[s]||c(s)))).then((s=>(i(...s),u)))}}define(["./workbox-6567b62a"],(function(s){"use strict";s.setCacheNameDetails({prefix:"client"}),self.addEventListener("message",(s=>{s.data&&"SKIP_WAITING"===s.data.type&&self.skipWaiting()})),s.precacheAndRoute([{url:"/css/105.6d6e1763.css",revision:null},{url:"/css/145.b5c536dc.css",revision:null},{url:"/css/173.5e425b01.css",revision:null},{url:"/css/186.a7a335ba.css",revision:null},{url:"/css/202.02249349.css",revision:null},{url:"/css/204.7ce6447c.css",revision:null},{url:"/css/222.1814922a.css",revision:null},{url:"/css/285.a90b34e7.css",revision:null},{url:"/css/298.38efb03f.css",revision:null},{url:"/css/305.88e6f6d2.css",revision:null},{url:"/css/367.9cd82693.css",revision:null},{url:"/css/397.02249349.css",revision:null},{url:"/css/401.e747f5e4.css",revision:null},{url:"/css/540.02249349.css",revision:null},{url:"/css/570.02249349.css",revision:null},{url:"/css/582.68ccb8fa.css",revision:null},{url:"/css/629.8d4d38c2.css",revision:null},{url:"/css/675.9b83224e.css",revision:null},{url:"/css/766.02249349.css",revision:null},{url:"/css/898.38efb03f.css",revision:null},{url:"/css/949.353edb2a.css",revision:null},{url:"/css/app.af329a13.css",revision:null},{url:"/css/chunk-vendors.bdb9d1b4.css",revision:null},{url:"/index.html",revision:"80ec2fb6c0b419daf2136302543e1a5c"},{url:"/js/105.d47c1028.js",revision:null},{url:"/js/145.e020d4ce.js",revision:null},{url:"/js/173.442943a3.js",revision:null},{url:"/js/183.e6632007.js",revision:null},{url:"/js/186.023105c6.js",revision:null},{url:"/js/202.77bce482.js",revision:null},{url:"/js/204.a107a2a7.js",revision:null},{url:"/js/260.33d815ba.js",revision:null},{url:"/js/285.84027c97.js",revision:null},{url:"/js/298.e20af009.js",revision:null},{url:"/js/305.10664c6a.js",revision:null},{url:"/js/350.0da178f2.js",revision:null},{url:"/js/367.0f59a252.js",revision:null},{url:"/js/397.1427d94a.js",revision:null},{url:"/js/401.fbd9542b.js",revision:null},{url:"/js/540.d443ac94.js",revision:null},{url:"/js/551.9e445ff0.js",revision:null},{url:"/js/570.ec84ab85.js",revision:null},{url:"/js/582.7dbe5aff.js",revision:null},{url:"/js/629.676a8944.js",revision:null},{url:"/js/675.6a58b08e.js",revision:null},{url:"/js/680.177f7996.js",revision:null},{url:"/js/766.a13fb41c.js",revision:null},{url:"/js/898.cc145241.js",revision:null},{url:"/js/949.a2a4595b.js",revision:null},{url:"/js/app.507c451b.js",revision:null},{url:"/js/chunk-vendors.7f6bfaec.js",revision:null},{url:"/manifest.json",revision:"8eff00fb23e5046e8587fb699e79e093"},{url:"/robots.txt",revision:"b6216d61c03e6ce0c9aea6ca7808f7ca"}],{})}));
//# sourceMappingURL=service-worker.js.map
