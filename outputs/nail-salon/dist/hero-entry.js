/* First-load Hero entrance. Existing crossfades, booking and section navigation retain control. */
(() => {
  const root=document.documentElement,hero=document.querySelector('.hero-showcase');
  const clearBoot=()=>{window.clearTimeout(window.__maisonHeroEntryWatchdog);delete window.__maisonHeroEntryWatchdog;};
  if(!hero){clearBoot();root.classList.remove('hero-entry-pending','hero-entry-running');return;}
  const backdrops=hero.querySelector('.hero-backdrops');
  if(!backdrops){clearBoot();root.classList.remove('hero-entry-pending','hero-entry-running');return;}
  const reduced=window.matchMedia('(prefers-reduced-motion: reduce)');
  const fine=window.matchMedia('(hover: hover) and (pointer: fine) and (min-width: 64.0625rem)');
  const armed=root.classList.contains('hero-entry-pending');
  let complete=!armed,started=false,disposed=false,suspended=false,active=false;
  let introTimer=0,graceTimer=0,deadline=0,frame=0,previousTime=0,lastDraw=0;
  let observer=null,intersection=null,resizer=null,bounds=null,particles=[];
  const removers=[],position={x:0,y:0,targetX:0,targetY:0};
  const room=document.createElement('div');room.className='hero-atmosphere';room.setAttribute('aria-hidden','true');
  const canvas=document.createElement('canvas');canvas.className='hero-dust';canvas.setAttribute('aria-hidden','true');
  room.append(canvas);hero.append(room);hero.classList.add('is-hero-enhanced');
  let context=null;
  try{context=canvas.getContext('2d',{alpha:true});}catch{}
  if(!context)canvas.hidden=true;
  const listen=(target,type,fn,options)=>{target.addEventListener(type,fn,options);removers.push(()=>target.removeEventListener(type,fn,options));};
  const clamp=value=>Math.max(-1,Math.min(1,value));
  function eligible(){
    return !disposed&&!suspended&&!document.hidden&&!reduced.matches&&hero.isConnected!==false&&!hero.classList.contains('is-stack-covered')&&!root.classList.contains('is-section-transitioning')&&bounds?.bottom>0&&bounds.top<window.innerHeight&&!document.querySelector('dialog[open], #navigation.open');
  }
  function resetFollow(){
    position.x=position.y=position.targetX=position.targetY=0;
    backdrops.style.setProperty('--hero-cursor-x','0px');backdrops.style.setProperty('--hero-cursor-y','0px');
    backdrops.classList.remove('is-hero-following');
  }
  function draw(time){
    frame=0;if(hero.isConnected===false){destroy();return;}if(!active||disposed)return;
    const delta=previousTime?Math.min(time-previousTime,50):16;previousTime=time;
    const blend=1-Math.exp(-delta/180);let moving=false;
    for(const key of ['x','y']){
      const target=position[key==='x'?'targetX':'targetY'];
      if(Math.abs(target-position[key])>.006){position[key]+=(target-position[key])*blend;moving=true;}else position[key]=target;
    }
    if(complete&&fine.matches){
      backdrops.style.setProperty('--hero-cursor-x',position.x.toFixed(3)+'px');
      backdrops.style.setProperty('--hero-cursor-y',position.y.toFixed(3)+'px');
      backdrops.classList.toggle('is-hero-following',moving);
    }
    if(context&&time-lastDraw>=50){
      lastDraw=time;context.clearRect(0,0,hero.clientWidth,hero.clientHeight);
      const width=hero.clientWidth,height=hero.clientHeight;
      for(const p of particles){
        const x=p.x*width+Math.sin(time/p.period+p.phase)*3;
        const y=((p.y*height-time*p.speed)%(height+30)+height+30)%(height+30)-15;
        context.globalAlpha=p.alpha;context.fillStyle='#c6a16d';context.beginPath();context.arc(x,y,p.radius,0,Math.PI*2);context.fill();
      }
      context.globalAlpha=1;
    }
    if(context||moving)frame=requestAnimationFrame(draw);else previousTime=0;
  }
  function requestPaint(){if(active&&!frame)frame=requestAnimationFrame(draw);}
  function resize(){
    bounds=hero.getBoundingClientRect();const width=hero.clientWidth,height=hero.clientHeight;
    if(context&&width&&height&&!reduced.matches){
      const ratio=Math.min(window.devicePixelRatio||1,1.25,Math.sqrt(1800000/(width*height)));
      canvas.width=Math.max(1,Math.floor(width*ratio));canvas.height=Math.max(1,Math.floor(height*ratio));context.setTransform(ratio,0,0,ratio,0,0);
      const count=width<=1024?5:14;
      particles=Array.from({length:count},(_,i)=>({x:i%5===0?.95+(i%3)*.009:.025+((i*37)%100)/100*.29,y:((i*43+11)%97)/97,radius:.35+(i%4)*.12,alpha:.055+(i%4)*.018,speed:.0018+(i%3)*.0006,period:7000+(i%5)*1700,phase:i*1.7}));
    }
    updateActivity();
  }
  function stopPaint(){cancelAnimationFrame(frame);frame=previousTime=lastDraw=0;resetFollow();}
  function updateActivity(){
    if(disposed)return;
    if(hero.isConnected===false){destroy();return;}
    bounds=hero.getBoundingClientRect();
    const next=eligible();
    if(!complete&&(!next||!root.classList.contains('hero-entry-pending')))finish();
    if(next===active)return;
    active=next;hero.classList.toggle('is-hero-atmosphere-active',active);
    if(active)requestPaint();else stopPaint();
  }
  function finish(){
    if(complete)return;complete=true;
    window.clearTimeout(introTimer);window.clearTimeout(graceTimer);window.clearTimeout(deadline);clearBoot();
    introTimer=graceTimer=deadline=0;
    root.classList.remove('hero-entry-pending','hero-entry-running');
    hero.classList.add('is-hero-entered');resetFollow();
  }
  function begin(){
    if(complete||started||disposed)return;
    if(!eligible()){finish();return;}
    started=true;window.clearTimeout(graceTimer);graceTimer=0;
    root.classList.add('hero-entry-running');
    introTimer=window.setTimeout(finish,2050);
  }
  function destroy(){
    if(disposed)return;finish();disposed=true;active=false;stopPaint();
    observer?.disconnect();intersection?.disconnect();resizer?.disconnect();removers.splice(0).forEach(remove=>remove());
    room.remove();hero.classList.remove('is-hero-enhanced','is-hero-atmosphere-active');
  }
  // Never intercept input: early access simply exposes the original interactive Hero.
  listen(document,'pointerdown',()=>{if(!complete)finish();},{capture:true,passive:true});
  listen(document,'keydown',()=>{if(!complete)finish();},true);
  listen(document,'focusin',()=>{if(!complete)finish();});
  listen(hero,'pointermove',event=>{
    if(!complete||!active||!fine.matches||event.pointerType==='touch')return;
    position.targetX=clamp((event.clientX-bounds.left)/bounds.width*2-1)*1.5;
    position.targetY=clamp((event.clientY-bounds.top)/bounds.height*2-1);requestPaint();
  },{passive:true});
  listen(hero,'pointerleave',()=>{position.targetX=position.targetY=0;requestPaint();},{passive:true});
  listen(document,'visibilitychange',()=>{if(document.hidden&&!complete)finish();updateActivity();});
  listen(window,'resize',()=>{if(!complete)finish();resize();},{passive:true});
  listen(window,'pagehide',event=>{if(event.persisted){suspended=true;finish();updateActivity();}else destroy();});
  listen(window,'pageshow',event=>{suspended=false;if(event.persisted)finish();resize();});
  for(const media of [reduced,fine]){
    const changed=()=>{if(reduced.matches)finish();resetFollow();resize();};
    if(media.addEventListener)listen(media,'change',changed);
    else if(media.addListener){media.addListener(changed);removers.push(()=>media.removeListener(changed));}
  }
  if(armed&&!complete)deadline=window.setTimeout(finish,2400);
  clearBoot();
  if('MutationObserver' in window){
    observer=new MutationObserver(updateActivity);
    observer.observe(root,{attributes:true,attributeFilter:['class']});observer.observe(hero,{attributes:true,attributeFilter:['class']});
    if(hero.parentElement)observer.observe(hero.parentElement,{childList:true});
    if(document.body)observer.observe(document.body,{childList:true});
    const menu=document.querySelector('#navigation');if(menu)observer.observe(menu,{attributes:true,attributeFilter:['class']});
    document.querySelectorAll('dialog').forEach(modal=>observer.observe(modal,{attributes:true,attributeFilter:['open']}));
  }
  if('IntersectionObserver' in window){intersection=new IntersectionObserver(updateActivity,{threshold:0});intersection.observe(hero);}
  if('ResizeObserver' in window){resizer=new ResizeObserver(()=>{const changed=bounds&&(Math.abs(hero.clientWidth-bounds.width)>1||Math.abs(hero.clientHeight-bounds.height)>1);if(changed){if(!complete)finish();resize();}else updateActivity();});resizer.observe(hero);}
  resize();
  if(armed&&!complete&&!reduced.matches){
    graceTimer=window.setTimeout(begin,80);
    const first=hero.querySelector('.hero-bg.is-active');
    if(first?.complete&&first.naturalWidth>0)begin();
    else if(first?.decode){try{first.decode().then(begin,begin);}catch{begin();}}
  }else{
    if(!complete)finish();else hero.classList.add('is-hero-entered');
  }
})();
