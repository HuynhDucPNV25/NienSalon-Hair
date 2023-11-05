const hairDataUrl= "https://pnv-hair.onrender.com/Hairs";
// const bookingDataUrl = "http://localhost:4002/Booking";
const payments = "https://pnv-hair.onrender.com/payment";
function getHairIdFromURL() {
  const urlParams = new URLSearchParams(window.location.search);
  const id = urlParams.get('id');
  return parseInt(id);
}

const currentHairId = getHairIdFromURL();
const check = localStorage.getItem('userData');
    if (check != null) {
      const userData = JSON.parse(check);
      const name = userData.name;
      const phone=userData.phone;
      document.getElementById('customerName').value = name;
      document.getElementById('phoneNumber').value = phone;
    }
      
async function getData() {
  try {
    const response = await axios.get(`${hairDataUrl}/${currentHairId}`);
    // Tìm mẫu tóc hiện tại dựa trên id
    const currentHair = response.data;
    if (currentHair) {
      const nameInput = document.querySelector('#NameHair');
      const priceInput = document.querySelector('#price');
      const addressInput = document.querySelector('#address');
      const discountPrice = (currentHair.price * (100 - currentHair.discount)) / 100;
      nameInput.value = currentHair.name;
      priceInput.value = discountPrice+" VNĐ";
      addressInput.value = currentHair.address;
    } else {
      // Hiển thị thông báo khi không tìm thấy mẫu tóc
    }
  } catch (error) {
    console.log(error);
  }
}

getData();

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

  return true;
}


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
      messages: message,
    };
    console.log(data.messages);
    
    const amount = parseInt(price); 
    const response = await payment(amount,data);
    localStorage.setItem('a', 'true');
  } catch (error) {
    console.log(error);
  }
}

async function payment(amount,data) {
  try {
    const response = await axios.post(payments, { amount,data });
    if (response && response.data && response.data.payUrl) {
        window.location.href = response.data.payUrl;

    } else {
      console.log("Error in payment!");
    }
    return response;
  } catch (error) {
    console.error(error);
  }
}

async function searchHair(event) {
  const searchString = event.target.value.trim().toLowerCase();
  console.log(searchString);
  if (searchString === "") {
    document.getElementById("hair-list").innerHTML = "";
    return ;
  }
  const response = await axios.get(`${hairDataUrl}`);
  const data = response.data;
  const arr = data.filter(hair => hair.name.toLowerCase().includes(searchString));
  console.log(arr);
  const hairList = document.getElementById("hair-list");
  if (arr.length > 0) {
    hairList.innerHTML = "";
    arr.forEach(hair => {
      const discountPrice = (hair.price * (100 - hair.discount)) / 100;
      const listItem = document.createElement("button");
      listItem.setAttribute("type", "button");
      listItem.setAttribute("class", "list-group-item list-group-item-action");
      listItem.textContent = hair.name;
      listItem.addEventListener("click", () => {
        document.getElementById("NameHair").value = hair.name;
        document.getElementById("price").value =discountPrice+" VNĐ";
        document.getElementById("address").value = hair.address;
        hairList.innerHTML = "";
      });
      hairList.appendChild(listItem);
    });
  } else {
    hairList.innerHTML = "Không tìm thấy mẫu tóc";
  }
}