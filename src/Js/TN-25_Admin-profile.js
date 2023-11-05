const adminData = 'https://pnv-hair.onrender.com/Account';

async function loadData() {
  try {
    const response = await axios.get(adminData);
    const data = response.data;

    // console.log(data);
    data.forEach(element => {
      if(element.role){
        document.querySelector('#idAdmin').value = element.id;
        document.querySelector('#accountName').value = element.accountName;

        document.querySelector('#fname').value = element.name;
        document.querySelector('#email').value = element.email;
        document.querySelector('#password').value = element.password;
        document.querySelector('#Phone').value = element.phone;
        document.querySelector('#sex').value = element.sex;

        document.querySelector('#role').value = element.role;


      }
    });
    
    
  } catch (error) {
    console.error(error);
  }
}


loadData();


async function updateAdmin() {
  try {
    const idAdmin = document.querySelector('#idAdmin').value;
    console.log(idAdmin);
    const name = document.querySelector('#fname').value;
    const accountName = document.querySelector('#accountName').value;
    const email = document.querySelector('#email').value;
    // const phoneNumber =  document.querySelector('#Phone').value;
    const password = document.querySelector('#password').value;
    const phone = document.querySelector('#Phone').value;
    const sex = document.querySelector('#sex').value;
    const roleValue = document.querySelector('#role').value;
    console.log(roleValue);
    const adminDataUpdate = {
      id: idAdmin,
      role: roleValue,
      accountName: accountName,
      password: password,
      name: name,
      email: email,
      phone: phone,
      sex: sex
    };

    console.log(adminDataUpdate);

    const response = await axios.put(`${adminData}/${idAdmin}`, adminDataUpdate);

    console.log(response.data);
    alert("Cập nhật thông tin thành công");
    loadData(response.data);
  } catch (error) {
    console.log(error);
    alert("Cập nhật thông tin không thành công");
  }
}

