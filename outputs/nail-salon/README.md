# Cloud.Nails — trang mẫu chăm sóc móng

Mở dist/index.html bằng trình duyệt hiện đại. Không cần cài đặt hay biên dịch. Hình ảnh và phông chữ đã được lưu trong thư mục nên trang có thể mở khi không có mạng.

Nếu trang đang mở, nhấn Ctrl + R để tải lại phiên bản mới.

## Nội dung tiếng Việt
Toàn bộ nội dung hiển thị đã được Việt hóa, bao gồm tiêu đề, menu, dịch vụ, nút đặt lịch, mô tả ảnh, nhãn hỗ trợ đọc màn hình, biểu mẫu và thông báo của biểu mẫu. Tên thương hiệu và địa chỉ email mẫu được giữ nguyên.

Phông chữ đã được kiểm tra các ký tự tiếng Việt đang sử dụng. Khoảng cách dòng và kích thước tiêu đề được điều chỉnh để dành chỗ cho dấu tiếng Việt. Bộ chọn ngày gốc của trình duyệt có thể hiển thị theo ngôn ngữ cài đặt của trình duyệt hoặc hệ điều hành.

## Những nội dung cần thay trước khi sử dụng chính thức
- Tên thương hiệu mẫu, tiêu đề trang và thông tin giới thiệu.
- Mô tả 5 nhóm dịch vụ theo danh mục thực tế của tiệm.
- Địa chỉ, email, số điện thoại và giờ mở cửa mẫu.
- Đánh giá minh họa bằng nhận xét thật đã được khách đồng ý cho sử dụng.
- Ảnh AI và ảnh tham khảo bằng hình ảnh thực tế của tiệm mà bạn có quyền sử dụng.
- Biểu mẫu minh họa bằng hệ thống đặt lịch thật. Hiện không có dữ liệu nào được gửi hoặc lưu và không có lịch hẹn nào được đặt.
- Chỉ bỏ các nhãn nội dung mẫu sau khi đã cập nhật và kiểm tra đầy đủ.

## Các tệp chính
- dist/index.html: nội dung trang và biểu mẫu.
- dist/styles.css: bố cục, kiểu chữ và định dạng chung.
- dist/hero.css: ảnh nền toàn màn hình và menu phía trên ảnh.
- dist/vietnamese.css: điều chỉnh trình bày cho tiếng Việt.
- dist/services.css: 5 cột ảnh dịch vụ và dải vuốt ngang trên điện thoại.
- dist/sections.css: chiều cao mỗi phần, sticky và thứ tự xếp lớp.
- dist/stacking.js: nhận cử chỉ cuộn, khóa chuỗi quán tính, chuyển cảnh 900 ms và hỗ trợ bàn phím/cảm ứng; giữ phần nội dung dài có thể đọc hết.
- dist/gallery.css, dist/gallery.js: bố cục biên tập và masonry ở phần 3, tab lọc theo dịch vụ, chuyển động từng cột và khung xem ảnh lớn.
- dist/hands.css, dist/hands.js: hiệu ứng hai tay chạm nhau trong CTA đặt lịch tại phần 5.
- dist/testimonials.css, dist/testimonials.js: carousel lời nhận xét phối cảnh 3D điều khiển thủ công ở phần 4.
- dist/services.js: mở đầu Dịch vụ từ giữa ra hai bên, dùng trạng thái section hiện có.
- dist/script.js: menu, đặt lịch minh họa, tự chuyển ảnh hero và hiệu ứng.
- dist/assets/: ảnh, phông chữ và giấy phép phông chữ.
- ASSET-NOTES.md: nguồn ảnh và câu lệnh tạo ảnh gốc.
- ANIMATION-NOTES.md: tài nguyên bàn tay, trình tự chuyển động và ghi chú kiểm tra.

## Kiểm tra
Đã kiểm tra cú pháp JavaScript, đường dẫn tệp, liên kết trong trang, mã định danh duy nhất, tên dịch vụ khớp với biểu mẫu, ký tự tiếng Việt của phông chữ và chiều rộng tiêu đề tại các kích thước 320–1920 px. Đây là kiểm tra mã và tài nguyên; hiển thị thực tế trong trình duyệt chưa được xác minh vì công cụ trình duyệt của phiên này chặn địa chỉ file://.

## Phần dịch vụ 5 cột
Chăm sóc móng, Sơn Gel, Nối móng, Thiết kế và Nối/Uốn mi. Cụm nội dung ở góc trái dưới mỗi cột: số thứ tự 01–05, tên dịch vụ và nút mũi tên cùng một hàng, rồi đến mô tả ngắn bên dưới. Nút tròn mở biểu mẫu đặt lịch và chọn sẵn dịch vụ. Ảnh nền có lớp chuyển tối nhẹ giúp chữ dễ đọc. Không hiển thị giá hoặc thời lượng. Biểu mẫu đặt lịch sử dụng cùng 5 nhóm dịch vụ. Trên điện thoại, cuộn hoặc vuốt ngang để xem đủ các cột. Ảnh trong phần này là ảnh minh họa AI, cần thay bằng ảnh thực tế của tiệm trước khi sử dụng chính thức.

## Gallery và Dư âm còn mãi
Phần 3 có nội dung biên tập bên trái và masonry bên phải. Năm tab theo brief: Nail Art, Manicure, Gel Polish, Eyelash Extensions và Nail Care. Mỗi nhóm chỉ dùng ảnh minh họa liên quan và các góc cắt chi tiết từ bộ ảnh có sẵn; không có ảnh mới được tạo hoặc tải xuống. Mỗi nhóm giữ 12 ô cố định; số ảnh có sẵn lần lượt là 2, 6, 6, 3 và 4, các ô còn thiếu là placeholder không tương tác. Bộ ảnh gốc còn hạn chế, cần thay bằng portfolio thực tế trước khi sử dụng chính thức.

Ba cột với bốn ô nhỏ mỗi cột trên máy tính, hai cột với sáu ô mỗi cột trên điện thoại; khung ảnh giữ chiều cao khi đổi nhóm để tránh xô bố cục. Cả bốn mép có lớp fade cố định, phần ảnh có vùng dư lớn hơn biên độ con trỏ để không lộ khoảng trống. Nhãn số, dòng phụ và thông tin/icon trên ảnh khi hover đã được bỏ. Các lớp ảnh tay nền trong suốt không còn dùng trong Gallery; cảnh CTA tay vẫn giữ nguyên. Tab đang chọn được nhận diện bằng chữ sáng và một gạch mảnh. Đổi nhóm chờ ảnh giải mã rồi chuyển nhẹ; yêu cầu chọn mới nhất luôn được ưu tiên. Khi tải ảnh thất bại, bộ ảnh trước và nhãn đúng của nó được giữ lại, kèm thông báo thử lại.

Con trỏ dịch chuyển các cột nhẹ với biên độ tối đa 7 px ngang và 11 px dọc, khác nhau giữa các cột. Không nghiêng ảnh 3D; không tạo tràn ngang. Trên màn hình nhỏ, thiết bị cảm ứng hoặc khi giảm chuyển động, không chạy hiệu ứng theo con trỏ. Bấm/chạm ảnh để xem lớn; nút trước/sau chỉ duyệt trong nhóm đang chọn. Escape đóng khung và trả tiêu điểm. Trong danh mục dùng mũi tên lên/xuống và Home/End; trong nhóm ảnh dùng trái/phải và Enter. Phím danh mục không kích hoạt điều hướng section. Bộ điều khiển cuộn toàn trang không thay đổi.

Phần 4 “Dư âm còn mãi” dùng carousel phối cảnh 3D: tiêu đề và mô tả căn giữa, ảnh phủ kín 6 thẻ đánh giá mẫu. Thẻ trung tâm sáng và lớn hơn; thẻ hai bên lùi dần theo chiều sâu. Nút trước/sau, bấm thẻ bên cạnh, phím trái/phải, Home/End và vuốt ngang đổi thẻ; chỉ số và thanh tiến độ được cập nhật. Không tự chạy. Ảnh hiện có được tái dùng, lời nhận xét mẫu được rút gọn; ảnh không phải chân dung người đánh giá.

Phần 5 là CTA đặt lịch có hai bàn tay tiến lại gần, chạm nhau và lóe sáng nhẹ. Nút đặt lịch mở biểu mẫu hiện có; thông tin liên hệ vẫn được giữ. Hiệu ứng chạy một lần khi vào phần này rồi chuyển sang chuyển động rất chậm. Khi bật giảm chuyển động, cảnh tay hiển thị tĩnh và carousel đổi thẻ tức thì, không chạy hiệu ứng mở đầu. Cuộn dọc dùng sticky xếp lớp: phần mới trượt lên phủ phần trước; thao tác cuộn tự nhiên và không ép snap.

## Điều hướng từng section với hiệu ứng xếp lớp
Mỗi cử chỉ cuộn dọc kích hoạt một chuyển cảnh hoàn chỉnh trong 900 ms với đường cong cubic-bezier(0.76, 0, 0.24, 1). Sticky và thứ tự lớp giữ hiệu ứng section mới phủ lên section trước. Cuộn lên chạy ngược để lộ phần trước. Không cần cuộn thêm để hoàn tất chuyển cảnh; trong lúc chạy, yêu cầu chuyển tiếp mới không được xếp hàng.

Các sự kiện bánh xe được gom thành một cử chỉ, kết thúc sau khoảng yên 240 ms. Toàn bộ đuôi quán tính bị bỏ qua, kể cả khi chuyển cảnh đã hoàn tất. Đây là cách phân nhóm sự kiện vì trình duyệt không cung cấp ranh giới cử chỉ trackpad chính xác; cần kiểm tra cảm giác thực tế trên thiết bị trước khi dùng chính thức.

- Bàn phím: mũi tên lên/xuống, Page Up/Down, Space/Shift+Space; Home/End về đầu/cuối. Giữ phím không chuyển liên tiếp. Tiêu điểm bàn phím đến phần vừa mở.
- Cảm ứng: vuốt dọc để chuyển một phần; vuốt ngang vẫn dành cho dịch vụ/Gallery. Giữ thao tác đa điểm, các trường nhập và cử chỉ cạnh màn hình của trình duyệt.
- Nội dung dài hơn màn hình: từng cử chỉ đọc tiếp phần nội dung bên trong; cử chỉ mới tại mép mới chuyển section. Nội dung không bị cắt.
- Hộp thoại và vùng cuộn con giữ thao tác của chúng. Nút đặt lịch, ảnh phóng lớn, carousel lời nhận xét và liên kết trong trang vẫn hoạt động.
- Footer vẫn truy cập được. Kéo thanh cuộn hoặc một thao tác ngoài bộ điều khiển nếu dừng giữa hai section sẽ tự hoàn tất về điểm gần nhất sau khi thả.
- Giảm chuyển động: chuyển ngay đến điểm cuối; vẫn giữ khóa chuỗi quán tính.

Chỉ thay bộ điều hướng và CSS hỗ trợ. Kiểm tra mã cùng mô phỏng tương tác đã đạt, gồm hướng thuận/ngược, quán tính kéo dài, phím lặp, cảm ứng, hộp thoại, chiều cao thay đổi, liên kết, nội dung dài và giảm chuyển động. Chưa xác minh trực tiếp chuyển cảnh, thiết bị trackpad/cảm ứng hay hiển thị trong trình duyệt của phiên này.

Gallery tối giản: chỉ giữ tiêu đề, mô tả và 5 tab dịch vụ bên trái. Ảnh bên phải không có viền, chữ hoặc icon hover. Placeholder là ô màu trung tính, không tải URL thiếu và không mở khung ảnh lớn. Bộ xem ảnh chỉ duyệt ảnh có sẵn. Không tạo thêm ảnh mới.

Carousel testimonial: chuyển thẻ trong 760 ms. Lần đầu section hoạt động, sau khi chuyển cảnh xếp lớp hoàn tất: nền tối 0–90 ms; bụi vàng hiện từ 90 ms đến 540 ms và ảnh nền sáng dần đến 690 ms; thẻ giữa hiện ở 560 ms, thẻ hai bên theo nhịp 70 ms; tiêu đề hiện từ 830 ms, điều khiển cuối cùng từ 1050 ms. Toàn cảnh hoàn tất ở 1300 ms. Chỉ chạy một lần, không tự đổi thẻ. Phím/focus hoặc chọn thẻ có thể bỏ qua mở đầu. Rời section giữa chừng sẽ hoàn tất bố cục ngay để khi quay lại vẫn dùng được. Giữ nguyên bố cục và phối cảnh trên máy tính/điện thoại.

Nền testimonial dùng trực tiếp ảnh bụi vàng do người dùng cung cấp (assets/testimonial-gold-dust.png), phủ kín khung trên nền #080706. Ảnh sáng dần từ tối, kết hợp Canvas bụi trôi nhẹ và ánh sáng thay đổi rất ít trong chu kỳ 18 giây. Không tạo thêm ảnh. Giữ tối vùng chữ và góc khung; lớp nền không nhận chuột. Bụi dừng khi section không hoạt động hoặc tab bị ẩn; mật độ và độ phân giải giảm trên điện thoại. Khi bật giảm chuyển động, bố cục hiện ngay và nền giữ tĩnh. Không đổi UI, carousel hoặc điều hướng toàn trang.

Bấm/chạm phần đang lộ ra của thẻ testimonial hai bên hoặc ngoài rìa sẽ đưa đúng thẻ đó vào giữa. Vùng nhận click được tính theo phối cảnh hiện tại và ưu tiên thẻ nằm trên cùng, tránh mặt phẳng 3D chặn thẻ phía sau. Nút trước/sau, bàn phím và vuốt ngang vẫn giữ nguyên; click phát sinh sau vuốt được bỏ qua để không đổi thẻ hai lần. Đã kiểm tra cú pháp và mô phỏng các đường tương tác này; chưa xác minh trực tiếp trong trình duyệt.

Hiệu ứng nền và mở đầu đã qua kiểm tra mã và mô phỏng: đúng thời điểm section hoạt động, nhịp 1,3 giây, không phát lại, rời/quay lại, đổi giảm chuyển động, mật độ bụi/DPR, dừng/tiếp tục và dọn tài nguyên. Các kiểm tra carousel và điều hướng toàn trang cũng đạt. Đây chưa phải xác minh hình ảnh hoặc hiệu năng trực tiếp trong trình duyệt.

Gallery: tiêu đề giữ thành hai dòng “Một dấu ấn.” / “Rất riêng bạn.”, cỡ chữ theo chiều rộng cột để không rơi riêng chữ “bạn.”. Trên điện thoại, tiêu đề chiếm trọn chiều rộng phía trên mô tả và tab. Bento tăng từ 6 lên 12 ô với tỷ lệ cao/thấp khác nhau; ảnh cũ giữ nguyên, ô mới là placeholder không tương tác, không tạo thêm ảnh. Hai mép trái/phải fade về đúng màu nền, cố định ngoài lớp ảnh dịch chuyển. Bộ lọc dịch vụ, bấm mở ảnh lớn và cursor-follow giữ nguyên mã xử lý. Đã kiểm tra logic, dữ liệu và kích thước chữ bằng phông thực tế; chưa xác minh hiển thị trực tiếp trong trình duyệt.

CTA hai bàn tay: tăng tốc mở đầu, hai tay tiến lại trong 1,2 giây, chạm ở 1,08 giây; tiêu đề hiện từ 1,16 giây và toàn bộ nút/thông tin liên hệ hiện xong ở 1,76 giây (trước đây khoảng 5,25 giây). Vẫn giữ nhịp chuyển động thở chậm. Đã bỏ nhãn “04 / HẸN MỘT KHOẢNH KHẮC RIÊNG” và phần ghi chú mẫu/ảnh AI dưới thông tin liên hệ theo yêu cầu. Giữ nguyên nút đặt lịch, nội dung liên hệ và tài nguyên tay. Kiểm tra logic hiện có đã đạt; chưa xác minh hiển thị trực tiếp trên trình duyệt.

Heading chính dưới hero: Gallery, testimonial và CTA dùng chung Cormorant Garamond 300, chữ chính đứng màu ngà và cụm nhấn nghiêng màu champagne #d8b995, line-height 1,15 và letter-spacing -0,025em. Cỡ chữ cùng thang 36–64 px trên desktop và 32–50 px trên điện thoại, thay đổi theo chiều rộng màn hình. Dùng cùng kiểu nhấn cho “Rất riêng bạn.”, “còn mãi.” và “cho chính mình.”; giữ nguyên scale và weight của cả heading. Giữ nguyên căn lề và ngắt dòng từng section, cùng tiêu đề ẩn của Dịch vụ và tiêu đề phụ trong các thẻ. Hero, biểu mẫu và animation không đổi. Đã đo các dòng heading bằng phông thực tế ở 320–2560 px; chưa xác minh trực tiếp trong trình duyệt.

Hero: đã bỏ cụm ảnh/liên kết “Khám phá dịch vụ” ở góc trái dưới, lời nhắn ở góc phải dưới và ghi chú ảnh AI theo vùng người dùng đánh dấu. Không thay đổi ảnh nền, heading, đặt lịch, menu hoặc bộ chọn ảnh.

Hero không còn chú thích cuộn hoặc đường dọc động ở giữa cạnh dưới.

Hero hiện tại: ba dòng “Nét / tinh tế / của bạn” căn trái, không có dấu chấm cuối. Heading và hàng subtext/nút dùng chung một track; nút đặt lịch bên trái và subtext bên phải cùng hàng, giãn hai đầu. Trên điện thoại, track chiếm chiều rộng cột nội dung và nút/chữ thu gọn để vẫn cùng hàng. Ảnh nền đổi mỗi 8 giây, chuyển mờ 1,8 giây; giữ cơ chế tải ảnh an toàn và dừng khi hero không hoạt động, tab ẩn, mở menu/hộp thoại hoặc bật giảm chuyển động. Messenger/Zalo chỉ có icon, xếp dọc ở góc phải dưới hero. Vẫn có nhãn hỗ trợ đọc màn hình và tooltip. Trên điện thoại chừa một dải bên phải để các icon không đè lên chữ. Zalo mở https://zalo.me/0933303282 theo số người dùng cung cấp. Messenger là nút chờ cập nhật, chưa hoạt động vì chưa có link trang. Không thay các section khác hoặc điều hướng xếp lớp.

Đã kiểm tra cú pháp, chu kỳ tự đổi nền mới, các điều kiện dừng/tiếp tục và độ vừa của hàng chữ/nút ở 320–2560 px bằng phông thực tế; chưa xác minh trực tiếp trong trình duyệt.

Bố cục hero thử nghiệm: cụm kicker/heading/hàng đặt lịch-subtext hạ về phía dưới bằng flex-end trong luồng bố cục. Icon liên hệ ở góc phải dưới; chú thích cuộn đã được bỏ. Có khoảng đệm cho nội dung không đè lên chú thích, khoảng an toàn trên điện thoại và phần menu đầu trang. Hero vẫn có thể cao hơn màn hình khi cần để tránh cắt nội dung. Chỉ đổi CSS định vị hero.

Căn đáy hero: hàng đặt lịch/subtext, chú thích cuộn và cụm social dùng chung biến khoảng cách đáy --hero-bottom trên desktop. Loại bỏ khoảng đệm 100–150 px trước đây làm nút đặt lịch cao hơn các cụm còn lại; hero-copy dùng block grid để tránh khoảng trống baseline của inline-grid. Dưới 1100 px, hàng nội dung được đặt phía trên vùng footer 88 px để không đè chú thích ở giữa; hai cụm footer vẫn chung mốc đáy, có safe-area trên điện thoại.

Cập nhật khoảng đệm hero: đã bỏ “Cuộn để xem thêm” cùng đường dọc động. Tăng chung khoảng cách đáy thêm 16 px cho cụm nội dung và icon liên hệ: 40–56 px trên desktop, tối thiểu 36 px cộng safe-area phù hợp trên điện thoại. Giữ cách chia hàng ở màn hình nhỏ và toàn bộ tính năng nền/đặt lịch.

Quy tắc phông chữ hiện tại: dưới 20 px dùng --body (Arial, Helvetica, sans-serif); từ 20 px dùng --display (Cormorant Garamond). Giữ nguyên kích cỡ theo vai trò. Lời nhận xét dùng Arial khi cỡ 18–19,99 px và Cormorant khi đạt 20–24 px; trên điện thoại cỡ 19 px dùng Arial. Tên khách 20 px dùng Cormorant trên desktop, 19 px dùng Arial trên mobile. Tab Gallery đổi sang Arial khi cỡ responsive xuống dưới 20 px; chú thích ảnh lớn và tagline 20 px dùng phông chính. Mô tả, nhãn và chỉ số dưới 20 px giữ sans-serif. Icon dạng ký hiệu không đổi. Heading và thương hiệu giữ nguyên. Đã kiểm tra điểm chuyển phông và độ vừa của nội dung bằng phông thực tế; chưa xác minh trực tiếp trong trình duyệt.

Gallery mở đầu: lần đầu phần này trở thành scene đang xem, sau khi chuyển cảnh xếp lớp hoàn tất, chạy nhịp 1,7 giây: nền tối/heading hiện → thẻ ở cột giữa hiện trước → hai cột bên cùng từng thẻ lần lượt hiện → tab và gạch chỉ báo xuất hiện → ánh nền dịu xuống. Chỉ chạy một lần; cuộn đi, chọn tab, chạm hoặc đưa focus vào nội dung sẽ hoàn tất ngay. Cursor-follow bị chặn trong phần mở đầu, sau đó tiếp tục bằng cách tính cũ; animation chỉ tác động thẻ, không tác động các cột parallax. Ảnh hiện tại được tải/giải mã trước khi mở, với thời gian chờ khi vào scene tối đa 100 ms; nếu chưa sẵn sàng thì bỏ qua reveal để không giữ giao diện tối. Không thay ảnh, placeholder, nội dung, font, bố cục hoặc điều hướng toàn trang. Giảm chuyển động hiển thị toàn bộ ngay. Kiểm tra mô phỏng trình tự, tải ảnh, chuyển tab/xem ảnh lớn, ngắt giữa chừng và điều hướng toàn trang đã đạt; chưa xác minh trực tiếp trong trình duyệt.

Mở đầu Dịch vụ: lần đầu section hoạt động, hiệu ứng bắt đầu ngay, bỏ khoảng chờ nền tối 300 ms. Cột giữa bắt đầu ở 0 ms, hai cột kề ở 70 ms, hai cột ngoài ở 140 ms; reveal ảnh kéo dài 1200 ms. Chữ bắt đầu từ 120 ms, nút từ 400 ms, cùng stagger 70 ms và fade dài hơn. Ánh champagne lướt từ đầu trong 1400 ms; toàn cảnh hoàn tất ở 1600 ms. Giữ nguyên kích thước, ảnh, hover, cách kích hoạt theo section và khả năng bỏ qua khi tương tác/cuộn đi. Giảm chuyển động hiện toàn bộ ngay. Kiểm tra trình tự mới và các trường hợp ngắt/dừng đã đạt; chưa xác minh trực tiếp trong trình duyệt.

CTA hai bàn tay đã đổi bộ móng theo hai ảnh tham khảo: tay trái là nền ánh tím/lavender cùng nét vàng nổi; tay phải là hồng nude/French trắng, sao vàng nhỏ và móng nhấn vàng tạo hình. Hai ảnh vẫn là layer nền trong suốt riêng biệt; đã cập nhật điểm chạm đầu móng để giữ hiệu ứng chạm sáng. Không đổi nội dung, bố cục hoặc timing animation. Ảnh cũ vẫn được giữ làm bản dự phòng; prompt cuối và ghi chú kiểm tra nằm trong HAND-EDIT-NOTES.md.

CTA: giữ nguyên tay trái ánh tím/vàng đã duyệt; tay phải đổi sang mẫu nâu đen bóng, họa tiết mặt trời/đường nét vàng, viền vàng nổi trên nền nude và móng nhấn vàng theo ảnh tham khảo mới. Đã căn lại đầu móng trỏ, giữ nguyên animation chạm sáng. Ảnh mới: dist/assets/creation-right-celestial-gold.png; prompt trong HAND-EDIT-NOTES.md.

CTA: sửa lỗi phối cảnh mặt móng tay phải bị xoay ra chính diện. Bản mới thu mặt móng trỏ và ngón cong xuống về góc nghiêng theo tư thế tay gốc; họa tiết vàng bị thu ngắn tự nhiên theo mặt móng. Giữ tay trái và toàn bộ animation. Ảnh: dist/assets/creation-right-celestial-profile.png; prompt và ghi chú trong HAND-EDIT-NOTES.md.

CTA: tay phải đổi sang nền nude/trắng sữa, nét vàng mảnh và điểm ngọc trai nhỏ theo ảnh tham khảo mới. Giữ mặt móng nghiêng thon, không dùng mặt móng tối phình rộng. Tay trái ánh tím/vàng và toàn bộ animation giữ nguyên. Ảnh mới: dist/assets/creation-right-nude-pearl-slim.png; prompt và ghi chú kiểm tra trong HAND-EDIT-NOTES.md.

Gallery: tên năm tab đã đồng bộ tiếng Việt theo Dịch vụ: Chăm sóc móng, Sơn Gel, Nối móng, Thiết kế, Nối/Uốn mi. Giữ thứ tự tab hiện có, khóa bộ lọc, toàn bộ ảnh và tương tác. Nhãn danh mục trong dữ liệu và thông báo hỗ trợ đọc màn hình cũng được cập nhật.

CTA: đã thay hai tay bằng đúng file PNG nền trong suốt người dùng cung cấp (Baroque bên trái, Gilded/Pearl bên phải). File được sao chép nguyên bản, kiểm tra SHA-256 trùng nguồn; không chỉnh sửa chi tiết tay, móng, màu sắc hoặc trang sức. Chỉ căn tỷ lệ hiển thị và điểm chạm bằng CSS/JS, giữ hiệu ứng hiện tại. Chi tiết: HAND-EDIT-NOTES.md.

CTA: giảm riêng tay phải 20% (hệ số hiển thị 0.55 → 0.44) để cân với tay trái. Giữ nguyên file ảnh và chi tiết, tay trái, điểm chạm và animation.

CTA: xử lý mép tay áo bị lộ sau khi thu nhỏ tay phải. Giữ kích thước tay hiện tại; cụm tay và điểm chạm tự dịch nhẹ sang phải trên màn hình rộng để giấu mép ảnh. Mép vải cắt ngang phía dưới được làm mềm bằng SVG mask; file PNG gốc giữ nguyên. Các section khác và timing animation không đổi.

CTA — sửa lỗi mất ảnh: gỡ mask SVG ngoài và cơ chế dịch tâm. Hai tay trở về vị trí cũ; giữ size trái 0.55/phải 0.44, file PNG gốc và timing. Vòng tròn về tâm, có width/height bằng nhau. Mép tay áo phải chỉ dùng gradient CSS trực tiếp. Tham chiếu CSS/JS có phiên bản để tránh giữ bản mask cũ. Chưa xác minh trực tiếp trong trình duyệt.

CTA hiện tại: tay phải trả về size gốc (0.55); phóng tay trái thêm 25% (0.55 → 0.6875). Đã bỏ hoàn toàn mask/làm mờ mép, giữ file ảnh gốc, điểm chạm giữa màn hình và graphic tròn. Các section khác không đổi.

CTA: tay phải dùng file nối dài “Ornate Hand with Gilded Sleeve 1.png”, được sao chép nguyên bản vào dist/assets/creation-right-provided-extended.png. Tay trái giữ nguyên. Đã căn kích thước phần bàn tay theo bản hiện tại và điểm chạm giữa; không dùng mask/làm mờ. Mép cắt của ảnh mới nằm ngoài khung theo kiểm tra tọa độ ở tám tỷ lệ màn hình.

CTA: giảm nhẹ tay phải nối dài khoảng 6.3% (hệ số 0.79 → 0.74) để cân với tay trái. Tay trái 0.6875, file ảnh và điểm chạm giữ nguyên.

## Hero — mở đầu cinematic
Đã thêm animation mở đầu khoảng 2 giây: nền đen ngắn → ảnh/ánh amber/bụi vàng thưa → eyebrow → reveal từng dòng headline → subtext/CTA. Sau đó chữ đứng yên, ảnh trở về bố cục gốc; ánh nền và cursor-follow rất nhẹ. Chỉ chạy một lần mỗi lần tải trang từ đầu; tương tác hoặc rời section sẽ hiện đầy đủ ngay. Giảm chuyển động bỏ qua hiệu ứng. Không thêm thư viện, không đổi nội dung, layout, typography, hình ảnh, điều hướng hay các section khác. Chi tiết và giới hạn kiểm tra: HERO-ANIMATION-NOTES.md. Chưa xác minh hiển thị trực tiếp trong trình duyệt.

Typography hiện tại: Arial được thay bằng Gilroy cho chữ sans-serif/UI. Website đã kèm SVN-Gilroy Light/Regular/Bold có dấu tiếng Việt; subtext mảnh dùng Light 300. Tiêu đề Cormorant, kích cỡ, khoảng cách và animation giữ nguyên. Chi tiết: TYPOGRAPHY-NOTES.md.

CTA: thay riêng tay phải bằng PNG gốc “Golden Elegance_ Pointing Hand and Draped Sleeve.png”, giữ nguyên chi tiết ảnh. Căn đầu ngón tại (45,146), hệ số 0.62 để giữ kích thước bàn tay tương đương bản trước; tay trái và animation không đổi.

## Chi tiết dịch vụ
Hộp đặt lịch hiện có được nâng cấp thành modal editorial dùng chung cho 5 dịch vụ: ảnh lớn và thumbnail chuyển mờ, nội dung riêng, tab và form ngày/giờ/họ tên/điện thoại. Click toàn thẻ hoặc nút mũi tên để mở; Escape, nút đóng hoặc nền tối để thoát. Giữ hiệu ứng thẻ và điều hướng theo section. Form vẫn chỉ xem trước, chưa gửi dữ liệu hay xác nhận lịch thật. Chi tiết kiểm tra và giới hạn: SERVICE-DETAIL-NOTES.md.

Modal dịch vụ: ảnh chính giãn đầy chiều cao cột trái trên desktop, giữ thumbnail; đã bỏ tab và nội dung tab. Thêm nút phụ “Liên hệ Zalo” cùng hàng với “Đặt lịch hẹn”, dẫn tới Zalo 0933303282.

Modal: Zalo bên trái, Đặt lịch hẹn bên phải. Thêm nút ảnh trước/sau trên ảnh lớn, chuyển vòng qua bộ ảnh hiện có và giữ chuyển mờ.

Dropdown dịch vụ và giờ hẹn: giao diện tùy chỉnh cùng nền tối, viền champagne và Gilroy. Giữ select gốc để kiểm tra và nhận giá trị; hỗ trợ bàn phím, gõ để tìm, cảm ứng, đóng danh sách trước bằng Escape, tự mở lên trên khi thiếu chỗ. Không thêm thư viện.

Lịch chọn ngày: thay popup lịch của trình duyệt bằng lịch tiếng Việt cùng nền tối, Gilroy và champagne. Hỗ trợ đổi tháng, Hôm nay/Xóa ngày, bàn phím, ngày tối thiểu, báo lỗi và đóng lịch trước modal bằng Escape. Giữ input ngày gốc để lưu giá trị và kiểm tra form.

## Bộ nút dùng chung
Toàn bộ nút được đồng bộ qua dist/buttons.css: primary champagne, secondary viền mảnh, icon vuông 44px, cùng Gilroy và quy tắc hover/pressed/focus/disabled. Các tab editorial và nút ảnh dùng biến thể phù hợp, giữ bố cục hiện tại. Dropdown/lịch có cùng trạng thái chọn, lỗi và focus. Mã chức năng, ảnh, scrolling và animation không đổi. Thông số: BUTTON-SYSTEM.md.

Nút chỉ có icon (điều hướng, trước/sau, đóng, mạng xã hội) dùng hình tròn 44px qua --button-icon-radius:50%; các thông số và chức năng khác giữ nguyên.

Thông tin tiệm theo ảnh người dùng: 90 Võ Trứ, Phường Chánh Hưng, TP. Hồ Chí Minh; giờ mở cửa 08:00–20:00; điện thoại 0933 303 282. Giờ mong muốn trong form đồng bộ từ 08:00 đến 20:00, vẫn cần tiệm xác nhận. Không bổ sung giả định về ngày hoạt động.

Tagline Gallery và Testimonials dùng chung section-tag: Gilroy 400, 10px desktop/9px mobile, chữ hoa, tracking và màu giống nhau; cùng gạch champagne mảnh 50px/42px. Giữ căn trái Gallery và căn giữa Testimonials.

## Footer mới
Footer 4 cột theo ảnh tham khảo: thương hiệu, dịch vụ, khám phá và liên hệ; nền espresso tối, viền champagne, nét lụa SVG tĩnh rất nhẹ. Dịch vụ mở modal tương ứng; liên kết điều hướng, Zalo, gọi điện và về đầu trang đều dùng luồng hiện có. Giữ đúng địa chỉ/giờ/số điện thoại mới. Responsive 2 cột tablet và bố cục gọn trên mobile, chừa khoảng cho thanh đặt lịch cố định. Xem FOOTER-NOTES.md để biết phạm vi và giới hạn kiểm tra.

Footer: bỏ hoa văn nền, giữ nền espresso sạch. Tagline cuối footer căn đúng tâm nhờ hai cột biên bằng nhau trên desktop và hàng rộng căn giữa trên tablet/mobile.

## Đặt lịch 4 bước dùng chung
Một modal cho tất cả CTA: chọn dịch vụ → ngày/giờ → thông tin → kiểm tra. CTA chung không tự chọn dịch vụ; CTA theo dịch vụ chọn sẵn đúng nội dung. Bấm ảnh thẻ dịch vụ để xem chi tiết; nút mũi tên và CTA đặt lịch mở luồng dùng chung. Từ chi tiết sang đặt lịch chỉ thay nội dung trong cùng hộp thoại. Có thể quay lại mà không mất dữ liệu.

Lịch/giờ được ghi rõ là dữ liệu mẫu. Chưa có backend: bước cuối chỉ tạo bản xem trước, không báo đã gửi thật. Kiến trúc đã có điểm nối lịch và nhận yêu cầu thật; xem BOOKING-FLOW-NOTES.md. Các luồng được kiểm tra logic và kiểm tra nguồn; chưa xác minh trực tiếp trong trình duyệt vì giới hạn truy cập cục bộ của phiên.

## Luồng nhận thông tin đặt lịch hiện tại
Mở toàn bộ giờ 08:00–20:00, không giả lập giờ bận hoặc kiểm tra lịch trống thời gian thực. Các nút có cùng chiều cao 48px, ôm nội dung và căn về hai đầu. Đã bỏ các nhãn minh họa/bản mẫu, email giả và nhãn thương hiệu mẫu trên giao diện. Bước cuối tổng hợp nội dung để khách sao chép và gửi qua Zalo; chỉ báo “đã gửi” nếu có bộ nhận yêu cầu thật xác nhận tiếp nhận. Xem BOOKING-FLOW-NOTES.md.

Modal đặt lịch giữ cố định chiều cao giữa các bước, nội dung dài cuộn bên trong. Giờ hẹn thành một cột gồm sáu khoảng 2 tiếng từ 08:00–10:00 đến 18:00–20:00; giữ đầy đủ khoảng giờ trong phần kiểm tra và nội dung gửi Zalo.

Hàng nút của các bước đặt lịch được neo ở đáy khung; nội dung từng bước cuộn độc lập. Ảnh lấp đầy chiều cao cột trên desktop, thu gọn trên mobile; khoảng cách dưới mô tả được đồng bộ. Việc chuyển bước và di chuyển bằng bàn phím chỉ cuộn vùng nội dung.

## Màn hình hoàn tất và kết nối email sau này
Sau bước xác nhận, modal hiện dấu tick champagne, “Cảm ơn bạn.” và nút “Hoàn tất”. Đã bỏ phần tóm tắt sao chép và thao tác clipboard. Hiện tại đây là trải nghiệm frontend, màn hình ghi rõ chưa gửi thông tin thực tế. Logic gửi được tách ở booking-submission.js; chỉ hiện thông báo đã gửi khi backend cấu hình sau này trả về xác nhận tiếp nhận thành công. Gửi lỗi giữ dữ liệu để thử lại. Xem BOOKING-INTEGRATION.md.

Subtext ở Bộ sưu tập và Lời khách chia sẻ dùng chung cỡ chữ 14px trên desktop/mobile; giữ nguyên Gilroy, độ mảnh và cách căn chữ hiện tại.

Thương hiệu hiện tại: Cloud.Nails. Đã cập nhật wordmark header/footer, tiêu đề trang, mô tả tìm kiếm, nhãn truy cập và nội dung modal. Giữ nguyên các tên API nội bộ để không làm hỏng điểm kết nối đặt lịch.
