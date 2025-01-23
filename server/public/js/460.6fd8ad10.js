"use strict";(self["webpackChunkclient"]=self["webpackChunkclient"]||[]).push([[460],{1231:function(t,e,i){i.r(e),i.d(e,{default:function(){return ut}});var s=i(375),a=i(7210),n=i(8834),r=i(1526),l=(i(4114),i(29),i(9555)),o=i(8134),h=i(6960),c=o.A.extend({name:"v-combobox",props:{delimiters:{type:Array,default:()=>[]},returnObject:{type:Boolean,default:!0}},data:()=>({editingIndex:-1}),computed:{computedCounterValue(){return this.multiple?this.selectedItems.length:(this.internalSearch||"").toString().length},hasSlot(){return l.A.options.computed.hasSlot.call(this)||this.multiple},isAnyValueAllowed(){return!0},menuCanShow(){return!!this.isFocused&&(this.hasDisplayedItems||!!this.$slots["no-data"]&&!this.hideNoData)},searchIsDirty(){return null!=this.internalSearch}},methods:{onInternalSearchChanged(t){if(t&&this.multiple&&this.delimiters.length){const e=this.delimiters.find((e=>t.endsWith(e)));null!=e&&(this.internalSearch=t.slice(0,t.length-e.length),this.updateTags())}this.updateMenuDimensions()},genInput(){const t=o.A.options.methods.genInput.call(this);return delete t.data.attrs.name,t.data.on.paste=this.onPaste,t},genChipSelection(t,e){const i=l.A.options.methods.genChipSelection.call(this,t,e);return this.multiple&&(i.componentOptions.listeners={...i.componentOptions.listeners,dblclick:()=>{this.editingIndex=e,this.internalSearch=this.getText(t),this.selectedIndex=-1}}),i},onChipInput(t){l.A.options.methods.onChipInput.call(this,t),this.editingIndex=-1},onEnterDown(t){t.preventDefault(),this.getMenuIndex()>-1||this.$nextTick(this.updateSelf)},onKeyDown(t){const e=t.keyCode;!t.ctrlKey&&[h.uP.home,h.uP.end].includes(e)||l.A.options.methods.onKeyDown.call(this,t),this.multiple&&e===h.uP.left&&0===this.$refs.input.selectionStart?this.updateSelf():e===h.uP.enter&&this.onEnterDown(t),this.changeSelectedIndex(e)},onTabDown(t){if(this.multiple&&this.internalSearch&&-1===this.getMenuIndex())return t.preventDefault(),t.stopPropagation(),this.updateTags();o.A.options.methods.onTabDown.call(this,t)},selectItem(t){this.editingIndex>-1?this.updateEditing():(o.A.options.methods.selectItem.call(this,t),this.internalSearch&&this.multiple&&this.getText(t).toLocaleLowerCase().includes(this.internalSearch.toLocaleLowerCase())&&(this.internalSearch=null))},setSelectedItems(){null==this.internalValue||""===this.internalValue?this.selectedItems=[]:this.selectedItems=this.multiple?this.internalValue:[this.internalValue]},setValue(t){l.A.options.methods.setValue.call(this,void 0===t?this.internalSearch:t)},updateEditing(){const t=this.internalValue.slice(),e=this.selectedItems.findIndex((t=>this.getText(t)===this.internalSearch));if(e>-1){const i="object"===typeof t[e]?Object.assign({},t[e]):t[e];t.splice(e,1),t.push(i)}else t[this.editingIndex]=this.internalSearch;this.setValue(t),this.editingIndex=-1,this.internalSearch=null},updateCombobox(){if(!this.searchIsDirty)return;this.internalSearch!==this.getText(this.internalValue)&&this.setValue();const t=Boolean(this.$scopedSlots.selection)||this.hasChips;t&&(this.internalSearch=null)},updateSelf(){this.multiple?this.updateTags():this.updateCombobox()},updateTags(){const t=this.getMenuIndex();if(t<0&&!this.searchIsDirty||!this.internalSearch)return;if(this.editingIndex>-1)return this.updateEditing();const e=this.selectedItems.findIndex((t=>this.internalSearch===this.getText(t))),i=e>-1&&"object"===typeof this.selectedItems[e]?Object.assign({},this.selectedItems[e]):this.internalSearch;if(e>-1){const t=this.internalValue.slice();t.splice(e,1),this.setValue(t)}if(t>-1)return this.internalSearch=null;this.selectItem(i),this.internalSearch=null},onPaste(t){var e;if(this.$emit("paste",t),!this.multiple||this.searchIsDirty)return;const i=null===(e=t.clipboardData)||void 0===e?void 0:e.getData("text/vnd.vuetify.autocomplete.item+plain");i&&-1===this.findExistingIndex(i)&&(t.preventDefault(),l.A.options.methods.selectItem.call(this,i))},clearableCallback(){this.editingIndex=-1,o.A.options.methods.clearableCallback.call(this)}}}),d=i(6278),u=i(8327),p=i(7889),m=i(8767),g=i(3507),v=(0,g.A)(m.A).extend({methods:{genPickerButton(t,e,i,s=!1,a=""){const n=this[t]===e,r=i=>{i.stopPropagation(),this.$emit(`update:${(0,h.kW)(t)}`,e)};return this.$createElement("div",{staticClass:`v-picker__title__btn ${a}`.trim(),class:{"v-picker__title__btn--active":n,"v-picker__title__btn--readonly":s},on:n||s?void 0:{click:r}},Array.isArray(i)?i:[i])}}}),y=(0,g.A)(v).extend({name:"v-date-picker-title",props:{date:{type:String,default:""},disabled:Boolean,readonly:Boolean,selectingYear:Boolean,value:{type:String},year:{type:[Number,String],default:""},yearIcon:{type:String}},data:()=>({isReversing:!1}),computed:{computedTransition(){return this.isReversing?"picker-reverse-transition":"picker-transition"}},watch:{value(t,e){this.isReversing=t<e}},methods:{genYearIcon(){return this.$createElement(p.A,{props:{dark:!0}},this.yearIcon)},getYearBtn(){return this.genPickerButton("selectingYear",!0,[String(this.year),this.yearIcon?this.genYearIcon():null],!1,"v-date-picker-title__year")},genTitleText(){return this.$createElement("transition",{props:{name:this.computedTransition}},[this.$createElement("div",{domProps:{innerHTML:this.date||"&nbsp;"},key:this.value})])},genTitleDate(){return this.genPickerButton("selectingYear",!1,[this.genTitleText()],!1,"v-date-picker-title__date")}},render(t){return t("div",{staticClass:"v-date-picker-title",class:{"v-date-picker-title--disabled":this.disabled}},[this.getYearBtn(),this.genTitleDate()])}}),b=i(3536),f=i(5471),k=f.Ay.extend({name:"localable",props:{locale:String},computed:{currentLocale(){return this.locale||this.$vuetify.lang.current}}}),D=i(3661);const $=(t,e,i)=>(e|=0,t=String(t),i=String(i),t.length>e?String(t):(e-=t.length,e>i.length&&(i+=i.repeat(e/i.length)),i.slice(0,e)+String(t)));var A=(t,e=2)=>$(t,e,"0");function x(t,e,i={start:0,length:0}){const s=t=>{const[e,i,s]=t.trim().split(" ")[0].split("-");return[A(e,4),A(i||1),A(s||1)].join("-")};try{const i=new Intl.DateTimeFormat(t||void 0,e);return t=>i.format(new Date(`${s(t)}T00:00:00+00:00`))}catch(a){return i.start||i.length?t=>s(t).substr(i.start||0,i.length):void 0}}var I=x,S=(t,e)=>{const[i,s]=t.split("-").map(Number);return s+e===0?i-1+"-12":s+e===13?`${i+1}-01`:`${i}-${A(s+e)}`},T=(0,g.A)(m.A,k,D.A).extend({name:"v-date-picker-header",props:{disabled:Boolean,format:Function,min:String,max:String,nextAriaLabel:String,nextIcon:{type:String,default:"$next"},prevAriaLabel:String,prevIcon:{type:String,default:"$prev"},readonly:Boolean,value:{type:[Number,String],required:!0}},data(){return{isReversing:!1}},computed:{formatter(){return this.format?this.format:String(this.value).split("-")[1]?I(this.currentLocale,{month:"long",year:"numeric",timeZone:"UTC"},{length:7}):I(this.currentLocale,{year:"numeric",timeZone:"UTC"},{length:4})}},watch:{value(t,e){this.isReversing=t<e}},methods:{genBtn(t){const e=t>0?this.nextAriaLabel:this.prevAriaLabel,i=e?this.$vuetify.lang.t(e):void 0,s=this.disabled||t<0&&this.min&&this.calculateChange(t)<this.min||t>0&&this.max&&this.calculateChange(t)>this.max;return this.$createElement(b.A,{attrs:{"aria-label":i},props:{dark:this.dark,disabled:s,icon:!0,light:this.light},on:{click:e=>{e.stopPropagation(),this.$emit("input",this.calculateChange(t))}}},[this.$createElement(p.A,t<0===!this.$vuetify.rtl?this.prevIcon:this.nextIcon)])},calculateChange(t){const[e,i]=String(this.value).split("-").map(Number);return null==i?`${e+t}`:S(String(this.value),t)},genHeader(){const t=!this.disabled&&(this.color||"accent"),e=this.$createElement("div",this.setTextColor(t,{key:String(this.value)}),[this.$createElement("button",{attrs:{type:"button"},on:{click:()=>this.$emit("toggle")}},(0,h.$c)(this)||[this.formatter(String(this.value))])]),i=this.$createElement("transition",{props:{name:this.isReversing===!this.$vuetify.rtl?"tab-reverse-transition":"tab-transition"}},[e]);return this.$createElement("div",{staticClass:"v-date-picker-header__value",class:{"v-date-picker-header__value--disabled":this.disabled}},[i])}},render(){return this.$createElement("div",{staticClass:"v-date-picker-header",class:{"v-date-picker-header--disabled":this.disabled,...this.themeClasses}},[this.genBtn(-1),this.genHeader(),this.genBtn(1)])}}),w=i(499);function C(t,e,i){return Object.keys(t.$listeners).reduce(((s,a)=>(a.endsWith(e)&&(s[a.slice(0,-e.length)]=e=>t.$emit(a,i,e)),s)),{})}function E(t,e){return Object.keys(t.$listeners).reduce(((i,s)=>(s.endsWith(e)&&(i[s]=t.$listeners[s]),i)),{})}var M=(t,e)=>{const[i,s=1,a=1]=t.split("-");return`${i}-${A(s)}-${A(a)}`.substr(0,{date:10,month:7,year:4}[e])};function _(t,e,i,s){return(!s||s(t))&&(!e||t>=e.substr(0,10))&&(!i||t<=i)}var Y=i(4961),B=(0,g.A)(m.A,k,D.A).extend({directives:{Touch:w.A},props:{allowedDates:Function,current:String,disabled:Boolean,format:Function,events:{type:[Array,Function,Object],default:()=>null},eventColor:{type:[Array,Function,Object,String],default:()=>"warning"},min:String,max:String,range:Boolean,readonly:Boolean,scrollable:Boolean,tableDate:{type:String,required:!0},value:[String,Array]},data:()=>({isReversing:!1,wheelThrottle:null}),computed:{computedTransition(){return this.isReversing===!this.$vuetify.rtl?"tab-reverse-transition":"tab-transition"},displayedMonth(){return Number(this.tableDate.split("-")[1])-1},displayedYear(){return Number(this.tableDate.split("-")[0])}},watch:{tableDate(t,e){this.isReversing=t<e}},mounted(){this.wheelThrottle=(0,h.nF)(this.wheel,250)},methods:{genButtonClasses(t,e,i,s,a,n){return{"v-size--default":!e,"v-date-picker-table__current":s,"v-btn--active":i,"v-btn--flat":!t||this.disabled,"v-btn--text":i===s,"v-btn--rounded":e,"v-btn--disabled":!t||this.disabled,"v-btn--outlined":s&&!i,"v-date-picker--first-in-range":a,"v-date-picker--last-in-range":n,...this.themeClasses}},genButtonEvents(t,e,i){if(!this.disabled)return(0,Y.wf)({click:()=>{e&&!this.readonly&&this.$emit("input",t)}},C(this,`:${i}`,t))},genButton(t,e,i,s,a=!1){const n=_(t,this.min,this.max,this.allowedDates),r=this.isSelected(t)&&n,l=t===this.current,o=r?this.setBackgroundColor:this.setTextColor,h=(r||l)&&(this.color||"accent");let c=!1,d=!1;return this.range&&this.value&&Array.isArray(this.value)&&(c=t===this.value[0],d=t===this.value[this.value.length-1]),this.$createElement("button",o(h,{staticClass:"v-btn",class:this.genButtonClasses(n&&!a,e,r,l,c,d),attrs:{type:"button"},domProps:{disabled:this.disabled||!n||a},on:this.genButtonEvents(t,n,i)}),[this.$createElement("div",{staticClass:"v-btn__content"},[s(t)]),this.genEvents(t)])},getEventColors(t){const e=t=>Array.isArray(t)?t:[t];let i,s=[];return i=Array.isArray(this.events)?this.events.includes(t):this.events instanceof Function?this.events(t)||!1:this.events&&this.events[t]||!1,i?(s=!0!==i?e(i):"string"===typeof this.eventColor?[this.eventColor]:"function"===typeof this.eventColor?e(this.eventColor(t)):Array.isArray(this.eventColor)?this.eventColor:e(this.eventColor[t]),s.filter((t=>t))):[]},genEvents(t){const e=this.getEventColors(t);return e.length?this.$createElement("div",{staticClass:"v-date-picker-table__events"},e.map((t=>this.$createElement("div",this.setBackgroundColor(t))))):null},isValidScroll(t,e){const i=e(t),s=1===i.split("-").length?"year":"month";return t<0&&(!this.min||i>=M(this.min,s))||t>0&&(!this.max||i<=M(this.max,s))},wheel(t,e){this.$emit("update:table-date",e(t.deltaY))},touch(t,e){this.$emit("update:table-date",e(t))},genTable(t,e,i){const s=this.$createElement("transition",{props:{name:this.computedTransition}},[this.$createElement("table",{key:this.tableDate},e)]),a={name:"touch",value:{left:t=>t.offsetX<-15&&this.isValidScroll(1,i)&&this.touch(1,i),right:t=>t.offsetX>15&&this.isValidScroll(-1,i)&&this.touch(-1,i)}};return this.$createElement("div",{staticClass:t,class:{"v-date-picker-table--disabled":this.disabled,...this.themeClasses},on:!this.disabled&&this.scrollable?{wheel:t=>{t.preventDefault(),this.isValidScroll(t.deltaY,i)&&this.wheelThrottle(t,i)}}:void 0,directives:[a]},[s])},isSelected(t){if(Array.isArray(this.value)){if(this.range&&2===this.value.length){const[e,i]=[...this.value].sort();return e<=t&&t<=i}return-1!==this.value.indexOf(t)}return t===this.value}}});function F(t,e=0,i=1){let s;return t<100&&t>=0?(s=new Date(Date.UTC(t,e,i)),isFinite(s.getUTCFullYear())&&s.setUTCFullYear(t)):s=new Date(Date.UTC(t,e,i)),s}function P(t,e,i){const s=7+e-i,a=(7+F(t,0,s).getUTCDay()-e)%7;return-a+s-1}function V(t,e,i,s){let a=[0,31,59,90,120,151,181,212,243,273,304,334][e];return e>1&&N(t)&&a++,a+i}function L(t,e,i){const s=P(t,e,i),a=P(t+1,e,i),n=N(t)?366:365;return(n-s+a)/7}function O(t,e,i,s,a){const n=P(t,s,a),r=Math.ceil((V(t,e,i,s)-n)/7);return r<1?r+L(t-1,s,a):r>L(t,s,a)?r-L(t,s,a):r}function N(t){return t%4===0&&t%100!==0||t%400===0}var W=(0,g.A)(B).extend({name:"v-date-picker-date-table",props:{firstDayOfWeek:{type:[String,Number],default:0},localeFirstDayOfYear:{type:[String,Number],default:0},showAdjacentMonths:Boolean,showWeek:Boolean,weekdayFormat:Function},computed:{formatter(){return this.format||I(this.currentLocale,{day:"numeric",timeZone:"UTC"},{start:8,length:2})},weekdayFormatter(){return this.weekdayFormat||I(this.currentLocale,{weekday:"narrow",timeZone:"UTC"})},weekDays(){const t=parseInt(this.firstDayOfWeek,10);return this.weekdayFormatter?(0,h.Sd)(7).map((e=>this.weekdayFormatter(`2017-01-${t+e+15}`))):(0,h.Sd)(7).map((e=>["S","M","T","W","T","F","S"][(e+t)%7]))}},methods:{calculateTableDate(t){return S(this.tableDate,Math.sign(t||1))},genTHead(){const t=this.weekDays.map((t=>this.$createElement("th",t)));return this.showWeek&&t.unshift(this.$createElement("th")),this.$createElement("thead",this.genTR(t))},weekDaysBeforeFirstDayOfTheMonth(){const t=new Date(`${this.displayedYear}-${A(this.displayedMonth+1)}-01T00:00:00+00:00`),e=t.getUTCDay();return(e-parseInt(this.firstDayOfWeek)+7)%7},getWeekNumber(t){return O(this.displayedYear,this.displayedMonth,t,parseInt(this.firstDayOfWeek),parseInt(this.localeFirstDayOfYear))},genWeekNumber(t){return this.$createElement("td",[this.$createElement("small",{staticClass:"v-date-picker-table--date__week"},String(t).padStart(2,"0"))])},genTBody(){const t=[],e=new Date(this.displayedYear,this.displayedMonth+1,0).getDate();let i=[],s=this.weekDaysBeforeFirstDayOfTheMonth();this.showWeek&&i.push(this.genWeekNumber(this.getWeekNumber(1)));const a=this.displayedMonth?this.displayedYear:this.displayedYear-1,n=(this.displayedMonth+11)%12,r=new Date(this.displayedYear,this.displayedMonth,0).getDate(),l=this.showWeek?8:7;while(s--){const t=`${a}-${A(n+1)}-${A(r-s)}`;i.push(this.$createElement("td",this.showAdjacentMonths?[this.genButton(t,!0,"date",this.formatter,!0)]:[]))}for(s=1;s<=e;s++){const a=`${this.displayedYear}-${A(this.displayedMonth+1)}-${A(s)}`;i.push(this.$createElement("td",[this.genButton(a,!0,"date",this.formatter)])),i.length%l===0&&(t.push(this.genTR(i)),i=[],this.showWeek&&(s<e||this.showAdjacentMonths)&&i.push(this.genWeekNumber(this.getWeekNumber(s+7))))}const o=11===this.displayedMonth?this.displayedYear+1:this.displayedYear,h=(this.displayedMonth+1)%12;let c=1;while(i.length<l){const t=`${o}-${A(h+1)}-${A(c++)}`;i.push(this.$createElement("td",this.showAdjacentMonths?[this.genButton(t,!0,"date",this.formatter,!0)]:[]))}return i.length&&t.push(this.genTR(i)),this.$createElement("tbody",t)},genTR(t){return[this.$createElement("tr",t)]}},render(){return this.genTable("v-date-picker-table v-date-picker-table--date",[this.genTHead(),this.genTBody()],this.calculateTableDate)}}),j=(0,g.A)(B).extend({name:"v-date-picker-month-table",computed:{formatter(){return this.format||I(this.currentLocale,{month:"short",timeZone:"UTC"},{start:5,length:2})}},methods:{calculateTableDate(t){return`${parseInt(this.tableDate,10)+Math.sign(t||1)}`},genTBody(){const t=[],e=Array(3).fill(null),i=12/e.length;for(let s=0;s<i;s++){const i=e.map(((t,i)=>{const a=s*e.length+i,n=`${this.displayedYear}-${A(a+1)}`;return this.$createElement("td",{key:a},[this.genButton(n,!1,"month",this.formatter)])}));t.push(this.$createElement("tr",{key:s},i))}return this.$createElement("tbody",t)}},render(){return this.genTable("v-date-picker-table v-date-picker-table--month",[this.genTBody()],this.calculateTableDate)}}),R=(0,g.A)(m.A,k).extend({name:"v-date-picker-years",props:{format:Function,min:[Number,String],max:[Number,String],readonly:Boolean,value:[Number,String]},data(){return{defaultColor:"primary"}},computed:{formatter(){return this.format||I(this.currentLocale,{year:"numeric",timeZone:"UTC"},{length:4})}},mounted(){setTimeout((()=>{const t=this.$el.getElementsByClassName("active")[0];t?this.$el.scrollTop=t.offsetTop-this.$el.offsetHeight/2+t.offsetHeight/2:this.min&&!this.max?this.$el.scrollTop=this.$el.scrollHeight:!this.min&&this.max?this.$el.scrollTop=0:this.$el.scrollTop=this.$el.scrollHeight/2-this.$el.offsetHeight/2}))},methods:{genYearItem(t){const e=this.formatter(`${t}`),i=parseInt(this.value,10)===t,s=i&&(this.color||"primary");return this.$createElement("li",this.setTextColor(s,{key:t,class:{active:i},on:(0,Y.wf)({click:()=>this.$emit("input",t)},C(this,":year",t))}),e)},genYearItems(){const t=[],e=this.value?parseInt(this.value,10):(new Date).getFullYear(),i=this.max?parseInt(this.max,10):e+100,s=Math.min(i,this.min?parseInt(this.min,10):e-100);for(let a=i;a>=s;a--)t.push(this.genYearItem(a));return t}},render(){return this.$createElement("ul",{staticClass:"v-date-picker-years",ref:"years"},this.genYearItems())}}),U=(i(6001),i(5083)),H=(0,g.A)(m.A,U.A,D.A).extend({name:"v-picker",props:{flat:Boolean,fullWidth:Boolean,landscape:Boolean,noTitle:Boolean,transition:{type:String,default:"fade-transition"},width:{type:[Number,String],default:290}},computed:{computedTitleColor(){const t=!this.isDark&&(this.color||"primary");return this.color||t}},methods:{genTitle(){return this.$createElement("div",this.setBackgroundColor(this.computedTitleColor,{staticClass:"v-picker__title",class:{"v-picker__title--landscape":this.landscape}}),(0,h.$c)(this,"title"))},genBodyTransition(){return this.$createElement("transition",{props:{name:this.transition}},(0,h.$c)(this))},genBody(){return this.$createElement("div",{staticClass:"v-picker__body",class:{"v-picker__body--no-title":this.noTitle,...this.themeClasses},style:this.fullWidth?void 0:{width:(0,h.Dg)(this.width)}},[this.genBodyTransition()])},genActions(){return this.$createElement("div",{staticClass:"v-picker__actions v-card__actions",class:{"v-picker__actions--no-title":this.noTitle}},(0,h.$c)(this,"actions"))}},render(t){return t("div",{staticClass:"v-picker v-card",class:{"v-picker--flat":this.flat,"v-picker--landscape":this.landscape,"v-picker--full-width":this.fullWidth,...this.themeClasses,...this.elevationClasses}},[this.$slots.title?this.genTitle():null,this.genBody(),this.$slots.actions?this.genActions():null])}}),q=H,Z=(0,g.A)(m.A,U.A,D.A).extend({name:"picker",props:{flat:Boolean,fullWidth:Boolean,headerColor:String,landscape:Boolean,noTitle:Boolean,width:{type:[Number,String],default:290}},methods:{genPickerTitle(){return null},genPickerBody(){return null},genPickerActionsSlot(){return this.$scopedSlots.default?this.$scopedSlots.default({save:this.save,cancel:this.cancel}):(0,h.$c)(this)},genPicker(t){const e=[];if(!this.noTitle){const t=this.genPickerTitle();t&&e.push(t)}const i=this.genPickerBody();return i&&e.push(i),e.push(this.$createElement("template",{slot:"actions"},[this.genPickerActionsSlot()])),this.$createElement(q,{staticClass:t,props:{color:this.headerColor||this.color,dark:this.dark,elevation:this.elevation,flat:this.flat,fullWidth:this.fullWidth,landscape:this.landscape,light:this.light,width:this.width,noTitle:this.noTitle}},e)}}});const K=[0,31,28,31,30,31,30,31,31,30,31,30,31],Q=[0,31,29,31,30,31,30,31,31,30,31,30,31];function X(t,e){return N(t)?Q[e]:K[e]}var z=i(5604),G=(0,g.A)(k,Z).extend({name:"v-date-picker",props:{activePicker:String,allowedDates:Function,dayFormat:Function,disabled:Boolean,events:{type:[Array,Function,Object],default:()=>null},eventColor:{type:[Array,Function,Object,String],default:()=>"warning"},firstDayOfWeek:{type:[String,Number],default:0},headerDateFormat:Function,localeFirstDayOfYear:{type:[String,Number],default:0},max:String,min:String,monthFormat:Function,multiple:Boolean,nextIcon:{type:String,default:"$next"},nextMonthAriaLabel:{type:String,default:"$vuetify.datePicker.nextMonthAriaLabel"},nextYearAriaLabel:{type:String,default:"$vuetify.datePicker.nextYearAriaLabel"},pickerDate:String,prevIcon:{type:String,default:"$prev"},prevMonthAriaLabel:{type:String,default:"$vuetify.datePicker.prevMonthAriaLabel"},prevYearAriaLabel:{type:String,default:"$vuetify.datePicker.prevYearAriaLabel"},range:Boolean,reactive:Boolean,readonly:Boolean,scrollable:Boolean,showCurrent:{type:[Boolean,String],default:!0},selectedItemsText:{type:String,default:"$vuetify.datePicker.itemsSelected"},showAdjacentMonths:Boolean,showWeek:Boolean,titleDateFormat:Function,type:{type:String,default:"date",validator:t=>["date","month"].includes(t)},value:[Array,String],weekdayFormat:Function,yearFormat:Function,yearIcon:String},data(){const t=new Date;return{internalActivePicker:this.type.toUpperCase(),inputDay:null,inputMonth:null,inputYear:null,isReversing:!1,now:t,tableDate:(()=>{if(this.pickerDate)return this.pickerDate;const e=(0,h.BN)(this.value),i=e[e.length-1]||("string"===typeof this.showCurrent?this.showCurrent:`${t.getFullYear()}-${t.getMonth()+1}`);return M(i,"date"===this.type?"month":"year")})()}},computed:{multipleValue(){return(0,h.BN)(this.value)},isMultiple(){return this.multiple||this.range},lastValue(){return this.isMultiple?this.multipleValue[this.multipleValue.length-1]:this.value},selectedMonths(){return this.value&&"month"!==this.type?this.isMultiple?this.multipleValue.map((t=>t.substr(0,7))):this.value.substr(0,7):this.value},current(){return!0===this.showCurrent?M(`${this.now.getFullYear()}-${this.now.getMonth()+1}-${this.now.getDate()}`,this.type):this.showCurrent||null},inputDate(){return"date"===this.type?`${this.inputYear}-${A(this.inputMonth+1)}-${A(this.inputDay)}`:`${this.inputYear}-${A(this.inputMonth+1)}`},tableMonth(){return Number((this.pickerDate||this.tableDate).split("-")[1])-1},tableYear(){return Number((this.pickerDate||this.tableDate).split("-")[0])},minMonth(){return this.min?M(this.min,"month"):null},maxMonth(){return this.max?M(this.max,"month"):null},minYear(){return this.min?M(this.min,"year"):null},maxYear(){return this.max?M(this.max,"year"):null},formatters(){return{year:this.yearFormat||I(this.currentLocale,{year:"numeric",timeZone:"UTC"},{length:4}),titleDate:this.titleDateFormat||(this.isMultiple?this.defaultTitleMultipleDateFormatter:this.defaultTitleDateFormatter)}},defaultTitleMultipleDateFormatter(){return t=>t.length?1===t.length?this.defaultTitleDateFormatter(t[0]):this.$vuetify.lang.t(this.selectedItemsText,t.length):"-"},defaultTitleDateFormatter(){const t={year:{year:"numeric",timeZone:"UTC"},month:{month:"long",timeZone:"UTC"},date:{weekday:"short",month:"short",day:"numeric",timeZone:"UTC"}},e=I(this.currentLocale,t[this.type],{start:0,length:{date:10,month:7,year:4}[this.type]}),i=t=>e(t).replace(/([^\d\s])([\d])/g,((t,e,i)=>`${e} ${i}`)).replace(", ",",<br>");return this.landscape?i:e}},watch:{internalActivePicker:{immediate:!0,handler(t){this.$emit("update:active-picker",t)}},activePicker(t){this.internalActivePicker=t},tableDate(t,e){const i="month"===this.type?"year":"month";this.isReversing=M(t,i)<M(e,i),this.$emit("update:picker-date",t)},pickerDate(t){t?this.tableDate=t:this.lastValue&&"date"===this.type?this.tableDate=M(this.lastValue,"month"):this.lastValue&&"month"===this.type&&(this.tableDate=M(this.lastValue,"year"))},value(t,e){this.checkMultipleProp(),this.setInputDate(),(this.isMultiple||!this.value||this.pickerDate)&&(!this.isMultiple||!this.multipleValue.length||e&&e.length||this.pickerDate)||(this.tableDate=M(this.inputDate,"month"===this.type?"year":"month"))},type(t){if(this.internalActivePicker=t.toUpperCase(),this.value&&this.value.length){const e=this.multipleValue.map((e=>M(e,t))).filter(this.isDateAllowed);this.$emit("input",this.isMultiple?e:e[0])}}},created(){this.checkMultipleProp(),this.pickerDate!==this.tableDate&&this.$emit("update:picker-date",this.tableDate),this.setInputDate()},methods:{emitInput(t){if(this.range){if(1!==this.multipleValue.length)this.$emit("input",[t]);else{const e=[this.multipleValue[0],t];this.$emit("input",e),this.$emit("change",e)}return}const e=this.multiple?-1===this.multipleValue.indexOf(t)?this.multipleValue.concat([t]):this.multipleValue.filter((e=>e!==t)):t;this.$emit("input",e),this.multiple||this.$emit("change",t)},checkMultipleProp(){if(null==this.value)return;const t=this.value.constructor.name,e=this.isMultiple?"Array":"String";t!==e&&(0,z.OP)(`Value must be ${this.isMultiple?"an":"a"} ${e}, got ${t}`,this)},isDateAllowed(t){return _(t,this.min,this.max,this.allowedDates)},yearClick(t){this.inputYear=t,"month"===this.type?this.tableDate=`${t}`:this.tableDate=`${t}-${A((this.tableMonth||0)+1)}`,this.internalActivePicker="MONTH",this.reactive&&!this.readonly&&!this.isMultiple&&this.isDateAllowed(this.inputDate)&&this.$emit("input",this.inputDate)},monthClick(t){const[e,i]=t.split("-");this.inputYear=parseInt(e,10),this.inputMonth=parseInt(i,10)-1,"date"===this.type?(this.inputDay&&(this.inputDay=Math.min(this.inputDay,X(this.inputYear,this.inputMonth+1))),this.tableDate=t,this.internalActivePicker="DATE",this.reactive&&!this.readonly&&!this.isMultiple&&this.isDateAllowed(this.inputDate)&&this.$emit("input",this.inputDate)):this.emitInput(this.inputDate)},dateClick(t){const[e,i,s]=t.split("-");this.inputYear=parseInt(e,10),this.inputMonth=parseInt(i,10)-1,this.inputDay=parseInt(s,10),this.emitInput(this.inputDate)},genPickerTitle(){return this.$createElement(y,{props:{date:this.value?this.formatters.titleDate(this.isMultiple?this.multipleValue:this.value):"",disabled:this.disabled,readonly:this.readonly,selectingYear:"YEAR"===this.internalActivePicker,year:this.formatters.year(this.multipleValue.length?`${this.inputYear}`:this.tableDate),yearIcon:this.yearIcon,value:this.multipleValue[0]},slot:"title",on:{"update:selecting-year":t=>this.internalActivePicker=t?"YEAR":this.type.toUpperCase()}})},genTableHeader(){return this.$createElement(T,{props:{nextIcon:this.nextIcon,color:this.color,dark:this.dark,disabled:this.disabled,format:this.headerDateFormat,light:this.light,locale:this.locale,min:"DATE"===this.internalActivePicker?this.minMonth:this.minYear,max:"DATE"===this.internalActivePicker?this.maxMonth:this.maxYear,nextAriaLabel:"DATE"===this.internalActivePicker?this.nextMonthAriaLabel:this.nextYearAriaLabel,prevAriaLabel:"DATE"===this.internalActivePicker?this.prevMonthAriaLabel:this.prevYearAriaLabel,prevIcon:this.prevIcon,readonly:this.readonly,value:"DATE"===this.internalActivePicker?`${A(this.tableYear,4)}-${A(this.tableMonth+1)}`:`${A(this.tableYear,4)}`},on:{toggle:()=>this.internalActivePicker="DATE"===this.internalActivePicker?"MONTH":"YEAR",input:t=>this.tableDate=t}})},genDateTable(){return this.$createElement(W,{props:{allowedDates:this.allowedDates,color:this.color,current:this.current,dark:this.dark,disabled:this.disabled,events:this.events,eventColor:this.eventColor,firstDayOfWeek:this.firstDayOfWeek,format:this.dayFormat,light:this.light,locale:this.locale,localeFirstDayOfYear:this.localeFirstDayOfYear,min:this.min,max:this.max,range:this.range,readonly:this.readonly,scrollable:this.scrollable,showAdjacentMonths:this.showAdjacentMonths,showWeek:this.showWeek,tableDate:`${A(this.tableYear,4)}-${A(this.tableMonth+1)}`,value:this.value,weekdayFormat:this.weekdayFormat},ref:"table",on:{input:this.dateClick,"update:table-date":t=>this.tableDate=t,...E(this,":date")}})},genMonthTable(){return this.$createElement(j,{props:{allowedDates:"month"===this.type?this.allowedDates:null,color:this.color,current:this.current?M(this.current,"month"):null,dark:this.dark,disabled:this.disabled,events:"month"===this.type?this.events:null,eventColor:"month"===this.type?this.eventColor:null,format:this.monthFormat,light:this.light,locale:this.locale,min:this.minMonth,max:this.maxMonth,range:this.range,readonly:this.readonly&&"month"===this.type,scrollable:this.scrollable,value:this.selectedMonths,tableDate:`${A(this.tableYear,4)}`},ref:"table",on:{input:this.monthClick,"update:table-date":t=>this.tableDate=t,...E(this,":month")}})},genYears(){return this.$createElement(R,{props:{color:this.color,format:this.yearFormat,locale:this.locale,min:this.minYear,max:this.maxYear,value:this.tableYear},on:{input:this.yearClick,...E(this,":year")}})},genPickerBody(){const t="YEAR"===this.internalActivePicker?[this.genYears()]:[this.genTableHeader(),"DATE"===this.internalActivePicker?this.genDateTable():this.genMonthTable()];return this.$createElement("div",{key:this.internalActivePicker},t)},setInputDate(){if(this.lastValue){const t=this.lastValue.split("-");this.inputYear=parseInt(t[0],10),this.inputMonth=parseInt(t[1],10)-1,"date"===this.type&&(this.inputDay=parseInt(t[2],10))}else this.inputYear=this.inputYear||this.now.getFullYear(),this.inputMonth=null==this.inputMonth?this.inputMonth:this.now.getMonth(),this.inputDay=this.inputDay||this.now.getDate()}},render(){return this.genPicker("v-picker--date")}}),J=i(4155),tt=i(9456),et=i(6160),it=i(8412),st=i(3021),at=i(7410),nt=i(9940),rt=function(){var t=this,e=t._self._c;return e(d.A,{attrs:{fluid:""}},[e(a.A,{staticClass:"elevation-2"},[e(n.ri,{staticClass:"headline"},[t._v(" Elections "),e(at.A),e(nt.A,{staticClass:"mr-4",staticStyle:{"max-width":"300px"},attrs:{"prepend-inner-icon":"mdi-magnify",label:"Search elections",clearable:"",outlined:"",rounded:"",dense:"","hide-details":""},model:{value:t.search,callback:function(e){t.search=e},expression:"search"}}),e(s.A,{attrs:{color:"primary"},on:{click:t.openCreateDialog}},[e(tt.A,{attrs:{left:""}},[t._v("mdi-plus")]),t._v(" Add New Election ")],1)],1),e(u.A,{staticClass:"elevation-1",attrs:{headers:t.headers,items:t.elections,search:t.search,"items-per-page":10,loading:t.loading,"loading-text":"Loading elections... Please wait","no-data-text":"No elections found","footer-props":{"items-per-page-options":[5,10,15,20]}},scopedSlots:t._u([{key:"item",fn:function({item:i,index:a}){return[e("tr",{class:a%2===0?"grey lighten-4":""},[e("td",[e(s.A,{attrs:{"x-small":"",color:"primary"},on:{click:function(e){return t.goToCandidatesList(i._id)}}},[t._v(" Select ")])],1),e("td",[t._v(t._s(i.name))]),e("td",[t._v(t._s(t.formatDate(i.startDate)))]),e("td",[t._v(t._s(t.formatDate(i.endDate)))]),e("td",[t._v(t._s(i.electionType))]),e("td",[t._v(t._s(i.status))]),e("td",{staticClass:"text-right"},[e(s.A,{staticClass:"mr-2",attrs:{icon:"",small:""},on:{click:function(e){return t.openEditDialog(i)}}},[e(tt.A,{attrs:{small:""}},[t._v("mdi-pencil")])],1),e(s.A,{attrs:{icon:"",small:""},on:{click:function(e){return t.openDeleteDialog(i)}}},[e(tt.A,{attrs:{small:""}},[t._v("mdi-delete")])],1)],1)])]}}])})],1),e(J.A,{attrs:{"max-width":"600px"},model:{value:t.dialog,callback:function(e){t.dialog=e},expression:"dialog"}},[e(a.A,[e(n.ri,[e("span",{staticClass:"headline"},[t._v(t._s(t.formTitle))])]),e(n.OQ,[e(d.A,[e(it.A,[e(r.A,{attrs:{cols:"12"}},[e(nt.A,{attrs:{label:"Election Name",rules:[t=>!!t||"Election name is required"],required:""},model:{value:t.editedItem.name,callback:function(e){t.$set(t.editedItem,"name",e)},expression:"editedItem.name"}})],1),e(r.A,{attrs:{cols:"6"}},[e(et.A,{attrs:{"close-on-content-click":!1,transition:"scale-transition","offset-y":"","max-width":"290px","min-width":"290px"},scopedSlots:t._u([{key:"activator",fn:function({on:i,attrs:s}){return[e(nt.A,t._g(t._b({attrs:{label:"Start Date","prepend-icon":"mdi-calendar",readonly:""},model:{value:t.editedItem.startDate,callback:function(e){t.$set(t.editedItem,"startDate",e)},expression:"editedItem.startDate"}},"v-text-field",s,!1),i))]}}]),model:{value:t.startDateMenu,callback:function(e){t.startDateMenu=e},expression:"startDateMenu"}},[e(G,{attrs:{"no-title":""},on:{input:function(e){t.startDateMenu=!1}},model:{value:t.editedItem.startDate,callback:function(e){t.$set(t.editedItem,"startDate",e)},expression:"editedItem.startDate"}})],1)],1),e(r.A,{attrs:{cols:"6"}},[e(et.A,{attrs:{"close-on-content-click":!1,transition:"scale-transition","offset-y":"","max-width":"290px","min-width":"290px"},scopedSlots:t._u([{key:"activator",fn:function({on:i,attrs:s}){return[e(nt.A,t._g(t._b({attrs:{label:"End Date","prepend-icon":"mdi-calendar",readonly:""},model:{value:t.editedItem.endDate,callback:function(e){t.$set(t.editedItem,"endDate",e)},expression:"editedItem.endDate"}},"v-text-field",s,!1),i))]}}]),model:{value:t.endDateMenu,callback:function(e){t.endDateMenu=e},expression:"endDateMenu"}},[e(G,{attrs:{"no-title":""},on:{input:function(e){t.endDateMenu=!1}},model:{value:t.editedItem.endDate,callback:function(e){t.$set(t.editedItem,"endDate",e)},expression:"editedItem.endDate"}})],1)],1),e(r.A,{attrs:{cols:"12"}},[e(c,{attrs:{label:"Positions",multiple:"",chips:"","small-chips":"","deletable-chips":""},model:{value:t.editedItem.positions,callback:function(e){t.$set(t.editedItem,"positions",e)},expression:"editedItem.positions"}})],1),e(r.A,{attrs:{cols:"12"}},[e(l.A,{attrs:{items:["SSC"],label:"Election Type",required:""},on:{change:t.handleElectionTypeChange},model:{value:t.editedItem.electionType,callback:function(e){t.$set(t.editedItem,"electionType",e)},expression:"editedItem.electionType"}})],1),"Classroom"===t.editedItem.electionType?e(r.A,{attrs:{cols:"12"}},[e(l.A,{attrs:{items:t.classrooms,"item-text":"name","item-value":"_id",label:"Classroom",required:""},model:{value:t.editedItem.classroomId,callback:function(e){t.$set(t.editedItem,"classroomId",e)},expression:"editedItem.classroomId"}})],1):t._e(),e(r.A,{attrs:{cols:"12"}},[e(l.A,{attrs:{items:["upcoming","ongoing","completed"],label:"Status",required:""},model:{value:t.editedItem.status,callback:function(e){t.$set(t.editedItem,"status",e)},expression:"editedItem.status"}})],1)],1)],1)],1),e(n.SL,[e(at.A),e(s.A,{attrs:{color:"blue darken-1",text:""},on:{click:t.closeDialog}},[t._v("Cancel")]),e(s.A,{attrs:{color:"blue darken-1",text:""},on:{click:t.saveElection}},[t._v("Save")])],1)],1)],1),e(J.A,{attrs:{"max-width":"500px"},model:{value:t.deleteDialog,callback:function(e){t.deleteDialog=e},expression:"deleteDialog"}},[e(a.A,[e(n.ri,{staticClass:"headline"},[t._v("Delete Election")]),e(n.OQ,[t._v("Are you sure you want to delete this election?")]),e(n.SL,[e(at.A),e(s.A,{attrs:{color:"blue darken-1",text:""},on:{click:t.closeDeleteDialog}},[t._v("Cancel")]),e(s.A,{attrs:{color:"red darken-1",text:""},on:{click:t.deleteElection}},[t._v("Delete")])],1)],1)],1),e(st.A,{attrs:{color:t.snackbarColor,timeout:3e3},scopedSlots:t._u([{key:"action",fn:function({attrs:i}){return[e(s.A,t._b({attrs:{text:""},on:{click:function(e){t.snackbar=!1}}},"v-btn",i,!1),[t._v("Close")])]}}]),model:{value:t.snackbar,callback:function(e){t.snackbar=e},expression:"snackbar"}},[t._v(" "+t._s(t.snackbarText)+" ")])],1)},lt=[],ot=(i(396),{name:"ElectionManagementPage",data:()=>({dialog:!1,deleteDialog:!1,snackbar:!1,snackbarColor:"",snackbarText:"",loading:!1,search:"",startDateMenu:!1,endDateMenu:!1,headers:[{text:"Select",value:"actions",sortable:!1,align:"start"},{text:"Election Name",value:"name",align:"start",sortable:!0},{text:"Start Date",value:"startDate",sortable:!0},{text:"End Date",value:"endDate",sortable:!0},{text:"Type",value:"electionType",sortable:!0},{text:"Status",value:"status",sortable:!0},{text:"Actions",value:"editDelete",sortable:!1,align:"end"}],elections:[],editedIndex:-1,classrooms:[],editedItem:{_id:"",name:"",startDate:"",endDate:"",positions:[],electionType:"",classroomId:null,status:"upcoming"},defaultItem:{name:"",startDate:"",endDate:"",positions:[],electionType:"",classroomId:null,status:"upcoming"}}),computed:{formTitle(){return-1===this.editedIndex?"New Election":"Edit Election"}},created(){this.fetchElections(),this.fetchClassrooms(),this.fetchParties()},methods:{async fetchClassrooms(){try{const t=await this.$http.get("/classroom");this.classrooms=t.data.data.items}catch(t){console.error("Error fetching classrooms:",t),this.showSnackbar("Error fetching classrooms","error")}},async fetchParties(){try{const t=await this.$http.get("/party");console.log({parties:t}),this.parties=t.data.data.items}catch(t){console.error("Error fetching parties:",t),this.showSnackbar("Error fetching parties","error")}},handleElectionTypeChange(){"Classroom"!==this.editedItem.electionType&&(this.editedItem.classroomId=null)},async fetchElections(){this.loading=!0;try{const t=await this.$http.get("/election");console.log(t),this.elections=t.data.data.items}catch(t){console.error("Error fetching elections:",t),this.showSnackbar("Error fetching elections","error")}finally{this.loading=!1}},openCreateDialog(){this.editedIndex=-1,this.editedItem=Object.assign({},this.defaultItem),this.dialog=!0},openEditDialog(t){this.editedIndex=this.elections.indexOf(t),this.editedItem=Object.assign({},t),this.dialog=!0},openDeleteDialog(t){this.editedItem=Object.assign({},t),this.deleteDialog=!0},closeDialog(){this.dialog=!1,this.$nextTick((()=>{this.editedItem=Object.assign({},this.defaultItem),this.editedIndex=-1}))},closeDeleteDialog(){this.deleteDialog=!1,this.$nextTick((()=>{this.editedItem=Object.assign({},this.defaultItem)}))},async saveElection(){if(this.validateForm())try{if(this.editedIndex>-1)await this.$http.put(`/election/${this.editedItem._id}`,this.editedItem),Object.assign(this.elections[this.editedIndex],this.editedItem),this.showSnackbar("Election updated successfully","success");else{const t=await this.$http.post("/election",this.editedItem);console.log(t),this.elections.push(t.data.data.item),this.showSnackbar("Election created successfully","success")}this.closeDialog()}catch(t){console.error("Error saving election:",t),this.showSnackbar("Error saving election","error")}},async deleteElection(){try{await this.$http.delete(`/election/${this.editedItem._id}`);const t=this.elections.findIndex((t=>t._id===this.editedItem._id));this.elections.splice(t,1),this.closeDeleteDialog(),this.showSnackbar("Election deleted successfully","success")}catch(t){console.error("Error deleting election:",t),this.showSnackbar("Error deleting election","error")}},showSnackbar(t,e){this.snackbarText=t,this.snackbarColor=e,this.snackbar=!0},validateForm(){return this.editedItem.name?this.editedItem.startDate?this.editedItem.endDate?this.editedItem.electionType?"Classroom"!==this.editedItem.electionType||this.editedItem.classroomId?!(new Date(this.editedItem.startDate)>new Date(this.editedItem.endDate))||(this.showSnackbar("End date must be after start date","error"),!1):(this.showSnackbar("Classroom is required for Classroom elections","error"),!1):(this.showSnackbar("Election type is required","error"),!1):(this.showSnackbar("End date is required","error"),!1):(this.showSnackbar("Start date is required","error"),!1):(this.showSnackbar("Election name is required","error"),!1)},goToCandidatesList(t){this.$router.push({name:"Candidate Lists",params:{id:t}})},formatDate(t){return new Date(t).toLocaleDateString()}}}),ht=ot,ct=i(1656),dt=(0,ct.A)(ht,rt,lt,!1,null,null,null),ut=dt.exports}}]);
//# sourceMappingURL=460.6fd8ad10.js.map