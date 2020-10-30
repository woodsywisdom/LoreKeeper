(this.webpackJsonpclient=this.webpackJsonpclient||[]).push([[0],{111:function(e,t,n){e.exports=n(124)},121:function(e,t,n){},124:function(e,t,n){"use strict";n.r(t);var a=n(0),r=n.n(a),c=n(11),i=n.n(c),o=n(7),u=n(46),s=n(90),l=n(8),p=n.n(l),m=n(17),d=n(28),f=n.n(d),g=function(e){return{type:"campaigns/SET_CAMPAIGNS",campaigns:e}},E=function(e){return{type:"campaigns/REMOVE_CAMPAIGN",campaignId:e}};var h=function(e){return{type:"categories/SET_CATEGORIES",categories:e}};var b=function(e){return{type:"tags/SET_TAGS",tags:e}},v=function(e,t){return{type:"tags/MOVE_TAG",tag:e,newCategoryId:t}},O=function(e,t){return function(){var n=Object(m.a)(p.a.mark((function n(a){var r,c,i,o;return p.a.wrap((function(n){for(;;)switch(n.prev=n.next){case 0:return r=f.a.get("XSRF-TOKEN"),c={newCategoryId:t,tag:e},n.next=4,fetch("/api/tags/".concat(e.id,"/"),{method:"put",headers:{"Content-Type":"application/json","X-CSRFTOKEN":r},body:JSON.stringify(c)});case 4:return i=n.sent,n.next=7,i.json();case 7:return o=n.sent,i.ok&&!o.errors?a(v(e,t)):i.errors=o.errors,n.abrupt("return",i);case 10:case"end":return n.stop()}}),n)})));return function(e){return n.apply(this,arguments)}}()};var y=n(37),C=function(e,t,n,a){return function(){var r=Object(m.a)(p.a.mark((function r(c){var i,o,u,s,l,m;return p.a.wrap((function(r){for(;;)switch(r.prev=r.next){case 0:return i=f.a.get("XSRF-TOKEN"),o=JSON.stringify({noteContent:e,hashtagIds:t,newHashtags:a,csrf_token:i}),r.next=4,fetch("/api/campaigns/".concat(n,"/"),{method:"post",headers:{"Content-Type":"application/json","X-CSRFTOKEN":i},body:o});case 4:return u=r.sent,r.next=7,u.json();case 7:return s=r.sent,u.ok&&!s.errors?(l=s.newNote,m=s.newTags,c({type:"notes/ADD_NOTE",note:l}),c({type:"tags/ADD_TAGS",tags:m}),u.errors=[]):u.errors=s.errors,r.abrupt("return",s);case 10:case"end":return r.stop()}}),r)})));return function(e){return r.apply(this,arguments)}}()};var j=n(97),N=function(e){return{type:"ui/SET_CURRENT_SESSION",currentSession:e}},x=function(e){return{type:"ui/EDIT_TAG",tag:e}},S={currentSession:{},pinnedTags:[],currentCampaign:{},tagToEdit:{},loginOpen:!1};var T={login:[],signUp:[]};var w=function(e){return{type:"auth/SET_USER",user:e}},_=function(e,t){return function(){var n=Object(m.a)(p.a.mark((function n(a){var r,c,i,o;return p.a.wrap((function(n){for(;;)switch(n.prev=n.next){case 0:return a({type:"errors/CLEAR_LOGIN"}),a({type:"errors/CLEAR_SIGNUP"}),r=f.a.get("XSRF-TOKEN"),n.next=5,fetch("/api/session/login/",{method:"post",headers:{"Content-Type":"application/json","X-CSRFTOKEN":r},body:JSON.stringify({username:e,password:t,csrf_token:r})});case 5:return c=n.sent,n.next=8,c.json();case 8:i=n.sent,c.ok&&!i.errors?(a(w(i)),i.campaigns&&(o=i.campaigns,a(g(o)),delete i.campaigns)):a({type:"errors/SET_LOGIN",errors:i.errors});case 10:case"end":return n.stop()}}),n)})));return function(e){return n.apply(this,arguments)}}()};var k,I=Object(u.c)({campaigns:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},t=arguments.length>1?arguments[1]:void 0,n=Object.assign({},e);switch(t.type){case"campaigns/SET_CAMPAIGNS":return t.campaigns;case"campaigns/ADD_CAMPAIGN":var a=t.campaign;return n[a.id]=a,n;case"campaigns/REMOVE_CAMPAIGN":return delete n[t.campaignId],n;case"campaigns/CLEAR_CAMPAIGNS":return{};default:return e}},categories:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:[],t=arguments.length>1?arguments[1]:void 0;switch(t.type){case"categories/SET_CATEGORIES":return t.categories;case"categories/CLEAR_CATEGORIES":return[];default:return e}},tags:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},t=arguments.length>1?arguments[1]:void 0,n=Object.assign({},e);switch(t.type){case"tags/SET_TAGS":return t.tags;case"tags/ADD_TAG":return n[t.tag.name]=t.tag,n;case"tags/ADD_TAGS":return Object.values(t.tags).forEach((function(e){n[e.name]=e})),n;case"tags/MOVE_TAG":return n[t.tag.name].category_id=t.newCategoryId,n;case"tags/CLEAR_TAGS":return{};default:return e}},notes:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},t=arguments.length>1?arguments[1]:void 0,n=Object.assign({},e);switch(t.type){case"notes/ADD_NOTE":var a=t.note;return a.tags.forEach((function(e){e in n&&(n[e]=[].concat(Object(y.a)(n[e]),[a]))})),n;case"notes/SET_NOTES":return n[t.tagName]=t.notes,n;case"notes/CLEAR_NOTES":return{};default:return e}}}),A=Object(u.c)({auth:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{id:null},t=arguments.length>1?arguments[1]:void 0;switch(t.type){case"auth/SET_USER":return t.user;default:return e}},entities:I,ui:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:S,t=arguments.length>1?arguments[1]:void 0,n=Object.assign({},e);switch(t.type){case"ui/SET_CURRENT_CAMPAIGN":return n.currentCampaign=t.currentCampaign,n;case"ui/SET_CURRENT_SESSION":return n.currentSession=t.currentSession,n;case"ui/SET_PINS":return n.pinnedTags=t.pins,n;case"ui/PIN_TAG":return n.pinnedTags=[].concat(Object(y.a)(n.pinnedTags),[t.tag]),n;case"ui/UNPIN_TAG":return n.pinnedTags=[].concat(Object(y.a)(n.pinnedTags.slice(0,t.position)),Object(y.a)(n.pinnedTags.slice(t.position+1))),n;case"ui/EDIT_TAG":return n.tagToEdit=Object(j.a)({},t.tag),n;case"ui/OPEN_LOGIN":return n.loginOpen=!0,n;case"ui/CLOSE_LOGIN":return n.loginOpen=!1,n;case"ui/CLEAR_UI":return S;default:return e}},errors:function(){var e,t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:T,n=arguments.length>1?arguments[1]:void 0,a=Object.assign({},t);switch(n.type){case"errors/SET_LOGIN":return a.login.push(Object(y.a)(n.errors)),a;case"errors/CLEAR_LOGIN":return a.login=[],a;case"errors/SET_SIGNUP":return(e=a.signUp).push.apply(e,Object(y.a)(n.errors)),a;case"errors/CLEAR_SIGNUP":return a.signUp=[],a;default:return t}}});k=Object(u.a)(s.a);n(121);var L=n(14),R=n(61),G=n(184),F=n(95),P=n(183),D=n(162),U=n(164),K=n(185),B=n(59),M=n(126),X=n(96),J=n(166),H=n(160),q=n(49),V=n.n(q),W=Object(H.a)((function(e){return{toolbar:{height:"6vh",justifyContent:"space-between",alignItems:"center"},appBar:{height:"6vh",zIndex:e.zIndex.drawer+1},logoButton:{cursor:"pointer"}}})),z=function(){var e=Object(o.b)(),t=W(),n=Object(o.c)((function(e){return e.ui.currentCampaign})),c=Object(o.c)((function(e){return e.entities.campaigns})),i=Object(o.c)((function(e){return e.auth})),u=Object(a.useState)(null),s=Object(L.a)(u,2),l=s[0],d=s[1];Object(a.useEffect)((function(){var t;e((t=i.id,function(){var e=Object(m.a)(p.a.mark((function e(n){var a,r;return p.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,fetch("/api/users/".concat(t,"/campaigns/"));case 2:return a=e.sent,e.next=5,a.json();case 5:return r=e.sent,a.ok&&!r.errors?n(g(r.campaigns)):a.errors=r.errors,e.abrupt("return",a);case 8:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}()))}),[e,i]);var E=function(e){return window.location="/campaigns/".concat(e.currentTarget.value)};return r.a.createElement(r.a.Fragment,null,r.a.createElement(D.a,{className:t.appBar,position:"fixed"},r.a.createElement(U.a,{display:"flex",variant:"dense",className:t.toolbar},r.a.createElement(K.a,{className:t.logoButton,onClick:function(e){return window.location="/"}},r.a.createElement(B.a,{variant:"button"},"LoreKeeper")),r.a.createElement(K.a,null,i.id?r.a.createElement(r.a.Fragment,null,r.a.createElement(M.a,{onClick:function(e){return d(e.currentTarget)},endIcon:r.a.createElement(V.a,null)},n.title?n.title:r.a.createElement(B.a,{variant:"button"},"Select a Campaign!")),r.a.createElement(X.a,{anchorEl:l,keepMounted:!0,onClose:function(e){return d(null)},open:!!l},c?Object.values(c).map((function(e){return r.a.createElement(J.a,{key:e.id,value:e.id,onClick:E},e.title)})):null)):null),r.a.createElement(K.a,null,i.is_authenticated?r.a.createElement(M.a,{variant:"outlined",onClick:function(t){return e(function(){var e=Object(m.a)(p.a.mark((function e(t){var n,a,r;return p.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return n=f.a.get("XSRF-TOKEN"),e.next=3,fetch("/api/session/logout/",{method:"get",headers:{"Content-Type":"application/json","XSRF-TOKEN":n}});case 3:return a=e.sent,e.next=6,a.json();case 6:return r=e.sent,a.ok&&!r.errors?(t(w({id:null})),t({type:"campaigns/CLEAR_CAMPAIGNS"}),t({type:"categories/CLEAR_CATEGORIES"}),t({type:"tags/CLEAR_TAGS"}),t({type:"notes/CLEAR_NOTES"}),t({type:"ui/CLEAR_UI"})):a.errors=r.errors,e.abrupt("return",a);case 9:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}())}},"Logout"):r.a.createElement(M.a,{variant:"outlined",onClick:function(t){return e({type:"ui/OPEN_LOGIN"})}},"Login")))))},Y=n(16),$=function(e){var t=e.component,n=e.path,a=e.currentUser,c=e.exact;e.history;return r.a.createElement(Y.b,{path:n,exact:c,render:function(e){return a.is_authenticated&&!a.is_anonymous?r.a.createElement(t,e):r.a.createElement(Y.a,{to:"/"})}})},Q=function(e){var t=e.component,n=e.path,a=e.currentUser,c=e.exact;e.history;return r.a.createElement(Y.b,{path:n,exact:c,render:function(e){return a.is_authenticated?r.a.createElement(Y.a,{to:"/users/".concat(a.id,"/campaigns")}):r.a.createElement(t,e)}})},Z=n(172),ee=n(173),te=n(174),ne=n(167),ae=n(187),re=n(165),ce=n(127),ie=n(170),oe=n(171),ue=Object(H.a)({formContainer:{display:"flex",flexDirection:"column",margin:"16px"},loginContainer:{alignItems:"center",display:"flex",flexDirection:"column",padding:"16px 0px"},signUpContainer:{alignItems:"center",display:"flex",flexDirection:"column",padding:"16px 0px"},inputField:{margin:"8px 20px"},errorList:{color:"red"}}),se=function(){var e=Object(o.b)(),t=ue(),n=Object(o.c)((function(e){return e.ui.loginOpen})),c=Object(o.c)((function(e){return e.errors})),i=Object(a.useState)(""),u=Object(L.a)(i,2),s=u[0],l=u[1],d=Object(a.useState)(""),g=Object(L.a)(d,2),E=g[0],h=g[1],b=Object(a.useState)(""),v=Object(L.a)(b,2),O=v[0],y=v[1],C=Object(a.useState)(""),j=Object(L.a)(C,2),N=j[0],x=j[1],S=Object(a.useState)(""),T=Object(L.a)(S,2),k=T[0],I=T[1];Object(a.useEffect)((function(){return function(){e({type:"errors/CLEAR_LOGIN"}),e({type:"errors/CLEAR_SIGNUP"})}}),[e]);return r.a.createElement(r.a.Fragment,null,r.a.createElement(ne.a,{open:n,onClose:function(t){l(""),h(""),y(""),x(""),I(""),e({type:"errors/CLEAR_LOGIN"}),e({type:"errors/CLEAR_SIGNUP"}),e({type:"ui/CLOSE_LOGIN"})}},r.a.createElement(K.a,{className:t.formContainer},r.a.createElement(K.a,{className:t.loginContainer},r.a.createElement(B.a,{variant:"h5"},"Log In"),r.a.createElement(ae.a,{autoFocus:!0,className:t.inputField,onChange:function(e){return l(e.target.value)},placeholder:"Username",required:!0,value:s,variant:"outlined"}),r.a.createElement(ae.a,{className:t.inputField,onChange:function(e){return h(e.target.value)},placeholder:"Password",required:!0,type:"password",value:E,variant:"outlined"}),c.login?r.a.createElement(re.a,{className:t.errorList},c.login.map((function(e){return r.a.createElement(ce.a,null,r.a.createElement(ie.a,{color:"secondary"},e))}))):null,r.a.createElement(oe.a,null,r.a.createElement(M.a,{onClick:function(t){return e(_(s,E))},variant:"contained",color:"primary"},"Login"),r.a.createElement(M.a,{onClick:function(t){return e(_("Ian","password"))},variant:"contained"},"Demo"))),r.a.createElement(K.a,{className:t.signUpContainer},r.a.createElement(B.a,{variant:"h5"},"Sign Up"),r.a.createElement(ae.a,{className:t.inputField,onChange:function(e){return y(e.target.value)},placeholder:"Username",required:!0,value:O,variant:"outlined"}),r.a.createElement(ae.a,{className:t.inputField,onChange:function(e){return x(e.target.value)},placeholder:"Password",required:!0,type:"password",value:N,variant:"outlined"}),r.a.createElement(ae.a,{className:t.inputField,error:N!==k,onChange:function(e){return I(e.currentTarget.value)},placeholder:"Confirm Password",required:!0,type:"password",value:k,variant:"outlined"}),c.signUp?r.a.createElement(re.a,{className:t.errorList},c.signUp.map((function(e){return r.a.createElement(ce.a,null,r.a.createElement(ie.a,{color:"secondary"},e))}))):null,r.a.createElement(M.a,{onClick:function(t){return e((n=O,a=N,r=k,function(){var e=Object(m.a)(p.a.mark((function e(t){var c,i,o;return p.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t({type:"errors/CLEAR_LOGIN"}),t({type:"errors/CLEAR_SIGNUP"}),c=f.a.get("XSRF-TOKEN"),e.next=5,fetch("/api/session/signup/",{method:"post",headers:{"Content-Type":"application/json","X-CSRFTOKEN":c},body:JSON.stringify({username:n,password:a,passwordConfirm:r,csrf_token:c})});case 5:return i=e.sent,e.next=8,i.json();case 8:o=e.sent,i.ok&&!o.errors?t(w(o)):t({type:"errors/SET_SIGNUP",errors:o.errors});case 10:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}()));var n,a,r},variant:"contained",color:"primary"},"Sign Up")))))},le=Object(H.a)((function(e){return{welcomeContainer:{display:"flex",height:"100vh",justifyContent:"center",alignItems:"center"},welcomeCard:{padding:"24px"},actionsBox:{display:"flex",justifyContent:"center"}}})),pe=function(){var e=le(),t=Object(o.b)();return r.a.createElement(r.a.Fragment,null,r.a.createElement(se,null),r.a.createElement(K.a,{className:e.welcomeContainer},r.a.createElement(Z.a,{className:e.welcomeCard,variant:"outlined"},r.a.createElement(ee.a,null,r.a.createElement(B.a,{variant:"h2",gutterBottom:!0,align:"center"},"Welcome to LoreKeeper!"),r.a.createElement(B.a,{align:"center"},"LoreKeeper is a dynamic notetaking app for your Dungeons and Dragons or TTRPG game.  ",r.a.createElement("br",null),r.a.createElement("br",null),"Intuitively create notes connected to topics (e.g. NPCs, Locations, etc.) by including hashtags in your notes, ",r.a.createElement("br",null),"then easily access all notes associated with those topics.  ",r.a.createElement("br",null),r.a.createElement("br",null),"Sign up and see how LoreKeeper can make running your game a lower CR monster than you ever thought possible! ")),r.a.createElement(K.a,{className:e.actionsBox},r.a.createElement(te.a,{right:"24px"},r.a.createElement(M.a,{onClick:function(e){return t({type:"ui/OPEN_LOGIN"})},variant:"contained",color:"primary"},"Login / Sign Up"))))))},me=n(179),de=n(175),fe=n(91),ge=n.n(fe),Ee=n(73),he=n.n(Ee),be=Object(H.a)({campaignCard:{cursor:"pointer",height:"180px"}}),ve=function(e){var t=e.campaign,n=be(),a=Object(o.b)(),c=t.id,i=t.title,u=t.description;return r.a.createElement(r.a.Fragment,null,r.a.createElement(de.a,{item:!0,xs:4},r.a.createElement(Z.a,{onClick:function(e){e.preventDefault(),window.location="/campaigns/".concat(e.currentTarget.id)},id:c,className:n.campaignCard},r.a.createElement(re.a,null,r.a.createElement(ce.a,null,r.a.createElement(ie.a,null,r.a.createElement(B.a,{variant:"button"},i))),r.a.createElement(ce.a,null,r.a.createElement(ie.a,null,r.a.createElement(B.a,{variant:"caption"},u)))),r.a.createElement(te.a,{className:n.cardActions},r.a.createElement(M.a,{onClick:function(e){var t;e.preventDefault(),e.stopPropagation(),a((t=c,function(){var e=Object(m.a)(p.a.mark((function e(n){var a,r,c;return p.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return a=f.a.get("XSRF-TOKEN"),e.next=3,fetch("/api/campaigns/".concat(t,"/"),{method:"delete",headers:{"Content-Type":"application/json","X-CSRFTOKEN":a}});case 3:return r=e.sent,e.next=6,r.json();case 6:return c=e.sent,r.ok&&!c.errors?n(E(t)):r.errors=c.errors,e.abrupt("return",r);case 9:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}()))}},r.a.createElement(he.a,null))))))},Oe=n(176),ye=n(177),Ce=n(178),je=function(e){var t=e.open,n=Object(o.b)(),c=(Object(o.c)((function(e){return e.auth.id})),Object(a.useState)(t)),i=Object(L.a)(c,2),u=i[0],s=i[1],l=Object(a.useState)(""),d=Object(L.a)(l,2),g=d[0],E=d[1],h=Object(a.useState)(""),b=Object(L.a)(h,2),v=b[0],O=b[1];Object(a.useEffect)((function(){s(t)}),[n,t]);var y=function(e){e.preventDefault(),n(function(e,t){return function(){var n=Object(m.a)(p.a.mark((function n(a){var r,c,i;return p.a.wrap((function(n){for(;;)switch(n.prev=n.next){case 0:return r=f.a.get("XSRF-TOKEN"),n.next=3,fetch("/api/campaigns/",{method:"post",headers:{"Content-Type":"application/json","X-CSRFTOKEN":r},body:JSON.stringify({title:e,description:t,csrf_token:r})});case 3:return c=n.sent,n.next=6,c.json();case 6:return i=n.sent,c.ok&&!i.errors?a({type:"campaigns/ADD_CAMPAIGN",campaign:i.campaign}):c.errors=i.errors,n.abrupt("return",c);case 9:case"end":return n.stop()}}),n)})));return function(e){return n.apply(this,arguments)}}()}(g,v)),s(!1)};return r.a.createElement(r.a.Fragment,null,r.a.createElement(ne.a,{open:u,onClose:function(e){e.preventDefault(),s(!u)}},r.a.createElement(Oe.a,null,"Create a new Campaign"),r.a.createElement(ye.a,null,r.a.createElement(ae.a,{autoFocus:!0,id:"title",lable:"Title",placeholder:"The title of your campaign (<50 characters)",fullWidth:!0,onChange:function(e){e.preventDefault(),E(e.target.value)}}),r.a.createElement(ae.a,{id:"Description",lable:"Description",placeholder:"A brief description of your campaign",fullWidth:!0,multiline:!0,onChange:function(e){e.preventDefault(),O(e.target.value)},onKeyPress:function(e){"Enter"===e.key&&y(e)}}),r.a.createElement(Ce.a,null,r.a.createElement(M.a,{onClick:y,color:"primary"},"Add Campaign")))))},Ne=Object(H.a)({yourCampaignsHeader:{padding:"40px 0px"},addButton:{cursor:"pointer",marginLeft:"40px"},campaignsContainer:{paddingTop:"6vh"}}),xe=function(e){Object(o.b)(),e.match.params.userId;var t=Object(o.c)((function(e){return e.entities.campaigns})),n=Ne(),c=Object(a.useState)(!1),i=Object(L.a)(c,2),u=i[0],s=i[1];return r.a.createElement(r.a.Fragment,null,r.a.createElement(je,{open:u}),r.a.createElement(me.a,{className:n.campaignsContainer},r.a.createElement(B.a,{className:n.yourCampaignsHeader,variant:"h4"},"Your Campaigns",r.a.createElement(M.a,{className:n.addButton,variant:"contained",onClick:function(e){e.preventDefault(),s(!u)}},r.a.createElement(ge.a,null))),r.a.createElement(de.a,{container:!0,spacing:3},t?Object.values(t).map((function(e){return r.a.createElement(ve,{key:e.id,campaign:e})})):r.a.createElement(r.a.Fragment,null))))},Se=n(188),Te=n(180),we=n(181),_e=n(190),ke=n(182),Ie=n(129),Ae=n(92),Le=n.n(Ae),Re=n(93),Ge=n.n(Re),Fe=Object(H.a)((function(e){return{tagsList:{width:"100%"}}})),Pe=function(e){var t=e.tag,n=Object(o.b)();return r.a.createElement(Se.a,{key:t.id},r.a.createElement(Te.a,{expandIcon:r.a.createElement(V.a,null)},r.a.createElement(B.a,null,t.name)),r.a.createElement(we.a,null),r.a.createElement(ke.a,null,r.a.createElement(Ie.a,{onClick:function(e){n(function(e){return{type:"ui/PIN_TAG",tag:e}}(t))}},r.a.createElement(Le.a,null)),r.a.createElement(Ie.a,{onClick:function(e){n(x(t))}},r.a.createElement(Ge.a,null)),r.a.createElement(Ie.a,{onClick:function(e){n(O(t,7))}},r.a.createElement(he.a,null))))},De=function(e){var t=e.catId,n=(e.tagIds,Fe()),a=Object(o.c)((function(e){return Object.values(e.entities.tags).filter((function(e){return e.category_id===t}))}));return r.a.createElement(r.a.Fragment,null,r.a.createElement(re.a,{className:n.tagsList},a?a.map((function(e){return r.a.createElement(Pe,{tag:e})})):r.a.createElement("p",null,"...")))},Ue=n(98),Ke=n(94),Be=n.n(Ke),Me=Object(H.a)((function(e){return{notecard:{width:"250px",paddingTop:"2px"},pinnedTag:{flexDirection:"column",alignItems:"center",border:"solid 2px grey",borderRadius:"5px",marginTop:"16px",marginRight:"12px"},title:{color:"grey",textDecoration:"underline"},closeButton:{}}})),Xe=function(e){var t=e.index,n=e.style,a=e.data[t];return r.a.createElement(r.a.Fragment,null,r.a.createElement(ce.a,{style:n,key:t,divider:!0},r.a.createElement(ie.a,{primary:a.content})))},Je=function(e){var t=e.tag,n=e.position,c=Me(),i=Object(o.b)(),u=Object(o.c)((function(e){return e.entities.notes[t.name]})),s=Object(a.useState)(100),l=Object(L.a)(s,2),d=l[0],f=l[1],g=function(){var e=window.innerHeight-350;f(e)};Object(a.useEffect)((function(){i(function(e){return function(){var t=Object(m.a)(p.a.mark((function t(n){var a,r,c;return p.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,fetch("/api/tags/".concat(e.id,"/"));case 2:return a=t.sent,t.next=5,a.json();case 5:r=t.sent,c=r.savedNotes,a.ok&&n({type:"notes/SET_NOTES",tagName:e.name,notes:c});case 8:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}()}(t)),g(),window.addEventListener("resize",g)}),[i,t]);return r.a.createElement(r.a.Fragment,null,r.a.createElement(K.a,{className:c.pinnedTag,display:"flex"},r.a.createElement(B.a,{className:c.title,variant:"h5"},t.name,r.a.createElement(Ie.a,{className:c.closeButton,onClick:function(e){return i(function(e){return{type:"ui/UNPIN_TAG",position:e}}(n))}},r.a.createElement(Be.a,null))),r.a.createElement(Ue.a,{height:d,width:360,itemSize:100,itemCount:u?u.length:0,itemData:u,border:!0},Xe)))},He=Object(H.a)((function(e){return{corkboard:{flexDirection:"row"}}})),qe=function(){var e=He(),t=Object(o.c)((function(e){return e.ui.pinnedTags}));return r.a.createElement(r.a.Fragment,null,r.a.createElement(K.a,{className:e.corkboard,display:"flex"},t.map((function(e,t){return r.a.createElement(Je,{key:t,position:t,tag:e})}))))},Ve=Object(H.a)({helpCard:{width:"320px",position:"fixed",left:"860px"}}),We=function(){var e=Ve();return r.a.createElement(Z.a,{className:e.helpCard},r.a.createElement(ee.a,null,r.a.createElement(B.a,null,"How to use: Just start typing!  Every note automatically includes the current session's tag, but you can add existing or new tags by just adding a '#' at the beginning of its name! (Avoid puntuation like apostrophes and commas.  Hyphens are cool though)")))},ze=n(186),Ye=function(){var e=Object(o.b)(),t=Object(o.c)((function(e){return e.ui.tagToEdit})),n=Object(o.c)((function(e){return e.entities.categories})),c=Object(a.useState)(t.category_id),i=Object(L.a)(c,2),u=i[0],s=i[1];Object(a.useEffect)((function(){s(t.category_id)}),[e,t]);var l=function(t){e(x({}))};return r.a.createElement(r.a.Fragment,null,r.a.createElement(ne.a,{open:t.id,onClose:l},r.a.createElement(Z.a,null,r.a.createElement(ee.a,null,r.a.createElement(B.a,{variant:"h3"},"Edit Tag - ",t.name),r.a.createElement(ze.a,{defaultValue:t.category_id,value:u,onChange:function(e){s(e.target.value)}},n.map((function(e){return r.a.createElement("option",{key:e.id,value:e.id},e.name)})))),r.a.createElement(te.a,null,r.a.createElement(M.a,{onClick:function(n){e(O(t,u)),e(x({}))}},"Save"),r.a.createElement(M.a,{onClick:l},"Cancel")))))},$e=Object(H.a)({dashboardBox:{display:"flex",height:"100vh",paddingTop:"6vh"},categoryList:{paddingTop:"64px"},drawer:{width:"250px",flexShrink:0},content:{flexGrow:1,display:"flex",flexDirection:"column"},corkBoard:{flexGrow:1},notePadContainer:{width:"100%",height:"225px",padding:"8px",display:"flex",justifyContent:"center"},notePad:{height:"209px",width:"100%",maxWidth:"600px",position:"fixed",left:"250px"},notepadButtons:{},noteField:{width:"100%"},helpCard:{}}),Qe=function(e){var t=e.match.params.id,n=Object(o.b)(),c=$e(),i=Object(o.c)((function(e){return e.entities.categories})),u=(i[0]&&Object.values(i[0]).length,Object(o.c)((function(e){return e.entities.tags}))),s=Object(o.c)((function(e){return e.ui.currentSession})),l=Object(a.useState)(""),d=Object(L.a)(l,2),f=d[0],g=d[1],E=Object(a.useState)(!0),v=Object(L.a)(E,2),O=v[0],y=v[1],j=function(){var e=Object(m.a)(p.a.mark((function e(a){var r,c,i,o,l;return p.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(a.preventDefault(),r=f.split(" "),c=r.filter((function(e){return e.startsWith("#")})),i=[],o=[],c.forEach((function(e){(e=e.replace(/[.,/!$%^&*;:{}=`~()]/g,"").toLowerCase())in u?i.push(u[e].id):o.push(e)})),l=n(C(f,i,t,o)),g("".concat(s.name," ")),!("errors"in l)){e.next=10;break}return e.abrupt("return");case 10:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}();Object(a.useEffect)((function(){(function(){var e=Object(m.a)(p.a.mark((function e(){var a,r,c,i;return p.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,fetch("/api/campaigns/".concat(t));case 2:if(!(a=e.sent).ok){e.next=15;break}return e.next=6,a.json();case 6:r=e.sent,n(h(r.categories)),n(b(r.tags)),c=Object.values(r.tags).filter((function(e){return 2===e.category_id})),i=c[c.length-1],n({type:"ui/SET_CURRENT_CAMPAIGN",currentCampaign:r.campaign}),n(N(i)),n({type:"ui/SET_PINS",pins:r.pins}),g("".concat(i.name," "));case 15:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}})()()}),[n,t]);return r.a.createElement(r.a.Fragment,null,r.a.createElement(Ye,null),r.a.createElement(K.a,{className:c.dashboardBox},r.a.createElement(_e.a,{className:c.drawer,variant:"permanent"},r.a.createElement(re.a,{className:c.categoryList},i?i.map((function(e){return r.a.createElement(Se.a,{key:e.id},r.a.createElement(Te.a,{expandIcon:r.a.createElement(V.a,null)},r.a.createElement(B.a,null,e.name)),r.a.createElement(we.a,null,r.a.createElement(De,{catId:e.id,tagIds:e.tags})))})):r.a.createElement("p",null,"Loading"))),r.a.createElement(K.a,{className:c.content},r.a.createElement(K.a,{className:c.corkBoard},r.a.createElement(qe,null)),r.a.createElement(K.a,{className:c.notePadContainer},r.a.createElement(Z.a,{className:c.notePad},r.a.createElement(ee.a,null,r.a.createElement(ae.a,{className:c.noteField,label:'Note contents.  Use "#" at the start of any tags you want to add',multiline:!0,rows:4,variant:"outlined",InputLabelProps:{shrink:!0},onChange:function(e){g(e.currentTarget.value)},onKeyPress:function(e){"Enter"===e.key&&j(e)},value:f})),r.a.createElement(K.a,{display:"flex",justifyContent:"flex-end",className:c.notepadButtons},r.a.createElement(te.a,null,r.a.createElement(M.a,{onClick:j,variant:"contained",color:"primary"},"Submit"),r.a.createElement(M.a,{onClick:function(e){y(!O)}},O?"Close Help":"?")))),O?r.a.createElement(We,{className:c.helpCard}):r.a.createElement(r.a.Fragment,null)))))},Ze=function(e){var t=e.user;return r.a.createElement(r.a.Fragment,null,r.a.createElement(Y.d,null,r.a.createElement($,{path:"/users/:userId/campaigns",exact:!0,component:xe,currentUser:t}),r.a.createElement($,{path:"/campaigns/:id",exact:!0,component:Qe,currentUser:t}),r.a.createElement(Q,{path:"/",exact:!0,component:pe,currentUser:t})))},et=Object(F.a)({palette:{type:"dark",primary:{main:"#9d0a0e"}}});var tt,nt=function(){var e=Object(o.b)(),t=Object(a.useState)(!0),n=Object(L.a)(t,2),c=n[0],i=n[1];Object(a.useEffect)((function(){(function(){var e=Object(m.a)(p.a.mark((function e(){return p.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,fetch("/api/session/csrf/");case 2:if(!e.sent.ok){e.next=5;break}return e.abrupt("return");case 5:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}})()()}),[]),Object(a.useEffect)((function(){(function(){var t=Object(m.a)(p.a.mark((function t(){var n,a;return p.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,fetch("/api/session/current-user/");case 2:return n=t.sent,t.next=5,n.json();case 5:a=t.sent,n.ok&&!a.errors&&e(w(a.user)),i(!1);case 8:case"end":return t.stop()}}),t)})));return function(){return t.apply(this,arguments)}})()()}),[e]);var u=Object(o.c)((function(e){return e.auth}));return c?"...loading":r.a.createElement(P.a,{theme:et},r.a.createElement(G.a,null),r.a.createElement(R.a,null,r.a.createElement(z,null),r.a.createElement(Ze,{user:u})))},at=Object(u.d)(A,tt,k);i.a.render(r.a.createElement(r.a.StrictMode,null,r.a.createElement(o.a,{store:at},r.a.createElement(nt,null))),document.getElementById("root"))}},[[111,1,2]]]);
//# sourceMappingURL=main.d62acfcc.chunk.js.map