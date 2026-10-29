/* Service-filtered masonry, restrained column parallax and the existing native viewer. */
(() => {
  const gallery=document.querySelector('.gallery-immersive');
  if(!gallery)return;
  const stage=gallery.querySelector('.edit-stage'),panel=gallery.querySelector('#edit-panel');
  const allCards=[...gallery.querySelectorAll('[data-edit-card]')].sort((a,b)=>Number(a.dataset.slot)-Number(b.dataset.slot));
  const columns=[...gallery.querySelectorAll('[data-edit-column]')];
  const tabs=[...gallery.querySelectorAll('[data-edit-category]')];
  const status=gallery.querySelector('#edit-status'),filterStatus=gallery.querySelector('#edit-filter-status');
  const viewer=gallery.querySelector('#edit-viewer'),viewerImage=gallery.querySelector('#edit-viewer-image');
  const viewerTitle=gallery.querySelector('#edit-viewer-title'),viewerCredit=gallery.querySelector('#edit-viewer-credit');
  const original=gallery.querySelector('#edit-original'),close=gallery.querySelector('.edit-viewer-close');
  let catalog;
  try{catalog=JSON.parse(gallery.querySelector('#edit-catalog').textContent);}catch{return;}
  if(!stage||!panel||!allCards.length||!catalog.length)return;
  const hover=window.matchMedia('(hover: hover) and (pointer: fine) and (min-width: 761px)');
  const reduced=window.matchMedia('(prefers-reduced-motion: reduce)');
  let category=catalog[0],cards=[],current=0,revision=0,busy=false;
  let returnFocus=null,gesture=null,suppressClickUntil=0,frame=0,lastTime=0;
  const pointer={x:0,y:0},imageCache=new Map();
  const motion=columns.map((column,i)=>({column,depth:[.7,1,.55][i],x:0,y:0}));
  const wrap=index=>(index%cards.length+cards.length)%cards.length;
  let openingComplete=false,openingRequested=false,openingPlaying=false,openingDisposed=false;
  let openingFrame=0,openingTimer=0,openingGrace=0,openingObserver=null;
  let openingAssetsSettled=false,openingAssetsReady=false;
  const openingCleanup=[];

  function paint(time){
    frame=0;
    const blend=1-Math.exp(-Math.min(lastTime?time-lastTime:16,48)/140);lastTime=time;
    let settling=false;
    motion.forEach(state=>{
      const target={x:pointer.x*7*state.depth,y:pointer.y*11*state.depth};
      for(const key of ['x','y']){
        const delta=target[key]-state[key];
        if(Math.abs(delta)>.015){state[key]+=delta*blend;settling=true;}else state[key]=target[key];
      }
      state.column.style.setProperty('--follow-x',state.x.toFixed(3)+'px');
      state.column.style.setProperty('--follow-y',state.y.toFixed(3)+'px');
    });
    if(settling)frame=requestAnimationFrame(paint);
    else{lastTime=0;stage.classList.remove('is-following');}
  }
  function follow(){if(openingComplete&&!frame&&!reduced.matches&&hover.matches){stage.classList.add('is-following');frame=requestAnimationFrame(paint);}}
  function resetMotion(immediate=false){
    pointer.x=pointer.y=0;
    if(immediate){
      cancelAnimationFrame(frame);frame=lastTime=0;stage.classList.remove('is-following');
      motion.forEach(state=>{state.x=state.y=0;state.column.style.setProperty('--follow-x','0px');state.column.style.setProperty('--follow-y','0px');});
    }else follow();
  }
  const clamp=value=>Math.max(-1,Math.min(1,value));
  stage.addEventListener('pointermove',event=>{
    if(!openingComplete||!hover.matches||reduced.matches||event.pointerType==='touch'||viewer.open||busy)return;
    const bounds=stage.getBoundingClientRect();if(!bounds.width||!bounds.height)return;
    pointer.x=clamp((event.clientX-bounds.left)/bounds.width*2-1);
    pointer.y=clamp((event.clientY-bounds.top)/bounds.height*2-1);follow();
  },{passive:true});
  stage.addEventListener('pointerleave',()=>resetMotion());
  document.addEventListener('visibilitychange',()=>{if(document.hidden)resetMotion(true);});
  [hover,reduced].forEach(query=>{
    const changed=()=>{if(!hover.matches||reduced.matches)resetMotion(true);if(reduced.matches)finishOpening();};
    if(query.addEventListener)query.addEventListener('change',changed);else if(query.addListener)query.addListener(changed);
  });
  if('IntersectionObserver' in window)new IntersectionObserver(entries=>{if(!entries[0].isIntersecting)resetMotion(true);}).observe(gallery);

  function syncTabs(id){
    tabs.forEach(tab=>{const selected=tab.dataset.editCategory===id;tab.setAttribute('aria-selected',String(selected));tab.tabIndex=selected?0:-1;});
    panel.setAttribute('aria-labelledby','edit-tab-'+id);
    stage.setAttribute('aria-label',(catalog.find(item=>item.id===id)?.description||'Dịch vụ')+' — bộ ảnh minh họa');
  }
  function select(index){
    current=wrap(index);
    allCards.forEach(card=>{
      const selected=card===cards[current];card.classList.toggle('is-current',selected);card.tabIndex=selected?0:-1;
      if(selected)card.setAttribute('aria-current','true');else card.removeAttribute('aria-current');
    });
    status.textContent=category.label+' — '+cards[current].dataset.title;
  }
  function loadImage(src){
    if(imageCache.has(src))return imageCache.get(src);
    const promise=new Promise(resolve=>{
      const image=new Image();let finished=false;
      const timer=window.setTimeout(()=>done(false),7000);
      function done(success){if(finished)return;finished=true;window.clearTimeout(timer);image.onload=image.onerror=null;resolve(success);}
      image.onload=()=>{if(image.decode)image.decode().then(()=>done(true),()=>done(image.naturalWidth>0));else done(true);};
      image.onerror=()=>done(false);image.src=src;
      if(image.complete&&image.naturalWidth>0)image.onload();
    }).then(success=>{if(!success)imageCache.delete(src);return success;});
    imageCache.set(src,promise);return promise;
  }
  function commit(next){
    allCards.forEach((card,i)=>{
      const item=next.images[i],missing=!item||item.placeholder||!item.src;
      card.hidden=false;card.dataset.placeholder=String(missing);card.classList.toggle('is-placeholder',missing);
      const image=card.querySelector('img');image.hidden=missing;
      if(missing){
        card.removeAttribute('href');card.removeAttribute('aria-haspopup');card.removeAttribute('aria-controls');
        card.setAttribute('role','img');card.setAttribute('aria-disabled','true');
        card.setAttribute('aria-label',item?.alt||'Vị trí ảnh sẽ cập nhật');
        image.removeAttribute('src');image.alt='';return;
      }
      card.removeAttribute('role');card.removeAttribute('aria-disabled');
      card.setAttribute('aria-haspopup','dialog');card.setAttribute('aria-controls','edit-viewer');
      card.href=item.src;card.dataset.title=item.title;card.dataset.credit=item.credit;
      card.setAttribute('aria-label','Mở ảnh lớn: '+item.title);
      image.alt=item.alt;image.width=item.width;image.height=item.height;image.src=item.src;
      image.style.setProperty('--image-position',item.position);
      image.style.setProperty('--image-zoom',String(item.zoom));image.style.setProperty('--image-origin',item.origin);
    });
    category=next;cards=allCards.filter(card=>card.dataset.placeholder!=='true');
    stage.dataset.count=String(allCards.length);syncTabs(category.id);select(0);
  }
  async function switchCategory(id){
    const next=catalog.find(item=>item.id===id);if(!next||next===category&&!busy)return;
    finishOpening();
    const token=++revision;busy=true;resetMotion();
    panel.setAttribute('aria-busy','true');stage.classList.add('is-switching');stage.inert=true;
    syncTabs(id);filterStatus.textContent='Đang mở bộ ảnh '+next.label+'…';
    const results=await Promise.all([
      Promise.all([...new Set(next.images.filter(item=>item.src&&!item.placeholder).map(item=>item.src))].map(loadImage)),
      new Promise(resolve=>window.setTimeout(resolve,reduced.matches?0:140))
    ]);
    if(token!==revision)return;
    if(results[0].every(Boolean)){commit(next);filterStatus.textContent='';}
    else{syncTabs(category.id);filterStatus.textContent='Không thể tải bộ ảnh '+next.label+'. Bộ ảnh trước vẫn được giữ lại; bạn có thể thử lại.';}
    busy=false;stage.inert=false;stage.classList.remove('is-switching');panel.setAttribute('aria-busy','false');
  }
  tabs.forEach((tab,index)=>{
    tab.addEventListener('click',()=>switchCategory(tab.dataset.editCategory));
    tab.addEventListener('keydown',event=>{
      if(event.ctrlKey||event.metaKey||event.altKey||!['ArrowUp','ArrowDown','ArrowLeft','ArrowRight','Home','End'].includes(event.key))return;
      event.preventDefault();
      const next=event.key==='Home'?0:event.key==='End'?tabs.length-1:(index+(['ArrowDown','ArrowRight'].includes(event.key)?1:-1)+tabs.length)%tabs.length;
      tabs[next].focus({preventScroll:true});switchCategory(tabs[next].dataset.editCategory);
    });
  });

  function renderViewer(){
    const card=cards[current],image=card.querySelector('img');
    viewerImage.alt=image.alt;viewerImage.width=image.width;viewerImage.height=image.height;viewerImage.src=card.href;
    viewerTitle.textContent=card.dataset.title;
    viewerCredit.textContent=category.label;
    original.href=card.href;
  }
  allCards.forEach(card=>{
    card.addEventListener('click',event=>{
      if(event.ctrlKey||event.metaKey||event.shiftKey||event.altKey)return;
      if(busy||performance.now()<suppressClickUntil){event.preventDefault();return;}
      if(card.dataset.placeholder==='true'){event.preventDefault();return;}
      if(card.hidden||typeof viewer.showModal!=='function')return;
      event.preventDefault();returnFocus=card;select(cards.indexOf(card));resetMotion(true);renderViewer();
      if(!viewer.open)viewer.showModal();
    });
    card.addEventListener('focus',()=>{if(cards.includes(card))select(cards.indexOf(card));});
    card.addEventListener('keydown',event=>{
      if(!cards.includes(card)||event.ctrlKey||event.metaKey||event.altKey||busy||!['ArrowLeft','ArrowRight','Home','End'].includes(event.key))return;
      event.preventDefault();
      const next=event.key==='Home'?0:event.key==='End'?cards.length-1:wrap(current+(event.key==='ArrowRight'?1:-1));
      select(next);cards[next].focus({preventScroll:true});
    });
  });
  gallery.querySelectorAll('[data-edit-viewer-step]').forEach(button=>button.addEventListener('click',()=>{select(current+Number(button.dataset.editViewerStep));renderViewer();}));
  close.addEventListener('click',()=>viewer.close());
  viewer.addEventListener('close',()=>{
    if(returnFocus?.isConnected&&!returnFocus.hidden&&returnFocus.dataset.placeholder!=='true')returnFocus.focus({preventScroll:true});
    else tabs.find(tab=>tab.dataset.editCategory===category.id)?.focus({preventScroll:true});
  });
  viewer.addEventListener('keydown',event=>{
    if(event.ctrlKey||event.metaKey||event.altKey)return;
    if(event.key==='ArrowLeft'||event.key==='ArrowRight'){event.preventDefault();select(current+(event.key==='ArrowRight'?1:-1));renderViewer();}
  });
  viewer.addEventListener('click',event=>{
    if(event.target!==viewer)return;const rect=viewer.getBoundingClientRect();
    if(event.clientX<rect.left||event.clientX>rect.right||event.clientY<rect.top||event.clientY>rect.bottom)viewer.close();
  });
  viewerImage.addEventListener('error',()=>{viewerCredit.textContent='Không thể tải ảnh. Bạn có thể mở ảnh gốc bằng liên kết bên dưới.';});
  // Keep horizontal selection separate from the shared vertical section navigator.
  stage.addEventListener('pointerdown',event=>{
    if(event.pointerType==='mouse'||!event.isPrimary||busy){gesture=null;return;}
    gesture={id:event.pointerId,x:event.clientX,y:event.clientY};
  },{passive:true});
  stage.addEventListener('pointerup',event=>{
    if(!gesture||event.pointerId!==gesture.id)return;
    const dx=event.clientX-gesture.x,dy=event.clientY-gesture.y;gesture=null;
    if(Math.abs(dx)>=45&&Math.abs(dx)>Math.abs(dy)*1.4){select(current+(dx<0?1:-1));suppressClickUntil=performance.now()+400;}
  },{passive:true});
  stage.addEventListener('pointercancel',()=>{gesture=null;},{passive:true});
  stage.addEventListener('dragstart',event=>{if(event.target.closest('[data-edit-card]'))event.preventDefault();});
  commit(category);
  setupOpening();

  function openingOn(target,type,handler,options){
    target.addEventListener(type,handler,options);
    openingCleanup.push(()=>target.removeEventListener(type,handler,options));
  }
  function clearOpeningWatch(){
    cancelAnimationFrame(openingFrame);openingFrame=0;
    window.clearTimeout(openingTimer);window.clearTimeout(openingGrace);
    openingTimer=openingGrace=0;openingObserver?.disconnect();
    openingCleanup.splice(0).forEach(remove=>remove());
  }
  function finishOpening(){
    if(openingComplete)return;
    openingComplete=true;openingPlaying=false;clearOpeningWatch();resetMotion(true);
    gallery.classList.remove('is-edit-opening');gallery.classList.add('is-edit-entered');
  }
  function destroyOpening(){
    if(openingDisposed)return;openingDisposed=true;finishOpening();clearOpeningWatch();
  }
  function navigationOwnsGallery(){
    const root=document.documentElement;
    if(!root||!root.classList.contains('is-section-navigation')||root.classList.contains('is-section-transitioning')||document.hidden)return false;
    const scenes=[...gallery.parentElement.children].filter(node=>node.tagName==='SECTION');
    const index=scenes.indexOf(gallery),previous=scenes[index-1];
    // The shared navigator marks every earlier scene as covered. Reading those
    // classes identifies the active scene without another scroll/IO controller.
    return !!previous&&previous.classList.contains('is-stack-covered')&&!gallery.classList.contains('is-stack-covered');
  }
  function beginOpening(){
    if(openingComplete||openingPlaying||openingDisposed||!navigationOwnsGallery())return;
    window.clearTimeout(openingGrace);openingGrace=0;
    if(reduced.matches||!openingAssetsReady){finishOpening();return;}
    openingPlaying=true;resetMotion(true);gallery.classList.add('is-edit-opening');
    openingTimer=window.setTimeout(finishOpening,1700);
  }
  function checkOpening(){
    openingFrame=0;if(openingComplete||openingDisposed)return;
    if(gallery.isConnected===false){destroyOpening();return;}
    if(!navigationOwnsGallery()){
      if(openingRequested)finishOpening();
      return;
    }
    if(openingRequested)return;
    openingRequested=true;resetMotion(true);
    if(reduced.matches){finishOpening();return;}
    if(openingAssetsReady)beginOpening();
    else if(openingAssetsSettled)finishOpening();
    else openingGrace=window.setTimeout(()=>{
      if(navigationOwnsGallery()&&openingAssetsReady)beginOpening();else finishOpening();
    },100);
  }
  function queueOpening(){if(!openingComplete&&!openingDisposed&&!openingFrame)openingFrame=requestAnimationFrame(checkOpening);}
  function setupOpening(){
    // Progressive enhancement: without the shared navigation/observer surface,
    // the original usable Gallery is shown rather than waiting invisibly.
    if(reduced.matches||!document.documentElement||!gallery.parentElement||!('MutationObserver' in window)){finishOpening();return;}
    const scenes=[...gallery.parentElement.children].filter(node=>node.tagName==='SECTION');
    const previous=scenes[scenes.indexOf(gallery)-1];
    if(!previous){finishOpening();return;}
    columns.forEach((column,i)=>{
      const lead=[500,400,580][i]||500;
      [...column.querySelectorAll('[data-edit-card]')].forEach((card,row)=>card.style.setProperty('--edit-enter-delay',(lead+row*55)+'ms'));
    });
    tabs.forEach((tab,i)=>tab.style.setProperty('--edit-tab-delay',(900+i*75)+'ms'));
    gallery.classList.add('is-edit-intro-ready');resetMotion(true);
    const initialCards=cards.slice();
    Promise.all([...new Set(category.images.filter(item=>item.src&&!item.placeholder).map(item=>item.src))].map(loadImage))
      .then(async results=>{
        if(openingComplete||openingDisposed)return;
        const decoded=await Promise.all(initialCards.map(card=>{
          const image=card.querySelector('img');image.loading='eager';
          return image.decode?image.decode().then(()=>true,()=>image.naturalWidth>0):Promise.resolve(true);
        }));
        if(openingComplete||openingDisposed)return;
        openingAssetsSettled=true;openingAssetsReady=results.every(Boolean)&&decoded.every(Boolean);
        if(openingRequested&&navigationOwnsGallery()){
          if(openingAssetsReady)beginOpening();else finishOpening();
        }
      });
    openingObserver=new MutationObserver(queueOpening);
    openingObserver.observe(document.documentElement,{attributes:true,attributeFilter:['class']});
    openingObserver.observe(previous,{attributes:true,attributeFilter:['class']});
    openingObserver.observe(gallery,{attributes:true,attributeFilter:['class']});
    openingObserver.observe(gallery.parentElement,{childList:true});
    if(document.body)openingObserver.observe(document.body,{childList:true});
    openingOn(gallery,'focusin',event=>{if(event.target!==gallery)finishOpening();});
    openingOn(gallery,'pointerdown',finishOpening,{passive:true});
    openingOn(document,'visibilitychange',queueOpening);
    openingOn(window,'pagehide',event=>{if(event.persisted)finishOpening();else destroyOpening();});
    // The following deferred script installs the shared section navigator.
    openingFrame=requestAnimationFrame(()=>{
      openingFrame=requestAnimationFrame(()=>{
        openingFrame=0;
        if(!document.documentElement.classList.contains('is-section-navigation'))finishOpening();else checkOpening();
      });
    });
  }
})();
