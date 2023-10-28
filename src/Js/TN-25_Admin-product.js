
const fetchData = async () => {
    const products = 'https://pnv-hair.onrender.com/Product'; // Replace with your JSON Server URL
    try {
      const response = await axios.get(products);
      const data = response.data;
      let tableRows = '';
      data.forEach(function (item) {
          tableRows += '<tr>';
          tableRows += '<td>' + item.id + '</td>';
          tableRows += '<td>' + item.name + '</td>';
          tableRows += '<td>' + item.price + '</td>';
          tableRows += '<td>' + item.describe + '</td>';        
          tableRows += '</tr>';
        
      });
      const tableBody = document.getElementById('resultProducts');
      tableBody.innerHTML = tableRows;
    } catch (error) {
      console.error(error);
    }
  };
    
  fetchData();