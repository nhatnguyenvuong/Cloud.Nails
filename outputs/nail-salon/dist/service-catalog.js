/* Existing service imagery and descriptions, shared by detail and booking views. */
(()=>{
  const image=(file,alt,width,height,position='50% 50%',zoom=1)=>({src:'assets/'+file,alt,width,height,position,zoom});
  const services=[
    {name:'Chăm sóc móng',description:'Chăm chút tỉ mỉ, tôn vẻ tự nhiên. Làm sạch, dưỡng ẩm và định hình móng theo đường nét của riêng bạn.',highlights:['Chăm sóc nhẹ nhàng','Phom móng tự nhiên','Hoàn thiện chỉn chu'],images:[image('hero-editorial.png','Bộ móng tự nhiên trên nền vải tối',1942,809,'61% 50%'),image('nude-reference.jpg','Sắc móng hồng da nhẹ nhàng',1200,675),image('craft-reference.jpg','Chi tiết thao tác chăm sóc móng',1200,800)]},
    {name:'Sơn Gel',description:'Sắc màu tinh tuyển, vẻ đẹp thanh tao. Chọn một tông màu bạn yêu, hoàn thiện bằng bề mặt bóng mịn và chỉn chu.',highlights:['Sắc màu tinh tuyển','Bề mặt bóng mịn','Tư vấn tông màu'],images:[image('oxblood-editorial.png','Bộ móng sơn gel màu đỏ trầm',1086,1448,'54% 54%'),image('oxblood-editorial.png','Cận cảnh sắc đỏ trầm và bề mặt gel',1086,1448,'60% 65%',1.3),image('nude-reference.jpg','Gợi ý sắc gel hồng da tự nhiên',1200,675)]},
    {name:'Nối móng',description:'Phom dáng thanh thoát, hài hòa với bạn. Tạo thêm độ dài và cân chỉnh đường nét theo phong cách bạn yêu thích.',highlights:['Tư vấn độ dài','Phom dáng hài hòa','Đường nét thanh thoát'],images:[image('service-extensions.png','Bộ móng nối thanh thoát với sắc nude',1024,1536,'50% 56%'),image('service-extensions.png','Cận cảnh phom dáng móng nối',1024,1536,'55% 69%',1.25),image('service-extensions.png','Chi tiết đầu móng và độ hoàn thiện',1024,1536,'40% 46%',1.3)]},
    {name:'Thiết kế',description:'Từ tối giản đến độc bản, mang dấu ấn riêng. Những điểm nhấn được cân nhắc để mỗi bộ móng là một cách thể hiện bạn.',highlights:['Cảm hứng riêng bạn','Chi tiết được cân nhắc','Phối màu hài hòa'],images:[image('service-nail-design.png','Thiết kế móng nude với đường nét ánh kim',1024,1536,'50% 60%'),image('service-nail-design.png','Cận cảnh chi tiết ánh kim trên móng',1024,1536,'55% 72%',1.3),image('service-nail-design.png','Bố cục đường nét trên bộ móng',1024,1536,'45% 44%',1.2)]},
    {name:'Nối/Uốn mi',description:'Tôn ánh nhìn bằng hàng mi cong mềm mại. Lựa chọn độ cong và độ nổi bật hài hòa với đường nét gương mặt.',highlights:['Tư vấn theo dáng mắt','Độ cong mềm mại','Vẻ đẹp tự nhiên'],images:[image('service-lashes.png','Ánh nhìn và hàng mi trong chân dung tông ấm',1024,1536,'50% 34%'),image('service-lashes.png','Cận cảnh ánh nhìn và hàng mi',1024,1536,'50% 28%',1.3),image('service-lashes.png','Góc chân dung với hàng mi mềm mại',1024,1536,'58% 42%',1.15)]}
  ];
  const ids=['nail-care','gel-polish','extensions','nail-art','lashes'];
  const panels=[...document.querySelectorAll('.service-panel')];
  services.forEach((service,i)=>{service.id=ids[i];service.summary=panels[i]?.querySelector('.service-copy p')?.textContent||service.description;});
  window.MaisonServices=services;
})();
