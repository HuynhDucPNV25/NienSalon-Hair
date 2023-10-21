const accountDataUrl = "https://pnv-hair.onrender.com/Account";

const login = async () => {
  try {
    const response = await axios.get(accountDataUrl);
    const accountData = response.data;
    const accountName = document.getElementById("loginAccountName").value;
    const password = document.getElementById("loginPassword").value;

    if (accountName === "" || password === "") {
      alert("Xin hãy nhập tên đăng nhập và mật khẩu!");
    } else {
      const account = accountData.find(
        item => item.accountName === accountName
      );
      if (account) {
        const isPasswordMatch = password === account.password;
        if (isPasswordMatch) {
          const userData = {
            id: account.id,
            role: account.role,
            accountName: accountName,
            password: account.password,
          };
          localStorage.setItem("userData", JSON.stringify(userData));
          alert("Đăng nhập thành công");
          document.getElementById("loginAccountName").value = "";
          document.getElementById("loginPassword").value = "";

          checkLogin(accountData);

        } else {
          alert("Sai tên đăng nhập hoặc mật khẩu!");
        }
      } else {
        alert("Sai tên đăng nhập hoặc mật khẩu!");
      }
    }
  } catch (error) {
    console.error(error);
  }
};

//chưa check login được
function checkLogin(accountData) {
  const checkAcc = "admin";
  const curent = JSON.parse(localStorage.getItem("userData"));
  const data = accountData.find(item => item.role === curent.role);
  if (data) {
    if (checkAcc == "admin") {
      window.location.href = "../src/html/TN-14_Admin.html"; //Chuyển đến admin
    } else {
      window.location.href = "../src/html/user.html"; //Chuyển đến user
    }
  }
}