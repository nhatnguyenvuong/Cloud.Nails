const menu = document.querySelector('.menu');
const nav = document.querySelector('nav');
const closeMenu = () => { menu.setAttribute('aria-expanded','false'); nav.classList.remove('open'); };
menu.addEventListener('click', () => { const open = menu.getAttribute('aria-expanded') !== 'true'; menu.setAttribute('aria-expanded',String(open)); nav.classList.toggle('open',open); });
nav.querySelectorAll('a').forEach(a => a.addEventListener('click',closeMenu));
document.addEventListener('keydown',e => { if(e.key==='Escape' && menu.getAttribute('aria-expanded')==='true'){closeMenu();menu.focus();} });
document.querySelector('#year').textContent=new Date().getFullYear();
if('IntersectionObserver' in window && !window.matchMedia('(prefers-reduced-motion: reduce)').matches){const observer=new IntersectionObserver(entries=>{entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('is-visible');observer.unobserve(entry.target);}});},{threshold:0.08});document.querySelectorAll('.reveal').forEach(el=>observer.observe(el));document.body.classList.add('motion-ready');}

// Decorative hero backgrounds: a gentle crossfade every eight active seconds.
(() => {
  const hero=document.querySelector('.hero-showcase');
  if(!hero)return;
  const images=[...hero.querySelectorAll('[data-hero-image]')];
  if(images.length<2)return;
  const reduced=window.matchMedia('(prefers-reduced-motion: reduce)');
  const failed=new Set(),cleanup=[];
  let current=Math.max(0,images.findIndex(image=>image.classList.contains('is-active')));
  let timer=0,version=0,disposed=false,suspended=false,observer=null,intersection=null;
  function listen(target,type,handler,options){target.addEventListener(type,handler,options);cleanup.push(()=>target.removeEventListener(type,handler,options));}
  function eligible(){
    const box=hero.getBoundingClientRect();
    return !disposed&&!suspended&&!document.hidden&&!reduced.matches&&hero.isConnected!==false&&!hero.classList.contains('is-stack-covered')&&!document.documentElement.classList.contains('is-section-transitioning')&&box.bottom>0&&box.top<window.innerHeight&&!document.querySelector('dialog[open], #navigation.open');
  }
  function stop(){window.clearTimeout(timer);timer=0;version++;}
  function schedule(){
    stop();if(!eligible()||images.filter((_,i)=>!failed.has(i)).length<2)return;
    const token=version;timer=window.setTimeout(()=>advance(token),8000);
  }
  async function advance(token){
    timer=0;if(token!==version||!eligible())return;
    for(let step=1;step<images.length;step++){
      if(token!==version||!eligible())return;
      const next=(current+step)%images.length,image=images[next];
      if(failed.has(next))continue;
      try{
        if(image.decode)await image.decode();
        else if(image.complete){if(!image.naturalWidth)throw new Error('Background unavailable');}
        else{
          await new Promise((resolve,reject)=>{
            const done=ok=>{image.removeEventListener('load',loaded);image.removeEventListener('error',error);ok?resolve():reject();};
            const loaded=()=>done(true),error=()=>done(false);
            image.addEventListener('load',loaded,{once:true});image.addEventListener('error',error,{once:true});
            cleanup.push(()=>done(false));
          });
        }
      }catch{failed.add(next);continue;}
      if(token!==version||!eligible())return;
      if(!image.naturalWidth){failed.add(next);continue;}
      images.forEach((photo,i)=>photo.classList.toggle('is-active',i===next));
      current=next;break;
    }
    if(token===version)schedule();
  }
  function destroy(){
    if(disposed)return;disposed=true;stop();observer?.disconnect();intersection?.disconnect();cleanup.splice(0).forEach(fn=>fn());
  }
  // Prepare alternate backgrounds while the opening photograph remains visible.
  images.forEach(image=>{image.loading='eager';});
  listen(document,'visibilitychange',schedule);
  listen(window,'resize',schedule,{passive:true});
  listen(window,'scroll',()=>{if(!eligible())stop();else if(!timer)schedule();},{passive:true});
  listen(window,'pagehide',event=>{if(event.persisted){suspended=true;stop();}else destroy();});
  listen(window,'pageshow',()=>{suspended=false;schedule();});
  if(reduced.addEventListener)listen(reduced,'change',schedule);
  else if(reduced.addListener){reduced.addListener(schedule);cleanup.push(()=>reduced.removeListener(schedule));}
  if('MutationObserver' in window){
    observer=new MutationObserver(()=>{if(hero.isConnected===false)destroy();else schedule();});
    observer.observe(hero,{attributes:true,attributeFilter:['class']});
    observer.observe(document.documentElement,{attributes:true,attributeFilter:['class']});
    const navigation=document.querySelector('#navigation');if(navigation)observer.observe(navigation,{attributes:true,attributeFilter:['class']});
    document.querySelectorAll('dialog').forEach(modal=>observer.observe(modal,{attributes:true,attributeFilter:['open']}));
    if(hero.parentElement)observer.observe(hero.parentElement,{childList:true});
    if(document.body)observer.observe(document.body,{childList:true});
  }
  if('IntersectionObserver' in window){intersection=new IntersectionObserver(schedule,{threshold:0});intersection.observe(hero);}
  schedule();
})();

// Keep the mobile booking bar out of the full-screen composition.
const heroShowcase=document.querySelector('.hero-showcase');
if(heroShowcase && 'IntersectionObserver' in window){
  new IntersectionObserver(entries=>{document.body.classList.toggle('hero-in-view',entries[0].isIntersecting);},{threshold:0}).observe(heroShowcase);
}else{document.body.classList.remove('hero-in-view');}

