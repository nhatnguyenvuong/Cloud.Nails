/* One vertical gesture starts one complete native-sticky stacking transition. */
(() => {
  const main=document.querySelector('#main');
  if(!main)return;
  const scenes=[...main.children].filter(child=>child.tagName==='SECTION');
  if(!scenes.length)return;
  const root=document.documentElement,footer=document.querySelector('.site-footer');
  const reduced=window.matchMedia('(prefers-reduced-motion: reduce)');
  const duration=900,quiet=240;
  const origins=scenes.map(scene=>{
    if(scene.getAttribute('tabindex')===null)scene.setAttribute('tabindex','-1');
    const origin=document.createElement('div');
    origin.className='section-scroll-origin';origin.setAttribute('aria-hidden','true');
    main.insertBefore(origin,scene);return origin;
  });
  let ranges=[],active=0,animation=null,frame=0,measureFrame=0,settleTimer=0;
  let pointerDown=false,touch=null;
  const wheel={last:-Infinity,used:false,total:0,direction:0};
  const clamp=(value,min,max)=>Math.max(min,Math.min(max,value));
  const viewport=()=>window.innerHeight;
  const surface=()=>document.querySelector('dialog[open], #navigation.open');
  const editable=target=>target?.closest?.('input,textarea,select,[contenteditable=""],[contenteditable="true"],[role="slider"]');
  root.classList.add('is-section-navigation');

  function state(){
    const y=window.scrollY;active=0;
    ranges.forEach((range,i)=>{if(y>=range.start-1)active=i;});
    scenes.forEach((scene,i)=>scene.classList.toggle('is-stack-covered',i<Math.min(active,scenes.length-1)));
    document.body.classList.toggle('hero-in-view',active===0);
  }
  function measure(){
    measureFrame=0;
    const previous=ranges;
    const y=window.scrollY,height=viewport();
    const boxes=scenes.map(scene=>scene.getBoundingClientRect());
    const starts=origins.map(origin=>origin.getBoundingClientRect().top+y);
    const maximum=Math.max(0,root.scrollHeight-height);
    ranges=scenes.map((scene,i)=>{
      const value=boxes[i].height.toFixed(3)+'px';
      if(scene.style.getPropertyValue('--stack-height')!==value)scene.style.setProperty('--stack-height',value);
      const start=clamp(starts[i],0,maximum);
      return{start,end:clamp(start+Math.max(0,boxes[i].height-height),start,maximum)};
    });
    if(footer){const start=clamp(footer.getBoundingClientRect().top+y,0,maximum);ranges.push({start,end:maximum});}
    const changed=ranges.some((range,i)=>!previous[i]||Math.abs(range.start-previous[i].start)>.5||Math.abs(range.end-previous[i].end)>.5);
    if(animation&&changed){
      const range=ranges[Math.min(animation.index,ranges.length-1)];
      animation.to=animation.edge==='end'?range.end:animation.edge==='inside'?clamp(animation.to,range.start,range.end):range.start;
      finish();
    }else state();
  }
  function scheduleMeasure(){if(!measureFrame)measureFrame=requestAnimationFrame(measure);}
  function write(y){window.scrollTo({top:y,left:window.scrollX,behavior:'auto'});state();}
  function focusScene(index){
    if(surface())return;
    const target=scenes[index]||footer;
    if(target){if(target.getAttribute('tabindex')===null)target.setAttribute('tabindex','-1');target.focus({preventScroll:true});}
  }
  // Solve x(t), then evaluate y(t) for cubic-bezier(.76,0,.24,1).
  function ease(progress){
    if(progress<=0||progress>=1)return progress;
    let low=0,high=1,t=.5;
    for(let i=0;i<16;i++){
      t=(low+high)/2;
      const x=3*(1-t)*(1-t)*t*.76+3*(1-t)*t*t*.24+t*t*t;
      if(x<progress)low=t;else high=t;
    }
    return 3*(1-t)*t*t+t*t*t;
  }
  function finish(){
    if(!animation)return;
    cancelAnimationFrame(frame);frame=0;
    const {to,index,focus}=animation;animation=null;
    write(to);root.classList.remove('is-section-transitioning');
    if(focus)focusScene(index);
  }
  function tick(now){
    frame=0;if(!animation)return;
    const progress=clamp((now-animation.started)/duration,0,1);
    if(progress===1){finish();return;}
    write(animation.from+(animation.to-animation.from)*ease(progress));
    frame=requestAnimationFrame(tick);
  }
  function go(to,index,edge='start',focus=false){
    window.clearTimeout(settleTimer);
    if(animation||!ranges[index])return;
    const from=window.scrollY;
    if(Math.abs(to-from)<1){write(to);if(focus)focusScene(index);return;}
    if(reduced.matches){write(to);if(focus)focusScene(index);return;}
    animation={from,to,index,edge,focus,started:performance.now()};
    root.classList.add('is-section-transitioning');frame=requestAnimationFrame(tick);
  }
  function step(direction,focus=false){
    if(animation||!ranges.length)return;
    state();const range=ranges[active],y=window.scrollY;
    // Read a tall scene's own overflow before a fresh gesture changes scenes.
    if(direction>0&&y<range.end-2){go(Math.min(range.end,y+viewport()*.85),active,'inside',focus);return;}
    if(direction<0&&y>range.start+2){go(Math.max(range.start,y-viewport()*.85),active,'inside',focus);return;}
    const next=active+direction;if(!ranges[next])return;
    go(direction>0?ranges[next].start:ranges[next].end,next,direction>0?'start':'end',focus);
  }
  function nestedScroll(target,delta,boundary=main){
    for(let node=target?.nodeType===1?target:target?.parentElement;node&&node!==boundary&&node!==document.body;node=node.parentElement){
      const style=getComputedStyle(node);
      if(/auto|scroll/.test(style.overflowY)&&node.scrollHeight>node.clientHeight+1){
        if(delta<0&&node.scrollTop>1||delta>0&&node.scrollTop+node.clientHeight<node.scrollHeight-1)return true;
      }
    }
    return false;
  }
  function onWheel(event){
    if(event.defaultPrevented||event.ctrlKey||event.metaKey||event.shiftKey||Math.abs(event.deltaX)>Math.abs(event.deltaY))return;
    const delta=event.deltaY*(event.deltaMode===1?16:event.deltaMode===2?viewport():1);if(!delta)return;
    const overlay=surface();
    if(overlay){if(!nestedScroll(event.target,delta,overlay.parentElement))event.preventDefault();return;}
    if(editable(event.target)||nestedScroll(event.target,delta))return;
    event.preventDefault();
    const now=performance.now(),direction=Math.sign(delta);
    if(now-wheel.last>quiet){wheel.used=false;wheel.total=0;wheel.direction=direction;}
    wheel.last=now;
    if(animation){wheel.used=true;return;}
    if(wheel.used)return; // Consume the entire momentum tail, even after playback.
    if(direction!==wheel.direction){wheel.total=0;wheel.direction=direction;}
    wheel.total+=Math.abs(delta);if(wheel.total<18)return;
    wheel.used=true;step(direction);
  }
  function onKey(event){
    if(event.defaultPrevented||event.ctrlKey||event.metaKey||event.altKey||editable(event.target)||surface())return;
    const down=['ArrowDown','PageDown'],up=['ArrowUp','PageUp'];
    if(![...down,...up,' ','Home','End'].includes(event.key))return;
    if(event.key===' '&&event.target.closest?.('button,a,[role="button"]'))return;
    event.preventDefault();if(event.repeat||animation)return;
    if(event.key==='Home'){go(ranges[0].start,0,'start',true);return;}
    if(event.key==='End'){const i=ranges.length-1;go(ranges[i].end,i,'end',true);return;}
    step(up.includes(event.key)||event.key===' '&&event.shiftKey?-1:1,true);
  }
  function onTouchStart(event){
    if(event.touches.length!==1){touch=null;return;}
    const point=event.touches[0];
    if(point.clientX<24||point.clientX>window.innerWidth-24||editable(event.target)){touch=null;return;}
    touch={x:point.clientX,y:point.clientY,target:event.target,axis:null,used:!!animation};
  }
  function onTouchMove(event){
    if(!touch||event.touches.length!==1){touch=null;return;}
    const point=event.touches[0],dx=point.clientX-touch.x,dy=point.clientY-touch.y;
    if(!touch.axis){
      if(Math.max(Math.abs(dx),Math.abs(dy))<10)return;
      touch.axis=Math.abs(dx)>Math.abs(dy)?'x':'y';
      if(touch.axis==='y'&&nestedScroll(touch.target,-dy,surface()?.parentElement||main))touch.axis='native';
    }
    if(touch.axis!=='y')return;
    event.preventDefault();
    if(surface()||touch.used||animation||Math.abs(dy)<45)return;
    touch.used=true;step(dy<0?1:-1);
  }
  function settle(){
    if(animation||pointerDown||touch||surface()||!ranges.length)return;
    const y=window.scrollY;
    if(ranges.some(range=>y>=range.start-1&&y<=range.end+1))return;
    const choices=ranges.flatMap((range,i)=>[{y:range.start,i,edge:'start'},{y:range.end,i,edge:'end'}]);
    const nearest=choices.reduce((a,b)=>Math.abs(b.y-y)<Math.abs(a.y-y)?b:a);
    go(nearest.y,nearest.i,nearest.edge);
  }
  function onScroll(){
    state();if(animation)return;
    window.clearTimeout(settleTimer);settleTimer=window.setTimeout(settle,180);
  }
  function hashDestination(hash){
    if(!hash||hash==='#'||hash==='#main')return 0;
    let target;try{target=document.getElementById(decodeURIComponent(hash.slice(1)));}catch{return null;}
    const index=scenes.indexOf(target?.closest('main > section'));
    return index<0?null:index;
  }
  document.addEventListener('click',event=>{
    const link=event.target.closest?.('a[href^="#"]');
    if(!link||event.defaultPrevented||event.button!==0||event.ctrlKey||event.metaKey||event.shiftKey||event.altKey||surface())return;
    const hash=link.getAttribute('href'),index=hashDestination(hash);if(index===null)return;
    event.preventDefault();if(animation)finish();
    if(window.location.hash!==hash)window.history.pushState(null,'',hash);
    go(ranges[index].start,index);
  });
  document.addEventListener('focusin',event=>{
    if(surface()){if(animation)finish();return;}
    const index=scenes.indexOf(event.target.closest?.('main > section'));
    if(index>=0&&index!==active){if(animation)finish();go(ranges[index].start,index);}
  });
  window.addEventListener('hashchange',()=>{
    const index=hashDestination(window.location.hash);
    if(index!==null){if(animation)finish();go(ranges[index].start,index);}
  });
  window.addEventListener('wheel',onWheel,{passive:false});
  document.addEventListener('keydown',onKey);
  document.addEventListener('touchstart',onTouchStart,{passive:true});
  document.addEventListener('touchmove',onTouchMove,{passive:false});
  document.addEventListener('touchend',()=>{touch=null;settle();},{passive:true});
  document.addEventListener('touchcancel',()=>{touch=null;settle();},{passive:true});
  window.addEventListener('pointerdown',()=>{pointerDown=true;},{passive:true});
  window.addEventListener('pointerup',()=>{pointerDown=false;if(!touch)settle();},{passive:true});
  window.addEventListener('pointercancel',()=>{pointerDown=false;},{passive:true});
  window.addEventListener('scroll',onScroll,{passive:true});
  window.addEventListener('resize',scheduleMeasure,{passive:true});
  window.addEventListener('pageshow',scheduleMeasure);
  document.addEventListener('visibilitychange',()=>{if(document.hidden&&animation)finish();});
  const preferenceChanged=()=>{if(reduced.matches&&animation)finish();};
  if(reduced.addEventListener)reduced.addEventListener('change',preferenceChanged);
  else if(reduced.addListener)reduced.addListener(preferenceChanged);
  if('ResizeObserver' in window){const observer=new ResizeObserver(scheduleMeasure);scenes.forEach(scene=>observer.observe(scene));}
  if('IntersectionObserver' in window){const observer=new IntersectionObserver(state);scenes.forEach(scene=>observer.observe(scene));}
  if(document.fonts?.ready)document.fonts.ready.then(scheduleMeasure);
  measure();settleTimer=window.setTimeout(settle,200);
})();
