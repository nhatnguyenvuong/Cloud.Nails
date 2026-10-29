/* One center-out Treatments entrance; the shared navigator retains all input. */
(() => {
  const section=document.querySelector('.services-showcase');
  if(!section)return;
  const panels=[...section.querySelectorAll('.service-panel')];
  const images=[...section.querySelectorAll('.service-photo')];
  const root=document.documentElement,main=section.parentElement;
  const reduced=window.matchMedia('(prefers-reduced-motion: reduce)');
  let complete=false,requested=false,playing=false,disposed=false;
  let frame=0,timer=0,grace=0,observer=null,assetsReady=false,assetsSettled=false;
  const removers=[],assetCleanup=new Set();
  function listen(target,type,handler,options){
    target.addEventListener(type,handler,options);
    removers.push(()=>target.removeEventListener(type,handler,options));
  }
  function clear(){
    cancelAnimationFrame(frame);frame=0;
    window.clearTimeout(timer);window.clearTimeout(grace);timer=grace=0;
    observer?.disconnect();removers.splice(0).forEach(remove=>remove());
    [...assetCleanup].forEach(cancel=>cancel());assetCleanup.clear();
  }
  function finish(){
    if(complete)return;complete=true;playing=false;clear();
    section.classList.remove('is-service-opening');section.classList.add('is-service-entered');
  }
  function destroy(){if(disposed)return;disposed=true;finish();clear();}
  function active(){
    if(!root.classList.contains('is-section-navigation')||root.classList.contains('is-section-transitioning')||document.hidden)return false;
    const scenes=[...main.children].filter(node=>node.tagName==='SECTION');
    const previous=scenes[scenes.indexOf(section)-1];
    return !!previous&&previous.classList.contains('is-stack-covered')&&!section.classList.contains('is-stack-covered');
  }
  function begin(){
    if(complete||playing||disposed||!active())return;
    window.clearTimeout(grace);grace=0;
    if(reduced.matches||!assetsReady){finish();return;}
    playing=true;section.classList.add('is-service-opening');
    timer=window.setTimeout(finish,1600);
  }
  function check(){
    frame=0;if(complete||disposed)return;
    if(section.isConnected===false){destroy();return;}
    if(!active()){if(requested)finish();return;}
    if(requested)return;requested=true;
    if(reduced.matches)finish();
    else if(assetsReady)begin();
    else if(assetsSettled)finish();
    else grace=window.setTimeout(()=>{if(active()&&assetsReady)begin();else finish();},100);
  }
  function queue(){if(!complete&&!disposed&&!frame)frame=requestAnimationFrame(check);}
  function warm(image){
    image.loading='eager';
    if(image.decode)return image.decode().then(()=>true,()=>image.naturalWidth>0);
    if(image.complete)return Promise.resolve(image.naturalWidth>0);
    return new Promise(resolve=>{
      let done=false,deadline=0;
      const end=success=>{
        if(done)return;done=true;window.clearTimeout(deadline);
        image.removeEventListener('load',loaded);image.removeEventListener('error',failed);
        assetCleanup.delete(cancel);resolve(success);
      };
      const loaded=()=>end(true),failed=()=>end(false),cancel=()=>end(false);
      assetCleanup.add(cancel);image.addEventListener('load',loaded,{once:true});image.addEventListener('error',failed,{once:true});
      deadline=window.setTimeout(failed,6000);
    });
  }
  // Without enhancement support, keep the original fully visible section.
  if(!panels.length||!root||!main||reduced.matches||!('MutationObserver' in window)){finish();return;}
  const scenes=[...main.children].filter(node=>node.tagName==='SECTION');
  const previous=scenes[scenes.indexOf(section)-1];
  if(!previous){finish();return;}
  const center=Math.floor(panels.length/2);
  panels.forEach((panel,i)=>{
    const group=Math.abs(i-center);
    panel.style.setProperty('--service-reveal-delay',(group*70)+'ms');
    panel.style.setProperty('--service-text-delay',(120+group*70)+'ms');
    panel.style.setProperty('--service-button-delay',(400+group*70)+'ms');
  });
  section.classList.add('is-service-intro-ready');
  Promise.all(images.map(warm)).then(results=>{
    if(complete||disposed)return;
    assetsSettled=true;assetsReady=results.every(Boolean);
    if(requested&&active()){if(assetsReady)begin();else finish();}
  });
  // Consume only the existing navigator's covered/transition classes. No new
  // scroll listener, IntersectionObserver or gesture ownership is introduced.
  observer=new MutationObserver(queue);
  observer.observe(root,{attributes:true,attributeFilter:['class']});
  observer.observe(previous,{attributes:true,attributeFilter:['class']});
  observer.observe(section,{attributes:true,attributeFilter:['class']});
  observer.observe(main,{childList:true});
  if(document.body)observer.observe(document.body,{childList:true});
  listen(section,'focusin',event=>{if(event.target!==section)finish();});
  listen(section,'pointerdown',finish,{passive:true});
  listen(document,'visibilitychange',queue);
  listen(window,'pagehide',event=>{if(event.persisted)finish();else destroy();});
  const preferenceChanged=()=>{if(reduced.matches)finish();};
  if(reduced.addEventListener)listen(reduced,'change',preferenceChanged);
  else if(reduced.addListener){reduced.addListener(preferenceChanged);removers.push(()=>reduced.removeListener(preferenceChanged));}
  frame=requestAnimationFrame(()=>{
    frame=requestAnimationFrame(()=>{
      frame=0;if(!root.classList.contains('is-section-navigation'))finish();else check();
    });
  });
})();
