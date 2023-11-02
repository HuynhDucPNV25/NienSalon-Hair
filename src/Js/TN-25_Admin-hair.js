const hairAPI = 'https://pnv-hair.onrender.com/Hairs';

// TN-25_Admin-User.jsonst endpoint = 'https://pnv-hair.onrender.com/Account';
const fetchData = async () => {
   // Replace with your JSON Server URL
  try {
    const response = await axios.get(hairAPI);
    const data = response.data;
    let tableRows = '';
    data.forEach(function (item) {
      if(!item.role)
      {
        tableRows += '<tr>';
        tableRows += '<td>' + item.id + '</td>';
        tableRows += '<td>' + item.name + '</td>';
        tableRows += '<td>' + item.price + '</td>';
        tableRows += '<td>' + item.address + '</td>';
        tableRows += '<td>' + item.city + '</td>';
        tableRows += '<td>' + item.discount + '</td>';
        tableRows += '<td> <a ><button type="button" class="btn btn-primary ml-5" data-toggle="modal" data-target="#putData" onclick="updateProduct(' + item.id + ')" data-whatever="@mdo">Sửa</button> </a><button type="button" class="btn btn-primary top: 10px" data-toggle="modal" onclick="deleteHair(' + item.id + ')" data-whatever="@mdo">Xóa</button></td>';

        tableRows += '</tr>';
      }
    });
    const tableBody = document.getElementById('resultHair');
    tableBody.innerHTML = tableRows;
  } catch (error) {
    console.error("Error:", error);
  }
};

fetchData();

function submitAddHair(){
      // Lấy giá trị của các trường trong form
      const nameHair = document.getElementById("nameHair").value;
      const price = document.getElementById("price").value;
      const discount = document.getElementById("discount").value;
      const city = document.getElementById("city").value;
      const image = document.getElementById("image").value;
      const cuOrmoi = document.getElementById("cuOrmoi").value;
      const services = document.getElementById("services").value;
      const address = document.getElementById("address").value;
      const messageText = document.getElementById("messageText").value;

      // Kiểm tra các điều kiện
      if (!nameHair || !price || !discount || !city || !image || !cuOrmoi || !services || !address || !messageText) {
        alert("Vui lòng điền đầy đủ thông tin");
        return;
      }
      // Tạo đối tượng dữ liệu từ các giá trị
  const hairData = {
    nameHair: nameHair,
    price: price,
    discount: discount,
    city: city,
    image: image,
    cuOrmoi: cuOrmoi,
    services: services,
    address: address,
    messageText: messageText
  }

        // console(objectHairData);// add data 
        axios.post(hairAPI,hairData)

          .then(response => {
            console.log(response.data);
            alert("Thêm mẫu tóc thành công");
            fetchData(response.data);

          })
          .catch(error => {
            console.log("Error:", error)
          })
}

  // addProduct();
  function deleteHair(id) {
    axios
      .delete(hairAPI + "/" + id)
      // console.log(id)
      .then(() => {
        alert("Xóa sản phẩm thành công");
        fetchData();
      })
      .catch(error => console.error("Error:", error));
  }


