//.............................Uppload Hình Ảnh.......................................................

function uploadAvt(){
  const fileInput = document.getElementById("fileInput");
  const uploading_text = document.getElementById("uploading_text");

  // replace with your data 👇
  const cloud_name = "duas1juqs";
  const upload_preset = "pnvimage";
  // replace with your data 👆

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

        uploading_text.innerHTML = `
        <span>upload complete.</span>
        <br />
        <img style="max-width:300px" src="${data.secure_url}" alt="">
        <a href="${data.secure_url}">${data.secure_url}</a>
        `;
      })
      .catch((err) => console.log(err));
  });
};
function changeAvt(){
  //id= avatar-user
}
//.............................Sử lý dữ liệu.......................................................
async function getUserInfo() {
  try {
    const response = await axios.get('https://pnv-hair.onrender.com/Account');
    const userInfo = response.data;
    console.log(userInfo);
    return userInfo;
  } catch (error) {
    console.error(error);
    return null;
  }
}

async function updateUserInfo(userToUpdate) {
  try {
    await axios.put('https://pnv-hair.onrender.com/Account', userToUpdate);
    console.log('User info updated successfully.');
  } catch (error) {
    console.error(error);
  }
}

// Get user info and update it
(async function() {
  const userInfo = await getUserInfo();
  if (userInfo) {
    const userToUpdate = {
      name: 'Duc Phat',
      email: 'phatdeptrai@gmail.com',
      phone: '0914017111',
      address: 'Son Tra, Da Nang'
    };
    await updateUserInfo(userToUpdate);
  }
})();

///
async function getUserInfo() {
  try {
    const response = await axios.get('https://pnv-hair.onrender.com/Account');
    const userInfo = response.data;
    return userInfo;
  } catch (error) {
    console.error(error);
    return null;
  }

}
const userInfo = await getUserInfo();
  if (userInfo) {
    const nameInput = document.getElementById('name-input');
    nameInput.value = userInfo.name;
  }

//____________________
function save(){
  const userData = JSON.parse(localStorage.getItem("userData")) || {};
  const fullNameInput = document.querySelector('input[placeholder="your name"]');
  const emailInput = document.querySelector('input[placeholder="example@example.com"]');
  const phoneInput = document.querySelector('input[placeholder="xxxx-xx-xxx"]');
  const addressInput = document.querySelector('input[placeholder="emxal, examlple"]');
  const nameElement = document.getElementById("name-input");
  const avatarElement = document.getElementById("avatar-user");
  // Thực hiện việc điền dữ liệu từ localStorage vào form khi trang được tải
  fullNameInput.value = userData.fullName || "";
  emailInput.value = userData.email || "";
  phoneInput.value = userData.phone || "";
  addressInput.value = userData.address || "";
  // Hiển thị tên user
  nameElement.innerText = userData.fullName || "";
  // Hiển thị avatar
  avatarElement.src = userData.avatar || "";
  // Thực hiện lưu dữ liệu từ form vào localStorage khi người dùng thay đổi giá trị trong form
  fullNameInput.addEventListener("input", function(event) {
    userData.fullName = event.target.value;
    localStorage.setItem("userData", JSON.stringify(userData));
    nameElement.innerText = userData.fullName || "";
  });
  emailInput.addEventListener("input", function(event) {
    userData.email = event.target.value;
    localStorage.setItem("userData", JSON.stringify(userData));
  });
  phoneInput.addEventListener("input", function(event) {
    userData.phone = event.target.value;
    localStorage.setItem("userData", JSON.stringify(userData));
  });
  addressInput.addEventListener("input", function(event) {
    userData.address = event.target.value;
    localStorage.setItem("userData", JSON.stringify(userData));
  });
  // Xử lý upload avatar
  const fileInput = document.getElementById('fileInput');
  const uploadingText = document.getElementById('uploading_text');
  function getUserInfo() {
    fileInput.click();
  }
  fileInput.addEventListener("change", function(event) {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = function() {
      uploadingText.innerText = "Uploading...";
      const imageData = reader.result;
      // Lưu dữ liệu vào userData
      userData.avatar = imageData;
      localStorage.setItem("userData", JSON.stringify(userData));
      // Update avatar hiển thị trên trang
      avatarElement.src = imageData;
      // Reset giá trị input file
      fileInput.value = "";
      uploadingText.innerText = "";
    };
    reader.readAsDataURL(file);
  });
}