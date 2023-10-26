const accountDataUrl = "https://pnv-hair.onrender.com/Account";

const login = async () => {
  try {
    const response = await axios.get(accountDataUrl);
    const accountData = response.data;
    const accountName = document.getElementById("loginAccountName").value;
    const password = document.getElementById("loginPassword").value;

    if (accountName === "" || password === "") {
      document.getElementById("out").innerHTML = "Xin hãy nhập tên đăng nhập và mật khẩu!";
    } else {
      const account = accountData.find(item => item.accountName === accountName);
      if (account) {
        const isPasswordMatch = password === account.password;
        if (isPasswordMatch) {
          const userData = {
            id: account.id,
            role: account.role,
            accountName: accountName,
            // password: account.password,
          };
          localStorage.setItem("userData", JSON.stringify(userData));
          document.getElementById("out").innerHTML = "Đăng nhập thành công";
          document.getElementById("loginAccountName").value = "";
          document.getElementById("loginPassword").value = "";

          checkLogin(accountData);

        }
      }
    }
  } catch (error) {
    console.error(error);
    document.getElementById("out").innerHTML = "Lỗi khi gọi API, vui lòng thử lại sau!";
  }
};


function checkLogin(accountData) {
  const current = JSON.parse(localStorage.getItem("userData"));
  const currentUser = accountData.find(
    (item) => item.accountName === current.accountName
  );
  if (currentUser) {
    if (currentUser.role) {
      window.location.href = "/src/html/TN-1_HomePage.html";
    } else {
      alert("User");
      window.location.href = "/src/html/user.html";
    }
  }
}