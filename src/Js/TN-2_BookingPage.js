// const hairDataUrl = "https://pnv-hair.onrender.com/Hairs";
const hairDataUrl= "http://localhost:4002/Hairs";
const bookingDataUrl = "http://localhost:4002/Booking";
// Lấy id trên url.
function getHairIdFromURL() {
  const urlParams = new URLSearchParams(window.location.search);
  const id = urlParams.get('id');
  return parseInt(id);
}

// Sử dụng id lấy được để thực hiện các thay đổi và truy vấn dữ liệu tương ứng
const currentHairId = getHairIdFromURL();
console.log(currentHairId);

// Lấy dữ liệu từ mock API
async function getData() {
  try {
    const response = await axios.get(`${hairDataUrl}/${currentHairId}`);
    // Tìm mẫu tóc hiện tại dựa trên id
    const currentHair = response.data;

    if (currentHair) {
      const nameInput = document.querySelector('#NameHair');
      const priceInput = document.querySelector('#price');
      const addressInput = document.querySelector('#address');

      nameInput.value = currentHair.name;
      priceInput.value = `${currentHair.price}`+" VNĐ";
      addressInput.value = currentHair.address;
    } else {
      // Hiển thị thông báo khi không tìm thấy mẫu tóc
    }
  } catch (error) {
    console.log(error);
  }
}

getData();

// Kiểm tra dữ liệu người dùng nhập vào trước khi đẩy lên API
function validateData() {
  const customerName = document.querySelector('#customerName').value;
  const phoneNumber = document.querySelector('#phoneNumber').value;
  const timeSelect = document.querySelector('#time-select').value;
  const date = document.querySelector('#date').value;

  if (!customerName || !phoneNumber || !timeSelect || !date) {
    // Hiển thị thông báo lỗi nếu các trường bắt buộc không được nhập
    alert("Vui lòng nhập đầy đủ thông tin bắt buộc");
    return false;
  }
  // Kiểm tra định dạng số điện thoại
  const phoneRegex = /^\d{10}$/;
  if (!phoneRegex.test(phoneNumber)) {
    alert("Số điện thoại không hợp lệ, vui lòng nhập lại");
    return false;
  }
   // Kiểm tra  đặt lịch Nhờ anh Thành chỉ bảo haha
//   if ("") {
//     const option = document.querySelector(`#time-select option[value="${timeSelect}"]`);
//     option.disabled = true;
//     option.style.backgroundColor = "red";
//     alert("Thời gian này đã đặt đủ số lượng, vui lòng chọn thời gian khác");
//     return false;
// } else {
//     const option = document.querySelector(`#time-select option[value="${timeSelect}"]`);
//     option.disabled = false;
//     option.style.backgroundColor = "";
// }

  // Nếu dữ liệu hợp lệ, trả về true để thực hiện đẩy lên API
  return true;
}

// Gọi hàm validateData trước khi đẩy dữ liệu lên API
async function submitBooking() {
  try {
    if (!validateData()) {
      return;
    }
    
    const NameHair = document.querySelector('#NameHair').value;
    const PriceHair = document.querySelector('#price').value;
    const AddressHair = document.querySelector('#address').value;
    const customerName = document.querySelector('#customerName').value;
    const phoneNumber = document.querySelector('#phoneNumber').value;
    const timeSelect = document.querySelector('#time-select').value;
    const date = document.querySelector('#date').value;
    const message = document.querySelector('#message-text').value;
    const price = parseFloat(PriceHair);
    const data = {
      
      customerName,
      phone: phoneNumber,
      nameHair: NameHair,
      priceHair: price,
      address: AddressHair,
      time: timeSelect,
      date: date,
      message: message,
    };
    
    const messagee = `
    Đặt lịch thành công!\n\n
    Tên khách hàng: ${customerName}\n
    Số điện thoại: ${phoneNumber}\n
    Địa chỉ: ${AddressHair}\n
    Tên mẫu tóc: ${NameHair}\n
    Giá: ${PriceHair}\n
    Thời gian: ${timeSelect}\n
    Ngày: ${date}`;
    alert(messagee);
    const response = await axios.post(bookingDataUrl, data);
  } catch (error) {
    console.log(error);
  }
}
