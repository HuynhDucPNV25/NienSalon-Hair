const products = 'https://pnv-hair.onrender.com/Product';
const fetchData = async () => {
  
    // Replace with your JSON Server URL
    try {
      const response = await axios.get(products);
      const data = response.data;
      console.log(data);
      let tableRows = '';
      data.forEach(function (item) {
        // let a = item.describe;
          tableRows += '<tr>';
          tableRows += '<td>' + item.id + '</td>';
          tableRows += '<td>' + item.name + '</td>';
          tableRows += '<td>' + item.price + '</td>';
          tableRows += '<td>' + item.describe + '</td>';  
          tableRows += '<td><button type="button" class="btn btn-primary" data-toggle="modal" data-target="#putData" onclick="updateProduct(' + item.id + ')" data-whatever="@mdo">Sửa</button><button type="button" class="btn btn-primary top: 10px" data-toggle="modal" onclick="deleteProduct(' + item.id + ')" data-whatever="@mdo">Xóa</button></td>';
          tableRows += '</tr>';
        console.log(item.discribe);

        
      });
      const tableBody = document.getElementById('resultProducts');
      tableBody.innerHTML = tableRows;
    } catch (error) {
      console.error(error);
     
    }
  };
  fetchData();

// Thêm sản phẩm vào 
  function addProduct(){
    const nameProductInput = document.getElementById('nameProduct');
    const priceProductInput = document.getElementById('priceProduct');
    const discountInput = document.getElementById('discounts');
    const imageInput = document.getElementById('img');
    const moiCuInput = document.getElementById('moi');
    const discribeProduct = document.getElementById('discribe');

    
   const nameProduct = nameProductInput.value;
   const priceProduct = parseInt(priceProductInput.value);
   const discount = parseFloat(discountInput.value)
   const image =imageInput.files[0];
   const moiCuValue = moiCuInput.value;
   const discribe =  discribeProduct.value;
   const moiCu = moiCuValue =="moi" ? true: false;
   console.log(discount);
    // put data into an object 
   productData = {
     img : image,
     name : nameProduct,
     discribe : discribe,
     price : priceProduct, 
     discount : discount,
     new : moiCu
   }

   console.log(productData);
   axios.post(products,productData )

    .then(response => {
      // Xử lý phản hồi từ server
      console.log(response.data);
      alert("Thêm sản phẩm thành công");
      fetchData(response.data); // Gọi hàm hiển thị sản phẩm với dữ liệu từ phản hồi
      
    })
    .catch(error => {
      console.error('Error:', error);
    });
  
  }
  // addProduct();
function deleteProduct(id) {
    axios
      .delete(products + "/" + id)
      // console.log(id)
      .then(() => {
        alert("Xóa sản phẩm thành công");
        fetchData();
      })
      .catch(error => console.error("Error:", error));
  }


// update product : 
function updateProduct(id){
    const response= axios.put(products + "/" + id)
    const data = response.data
    .then(() => {
        

  })

}