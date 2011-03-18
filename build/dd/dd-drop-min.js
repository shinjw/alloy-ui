/*
Copyright (c) 2010, Yahoo! Inc. All rights reserved.
Code licensed under the BSD License:
http://developer.yahoo.com/yui/license.html
version: 3.2.0
build: nightly
*/
YUI.add("dd-drop",function(a){var b="node",f=a.DD.DDM,i="offsetHeight",c="offsetWidth",h="drop:over",g="drop:enter",d="drop:exit",e=function(){this._lazyAddAttrs=false;e.superclass.constructor.apply(this,arguments);a.on("domready",a.bind(function(){a.later(100,this,this._createShim);},this));f._regTarget(this);};e.NAME="drop";e.ATTRS={node:{setter:function(j){var k=a.one(j);if(!k){a.error("DD.Drop: Invalid Node Given: "+j);}return k;}},groups:{value:["default"],setter:function(j){this._groups={};a.each(j,function(m,l){this._groups[m]=true;},this);return j;}},padding:{value:"0",setter:function(j){return f.cssSizestoObject(j);}},lock:{value:false,setter:function(j){if(j){this.get(b).addClass(f.CSS_PREFIX+"-drop-locked");}else{this.get(b).removeClass(f.CSS_PREFIX+"-drop-locked");}return j;}},bubbles:{setter:function(j){this.addTarget(j);return j;}},useShim:{value:true,setter:function(j){a.DD.DDM._noShim=!j;return j;}}};a.extend(e,a.Base,{_bubbleTargets:a.DD.DDM,addToGroup:function(j){this._groups[j]=true;return this;},removeFromGroup:function(j){delete this._groups[j];return this;},_createEvents:function(){var j=[h,g,d,"drop:hit"];a.each(j,function(m,l){this.publish(m,{type:m,emitFacade:true,preventable:false,bubbles:true,queuable:false,prefix:"drop"});},this);},_valid:null,_groups:null,shim:null,region:null,overTarget:null,inGroup:function(k){this._valid=false;var j=false;a.each(k,function(m,l){if(this._groups[m]){j=true;this._valid=true;}},this);return j;},initializer:function(j){a.later(100,this,this._createEvents);var k=this.get(b),l;if(!k.get("id")){l=a.stamp(k);k.set("id",l);}k.addClass(f.CSS_PREFIX+"-drop");this.set("groups",this.get("groups"));},destructor:function(){f._unregTarget(this);if(this.shim&&(this.shim!==this.get(b))){this.shim.detachAll();this.shim.remove();this.shim=null;}this.get(b).removeClass(f.CSS_PREFIX+"-drop");this.detachAll();},_deactivateShim:function(){if(!this.shim){return false;}this.get(b).removeClass(f.CSS_PREFIX+"-drop-active-valid");this.get(b).removeClass(f.CSS_PREFIX+"-drop-active-invalid");this.get(b).removeClass(f.CSS_PREFIX+"-drop-over");if(this.get("useShim")){this.shim.setStyles({top:"-999px",left:"-999px",zIndex:"1"});}this.overTarget=false;},_activateShim:function(){if(!f.activeDrag){return false;}if(this.get(b)===f.activeDrag.get(b)){return false;}if(this.get("lock")){return false;}var j=this.get(b);if(this.inGroup(f.activeDrag.get("groups"))){j.removeClass(f.CSS_PREFIX+"-drop-active-invalid");j.addClass(f.CSS_PREFIX+"-drop-active-valid");f._addValid(this);this.overTarget=false;if(!this.get("useShim")){this.shim=this.get(b);}this.sizeShim();}else{f._removeValid(this);j.removeClass(f.CSS_PREFIX+"-drop-active-valid");j.addClass(f.CSS_PREFIX+"-drop-active-invalid");}},sizeShim:function(){if(!f.activeDrag){return false;}if(this.get(b)===f.activeDrag.get(b)){return false;}if(this.get("lock")){return false;}if(!this.shim){a.later(100,this,this.sizeShim);return false;}var o=this.get(b),m=o.get(i),k=o.get(c),r=o.getXY(),q=this.get("padding"),j,n,l;k=k+q.left+q.right;m=m+q.top+q.bottom;r[0]=r[0]-q.left;r[1]=r[1]-q.top;if(f.activeDrag.get("dragMode")===f.INTERSECT){j=f.activeDrag;n=j.get(b).get(i);l=j.get(b).get(c);m=(m+n);k=(k+l);r[0]=r[0]-(l-j.deltaXY[0]);r[1]=r[1]-(n-j.deltaXY[1]);}if(this.get("useShim")){this.shim.setStyles({height:m+"px",width:k+"px",top:r[1]+"px",left:r[0]+"px"});}this.region={"0":r[0],"1":r[1],area:0,top:r[1],right:r[0]+k,bottom:r[1]+m,left:r[0]};},_createShim:function(){if(!f._pg){a.later(10,this,this._createShim);return;}if(this.shim){return;}var j=this.get("node");if(this.get("useShim")){j=a.Node.create('<div id="'+this.get(b).get("id")+'_shim"></div>');j.setStyles({height:this.get(b).get(i)+"px",width:this.get(b).get(c)+"px",backgroundColor:"yellow",opacity:".5",zIndex:"1",overflow:"hidden",top:"-900px",left:"-900px",position:"absolute"});f._pg.appendChild(j);j.on("mouseover",a.bind(this._handleOverEvent,this));j.on("mouseout",a.bind(this._handleOutEvent,this));}this.shim=j;},_handleTargetOver:function(){if(f.isOverTarget(this)){this.get(b).addClass(f.CSS_PREFIX+"-drop-over");f.activeDrop=this;f.otherDrops[this]=this;if(this.overTarget){f.activeDrag.fire("drag:over",{drop:this,drag:f.activeDrag});this.fire(h,{drop:this,drag:f.activeDrag});}else{if(f.activeDrag.get("dragging")){this.overTarget=true;this.fire(g,{drop:this,drag:f.activeDrag});f.activeDrag.fire("drag:enter",{drop:this,drag:f.activeDrag});f.activeDrag.get(b).addClass(f.CSS_PREFIX+"-drag-over");}}}else{this._handleOut();}},_handleOverEvent:function(){this.shim.setStyle("zIndex","999");f._addActiveShim(this);},_handleOutEvent:function(){this.shim.setStyle("zIndex","1");f._removeActiveShim(this);},_handleOut:function(j){if(!f.isOverTarget(this)||j){if(this.overTarget){this.overTarget=false;if(!j){f._removeActiveShim(this);}if(f.activeDrag){this.get(b).removeClass(f.CSS_PREFIX+"-drop-over");f.activeDrag.get(b).removeClass(f.CSS_PREFIX+"-drag-over");this.fire(d);f.activeDrag.fire("drag:exit",{drop:this});delete f.otherDrops[this];}}}}});a.DD.Drop=e;},"3.2.0",{requires:["dd-ddm-drop","dd-drag"],skinnable:false});