const adminData = 'https://pnv-hair.onrender.com/Account';

// const fetchData = async () => {
//   try {
//     const response = await axios.get(adminData);
//     const data = response.data;
//     let tableRows = '';
//     data.forEach(function (item) {
//       if (item.role) {
//         tableRows = `
//           <h3>Thông tin</h3>
//           <h6>Tên Admin: ${item.name} </h6>
//           <h6>Tên tài khoản: ${item.accountName} </h6>
//           <h6>Mật khẩu: ${item.password}</h6>
//           <h6>Email: ${item.email}</h6>
//           <h6>Số điện thoại: ${item.phone}</h6>
//           <h6>Giới tính: ${item.sex}</h6>
//         `;
//       }
//     });
    
//     const tableBody = document.getElementById('informationAdmin');
//     tableBody.innerHTML = tableRows;
//   } catch (error) {
//     console.error("Error:", error);
//   }
// };

// fetchData();

async function loadData() {
  try {
    const response = await axios.get(adminData);
    const data = response.data;
    console.log(data);
    data.forEach(element => {
      if(!data.role){
        document.querySelector('#fname').value = element.name;
        document.querySelector('#email').value = element.email;
        document.querySelector('#password').value = element.password;
        document.querySelector('#Phone').value = element.phone;
        document.querySelector('#message').value = element.message;
      }
    });
    
    
  } catch (error) {
    console.error(error);
  }
}

loadData();

