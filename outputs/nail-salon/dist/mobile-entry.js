/* Missing phone footer entrance and decode fades. Existing Services/Gallery/
 * Reviews controllers still own their state; no scroll or gesture listener. */
(() => {
  const root=document.documentElement,footer=document.querySelector('.site-footer');
  const phone=window.matchMedia('(max-width: 47.5rem)');
  const reduced=window.matchMedia('(prefers-reduced-motion: reduce)');
  let complete=false,playing=false,armed=false,disposed=false,frame=0,timer=0;
  let observer=null,intersection=null;
  const removers=[];
  const listen=(target,type,fn,options)=>{
    target.addEventListener(type,fn,options);
    removers.push(()=>target.removeEventListener(type,fn,options));
  };
  function stopWatch(){
    cancelAnimationFrame(frame);frame=0;window.clearTimeout(timer);timer=0;
    observer?.disconnect();intersection?.disconnect();observer=intersection=null;
  }
  function finish(){
    if(!footer||complete)return;
    complete=true;playing=false;stopWatch();
    footer.classList.remove('is-mobile-footer-ready','is-mobile-footer-playing');
    footer.classList.add('is-mobile-footer-entered');
  }
  function active(){
    if(!phone.matches||document.hidden||!root.classList.contains('is-section-navigation')||root.classList.contains('is-section-transitioning')||document.querySelector('dialog[open], #navigation.open'))return false;
    const box=footer.getBoundingClientRect();
    return box.top<=Math.max(12,window.innerHeight*.06)&&box.bottom>0;
  }
  function check(){
    frame=0;if(complete||disposed||!footer)return;
    if(footer.isConnected===false){finish();return;}
    const entered=active();
    if(playing&&!entered){finish();return;}
    if(!entered||playing)return;
    playing=true;footer.classList.add('is-mobile-footer-playing');
    timer=window.setTimeout(finish,1300);
  }
  function queue(){if(!complete&&!disposed&&!frame)frame=requestAnimationFrame(check);}
  function markPhoto(image){
    if(!phone.matches||image?.tagName!=='IMG'||!image.naturalWidth)return;
    if(image.classList.contains('service-photo')||image.closest?.('#gallery .edit-card'))image.classList.add('is-mobile-photo-loaded');
  }
  function sync(){
    if(disposed)return;
    if(phone.matches){
      document.querySelectorAll('.service-photo, #gallery .edit-card img').forEach(image=>{if(image.complete)markPhoto(image);});
      root.classList.toggle('has-mobile-entry',!reduced.matches);
    }else root.classList.remove('has-mobile-entry');
    if(!phone.matches||reduced.matches){if(armed)finish();return;}
    if(!footer||complete||armed)return;
    if(!('MutationObserver' in window)){finish();return;}
    armed=true;footer.classList.add('is-mobile-footer-ready');
    observer=new MutationObserver(queue);
    observer.observe(root,{attributes:true,attributeFilter:['class']});
    observer.observe(footer,{attributes:true,attributeFilter:['class']});
    if('IntersectionObserver' in window){intersection=new IntersectionObserver(queue,{threshold:[0,.25,.6,1]});intersection.observe(footer);}
    // Loaded after the shared deferred navigator; never hold content if absent.
    frame=requestAnimationFrame(()=>{
      frame=0;if(!root.classList.contains('is-section-navigation'))finish();else check();
    });
  }
  function destroy(){
    if(disposed)return;finish();disposed=true;stopWatch();
    removers.splice(0).forEach(remove=>remove());root.classList.remove('has-mobile-entry');
  }
  listen(document,'load',event=>markPhoto(event.target),true);
  listen(document,'visibilitychange',queue);
  if(footer){
    listen(footer,'focusin',event=>{if(armed&&event.target!==footer)finish();});
    listen(footer,'pointerdown',()=>{if(armed)finish();},{passive:true});
  }
  for(const media of [phone,reduced]){
    if(media.addEventListener)listen(media,'change',sync);
    else if(media.addListener){media.addListener(sync);removers.push(()=>media.removeListener(sync));}
  }
  listen(window,'pagehide',event=>{if(event.persisted){if(armed)finish();}else destroy();});
  listen(window,'pageshow',sync);
  sync();
})();
