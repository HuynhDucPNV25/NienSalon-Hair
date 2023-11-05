const bookingDataUrl = "https://pnv-hair.onrender.com/Booking";
function getHairIdFromURL() {
  const urlParams = new URLSearchParams(window.location.search);
  const id = urlParams.get('message');
  const data = {
    customerName: urlParams.get('customerName'),
    phone: urlParams.get('phone'),
    nameHair: urlParams.get('nameHair'),
    priceHair: urlParams.get('priceHair'),
    address: urlParams.get('address'),
    time: urlParams.get('time'),
    date: urlParams.get('date'),
    messages: urlParams.get('messages'),
  };
  return { id, data };
}

const messengerBookings = document.querySelector("#messengerBookings");
const { id, data } = getHairIdFromURL();

if (id !== "Successful.") {
  messengerBookings.innerHTML = "Đặt lịch thất bại";
} else {
  const hasBooking = localStorage.getItem('a') === 'true';
  if (hasBooking) {
    axios.post(bookingDataUrl, data)
      .then(() => {
        messengerBookings.innerHTML = "Chúc mừng bạn đã đặt lịch thành công!!!";
        localStorage.removeItem('a');
      })
      .catch(() => {
        messengerBookings.innerHTML = "Đặt lịch thất bại";
      });
  } else {
    messengerBookings.innerHTML = "Chúc mừng bạn đã đặt lịch thành công!";
  }
}

console.log(getHairIdFromURL());
// Lấy ra phần tử container để thêm các phần tử HTML vào
const container = document.querySelector(".form-login");

// Tạo phần tử div chứa thông tin đặt lịch
const bookingInfoDiv = document.createElement("div");
bookingInfoDiv.classList.add("booking-info");

// Tạo và thêm các phần tử thông tin vào bookingInfoDiv
const customerNameEl = document.createElement("div");
customerNameEl.innerHTML = `
  <div class="row">
    <div class="col">
      <h6>Tên của bạn:</h6>
    </div>
    <div class="col">
      <h6>${data.customerName}</h6>
    </div>
  </div>
  <hr>
`;
bookingInfoDiv.appendChild(customerNameEl);

const phoneEl = document.createElement("div");
phoneEl.innerHTML = `
  <div class="row">
    <div class="col">
      <h6>Số điện thoại:</h6>
    </div>
    <div class="col">
      <h6>${data.phone}</h6>
    </div>
  </div>
  <hr>
`;
bookingInfoDiv.appendChild(phoneEl);

const hairNameEl = document.createElement("div");
hairNameEl.innerHTML = `
  <div class="row">
    <div class="col">
      <h6>Tên mẫu tóc:</h6>
    </div>
    <div class="col" style="display:left;">
      <h6 >${data.nameHair}</h6>
    </div>
  </div>
  <hr>
`;
bookingInfoDiv.appendChild(hairNameEl);

const timeEl = document.createElement("div");
timeEl.innerHTML = `
  <div class="row">
    <div class="col">
      <h6>Thời gian:</h6>
    </div>
    <div class="col">
      <h6>${data.date}</h6>
      <h6>${data.time}</h6>
    </div>
  </div>
  <hr>
`;
bookingInfoDiv.appendChild(timeEl);

const addressEl = document.createElement("div");
addressEl.innerHTML = `
  <div class="row">
    <div class="col">
      <h6>Địa điểm:</h6>
    </div>
    <div class="col">
      <h6>${data.address}</h6>
    </div>
  </div>
  <hr>
`;
bookingInfoDiv.appendChild(addressEl);

const totalEl = document.createElement("div");
totalEl.innerHTML = `
  <center>
    <div class="row">
      <div class="col">
        <h5>Tổng giá</h5>
        <h5>${data.priceHair} VNĐ</h5>
      </div>
    </div>
  </center>
`;
bookingInfoDiv.appendChild(totalEl);
// Thêm bookingInfoDiv vào container
container.appendChild(bookingInfoDiv)
