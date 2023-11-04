
const products = 'https://pnv-hair.onrender.com/Product';
const fetchData = async () => {
  
    try {
      const response = await axios.get(products);
      const data = response.data;
      // console.log(data);
      let tableRows = '';
      data.forEach(function (item) {
        // let a = item.describe;tableHair
          tableRows += '<tr>';
          tableRows += '<td>' + item.id + '</td>';
          tableRows += '<td>' + item.name + '</td>';
          tableRows += '<td>' + item.price + '</td>';
          tableRows += '<td>' + item.describe + '</td>';
          console.log(item.describe);
          // tableRows += '<td>' + limitText(item.describe, 15) + '</td>';
         
          tableRows += '<td><button type="button" id="hair" class="btn btn-primary " data-toggle="modal" data-target="#putData" onclick="handleOnclick(' + item.id + ')" data-whatever="@mdo">Sửa</button><button type="button" class="btn btn-primary top: 30px; ml-2" data-toggle="modal" onclick="deleteProduct(' + item.id + ')" data-whatever="@mdo">Xóa</button></td>';
          tableRows += '</tr>';
        // console.log(item.id);
        
      });
      const tableBody = document.getElementById('resultProducts');
      tableBody.innerHTML = tableRows;
    } catch (error) {
      console.error(error);
     
    }
  };
  fetchData();

// đẩy ảnh lên cloudinary 
let file = null;
var loadFile = function (event) {

  for (let i = 0; i <= event.target.files.length - 1; i++) {
         
    const fsize = event.target.files.item(i).size;
    const filee = Math.round((fsize / 1024));
    // The size of the file.
    if (filee > 4096) {
        alert("File too Big, please select a file less than 4mb");
    } else {
      var output = document.getElementById('output');
      file = event;
      output.src = URL.createObjectURL(event.target.files[0]);
      output.onload = function () {
        URL.revokeObjectURL(output.src) // free memory
      }
    }
  }
};

async function uploadImg() {
  const cloud_name = "duas1juqs";
  const upload_preset = "pnvimage";

  let url = '';

  const formData = new FormData();
  formData.append("file", file.target.files[0]);
  formData.append("upload_preset", upload_preset);
  const options = {
    method: "POST",
    body: formData,
  };

if (file) {
    await fetch(
      `https://api.cloudinary.com/v1_1/${cloud_name}/image/upload`,
      options
    )
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        url = data.secure_url
      })
      .catch((err) => console.log(err));
    return url
  }

  return;

}

async function addProduct() {
  const nameProductInput = document.getElementById('nameProduct');
  const priceProductInput = document.getElementById('price');
  const discountInput = document.getElementById('discount');
 
  const moiCuInput = document.getElementById('moiCu');
  const discribeProduct = document.getElementById('message');

  const dataImage = await uploadImg();

  if (dataImage) {
    const nameProduct = nameProductInput.value;
    const priceProduct = parseInt(priceProductInput.value);
    const discount = parseInt(discountInput.value)
    const moiCuValue = moiCuInput.value;
    const discribe = discribeProduct.value;
    // const moiCu = moiCuValue == "moi" ? true : false;
    // put data into an object 
    const productData = {
      img: dataImage,
      name: nameProduct,
      describe: discribe,
      price: priceProduct,
      discount: discount,
      new: moiCuValue
    }

    console.log(productData);

   await axios.post(products, productData)
      .then(async response => {
        // Xử lý phản hồi từ server
        alert("Thêm sản phẩm thành công");
        await fetchData(response.data); // Gọi hàm hiển thị sản phẩm với dữ liệu từ phản hồi

      })
      .catch(error => {
        console.error('Error:', error);
      });
  }

}

function deleteProduct(id) {
  axios
    .delete(products + "/" + id)
    .then(() => {
      console.log(id);
      alert("Xóa sản phẩm thành công");
      fetchData();
    })
    .catch(error => console.error("Error:", error));
}

async function handleOnclick(id) {
    try {
      // Gửi yêu cầu GET đến JSON Server để lấy danh sách sản phẩm
      const response = await axios.get(`${products}/${id}`);
      const product = response.data;
      // Lấy id trên url.

      console.log(product);
      // Đặt giá trị của các trường form dựa trên thông tin sản phẩm
      document.getElementById('id').value = product.id;
      document.getElementById('nameProducts').value = product.name;
      document.getElementById('priceProduct').value = product.price;
      document.getElementById('discounts').value = product.discount;
      document.getElementById('img').value = product.img;
      document.getElementById('moi').value = product.new;
      document.getElementById('discribe').value = product.describe;
    } catch (error) {
      console.log(error);
    }
  }

  async function updateProduct() {
    try {
      // Lấy dữ liệu từ các trường form
      const ids = document.getElementById('id').value;
      const img = document.getElementById('img').value;
      const name = document.getElementById('nameProducts').value;
      const price = document.getElementById('priceProduct').value;
      const discounts = document.getElementById('discounts').value;
      const isNew = document.getElementById('moi').value;
      const description = document.getElementById('discribe').value;
  
      // Tạo đối tượng dữ liệu cần cập nhật
      const updateData = {
        id: ids,
        img: img,
        name: name,
        describe :description,
        price: price,
        discount: discounts,
        new : isNew,
        
      };

  
      // Gửi yêu cầu PUT để cập nhật sản phẩm.id
      const response = await axios.put(`${products}/${ids}`, updateData);
  
      // Xử lý phản hồi từ server (nếu cần)
      console.log(response.data);
      alert("Cập nhật sản phẩm thành công");
  
      // Gọi hàm hiển thị lại sản phẩm với dữ liệu từ phản hồi (nếu cần)
      fetchData(response.data);
    } catch (error) {
      console.log(error);
      alert("Cập nhật sản phẩm thất bại");
    }
  }

  
    function  reset(){
      const nameHair = document.getElementById("nameProducts").value="";
      const price = document.getElementById("priceProduct").value ="";
      const discount = document.getElementById("discounts").value ="";
      const city = document.getElementById("city").value ="";
      const image = document.getElementById("image").value ="";
      const cuOrmoi = document.getElementById("cuOrmoi").value="";
      const services = document.getElementById("services").value ="";
      const address = document.getElementById("address").value ="";
      const messageText = document.getElementById("messageText").value="";

    }