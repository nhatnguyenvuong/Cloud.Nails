/* Accessible, progressively enhanced select menus within the booking dialog. */
(() => {
  const dialog=document.querySelector('#booking.service-detail')||document.querySelector('#booking');
  const form=dialog?.querySelector('#booking-form');if(!form)return;
  const controls=[];let opened=null,validationQueued=false;
  const fold=text=>text.toLocaleLowerCase('vi').normalize('NFD').replace(/[\u0300-\u036f]/g,'').replace(/đ/g,'d');
  function close(focus=false){
    if(!opened)return;const c=opened;opened=null;
    c.search='';c.searchAt=0;
    c.menu.hidden=true;c.field.classList.remove('is-select-open','is-select-up');
    c.trigger.setAttribute('aria-expanded','false');c.trigger.removeAttribute('aria-activedescendant');
    if(focus)c.trigger.focus({preventScroll:true});
  }
  function highlight(c,index){
    c.active=(index+c.items.length)%c.items.length;
    c.items.forEach((item,i)=>item.node.classList.toggle('is-active',i===c.active));
    c.trigger.setAttribute('aria-activedescendant',c.items[c.active].node.id);
    const node=c.items[c.active].node,top=node.offsetTop,bottom=top+node.offsetHeight;
    if(top<c.menu.scrollTop)c.menu.scrollTop=top;
    else if(bottom>c.menu.scrollTop+c.menu.clientHeight)c.menu.scrollTop=bottom-c.menu.clientHeight;
  }
  function place(c){
    const box=c.trigger.getBoundingClientRect(),viewport=dialog.querySelector('.sd-scroll').getBoundingClientRect();
    const below=Math.max(0,Math.min(window.innerHeight,viewport.bottom)-box.bottom-10);
    const above=Math.max(0,box.top-Math.max(0,viewport.top)-10),up=below<Math.min(240,c.items.length*44)&&above>below;
    c.field.classList.toggle('is-select-up',up);
    const fieldBox=c.field.getBoundingClientRect();
    c.menu.style.top=up?'auto':(box.bottom-fieldBox.top+6)+'px';
    c.menu.style.bottom=up?(fieldBox.bottom-box.top+6)+'px':'auto';
    c.menu.style.maxHeight=Math.max(44,Math.min(240,up?above:below))+'px';
  }
  function open(c,edge){
    if(c.trigger.disabled||!c.items.length)return;
    close();opened=c;c.menu.hidden=false;c.field.classList.add('is-select-open');
    c.trigger.setAttribute('aria-expanded','true');place(c);
    const chosen=c.items.findIndex(item=>item.value===c.select.value);
    highlight(c,edge==='first'?0:edge==='last'?c.items.length-1:chosen>=0?chosen:0);
  }
  function sync(c,reset=false){
    const option=[...c.select.options].find(item=>item.value===c.select.value);
    c.text.textContent=option?.textContent||'Chọn một mục';
    c.trigger.classList.toggle('is-placeholder',!c.select.value);c.trigger.disabled=c.select.disabled;
    c.items.forEach(item=>item.node.setAttribute('aria-selected',String(item.value===c.select.value)));
    if(reset||c.select.validity.valid){c.error.hidden=true;c.error.textContent='';c.trigger.removeAttribute('aria-invalid');}
  }
  function choose(c,index){
    c.select.value=c.items[index].value;
    close(true);
    c.select.dispatchEvent(new Event('input',{bubbles:true}));
    c.select.dispatchEvent(new Event('change',{bubbles:true}));
    controls.forEach(item=>sync(item));
  }
  form.querySelectorAll('select').forEach(select=>{
    const field=select.closest('.sd-select-field');if(!field)return;
    const label=field.querySelector('label'),trigger=document.createElement('button'),text=document.createElement('span');
    const menu=document.createElement('div'),error=document.createElement('p');
    trigger.type='button';trigger.id=select.id+'-trigger';trigger.className='sd-select-trigger';
    trigger.setAttribute('role','combobox');trigger.setAttribute('aria-haspopup','listbox');trigger.setAttribute('aria-expanded','false');
    trigger.setAttribute('aria-controls',select.id+'-listbox');trigger.setAttribute('aria-labelledby',label.id+' '+select.id+'-value');
    if(select.required)trigger.setAttribute('aria-required','true');
    text.id=select.id+'-value';text.className='sd-select-value';trigger.append(text);
    const chevron=document.createElement('span');chevron.className='sd-select-chevron';chevron.setAttribute('aria-hidden','true');trigger.append(chevron);
    menu.id=select.id+'-listbox';menu.className='sd-select-menu';menu.setAttribute('role','listbox');menu.setAttribute('aria-labelledby',label.id);menu.hidden=true;
    error.id=select.id+'-error';error.className='sd-select-error';error.hidden=true;trigger.setAttribute('aria-describedby',error.id);
    const c={select,field,trigger,text,menu,error,items:[],active:0,search:'',searchAt:0};
    [...select.options].filter(option=>option.value&&!option.disabled).forEach((option,i)=>{
      const node=document.createElement('div');node.id=select.id+'-option-'+i;node.className='sd-select-option';node.setAttribute('role','option');node.textContent=option.textContent;
      node.addEventListener('click',()=>choose(c,i));menu.append(node);c.items.push({node,value:option.value});
    });
    if(!c.items.length)return;
    field.append(trigger,menu,error);controls.push(c);label.htmlFor=trigger.id;
    select.classList.add('sd-native-select');select.tabIndex=-1;select.setAttribute('aria-hidden','true');
    select.addEventListener('focus',()=>trigger.focus({preventScroll:true}));
    select.addEventListener('change',()=>{close();controls.forEach(item=>sync(item));});
    select.addEventListener('input',()=>sync(c));
    select.addEventListener('invalid',event=>{
      event.preventDefault();close();error.textContent=select.validationMessage;error.hidden=false;trigger.setAttribute('aria-invalid','true');
      if(validationQueued)return;validationQueued=true;
      queueMicrotask(()=>{
        validationQueued=false;
        const first=[...form.querySelectorAll('input,select')].find(field=>!field.validity.valid);
        controls.find(item=>item.select===first)?.trigger.focus({preventScroll:false});
      });
    });
    trigger.addEventListener('click',()=>opened===c?close():open(c));
    trigger.addEventListener('keydown',event=>{
      if(event.ctrlKey||event.metaKey||event.altKey)return;
      const key=event.key;
      if(key==='Tab'){close();return;}
      if(key==='Escape'&&opened===c){event.preventDefault();event.stopPropagation();close();return;}
      if(['ArrowDown','ArrowUp','Home','End','Enter',' '].includes(key)){
        event.preventDefault();
        if(key==='Enter'||key===' '){if(opened===c)choose(c,c.active);else open(c);return;}
        if(opened!==c){open(c,key==='Home'?'first':key==='End'?'last':undefined);return;}
        highlight(c,key==='Home'?0:key==='End'?c.items.length-1:c.active+(key==='ArrowDown'?1:-1));return;
      }
      if(key.length===1&&!event.isComposing){
        event.preventDefault();if(opened!==c)open(c);
        const now=performance.now();c.search=now-c.searchAt>650?key:c.search+key;c.searchAt=now;
        const query=fold(c.search),found=c.items.findIndex(item=>fold(item.node.textContent).startsWith(query));
        if(found>=0)highlight(c,found);
      }
    });
    menu.addEventListener('pointerdown',event=>{if(event.pointerType==='mouse')event.preventDefault();});
    sync(c,true);
  });
  document.addEventListener('focusin',event=>{if(opened&&event.target!==document.body&&!opened.field.contains(event.target))close();});
  document.addEventListener('pointerdown',event=>{if(opened&&!opened.field.contains(event.target))close();},true);
  dialog.addEventListener('cancel',event=>{if(opened){event.preventDefault();event.stopImmediatePropagation();close(true);}},true);
  dialog.addEventListener('close',()=>close());
  dialog.querySelector('.sd-scroll').addEventListener('scroll',()=>{if(opened)place(opened);},{passive:true});
  window.addEventListener('resize',()=>{if(opened)place(opened);},{passive:true});
  document.querySelectorAll('[data-book]').forEach(button=>button.addEventListener('click',()=>{close();controls.forEach(c=>sync(c,true));}));
  form.addEventListener('reset',()=>{close();queueMicrotask(()=>controls.forEach(c=>sync(c,true)));});
})();
