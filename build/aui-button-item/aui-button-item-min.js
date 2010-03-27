AUI.add("aui-button-item",function(M){var D=M.Lang,H=M.ClassNameManager.getClassName,G="buttonitem",B="icon",S="label",R="only",Q="state",C=H(G),I=H(G,B),T=H(G,S),O=H(G,B,S),K=H(G,B,R),F=H(G,S,R),J=H(B),N='<button type="button"></button>',E='<span class="'+[I,J].join(" ")+'"></span>',L='<span class="'+T+'"></span>';var P=function(A){if(D.isString(A)){A={icon:A};}P.superclass.constructor.call(this,A);};P.NAME=G;P.ATTRS={activeState:{value:false},classNames:{},defaultState:{},handler:{lazyAdd:false,value:null,setter:function(Y){var A=this;var X=Y;var V=A;var U=A;var W="click";if(D.isObject(X)){var Z=X;X=Z.fn||X;V=Z.context||V;W=Z.type||W;}if(D.isFunction(X)){A.on(W,M.rbind(X,V,U,Z.args));}return Y;}},hoverState:{},icon:{value:""},id:{valueFn:function(){return M.guid();}},label:{value:""}};M.extend(P,M.Component,{BOUNDING_TEMPLATE:N,CONTENT_TEMPLATE:null,renderUI:function(){var A=this;A._renderStates();},bindUI:function(){var A=this;A.after("iconChange",A._afterIconChange);A.after("labelChange",A._afterLabelChange);},syncUI:function(){var A=this;var V=A.get("icon");var U=A.get("label");if(V){A._uiSetIcon(V);}if(U){A._uiSetLabel(U);}},_afterIconChange:function(U){var A=this;A._uiSetIcon(U.newVal,U.prevVal);},_afterLabelChange:function(U){var A=this;A._uiSetLabel(U.newVal);},_getIconNode:function(){var A=this;return A._iconNode||A._renderIcon();},_getLabelNode:function(){var A=this;return A._labelNode||A._renderLabel();},_renderIcon:function(){var A=this;var U=M.Node.create(E);A._iconNode=U;A.get("boundingBox").appendChild(U);return U;},_renderLabel:function(){var A=this;var U=M.Node.create(L);A._labelNode=U;A.get("boundingBox").appendChild(U);return U;},_getState:function(U,V){var A=this;var X=A.get(U);var W=X;if(V){X=V.get(U);if(!D.isUndefined(X)){W=X;}}return W;},_renderStates:function(X){var A=this;var W=A.get("parent");var V=A._getState("activeState",W);var Z=A._getState("classNames",W);var U=A._getState("defaultState",W);var Y=A._getState("hoverState",W);A.plug(M.StateInteractionPlugin,{activeState:V,classNames:Z,defaultState:U,hoverState:Y});},_syncChildrenStates:function(){var A=this;var X=A.get("icon");var V=A.get("label");var Y=(X&&V);var Z=(!X&&V);var W=(X&&!V);var U=A.get("boundingBox");U.toggleClass(O,Y);U.toggleClass(K,W);U.toggleClass(F,Z);},_uiSetIcon:function(V,X){var A=this;var U=A._getIconNode();var W="show";if(!V){W="hide";}V=H(B,V);if(X){X=H(B,X);}U.replaceClass(X,V);U[W]();A._syncChildrenStates();},_uiSetLabel:function(V){var A=this;var U=A._getLabelNode();var W="show";if(!V){W="hide";}U.text(V);U[W]();A._syncChildrenStates();}});M.ButtonItem=M.Base.build(G,P,[M.WidgetChild],{dynamic:false});},"@VERSION@",{requires:["aui-base","aui-state-interaction","widget-child"],skinnable:true});