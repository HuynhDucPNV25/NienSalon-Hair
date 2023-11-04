// TN-25_Admin-User.js
const endpoint = 'https://pnv-hair.onrender.com/Account';
const fetchData = async () => {
   // Replace with your JSON Server URL
  try {
    const response = await axios.get(endpoint);
    const data = response.data;
    let tableRows = '';
    data.forEach(function (item) {
      if(!item.role)
      {
        tableRows += '<tr>';
        tableRows += '<td>' + item.id + '</td>';
        tableRows += '<td>' + item.name + '</td>';
        tableRows += '<td>' + item.phone + '</td>';
        // tableRows += '<td>' + item.password + '</td>';
        tableRows += '<td><input readonly type="password" value="' + item.password + '" style="border: none;outline: none;"></td>';
        tableRows += '<td>' + item.email + '</td>';
        tableRows += '<td>' + item.sex + '</td>';
        tableRows += '<td><button type="button" id="hair" class="btn btn-primary" style=" background-color: #E86A60" data-toggle="modal" data-target="#updateUser" onclick="handleOnclickUser(' + item.id + ')" data-whatever="@mdo">Sửa</button><button type="button" id="hair" class="btn btn-primary "   style=" background-color: #E86A60" data-toggle="modal" data-target="#updateUser" onclick="deleteUser(' + item.id + ')" data-whatever="@mdo">Xóa</button></td>';
        tableRows += '</tr>';
      }
    });
    const tableBody = document.getElementById('resultUsers');
    tableBody.innerHTML = tableRows;
  } catch (error) {
    console.error(error);
  }
};

fetchData();

async function handleOnclickUser(id) {
  try {
    // Gửi yêu cầu GET đến JSON Server để lấy danh sách sản phẩm
    const response = await axios.get(`${endpoint}/${id}`);
    const user = response.data;
    console.log(user);
    // Đặt giá trị của các trường form dựa trên thông tin sản phẩm
    document.getElementById('idUser').value = user.id;
    document.getElementById('nameUsers').value = user.name;
    document.getElementById('accountUser').value = user.accountName;
    document.getElementById('phoneUsers').value = user.phone;
    document.getElementById('emailUser').value = user.email;
    document.getElementById('password').value = user.password;
    document.getElementById('sexUser').value = user.sex;
    document.getElementById('role').value = user.role;
    // document.querySelector('name="role').value = value

  } 
  catch (error) {
    console.log(error);
  }
}

async function updateUser() {
  try {
    const idUser = document.getElementById('idUser').value;
    const nameUser = document.getElementById('nameUsers').value;
    const accountUser = document.getElementById('accountUser').value;
    const phone = document.getElementById('phoneUsers').value;
    const email = document.getElementById('emailUser').value;
    const password = document.getElementById('password').value;
    const sex = document.getElementById('sexUser').value;
    const role = document.getElementById('role').value;
    // const role = document.getElementById('role').value;
  const booleanRole = role === 'true' ? true : false;
    // const role = document.querySelector('input[name="role"]:checked/');
    

    const userData = {
      id: idUser,
      role : booleanRole,
      accountName: accountUser,
      password: password,
      name: nameUser,
      email: email,
      phone: phone,
      sex: sex,
     
    };

    console.log(userData);

    const response = await axios.put(`${endpoint}/${idUser}`, userData);

    console.log(response.data);
    alert("Cập nhật thông tin khách hàng thành công");
    fetchData(response.data);
  } catch (error) {
    console.log(error);
    alert("Cập nhật thông tin khách hàng thất bại");
  }
}

function deleteUser(id) {
  axios
    .delete(endpoint + "/" + id)
    .then(() => {
      console.log(id);
      alert("Xóa sản phẩm thành công");
      fetchData();
    })
    .catch(error => console.error("Error:", error));
}