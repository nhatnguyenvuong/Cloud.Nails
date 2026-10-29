/* Manual 3D review arc: six authored samples, one decorative edge preview, no autoplay. */
(() => {
  const section=document.querySelector('.testimonials-carousel');
  if(!section)return;
  const stage=section.querySelector('.review-stage');
  const interactionSurface=section.querySelector('.review-window')||stage;
  const cards=[...section.querySelectorAll('[data-review-card]')];
  if(!stage||!cards.length)return;
  const counter=section.querySelector('#review-position');
  const progress=section.querySelector('.review-progress span');
  const announcement=section.querySelector('#review-announcement');
  const reduced=window.matchMedia('(prefers-reduced-motion: reduce)');
  const count=cards.length,wrap=index=>(index%count+count)%count;
  let current=Math.min(2,count-1),navigationVersion=0,gesture=null,suppressClickUntil=0;
  let opened=false,introComplete=false,entryFrame=0,introTimer=0,entryObserver=null;
  let disposed=false,sceneObserver=null,sizeObserver=null;
  const disposers=[],pendingFrames=new Set();
  function queueFrame(callback){
    if(disposed)return 0;
    const id=requestAnimationFrame(now=>{pendingFrames.delete(id);if(!disposed)callback(now);});
    pendingFrames.add(id);return id;
  }
  function cancelFrame(id){cancelAnimationFrame(id);pendingFrames.delete(id);}
  function listen(target,type,handler,options){
    target.addEventListener(type,handler,options);
    disposers.push(()=>target.removeEventListener(type,handler,options));
  }
  const atmosphere=createAtmosphere();
  // The repeated outer image is only a composition preview. Its review remains
  // available through the six original buttons and both keyboard controls.
  const edge=document.createElement('div');
  edge.className='review-card review-edge-copy';edge.setAttribute('aria-hidden','true');
  stage.append(edge);

  function coordinates(card,slot){
    const d=Math.abs(slot),level=Math.min(d,3),sign=Math.sign(slot);
    const values={
      '--review-slot':String(slot),'--review-depth':(d===0?48:d===1?-55:d===2?-145:d===3?-250:-390)+'px',
      '--review-lift':(d===0?0:d===1?12:d===2?27:38)+'px',
      '--review-yaw':(-sign*[0,14,24,32][level])+'deg',
      '--review-scale':String([1,.94,.86,.78][level]),
      '--review-opacity':String(d>3?0:[1,1,.9,.72][level]),
      '--review-brightness':String([1,.82,.68,.54][level]),
      '--review-layer':String(10-level),'--intro-delay':(560+level*70)+'ms','--intro-duration':(460-level*20)+'ms'
    };
    Object.entries(values).forEach(([key,value])=>card.style.setProperty(key,value));
  }
  function updateEdge(){
    const index=wrap(current+Math.floor(count/2));
    edge.innerHTML=cards[index].innerHTML;
    edge.querySelectorAll('[id]').forEach(node=>node.removeAttribute('id'));
    edge.dataset.reviewIndex=String(index);edge.dataset.slot='3';
    const image=edge.querySelector('img');if(image)image.loading='eager';
    coordinates(edge,3);
  }
  function select(index,{animate=true,announce=true}={}){
    current=wrap(index);const version=++navigationVersion;
    cards.forEach((card,i)=>{
      let slot=wrap(i-current);if(slot>=Math.ceil(count/2))slot-=count;
      const previous=Number(card.dataset.slot),isCurrent=i===current;
      card.classList.remove('is-repositioning');
      card.dataset.slot=String(slot);card.dataset.far=String(Math.abs(slot)>1);
      card.classList.toggle('is-active',isCurrent);card.setAttribute('aria-pressed',String(isCurrent));
      card.tabIndex=isCurrent?0:-1;
      const wrapped=animate&&!reduced.matches&&Math.abs(previous-slot)>count/2;
      if(wrapped){
        // Re-enter a wrapped edge card from the opposite outer edge, never
        // sweep it across the focal card on a left/right arrow click.
        card.classList.add('is-repositioning');coordinates(card,slot+Math.sign(slot-previous));
        queueFrame(()=>queueFrame(()=>{
          if(version!==navigationVersion)return;
          card.classList.remove('is-repositioning');coordinates(card,slot);
        }));
      }else{
        if(!animate||reduced.matches)card.classList.add('is-repositioning');
        coordinates(card,slot);
        if(!animate||reduced.matches)queueFrame(()=>{if(version===navigationVersion)card.classList.remove('is-repositioning');});
      }
    });
    updateEdge();
    counter.textContent=String(current+1).padStart(2,'0')+' / '+String(count).padStart(2,'0');
    progress.style.setProperty('transform','scaleX('+((current+1)/count)+')');
    if(announce){
      const name=cards[current].querySelector('.review-customer').textContent;
      const service=cards[current].querySelector('.review-service').textContent;
      announcement.textContent='Lời chia sẻ '+(current+1)+' trên '+count+' — '+name+', '+service;
    }
  }
  function finishIntro(skip=false){
    if(introComplete)return;
    opened=true;introComplete=true;window.clearTimeout(introTimer);
    section.classList.remove('is-intro-playing');section.classList.add('is-entered');
    if(skip){
      section.classList.add('is-intro-skip');
      queueFrame(()=>queueFrame(()=>{if(!disposed)section.classList.remove('is-intro-skip');}));
    }
  }
  function beginIntro(){
    if(opened||disposed)return;
    opened=true;
    cards.forEach(card=>{card.querySelector('img').loading='eager';});
    if(reduced.matches){finishIntro(true);return;}
    section.classList.add('is-intro-playing');
    introTimer=window.setTimeout(()=>finishIntro(),1300);
  }
  function checkEntry(){
    entryFrame=0;if(disposed)return;
    if(section.isConnected===false){destroy();return;}
    const origin=section.previousElementSibling;
    const top=origin?.classList.contains('section-scroll-origin')?origin.getBoundingClientRect().top:section.getBoundingClientRect().top;
    const bounds=section.getBoundingClientRect();
    const active=!document.hidden&&top<=1&&bounds.bottom>0&&!section.classList.contains('is-stack-covered')&&!document.documentElement.classList.contains('is-section-transitioning');
    if(active&&!opened)beginIntro();
    // Leaving never blocks section navigation. Settle an interrupted entrance so
    // the existing once-only architecture returns to a fully usable composition.
    if(opened&&!introComplete&&!active)finishIntro(true);
    section.classList.toggle('is-atmosphere-active',active);
    atmosphere.setActive(active&&opened);
  }
  function scheduleEntry(){if(!disposed&&!entryFrame)entryFrame=queueFrame(checkEntry);}
  function destroy(){
    if(disposed)return;disposed=true;window.clearTimeout(introTimer);
    cancelFrame(entryFrame);entryFrame=0;
    entryObserver?.disconnect();sceneObserver?.disconnect();sizeObserver?.disconnect();
    disposers.splice(0).forEach(dispose=>dispose());atmosphere.destroy();
    [...pendingFrames].forEach(cancelFrame);
  }
  function createAtmosphere(){
    const canvas=document.createElement('canvas');
    canvas.className='review-dust';canvas.setAttribute('aria-hidden','true');
    section.append(canvas);
    const context=canvas.getContext?.('2d',{alpha:true});
    if(!context)return{setActive(){},resize(){},destroy(){canvas.remove?.();}};
    const sprite=document.createElement('canvas');sprite.width=sprite.height=24;
    const paint=sprite.getContext('2d');
    const glow=paint.createRadialGradient(12,12,0,12,12,12);
    glow.addColorStop(0,'rgba(221,194,151,.9)');glow.addColorStop(.25,'rgba(199,163,109,.55)');glow.addColorStop(1,'rgba(179,139,85,0)');
    paint.fillStyle=glow;paint.fillRect(0,0,24,24);
    let width=0,height=0,dpr=1,particles=[],frame=0,last=0,time=0,active=false,small=false,still=null,densityPreference=null;
    const random=(a,b)=>a+Math.random()*(b-a);
    function resize(){
      const box=section.getBoundingClientRect();
      const nextWidth=Math.max(1,Math.round(box.width)),nextHeight=Math.max(1,Math.round(box.height));
      const nextSmall=nextWidth<=760,nextDpr=Math.min(window.devicePixelRatio||1,nextSmall?1.5:2);
      if(width===nextWidth&&height===nextHeight&&dpr===nextDpr&&densityPreference===reduced.matches)return;
      width=nextWidth;height=nextHeight;dpr=nextDpr;small=nextSmall;densityPreference=reduced.matches;
      canvas.width=Math.round(width*dpr);canvas.height=Math.round(height*dpr);
      context.setTransform(dpr,0,0,dpr,0,0);
      const count=reduced.matches?(small?10:18):(small?24:Math.min(68,Math.round(width*height/23000)+22));
      particles=Array.from({length:count},(_,i)=>{
        const x=Math.random(),stream=i%5,depth=Math.random();
        const y=stream===0?.18+x*.3+random(-.08,.08):stream===1?.7-x*.26+random(-.08,.08):Math.random();
        return{x:x*width,y:y*height,r:random(.4,1.2),depth,alpha:random(.16,.38),phase:random(0,Math.PI*2),dx:random(.7,1.8)*(stream===1?-1:1),dy:random(.25,.8)*(stream===1?-.6:1)};
      });
      if(active)draw(0);
    }
    function draw(delta){
      context.clearRect(0,0,width,height);time+=delta;
      for(const p of particles){
        p.x+=p.dx*(.5+p.depth)*delta;p.y+=p.dy*(.5+p.depth)*delta;
        if(p.x>width+5)p.x=-5;if(p.x< -5)p.x=width+5;
        if(p.y>height+5)p.y=-5;if(p.y< -5)p.y=height+5;
        const nx=p.x/width,ny=p.y/height;
        const edge=Math.min(1,nx*7,(1-nx)*7,ny*9,(1-ny)*9);
        const light=Math.max(.08,1-Math.hypot((nx-.5)*1.3,(ny-.55)*.95));
        context.globalAlpha=Math.max(0,edge)*light*p.alpha*(.76+.24*Math.sin(time*.19+p.phase));
        const radius=p.r*(.7+p.depth*.8),size=radius*5;
        context.drawImage(sprite,p.x-size/2,p.y-size/2,size,size);
      }
      context.globalAlpha=1;
    }
    function tick(stamp){
      frame=0;if(!active||reduced.matches)return;
      if(!last||stamp-last>=1000/(small?24:30)){
        const delta=last?Math.min((stamp-last)/1000,.07):0;last=stamp;draw(delta);
      }
      frame=queueFrame(tick);
    }
    function setActive(value){
      const preference=reduced.matches;
      if(active===value&&still===preference)return;
      active=value;still=preference;cancelFrame(frame);frame=0;last=0;
      if(!active)return;
      resize();draw(0);
      if(!preference)frame=queueFrame(tick);
    }
    return{setActive,resize,destroy(){active=false;cancelFrame(frame);frame=0;canvas.remove();particles=[];}};
  }
  function interact(index,focus=false){
    if(!introComplete)finishIntro(true);
    select(index);if(focus)cards[current].focus({preventScroll:true});
  }
  // Some engines hit-test negative-Z cards against the flat stage plane.
  // Resolve the painted card at the click point on the containing surface.
  function length(value,total,fallback=0){
    const number=parseFloat(value);
    return Number.isFinite(number)?number*(String(value).includes('%')?total/100:1):fallback;
  }
  function cardPolygon(card,style,stageStyle,bounds){
    const Matrix=window.DOMMatrix||window.WebKitCSSMatrix;
    if(Matrix){
      try{
        const width=length(style.width,bounds.width,card.offsetWidth);
        const height=length(style.height,bounds.height,card.offsetHeight);
        const origin=style.transformOrigin.split(/\s+/);
        const ox=length(origin[0],width,width/2),oy=length(origin[1],height,height/2),oz=length(origin[2],1);
        const left=length(style.left,bounds.width,card.offsetLeft),top=length(style.top,bounds.height,card.offsetTop);
        const perspective=parseFloat(stageStyle.perspective);
        const po=stageStyle.perspectiveOrigin.split(/\s+/);
        const px=length(po[0],bounds.width,bounds.width/2),py=length(po[1],bounds.height,bounds.height/2);
        const matrix=style.transform==='none'?new Matrix():new Matrix(style.transform);
        return [[0,0],[width,0],[width,height],[0,height]].map(([x,y])=>{
          x-=ox;y-=oy;const z=-oz;
          const w=matrix.m14*x+matrix.m24*y+matrix.m34*z+matrix.m44;
          const tx=(matrix.m11*x+matrix.m21*y+matrix.m31*z+matrix.m41)/w+ox+left;
          const ty=(matrix.m12*x+matrix.m22*y+matrix.m32*z+matrix.m42)/w+oy+top;
          const tz=(matrix.m13*x+matrix.m23*y+matrix.m33*z+matrix.m43)/w+oz;
          const scale=Number.isFinite(perspective)&&perspective>0?perspective/(perspective-tz):1;
          return{x:bounds.left+px+(tx-px)*scale,y:bounds.top+py+(ty-py)*scale};
        });
      }catch{/* Older engines can fall back to their transformed client bounds. */}
    }
    const rect=card.getBoundingClientRect();
    return[{x:rect.left,y:rect.top},{x:rect.right,y:rect.top},{x:rect.right,y:rect.bottom},{x:rect.left,y:rect.bottom}];
  }
  function containsPoint(points,x,y){
    let inside=false;
    for(let i=0,j=points.length-1;i<points.length;j=i++){
      const a=points[i],b=points[j];
      if((a.y>y)!==(b.y>y)&&x<(b.x-a.x)*(y-a.y)/(b.y-a.y)+a.x)inside=!inside;
    }
    return inside;
  }
  listen(interactionSurface,'click',event=>{
    // Keyboard/assistive activation keeps the native button click path below.
    if(event.defaultPrevented||event.detail===0||event.button!==0)return;
    if(performance.now()<suppressClickUntil){event.preventDefault();event.stopPropagation();return;}
    const bounds=stage.getBoundingClientRect(),stageStyle=getComputedStyle(stage);
    const candidates=[...cards,edge].map((card,order)=>({card,order,style:getComputedStyle(card)}))
      .filter(({style})=>style.display!=='none'&&style.visibility!=='hidden'&&style.pointerEvents!=='none'&&Number(style.opacity)>.01)
      .sort((a,b)=>(parseFloat(b.style.zIndex)||0)-(parseFloat(a.style.zIndex)||0)||b.order-a.order);
    const hit=candidates.find(({card,style})=>containsPoint(cardPolygon(card,style,stageStyle,bounds),event.clientX,event.clientY));
    if(!hit)return;
    event.preventDefault();event.stopPropagation();
    const index=hit.card===edge?Number(edge.dataset.reviewIndex):cards.indexOf(hit.card);
    interact(index,true);
  },{capture:true});
  cards.forEach((card,index)=>listen(card,'click',event=>{
    if(performance.now()<suppressClickUntil){event.preventDefault();return;}
    interact(index);
  }));
  listen(edge,'click',()=>interact(Number(edge.dataset.reviewIndex),true));
  section.querySelectorAll('[data-review-step]').forEach(button=>listen(button,'click',()=>interact(current+Number(button.dataset.reviewStep))));
  listen(stage,'keydown',event=>{
    if(event.defaultPrevented||event.ctrlKey||event.metaKey||event.altKey||!['ArrowLeft','ArrowRight','Home','End'].includes(event.key))return;
    event.preventDefault();
    const next=event.key==='Home'?0:event.key==='End'?count-1:current+(event.key==='ArrowRight'?1:-1);
    interact(next,true);
  });
  listen(section,'focusin',event=>{if(event.target!==section&&!introComplete)finishIntro(true);});
  listen(interactionSurface,'pointerdown',event=>{
    if(event.pointerType==='mouse'||!event.isPrimary){gesture=null;return;}
    gesture={id:event.pointerId,x:event.clientX,y:event.clientY};
  },{passive:true});
  listen(interactionSurface,'pointerup',event=>{
    if(!gesture||event.pointerId!==gesture.id)return;
    const dx=event.clientX-gesture.x,dy=event.clientY-gesture.y;gesture=null;
    if(Math.abs(dx)>=45&&Math.abs(dx)>Math.abs(dy)*1.4){interact(current+(dx<0?1:-1));suppressClickUntil=performance.now()+400;}
  },{passive:true});
  listen(interactionSurface,'pointercancel',()=>{gesture=null;},{passive:true});
  listen(interactionSurface,'dragstart',event=>{if(event.target.tagName==='IMG')event.preventDefault();});
  listen(document,'visibilitychange',scheduleEntry);
  const preferenceChanged=()=>{
    if(reduced.matches){finishIntro(true);select(current,{animate:false,announce:false});}
    scheduleEntry();
  };
  if(reduced.addEventListener)listen(reduced,'change',preferenceChanged);
  else if(reduced.addListener){reduced.addListener(preferenceChanged);disposers.push(()=>reduced.removeListener(preferenceChanged));}
  select(current,{animate:false,announce:false});
  if(reduced.matches)finishIntro(true);
  section.classList.add('is-intro-ready');
  listen(window,'scroll',scheduleEntry,{passive:true});
  listen(window,'resize',()=>{atmosphere.resize();scheduleEntry();},{passive:true});
  listen(window,'pagehide',event=>{if(event.persisted){atmosphere.setActive(false);if(opened&&!introComplete)finishIntro(true);}else destroy();});
  listen(window,'pageshow',scheduleEntry);
  if('MutationObserver' in window){
    sceneObserver=new MutationObserver(scheduleEntry);
    sceneObserver.observe(document.documentElement,{attributes:true,attributeFilter:['class']});
    sceneObserver.observe(section,{attributes:true,attributeFilter:['class']});
    if(section.parentElement)sceneObserver.observe(section.parentElement,{childList:true});
    if(document.body)sceneObserver.observe(document.body,{childList:true});
  }
  if('ResizeObserver' in window){sizeObserver=new ResizeObserver(()=>{atmosphere.resize();scheduleEntry();});sizeObserver.observe(section);}
  if('IntersectionObserver' in window){entryObserver=new IntersectionObserver(scheduleEntry,{threshold:[0,.6,1]});entryObserver.observe(section);}
  scheduleEntry();
})();
