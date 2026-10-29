/* Inline calendar reusing the site's Vietnamese calendar grid and button styles. */
(()=>{
 window.MaisonBookingCalendar={create({container,isAvailable,onSelect}){
  const C=window.MaisonBookingCore,make=(tag,cls,text)=>{const el=document.createElement(tag);el.className=cls;if(text)el.textContent=text;return el;};
  const calendar=make('div','sd-calendar booking-inline-calendar'),header=make('div','sd-calendar-header'),title=make('p','sd-calendar-month'),nav=make('div','sd-calendar-nav');title.id='booking-month';title.setAttribute('aria-live','polite');
  const prev=make('button','sd-calendar-nav-button','‹'),next=make('button','sd-calendar-nav-button','›');prev.type=next.type='button';prev.setAttribute('aria-label','Tháng trước');next.setAttribute('aria-label','Tháng tiếp theo');nav.append(prev,next);header.append(title,nav);
  const grid=make('div','sd-calendar-grid');grid.setAttribute('role','grid');grid.setAttribute('aria-labelledby',title.id);calendar.append(header,grid);container.append(calendar);
  let value='',cursor=C.today(),view=C.day(cursor.getFullYear(),cursor.getMonth(),1);
  function clamp(date){return date<C.today()?C.today():date;}
  function focusDay(){
   const target=grid.querySelector(`[data-booking-date="${C.iso(cursor)}"]`);if(!target)return;target.focus({preventScroll:true});
   const scroll=container.closest('.booking-step-scroll')||container.closest('.sd-scroll');if(!scroll)return;const a=target.getBoundingClientRect(),b=scroll.getBoundingClientRect();
   if(a.bottom>b.bottom)scroll.scrollTop+=a.bottom-b.bottom+8;else if(a.top<b.top)scroll.scrollTop-=b.top-a.top+8;
  }
  function render(focus=false){
   const heading=`Tháng ${view.getMonth()+1}, ${view.getFullYear()}`;if(title.textContent!==heading)title.textContent=heading;
   prev.disabled=view.getFullYear()*12+view.getMonth()<=C.today().getFullYear()*12+C.today().getMonth();grid.replaceChildren();
   const week=make('div','sd-calendar-week');week.setAttribute('role','row');['T2','T3','T4','T5','T6','T7','CN'].forEach(text=>{const el=make('span','sd-calendar-weekday',text);el.setAttribute('role','columnheader');week.append(el);});grid.append(week);
   const first=C.day(view.getFullYear(),view.getMonth(),1-(view.getDay()+6)%7);
   for(let row=0;row<6;row++){const line=make('div','sd-calendar-week');line.setAttribute('role','row');for(let col=0;col<7;col++){
    const date=C.day(first.getFullYear(),first.getMonth(),first.getDate()+row*7+col),stamp=C.iso(date),cell=make('div','sd-calendar-cell'),button=make('button','sd-calendar-day',String(date.getDate()));
    cell.setAttribute('role','gridcell');cell.setAttribute('aria-selected',String(stamp===value));button.type='button';button.dataset.bookingDate=stamp;button.disabled=date<C.today()||!isAvailable(stamp);button.tabIndex=stamp===C.iso(cursor)&&!button.disabled?0:-1;
    button.setAttribute('aria-label',new Intl.DateTimeFormat('vi-VN',{weekday:'long',day:'numeric',month:'long',year:'numeric'}).format(date)+(button.disabled?' — không khả dụng':'') );button.classList.toggle('is-selected',stamp===value);button.classList.toggle('is-other-month',date.getMonth()!==view.getMonth());if(stamp===C.iso(C.today()))button.setAttribute('aria-current','date');
    button.addEventListener('click',()=>{value=stamp;cursor=date;render(true);onSelect(stamp);});
    button.addEventListener('keydown',event=>{
     if(event.altKey||event.ctrlKey||event.metaKey)return;const k=event.key;if(!['ArrowLeft','ArrowRight','ArrowUp','ArrowDown','Home','End','PageUp','PageDown'].includes(k))return;event.preventDefault();
     const offset=(date.getDay()+6)%7,delta=k==='ArrowLeft'?-1:k==='ArrowRight'?1:k==='ArrowUp'?-7:k==='ArrowDown'?7:k==='Home'?-offset:6-offset;
     let candidate=k==='PageUp'||k==='PageDown'?C.shiftMonth(date,(k==='PageDown'?1:-1)*(event.shiftKey?12:1)):C.day(date.getFullYear(),date.getMonth(),date.getDate()+delta);candidate=clamp(candidate);
     // Skip unavailable cells without moving focus outside the calendar.
     for(let tries=0;tries<31&&!isAvailable(C.iso(candidate));tries++)candidate=clamp(C.day(candidate.getFullYear(),candidate.getMonth(),candidate.getDate()+((candidate>=date||candidate<=C.today())?1:-1)));
     cursor=candidate;view=C.day(cursor.getFullYear(),cursor.getMonth(),1);render(true);
    });cell.append(button);line.append(cell);
   }grid.append(line);}
   if(focus)focusDay();
  }
  function month(delta){cursor=clamp(C.shiftMonth(cursor,delta));view=C.day(cursor.getFullYear(),cursor.getMonth(),1);findFocus();render();}
  function findFocus(){if(!isAvailable(C.iso(cursor))){for(let n=0;n<31;n++){const d=C.day(view.getFullYear(),view.getMonth(),n+1);if(d>=C.today()&&isAvailable(C.iso(d))){cursor=d;return;}}}}
  prev.addEventListener('click',()=>month(-1));next.addEventListener('click',()=>month(1));
  return{setValue(date){value=date;cursor=clamp(C.parse(date)||C.today());view=C.day(cursor.getFullYear(),cursor.getMonth(),1);findFocus();render();},refresh(){findFocus();render();},focus:focusDay};
 }};
})();
