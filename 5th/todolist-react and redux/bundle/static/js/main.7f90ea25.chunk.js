(this.webpackJsonptodolist=this.webpackJsonptodolist||[]).push([[0],{18:function(e,t,n){e.exports=n(32)},28:function(e,t,n){},29:function(e,t,n){},30:function(e,t,n){},31:function(e,t,n){},32:function(e,t,n){"use strict";n.r(t);var r={};n.r(r),n.d(r,"taskReducer1",(function(){return S})),n.d(r,"taskReducer2",(function(){return N})),n.d(r,"filterSelect",(function(){return w}));var a=n(0),i=n.n(a),o=n(11),c=n.n(o),l=n(1),u=(n(28),n(2)),s=n(3),d=n(6),p=n(5),f=n(7),m=function(e){var t=e.className,n=e.onRemove,r=e.onSelected,a=e.catId,o=e.name;return i.a.createElement("h1",null,i.a.createElement("input",{type:"button",value:"X",onClick:n}),i.a.createElement("p",{className:t,"data-id":a,onClick:r},o,i.a.createElement("span",null)))},v=function(e){return{type:"Selected",id:e}},h=Object(l.b)((function(e){return{todos:e.list,selected:e.selected}}),(function(e){return{onRemove:function(t){e({type:"Remove",id:t}),e(v(null))},onSelect:function(t){e(v(t))}}}))((function(e){var t=e.todos,n=e.selected,r=e.onSelect,a=e.onRemove;return t.sort((function(e,t){return e.id-t.id})),i.a.createElement("ul",{className:"ul1"},t.map((function(e){return function e(t){return i.a.createElement("li",{key:t.id},i.a.createElement(m,{className:n===t.id?"hover":[],catId:t.id,name:t.catName,onRemove:function(){return a(t.id)},onSelected:function(){return r(t.id)}}),i.a.createElement("ul",{className:"ul2"},0!==t.list.length?t.list.sort((function(e,t){return e.id-t.id})).map((function(t){return e(t)})):[]))}(e)})))})),E=(n(29),Object(l.b)((function(e){return{id:e.selected}}),(function(e){return{onAdd:function(t,n){e(function(e,t){return{type:"Add",id:Date.parse(new Date),catName:e,selectedId:t}}(t,n))},onRemove:function(t){"DIV"===t.nodeName&&e(v(null))}}}))((function(e){var t=e.onAdd,n=e.id,r=e.onRemove;return i.a.createElement("div",{id:"task",onClick:function(e){return r(e.target)}},i.a.createElement("p",null,"\u6240\u6709\u4efb\u52a1",i.a.createElement("span",null)),i.a.createElement("p",null,"\u5206\u7c7b\u5217\u8868"),i.a.createElement(h,null),i.a.createElement("div",{className:"foot",onClick:function(){var e=prompt("\u8bf7\u8f93\u5165\u8981\u6dfb\u52a0\u7684\u5206\u7c7b\u540d\u79f0");e&&(console.log(n),t(e,n))}},"\u6dfb\u52a0\u5206\u7c7b"))}))),k=function(e){return JSON.parse(JSON.stringify(e))},g=function(e){return{type:"TASK/Selected",id:e}},b=n(17),O={ALL:"\u5168\u90e8",COMPLETED:"\u5df2\u5b8c\u6210",UNCOMPLETED:"\u672a\u5b8c\u6210"},y="\u663e\u793a",C="\u7f16\u8f91";function j(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function I(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?j(n,!0).forEach((function(t){Object(b.a)(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):j(n).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}var S=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:[],t=arguments.length>1?arguments[1]:void 0;switch(t.type){case"TASK/Add":for(var n=JSON.parse(JSON.stringify(e)),r=1,a=0;a<n.length;a++)if(n[a].taskId===t.selected)for(var i in t.task)n[a][i]=t.task[i],r=0;return r&&n.push({parentId:t.id,taskId:Date.parse(new Date),title:t.task.title,time:t.task.time,content:t.task.content,done:!1}),n;case"TASK/Remove":return e.filter((function(e){return e.taskId!==t.id}));case"TASK/Toggle":return e.map((function(e){return e.taskId===t.id?I({},e,{done:t.done}):e}));default:return e}},N=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:[],t=arguments.length>1?arguments[1]:void 0;switch(t.type){case"TASK/Selected":return t.id;default:return e}},w=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:O.ALL,t=arguments.length>1?arguments[1]:void 0;switch(t.type){case"FilterSelected":return{name:t.filter};default:return e}},T=function(e){var t=e.item,n=e.onSelect,r=e.onRemove,a=e.className;return i.a.createElement("li",{"task-id":t.taskId,onClick:n,className:a},i.a.createElement("input",{type:"button",value:"X",onClick:r}),i.a.createElement("p",{className:!0===t.done?"donetrue":[]},t.title))};function A(e,t,n){for(var r=[],a=0;a<t.length;a++)t[a].parentId===e&&r.push(t[a]);switch(n){case O.ALL:return r;case O.UNCOMPLETED:return r.filter((function(e){return!e.done}));case O.COMPLETED:return r.filter((function(e){return e.done}));default:throw new Error("unsupported filter")}}var D=Object(l.b)((function(e){return{task:A(e.selected,e.task,e.filter.name),selected:e.selectedTask}}),(function(e,t){return{onSelect:function(t){e(g(t))},onRemove:function(t){e({type:"TASK/Remove",id:t})},removeSelected:function(t){"DIV"===t.nodeName&&e(g(null))}}}))((function(e){var t=e.task,n=e.selected,r=e.onSelect,a=e.onRemove,o=e.removeSelected,c={};t.forEach((function(e){c[e.time]||(c[e.time]=[]),c[e.time].push(e)}));var l=[];for(var u in c)l.push(c[u]);return i.a.createElement("div",{id:"list2",onClick:function(e){return o(e.target)}},l.map((function(e){return i.a.createElement("ul",{className:"ul3",key:e[0].time},i.a.createElement("span",null,e[0].time),e.map((function(e){return i.a.createElement(T,{key:e.taskId,item:e,className:n===e.taskId?"hover2":[],onSelect:function(){return r(e.taskId)},onRemove:function(){return a(e.taskId)}})})))})))})),L=Object(l.b)((function(e,t){return{filter:e.filter.name}}),(function(e,t){return{onClick:function(t){e({type:"FilterSelected",filter:t})}}}))((function(e){var t=e.filter,n=e.onClick;return i.a.createElement("div",{id:"list1"},i.a.createElement("ul",null,i.a.createElement("li",{className:t===O.ALL?"hover3":[],onClick:function(){return n(O.ALL)}},O.ALL),i.a.createElement("li",{className:t===O.UNCOMPLETED?"hover3":[],onClick:function(){return n(O.UNCOMPLETED)}},O.UNCOMPLETED),i.a.createElement("li",{className:t===O.COMPLETED?"hover3":[],onClick:function(){return n(O.COMPLETED)}},O.COMPLETED)))})),P=(n(30),Object(l.b)((function(e,t){return{catId:e.selected}}),(function(e,t){return{onAdd:function(){e(g(null)),e({type:"Content/edit"})}}}))((function(e){var t=e.onAdd,n=e.catId;return i.a.createElement("div",{id:"list"},i.a.createElement(L,null),i.a.createElement(D,null),i.a.createElement("div",{className:"foot foot2",onClick:function(){return n||0===n?t():[]}},"\u6dfb\u52a0\u4efb\u52a1"))}))),R="Content/display",M=function(){return{type:R}},J=n(4),K=function(e){function t(e){var n;return Object(u.a)(this,t),(n=Object(d.a)(this,Object(p.a)(t).call(this,e))).onInputChange=n.onInputChange.bind(Object(J.a)(n)),n}return Object(f.a)(t,e),Object(s.a)(t,[{key:"onInputChange",value:function(e){var t={content:e.target.value};this.props.prop(t)}},{key:"render",value:function(){return this.props.active===y?i.a.createElement("div",{id:"taskContent2"},this.props.content):this.props.active===C?i.a.createElement("div",null,i.a.createElement("textarea",{cols:"300",rows:"100",placeholder:"\u4efb\u52a1\u5185\u5bb9",onChange:this.onInputChange,defaultValue:this.props.content})):void 0}}]),t}(a.Component),U=function(e){function t(e){var n;return Object(u.a)(this,t),(n=Object(d.a)(this,Object(p.a)(t).call(this,e))).onInputChange=n.onInputChange.bind(Object(J.a)(n)),n}return Object(f.a)(t,e),Object(s.a)(t,[{key:"onInputChange",value:function(e){var t={title:e.target.value};this.props.prop(t)}},{key:"render",value:function(){return this.props.active===y?i.a.createElement("span",null,this.props.title):this.props.active===C?i.a.createElement("span",null,i.a.createElement("input",{type:"text",placeholder:"\u53ef\u8f93\u5165\u5341\u4e2a\u5b57\u7b26\u4ee5\u5185",onChange:this.onInputChange,defaultValue:this.props.title})):void 0}}]),t}(a.Component),V=function(e){function t(e){var n;return Object(u.a)(this,t),(n=Object(d.a)(this,Object(p.a)(t).call(this,e))).onInputChange=n.onInputChange.bind(Object(J.a)(n)),n}return Object(f.a)(t,e),Object(s.a)(t,[{key:"onInputChange",value:function(e){var t={time:e.target.value};this.props.prop(t)}},{key:"render",value:function(){return this.props.active===y?i.a.createElement("p",null,"\u4efb\u52a1\u65e5\u671f\uff1a",i.a.createElement("span",null,this.props.time)):this.props.active===C?i.a.createElement("p",null,"\u4efb\u52a1\u65e5\u671f\uff1a",i.a.createElement("span",null,i.a.createElement("input",{type:"text",placeholder:"yyyy-mm-dd",onChange:this.onInputChange,defaultValue:this.props.time}))):void 0}}]),t}(a.Component),x=(n(31),function(e){function t(e){var n;return Object(u.a)(this,t),(n=Object(d.a)(this,Object(p.a)(t).call(this,e))).deliver=n.deliver.bind(Object(J.a)(n)),n}return Object(f.a)(t,e),Object(s.a)(t,[{key:"deliver",value:function(e){this.setState(e)}},{key:"render",value:function(){var e=this;return i.a.createElement("div",{className:"content"},this.props.active===y?i.a.createElement("div",{className:"content1"},i.a.createElement(U,{prop:this.deliver,title:this.props.target.title,active:this.props.active}),i.a.createElement("input",{type:"button",value:"\u7f16\u8f91",onClick:function(){return e.props.taskId||0===e.props.taskId?e.props.onEdit():[]}}),i.a.createElement("input",{type:"button",value:"\u5b8c\u6210",onClick:function(){return e.props.onChangeState(e.props.taskId,!0)}}),i.a.createElement("input",{type:"button",value:"\u53d6\u6d88\u5b8c\u6210",onClick:function(){return e.props.onChangeState(e.props.taskId,!1)}})):i.a.createElement("div",{className:"content1"},i.a.createElement(U,{prop:this.deliver,title:this.props.target.title,active:this.props.active}),i.a.createElement("input",{type:"button",value:"\u53d6\u6d88",onClick:function(){return e.props.onCancel()}}),i.a.createElement("input",{type:"button",value:"\u786e\u8ba4",onClick:function(){return e.props.onFinish(e.state,e.props.id,e.props.taskId)}})),i.a.createElement(V,{prop:this.deliver,time:this.props.target.time,active:this.props.active}),i.a.createElement(K,{prop:this.deliver,content:this.props.target.content,active:this.props.active}))}}]),t}(a.Component));function F(e,t){for(var n,r=0;r<t.length;r++)t[r].taskId===e&&(n=t[r]);return n||0}var B=Object(l.b)((function(e,t){return{target:F(e.selectedTask,e.task),active:e.taskState,taskId:e.selectedTask,id:e.selected}}),(function(e,t){return{onEdit:function(){e({type:"Content/edit"})},onChangeState:function(t,n){e(function(e,t){return{type:"TASK/Toggle",id:e,done:t}}(t,n))},onCancel:function(){e(M())},onFinish:function(t,n,r){if(t.title.length>10||-1===t.time.search(/^\d{4}-\d{2}-\d{2}$/)||0===t.content.length)return!1;e(function(e,t,n){return{type:"TASK/Add",task:e,id:t,selected:n}}(t,n,r)),e(M())}}}))(x),W=function(e){function t(){return Object(u.a)(this,t),Object(d.a)(this,Object(p.a)(t).apply(this,arguments))}return Object(f.a)(t,e),Object(s.a)(t,[{key:"render",value:function(){return i.a.createElement("div",{className:"div1"},i.a.createElement(E,null),i.a.createElement(P,null),i.a.createElement(B,null))}},{key:"componentDidMount",value:function(){localStorage.setItem("state",JSON.stringify(this.props.prop))}},{key:"componentDidUpdate",value:function(){localStorage.setItem("state",JSON.stringify(this.props.prop))}}]),t}(a.Component),X=Object(l.b)((function(e,t){return{prop:e}}))(W);Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));var $=n(10),q=Object($.b)({list:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:[],t=arguments.length>1?arguments[1]:void 0;switch(t.type){case"Add":var n=k(e);return t.selectedId||0===t.selectedId?function e(n){for(var r=0;r<n.length;r++)n[r].id===t.selectedId&&n[r].list.push({id:t.id,catName:t.catName,list:[]}),0!==n[r].list.length&&e(n[r].list)}(n):n.push({id:t.id,catName:t.catName,list:[]}),n;case"Remove":var r=k(e);return function e(n){for(var r=0;r<n.length;r++)0!==n[r].list.length&&e(n[r].list),n[r].id===t.id&&n.splice(r,1)}(r),r;default:return e}},selected:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:[],t=arguments.length>1?arguments[1]:void 0;return"Selected"===t.type?t.id:e},filter:r.filterSelect,task:r.taskReducer1,selectedTask:r.taskReducer2,taskState:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:[],t=arguments.length>1?arguments[1]:void 0;switch(t.type){case R:return y;case"Content/edit":return C;default:return e}}}),z=JSON.parse(localStorage.getItem("state"))||{list:[{id:0,catName:"\u9ed8\u8ba4\u5206\u7c7b",list:[{id:1,catName:"\u9ed8\u8ba4\u5206\u7c7b\u5b50\u5206\u7c7b1",list:[]},{id:2,catName:"\u9ed8\u8ba4\u5206\u7c7b\u5b50\u5206\u7c7b2",list:[]}]}],selected:0,selectedTask:0,filter:{name:"\u5168\u90e8"},task:[{parentId:0,taskId:0,title:"\u9ed8\u8ba4\u5206\u7c7b\u793a\u4f8b",time:"1970-01-01",done:!0,content:"\u4efb\u52a1\u5185\u5bb9"}],taskState:"\u663e\u793a"},G=Object($.c)(q,z);c.a.render(i.a.createElement(l.a,{store:G},i.a.createElement(X,null)),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()}))}},[[18,1,2]]]);
//# sourceMappingURL=main.7f90ea25.chunk.js.map