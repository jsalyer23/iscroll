!function(t){function e(i){if(n[i])return n[i].exports;var s=n[i]={exports:{},id:i,loaded:!1};return t[i].call(s.exports,s,s.exports,e),s.loaded=!0,s.exports}var n={};return e.m=t,e.c=n,e.p="/",e(0)}([function(t,e,n){/*!
	 * iScroll by Matteo "Cubiq" Spinelli ~ http://cubiq.org ~ Released under MIT license
	 */
"use strict";function i(t){return t&&t.__esModule?t:{"default":t}}function s(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}var o=function(){function t(t,e){for(var n=0;n<e.length;n++){var i=e[n];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(t,i.key,i)}}return function(e,n,i){return n&&t(e.prototype,n),i&&t(e,i),e}}(),r=n(1),a=i(r),c=n(2),l=i(c),u=n(4),h=i(u),v={LOOP:!1,POINTS:[]},d=function(){function t(e){var i=arguments.length<=1||void 0===arguments[1]?{}:arguments[1];if(s(this,t),window.iscroll=this,e.jquery&&(e=e[0]),"string"==typeof e&&(e=document.querySelector(e)),!e)throw"Element is not defined!";this.container=e,this.options=Object.assign({},n(6),i),this.state={},this.globalState=v,n(7)["default"](this),a["default"].apply(this),l["default"].apply(this),new h["default"]("viewLayer",this.container.firstElementChild,this),this.refresh(),this.state.ready=!0,this.emit("onReady")}return o(t,[{key:"destructor",value:function(){}},{key:"update",value:function(){}},{key:"refresh",value:function(){this.state.width=this.container.offsetWidth,this.state.height=this.container.offsetHeight}},{key:"destroy",value:function(){this.destructor(),this.off()}}]),t}();a["default"].extend(d.prototype),l["default"].extend(d.prototype),window.Iscroll=d,t.exports=d},function(t,e){"use strict";function n(t){if(this._customEvents[t])for(var e=this._customEvents[t].length;e--;)this._customEvents[t][e].apply(this,[].slice.call(arguments,1))}function i(t,e){var n=this;if("object"!==(void 0===t?"undefined":c(t))){var i=t.split(" ");i.forEach(function(t){n._customEvents[t]||(n._customEvents[t]=[]),n._customEvents[t].push(e)})}else{var s=!0,o=!1,r=void 0;try{for(var a,l=Object.keys(t)[Symbol.iterator]();!(s=(a=l.next()).done);s=!0){var u=a.value;this.attach(u,t[u])}}catch(h){o=!0,r=h}finally{try{!s&&l["return"]&&l["return"]()}finally{if(o)throw r}}}}function s(t,e){var n=function i(){e(),this.detach(t,i)};this.attach(t,n)}function o(t,e){if("object"!==(void 0===t?"undefined":c(t)))this._customEvents[t]&&(e?this._customEvents[t].filter(function(t){return t!==e}):this._customEvents[t]=[]);else for(var n in t)this.detach(n,t[n])}function r(t,e,n){this._events[t]||(this._events[t]=[]),n=n||this,e=e||this.container,this._events[t].push({cb:n,context:e}),e.addEventListener(t,n,!1)}function a(t,e,n){var i;if(t){if(this._events[t]){n=n||this,e=e||this.container;var s=this._events[t].slice(0);for(i=s.length;i--;)s[i].cb===n&&s[i].context===e&&(e.removeEventListener(t,n,!1),this._events[t].splice(i,1));this._events[t].length||delete this._events[t]}}else for(i in this._events)this.off(i,this._events[i].context,this._events[i].cb)}var c="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol?"symbol":typeof t};Object.defineProperty(e,"__esModule",{value:!0}),e["default"]={apply:function(t){t._events={},t._customEvents={}},extend:function(t){Object.assign(t,{attach:i,attachOnce:s,detach:o,emit:n,on:r,off:a})}}},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var i=n(3),s={pointer:{start:"pointerdown",move:"pointermove",end:"pointerup",cancel:"pointercancel"},MSPointer:{start:"MSPointerDown",move:"MSPointerMove",end:"MSPointerUp",cancel:"MSPointerCancel"},touch:{start:"touchstart",move:"touchmove",end:"touchend",cancel:"touchcancel"},mouse:{start:"mousedown",move:"mousemove",end:"mouseup",cancel:"mousecancel"}},o=["onReady","onRefresh","onDestroy","beforeScrollStart","scrollCancel","scrollStart","scroll","scrollEnd","flick","zoomStart","zoomEnd"],r={handleEvent:function(t){switch(t.type){case this.eventType.start:this._eventStart(t);break;case this.eventType.move:this._eventMove(t);break;case this.eventType.end:case this.eventType.cancel:this._eventEnd(t);break;case this.eventType.transitionEnd:this._eventTransitionEnd(t);break;case"orientationchange":case"resize":this._eventResize(t)}},_eventStart:function(t){this.options.preventDefault&&t.preventDefault();var e=t.targetTouches||[t],n=void 0,i=void 0,s=void 0,o=void 0,r=void 0;for(o=0,r=e.length;r>o;o++)n=e[o].identifier||0,i=e[o].pageX,s=e[o].pageY,this.globalState.POINTS[n]={instance:this,id:n+"",phase:"start",initiated:!1,x:i,y:s,startX:i,startY:s,deltaX:0,deltaY:0,startTime:Date.now(),currentTime:Date.now()};this.globalState.LOOP||this._renderLoop(),this.on(this.eventType.move,this.options.document),this.on(this.eventType.end,this.options.document)},_eventMove:function(t){var e=t.changedTouches||[t],n=this.globalState.POINTS,i=void 0,s=void 0;for(s=e.length;s--;)i=e[s].identifier||0,n[i]&&n[i].initiated&&(n[i]=this._updatePoint(n[i],t),n[i].phase="move")},_eventEnd:function(t){var e=t.changedTouches||[t],n=this.globalState.POINTS,i=void 0,s=void 0;for(s=e.length;s--;)i=e[s].identifier||0,n[i]&&n[i].initiated&&(n[i]=this._updatePoint(n[i],t),n[i].phase="end");this.off(this.eventType.move,this.options.document),this.off(this.eventType.end,this.options.document)},_eventResize:function(t){return this.state.ready?void(this._resizeTimeout=setTimeout(this.refresh.bind(this),100)):this.attachOnce("onReady",this._eventResize.bind(this,t))},_updatePoint:function(t,e){t.currentTime=Date.now(),t.deltaX=t.x-e.pageX,t.deltaY=t.y-e.pageY,t.x=e.pageX,t.y=e.pageY;var n=t.startX-t.x,i=t.startY-t.y;t.distance=Math.sqrt(n*n+i*i),t.distanceX=n,t.distanceY=i;var s=Math.atan2(i,-n);return 0>s&&(s+=2*Math.PI),t.theta=s,t},_renderLoop:function(){var t=0,e=this.globalState.POINTS;for(var n in e){var s=e[n];switch(s.phase){case"start":s.initiated||(s.initiated=!0,this.emit("start",s));break;case"move":this.emit("move",s);break;case"end":s.initiated=!1,this.emit("end",s),delete e[n]}t++}this.globalState.LOOP=!!t,this.globalState.LOOP&&(0,i.read)(this._renderLoop.bind(this))}},a=function(t){var e=t.options;o.forEach(function(n){e[n]&&t.attach(n,e[n])})},c=function(t){var e=t.detects,n=t.eventType,i={"":"transitionend",webkit:"webkitTransitionEnd",Moz:"transitionend",O:"oTransitionEnd",ms:"MSTransitionEnd"};n.transitionEnd=i[e.vendor]||!1};e["default"]={apply:function(t){var e=t.options,n=t.detects;e.eventType?t.eventType=s[e.eventType]:n.hasPointerEvents?t.eventType=s.pointer:n.hasMSpointerEvents?t.eventType=s.MSPointer:n.useTouchEvents?t.eventType=s.touch:t.eventType=s.mouse,c(t),t.on("orientationchange",window),t.on("resize",window),t.on(t.eventType.start),t.on(t.eventType.transitionEnd),a(t)},extend:function(t){Object.assign(t,r)}}},function(t,e){"use strict";Object.defineProperty(e,"__esModule",{value:!0});for(var n=["ms","moz","webkit","o"],i=window.requestAnimationFrame,s=window.cancelAnimationFrame,o=0,r=[],a=[],c=0;c<n.length&&!i;++c)e.request=i=window[n[c]+"RequestAnimationFrame"],e.cancel=s=window[n[c]+"CancelAnimationFrame"]||window[n[c]+"CancelRequestAnimationFrame"];i||(e.request=i=function(t){var e=(new Date).getTime(),n=Math.max(0,16-(e-o)),i=setTimeout(function(){t(e+n)},n);return o=e+n,i}),s||(e.cancel=s=function(t){clearTimeout(t)});var l=function(t){r.push(t)},u=function(t){a.push(t)},h=function(t){var e=void 0;return function(){var n=arguments;e&&s(e),e=l(function(){e=!1,t.apply(this,n)})}},v=function d(){var t=r;r=[],t.forEach(function(t){return t()});var e=a;a=[],e.forEach(function(t){return t()}),i(d,"loop set")};i(v,"loop set"),e.request=i,e.cancel=s,e.read=l,e.write=u,e.throttle=h},function(t,e,n){"use strict";function i(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}var s=function(){function t(t,e){for(var n=0;n<e.length;n++){var i=e[n];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(t,i.key,i)}}return function(e,n,i){return n&&t(e.prototype,n),i&&t(e,i),e}}();Object.defineProperty(e,"__esModule",{value:!0});var o=n(5),r=n(3),a=function(){function t(e,n,s){i(this,t),this.parent=s,this.container=n,this.parent[e]=this,this.name=e;var o=this.parent;o.state[e]||(o.state[e]={}),this.state=o.state[e];this.init(),this.subscribe(),this.timeCapsule=[],this.timeCapsuleSize=15}return s(t,[{key:"init",value:function(){var t=this.state,e=this.container;t.x||(t.x=t.currentX=e.offsetLeft),t.y||(t.y=t.currentY=e.offsetTop),this.refresh()}},{key:"processInteraction",value:function(t){var e=this.state,n=this.timeCapsule;e.isAnimated=!1,"start"===t.phase&&(e.startX=e.lastX=e.currentX,e.startY=e.lastY=e.currentY,n.length=0),n.push({x:t.x,y:t.y,time:t.currentTime}),n.length>this.timeCapsuleSize&&n.shift(),t.distanceX&&t.distanceY&&(e.lastX=e.currentX,e.lastY=e.currentY,e.currentX=e.startX-t.distanceX,e.currentY=e.startY-t.distanceY,this.renderPosition()),"end"===t.phase&&(delete e.startX,delete e.startY,this.calculateVelocity(),this.releaseVelocity())}},{key:"getOverscrollX",value:function(t){var e=this.state,n=this.parent.state,i=0;return t||(t=e.currentX),t>0?i=t:e.width+t<n.width&&(i=e.width+t-n.width),i}},{key:"getOverscrollY",value:function(t){var e=this.state,n=this.parent.state,i=0;return t||(t=e.currentY),t>0?i=t:e.height+t<n.height&&(i=e.height+t-n.height),i}},{key:"renderPosition",value:function(){var t=this.state,e=this.container,n=this.parent.options,i=this.parent.styles.transform;return t.overscrollX=this.getOverscrollX(),t.overscrollY=this.getOverscrollY(),n.scrollX&&(t.x=t.currentX-(t.overscrollX||0),t.overscrollX&&n.allowOverscroll&&(t.x+=this.overscrollReducer(t.overscrollX))),n.scrollY&&(t.y=t.currentY-(t.overscrollY||0),t.overscrollY&&n.allowOverscroll&&(t.y+=this.overscrollReducer(t.overscrollY))),i?void(e.style[i]="translate3d("+t.x+"px, "+t.y+"px, 0px)"):(e.style.left=this.state.x,void(e.style.top=this.state.y))}},{key:"calculateVelocity",value:function(){var t=this.timeCapsule,e=this.state,n=t[0],i=t[t.length-1],s=i.x-n.x,o=i.y-n.y,r=i.time-n.time,a=r/this.timeCapsule.length;e.velocityX=s/a||0,e.velocityY=o/a||0}},{key:"releaseVelocity",value:function(){var t=this,e=this.state,n=this.parent.options,i=.3,s=0,o=0,r=21,a=0,c=0,l=1;if(e.overscrollX&&e.overscrollY)return this._animate({distanceX:-e.overscrollX||0,distanceY:-e.overscrollY||0,time:350});if(e.overscrollX)a=-e.overscrollX;else if(e.velocityX&&Math.abs(e.velocityX)>i)for(s=Math.abs(Math.ceil(Math.log(i/Math.abs(e.velocityX))/Math.log(n.friction)));s>=l;)a+=e.velocityX*Math.pow(n.friction,l),l++;if(e.overscrollY)c=-e.overscrollY;else if(e.velocityY&&Math.abs(e.velocityY)>i)for(o=Math.abs(Math.ceil(Math.log(i/Math.abs(e.velocityY))/Math.log(n.friction))),l=1;o>=l;)c+=e.velocityY*Math.pow(n.friction,l),l++;var u=Math.abs(r,o,s);this._animate({distanceX:a,distanceY:c,frames:u,callback:function(){return e.overscrollX||e.overscrollY?t._animate({distanceX:-e.overscrollX||0,distanceY:-e.overscrollY||0,time:350}):void 0}})}},{key:"_animate",value:function(t){var e=this,n=t.distanceX,i=t.distanceY,s=t.easing,a=t.frames,c=t.time,l=t.callback,u=this.state,h=u.currentX,v=u.currentY,d=0;!a&&c&&(a=c/(1e3/60)),s||(s=o.inertia),u.isAnimated=!0;var f=function p(){u.isAnimated&&(u.currentX=s(d,h,n,a),u.currentY=s(d,v,i,a),e.renderPosition(),d++,a>d?(0,r.write)(p):(u.isAnimated=!1,"function"==typeof l&&l()))};(0,r.write)(f)}},{key:"overscrollReducer",value:function(t){for(var e=t>0?1:-1,n=Math.abs(t),i=0;n>0;)i+=1/Math.pow(1.0035,n)*e,n--;return i}},{key:"subscribe",value:function(){this.processInteraction=this.processInteraction.bind(this),this.parent.attach("start move end",this.processInteraction)}},{key:"unsubscribe",value:function(){this.parent.detach("start move end",this.processInteraction)}},{key:"refresh",value:function(){var t=this.state,e=this.container;t.width=e.offsetWidth,t.height=e.offsetHeight}},{key:"destroy",value:function(){this.unsubscribe()}}]),t}();e["default"]=a},function(t,e){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var n=function(t,e,n,i){return n*((t=t/i-1)*t*t+1)+e};e.inertia=n},function(t,e){"use strict";t.exports={eventType:void 0,document:document,preventDefault:!0,allowOverscroll:!0,scrollY:!0,scrollX:!0,friction:.92,onReady:void 0}},function(t,e){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var n=function(t){for(var e=document.createElement("div").style,n=["t","webkitT","MozT","msT","OT"],i=!1,s=0,o=n.length;o>s;s++)if(n[s]+"ransform"in e){i=n[s].substr(0,n[s].length-1);break}t.vendor=i},i=function(t,e){var n=e.vendor;if(n===!1)return!1;var i=document.createElement("div").style;return t=""===n?t:n+t.charAt(0).toUpperCase()+t.substr(1),t in i&&t},s=function(t){Object.assign(t,{hasPointerEvents:!!window.navigator.pointerEnabled,hasMSpointerEvents:!!window.navigator.msPointerEnabled,useTouchEvents:"ontouchstart"in window&&/mobile|tablet|ip(ad|hone|od)|android|silk/i.test(window.navigator.userAgent)}),t.useMouseEvents=!t.hasPointerEvents&&!t.hasMSpointerEvents&&!t.useTouchEvents};e["default"]=function(t){t.detects={},t.styles={};var e=t.detects,o=t.styles;s(e),n(e),Object.assign(o,{transform:i("transform",e),transitionDuration:i("transitionDuration",e)})}}]);
//# sourceMappingURL=iscroll.js.map