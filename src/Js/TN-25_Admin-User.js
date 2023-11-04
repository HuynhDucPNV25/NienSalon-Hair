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
        tableRows += '<td><button type="button" id="hair" class="btn btn-primary " data-toggle="modal" data-target="#putData" onclick="handleOnclick(' + item.id + ')" data-whatever="@mdo">Sửa thông tin</button></td>';
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