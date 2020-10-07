(this.webpackJsonpclient=this.webpackJsonpclient||[]).push([[0],{58:function(e,t,n){e.exports=n(71)},68:function(e,t,n){},71:function(e,t,n){"use strict";n.r(t);var a=n(0),r=n.n(a),c=n(19),u=n.n(c),o=n(18),s=n(23),i=n(43),l=n(15),p=n.n(l),m=n(24),f=n(35),E=n.n(f),d=function(e){return{type:"campaigns/SET_CAMPAIGNS",campaigns:e}};var h=function(e){return{type:"auth/SET_USER",user:e}};var g,v=Object(s.c)({auth:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{id:null},t=arguments.length>1?arguments[1]:void 0;switch(t.type){case"auth/SET_USER":return t.user;default:return e}},campaigns:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:[],t=arguments.length>1?arguments[1]:void 0,n=Object.assign({},e);switch(t.type){case"campaigns/SET_CAMPAIGNS":return t.campaigns;case"campaigns/ADD_CAMPAIGN":return n.push(t.campaign),n;default:return e}}});g=Object(s.a)(i.a);n(68);var b=n(33),x=n(6),j=function(e){var t=e.component,n=e.path,a=e.currentUserId,c=e.exact;e.history;return r.a.createElement(x.b,{path:n,exact:c,render:function(e){return a?r.a.createElement(t,e):r.a.createElement(x.a,{to:"/welcome"})}})},O=function(e){var t=e.component,n=e.path,a=e.currentUserId,c=e.exact;e.history;return r.a.createElement(x.b,{path:n,exact:c,render:function(e){return a?r.a.createElement(x.a,{to:"/users/:userId/campaigns"}):r.a.createElement(t,e)}})},w=n(87),y=n(86),k=n(84),_=n(85),S=function(e){return r.a.createElement(r.a.Fragment,null,r.a.createElement(k.a,{item:!0,xs:4},r.a.createElement(_.a,{onClick:function(e){e.preventDefault(),window.location="/campaigns/".concat(e.target.id)},id:e.id},r.a.createElement(y.a,{variant:"button"},e.title),r.a.createElement(y.a,{variant:"caption"},e.description))))},I=function(){var e=Object(o.c)((function(e){return e.campaigns}));return r.a.createElement(r.a.Fragment,null,r.a.createElement(w.a,null,r.a.createElement(y.a,{variant:"h4"},"Your Campaigns"),r.a.createElement(k.a,{container:!0},e.map((function(e){return r.a.createElement(S,{key:e.id,id:e.id,title:e.title,description:e.description})})))))},C=n(93),T=n(89),F=n(90),N=n(94),A=n(91),R=n(92),U=n(88),D=n(47),K=n.n(D),M=n(48),P=n.n(M),X=Object(U.a)({toolbar:{justifyContent:"space-between"}}),G=function(){var e=Object(o.b)(),t=X();return r.a.createElement(r.a.Fragment,null,r.a.createElement(T.a,{position:"static"},r.a.createElement(F.a,{display:"flex",variant:"dense",className:t.toolbar},r.a.createElement(N.a,null,r.a.createElement(y.a,{variant:"button"},"LoreKeeper")),r.a.createElement(N.a,null,r.a.createElement(A.a,{onClick:function(t){var n,a;t.preventDefault(),e((n="Ian",a="password",function(){var e=Object(m.a)(p.a.mark((function e(t){var r,c,u,o;return p.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return r=E.a.get("XSRF-TOKEN"),e.next=3,fetch("/api/session/login/",{method:"post",headers:{"Content-Type":"application/json","X-CSRFTOKEN":r},body:JSON.stringify({username:n,password:a,csrf_token:r})});case 3:return c=e.sent,e.next=6,c.json();case 6:return u=e.sent,o=u.campaigns,t(d(o)),delete u.campaigns,c.ok&&!u.errors?(t(h(u)),c.data=u):c.errors=u.errors,e.abrupt("return",c);case 12:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}()))}},"Login"),r.a.createElement(A.a,{onClick:function(t){t.preventDefault(),e(function(){var e=Object(m.a)(p.a.mark((function e(t){var n,a,r;return p.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return n=E.a.get("XSRF-TOKEN"),e.next=3,fetch("/api/session/logout/",{method:"get",headers:{"Content-Type":"application/json","XSRF-TOKEN":n}});case 3:return a=e.sent,e.next=6,a.json();case 6:return r=e.sent,a.ok&&!r.errors?(t(h({id:null})),t(d([]))):a.errors=r.errors,e.abrupt("return",a);case 9:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}())}},"Logout"),r.a.createElement(A.a,{endIcon:r.a.createElement(K.a,null)},"Campaigns"),r.a.createElement(R.a,null,r.a.createElement(P.a,null))))))},J=function(){return r.a.createElement(r.a.Fragment,null,r.a.createElement("h1",null,"Welcome Page"))};var L,B=function(){console.log("____Rendering app_____");var e=Object(o.b)();Object(a.useEffect)((function(){(function(){var e=Object(m.a)(p.a.mark((function e(){return p.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,fetch("/api/session/csrf/");case 2:if(!e.sent.ok){e.next=5;break}return e.abrupt("return");case 5:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}})()()}),[]),Object(a.useEffect)((function(){(function(){var t=Object(m.a)(p.a.mark((function t(){var n,a,r;return p.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,fetch("/api/session/current-user/");case 2:if(!(n=t.sent).ok){t.next=11;break}return t.next=6,n.json();case 6:a=t.sent,r=a.campaigns,e(d(r)),delete a.campaigns,e(h(a));case 11:case"end":return t.stop()}}),t)})));return function(){return t.apply(this,arguments)}})()()}),[]);var t=Object(o.c)((function(e){return e.auth.id}));return r.a.createElement(r.a.Fragment,null,r.a.createElement(C.a,null),r.a.createElement(b.a,null,r.a.createElement(G,null),r.a.createElement(x.d,null,r.a.createElement(j,{path:"/users/:userId/campaigns",exact:!0,component:I,currentUserId:t}),r.a.createElement(O,{path:"/welcome",exact:!0,component:J,currentUserId:t}),r.a.createElement(O,{path:"/",exact:!0,component:J,currentUserId:t}))))},W=Object(s.d)(v,L,g);u.a.render(r.a.createElement(r.a.StrictMode,null,r.a.createElement(o.a,{store:W},r.a.createElement(B,null))),document.getElementById("root"))}},[[58,1,2]]]);
//# sourceMappingURL=main.05ee95b9.chunk.js.map