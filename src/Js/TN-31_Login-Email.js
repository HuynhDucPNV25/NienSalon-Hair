const accountDataUrl = "https://pnv-hair.onrender.com/Account";

async function login() {
  const response = await axios.get(accountDataUrl);
  const accountData = response.data;
  
  const email = document.getElementById("loginEmail").value;
  const password = document.getElementById("password").value;

  for (const item of accountData) {
    if (item.email === email && item.password === password) { 
      const userData = {
        id: item.id,
        role: item.role,
        accountName: item.accountName,
        phone: item.phone,
        name: item.name,
        email: item.email
      };
      localStorage.setItem("userData", JSON.stringify(userData)); 
      alert("Đăng nhập thành công");
      document.getElementById("loginEmail").value = "";
      document.getElementById("password").value = "";
      window.location.href = '/src/html/TN-1_HomePage.html'; //Chuyển hướng đến trang chủ
      return;
    }
  }
  
  const modal = document.getElementById('loginFailedModal');
  modal.classList.add('show');
  modal.style.display = 'block';
  setTimeout(function() {
    modal.classList.remove('show');
    modal.style.display = 'none';
  }, 3000);
}