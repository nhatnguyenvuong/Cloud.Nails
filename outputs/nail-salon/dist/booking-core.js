/* Shared state/validation and a replaceable preferred-time request provider. */
(function(root,factory){const api=factory();if(typeof module==='object'&&module.exports)module.exports=api;else root.MaisonBookingCore=api;})(globalThis,()=>{
 const day=(y,m,d)=>new Date(y,m,d,12);
 const today=(now=new Date())=>day(now.getFullYear(),now.getMonth(),now.getDate());
 const iso=d=>`${String(d.getFullYear()).padStart(4,'0')}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`;
 function parse(value){const p=/^(\d{4})-(\d{2})-(\d{2})$/.exec(value||'');if(!p)return null;const d=day(+p[1],+p[2]-1,+p[3]);return iso(d)===value?d:null;}
 function shiftMonth(d,n){const first=day(d.getFullYear(),d.getMonth()+n,1);return day(first.getFullYear(),first.getMonth(),Math.min(d.getDate(),day(first.getFullYear(),first.getMonth()+1,0).getDate()));}
 // Canonical ranges retain both endpoints; single times remain valid for custom providers.
 function validTime(value){
  if(typeof value!=='string')return false;
  const p=/^((?:[01]\d|2[0-3]):[0-5]\d)(?:-((?:[01]\d|2[0-3]):[0-5]\d))?$/.exec(value);
  return !!p&&(!p[2]||p[1]<p[2]);
 }
 const formatTime=value=>validTime(value)?value.replace('-', ' – '):'';
 const draft=serviceId=>({step:0,serviceId:serviceId||null,date:'',time:'',name:'',phone:'',notes:''});
 function errors(state,services,now=new Date()){
  const e={};if(!services.some(s=>s.id===state.serviceId))e.service='Vui lòng chọn một dịch vụ.';
  if(!parse(state.date)||state.date<iso(today(now)))e.date='Vui lòng chọn một ngày hẹn hợp lệ.';
  if(!validTime(state.time))e.time='Vui lòng chọn một khung giờ.';
  if(state.name.trim().length<2||state.name.length>100)e.name='Vui lòng nhập họ và tên (ít nhất 2 ký tự).';
  if(!/^[+\d() .-]+$/.test(state.phone)||!/^\d{9,15}$/.test(state.phone.replace(/\D/g,'')))e.phone='Vui lòng nhập số điện thoại hợp lệ (9–15 chữ số).';
  if(state.notes.length>500)e.notes='Ghi chú tối đa 500 ký tự.';return e;
 }
 function slots(date,now=new Date()){
  if(!parse(date))return[];
  return Array.from({length:6},(_,i)=>({value:String(8+i*2).padStart(2,'0')+':00-'+String(10+i*2).padStart(2,'0')+':00',available:date>=iso(today(now))}));
 }
 const requestAvailability={mode:'request',isDateAvailable(date){return !!parse(date)&&date>=iso(today());},async loadSlots({date,signal}){if(signal?.aborted)throw new Error('Aborted');return slots(date);}};
 return{day,today,iso,parse,shiftMonth,draft,errors,requestAvailability,slots,validTime,formatTime};
});
