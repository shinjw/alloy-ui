AUI.add("aui-editor-bbcode-plugin",function(Q){var E=Q.Lang,M=E.isArray,N=E.isString,J=Q.ClassNameManager.getClassName,I="bbcodeplugin",P="bbcode",L="quote",U=J(L),O=J(L,"content"),W=J(L,"title"),C="<{0}(>|\\b[^>]*>)([\\s\\S]*?)</{0}>",F="<(([a-z0-9]+)\\b[^>]*?style=(\"|').*?{0}\\s*:\\s*([^;\"']+);?[^>]*)>([\\s\\S]*?)<(/\\2)>",H="(<[a-z0-9]+[^>]*>|</[a-z0-9]+>)",K='<div class="'+U+'"><div class="'+O+'">',D='<div class="'+W+'">$1</div>'+K,G="</div></div>",R="\\[(({0})=([^\\]]*))\\]([\\s\\S]*?)\\[\\/{0}\\]",S="\\[({0})\\]([\\s\\S]*?)\\[\\/{0}\\]",T=[{convert:[["br"]],regExp:"<{0}[^>]*>",output:"\n"},{convert:[{tags:["font-family"],source:["font"]},{tags:["font-size"],source:["size"]},{tags:["[^a-z-]*color"],source:["color"]}],regExp:F,output:"<$1>[{0}=$4]$5[/{0}]<$6>"},{convert:[{tags:["font-style"],source:["i"]},{tags:["font-weight"],source:["b"]}],regExp:F,output:"<$1>[{0}]$5[/{0}]<$6>"},{convert:[["text-decoration"]],regExp:F,output:function(){var X="";var A=arguments[4].toLowerCase();if(A.indexOf("underline")!=-1){X+="[u]";}else{if(A.indexOf("line-through")!=-1){X+="[s]";}}if(X!=""){return"<"+arguments[1]+">"+X+arguments[5]+X.replace("[","[/")+"<"+arguments[6]+">";}return arguments[0];}},{convert:[["margin-left"]],regExp:F,output:function(){var X="";var Y=parseInt(arguments[3]);if(!isNaN(Y)){var Z=Math.floor(Y/40);for(var A=0;A<Z;A++){X+="[indent]";}}X=X+arguments[5]+X.replace(/\[/g,"[/");return"<"+arguments[1]+">"+X+"<"+arguments[6]+">";}},{convert:[{tags:["font","size"],source:["size"]},{tags:["font","face"],source:["font"]}],regExp:"(<{0}\\b[^>]*{1}=(\"|')([^\"']+)(\"|')[^>]*>)([\\s\\S]*?)(</{0}>)",output:"$1[{0}=$3]$5[/{0}]$6"},{convert:[["text-align"]],regExp:F,output:"<$1>[$4]$5[/$4]<$6>"},{convert:[["span"]],regExp:C,output:"$2"},{convert:[["blockquote"]],regExp:C,output:"[indent]$2[/indent]"},{convert:[["b"],["strong"]],regExp:C,output:"[b]$2[/b]"},{convert:[["i"],["em"]],regExp:C,output:"[i]$2[/i]"},{convert:[["u"]],regExp:C,output:"[u]$2[/u]"},{convert:[["s"],["strike"]],regExp:C,output:"[s]$2[/s]"},{convert:[["img"]],regExp:"(<a[^>]*>)?<{0}\\b[^>]*src=(\"|')([^\"']+)(\"|')[^>]*>(</a>)?",output:"[img]$3[/img]"},{convert:[["a"]],regExp:"<{0}\\b[^>]*href=(\"|')mailto:([^\"']+)(\"|')[^>]*>([\\s\\S]*?)</{0}>",output:"[email=$2]$4[/email]"},{convert:[["a"]],regExp:"<{0}\\b[^>]*href=(\"|')([^\"']+)(\"|')[^>]*>([\\s\\S]*?)</{0}>",output:"[url=$2]$4[/url]"},{convert:[["center"]],regExp:C,output:"[center]$2[/center]"},{convert:[["ul"]],regExp:C,output:"[list]$2[/list]"},{convert:[["ol"]],regExp:C,output:"[list=1]$2[/list]"},{convert:[["li"]],regExp:C,output:"[*]$2"},{convert:[["code"]],regExp:C,output:"[code]$2[/code]"},{convert:[["quote"]],regExp:"<div\\b[^>]*class=(\"|')_"+U+"s*[^\"']*(\"|')[^>]*>([\\s\\S]*?)</div>",output:"$3"},{convert:[["div"]],regExp:C,output:"$2\n"},{convert:[["h1"],["h2"],["h3"],["h4"],["h5"],["h6"]],regExp:C,output:"[b]$2[/b]\n"},{convert:[["p"]],regExp:C,output:"$2\n\n"},{convert:[{tags:["list","left|center|right"],source:["list"]}],regExp:"(\\[{0}[^\\]]*\\])\\s*\\[({1})\\]([\\s\\S]*?)\\[/\\2\\]\\s*\\[/{0}\\]",output:"[$2]$1$3[/{0}][/$2]"}],B=[{convert:[{tags:["b"],source:["b"]},{tags:["i"],source:["i"]},{tags:["u"],source:["u"]},{tags:["s"],source:["s"]},{tags:["code"],source:["code"]}],regExp:S,output:"<{0}>$2</{0}>"},{convert:[{tags:["color"],source:["color"]}],regExp:R,output:'<span style="{0}: $3;">$4</span>'},{convert:[{tags:["font"],source:["face"]},{tags:["size"],source:["size"]}],regExp:R,output:'<font {0}="$3">$4</font>'},{convert:[["img"]],regExp:S,output:'<img src="$2" alt="" />'},{convert:[{tags:["email"],source:["mailto:"]},{tags:["url"],source:[""]}],regExp:R,output:'<a href="{0}$3">$4</a>'},{convert:[["list"]],regExp:"\\[({0}(=1)?)]([\\s\\S]*?)\\[\\/{0}\\]",output:function(){var Y="";if(arguments[1]=="list=1"){Y+="<ol>";}else{Y+="<ul>";}var A=E.trim(arguments[3]).split("[*]");for(var X=1;X<A.length;X++){Y+="<li>"+A[X]+"</li>";}if(arguments[1]=="list=1"){Y+="</ol>";}else{Y+="</ul>";}return Y;}},{convert:[{tags:["indent"],source:["blockquote"]}],regExp:S,output:"<{0}>$2</{0}>"},{convert:[["left"],["center"],["right"]],regExp:S+"\n?",output:'<div style="text-align: $1;">$2</div>'},{convert:[["\n"]],regExp:"{0}",output:"<br />"}];var V=Q.Component.create({NAME:I,NS:P,EXTENDS:Q.Plugin.Base,ATTRS:{host:{value:false}},prototype:{initializer:function(){var A=this;var X=A.get("host");A.afterHostMethod("getContent",A.getBBCode,A);X.on("contentChange",A._contentChange,A);},getBBCode:function(){var A=this;var Z=A.get("host");var Y="";Y=Z.constructor.prototype.getContent.apply(Z,arguments);var a=Q.Node.create("<div>"+Y+"</div>");var X=null;while(X=a.all("div."+U)){if(!X.size()){break;}X.each(function(g){var b=this;var f=null;var c=g;do{if(c){f=c;}c=c.one("div."+O);}while(c);var e=f.get("parentNode");var i=e.previous();var d="["+L;if(i&&i.hasClass(W)){var h=i.html();h=h.replace(new RegExp(H,"ig"),"");d+="="+(h.charAt(h.length-1)==":"?h.substring(0,h.length-1):i.html());i.remove(true);}d+="]"+f.html()+"[/"+L+"]";e.html(d);e.removeClass(L);e.addClass("_"+L);},A);}Y=a.html();Y=A._parseTagExpressions(T,Y);Y=Y.replace(new RegExp(H,"ig"),"");return new Q.Do.AlterReturn(null,Y);},getContentAsHtml:function(){var A=this;var Y=A.get("host");var X="";X=Y.constructor.prototype.getContent.apply(Y,arguments);return X;},_contentChange:function(Z){var A=this;var Y=A.get("host");var X=Z.newVal;X=X.replace(/\[quote=([^\]]*)\]/ig,K);X=X.replace(/\[quote\]/ig,D);X=X.replace(/\[\/quote\]/ig,G);X=A._parseTagExpressions(B,X);Z.newVal=X;Z.stopImmediatePropagation();},_parseTagExpressions:function(b,d){var A=this;for(var c=0;c<b.length;c++){for(var a=0;a<b[c].convert.length;a++){var Z=null;var X=b[c].output;if(M(b[c].convert[a])){Z=b[c].convert[a];}else{Z=b[c].convert[a].tags;if(N(b[c].output)){X=E.sub(b[c].output,b[c].convert[a].source);}}var Y=E.sub(b[c].regExp,Z);d=d.replace(new RegExp(Y,"ig"),X);}}return d;}}});Q.namespace("Plugin").BBCodePlugin=V;},"@VERSION@",{requires:["aui-base","editor-base"]});
