

function register() {
  const name = document.getElementById("name-f").value.trim();
  const accountName = document.getElementById("accountName").value.trim();
  const email = document.getElementById("email").value.trim();
  const phoneNumber = document.getElementById("tel").value.trim();
  const password = document.getElementById("pass").value.trim();
  const confirmPassword = document.getElementById("pass2").value.trim();
  const gender = document.querySelector('input[name="gender"]:checked').value;
  const role = document.querySelector('input[name="role"]:checked');
  let errorMsg = "";

  if (name === "" || accountName === "" || email === "" || phoneNumber === "" || password === "" || confirmPassword === "" || gender === null || role === null) {
    errorMsg = "Xin hãy nhập đầy đủ thông tin!";
  } else if (!isValidEmail(email)) {
    errorMsg = "Vui lòng nhập địa chỉ email hợp lệ!";
  } else if (!isValidPhoneNumber(phoneNumber)) {
    errorMsg = "Vui lòng nhập số điện thoại hợp lệ!";
  } else if (password !== confirmPassword) {
    errorMsg = "Mật khẩu không khớp!";
  }

  if (errorMsg !== "") {
    alert(errorMsg);
    return;
  }

  if (password !== confirmPassword) {
    alert("Mật khẩu không khớp!");
    return;
  }

  if (role !== true) {
    roles = false;
  } else if (role === false) {
    roles = true;
  } else {
    alert("Xin hãy chọn quyền truy cập!");
    return;
  }

  const userData = {
    role: roles,
    accountName: accountName,
    password: password,
    name: name,
    email: email,
    phone: phoneNumber,
    sex: gender,
  };

  const url = "https://pnv-hair.onrender.com/Account";
  fetch(url, {
    method: "POST",
    body: JSON.stringify(userData),
    headers: {
      "Content-Type": "application/json"
    }
  })
    .then(function (response) {
      if (response.ok) {
        alert("Đăng Ký Thành Công");
        document.getElementById("name-f").value = "";
        document.getElementById("accountName").value = "";
        document.getElementById("email").value = "";
        document.getElementById("tel").value = "";
        document.getElementById("pass").value = "";
        document.getElementById("pass2").value = "";
        gender.checked = false;
        role.checked = false;
        window.location.href = "TN-17_loginPage.html";//Chuyển sang trang hoặc không
      } else {
        alert("Đăng Ký Thất Bại");
      }
    })
    .catch(function (error) {
      console.log(error);
      alert("Đã Xảy Ra Lỗi!");
    });
}

//Hàm kiểm tra định dạng
function isValidPhoneNumber(phoneNumber) {
  const phoneNumberRegex = /^\d{10}$/;
  return phoneNumberRegex.test(phoneNumber);
}
function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}
