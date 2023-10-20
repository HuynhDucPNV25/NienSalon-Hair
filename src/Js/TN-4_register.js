function register() {
  let name = document.getElementById("name-f").value;
  let accountName = document.getElementById("accountName").value;
  let email = document.getElementById("email").value;
  let phoneNumber = document.getElementById("tel").value;
  let password = document.getElementById("pass").value;
  let confirmPassword = document.getElementById("pass2").value;
  let gender = document.querySelector('input[name="gender"]:checked').value;
  let role = document.querySelector('input[name="role"]:checked').value;

  console.log(role);

  if (name === "" || accountName === "" || email === "" || phoneNumber === "" || password === "" || confirmPassword === "" || gender === "" || role === "") {
    alert("Xin hãy nhập đầy đủ thông tin!");
    return;
  }

  if (password !== confirmPassword) {
    alert("Mật khẩu không khớp!");
    return;
  }

  let userData = {
    name: name,
    accountName: accountName,
    email: email,
    phoneNumber: phoneNumber,
    password: password,
    gender: gender,
    role: role
  };

  console.log(userData);

  let url = "https://pnv-hair.onrender.com/Account";
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
        document.querySelector('input[name="gender"]:checked').checked = false;
        document.querySelector('input[name="role"]:checked').checked = false;
        window.location.href = "";//Chuyển sang trang hoặc không
      } else {
        alert("Đăng Ký Thất Bại");
      }
    })
    .catch(function (error) {
      console.log(error);
      alert("Đã Xảy Ra Lỗi!");
    });
}