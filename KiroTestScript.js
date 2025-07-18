/**
 * 📦 KiroTestScript v1.2.1 – Run / Retry 自動點擊
 * 🗓 2025‑07‑18
 * ✨ 重點：
 *   • Observer 監聽 DOM + 屬性
 *   • 無限輪詢備援（750 ms）
 *   • 冷卻機制防重複
 *   • readyState 判斷，任何時機貼腳本都自動啟動
 */

(function () {
  "use strict";
  if (window.KiroTestScript) return;   // 單例

  /* === 設定 === */
  const DEBUG          = true;   // 改 false 可靜默
  const POLL_INTERVAL  = 750;    // ms
  const CLICK_COOLDOWN = 3000;   // ms

  const CONTAINERS = {
    retry: [
      ".kiro-chat-message-body",
      ".kiro-chat-message",
      ".kiro-chat-message-markdown",
      '[class*="chat-message"]',
      '[class*="message-body"]',
    ],
    run: [
      ".kiro-snackbar",
      ".kiro-snackbar-container",
      ".kiro-snackbar-header",
      ".kiro-snackbar-actions",
      '[class*="snackbar"]',
      '[class*="notification"]',
    ],
  };

  const PATTERNS = {
    retry: {
      sel: [
        'button[data-variant="secondary"]',
        "button.kiro-button",
      ],
      kw: ["retry", "重試"],
      priority: 1,
    },
    run: {
      sel: [
        'button[data-variant="primary"]',
        "button.kiro-button",
      ],
      kw: ["run", "執行"],
      priority: 2,
    },
  };

  const log = (...a) => DEBUG && console.log("[KiroTest]", ...a);
  const saf = (fn, ctx) => { try { return fn(); } catch(e){ console.error(`[KiroTest][${ctx}]`,e);} };

  /* ----- Element 工具 ----- */
  const Finder = {
    query(pat, type) {
      const r=[];
      CONTAINERS[type].forEach(c=>document.querySelectorAll(c).forEach(host=>{
        pat.sel.forEach(s=>r.push(...host.querySelectorAll(s)));
      }));
      return r.length? r : pat.sel.flatMap(s=>[...document.querySelectorAll(s)]);
    },
    ready(el){
      if(!el||!el.isConnected) return false;
      const st = getComputedStyle(el), r=el.getBoundingClientRect();
      return st.display!=="none"&&st.visibility!=="hidden"&&+st.opacity>0.1&&r.width&&r.height&&!el.disabled&&!el.hasAttribute("disabled");
    }
  };

  /* ----- 主控制器 ----- */
  class KiroTest {
    constructor(){
      this.running=false;
      this.cool=new Map();
      this.stats={retry:0,run:0,total:0};

      this.observer=new MutationObserver(()=>saf(()=>this.scan(),"observer"));
    }
    start(){
      if(this.running) return;
      this.running=true;
      this.observer.observe(document.body,{
        childList:true,subtree:true,attributes:true,
        attributeFilter:["class","style","data-active","data-loading","hidden","disabled"]
      });
      this.poll=setInterval(()=>saf(()=>this.scan(),"poll"),POLL_INTERVAL);
      saf(()=>this.scan(),"first-scan");
      log("Start ✅");
    }
    stop(){
      if(!this.running) return;
      this.running=false;
      this.observer.disconnect();
      clearInterval(this.poll);
      log("Stop ⏹️");
    }
    scan(){
      const list=Object.entries(PATTERNS).sort(([,a],[,b])=>a.priority-b.priority);
      for(const [type,pat] of list){
        for(const btn of Finder.query(pat,type)){
          if(!Finder.ready(btn)) continue;
          const t0=this.cool.get(btn)||0;
          if(Date.now()-t0<CLICK_COOLDOWN) continue;
          const txt=btn.textContent.trim().toLowerCase();
          if(!pat.kw.some(k=>txt.includes(k))) continue;

          btn.click();
          this.cool.set(btn,Date.now());
          this.stats[type]++;this.stats.total++;
          log(`🔘 點擊 ${type.toUpperCase()} | "${txt}"`);
          return; // 每輪點一顆
        }
      }
    }
    info(){ return {...this.stats,running:this.running}; }
  }

  /* ----- 全域 API ----- */
  const inst=new KiroTest();
  window.KiroTestScript=inst;
  window.startKiroTest =()=>inst.start();
  window.stopKiroTest  =()=>inst.stop();
  window.kiroTestStats =()=>inst.info();

  /* ----- 自動啟動 (任何時機) ----- */
  if(document.readyState==="complete"||document.readyState==="interactive"){
    inst.start();
  }else{
    window.addEventListener("load",()=>inst.start());
  }
})();
