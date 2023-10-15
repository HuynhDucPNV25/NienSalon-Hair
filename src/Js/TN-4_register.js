function register() {
    let phoneNumber = document.getElementById("inp-phoneNumber").value;
    let password = document.getElementById("inp-password").value;
    let password2 = document.getElementById("inp-password2").value;

    if (phoneNumber && password && password2 === password) {
        let userData = {
            phoneNumber: phoneNumber,
            password: password
        };

        let users = [];
        let storedData = localStorage.getItem('users');

        if (storedData) {
            users = JSON.parse(storedData);
        }

        users.push(userData);
        localStorage.setItem('users', JSON.stringify(users));

        alert("Bạn đã đăng kí thành công!");
        //   setTimeout(function () {
        //     window.location.href = ""; // Đăng ký thành công thì reset trang thành giao diện người dùng hoặc admin
        //   }, 3000);
        window.location.href = "/src/html/loginPage.html";//Đăng nhập xong tự động chuyển sang login page
    } else {
        alert("Mật khẩu không khớp!");
    }
}