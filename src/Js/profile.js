
const fileInput = document.getElementById("fileInput");
const uploading_text = document.getElementById("uploading_text");

const cloud_name = "duas1juqs";
const upload_preset = "pnvimage";

fileInput.addEventListener("change", (e) => {
  uploading_text.innerText = "uploading...";
  const file = e.target.files[0];
  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", upload_preset);
  const options = {
    method: "POST",
    body: formData,
  };
  return fetch(
    `https://api.cloudinary.com/v1_1/${cloud_name}/image/upload`,
    options
  )
    .then((res) => res.json())
    .then((data) => {
      console.log(data.secure_url);
      const avatarUser = document.getElementById("avatar-user");
      avatarUser.src = data.secure_url;
      uploading_text.innerHTML = `
      <br /> 
      `;
    })
    .catch((err) => console.log(err));
});
const onScroll = () => {
  const scrollTopBtn = document.querySelector(".scroll-top-btn");
  const { scrollTop } = document.documentElement;

  scrollTopBtn.style.display = scrollTop > 20 ? "block" : "none";
  scrollTopBtn.style.bottom = "30vh"; // Thiết lập bottom là -25px
  scrollTopBtn.style.position = "absolute"; // Thiết lập position là absolute
  scrollTopBtn.style.position = "fixed"; // Thiết lập position là absolute
};
window.addEventListener("scroll", onScroll);
function scrollToTop() {
  window.scrollTo({ top: 0, behavior: "smooth" }); // kéo trang lên đầu
}
// Get the user data from localStorage
let userData = JSON.parse(localStorage.getItem('userData'));

// Get the form inputs
const fullnameInput = document.getElementById('fullname');
const emailInput = document.getElementById('email');
const phoneInput = document.getElementById('phone');
fullnameInput.value = userData.name;
emailInput.value = userData.email;
phoneInput.value = userData.phone;

function save(){
    const accountDataUrl = "https://pnv-hair.onrender.com/Account";
    const data = accountDataUrl.data;
}
$(document).ready(function () {
  // Kích hoạt tab Bootstrap
  $('#myTab a').on('click', function (e) {
    e.preventDefault()
    $(this).tab('show')
  });
});

const story = "https://pnv-hair.onrender.com/Booking";

const check = localStorage.getItem('userData');
const user = JSON.parse(check);
const names = user.name;
const idUser = user.id;
async function buildBookingRows() {
  try {
    
    const response = await axios.get(story);
    const dataStory = response.data;
    let rows = '';
    dataStory.forEach(item => {
      if (item.customerName === names) {
        rows += `
          <tr>
            <td>${item.id}</td>
            <td>${item.nameHair}</td>
            <td>${item.date}</td>
            <td>${item.time}</td>
          </tr>
        `;
      }
    });
    if (!rows) {
      rows = `
        <tr>
        <td colspan="4">Lịch sử đặt lịch trống</td>
        </tr>
      `;
    }
    return rows;
  } catch (error) {
    console.error(error);
    return '';
  }
}

async function loadBookingData() {
  const rows = await buildBookingRows();
  document.getElementById('bookingStory').innerHTML = rows;
}

loadBookingData();
const cart ="https://pnv-hair.onrender.com/Cart"
async function buildCartRows() {
  try {
    
    const response = await axios.get(cart);
    const dataStory = response.data;
    let rows = '';
    dataStory.forEach(item => {
      if (item.userID === idUser) {
        rows += `
          <tr>
            <td>${item.id}</td>
            <td>${item.nameProduct}</td>
            <td>${item.price}</td>
            <td>${item.quantity}</td>
          </tr>
        `;
      }
    });
    if (!rows) {
      rows = `
        <tr>
        <td colspan="4">Lịch sử đặt lịch trống</td>
        </tr>
      `;
    }
    return rows;
  } catch (error) {
    console.error(error);
    return '';
  }
}

async function loadcartData() {
  const rows = await buildCartRows();
  document.getElementById('cartStory').innerHTML = rows;
}

loadcartData();

async function save(){
  const fullname = document.getElementById('fullname').value;

  const email = document.getElementById('email').value;

  const phone = document.getElementById('phone').value;


  axios.patch("https://pnv-hair.onrender.com/Account/"+idUser, {
      "name":fullname,
      "email": email,
      "phone": phone,
    })
    .then(response => {
      console.log(response);
      // Xử lý kết quả trả về nếu cần thiết
    })
    .catch(error => {
      console.log(error);
      // Xử lý lỗi nếu có thể
    });
}