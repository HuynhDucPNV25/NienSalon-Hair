const accountData = "https://pnv-hair.onrender.com/Account";

async function login() {
    try {
        const response = await axios.get(accountData);
        const data = response.data;

        let accountName = document.getElementById("loginAccountName").value;
        let password = document.getElementById("loginPassword").value;

        if (accountName === "" || password === "") {
            alert("Xin hãy nhập tên đăng nhập và mật khẩu!");
        } else if (accountName == data.accountName || password == data.password) {
            let userData = {
                accountName: accountName,
                password: password
            };
            localStorage.setItem("userData", JSON.stringify(userData));

            alert("Đăng nhập thành công");
            document.getElementById("loginAccountName").value = "";
            document.getElementById("loginPassword").value = "";
            window.location.href = ""; // Chuyển sang trang người dùng hoặc admin
        } else {
            alert("Sai tên đăng nhập hoặc mật khẩu!");
        }
    } catch (error) {
        console.log('Đã xảy ra lỗi:', error);
    }
}