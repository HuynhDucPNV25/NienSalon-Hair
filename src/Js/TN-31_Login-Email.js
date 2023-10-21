function loginWithEmail() {
    var email = document.getElementById("loginEmail").value;
    var password = document.getElementById("password").value;

    if (email === "" || password === "") {
        alert("Xin hãy nhập email và mật khẩu!");
        return;
    }

    authenticateUser(email, password)
        .then(function (response) {
            if (response.ok) {
                alert("Đăng nhập thành công");
                document.getElementById("loginAccountName").value = "";
                document.getElementById("loginPassword").value = "";
                window.location.href = ""; 
            } else {
                alert("Email hoặc mật khẩu không chính xác");
            }
        })
        .catch(function (error) {
            alert("Đăng nhập thất bại: " + error);
        });
}


function authenticateUser(email, password) {
    return new Promise(function (resolve, reject) {
        if (email === "example@example.com" && password === "password") {
            resolve({ ok: true });
        } else {
            resolve({ ok: false });
        }
    });
}