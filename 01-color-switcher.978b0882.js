let t=null;const e={btnStart:document.querySelector("[data-start]"),btnStop:document.querySelector("[data-stop]")};function n(t,e){t.removeAttribute("disabled"),e.setAttribute("disabled","disabled")}n(e.btnStart,e.btnStop),e.btnStart.addEventListener("click",(function(){n(e.btnStop,e.btnStart),t=setInterval((()=>{document.body.style.backgroundColor=`#${Math.floor(16777215*Math.random()).toString(16).padStart(6,0)}`}),1e3)})),e.btnStop.addEventListener("click",(function(){clearInterval(t),n(e.btnStart,e.btnStop)}));
//# sourceMappingURL=01-color-switcher.978b0882.js.map
