/* Existing service detail showcase. The shared booking controller owns the dialog. */
(()=>{
 const dialog=document.querySelector('#booking');if(!dialog)return;
 const $=selector=>dialog.querySelector(selector),data=window.MaisonServices;
 const photos=[...dialog.querySelectorAll('[data-service-feature]')],thumbs=$('[data-service-thumbs]'),photoStatus=$('[data-service-image-status]');
 let current=data[0],activePhoto=0,selectedIndex=0,requestedIndex=0,photoVersion=0;
 const pending=new Set();
  function paint(img,entry){
    img.alt=entry.alt;img.width=entry.width;img.height=entry.height;img.src=entry.src;
    img.style.objectPosition=entry.position;img.style.transformOrigin=entry.position;img.style.transform=`scale(${entry.zoom})`;
  }
  function render(selected){
    photoVersion++;current=selected;activePhoto=0;selectedIndex=requestedIndex=0;photoStatus.textContent='';thumbs.removeAttribute('aria-busy');
    $('#service-detail-index').textContent=String(data.indexOf(current)+1).padStart(2,'0');
    $('#service-detail-title').textContent=current.name;$('#service-detail-description').textContent=current.description;
    dialog.querySelectorAll('[data-service-highlight]').forEach((el,i)=>{el.textContent=current.highlights[i];});
    photos.forEach((img,i)=>{paint(img,current.images[0]);img.classList.toggle('is-current',i===0);img.setAttribute('aria-hidden',String(i!==0));});
    thumbs.replaceChildren();
    current.images.forEach((entry,i)=>{
      const button=document.createElement('button');button.type='button';button.className='sd-thumb';
      button.setAttribute('aria-label',`Xem ảnh ${i+1}: ${entry.alt}`);button.setAttribute('aria-pressed',String(i===0));
      const img=document.createElement('img');paint(img,entry);img.alt='';img.loading='lazy';button.append(img);
      button.addEventListener('click',()=>selectPhoto(i));thumbs.append(button);
    });
  }
  function selectPhoto(index){
    index=(index+current.images.length)%current.images.length;requestedIndex=index;
    const token=++photoVersion,entry=current.images[index];photoStatus.textContent='';
    thumbs.setAttribute('aria-busy','true');
    const preload=new Image();let settled=false;
    const finish=success=>{
      if(settled)return;settled=true;clearTimeout(deadline);pending.delete(cancel);preload.onload=preload.onerror=null;
      if(token!==photoVersion||!dialog.open)return;
      thumbs.removeAttribute('aria-busy');
      if(!success){requestedIndex=selectedIndex;photoStatus.textContent='Chưa tải được ảnh này. Vui lòng thử lại.';return;}
      selectedIndex=index;
      const next=1-activePhoto;paint(photos[next],entry);photos[next].classList.add('is-current');photos[next].setAttribute('aria-hidden','false');photos[activePhoto].classList.remove('is-current');photos[activePhoto].setAttribute('aria-hidden','true');activePhoto=next;
      [...thumbs.children].forEach((button,i)=>button.setAttribute('aria-pressed',String(i===index)));
    };
    const cancel=()=>finish(false),deadline=setTimeout(cancel,6000);pending.add(cancel);
    preload.onload=()=>finish(true);preload.onerror=cancel;preload.src=entry.src;
    if(preload.complete&&preload.naturalWidth)finish(true);
  }
  dialog.querySelectorAll('[data-service-step]').forEach(button=>button.addEventListener('click',()=>selectPhoto(requestedIndex+Number(button.dataset.serviceStep))));
  function clearPhotos(){photoVersion++;[...pending].forEach(cancel=>cancel());thumbs.removeAttribute('aria-busy');}
  photos.forEach(img=>img.addEventListener('error',()=>{if(img.classList.contains('is-current'))photoStatus.textContent='Chưa tải được ảnh này. Vui lòng chọn ảnh khác.';}));
  dialog.addEventListener('close',clearPhotos);
  window.MaisonServiceShowcase={render(service){clearPhotos();render(service);},clear:clearPhotos,current:()=>current};
  render(data[0]);
})();
