/* Transport boundary: demo by default; a backend must explicitly acknowledge receipt.
   Configure via MaisonNacreBooking.configure({submitBooking: async (payload,{signal}) => ...}).
   Keep email recipients, provider credentials and delivery logic on the server. */
(function(root,factory){const api=factory();if(typeof module==='object'&&module.exports)module.exports=api;else root.MaisonBookingSubmission=api;})(globalThis,()=>{
 function aborted(signal){if(signal?.aborted){const error=new Error('Aborted');error.name='AbortError';throw error;}}
 function buildPayload(draft,service){return Object.freeze({serviceId:service.id,serviceName:service.name,date:draft.date,time:draft.time,name:draft.name.trim(),phone:draft.phone.trim(),notes:draft.notes.trim()});}
 function create(){
  let transport=null;
  return{
   configure(handler){if(handler!=null&&typeof handler!=='function')throw new TypeError('submitBooking must be a function.');transport=handler||null;},
   isConnected(){return typeof transport==='function';},
   async submit(payload,{signal}={}){
    aborted(signal);const handler=transport;
    // A frontend demonstration never performs a request or claims delivery.
    if(!handler)return{mode:'demo',requestReceived:false};
    const receipt=await handler({...payload},{signal});aborted(signal);
    if(receipt?.requestReceived!==true)throw new Error('Booking request was not acknowledged.');
    return{mode:'live',requestReceived:true};
   }
  };
 }
 return{create,buildPayload};
});
