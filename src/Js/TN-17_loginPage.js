function login() {
    let phoneNumber = document.getElementById("inp-phoneNumber").value;
    let password = document.getElementById("inp-password").value;

    let userData = localStorage.getItem('users');//lấy dữ liệu từ local
    if (userData) {//điều kiện đúng
        let users = JSON.parse(userData);

        let foundUser = users.find(function (user) {//Tìm kiếm số đt-mk
            return user.phoneNumber === phoneNumber && user.password === password;
        });

        if (foundUser) {
            alert("Đăng nhập thành công!");
            localStorage.setItem('currents',JSON.stringify(users));

            setTimeout(function () {
                window.location.href = "/src/html/TN-1_HomePage.html"; // Đăng nhập thành công thì reset trang thành giao diện người dùng hoặc admin
            }, 1000);
        } else {
            // Tài khoản hoặc mật khẩu không chính xác
            alert("Tài khoản hoặc mật khẩu không đúng!");
            // window.location.href = ""; // Nếu không đúng thì sẽ reset lại trang để nhập lại tài khoản và mật khẩu
  
        }
    } else {
        alert("Tài khoản hoặc mật khẩu không đúng!");

    }
}

function logout(){
    let userCurrent = localStorage.getItem("currents");
    let currents = JSON.parse(userCurrent);
    let check = currents.find(function (current) {//Check
        return current.phoneNumber === phoneNumber && current.password === password;
    });
    if(check){//Đúng thì sẽ đăng xuất
        alert("Đăng xuất")
        window.location.href = "/src/html/HomePage.html";
        localStorage.removeItem("currents");
    }
}
