let $window=window,$document=document,$scrollBody=document.documentElement||document.body,$appHeader=document.querySelector(".app-header"),$body=document.body,winW=$window.innerWidth,winH=$window.innerHeight,docH=$document.documentElement.scrollHeight,st=$window.scrollY,$btnTop=document.querySelector(".js-btn-top"),btnTopAction={init:function(){this.click()},click:function(){$btnTop&&$btnTop.addEventListener("click",function(){window.scrollTo({top:0,behavior:"smooth"})})}},$motionItems=($btnTop&&btnTopAction.init(),document.querySelectorAll(".js-motion-item")),$layerWrap=($motionItems.length&&$window.addEventListener("scroll",function(){let o=$window.scrollY,n=$window.innerHeight;$motionItems.forEach(function(e){var t=e.getBoundingClientRect().top+o;o>t-n/2&&e.classList.add("is-motion-active"),640<winW&&o>t-n/1.5&&e.classList.add("is-motion-active")})}),$window.addEventListener("scroll",function(){0<$window.scrollY?($appHeader.classList.add("is-active"),$btnTop.classList.add("is-active")):($appHeader.classList.remove("is-active"),$btnTop.classList.remove("is-active"))}),document.querySelector(".layer-wrap")),layerAction={open:function(t){var e=$layerWrap.querySelector('.layer[data-layer-name="'+t+'"]');e?(e.parentElement.classList.add("is-active"),$body.classList.add("is-hidden"),$layerWrap.querySelectorAll(".layer").forEach(function(e){t===e.getAttribute("data-layer-name")?(e.classList.add("is-active"),e.querySelector(".btn-layer-close").classList.add("is-active"),$layerWrap.scrollTop=0):e.classList.remove("is-active")})):($layerWrap.classList.remove("is-active"),$body.classList.remove("is-hidden"))},close:function(){var e=$layerWrap.querySelectorAll(".layer");$layerWrap.classList.remove("is-active"),e.forEach(function(e){e.classList.remove("is-active"),e.querySelector(".btn-layer-close").classList.remove("is-active")}),$body.classList.remove("is-hidden")},bind:function(e){e.forEach(function(t){t.addEventListener("click",function(e){e.stopPropagation();e=t.getAttribute("data-layer-name");layerAction.open(e)})})}},$layers=document.querySelectorAll(".layer");$layers.forEach(function(e){e.addEventListener("click",function(e){e.target.matches(".btn-layer-close, .js-layer-close")&&(e.stopPropagation(),layerAction.close())})}),document.addEventListener("DOMContentLoaded",function(){var e=document.querySelectorAll(".js-layer-open");layerAction.bind(e)});