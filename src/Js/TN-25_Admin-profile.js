const adminData = 'https://pnv-hair.onrender.com/Account';

async function loadData() {
  try {
    const response = await axios.get(adminData);
    const data = response.data;
    data.forEach(element => {
      if(element.role==true){
        document.querySelector('#fname').value = element.name;
        document.querySelector('#email').value = element.email;
        document.querySelector('#password').value = element.password;
        document.querySelector('#Phone').value = element.phone;
        document.querySelector('#sex').value = element.sex;
      }
    });
    
    
  } catch (error) {
    console.error(error);
  }
}

loadData();