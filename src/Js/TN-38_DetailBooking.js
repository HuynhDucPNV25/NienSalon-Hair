// const bookingDataUrl = "http://localhost:4002/Booking";
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
        messengerBookings.innerHTML = "Chúc mừng bạn đã đặt lịch thành công";
        localStorage.removeItem('a');
      })
      .catch(() => {
        messengerBookings.innerHTML = "Đặt lịch thất bại";
      });
  } else {
    messengerBookings.innerHTML = "Chúc mừng bạn đã đặt lịch thành công";
  }
}

console.log(getHairIdFromURL());
