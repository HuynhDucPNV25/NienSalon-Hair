// TN-25_Admin-User.js

const fetchData = async () => {
    const endpoint = 'https://pnv-hair.onrender.com/Account'; // Replace with your JSON Server URL
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
          tableRows += '<td>' + item.password + '</td>';
          tableRows += '<td>' + item.email + '</td>';
          tableRows += '<td>' + item.sex + '</td>';
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