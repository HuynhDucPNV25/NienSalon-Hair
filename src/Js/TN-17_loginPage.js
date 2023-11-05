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
                  name: item.name,
                  email: item.email
                };
      localStorage.setItem("userData", JSON.stringify(userData)); 
      window.location.href = '/src/html/TN-25_Admin_hair.html';
    }
    if (item.accountName === tk && item.role ==false && item.password === pass) {
      const userData = {
        id: item.id,
        role: item.role,
        accountName: item.accountName,
        phone: item.phone,
        name: item.name,
        email:item.email
      };
      localStorage.setItem("userData", JSON.stringify(userData)); 
      window.location.href = '/src/html/TN-1_HomePage.html';
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
