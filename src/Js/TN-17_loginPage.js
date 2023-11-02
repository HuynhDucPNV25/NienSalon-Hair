const accountDataUrl = "https://pnv-hair.onrender.com/Account";
async function login(){
  const dataAccount= await axios.get(accountDataUrl);
  const data = dataAccount.data;
  //lấy dữ liệu
  const tk = document.getElementById('loginAccountName').value;
  const pass = document.getElementById('loginPassword').value;
  for (const item of data) {
    if (item.accountName === tk && item.role==true && item.password ===pass) { 
      const userData = {
                  id: item.id,
                  role: item.role,
                  accountName: item.accountName,
                  phone: item.phone,
                  name: item.name
                };
      alert("Admin");
      localStorage.setItem("userData", JSON.stringify(userData)); 
      window.location.href = '/src/html/TN-25_Admin_hair.html';
    }
    if (item.accountName === tk && item.role == false && item.password === pass) {
      const userData = {
        id: item.id,
        role: item.role,
        accountName: item.accountName,
        phone: item.phone,
        name: item.name
      };
      alert("User");
      localStorage.setItem("userData", JSON.stringify(userData)); 
      window.location.href = '/src/html/TN-1_HomePage.html';
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