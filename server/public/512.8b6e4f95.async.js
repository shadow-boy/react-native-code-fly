(self.webpackChunkant_design_pro=self.webpackChunkant_design_pro||[]).push([[512],{79800:function(ne,re,C){"use strict";C.d(re,{nA:function(){return ae}});var Z=C(49043),Y=C.n(Z);function L(_){return M(_)||B(_)||m(_)||b()}function b(){throw new TypeError(`Invalid attempt to spread non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`)}function m(_,a){if(!!_){if(typeof _=="string")return H(_,a);var o=Object.prototype.toString.call(_).slice(8,-1);if(o==="Object"&&_.constructor&&(o=_.constructor.name),o==="Map"||o==="Set")return Array.from(_);if(o==="Arguments"||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(o))return H(_,a)}}function B(_){if(typeof Symbol!="undefined"&&_[Symbol.iterator]!=null||_["@@iterator"]!=null)return Array.from(_)}function M(_){if(Array.isArray(_))return H(_)}function H(_,a){(a==null||a>_.length)&&(a=_.length);for(var o=0,c=new Array(a);o<a;o++)c[o]=_[o];return c}var X=function(a,o,c){if(c){var g=L(c.keys()).find(function(E){return Y()(E).test(a)});if(g)return c.get(g)}if(o){var S=Object.keys(o).find(function(E){return Y()(E).test(a)});if(S)return o[S]}return{path:""}},ae=function(a,o){var c=a.pathname,g=c===void 0?"/":c,S=a.breadcrumb,E=a.breadcrumbMap,U=a.formatMessage,I=a.title,p=I===void 0?"Ant Design Pro":I,w=a.menu,z=w===void 0?{locale:!1}:w,W=o?"":p||"",D=X(g,S,E);if(!D)return{title:W,id:"",pageName:W};var s=D.name;return z.locale!==!1&&D.locale&&U&&(s=U({id:D.locale||"",defaultMessage:D.name})),s?o||!p?{title:s,id:D.locale||"",pageName:s}:{title:"".concat(s," - ").concat(p),id:D.locale||"",pageName:s}:{title:W,id:D.locale||"",pageName:W}},J=function(a,o){return ae(a,o).title};re.ZP=J},76129:function(ne,re,C){"use strict";var Z=C(82405);function Y(a,o){return m(a)||b(a,o)||H(a,o)||L()}function L(){throw new TypeError(`Invalid attempt to destructure non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`)}function b(a,o){var c=a&&(typeof Symbol!="undefined"&&a[Symbol.iterator]||a["@@iterator"]);if(c!=null){var g=[],S=!0,E=!1,U,I;try{for(c=c.call(a);!(S=(U=c.next()).done)&&(g.push(U.value),!(o&&g.length===o));S=!0);}catch(p){E=!0,I=p}finally{try{!S&&c.return!=null&&c.return()}finally{if(E)throw I}}return g}}function m(a){if(Array.isArray(a))return a}function B(a){return ae(a)||X(a)||H(a)||M()}function M(){throw new TypeError(`Invalid attempt to spread non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`)}function H(a,o){if(!!a){if(typeof a=="string")return J(a,o);var c=Object.prototype.toString.call(a).slice(8,-1);if(c==="Object"&&a.constructor&&(c=a.constructor.name),c==="Map"||c==="Set")return Array.from(a);if(c==="Arguments"||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(c))return J(a,o)}}function X(a){if(typeof Symbol!="undefined"&&a[Symbol.iterator]!=null||a["@@iterator"]!=null)return Array.from(a)}function ae(a){if(Array.isArray(a))return J(a)}function J(a,o){(o==null||o>a.length)&&(o=a.length);for(var c=0,g=new Array(o);c<o;c++)g[c]=a[c];return g}function _(a){return B(a).reduce(function(o,c){var g=Y(c,2),S=g[0],E=g[1];return o[S]=E,o},{})}re.Z=function(a,o,c,g){var S=(0,Z.Un)(a,(o==null?void 0:o.locale)||!1,c,!0),E=S.menuData,U=S.breadcrumb;if(!g)return{breadcrumb:_(U),breadcrumbMap:U,menuData:E};var I=(0,Z.Un)(g(E),(o==null?void 0:o.locale)||!1,c,!0);return{breadcrumb:_(I.breadcrumb),breadcrumbMap:I.breadcrumb,menuData:I.menuData}}},49043:function(ne){ne.exports=_,ne.exports.parse=Y,ne.exports.compile=L,ne.exports.tokensToFunction=b,ne.exports.tokensToRegExp=J;var re="/",C="./",Z=new RegExp(["(\\\\.)","(?:\\:(\\w+)(?:\\(((?:\\\\.|[^\\\\()])+)\\))?|\\(((?:\\\\.|[^\\\\()])+)\\))([+*?])?"].join("|"),"g");function Y(a,o){for(var c=[],g=0,S=0,E="",U=o&&o.delimiter||re,I=o&&o.delimiters||C,p=!1,w;(w=Z.exec(a))!==null;){var z=w[0],W=w[1],D=w.index;if(E+=a.slice(S,D),S=D+z.length,W){E+=W[1],p=!0;continue}var s="",T=a[S],N=w[2],F=w[3],y=w[4],P=w[5];if(!p&&E.length){var x=E.length-1;I.indexOf(E[x])>-1&&(s=E[x],E=E.slice(0,x))}E&&(c.push(E),E="",p=!1);var te=s!==""&&T!==void 0&&T!==s,k=P==="+"||P==="*",V=P==="?"||P==="*",ee=s||U,fe=F||y;c.push({name:N||g++,prefix:s,delimiter:ee,optional:V,repeat:k,partial:te,pattern:fe?B(fe):"[^"+m(ee)+"]+?"})}return(E||S<a.length)&&c.push(E+a.substr(S)),c}function L(a,o){return b(Y(a,o))}function b(a){for(var o=new Array(a.length),c=0;c<a.length;c++)typeof a[c]=="object"&&(o[c]=new RegExp("^(?:"+a[c].pattern+")$"));return function(g,S){for(var E="",U=S&&S.encode||encodeURIComponent,I=0;I<a.length;I++){var p=a[I];if(typeof p=="string"){E+=p;continue}var w=g?g[p.name]:void 0,z;if(Array.isArray(w)){if(!p.repeat)throw new TypeError('Expected "'+p.name+'" to not repeat, but got array');if(w.length===0){if(p.optional)continue;throw new TypeError('Expected "'+p.name+'" to not be empty')}for(var W=0;W<w.length;W++){if(z=U(w[W],p),!o[I].test(z))throw new TypeError('Expected all "'+p.name+'" to match "'+p.pattern+'"');E+=(W===0?p.prefix:p.delimiter)+z}continue}if(typeof w=="string"||typeof w=="number"||typeof w=="boolean"){if(z=U(String(w),p),!o[I].test(z))throw new TypeError('Expected "'+p.name+'" to match "'+p.pattern+'", but got "'+z+'"');E+=p.prefix+z;continue}if(p.optional){p.partial&&(E+=p.prefix);continue}throw new TypeError('Expected "'+p.name+'" to be '+(p.repeat?"an array":"a string"))}return E}}function m(a){return a.replace(/([.+*?=^!:${}()[\]|/\\])/g,"\\$1")}function B(a){return a.replace(/([=!:$/()])/g,"\\$1")}function M(a){return a&&a.sensitive?"":"i"}function H(a,o){if(!o)return a;var c=a.source.match(/\((?!\?)/g);if(c)for(var g=0;g<c.length;g++)o.push({name:g,prefix:null,delimiter:null,optional:!1,repeat:!1,partial:!1,pattern:null});return a}function X(a,o,c){for(var g=[],S=0;S<a.length;S++)g.push(_(a[S],o,c).source);return new RegExp("(?:"+g.join("|")+")",M(c))}function ae(a,o,c){return J(Y(a,c),o,c)}function J(a,o,c){c=c||{};for(var g=c.strict,S=c.start!==!1,E=c.end!==!1,U=m(c.delimiter||re),I=c.delimiters||C,p=[].concat(c.endsWith||[]).map(m).concat("$").join("|"),w=S?"^":"",z=a.length===0,W=0;W<a.length;W++){var D=a[W];if(typeof D=="string")w+=m(D),z=W===a.length-1&&I.indexOf(D[D.length-1])>-1;else{var s=D.repeat?"(?:"+D.pattern+")(?:"+m(D.delimiter)+"(?:"+D.pattern+"))*":D.pattern;o&&o.push(D),D.optional?D.partial?w+=m(D.prefix)+"("+s+")?":w+="(?:"+m(D.prefix)+"("+s+"))?":w+=m(D.prefix)+"("+s+")"}}return E?(g||(w+="(?:"+U+")?"),w+=p==="$"?"$":"(?="+p+")"):(g||(w+="(?:"+U+"(?="+p+"))?"),z||(w+="(?="+U+"|"+p+")")),new RegExp(w,M(c))}function _(a,o,c){return a instanceof RegExp?H(a,o):Array.isArray(a)?X(a,o,c):ae(a,o,c)}},82405:function(ne,re,C){"use strict";C.d(re,{kv:function(){return Be},nG:function(){return hr},Un:function(){return lr}});var Z=C(58892),Y=C.n(Z),L=Number.isNaN||function(t){return typeof t=="number"&&t!==t};function b(e,t){return!!(e===t||L(e)&&L(t))}function m(e,t){if(e.length!==t.length)return!1;for(var r=0;r<e.length;r++)if(!b(e[r],t[r]))return!1;return!0}function B(e,t){t===void 0&&(t=m);var r,n=[],i,f=!1;function u(){for(var l=[],v=0;v<arguments.length;v++)l[v]=arguments[v];return f&&r===this&&t(l,n)||(i=e.apply(this,l),f=!0,r=this,n=l),i}return u}var M=B;function H(e){for(var t=[],r=0;r<e.length;){var n=e[r];if(n==="*"||n==="+"||n==="?"){t.push({type:"MODIFIER",index:r,value:e[r++]});continue}if(n==="\\"){t.push({type:"ESCAPED_CHAR",index:r++,value:e[r++]});continue}if(n==="{"){t.push({type:"OPEN",index:r,value:e[r++]});continue}if(n==="}"){t.push({type:"CLOSE",index:r,value:e[r++]});continue}if(n===":"){for(var i="",f=r+1;f<e.length;){var u=e.charCodeAt(f);if(u>=48&&u<=57||u>=65&&u<=90||u>=97&&u<=122||u===95){i+=e[f++];continue}break}if(!i)throw new TypeError("Missing parameter name at "+r);t.push({type:"NAME",index:r,value:i}),r=f;continue}if(n==="("){var l=1,v="",f=r+1;if(e[f]==="?")throw new TypeError('Pattern cannot start with "?" at '+f);for(;f<e.length;){if(e[f]==="\\"){v+=e[f++]+e[f++];continue}if(e[f]===")"){if(l--,l===0){f++;break}}else if(e[f]==="("&&(l++,e[f+1]!=="?"))throw new TypeError("Capturing groups are not allowed at "+f);v+=e[f++]}if(l)throw new TypeError("Unbalanced pattern at "+r);if(!v)throw new TypeError("Missing pattern at "+r);t.push({type:"PATTERN",index:r,value:v}),r=f;continue}t.push({type:"CHAR",index:r,value:e[r++]})}return t.push({type:"END",index:r,value:""}),t}function X(e,t){t===void 0&&(t={});for(var r=H(e),n=t.prefixes,i=n===void 0?"./":n,f="[^"+o(t.delimiter||"/#?")+"]+?",u=[],l=0,v=0,h="",O=function(le){if(v<r.length&&r[v].type===le)return r[v++].value},d=function(le){var be=O(le);if(be!==void 0)return be;var He=r[v],yr=He.type,mr=He.index;throw new TypeError("Unexpected "+yr+" at "+mr+", expected "+le)},A=function(){for(var le="",be;be=O("CHAR")||O("ESCAPED_CHAR");)le+=be;return le};v<r.length;){var j=O("CHAR"),K=O("NAME"),q=O("PATTERN");if(K||q){var R=j||"";i.indexOf(R)===-1&&(h+=R,R=""),h&&(u.push(h),h=""),u.push({name:K||l++,prefix:R,suffix:"",pattern:q||f,modifier:O("MODIFIER")||""});continue}var Q=j||O("ESCAPED_CHAR");if(Q){h+=Q;continue}h&&(u.push(h),h="");var $=O("OPEN");if($){var R=A(),ie=O("NAME")||"",ue=O("PATTERN")||"",Le=A();d("CLOSE"),u.push({name:ie||(ue?l++:""),pattern:ie&&!ue?f:ue,prefix:R,suffix:Le,modifier:O("MODIFIER")||""});continue}d("END")}return u}function ae(e,t){return J(X(e,t),t)}function J(e,t){t===void 0&&(t={});var r=c(t),n=t.encode,i=n===void 0?function(v){return v}:n,f=t.validate,u=f===void 0?!0:f,l=e.map(function(v){if(typeof v=="object")return new RegExp("^(?:"+v.pattern+")$",r)});return function(v){for(var h="",O=0;O<e.length;O++){var d=e[O];if(typeof d=="string"){h+=d;continue}var A=v?v[d.name]:void 0,j=d.modifier==="?"||d.modifier==="*",K=d.modifier==="*"||d.modifier==="+";if(Array.isArray(A)){if(!K)throw new TypeError('Expected "'+d.name+'" to not repeat, but got an array');if(A.length===0){if(j)continue;throw new TypeError('Expected "'+d.name+'" to not be empty')}for(var q=0;q<A.length;q++){var R=i(A[q],d);if(u&&!l[O].test(R))throw new TypeError('Expected all "'+d.name+'" to match "'+d.pattern+'", but got "'+R+'"');h+=d.prefix+R+d.suffix}continue}if(typeof A=="string"||typeof A=="number"){var R=i(String(A),d);if(u&&!l[O].test(R))throw new TypeError('Expected "'+d.name+'" to match "'+d.pattern+'", but got "'+R+'"');h+=d.prefix+R+d.suffix;continue}if(!j){var Q=K?"an array":"a string";throw new TypeError('Expected "'+d.name+'" to be '+Q)}}return h}}function _(e,t){var r=[],n=I(e,r,t);return a(n,r,t)}function a(e,t,r){r===void 0&&(r={});var n=r.decode,i=n===void 0?function(f){return f}:n;return function(f){var u=e.exec(f);if(!u)return!1;for(var l=u[0],v=u.index,h=Object.create(null),O=function(j){if(u[j]===void 0)return"continue";var K=t[j-1];K.modifier==="*"||K.modifier==="+"?h[K.name]=u[j].split(K.prefix+K.suffix).map(function(q){return i(q,K)}):h[K.name]=i(u[j],K)},d=1;d<u.length;d++)O(d);return{path:l,index:v,params:h}}}function o(e){return e.replace(/([.+*?=^!:${}()[\]|/\\])/g,"\\$1")}function c(e){return e&&e.sensitive?"":"i"}function g(e,t){if(!t)return e;var r=e.source.match(/\((?!\?)/g);if(r)for(var n=0;n<r.length;n++)t.push({name:n,prefix:"",suffix:"",modifier:"",pattern:""});return e}function S(e,t,r){var n=e.map(function(i){return I(i,t,r).source});return new RegExp("(?:"+n.join("|")+")",c(r))}function E(e,t,r){return U(X(e,r),t,r)}function U(e,t,r){r===void 0&&(r={});for(var n=r.strict,i=n===void 0?!1:n,f=r.start,u=f===void 0?!0:f,l=r.end,v=l===void 0?!0:l,h=r.encode,O=h===void 0?function(Re){return Re}:h,d="["+o(r.endsWith||"")+"]|$",A="["+o(r.delimiter||"/#?")+"]",j=u?"^":"",K=0,q=e;K<q.length;K++){var R=q[K];if(typeof R=="string")j+=o(O(R));else{var Q=o(O(R.prefix)),$=o(O(R.suffix));if(R.pattern)if(t&&t.push(R),Q||$)if(R.modifier==="+"||R.modifier==="*"){var ie=R.modifier==="*"?"?":"";j+="(?:"+Q+"((?:"+R.pattern+")(?:"+$+Q+"(?:"+R.pattern+"))*)"+$+")"+ie}else j+="(?:"+Q+"("+R.pattern+")"+$+")"+R.modifier;else j+="("+R.pattern+")"+R.modifier;else j+="(?:"+Q+$+")"+R.modifier}}if(v)i||(j+=A+"?"),j+=r.endsWith?"(?="+d+")":"$";else{var ue=e[e.length-1],Le=typeof ue=="string"?A.indexOf(ue[ue.length-1])>-1:ue===void 0;i||(j+="(?:"+A+"(?="+d+"))?"),Le||(j+="(?="+A+"|"+d+")")}return new RegExp(j,c(r))}function I(e,t,r){return e instanceof RegExp?g(e,t):Array.isArray(e)?S(e,t,r):E(e,t,r)}function p(e,t){return t>>>e|t<<32-e}function w(e,t,r){return e&t^~e&r}function z(e,t,r){return e&t^e&r^t&r}function W(e){return p(2,e)^p(13,e)^p(22,e)}function D(e){return p(6,e)^p(11,e)^p(25,e)}function s(e){return p(7,e)^p(18,e)^e>>>3}function T(e){return p(17,e)^p(19,e)^e>>>10}function N(e,t){return e[t&15]+=T(e[t+14&15])+e[t+9&15]+s(e[t+1&15])}var F=[1116352408,1899447441,3049323471,3921009573,961987163,1508970993,2453635748,2870763221,3624381080,310598401,607225278,1426881987,1925078388,2162078206,2614888103,3248222580,3835390401,4022224774,264347078,604807628,770255983,1249150122,1555081692,1996064986,2554220882,2821834349,2952996808,3210313671,3336571891,3584528711,113926993,338241895,666307205,773529912,1294757372,1396182291,1695183700,1986661051,2177026350,2456956037,2730485921,2820302411,3259730800,3345764771,3516065817,3600352804,4094571909,275423344,430227734,506948616,659060556,883997877,958139571,1322822218,1537002063,1747873779,1955562222,2024104815,2227730452,2361852424,2428436474,2756734187,3204031479,3329325298],y,P,x,te="0123456789abcdef";function k(e,t){var r=(e&65535)+(t&65535),n=(e>>16)+(t>>16)+(r>>16);return n<<16|r&65535}function V(){y=new Array(8),P=new Array(2),x=new Array(64),P[0]=P[1]=0,y[0]=1779033703,y[1]=3144134277,y[2]=1013904242,y[3]=2773480762,y[4]=1359893119,y[5]=2600822924,y[6]=528734635,y[7]=1541459225}function ee(){var e,t,r,n,i,f,u,l,v,h,O=new Array(16);e=y[0],t=y[1],r=y[2],n=y[3],i=y[4],f=y[5],u=y[6],l=y[7];for(var d=0;d<16;d++)O[d]=x[(d<<2)+3]|x[(d<<2)+2]<<8|x[(d<<2)+1]<<16|x[d<<2]<<24;for(var A=0;A<64;A++)v=l+D(i)+w(i,f,u)+F[A],A<16?v+=O[A]:v+=N(O,A),h=W(e)+z(e,t,r),l=u,u=f,f=i,i=k(n,v),n=r,r=t,t=e,e=k(v,h);y[0]+=e,y[1]+=t,y[2]+=r,y[3]+=n,y[4]+=i,y[5]+=f,y[6]+=u,y[7]+=l}function fe(e,t){var r,n,i=0;n=P[0]>>3&63;var f=t&63;for((P[0]+=t<<3)<t<<3&&P[1]++,P[1]+=t>>29,r=0;r+63<t;r+=64){for(var u=n;u<64;u++)x[u]=e.charCodeAt(i++);ee(),n=0}for(var l=0;l<f;l++)x[l]=e.charCodeAt(i++)}function oe(){var e=P[0]>>3&63;if(x[e++]=128,e<=56)for(var t=e;t<56;t++)x[t]=0;else{for(var r=e;r<64;r++)x[r]=0;ee();for(var n=0;n<56;n++)x[n]=0}x[56]=P[1]>>>24&255,x[57]=P[1]>>>16&255,x[58]=P[1]>>>8&255,x[59]=P[1]&255,x[60]=P[0]>>>24&255,x[61]=P[0]>>>16&255,x[62]=P[0]>>>8&255,x[63]=P[0]&255,ee()}function xe(){for(var e=0,t=new Array(32),r=0;r<8;r++)t[e++]=y[r]>>>24&255,t[e++]=y[r]>>>16&255,t[e++]=y[r]>>>8&255,t[e++]=y[r]&255;return t}function pe(){for(var e=new String,t=0;t<8;t++)for(var r=28;r>=0;r-=4)e+=te.charAt(y[t]>>>r&15);return e}function se(e){return V(),fe(e,e.length),oe(),pe()}var Te=se;function ce(e){return typeof Symbol=="function"&&typeof Symbol.iterator=="symbol"?ce=function(r){return typeof r}:ce=function(r){return r&&typeof Symbol=="function"&&r.constructor===Symbol&&r!==Symbol.prototype?"symbol":typeof r},ce(e)}function ve(e,t){return Oe(e)||Ee(e,t)||Ie(e,t)||_e()}function _e(){throw new TypeError(`Invalid attempt to destructure non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`)}function Ee(e,t){if(!(typeof Symbol=="undefined"||!(Symbol.iterator in Object(e)))){var r=[],n=!0,i=!1,f=void 0;try{for(var u=e[Symbol.iterator](),l;!(n=(l=u.next()).done)&&(r.push(l.value),!(t&&r.length===t));n=!0);}catch(v){i=!0,f=v}finally{try{!n&&u.return!=null&&u.return()}finally{if(i)throw f}}return r}}function Oe(e){if(Array.isArray(e))return e}function we(e,t){var r;if(typeof Symbol=="undefined"||e[Symbol.iterator]==null){if(Array.isArray(e)||(r=Ie(e))||t&&e&&typeof e.length=="number"){r&&(e=r);var n=0,i=function(){};return{s:i,n:function(){return n>=e.length?{done:!0}:{done:!1,value:e[n++]}},e:function(h){throw h},f:i}}throw new TypeError(`Invalid attempt to iterate non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`)}var f=!0,u=!1,l;return{s:function(){r=e[Symbol.iterator]()},n:function(){var h=r.next();return f=h.done,h},e:function(h){u=!0,l=h},f:function(){try{!f&&r.return!=null&&r.return()}finally{if(u)throw l}}}}function de(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function Ae(e,t){for(var r=0;r<t.length;r++){var n=t[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}function Se(e,t,r){return t&&Ae(e.prototype,t),r&&Ae(e,r),e}function he(e,t){if(typeof t!="function"&&t!==null)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),t&&ye(e,t)}function Ze(e){var t=$e();return function(){var n=me(e),i;if(t){var f=me(this).constructor;i=Reflect.construct(n,arguments,f)}else i=n.apply(this,arguments);return ze(this,i)}}function ze(e,t){return t&&(ce(t)==="object"||typeof t=="function")?t:Ge(e)}function Ge(e){if(e===void 0)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}function De(e){var t=typeof Map=="function"?new Map:void 0;return De=function(n){if(n===null||!Ve(n))return n;if(typeof n!="function")throw new TypeError("Super expression must either be null or a function");if(typeof t!="undefined"){if(t.has(n))return t.get(n);t.set(n,i)}function i(){return Me(n,arguments,me(this).constructor)}return i.prototype=Object.create(n.prototype,{constructor:{value:i,enumerable:!1,writable:!0,configurable:!0}}),ye(i,n)},De(e)}function Me(e,t,r){return $e()?Me=Reflect.construct:Me=function(i,f,u){var l=[null];l.push.apply(l,f);var v=Function.bind.apply(i,l),h=new v;return u&&ye(h,u.prototype),h},Me.apply(null,arguments)}function $e(){if(typeof Reflect=="undefined"||!Reflect.construct||Reflect.construct.sham)return!1;if(typeof Proxy=="function")return!0;try{return Date.prototype.toString.call(Reflect.construct(Date,[],function(){})),!0}catch(e){return!1}}function Ve(e){return Function.toString.call(e).indexOf("[native code]")!==-1}function ye(e,t){return ye=Object.setPrototypeOf||function(n,i){return n.__proto__=i,n},ye(e,t)}function me(e){return me=Object.setPrototypeOf?Object.getPrototypeOf:function(r){return r.__proto__||Object.getPrototypeOf(r)},me(e)}function Fe(e){return Qe(e)||Je(e)||Ie(e)||Xe()}function Xe(){throw new TypeError(`Invalid attempt to spread non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`)}function Ie(e,t){if(!!e){if(typeof e=="string")return Ce(e,t);var r=Object.prototype.toString.call(e).slice(8,-1);if(r==="Object"&&e.constructor&&(r=e.constructor.name),r==="Map"||r==="Set")return Array.from(e);if(r==="Arguments"||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r))return Ce(e,t)}}function Je(e){if(typeof Symbol!="undefined"&&Symbol.iterator in Object(e))return Array.from(e)}function Qe(e){if(Array.isArray(e))return Ce(e)}function Ce(e,t){(t==null||t>e.length)&&(t=e.length);for(var r=0,n=new Array(t);r<t;r++)n[r]=e[r];return n}function Ye(e,t){if(e==null)return{};var r=qe(e,t),n,i;if(Object.getOwnPropertySymbols){var f=Object.getOwnPropertySymbols(e);for(i=0;i<f.length;i++)n=f[i],!(t.indexOf(n)>=0)&&(!Object.prototype.propertyIsEnumerable.call(e,n)||(r[n]=e[n]))}return r}function qe(e,t){if(e==null)return{};var r={},n=Object.keys(e),i,f;for(f=0;f<n.length;f++)i=n[f],!(t.indexOf(i)>=0)&&(r[i]=e[i]);return r}function Ke(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter(function(i){return Object.getOwnPropertyDescriptor(e,i).enumerable})),r.push.apply(r,n)}return r}function G(e){for(var t=1;t<arguments.length;t++){var r=arguments[t]!=null?arguments[t]:{};t%2?Ke(Object(r),!0).forEach(function(n){ke(e,n,r[n])}):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):Ke(Object(r)).forEach(function(n){Object.defineProperty(e,n,Object.getOwnPropertyDescriptor(r,n))})}return e}function ke(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function ge(e){return e.split("?")[0].split("#")[0]}var Ne=function(t){if(!t.startsWith("http"))return!1;try{var r=new URL(t);return!!r}catch(n){return!1}},er=function(t){var r=t.path;if(!r||r==="/")try{return"/".concat(Te(JSON.stringify(t)))}catch(n){}return r&&ge(r)},rr=function(t,r){var n=t.name,i=t.locale;return"locale"in t&&i===!1||!n?!1:t.locale||"".concat(r,".").concat(n)},Ue=function(){var t=arguments.length>0&&arguments[0]!==void 0?arguments[0]:"",r=arguments.length>1&&arguments[1]!==void 0?arguments[1]:"/";return(t||r).startsWith("/")||Ne(t)?t:"/".concat(r,"/").concat(t).replace(/\/\//g,"/").replace(/\/\//g,"/")},tr=function(t,r){var n=t.menu,i=n===void 0?{}:n,f=t.indexRoute,u=t.path,l=u===void 0?"":u,v=t.children,h=i.name,O=h===void 0?t.name:h,d=i.icon,A=d===void 0?t.icon:d,j=i.hideChildren,K=j===void 0?t.hideChildren:j,q=i.flatMenu,R=q===void 0?t.flatMenu:q,Q=f&&Object.keys(f).join(",")!=="redirect"?[G({path:l,menu:i},f)].concat(v||[]):v,$=G({},t);if(O&&($.name=O),A&&($.icon=A),Q&&Q.length){if(K)return delete $.children,$;var ie=je(G(G({},r),{},{data:Q}),t);if(R)return ie;$.children=ie}return $};function je(e){var t=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{path:"/"},r=e.data,n=e.formatMessage,i=e.parentName,f=e.locale;return!r||!Array.isArray(r)?[]:r.filter(function(u){return u?u.routes||u.children||u.path||u.layout?!0:(u.redirect,!1):!1}).filter(function(u){var l,v;return u.unaccessible&&delete u.name,(u==null||(l=u.menu)===null||l===void 0?void 0:l.name)||(u==null?void 0:u.flatMenu)||(u==null||(v=u.menu)===null||v===void 0?void 0:v.flatMenu)?!0:u.menu!==!1}).map(function(){var u=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{path:"/"},l=Ue(u.path,t?t.path:"/"),v=u.name,h=rr(u,i||"menu"),O=h!==!1&&f!==!1&&n&&h?n({id:h,defaultMessage:v}):v,d=t.pro_layout_parentKeys,A=d===void 0?[]:d,j=t.children,K=t.icon,q=t.flatMenu,R=t.indexRoute,Q=Ye(t,["pro_layout_parentKeys","children","icon","flatMenu","indexRoute"]),$=G(G(G({},Q),{},{menu:void 0},u),{},{path:l,locale:h,key:u.key||er(G(G({},u),{},{path:l})),routes:null,pro_layout_parentKeys:Array.from(new Set([].concat(Fe(u.parentKeys||[]),Fe(A),["/".concat(t.key||"").replace(/\/\//g,"/").replace(/\/\//g,"/")]))).filter(function(ue){return ue&&ue!=="/"})});if(O?$.name=O:delete $.name,$.menu===void 0&&delete $.menu,u.routes||u.children){var ie=je(G(G({},e),{},{data:u.routes||u.children,parentName:h||""}),$);$.children=ie&&ie.length>0?ie:void 0,$.children||delete $.children}return tr($,e)}).flat(1)}var nr=M(je,Y()),ar=function e(){var t=arguments.length>0&&arguments[0]!==void 0?arguments[0]:[];return t.filter(function(r){return r&&(r.name||r.children)&&!r.hideInMenu&&!r.redirect}).map(function(r){if(r.children&&Array.isArray(r.children)&&!r.hideChildrenInMenu&&r.children.some(function(i){return i&&!!i.name})){var n=e(r.children);if(n.length)return G(G({},r),{},{children:n})}return G(G({},r),{},{children:void 0})}).filter(function(r){return r})},ir=function(e){he(r,e);var t=Ze(r);function r(){return de(this,r),t.apply(this,arguments)}return Se(r,[{key:"get",value:function(i){var f;try{var u=we(this.entries()),l;try{for(u.s();!(l=u.n()).done;){var v=ve(l.value,2),h=v[0],O=v[1],d=ge(h);if(!Ne(h)&&I(d,[]).test(i)){f=O;break}}}catch(A){u.e(A)}finally{u.f()}}catch(A){f=void 0}return f}}]),r}(De(Map)),ur=function(t){var r=new ir,n=function i(f,u){f.forEach(function(l){l&&l.children&&i(l.children,l);var v=Ue(l.path,u?u.path:"/");r.set(ge(v),l)})};return n(t),r},fr=M(ur,Y()),or=function e(){var t=arguments.length>0&&arguments[0]!==void 0?arguments[0]:[];return t.map(function(r){if(r.children&&Array.isArray(r.children)&&r.children.length>0){var n=e(r.children);if(n.length)return G(G({},r),{},{children:n})}var i=G({},r);return delete i.children,i}).filter(function(r){return r})},cr=function(t,r,n,i){var f=nr({data:t,formatMessage:n,locale:r}),u=i?or(f):ar(f),l=fr(f);return{breadcrumb:l,menuData:u}},lr=cr;function We(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter(function(i){return Object.getOwnPropertyDescriptor(e,i).enumerable})),r.push.apply(r,n)}return r}function Pe(e){for(var t=1;t<arguments.length;t++){var r=arguments[t]!=null?arguments[t]:{};t%2?We(Object(r),!0).forEach(function(n){sr(e,n,r[n])}):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):We(Object(r)).forEach(function(n){Object.defineProperty(e,n,Object.getOwnPropertyDescriptor(r,n))})}return e}function sr(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}var vr=function e(){var t=arguments.length>0&&arguments[0]!==void 0?arguments[0]:[],r={};return t.forEach(function(n){!n||!n.key||(r[ge(n.path||n.key||"/")]=Pe({},n),r[n.key||n.path||"/"]=Pe({},n),n.children&&(r=Pe(Pe({},r),e(n.children))))}),r},Be=vr,pr=function(){var t=arguments.length>0&&arguments[0]!==void 0?arguments[0]:[],r=arguments.length>1?arguments[1]:void 0,n=arguments.length>2?arguments[2]:void 0;return t.filter(function(i){if(i==="/"&&r==="/")return!0;if(i!=="/"&&i!=="/*"&&i&&!Ne(i)){var f=ge(i);try{if(n&&I("".concat(f)).test(r)||I("".concat(f),[]).test(r)||I("".concat(f,"/(.*)")).test(r))return!0}catch(u){}}return!1}).sort(function(i,f){return i===r?10:f===r?-10:i.substr(1).split("/").length-f.substr(1).split("/").length})},dr=function(t,r,n,i){var f=Be(r),u=Object.keys(f),l=pr(u,t||"/",i);return!l||l.length<1?[]:(n||(l=[l[l.length-1]]),l.map(function(v){var h=f[v]||{pro_layout_parentKeys:"",key:""},O=new Map,d=(h.pro_layout_parentKeys||[]).map(function(A){return O.has(A)?null:(O.set(A,!0),f[A])}).filter(function(A){return A});return h.key&&d.push(h),d}).flat(1))},hr=dr},58892:function(ne,re,C){"use strict";var Z=C(37306),Y=typeof BigInt64Array!="undefined";ne.exports=function L(b,m){if(b===m)return!0;if(b&&m&&typeof b=="object"&&typeof m=="object"){if(b.constructor!==m.constructor)return!1;var B,M,H;if(Array.isArray(b)){if(B=b.length,B!=m.length)return!1;for(M=B;M--!=0;)if(!L(b[M],m[M]))return!1;return!0}if(b instanceof Map&&m instanceof Map){if(b.size!==m.size)return!1;var X=Z(b.entries()),ae;try{for(X.s();!(ae=X.n()).done;)if(M=ae.value,!m.has(M[0]))return!1}catch(g){X.e(g)}finally{X.f()}var J=Z(b.entries()),_;try{for(J.s();!(_=J.n()).done;)if(M=_.value,!L(M[1],m.get(M[0])))return!1}catch(g){J.e(g)}finally{J.f()}return!0}if(b instanceof Set&&m instanceof Set){if(b.size!==m.size)return!1;var a=Z(b.entries()),o;try{for(a.s();!(o=a.n()).done;)if(M=o.value,!m.has(M[0]))return!1}catch(g){a.e(g)}finally{a.f()}return!0}if(ArrayBuffer.isView(b)&&ArrayBuffer.isView(m)){if(B=b.length,B!=m.length)return!1;for(M=B;M--!=0;)if(b[M]!==m[M])return!1;return!0}if(b.constructor===RegExp)return b.source===m.source&&b.flags===m.flags;if(b.valueOf!==Object.prototype.valueOf)return b.valueOf()===m.valueOf();if(b.toString!==Object.prototype.toString)return b.toString()===m.toString();if(H=Object.keys(b),B=H.length,B!==Object.keys(m).length)return!1;for(M=B;M--!=0;)if(!Object.prototype.hasOwnProperty.call(m,H[M]))return!1;for(M=B;M--!=0;){var c=H[M];if(!L(b[c],m[c]))return!1}return!0}return b!==b&&m!==m}},87748:function(ne,re,C){"use strict";C.d(re,{rU:function(){return E}});var Z=C(2546),Y=C(38279),L=C(67294),b=C(83233),m=C(44721),B=C.n(m),M=C(3066),H=C(29345),X=C(88945),ae=function(s){(0,Y.Z)(T,s);function T(){for(var F,y=arguments.length,P=new Array(y),x=0;x<y;x++)P[x]=arguments[x];return F=s.call.apply(s,[this].concat(P))||this,F.history=(0,b.lX)(F.props),F}var N=T.prototype;return N.render=function(){return L.createElement(Z.F0,{history:this.history,children:this.props.children})},T}(L.Component),J=function(s){(0,Y.Z)(T,s);function T(){for(var F,y=arguments.length,P=new Array(y),x=0;x<y;x++)P[x]=arguments[x];return F=s.call.apply(s,[this].concat(P))||this,F.history=(0,b.q_)(F.props),F}var N=T.prototype;return N.render=function(){return L.createElement(Z.F0,{history:this.history,children:this.props.children})},T}(L.Component),_=function(T,N){return typeof T=="function"?T(N):T},a=function(T,N){return typeof T=="string"?(0,b.ob)(T,null,null,N):T},o=function(T){return T},c=L.forwardRef;typeof c=="undefined"&&(c=o);function g(s){return!!(s.metaKey||s.altKey||s.ctrlKey||s.shiftKey)}var S=c(function(s,T){var N=s.innerRef,F=s.navigate,y=s.onClick,P=(0,H.Z)(s,["innerRef","navigate","onClick"]),x=P.target,te=(0,M.Z)({},P,{onClick:function(V){try{y&&y(V)}catch(ee){throw V.preventDefault(),ee}!V.defaultPrevented&&V.button===0&&(!x||x==="_self")&&!g(V)&&(V.preventDefault(),F())}});return o!==c?te.ref=T||N:te.ref=N,L.createElement("a",te)}),E=c(function(s,T){var N=s.component,F=N===void 0?S:N,y=s.replace,P=s.to,x=s.innerRef,te=(0,H.Z)(s,["component","replace","to","innerRef"]);return L.createElement(Z.s6.Consumer,null,function(k){k||(0,X.Z)(!1);var V=k.history,ee=a(_(P,k.location),k.location),fe=ee?V.createHref(ee):"",oe=(0,M.Z)({},te,{href:fe,navigate:function(){var pe=_(P,k.location),se=y?V.replace:V.push;se(pe)}});return o!==c?oe.ref=T||x:oe.innerRef=x,L.createElement(F,oe)})});if(!1)var U,I;var p=function(T){return T},w=L.forwardRef;typeof w=="undefined"&&(w=p);function z(){for(var s=arguments.length,T=new Array(s),N=0;N<s;N++)T[N]=arguments[N];return T.filter(function(F){return F}).join(" ")}var W=w(function(s,T){var N=s["aria-current"],F=N===void 0?"page":N,y=s.activeClassName,P=y===void 0?"active":y,x=s.activeStyle,te=s.className,k=s.exact,V=s.isActive,ee=s.location,fe=s.sensitive,oe=s.strict,xe=s.style,pe=s.to,se=s.innerRef,Te=(0,H.Z)(s,["aria-current","activeClassName","activeStyle","className","exact","isActive","location","sensitive","strict","style","to","innerRef"]);return L.createElement(Z.s6.Consumer,null,function(ce){ce||(0,X.Z)(!1);var ve=ee||ce.location,_e=a(_(pe,ve),ve),Ee=_e.pathname,Oe=Ee&&Ee.replace(/([.+*?=^!:${}()[\]|/\\])/g,"\\$1"),we=Oe?(0,Z.LX)(ve.pathname,{path:Oe,exact:k,sensitive:fe,strict:oe}):null,de=!!(V?V(we,ve):we),Ae=de?z(te,P):te,Se=de?(0,M.Z)({},xe,{},x):xe,he=(0,M.Z)({"aria-current":de&&F||null,className:Ae,style:Se,to:_e},Te);return p!==w?he.ref=T||se:he.innerRef=se,L.createElement(E,he)})});if(!1)var D}}]);
