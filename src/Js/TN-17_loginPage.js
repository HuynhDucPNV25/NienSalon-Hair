const accountDataUrl = "https://pnv-hair.onrender.com/Account";


// Lấy id trên url.
function getUserIdFromURL() {
  const urlParams = new URLSearchParams(window.location.search);
  const id = urlParams.get('id');
  return parseInt(id);
}

// Sử dụng id lấy được để thực hiện các thay đổi và truy vấn dữ liệu tương ứng
const currentUserId = getUserIdFromURL();
console.log(currentUserId);

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
  const name = current.accountName;
    if (currentUser.role) {
      alert("Wellcome "+ name +" admin!")
      window.location.href = "/src/html/TN-1_HomePage.html";
    } else {
      alert("Wellcome "+ name +"!");
      window.location.href = "/src/html/TN-35_UserPage.html";
    }
  }
}

function logout() {
  localStorage.removeItem("userData");
  console.log("Logged out successfully.");
  window.location.href = "/src/html/TN-1_HomePage.html";
  const logoutIconContainer = document.getElementById("icon-logout-container");
  logoutIconContainer.innerHTML = logoutHTML;
  const logoutHTML = `
  <center>
    <ul id="icon-logout" class="navbar-nav ml-auto" onclick="logout()">
      <li class="nav-item">
        <a href="#" id="logout">
          <button class="btn btn-outline" id="login">
            <i class="fa-regular fa-user"></i>
            Đăng Xuất
          </button>
        </a>
      </li>
    </ul>
  </center>`;
  document.getElementById("icon-login").style.display.none;
}