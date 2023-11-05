// const { async } = require("q");

const hairAPI = 'https://pnv-hair.onrender.com/Hairs';

// TN-25_Admin-User.jsonst endpoint = 'https://pnv-hair.onrender.com/Account';
const fetchData = async () => {
   // Replace with your JSON Server URL
  try {
    const response = await axios.get(hairAPI);
    const data = response.data;
    let tableRows = '';
    data.forEach(function (item) {
      // if(!item.role)
      // {
        tableRows += '<tr>';
        tableRows += '<td>' + item.id + '</td>';
        tableRows += '<td>' + item.name + '</td>';
        tableRows += '<td>' + item.price + '</td>';
        tableRows += '<td>' + item.address + '</td>';
        tableRows += '<td>' + item.city + '</td>';
        tableRows += '<td>' + item.discount + '</td>';
        // tableRows += '<td><a href="./TN-25_Admin-add-hair-modal.html"><button type="button" class="btn btn-primary" data-toggle="modal" data-target="#putData" onclick="handleOnclick(' + item.id + ')" data-whatever="@mdo">Sửa</button><<button type="button" class="btn btn-primary top: 10px" data-toggle="modal" onclick="deleteProduct(' + item.id + ')" data-whatever="@mdo">Xóa</button></td>';
        tableRows += '<td><button type="button" id="hair" class="btn btn-primary ml-2" data-toggle="modal" data-target="#putDataHair" onclick="handleOnclick(' + item.id + ')" data-whatever="@mdo">Sửa</button><button type="button" class="btn btn-primary top: 30px ml-2" data-toggle="modal" onclick="deleteHair(' + item.id + ')" data-whatever="@mdo">Xóa</button></td>';

        // console.log(item.id);
        tableRows += '</tr>';
      // }
    });
    const tableBody = document.getElementById('resultHair');
    tableBody.innerHTML = tableRows;
    // console.log(tableRows);


  } catch (error) {
    console.log("Error:", error);
  }
};
fetchData();

// đẩy ảnh lên cloundinary
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
        // console.log(data);
        url = data.secure_url
      })
      .catch((err) => console.log(err));
    return url
  }

  return;


}

// submitAddHair();
async  function submitAddHair(){
      // Lấy giá trị của các trường trong form
      const name_Hair = document.getElementById("nameHair");
      const price_Hair = document.getElementById("price");
      const discount_Hair = document.getElementById("discount");
      const city_Hair = document.getElementById("city");
      // const image = document.getElementById("image").value;
      const dataImage = await uploadImg();
      const cuOrmoi_Hair = document.getElementById("cuOrmoi");
      const services_Hair = document.getElementById("services");
      const address_Hair = document.getElementById("address");

      const messageText_Hair = document.getElementById("message_hair");

  // console.log(name_Hair);
      // Kiểm tra các điều kiện
      if (!name_Hair || !price_Hair || !discount_Hair || !city_Hair || !dataImage || !cuOrmoi_Hair || !services_Hair || !address_Hair || !messageText_Hair) {
        alert("Vui lòng điền đầy đủ thông tin");
        return;
      }
      if(dataImage){

        const nameHair = name_Hair.value;
        const price = parseInt(price_Hair.value);
        const discount = parseInt(discount_Hair.value);
        const city = city_Hair.value;
        const dataImage = await uploadImg();
        const cuOrmoi = cuOrmoi_Hair.value;
        const services = services_Hair.value;
        const address = address_Hair.value;
        const messageText = messageText_Hair.value;
        // Object 
        const hairData = {
          img: dataImage,
          name: nameHair,
          city: city,
          address: address,
          describe: messageText,
          price: price,
          services: services,
          discount: discount,
          new: cuOrmoi,
         
        };

        console.log(hairData);
      await axios.post(hairAPI,hairData)
  
        .then(response => {
          // console.log(response.data);
          alert("Thêm mẫu tóc thành công");
          fetchData(response.data);
          reset();
      
        })
        .catch(error => {
          console.log("Error:", error)
        })
      
  }
  
}
// Xóa sản phẩm
function deleteHair(id) {
  axios
    .delete(hairAPI + "/" + id)
    .then(() => {
      console.log(id);
      alert("Xóa sản phẩm thành công");
      fetchData();

    })
    .catch(error => console.error("Error:", error));
}

// handleOnclick();
async function handleOnclick(id) {
    try {
      // Gửi yêu cầu GET đến JSON Server để lấy danh sách sản phẩm
      const response = await axios.get(`${hairAPI}/${id}`);
      const hairs = response.data;
      console.log(hairs);
      // Đặt giá trị của các trường form dựa trên thông tin sản phẩm
      document.getElementById('id').value = hairs.id;
      document.getElementById('nameHair').value = hairs.name;
      document.getElementById('address_hair').value = hairs.address;
      document.getElementById('city_hair').value = hairs.city;
      document.getElementById('price_hair').value = hairs.price;
      document.getElementById('discount_hair').value = hairs.discount;
      document.getElementById('hairModal').value = hairs.img;
      document.getElementById('service_hair').value = hairs.service;
      document.getElementById('moiCu_hair').value = hairs.new;
      document.getElementById('message_hair').value = hairs.describe;

    } 
    catch (error) {
      console.log(error);
    }


  }
  


async  function updateHair() {
    const ids = document.getElementById('id').value;
    const name = document.getElementById('nameHair').value;
    const price = document.getElementById('price_hair').value;
    const discount = document.getElementById('discount_hair').value;
    const news = document.getElementById('moiCu_hair').value;
    const discribe = document.getElementById('message_hair').value;
    const service = document.getElementById('service_hair').value;
    const city = document.getElementById('city_hair').value;
    const address = document.getElementById('address_hair').value;
    const updateDataHair = {
      id: ids,
      name: name,
      city: city,
      address: address,
      price: price,
      discount: discount,
      service: service,
      discribe: discribe,
      new: news
    };
  
  await  axios
      .put(hairAPI + '/' + ids, updateDataHair)
      .then(response => {
        console.log(response.data);
        alert("Cập nhật sản phẩm thành công");
        fetchData(response.data);
      })
      .catch(error => {
        console.error('Error:', error);
      });
  }

  function reset(){
    const ids = document.getElementById('id').value="";
    const name = document.getElementById('nameHair').value="";
    const price = document.getElementById('price_hair').value="";
    const discount = document.getElementById('discount_hair').value="";
    const news = document.getElementById('moiCu_hair').value="";
    const discribe = document.getElementById('message_hair').value="";
    const city = document.getElementById('city_hair').value="";
    const address = document.getElementById('address_hair').value="";

  }