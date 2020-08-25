(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([[4],{"8b24":function(e,t,s){"use strict";s.r(t);var i=function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("q-page",{},[s("div",{staticStyle:{"max-width":"900px","margin-left":"auto","margin-right":"auto"}},[s("div",{staticStyle:{height:"50px"}}),s("div",{staticClass:"q-ma-md"},[s("q-form",{staticClass:"q-gutter-md",on:{submit:e.onSubmit}},[s("div",{},[s("q-expansion-item",{attrs:{"expand-separator":"",label:"Fetcher List 請選擇你想搜尋的站點"},model:{value:e.isFetcherListExpanded,callback:function(t){e.isFetcherListExpanded=t},expression:"isFetcherListExpanded"}},[s("q-card",[s("q-card-section",[s("q-checkbox",{attrs:{label:"All 全選"},on:{input:e.fetcherListAllSelect},model:{value:e.isFetcherListAllSelect,callback:function(t){e.isFetcherListAllSelect=t},expression:"isFetcherListAllSelect"}}),s("q-option-group",{attrs:{name:"accepted_genres",options:e.fetcherListOptions,type:"checkbox",color:"primary",inline:""},model:{value:e.fetcherListAccepted,callback:function(t){e.fetcherListAccepted=t},expression:"fetcherListAccepted"}})],1)],1)],1)],1),s("q-input",{attrs:{label:"Keyword 關鍵字",placeholder:""},scopedSlots:e._u([0!==e.keywords.length?{key:"append",fn:function(){return[s("q-icon",{staticClass:"cursor-pointer",attrs:{name:"close"},on:{click:function(t){e.keywords=""}}})]},proxy:!0}:null],null,!0),model:{value:e.keywords,callback:function(t){e.keywords=t},expression:"keywords"}}),s("q-select",{attrs:{options:e.timeLimitOptions,label:"Time Limit 搜尋文章的時間範圍"},model:{value:e.timeLimitModel,callback:function(t){e.timeLimitModel=t},expression:"timeLimitModel"}}),s("q-select",{attrs:{options:e.concurrencyOptions,label:"Concurrency 並發數 注：數值越高越耗費系統資源"},model:{value:e.concurrencyModel,callback:function(t){e.concurrencyModel=t},expression:"concurrencyModel"}}),s("div",[s("q-btn",{attrs:{label:"Submit",type:"submit",color:"primary",disable:e.isSubmitDisabled}}),s("q-ajax-bar",{ref:"bar",attrs:{position:"bottom",color:"primary",size:"10px","skip-hijack":""}})],1)],1)],1),e.isResultUrlsShow?s("div",{staticClass:"q-ma-md"},[s("q-table",{attrs:{title:"Result Urls",data:e.resultUrlsData,columns:e.resultUrlsColumns,"row-key":"link-href","rows-per-page-options":[0]},scopedSlots:e._u([{key:"top-right",fn:function(){return[s("q-btn",{attrs:{color:"primary","icon-right":"archive",label:"Export to csv","no-caps":""},on:{click:e.exportTable}})]},proxy:!0}],null,!1,1388069608)})],1):e._e()])])},o=[],a=(s("ddb0"),s("ded3")),n=s.n(a),r=s("c973"),l=s.n(r),c=s("a357");const u=(e,t)=>{let s=void 0!==t?t(e):e;return s=void 0===s||null===s?"":String(s),s=s.split('"').join('""'),`"${s}"`};var d={data(){return{keywords:"",isFetcherListAllSelect:!1,isFetcherListExpanded:!0,fetcherListAccepted:[],fetcherListOptions:[],timeLimitModel:"Any",timeLimitOptions:["Any","Day","Week","Year"],concurrencyModel:1,concurrencyOptions:[1,2,3,4,5],isSubmitDisabled:!1,isResultUrlsShow:!1,resultUrlsData:[],resultUrlsColumns:[{name:"status",label:"Status",align:"left",field:"status",sortable:!0},{name:"name",label:"Title",align:"left",field:"link",sortable:!0},{name:"snippet",label:"Snippet",align:"left",field:"snippet",sortable:!0},{name:"url",label:"Url",align:"center",field:"link-href",sortable:!1}],isFetchJobStarted:!1,fetchJobQueue:[],workingJobQueue:[],rowCnt:0}},methods:{onSubmit(){var e=this;return l()((function*(){console.info("[methods][onSubmit]");const t=e.$refs.bar;e.isSubmitDisabled=!0;for(const s of e.fetcherListAccepted)t.start(),yield e.$http.get("/urlLists",{params:{news:s,keyword:e.keywords,timeLimit:e.timeLimitModel}}).then(i=>{if(t.stop(),"[]"===i.data)console.error("error");else{e.isFetcherListExpanded=!1,e.isResultUrlsShow=!0;for(const t of i.data){const i=n()(n()({},t),{},{status:"waiting",newsName:s});e.fetchJobQueue.push(i),e.resultUrlsData.push(i)}}});e.isSubmitDisabled=!1,e.resultUrlsData.length>0&&(e.isFetchJobStarted||e.fetchJob())}))()},fetcherListAllSelect(e,t){console.info("[methods][fetcherListAllSelect]"),this.isfetcherListAllSelect=e;const s=[];for(const i of this.fetcherListOptions)s.push(i.value);this.isfetcherListAllSelect?this.fetcherListAccepted=s:this.fetcherListAccepted=[]},exportTable(){console.info("[methods][exportTable]");const e=[this.resultUrlsColumns.map(e=>u(e.label))].concat(this.resultUrlsData.map(e=>this.resultUrlsColumns.map(t=>u("function"===typeof t.field?t.field(e):e[void 0===t.field?t.name:t.field],t.format)).join(","))).join("\r\n"),t=new Date,s=`${t.getFullYear()}${t.getMonth()}${t.getDate()}-${t.getHours()}${t.getMinutes()}${t.getSeconds()}`,i=Object(c["a"])(`news-crawler-home-export-${s}.csv`,e,"text/csv");!0!==i&&this.$q.notify({message:"Browser denied file download...",color:"negative",icon:"warning"})},fetchJob(){var e=this;return l()((function*(){console.info("[methods][fetchJob]"),e.isFetchJobStarted=!0,e.dispatcher=setInterval(()=>{console.info("[method][pushingWorkingQueue]");while(e.workingJobQueue.length<e.concurrencyModel&&e.fetchJobQueue.length>0&&e.isFetchJobStarted)e.workingJobQueue.push(e.fetchJobQueue.shift());e.fetchJobQueue.length<=0&&e.workingJobQueue.length<=0&&(console.info("[method][fetchJob]: Fetching Done!"),e.isFetchJobStarted=!1,clearInterval(e.dispatcher)),setTimeout(e.jobHandler,3e3)},6e3)}))()},jobHandler(){if(console.info("[method][getStatus]"),this.isFetchJobStarted){const e=[];while(this.workingJobQueue.length>0){const t=this.workingJobQueue.shift();switch(t.status){case"waiting":this.postJob(t["link-href"],t.newsName),t.status="running",e.push(t);break;case"running":t.status="checking",this.checkStatus(t),e.push(t);break;case"checking":e.push(t);break;default:break}}while(e.length>0)this.workingJobQueue.push(e.pop())}},postJob(e,t){var s=this;return l()((function*(){yield s.$http.post("/fetchJob",{url:e,newsName:t}).then(e=>{-1===e.data.code&&console.error(e.data.data.msg)})}))()},checkStatus(e){var t=this;return l()((function*(){yield t.$http.get("/statusJob",{params:{url:e["link-href"]}}).then(t=>{"completed"===t.data.status||"failed"===t.data.status?e.status=t.data.status:e.status="running"})}))()}},mounted(){window.vue=this;const e=this.$refs.bar;e.start(),this.$http.get("/function/listAllNews",{params:{}}).then(t=>{-1===t.data.code?console.error(t.data.data.msg):(e.stop(),this.fetcherListOptions=t.data)})}},h=d,p=s("2877"),f=s("9989"),b=s("0378"),m=s("3b73"),g=s("f09f"),k=s("a370"),w=s("8f8e"),S=s("9f0a"),y=s("27f9"),L=s("0016"),x=s("ddd8"),v=s("9c40"),J=s("7ea5"),Q=s("eaac"),A=s("eebe"),q=s.n(A),F=Object(p["a"])(h,i,o,!1,null,null,null);t["default"]=F.exports;q()(F,"components",{QPage:f["a"],QForm:b["a"],QExpansionItem:m["a"],QCard:g["a"],QCardSection:k["a"],QCheckbox:w["a"],QOptionGroup:S["a"],QInput:y["a"],QIcon:L["a"],QSelect:x["a"],QBtn:v["a"],QAjaxBar:J["a"],QTable:Q["a"]})}}]);