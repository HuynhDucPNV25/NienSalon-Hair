// const { default: axios } = require("axios");

const { default: axios } = require("axios");

const hairData = " https://pnv-hair.onrender.com/Hairs";

function submitBooking() {
  // Lấy giá trị từ các ô nhập liệu
  const date = document.getElementById('date').value;
  const timeSelect = document.getElementById('time-select').value;
  const customerName = document.getElementById('customerName').value;
  const phoneNumber = document.getElementById('phoneNumber').value;
  const messageText = document.getElementById('message-text').value;

// Kiểm tra ngày nhập có rỗng không
  if(date==''){
      alert("Vui lòng điền thông tin ngày")
      return;
  }else{
     // Chuyển đổi định dạng ngày : 
      const inputDate = new Date(date);
      const formattedDate = `${inputDate.getDate()}/${inputDate.getMonth() + 1}/${inputDate.getFullYear()}`;
      console.log(formattedDate);

      // Tạo đối tượng ngày hiện tại 
      const currentDate = new Date();
    console.log("Thời gian hiện tại : "+currentDate);
      currentDate.setHours(0,0,0,0); // Set thời gian giờ về bằng 0

      // So sánh ngày nhập vào có nhỏ hơn ngày hiện tại (ngày quá khứ )
      if (inputDate<currentDate){
          alert("Thời gian không hợp lệ");
      } 
  }

  if(customerName==='' || typeof customerName ==='number'){
    alert("Tên bạn không nên để trống hoặc không nên ghi là số");
  }
  if(phoneNumber==""){
    alert("Vui lòng điền số điện thoại của bạn");
  }
  if(phoneNumber.lenght!=10 || phoneNumber.charAt(0)=='0'){
    alert("Số điện thoại không hợp lệ");
  }
  // confirm("Xác nhận lại thông tin đặt lịch : \n"+
  // "Tên khách hàng : "+customerName+"\n Số điện thoại : "+phoneNumber+
  // "\n Thời gian : "+timeSelect +"\n Ngày : "+formattedDate);

    const obj ={
          customerName:customerName,
          phone: phoneNumber,
          messageText:messageText,
          date: date,
          time: timeSelect
    }
    console.log(obj);
}


// Đẩy  đối tượng lên mock API server
function createCart(obj){
  const options={
      method:"POST",
      headers: {
          "Content-Type": "application/json",
          // 'Content-Type': 'application/x-www-form-urlencoded',
        },

      body:JSON.stringify(obj)
  }
    fetch(url, options)
    .then(response => response.json())
    // .then(responseData => {
    //   // Xử lý phản hồi từ mock API
    //   console.log(responseData);
    // })
    .catch(error => {
      // Xử lý lỗi nếu có
      console.error("Error:", error);
    });
}
createCart();
					
function callAPI(endpoint, method = "GET", body) {					
  return axios({					
    method: method,					
    url: `${API_URL}/${endpoint}`,					
    data: body,					
  }).catch((err) => {					
    console.log(err);					
  });					
  }					