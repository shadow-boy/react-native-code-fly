(self.webpackChunkant_design_pro=self.webpackChunkant_design_pro||[]).push([[81],{20698:function(S){S.exports={container:"container___3rwDa",lang:"lang___2ES0G",content:"content___3Paa8",top:"top___1W42Y",header:"header___1cl15",logo:"logo___29nS6",title:"title___3DxND",desc:"desc___2YLHe"}},2311:function(S,Y,h){"use strict";h.r(Y),h.d(Y,{default:function(){return vt}});var C=h(52663),L=h(76129),U=h(79800),m=h(67294),M=h(44721),d=h.n(M),Z=h(97449),N=h.n(Z),P=h(78267),w=h.n(P),B=h(23270),ot=h.n(B);function T(){return(T=Object.assign||function(l){for(var e=1;e<arguments.length;e++){var r=arguments[e];for(var t in r)Object.prototype.hasOwnProperty.call(r,t)&&(l[t]=r[t])}return l}).apply(this,arguments)}function $(l,e){l.prototype=Object.create(e.prototype),l.prototype.constructor=l,l.__proto__=e}function V(l,e){if(l==null)return{};var r,t,n={},o=Object.keys(l);for(t=0;t<o.length;t++)e.indexOf(r=o[t])>=0||(n[r]=l[r]);return n}var c={BASE:"base",BODY:"body",HEAD:"head",HTML:"html",LINK:"link",META:"meta",NOSCRIPT:"noscript",SCRIPT:"script",STYLE:"style",TITLE:"title",FRAGMENT:"Symbol(react.fragment)"},X=Object.keys(c).map(function(l){return c[l]}),F={accesskey:"accessKey",charset:"charSet",class:"className",contenteditable:"contentEditable",contextmenu:"contextMenu","http-equiv":"httpEquiv",itemprop:"itemProp",tabindex:"tabIndex"},at=Object.keys(F).reduce(function(l,e){return l[F[e]]=e,l},{}),I=function(e,r){for(var t=e.length-1;t>=0;t-=1){var n=e[t];if(Object.prototype.hasOwnProperty.call(n,r))return n[r]}return null},it=function(e){var r=I(e,c.TITLE),t=I(e,"titleTemplate");if(Array.isArray(r)&&(r=r.join("")),t&&r)return t.replace(/%s/g,function(){return r});var n=I(e,"defaultTitle");return r||n||void 0},st=function(e){return I(e,"onChangeClientState")||function(){}},G=function(e,r){return r.filter(function(t){return t[e]!==void 0}).map(function(t){return t[e]}).reduce(function(t,n){return T({},t,n)},{})},ut=function(e,r){return r.filter(function(t){return t[c.BASE]!==void 0}).map(function(t){return t[c.BASE]}).reverse().reduce(function(t,n){if(!t.length)for(var o=Object.keys(n),a=0;a<o.length;a+=1){var i=o[a].toLowerCase();if(e.indexOf(i)!==-1&&n[i])return t.concat(n)}return t},[])},R=function(e,r,t){var n={};return t.filter(function(o){return!!Array.isArray(o[e])||(o[e]!==void 0&&console&&typeof console.warn=="function"&&console.warn("Helmet: "+e+' should be of type "Array". Instead found type "'+typeof o[e]+'"'),!1)}).map(function(o){return o[e]}).reverse().reduce(function(o,a){var i={};a.filter(function(p){for(var y,b=Object.keys(p),E=0;E<b.length;E+=1){var g=b[E],O=g.toLowerCase();r.indexOf(O)===-1||y==="rel"&&p[y].toLowerCase()==="canonical"||O==="rel"&&p[O].toLowerCase()==="stylesheet"||(y=O),r.indexOf(g)===-1||g!=="innerHTML"&&g!=="cssText"&&g!=="itemprop"||(y=g)}if(!y||!p[y])return!1;var k=p[y].toLowerCase();return n[y]||(n[y]={}),i[y]||(i[y]={}),!n[y][k]&&(i[y][k]=!0,!0)}).reverse().forEach(function(p){return o.push(p)});for(var s=Object.keys(i),u=0;u<s.length;u+=1){var f=s[u],v=T({},n[f],i[f]);n[f]=v}return o},[]).reverse()},q=function(e){return Array.isArray(e)?e.join(""):e},ct=[c.NOSCRIPT,c.SCRIPT,c.STYLE],W=function(e,r){return r===void 0&&(r=!0),r===!1?String(e):String(e).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#x27;")},_=function(e){return Object.keys(e).reduce(function(r,t){var n=e[t]!==void 0?t+'="'+e[t]+'"':""+t;return r?r+" "+n:n},"")},tt=function(e,r){return r===void 0&&(r={}),Object.keys(e).reduce(function(t,n){return t[F[n]||n]=e[n],t},r)},A=function(e,r,t){switch(e){case c.TITLE:return{toComponent:function(){return a=r.titleAttributes,(i={key:o=r.title})["data-rh"]=!0,s=tt(a,i),[m.createElement(c.TITLE,s,o)];var o,a,i,s},toString:function(){return function(o,a,i,s){var u=_(i),f=q(a);return u?"<"+o+' data-rh="true" '+u+">"+W(f,s)+"</"+o+">":"<"+o+' data-rh="true">'+W(f,s)+"</"+o+">"}(e,r.title,r.titleAttributes,t)}};case"bodyAttributes":case"htmlAttributes":return{toComponent:function(){return tt(r)},toString:function(){return _(r)}};default:return{toComponent:function(){return function(o,a){return a.map(function(i,s){var u,f=((u={key:s})["data-rh"]=!0,u);return Object.keys(i).forEach(function(v){var p=F[v]||v;p==="innerHTML"||p==="cssText"?f.dangerouslySetInnerHTML={__html:i.innerHTML||i.cssText}:f[p]=i[v]}),m.createElement(o,f)})}(e,r)},toString:function(){return function(o,a,i){return a.reduce(function(s,u){var f=Object.keys(u).filter(function(y){return!(y==="innerHTML"||y==="cssText")}).reduce(function(y,b){var E=u[b]===void 0?b:b+'="'+W(u[b],i)+'"';return y?y+" "+E:E},""),v=u.innerHTML||u.cssText||"",p=ct.indexOf(o)===-1;return s+"<"+o+' data-rh="true" '+f+(p?"/>":">"+v+"</"+o+">")},"")}(e,r,t)}}}},z=function(e){var r=e.bodyAttributes,t=e.encode,n=e.htmlAttributes,o=e.linkTags,a=e.metaTags,i=e.noscriptTags,s=e.scriptTags,u=e.styleTags,f=e.title,v=f===void 0?"":f,p=e.titleAttributes;return{base:A(c.BASE,e.baseTag,t),bodyAttributes:A("bodyAttributes",r,t),htmlAttributes:A("htmlAttributes",n,t),link:A(c.LINK,o,t),meta:A(c.META,a,t),noscript:A(c.NOSCRIPT,i,t),script:A(c.SCRIPT,s,t),style:A(c.STYLE,u,t),title:A(c.TITLE,{title:v,titleAttributes:p},t)}},et=m.createContext({}),lt=d().shape({setHelmet:d().func,helmetInstances:d().shape({get:d().func,add:d().func,remove:d().func})}),dt=typeof document!="undefined",x=function(l){function e(r){var t;return(t=l.call(this,r)||this).instances=[],t.value={setHelmet:function(o){t.props.context.helmet=o},helmetInstances:{get:function(){return t.instances},add:function(o){t.instances.push(o)},remove:function(o){var a=t.instances.indexOf(o);t.instances.splice(a,1)}}},e.canUseDOM||(r.context.helmet=z({baseTag:[],bodyAttributes:{},encodeSpecialCharacters:!0,htmlAttributes:{},linkTags:[],metaTags:[],noscriptTags:[],scriptTags:[],styleTags:[],title:"",titleAttributes:{}})),t}return $(e,l),e.prototype.render=function(){return m.createElement(et.Provider,{value:this.value},this.props.children)},e}(m.Component);x.canUseDOM=dt,x.propTypes={context:d().shape({helmet:d().shape()}),children:d().node.isRequired},x.defaultProps={context:{}},x.displayName="HelmetProvider";var j=function(e,r){var t,n=document.head||document.querySelector(c.HEAD),o=n.querySelectorAll(e+"[data-rh]"),a=[].slice.call(o),i=[];return r&&r.length&&r.forEach(function(s){var u=document.createElement(e);for(var f in s)Object.prototype.hasOwnProperty.call(s,f)&&(f==="innerHTML"?u.innerHTML=s.innerHTML:f==="cssText"?u.styleSheet?u.styleSheet.cssText=s.cssText:u.appendChild(document.createTextNode(s.cssText)):u.setAttribute(f,s[f]===void 0?"":s[f]));u.setAttribute("data-rh","true"),a.some(function(v,p){return t=p,u.isEqualNode(v)})?a.splice(t,1):i.push(u)}),a.forEach(function(s){return s.parentNode.removeChild(s)}),i.forEach(function(s){return n.appendChild(s)}),{oldTags:a,newTags:i}},J=function(e,r){var t=document.getElementsByTagName(e)[0];if(t){for(var n=t.getAttribute("data-rh"),o=n?n.split(","):[],a=[].concat(o),i=Object.keys(r),s=0;s<i.length;s+=1){var u=i[s],f=r[u]||"";t.getAttribute(u)!==f&&t.setAttribute(u,f),o.indexOf(u)===-1&&o.push(u);var v=a.indexOf(u);v!==-1&&a.splice(v,1)}for(var p=a.length-1;p>=0;p-=1)t.removeAttribute(a[p]);o.length===a.length?t.removeAttribute("data-rh"):t.getAttribute("data-rh")!==i.join(",")&&t.setAttribute("data-rh",i.join(","))}},nt=function(e,r){var t=e.baseTag,n=e.htmlAttributes,o=e.linkTags,a=e.metaTags,i=e.noscriptTags,s=e.onChangeClientState,u=e.scriptTags,f=e.styleTags,v=e.title,p=e.titleAttributes;J(c.BODY,e.bodyAttributes),J(c.HTML,n),function(g,O){g!==void 0&&document.title!==g&&(document.title=q(g)),J(c.TITLE,O)}(v,p);var y={baseTag:j(c.BASE,t),linkTags:j(c.LINK,o),metaTags:j(c.META,a),noscriptTags:j(c.NOSCRIPT,i),scriptTags:j(c.SCRIPT,u),styleTags:j(c.STYLE,f)},b={},E={};Object.keys(y).forEach(function(g){var O=y[g],k=O.newTags,Tt=O.oldTags;k.length&&(b[g]=k),Tt.length&&(E[g]=y[g].oldTags)}),r&&r(),s(e,b,E)},D=null,Q=function(l){function e(){for(var t,n=arguments.length,o=new Array(n),a=0;a<n;a++)o[a]=arguments[a];return(t=l.call.apply(l,[this].concat(o))||this).rendered=!1,t}$(e,l);var r=e.prototype;return r.shouldComponentUpdate=function(t){return!ot()(t,this.props)},r.componentDidUpdate=function(){this.emitChange()},r.componentWillUnmount=function(){this.props.context.helmetInstances.remove(this),this.emitChange()},r.emitChange=function(){var t,n,o=this.props.context,a=o.setHelmet,i=null,s=(t=o.helmetInstances.get().map(function(u){var f=T({},u.props);return delete f.context,f}),{baseTag:ut(["href"],t),bodyAttributes:G("bodyAttributes",t),defer:I(t,"defer"),encode:I(t,"encodeSpecialCharacters"),htmlAttributes:G("htmlAttributes",t),linkTags:R(c.LINK,["rel","href"],t),metaTags:R(c.META,["name","charset","http-equiv","property","itemprop"],t),noscriptTags:R(c.NOSCRIPT,["innerHTML"],t),onChangeClientState:st(t),scriptTags:R(c.SCRIPT,["src","innerHTML"],t),styleTags:R(c.STYLE,["cssText"],t),title:it(t),titleAttributes:G("titleAttributes",t)});x.canUseDOM?(n=s,D&&cancelAnimationFrame(D),n.defer?D=requestAnimationFrame(function(){nt(n,function(){D=null})}):(nt(n),D=null)):z&&(i=z(s)),a(i)},r.init=function(){this.rendered||(this.rendered=!0,this.props.context.helmetInstances.add(this),this.emitChange())},r.render=function(){return this.init(),null},e}(m.Component);Q.propTypes={context:lt.isRequired},Q.displayName="HelmetDispatcher";var K=function(l){function e(){return l.apply(this,arguments)||this}$(e,l);var r=e.prototype;return r.shouldComponentUpdate=function(t){return!N()(this.props,t)},r.mapNestedChildrenToProps=function(t,n){if(!n)return null;switch(t.type){case c.SCRIPT:case c.NOSCRIPT:return{innerHTML:n};case c.STYLE:return{cssText:n};default:throw new Error("<"+t.type+" /> elements are self-closing and can not contain children. Refer to our API for more information.")}},r.flattenArrayTypeChildren=function(t){var n,o=t.child,a=t.arrayTypeChildren;return T({},a,((n={})[o.type]=[].concat(a[o.type]||[],[T({},t.newChildProps,this.mapNestedChildrenToProps(o,t.nestedChildren))]),n))},r.mapObjectTypeChildren=function(t){var n,o,a=t.child,i=t.newProps,s=t.newChildProps,u=t.nestedChildren;switch(a.type){case c.TITLE:return T({},i,((n={})[a.type]=u,n.titleAttributes=T({},s),n));case c.BODY:return T({},i,{bodyAttributes:T({},s)});case c.HTML:return T({},i,{htmlAttributes:T({},s)});default:return T({},i,((o={})[a.type]=T({},s),o))}},r.mapArrayTypeChildrenToProps=function(t,n){var o=T({},n);return Object.keys(t).forEach(function(a){var i;o=T({},o,((i={})[a]=t[a],i))}),o},r.warnOnInvalidChildren=function(t,n){return w()(X.some(function(o){return t.type===o}),typeof t.type=="function"?"You may be attempting to nest <Helmet> components within each other, which is not allowed. Refer to our API for more information.":"Only elements types "+X.join(", ")+" are allowed. Helmet does not support rendering <"+t.type+"> elements. Refer to our API for more information."),w()(!n||typeof n=="string"||Array.isArray(n)&&!n.some(function(o){return typeof o!="string"}),"Helmet expects a string as a child of <"+t.type+">. Did you forget to wrap your children in braces? ( <"+t.type+">{``}</"+t.type+"> ) Refer to our API for more information."),!0},r.mapChildrenToProps=function(t,n){var o=this,a={};return m.Children.forEach(t,function(i){if(i&&i.props){var s=i.props,u=s.children,f=V(s,["children"]),v=Object.keys(f).reduce(function(y,b){return y[at[b]||b]=f[b],y},{}),p=i.type;switch(typeof p=="symbol"?p=p.toString():o.warnOnInvalidChildren(i,u),p){case c.FRAGMENT:n=o.mapChildrenToProps(u,n);break;case c.LINK:case c.META:case c.NOSCRIPT:case c.SCRIPT:case c.STYLE:a=o.flattenArrayTypeChildren({child:i,arrayTypeChildren:a,newChildProps:v,nestedChildren:u});break;default:n=o.mapObjectTypeChildren({child:i,newProps:n,newChildProps:v,nestedChildren:u})}}}),this.mapArrayTypeChildrenToProps(a,n)},r.render=function(){var t=this.props,n=t.children,o=T({},V(t,["children"]));return n&&(o=this.mapChildrenToProps(n,o)),m.createElement(et.Consumer,null,function(a){return m.createElement(Q,T({},o,{context:a}))})},e}(m.Component);K.propTypes={base:d().object,bodyAttributes:d().object,children:d().oneOfType([d().arrayOf(d().node),d().node]),defaultTitle:d().string,defer:d().bool,encodeSpecialCharacters:d().bool,htmlAttributes:d().object,link:d().arrayOf(d().object),meta:d().arrayOf(d().object),noscript:d().arrayOf(d().object),onChangeClientState:d().func,script:d().arrayOf(d().object),style:d().arrayOf(d().object),title:d().string,titleAttributes:d().object,titleTemplate:d().string},K.defaultProps={defer:!0,encodeSpecialCharacters:!0},K.displayName="Helmet";var rt=h(23715),ft=h(87748),pt=h(54200),ht=h.n(pt),mt=h(20698),H=h.n(mt),yt=function(e){var r=e.route,t=r===void 0?{routes:[]}:r,n=t.routes,o=n===void 0?[]:n,a=e.children,i=e.location,s=i===void 0?{pathname:""}:i,u=(0,rt.YB)(),f=u.formatMessage,v=(0,L.Z)(o),p=v.breadcrumb,y=(0,U.ZP)((0,C.Z)({pathname:s.pathname,formatMessage:f,breadcrumb:p},e));return m.createElement(x,null,m.createElement(K,null,m.createElement("title",null,"\u7BA1\u7406\u540E\u53F0"),m.createElement("meta",{name:"description",content:"\u7BA1\u7406\u540E\u53F0"})),m.createElement("div",{className:H().container},m.createElement("div",{className:H().content},m.createElement("div",{className:H().top},m.createElement("div",{className:H().header},m.createElement(ft.rU,{to:"/"},m.createElement("img",{alt:"logo",className:H().logo,src:ht()}),m.createElement("span",{className:H().title},"\u7BA1\u7406\u540E\u53F0")))),a)))},vt=(0,rt.$j)(function(l){var e=l.settings;return(0,C.Z)({},e)})(yt)},23270:function(S){S.exports=function(h,C,L,U){var m=L?L.call(U,h,C):void 0;if(m!==void 0)return!!m;if(h===C)return!0;if(typeof h!="object"||!h||typeof C!="object"||!C)return!1;var M=Object.keys(h),d=Object.keys(C);if(M.length!==d.length)return!1;for(var Z=Object.prototype.hasOwnProperty.bind(C),N=0;N<M.length;N++){var P=M[N];if(!Z(P))return!1;var w=h[P],B=C[P];if(m=L?L.call(U,w,B,P):void 0,m===!1||m===void 0&&w!==B)return!1}return!0}},54200:function(S,Y,h){S.exports=h.p+"static/logo.f0355d39.svg"}}]);
