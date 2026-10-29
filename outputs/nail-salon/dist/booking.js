/* One booking controller, one native dialog, centralized draft and provider seam. */
(()=>{
 const dialog=document.querySelector('#booking');if(!dialog)return;
 const C=window.MaisonBookingCore,services=window.MaisonServices,showcase=window.MaisonServiceShowcase;
 const $=s=>dialog.querySelector(s),flow=$('#booking-flow'),detail=$('#service-detail-view'),form=$('#booking-form');
 const title=$('#booking-title'),description=$('#booking-description'),error=$('#booking-error'),next=$('#booking-next'),back=$('#booking-back');
 const steps=[...dialog.querySelectorAll('[data-booking-step]')],progress=[...dialog.querySelectorAll('[data-progress]')];
 const fields={name:$('#appointment-name'),phone:$('#appointment-phone'),notes:$('#appointment-notes')};
 const reduced=window.matchMedia('(prefers-reduced-motion: reduce)');
 let state=C.draft(),provider=C.requestAvailability,mode='booking',opener=null,lock=null;
 let generation=0,loadVersion=0,loadAbort=null,sendAbort=null,closeTimer=0,closing=false,loading=false,sending=false,slots=[];
 const titles=['Chọn dịch vụ','Chọn ngày & giờ','Thông tin của bạn','Kiểm tra lịch hẹn'];
 const descriptions=['Một lựa chọn dành riêng cho bạn.','Chọn một khoảng thời gian phù hợp.','Để tiệm có thể liên hệ với bạn.','Dành một chút thời gian để kiểm tra lại.'];
 const byService=value=>services.find(s=>s.id===value||s.name===value);
 const displayDate=value=>C.parse(value)?value.split('-').reverse().join('/'):'Chưa chọn ngày';
 const submission=window.MaisonBookingSubmission.create();
 const real=()=>submission.isConnected();
 const make=(tag,cls,text)=>{const el=document.createElement(tag);el.className=cls;if(text)el.textContent=text;return el;};
 function setError(message,target){error.textContent=message||'';error.hidden=!message;if(message&&target)target.focus({preventScroll:false});}
 function available(date){try{return date>=C.iso(C.today())&&provider.isDateAvailable(date,state.serviceId)===true;}catch{return false;}}
 const calendar=window.MaisonBookingCalendar.create({container:$('#booking-calendar'),isAvailable:available,onSelect(date){state.date=date;state.time='';setError('');loadTimes();}});
 function focusInside(target){if(!target)return;target.focus({preventScroll:true});const scroll=target.closest('.booking-step-scroll')||target.closest('.booking-outcome-scroll')||$('.sd-scroll'),a=target.getBoundingClientRect(),b=scroll.getBoundingClientRect();if(a.bottom>b.bottom)scroll.scrollTop+=a.bottom-b.bottom+8;else if(a.top<b.top)scroll.scrollTop-=b.top-a.top+8;}
 function radioKeys(container){container.addEventListener('keydown',event=>{
  if(!['ArrowLeft','ArrowRight','ArrowUp','ArrowDown','Home','End'].includes(event.key))return;
  const list=[...container.querySelectorAll('[role="radio"]')].filter(b=>!b.disabled),i=list.indexOf(event.target);if(i<0)return;
  event.preventDefault();const n=event.key==='Home'?0:event.key==='End'?list.length-1:(i+(['ArrowRight','ArrowDown'].includes(event.key)?1:list.length-1))%list.length;
  focusInside(list[n]);list[n].click();
 });}
 const serviceChoices=services.map(service=>{
  const button=make('button','booking-service-choice');button.type='button';button.dataset.bookingService=service.id;button.setAttribute('role','radio');button.setAttribute('aria-checked','false');
  const photo=service.images[0],img=make('img','booking-service-image');img.src=photo.src;img.alt='';img.width=photo.width;img.height=photo.height;img.style.objectPosition=photo.position;img.loading='lazy';
  const text=make('span','booking-service-copy'),name=make('span','booking-service-name',service.name),sub=make('span','booking-service-description',service.summary),indicator=make('span','booking-service-indicator');indicator.setAttribute('aria-hidden','true');text.append(name,sub);button.append(img,text,indicator);
  button.addEventListener('click',()=>{
   if(state.serviceId!==service.id){state.serviceId=service.id;state.date='';state.time='';slots=[];abortLoad();}
   selectService();setError('');
  });$('#booking-service-options').append(button);return button;
 });
 $('#booking-service-options').setAttribute('role','radiogroup');$('#booking-service-options').setAttribute('aria-label','Chọn một dịch vụ');radioKeys($('#booking-service-options'));radioKeys($('#booking-time-options'));
 function selectService(){
  serviceChoices.forEach((button,i)=>{const chosen=button.dataset.bookingService===state.serviceId;button.setAttribute('aria-checked',String(chosen));button.tabIndex=chosen||!state.serviceId&&i===0?0:-1;});
  showcase.render(byService(state.serviceId)||services[0]);
 }
 function summary(){const service=byService(state.serviceId);return [service?.name,displayDate(state.date),C.formatTime(state.time)||'Chưa chọn giờ'].filter(Boolean).join(' · ');}
 function renderReview(){
  $('#booking-contact-summary').textContent=summary();const list=$('#booking-review');list.replaceChildren();
  const rows=[['Dịch vụ',byService(state.serviceId)?.name||''],['Ngày hẹn',displayDate(state.date)],['Giờ hẹn',C.formatTime(state.time)],['Họ và tên',state.name.trim()],['Số điện thoại',state.phone.trim()]];
  if(state.notes.trim())rows.push(['Ghi chú',state.notes.trim()]);
  rows.forEach(([label,value])=>{const row=make('div','booking-review-row'),dt=make('dt','',label),dd=make('dd','',value);row.append(dt,dd);list.append(row);});
 }
 function updateBookingCopy(){
  $('#booking-times-label').textContent='Giờ hẹn mong muốn';
  $('.booking-review-note').textContent='Lịch hẹn sẽ được tiệm xác nhận sau khi nhận thông tin.';
 }
 function renderStep(focus=true,direction=1){
  state.step=Math.max(0,Math.min(3,state.step));flow.style.setProperty('--booking-step-direction',direction<0?'-8px':'8px');
  flow.hidden=false;detail.hidden=true;dialog.classList.add('is-booking-flow');dialog.setAttribute('aria-labelledby','booking-title');dialog.setAttribute('aria-describedby','booking-description');
  flow.classList.remove('is-booking-complete');$('.booking-heading').hidden=false;form.hidden=false;$('#booking-outcome').hidden=true;title.textContent=titles[state.step];description.textContent=descriptions[state.step];
  steps.forEach((panel,i)=>panel.hidden=i!==state.step);progress.forEach((item,i)=>{if(i===state.step)item.setAttribute('aria-current','step');else item.removeAttribute('aria-current');item.classList.toggle('is-complete',i<state.step);});
  back.hidden=state.step===0;back.disabled=sending;next.disabled=loading||sending;next.textContent=state.step===3?'Xác nhận đặt lịch':'Tiếp tục';
  renderReview();updateBookingCopy();if(state.step===1){calendar.setValue(state.date);loadTimes();}
  if(focus){$('.booking-step-scroll').scrollTop=0;$('.sd-scroll').scrollTop=0;title.focus({preventScroll:true});}
 }
 function abortLoad(){loadVersion++;loadAbort?.abort();loadAbort=null;loading=false;next.disabled=sending;$('#booking-time-options').removeAttribute('aria-busy');}
 async function readSlots(){
  loadAbort?.abort();loadAbort=new AbortController();const token=++loadVersion;
  const response=await provider.loadSlots({date:state.date,serviceId:state.serviceId,signal:loadAbort.signal});
  if(token!==loadVersion)throw new Error('Stale');
  if(!Array.isArray(response)||response.some(s=>!C.validTime(s.value)||typeof s.available!=='boolean')||new Set(response.map(s=>s.value)).size!==response.length)throw new Error('Invalid availability');
  return response;
 }
 function paintSlots(){
  const container=$('#booking-time-options');container.replaceChildren();container.setAttribute('role','radiogroup');
  slots.forEach(slot=>{
   const button=make('button','booking-slot',C.formatTime(slot.value));button.type='button';button.dataset.bookingTime=slot.value;button.disabled=!slot.available;button.setAttribute('role','radio');button.setAttribute('aria-checked',String(state.time===slot.value));button.setAttribute('aria-label',C.formatTime(slot.value)+(slot.available?'':' — không khả dụng'));
   button.tabIndex=slot.available&&(state.time===slot.value||!state.time&&slots.find(s=>s.available)===slot)?0:-1;
   button.addEventListener('click',()=>{state.time=slot.value;paintSlots();focusInside($('#booking-time-options').querySelector(`[data-booking-time="${slot.value}"]`));setError('');});container.append(button);
  });
  $('#booking-schedule-selection').textContent=state.date?displayDate(state.date)+(state.time?' · '+C.formatTime(state.time):' · Chọn một khung giờ'):'Chọn một ngày để xem giờ hẹn.';
 }
 async function loadTimes(){
  abortLoad();const region=$('#booking-time-options');region.replaceChildren();
  if(!state.date){$('#booking-schedule-selection').textContent='Chọn một ngày để xem giờ hẹn.';return;}
  const version=generation,date=state.date;loading=true;next.disabled=true;region.setAttribute('aria-busy','true');$('#booking-schedule-selection').textContent='Đang tải khung giờ…';
  const task=readSlots(),request=loadVersion;
  try{const result=await task;if(request!==loadVersion||version!==generation||date!==state.date||!dialog.open||state.step!==1)return;slots=result;if(!slots.some(s=>s.value===state.time&&s.available))state.time='';paintSlots();if(!slots.some(s=>s.available))setError('Ngày này không có khung giờ phù hợp. Vui lòng chọn ngày khác.');}
  catch(e){if(e?.name!=='AbortError'&&e?.message!=='Stale'&&request===loadVersion&&version===generation&&dialog.open&&state.step===1){setError('Chưa tải được khung giờ. Vui lòng chọn lại ngày để thử lại.');$('#booking-schedule-selection').textContent='Chưa tải được khung giờ.';}}
  finally{if(request===loadVersion&&version===generation&&date===state.date){loading=false;next.disabled=sending;region.removeAttribute('aria-busy');}}
 }
 function contactErrors(show=true){
  const errors=C.errors(state,services);['name','phone'].forEach(key=>{const el=$('#booking-'+key+'-error');el.textContent=show?errors[key]||'':'';el.hidden=!el.textContent;if(show&&errors[key])fields[key].setAttribute('aria-invalid','true');else fields[key].removeAttribute('aria-invalid');});
  return errors;
 }
 Object.entries(fields).forEach(([key,field])=>field.addEventListener('input',()=>{state[key]=field.value;field.removeAttribute('aria-invalid');if(key==='name'||key==='phone')$('#booking-'+key+'-error').hidden=true;setError('');}));
 back.addEventListener('click',()=>{if(sending)return;abortLoad();state.step--;setError('');renderStep(true,-1);});
 form.addEventListener('submit',async event=>{
  event.preventDefault();if(sending||loading)return;Object.entries(fields).forEach(([k,f])=>state[k]=f.value);
  const errors=C.errors(state,services);setError('');
  if(state.step===0&&errors.service){setError(errors.service,serviceChoices[0]);return;}
  if(state.step===1){if(errors.date||!available(state.date)){setError(errors.date||'Ngày này không khả dụng. Vui lòng chọn ngày khác.');calendar.focus();return;}if(errors.time||!slots.some(s=>s.value===state.time&&s.available)){setError(errors.time||'Khung giờ không khả dụng.');$('#booking-time-options').querySelector('button:not(:disabled)')?.focus();return;}}
  if(state.step===2&&(errors.name||errors.phone||errors.notes)){contactErrors();setError(errors.name||errors.phone||errors.notes,errors.name?fields.name:errors.phone?fields.phone:fields.notes);return;}
  if(state.step<3){abortLoad();state.step++;renderStep();return;}
  if(Object.keys(errors).length){state.step=errors.service?0:errors.date||errors.time?1:2;renderStep();setError('Vui lòng kiểm tra lại thông tin.');return;}
  const version=generation; sending=true;next.disabled=true;back.disabled=true;next.textContent=real()?'Đang gửi…':'Đang hoàn tất…';next.setAttribute('aria-busy','true');
  try{
   // Collect the preferred appointment time; no live availability check.
   if(version!==generation||!dialog.open)return;
   sendAbort=new AbortController();
   const payload=window.MaisonBookingSubmission.buildPayload(state,byService(state.serviceId));
   const result=await submission.submit(payload,{signal:sendAbort.signal});
   if(version!==generation||!dialog.open)return;
   showSuccess(result);
  }catch(e){if(version!==generation||!dialog.open)return;if(e?.name!=='AbortError')setError(real()?'Chưa gửi được yêu cầu. Thông tin được giữ lại để bạn thử lại.':'Chưa hoàn tất được trải nghiệm. Vui lòng thử lại.',error);}
  finally{if(version===generation){sending=false;next.disabled=loading;back.disabled=false;next.removeAttribute('aria-busy');next.textContent=state.step===3?'Xác nhận đặt lịch':'Tiếp tục';}}
 });
 function showSuccess(result){
  const delivered=result.mode==='live'&&result.requestReceived===true;
  form.hidden=true;$('.booking-heading').hidden=true;flow.classList.add('is-booking-complete');$('#booking-outcome').hidden=false;
  $('#booking-success-description').textContent=delivered?'Yêu cầu đặt lịch của bạn đã được gửi. Cloud.Nails sẽ sớm liên hệ để xác nhận lịch hẹn.':'Bạn đã hoàn tất trải nghiệm đặt lịch. Thông tin chưa được gửi đến Cloud.Nails.';
  $('#booking-demo-note').hidden=delivered;dialog.setAttribute('aria-labelledby','booking-success-title');dialog.setAttribute('aria-describedby','booking-success-description');
  $('.booking-outcome-scroll').scrollTop=0;$('#booking-success-title').focus({preventScroll:true});
 }
 $('#booking-done').addEventListener('click',close);
 function lockPage(){if(lock!==null)return;const body=document.body;lock=body.style.paddingRight;const gutter=Math.max(0,window.innerWidth-document.documentElement.clientWidth);if(gutter)body.style.paddingRight=(parseFloat(getComputedStyle(body).paddingRight)||0)+gutter+'px';document.documentElement.classList.add('is-service-modal-open');}
 function unlock(){if(lock===null)return;document.body.style.paddingRight=lock;lock=null;document.documentElement.classList.remove('is-service-modal-open');}
 function prepare(source){clearTimeout(closeTimer);closing=false;dialog.classList.remove('is-closing');generation++;abortLoad();sendAbort?.abort();sending=false;if(source&&!dialog.contains(source))opener=source;lockPage();if(!dialog.open)dialog.showModal();}
 function openBooking({service,source}={}){
  const selected=byService(service);prepare(source);mode='booking';state=C.draft(selected?.id);form.reset();Object.values(fields).forEach(f=>f.value='');contactErrors(false);setError('');selectService();renderStep();
 }
 function openDetail(service,source){const selected=byService(service);if(!selected)return;prepare(source);mode='detail';showcase.render(selected);flow.hidden=true;detail.hidden=false;dialog.classList.remove('is-booking-flow');dialog.setAttribute('aria-labelledby','service-detail-title');dialog.setAttribute('aria-describedby','service-detail-description');$('.sd-scroll').scrollTop=0;$('#service-detail-title').focus({preventScroll:true});}
 function close(){if(!dialog.open||closing)return;closing=true;generation++;abortLoad();sendAbort?.abort();showcase.clear();if(reduced.matches){dialog.close();return;}dialog.classList.add('is-closing');closeTimer=setTimeout(()=>dialog.close(),180);}
 document.addEventListener('click',event=>{
  const inspect=event.target.closest?.('[data-service-detail]');if(inspect){event.preventDefault();openDetail(inspect.dataset.serviceDetail,inspect);return;}
  const button=event.target.closest?.('[data-book]');if(!button)return;event.preventDefault();window.closeMenu?.();document.querySelector('#navigation')?.classList.remove('open');document.querySelector('.menu')?.setAttribute('aria-expanded','false');
  openBooking({service:button.hasAttribute('data-book-current')?showcase.current().id:button.dataset.service,source:button});
 });
 // Do not turn a horizontal service-card swipe into a detail/booking click.
 document.querySelectorAll('.service-panel').forEach(panel=>{let start=null,until=0;panel.addEventListener('pointerdown',e=>{start={x:e.clientX,y:e.clientY};},{passive:true});panel.addEventListener('pointerup',e=>{if(start&&Math.hypot(e.clientX-start.x,e.clientY-start.y)>12)until=performance.now()+400;start=null;},{passive:true});panel.addEventListener('pointercancel',()=>{start=null;until=performance.now()+400;},{passive:true});panel.addEventListener('click',e=>{if(performance.now()<until){e.preventDefault();e.stopImmediatePropagation();}},true);});
 $('.close').addEventListener('click',close);dialog.addEventListener('cancel',event=>{event.preventDefault();close();});
 let backdrop=false;function outside(e){const r=dialog.getBoundingClientRect();return e.target===dialog&&(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom);}
 dialog.addEventListener('pointerdown',e=>backdrop=outside(e));dialog.addEventListener('click',e=>{if(backdrop&&outside(e))close();backdrop=false;});
 dialog.addEventListener('close',()=>{generation++;abortLoad();sendAbort?.abort();clearTimeout(closeTimer);closing=false;sending=false;dialog.classList.remove('is-closing');unlock();state=C.draft();Object.values(fields).forEach(f=>f.value='');$('#booking-review').replaceChildren();$('#booking-contact-summary').textContent='';$('#booking-success-description').textContent='';$('#booking-demo-note').hidden=true;$('#booking-outcome').hidden=true;flow.classList.remove('is-booking-complete');$('.booking-heading').hidden=false;if(opener?.isConnected)opener.focus({preventScroll:true});});
 window.addEventListener('pagehide',()=>{if(dialog.open)dialog.close();unlock();});reduced.addEventListener?.('change',()=>{if(reduced.matches&&closing)dialog.close();});
 window.MaisonNacreBooking={open:openBooking,showService:openDetail,close,configure({availabilityProvider,submitBooking}={}){if(dialog.open)throw new Error('Close the modal before configuring booking.');if(availabilityProvider){if(typeof availabilityProvider.isDateAvailable!=='function'||typeof availabilityProvider.loadSlots!=='function')throw new Error('A valid provider is required.');provider=availabilityProvider;}submission.configure(submitBooking);}};
})();
