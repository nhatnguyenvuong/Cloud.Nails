/* Independent hand layers: align, enter once, pause off-screen, then breathe softly. */
(() => {
  const scene=document.querySelector('.hands-scene');
  if(!scene)return;
  const layers=[...scene.querySelectorAll('.hand-motion')];
  const assets=[...scene.querySelectorAll('.creation-background img, .creation-asset')];
  const footer=scene.querySelector('.hands-footer');
  const reduced=window.matchMedia('(prefers-reduced-motion: reduce)');
  let visible=false,started=false,complete=false,loading=false,ready=false;
  let frame=0,loadTimeout=0;

  function align(){
    frame=0;
    const width=scene.clientWidth,height=scene.clientHeight;
    if(!width||!height)return;
    const contact={x:width*.5,y:height*.49};
    const geometry=layers.map(layer=>{
      const img=layer.querySelector('img');
      const w=img.naturalWidth||Number(img.getAttribute('width'));
      const h=img.naturalHeight||Number(img.getAttribute('height'));
      // Provided cutouts contain the complete hand. Contain avoids clipping a nail
      // before the uniform display scale is applied around its contact point.
      const renderScale=Number(img.dataset.renderScale)||0;
      const scale=renderScale>0?Math.min(width/w,height/h):Math.max(width/w,height/h);
      const referenceWidth=Number(img.dataset.referenceWidth)||w;
      const referenceHeight=Number(img.dataset.referenceHeight)||h;
      const motionScale=renderScale>0?Math.max(width/referenceWidth,height/referenceHeight):scale;
      const assetScale=renderScale>0?renderScale*motionScale/scale:1;
      const tipX=Number(img.dataset.tipX)*scale+(width-w*scale)/2;
      const tipY=Number(img.dataset.tipY)*scale+(height-h*scale)/2;
      const direction=layer.classList.contains('hand-left')?-1:1;
      const distance=Math.min(90,64*motionScale);
      return {layer,tipX,tipY,restX:contact.x-tipX,restY:contact.y-tipY,direction,distance,scale:motionScale,assetScale};
    });
    scene.style.setProperty('--touch-x',contact.x+'px');
    scene.style.setProperty('--touch-y',contact.y+'px');
    geometry.forEach(g=>{
      g.layer.style.setProperty('--asset-scale',String(g.assetScale));
      g.layer.style.setProperty('--rest-x',g.restX+'px');
      g.layer.style.setProperty('--rest-y',g.restY+'px');
      g.layer.style.setProperty('--start-x',(g.restX+g.direction*g.distance)+'px');
      g.layer.style.setProperty('--start-y',(g.restY+g.direction*8*g.scale)+'px');
      g.layer.style.setProperty('--finger-x',g.tipX+'px');
      g.layer.style.setProperty('--finger-y',g.tipY+'px');
    });
  }
  function scheduleAlign(){if(!frame)frame=requestAnimationFrame(align);}
  function updatePause(){scene.classList.toggle('is-paused',!visible||document.hidden);}
  function finish(skip=false){
    started=true;complete=true;
    window.clearTimeout(loadTimeout);
    if(skip)scene.classList.remove('is-playing');
    scene.classList.add('is-complete');
    scene.classList.remove('is-armed');
  }
  function play(){
    if(started||!ready||!visible||reduced.matches)return;
    started=true;
    align();
    // Let the initial separated transforms paint before the approach starts.
    requestAnimationFrame(()=>requestAnimationFrame(()=>{
      if(complete||reduced.matches)return;
      scene.classList.add('is-playing');updatePause();
    }));
  }
  function prepare(){
    if(loading||ready)return;
    loading=true;
    loadTimeout=window.setTimeout(()=>finish(true),6500);
    Promise.all(assets.map(img=>new Promise(resolve=>{
      if(img.complete){resolve(img.naturalWidth>0);return;}
      const done=success=>{img.removeEventListener('load',onload);img.removeEventListener('error',onerror);resolve(success);};
      const onload=()=>done(true),onerror=()=>done(false);
      img.addEventListener('load',onload,{once:true});img.addEventListener('error',onerror,{once:true});
      img.loading='eager';
    }))).then(results=>{
      window.clearTimeout(loadTimeout);
      loading=false;ready=results.every(Boolean);align();
      if(!ready){scene.classList.add('is-asset-error');finish(true);return;}
      play();
    });
  }

  footer.addEventListener('animationend',event=>{
    if(event.target===footer&&event.animationName==='hands-content-reveal'&&!complete)finish();
  });
  // Keyboard/tap access never waits for the decorative reveal.
  scene.addEventListener('focusin',()=>{if(!complete)finish(true);});
  document.addEventListener('visibilitychange',updatePause);
  assets.forEach(img=>img.addEventListener('load',scheduleAlign));
  if('ResizeObserver' in window)new ResizeObserver(scheduleAlign).observe(scene);
  else window.addEventListener('resize',scheduleAlign,{passive:true});
  if(document.fonts?.ready)document.fonts.ready.then(scheduleAlign);
  align();

  function preferenceChanged(){
    scene.classList.toggle('is-reduced',reduced.matches);
    if(reduced.matches)finish(true);
  }
  if(reduced.addEventListener)reduced.addEventListener('change',preferenceChanged);
  else if(reduced.addListener)reduced.addListener(preferenceChanged);
  preferenceChanged();
  if(!reduced.matches)scene.classList.add('is-armed');
  if('IntersectionObserver' in window){
    new IntersectionObserver(entries=>{
      visible=entries[0].isIntersecting;
      updatePause();
      if(visible){if(ready)play();else prepare();}
    },{threshold:0,rootMargin:'-10% 0px -10% 0px'}).observe(scene);
  }else{visible=true;finish(true);}
})();
