/* Branded Vietnamese calendar; the original date input remains the form value. */
(() => {
  const dialog=document.querySelector('#booking'),input=dialog?.querySelector('#date');
  const field=input?.closest('.sd-date-field');if(!field)return;
  const form=input.form||dialog.querySelector('#booking-form'),label=field.querySelector('label');
  const scroller=dialog.querySelector('.sd-scroll');
  const make=(tag,cls,text)=>{const el=document.createElement(tag);el.className=cls;if(text)el.textContent=text;return el;};
  const day=(y,m,d)=>new Date(y,m,d,12);
  const today=()=>{const d=new Date();return day(d.getFullYear(),d.getMonth(),d.getDate());};
  const iso=d=>`${String(d.getFullYear()).padStart(4,'0')}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`;
  function parse(value){
    const parts=/^(\d{4})-(\d{2})-(\d{2})$/.exec(value||'');if(!parts)return null;
    const d=day(+parts[1],+parts[2]-1,+parts[3]);return iso(d)===value?d:null;
  }
  const minimum=()=>{const limit=parse(input.min),now=today();return limit&&limit>now?limit:now;};
  const maximum=()=>parse(input.max)||day(9999,11,31);
  const clamp=d=>d<minimum()?minimum():d>maximum()?maximum():d;
  const shiftMonth=(d,delta)=>{const start=day(d.getFullYear(),d.getMonth()+delta,1);return day(start.getFullYear(),start.getMonth(),Math.min(d.getDate(),day(start.getFullYear(),start.getMonth()+1,0).getDate()));};
  const spoken=new Intl.DateTimeFormat('vi-VN',{weekday:'long',day:'numeric',month:'long',year:'numeric'});
  const trigger=make('button','sd-date-trigger'),value=make('span','sd-date-value'),icon=make('span','sd-date-icon');
  trigger.type='button';trigger.id='date-trigger';trigger.setAttribute('aria-haspopup','dialog');trigger.setAttribute('aria-expanded','false');trigger.setAttribute('aria-controls','date-calendar');trigger.setAttribute('aria-labelledby','date-label date-value');trigger.setAttribute('aria-describedby','date-error');
  if(input.required)trigger.setAttribute('aria-required','true');
  value.id='date-value';icon.setAttribute('aria-hidden','true');trigger.append(value,icon);
  const popup=make('div','sd-calendar');popup.id='date-calendar';popup.hidden=true;popup.setAttribute('role','dialog');popup.setAttribute('aria-labelledby','date-month');popup.setAttribute('aria-describedby','date-help');
  const header=make('div','sd-calendar-header'),title=make('p','sd-calendar-month'),nav=make('div','sd-calendar-nav');
  title.id='date-month';title.setAttribute('aria-live','polite');title.setAttribute('aria-atomic','true');
  const prev=make('button','sd-calendar-nav-button'),next=make('button','sd-calendar-nav-button');
  [prev,next].forEach(button=>button.type='button');prev.setAttribute('aria-label','Tháng trước');next.setAttribute('aria-label','Tháng tiếp theo');
  const back=make('span','sd-calendar-chevron is-back'),forward=make('span','sd-calendar-chevron');back.setAttribute('aria-hidden','true');forward.setAttribute('aria-hidden','true');prev.append(back);next.append(forward);nav.append(prev,next);header.append(title,nav);
  const help=make('p','visually-hidden','Dùng phím mũi tên để chuyển ngày, Page Up và Page Down để đổi tháng. Nhấn Enter để chọn, Escape để đóng.');help.id='date-help';
  const grid=make('div','sd-calendar-grid');grid.setAttribute('role','grid');grid.setAttribute('aria-labelledby','date-month');
  const footer=make('div','sd-calendar-footer'),clear=make('button','sd-calendar-action','Xóa ngày'),now=make('button','sd-calendar-action','Hôm nay');clear.type=now.type='button';footer.append(clear,now);
  const error=make('p','sd-date-error');error.id='date-error';error.hidden=true;
  popup.append(header,help,grid,footer);field.append(trigger,popup,error);
  label.htmlFor=trigger.id;input.classList.add('sd-native-date');input.tabIndex=-1;input.setAttribute('aria-hidden','true');
  let opened=false,cursor=minimum(),view=day(cursor.getFullYear(),cursor.getMonth(),1),validationQueued=false;
  function sync(reset=false){
    const date=parse(input.value);value.textContent=date?`${String(date.getDate()).padStart(2,'0')}/${String(date.getMonth()+1).padStart(2,'0')}/${date.getFullYear()}`:'Chọn ngày hẹn';
    trigger.classList.toggle('is-placeholder',!date);trigger.disabled=input.disabled;
    if(reset||input.validity.valid){error.hidden=true;error.textContent='';trigger.removeAttribute('aria-invalid');}
  }
  function place(){
    if(!opened)return;
    const box=trigger.getBoundingClientRect(),bounds=scroller.getBoundingClientRect(),origin=field.getBoundingClientRect();
    const width=Math.max(0,Math.min(320,bounds.right-bounds.left-20));
    const left=Math.max(bounds.left+8,Math.min(box.left,bounds.right-width-8));
    const below=Math.max(0,Math.min(window.innerHeight,bounds.bottom)-box.bottom-10),above=Math.max(0,box.top-Math.max(0,bounds.top)-10);
    const up=below<380&&above>below;
    popup.style.width=width+'px';popup.style.left=(left-origin.left)+'px';popup.style.top=up?'auto':(box.bottom-origin.top+6)+'px';popup.style.bottom=up?(origin.bottom-box.top+6)+'px':'auto';
    popup.style.maxHeight=Math.max(44,Math.min(410,up?above:below))+'px';
  }
  function close(focus=false){opened=false;popup.hidden=true;field.classList.remove('is-calendar-open');trigger.setAttribute('aria-expanded','false');if(focus)trigger.focus({preventScroll:true});}
  function choose(date){
    input.value=date?iso(date):'';input.dispatchEvent(new Event('input',{bubbles:true}));input.dispatchEvent(new Event('change',{bubbles:true}));sync();close(true);
  }
  function render(focus=false){
    const heading=`Tháng ${view.getMonth()+1}, ${view.getFullYear()}`;if(title.textContent!==heading)title.textContent=heading;
    const monthIndex=d=>d.getFullYear()*12+d.getMonth();prev.disabled=monthIndex(view)<=monthIndex(minimum());next.disabled=monthIndex(view)>=monthIndex(maximum());
    grid.replaceChildren();const weekdays=make('div','sd-calendar-week');weekdays.setAttribute('role','row');
    ['T2','T3','T4','T5','T6','T7','CN'].forEach((text,i)=>{const el=make('span','sd-calendar-weekday',text);el.setAttribute('role','columnheader');el.setAttribute('aria-label',i===6?'Chủ nhật':'Thứ '+(i+2));weekdays.append(el);});grid.append(weekdays);
    const offset=(view.getDay()+6)%7,first=day(view.getFullYear(),view.getMonth(),1-offset),todayISO=iso(today());
    for(let week=0;week<6;week++){
      const row=make('div','sd-calendar-week');row.setAttribute('role','row');
      for(let col=0;col<7;col++){
        const date=day(first.getFullYear(),first.getMonth(),first.getDate()+week*7+col),stamp=iso(date);
        const cell=make('div','sd-calendar-cell'),button=make('button','sd-calendar-day',String(date.getDate()));cell.setAttribute('role','gridcell');cell.setAttribute('aria-selected',String(stamp===input.value));
        button.type='button';button.dataset.date=stamp;button.setAttribute('aria-label',spoken.format(date));button.disabled=date<minimum()||date>maximum();button.tabIndex=stamp===iso(cursor)?0:-1;
        button.classList.toggle('is-other-month',date.getMonth()!==view.getMonth());button.classList.toggle('is-selected',stamp===input.value);if(stamp===todayISO)button.setAttribute('aria-current','date');
        button.addEventListener('click',()=>choose(date));button.addEventListener('keydown',event=>onDayKey(event,date));cell.append(button);row.append(cell);
      }
      grid.append(row);
    }
    place();
    if(focus)grid.querySelector(`[data-date="${iso(cursor)}"]`)?.focus({preventScroll:true});
  }
  function open(){
    if(trigger.disabled)return;
    cursor=clamp(parse(input.value)||today());view=day(cursor.getFullYear(),cursor.getMonth(),1);
    opened=true;popup.hidden=false;field.classList.add('is-calendar-open');trigger.setAttribute('aria-expanded','true');render(true);
  }
  function move(date){cursor=clamp(date);view=day(cursor.getFullYear(),cursor.getMonth(),1);render(true);}
  function onDayKey(event,date){
    if(event.ctrlKey||event.metaKey||event.altKey)return;
    const k=event.key,offset=(date.getDay()+6)%7;
    if(!['ArrowLeft','ArrowRight','ArrowUp','ArrowDown','Home','End','PageUp','PageDown'].includes(k))return;
    event.preventDefault();
    if(k==='PageUp'||k==='PageDown'){move(shiftMonth(date,(k==='PageDown'?1:-1)*(event.shiftKey?12:1)));return;}
    const delta=k==='ArrowLeft'?-1:k==='ArrowRight'?1:k==='ArrowUp'?-7:k==='ArrowDown'?7:k==='Home'?-offset:6-offset;
    move(day(date.getFullYear(),date.getMonth(),date.getDate()+delta));
  }
  trigger.addEventListener('click',()=>opened?close():open());
  trigger.addEventListener('keydown',event=>{if(event.key==='ArrowDown'){event.preventDefault();open();}else if(event.key==='Escape'&&opened){event.preventDefault();event.stopPropagation();close(true);}});
  prev.addEventListener('click',()=>{cursor=clamp(shiftMonth(cursor,-1));view=day(cursor.getFullYear(),cursor.getMonth(),1);render();});
  next.addEventListener('click',()=>{cursor=clamp(shiftMonth(cursor,1));view=day(cursor.getFullYear(),cursor.getMonth(),1);render();});
  clear.addEventListener('click',()=>choose(null));now.addEventListener('click',()=>choose(clamp(today())));
  popup.addEventListener('keydown',event=>{if(event.key==='Escape'){event.preventDefault();event.stopPropagation();close(true);}});
  input.addEventListener('focus',()=>trigger.focus({preventScroll:true}));
  input.addEventListener('input',()=>sync());input.addEventListener('change',()=>sync());
  input.addEventListener('invalid',event=>{
    event.preventDefault();close();error.textContent=input.validationMessage;error.hidden=false;trigger.setAttribute('aria-invalid','true');
    if(validationQueued)return;validationQueued=true;queueMicrotask(()=>{validationQueued=false;const first=[...form.querySelectorAll('input,select')].find(field=>!field.validity.valid);if(first===input)trigger.focus({preventScroll:false});});
  });
  document.addEventListener('pointerdown',event=>{if(opened&&!field.contains(event.target))close();},true);
  document.addEventListener('focusin',event=>{if(opened&&event.target!==document.body&&!field.contains(event.target))close();});
  dialog.addEventListener('cancel',event=>{if(opened){event.preventDefault();event.stopImmediatePropagation();close(true);}},true);
  dialog.addEventListener('close',()=>close());scroller.addEventListener('scroll',place,{passive:true});window.addEventListener('resize',place,{passive:true});
  form.addEventListener('reset',()=>{close();queueMicrotask(()=>sync(true));});
  document.querySelectorAll('[data-book]').forEach(button=>button.addEventListener('click',()=>{close();sync(true);}));
  sync(true);
})();
