// ==UserScript==
// @name        KiroAuto – Run / Retry Only (v3.1.0)
// @namespace   https://github.com/azlife1224/KiroAssist
// @version     3.1.0
// @description Auto‑click “Run” & “Retry” on Kiro, ignore “Follow”.
// @match       *://*/*
// @grant       none
// ==/UserScript==
(() => {
    "use strict";
    if (window.KiroAuto?.v >= 3.1) return;
  
    /* ------------ Config ------------ */
    const cfg = {
      poll        : 1000,     // fallback 輪詢
      debounce    : 120,      // MO 防抖
      debug       : true,     // console.log
      maxDelay    : 100       // 等待指標解鎖的 rAF 時間
    };
  
    const KW = {
      run   : ["run","trust","accept","執行","play"],
      retry : ["retry","again","重試"],
      ignore: [/follow/i]     // 可放字串或 RegExp
    };
  
    /* ---------- helpers ---------- */
    const clean = s => s
        .replace(/\u00a0/g," ")
        .replace(/\s+/g," ")
        .trim().toLowerCase();
  
    const txtOf = btn => clean(
        [btn.innerText,               // <-- 比 textContent 更乾淨
         btn.getAttribute("aria-label"),
         btn.getAttribute("title"),
         btn.getAttribute("data-tooltip-content")].filter(Boolean).join(" ")
    );
  
    const hasKW = (txt,list) => list.some(k =>
        (k instanceof RegExp) ? k.test(txt) : txt.includes(k)
    );
  
    const isVisible = el => {
      const r = el.getBoundingClientRect();
      const st = getComputedStyle(el);
      return r.width && r.height && st.display!=="none" &&
             st.visibility!=="hidden" && parseFloat(st.opacity) > .15;
    };
  
    const nativeClickable = el =>
          !el.disabled && !el.hasAttribute("disabled") &&
          getComputedStyle(el).pointerEvents !== "none";
  
    const log = (...a)=> cfg.debug && console.log("[KiroAuto]",...a);
  
    /* ---------- classify ---------- */
    function classify(btn){
      const txt = txtOf(btn);
      if (hasKW(txt,KW.ignore)) return "ignore";
  
      const v = (btn.dataset.variant||"").toLowerCase();
      const p = (btn.dataset.purpose||"").toLowerCase();
      if (v==="primary"   && p==="alert")   return "run";
      if (v==="secondary" && p==="default") return "retry";
  
      if (hasKW(txt,KW.run))   return "run";
      if (hasKW(txt,KW.retry)) return "retry";
      return null;
    }
  
    /* ---------- click engine ---------- */
    const clicked = new WeakSet();
    const stats   = {run:0,retry:0,ignore:0};
  
    function reallyClick(btn){
      try { btn.click(); }
      catch{
        // fallback: 派發 MouseEvent
        ["mousedown","mouseup","click"].forEach(t=>{
          btn.dispatchEvent(new MouseEvent(t,{bubbles:true}));
        });
      }
    }
  
    function attempt(btn,src,delay=0){
      if (clicked.has(btn)) return;
  
      const doIt = () => {
        if (!isVisible(btn)) return;
        const type = classify(btn);
        if (!type) return;
        if (type==="ignore"){ stats.ignore++; log("🚫 IGNORE |",src,"|",txtOf(btn)); return;}
  
        reallyClick(btn);
        clicked.add(btn);
        stats[type]++;
  
        log(`🔘 Click ${type.toUpperCase()} | from ${src} | "${txtOf(btn)}"`);
      };
  
      delay ? requestAnimationFrame(()=>setTimeout(doIt,delay))
            : doIt();
    }
  
    /* ---------- scanners ---------- */
    function scanAll(src="poll"){
      document.querySelectorAll("button.kiro-button,button[data-variant]")
              .forEach(btn=>{
                if(!nativeClickable(btn))
                     attempt(btn,src,cfg.maxDelay);  // 延後再試
                else attempt(btn,src);
              });
    }
  
    /* ---------- MutationObservers ---------- */
    const bodyMO = new MutationObserver(muts=>{
      clearTimeout(bodyMO.deb);
      bodyMO.deb = setTimeout(()=>scanAll("mutation"), cfg.debounce);
    });
  
    // 專盯 snackbar actions
    const actionMO = new MutationObserver(muts=>{
      muts.forEach(m=>{
        m.addedNodes.forEach(n=>{
          if (n.nodeType===1 && n.tagName==="BUTTON")
            attempt(n,"snackbar");
        });
      });
    });
  
    /* ---------- lifecycle ---------- */
    function start(){
      bodyMO.observe(document.body,{childList:true,subtree:true});
      scanAll("start");
  
      // snackbar observer
      const root = document.body;
      const watchActions = node=>{
        node.querySelectorAll(".kiro-snackbar-actions")
            .forEach(a=>actionMO.observe(a,{childList:true}));
      };
      watchActions(root);
      bodyMO.addEventListener?.("mutate",m=>watchActions(document.body)); // safety
  
      start.timer = setInterval(scanAll, cfg.poll);
      log("MO start");
    }
  
    function stop(){
      bodyMO.disconnect();
      actionMO.disconnect();
      clearInterval(start.timer);
      log("MO stop");
    }
  
    /* ---------- expose ---------- */
    window.KiroAuto = {v:3.1,start,stop,cfg,stats};
    start();
    log(`Injected KiroAuto v${window.KiroAuto.v}`);
  })();
  