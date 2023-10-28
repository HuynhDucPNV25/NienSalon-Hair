const booking = 'https://pnv-hair.onrender.com/Booking';
const fetchData = async () => {
  // Replace with your JSON Server URL
  try {
    const response = await axios.get(booking);
    const data = response.data;
    let tableRows = '';
    data.forEach(function (item) {
   
        tableRows += '<tr>';
        tableRows += '<td>' + item.id + '</td>';
        tableRows += '<td>' + item.customerName + '</td>';
        tableRows += '<td>' + item.phone + '</td>';
        tableRows += '<td>' + item.nameHair + '</td>';
        tableRows += '<td>' + item.priceHair + '</td>';
        tableRows += '<td>' + item.time + '</td>';
        tableRows += '<td>' + item.date + '</td>';
        tableRows += '<td>' + item.address + '</td>';
        tableRows += '</tr>';
      
    });
    const tableBody = document.getElementById('resultHair');
    tableBody.innerHTML = tableRows;
  } catch (error) {
    console.error(error);
  }
};
fetchData();