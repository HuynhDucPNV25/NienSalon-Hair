const hairDataUrl = "https://pnv-hair.onrender.com/Product";
const accountDataUrl = "https://pnv-hair.onrender.com/Account";
const cartDataUrl = "https://pnv-hair.onrender.com/Cart";
function getHairIdFromURL() {
  const urlParams = new URLSearchParams(window.location.search);
  const id = urlParams.get("id");
  return parseInt(id);
}
const currentHairId = getHairIdFromURL();
async function getData() {
  try {
    const response = await axios.get(`${hairDataUrl}/${currentHairId}`);
    const currentHair = response.data;

    if (currentHair) {
      const div = document.createElement("div");
      const discountPrice = (currentHair.price * (100 - currentHair.discount)) / 100;

      div.innerHTML = `
        <div class="d-flex justify-content-center row">
          <div class="col-md-8">
            <div class="p-2">
          <div style="margin-left:290px" ><h4>Product Cart</h4></div>
              <div style="margin-left:97%;" class="d-flex align-items-center">
              <button type="button"><a href=/src/html/TN-1_HomePage.html>
                  <i class="fa-solid fa-circle-xmark mb-1 text-danger"></i>
                </a></button>
              </div>
              <div class="d-flex flex-row align-items-center pull-right">
                <span class="mr-1">Sort by:</span>
                <span class="mr-1 font-weight-bold">VNĐ</span>
                
              </div>
            </div>
            <div class="d-flex flex-row justify-content-between align-items-center p-2 bg-white mt-4 px-3 rounded">
              <div class="mr-1">
                <img class="rounded" src="${currentHair.img}" alt="${currentHair.name}" width="70">
              </div>
              <div class="d-flex flex-column align-items-center product-details">
                <span class="font-weight-bold">
                  <h5 id="outNameProduct">${currentHair.name}</h5>
                </span>
              </div>
              <div class="d-flex flex-row align-items-center qty">
                <button type="button" onClick="minusProduct(${discountPrice.toFixed(2)})">
                  <i class="fa fa-minus text-danger"></i>
                </button>
                <h5 class="text-grey mt-1 mr-1 ml-1" id="plus">1</h5>
                <button type="button" onClick="plusProduct(${discountPrice.toFixed(2)})">
                  <i class="fa fa-plus text-success"></i>
                </button>
              </div>
            </div>
            <div class="d-flex flex-row align-items-center justify-content-center mt-3 p-2 bg-white rounded">
              <p id="outputPrice">${discountPrice.toFixed(2)} VNĐ</p>
            </div>
            <div class="d-flex flex-row align-items-center mt-3 p-2 bg-white ">
              <button class="btn btn-warning btn-block btn-lg ml-2 pay-button" type="button" onclick="postCart()">
                Proceed to Pay
              </button>
            </div>
          </div>
</div>
      `;
      const outNameProduct = div.querySelector("#outNameProduct");
      outNameProduct.textContent = currentHair.name;

      const body = document.getElementById("DetailProduct");
      body.appendChild(div);
    } else {
      console.log("No hair model found.");
    }
  } catch (error) {
    console.log(error);
  }
}

function plusProduct(discountPrice) {
  const plusEl = document.getElementById("plus");
  let count = parseInt(plusEl.innerHTML);
  count++;
  plusEl.textContent = count;

  if (count > 0) {
    discountPrice = parseInt(discountPrice) * count;
    const outputPrice = document.getElementById("outputPrice");
    outputPrice.textContent = `${discountPrice.toFixed(2)} VNĐ`;
  }
}

function minusProduct(discountPrice) {
  const plusEl = document.getElementById("plus");
  const count = parseInt(plusEl.textContent);

  if (count > 0) {
    plusEl.textContent = count - 1;
    discountPrice = discountPrice * (count - 1);
    const outputPrice = document.getElementById("outputPrice");
    outputPrice.textContent = `${discountPrice.toFixed(2)} VNĐ`;
  }
}

async function postCart() {
  const userData = JSON.parse(localStorage.getItem('userData'));
  try {
    const accountData = await axios.get(accountDataUrl);
    const account = accountData.data.find((item) => item.username === userData.username);
    console.log(account);
    if (account) {
      const cartData = {
        nameUser: userData.username,
        nameProduct: document.getElementById("outNameProduct").textContent,
        quantity: parseInt(document.getElementById("plus").textContent),
        price: parseFloat(document.getElementById("outputPrice").textContent),
        userID:userData.id
      };
      const response = await axios.post(cartDataUrl, cartData);
      console.log("Đặt hàng thành công.");
    } else {
      console.log('Không tìm thấy tài khoản phù hợp!');
    }
  } catch (error) {
    // console.log(error);
  }
}
getData(); 

// Lấy id của model tóc từ URL
function getHairIdFromURL() {
  const urlParams = new URLSearchParams(window.location.search);
  const id = urlParams.get("id");
  return parseInt(id);
}

// Lấy chi tiết và hiển thị sản phẩm tóc
async function getProductDetails() {
  const currentHairId = getHairIdFromURL();
  const response = await axios.get(`${hairDataUrl}/${currentHairId}`);
  const currentHair = response.data;

  if (currentHair) {
    renderProductDetails(currentHair);
  } else {
    console.log("No hair model found.");
  }
}

// Hiển thị chi tiết sản phẩm tóc lên giao diện
function renderProductDetails(data) {
  const { name, img, price, discount } = data;
  const discountPrice = (price * (100 - discount)) / 100;

  const html = `
    <div class="d-flex justify-content-center row">
      <div class="col-md-8">
        <div class="p-2">
          <div style="margin-left:290px" >
            <h4>Buying Product</h4>
          </div>
<div style="margin-left:97%;" class="d-flex align-items-center">
            <button type="button">
              <a href=/src/html/TN-1_HomePage.html>
                <i class="fa-solid fa-circle-xmark mb-1 text-danger"></i>
              </a>
            </button>
          </div>
          <div class="d-flex flex-row align-items-center pull-right">
            <span class="mr-1">Sort by:</span>
            <span class="mr-1 font-weight-bold">VNĐ</span>
          </div>
        </div>
        <div class="d-flex flex-row justify-content-between align-items-center p-2 bg-white mt-4 px-3 rounded">
          <div class="mr-1">
            <img class="rounded" src="${img}" alt="${name}" width="70">
          </div>
          <div class="d-flex flex-column align-items-center product-details">
            <span class="font-weight-bold">
              <h5 id="outNameProduct">${name}</h5>
            </span>
          </div>
          <div class="d-flex flex-row align-items-center qty">
            <button type="button" onClick="minusProduct(${discountPrice.toFixed(2)})">
              <i class="fa fa-minus text-danger"></i>
            </button>
            <h5 class="text-grey mt-1 mr-1 ml-1" id="plus">1</h5>
            <button type="button" onClick="plusProduct(${discountPrice.toFixed(2)})">
              <i class="fa fa-plus text-success"></i>
            </button>
          </div>
        </div>
        <div class="d-flex flex-row align-items-center justify-content-center mt-3 p-2 bg-white rounded">
          <p id="outputPrice">${discountPrice.toFixed(2)} VNĐ</p>
        </div>
        <div class="d-flex flex-row align-items-center mt-3 p-2 bg-white ">
          <button class="btn btn-warning btn-block btn-lg ml-2 pay-button" type="button" onclick="postCart()">
            Proceed to Pay
          </button>
        </div>
      </div>
    </div>
  `;

  const container = document.getElementById("DetailProduct");
  container.innerHTML = html;
  // Cập nhật tên sản phẩm
  const outNameProduct = container.querySelector("#outNameProduct");
  outNameProduct.textContent = name;
}

// Thêm số lượng sản phẩm
function addProductQuantity(discountPrice, quantity) {
  const plusEl = document.getElementById("plus");
  let count = parseInt(plusEl.innerHTML) + quantity;
  plusEl.textContent = count;

  if (count > 0) {
    discountPrice = parseInt(discountPrice) * count;
    const outputPrice = document.getElementById("outputPrice");
    outputPrice.textContent = `${discountPrice.toFixed(2)} VNĐ`;
  }
}

// Giảm số lượng sản phẩm
function substractProductQuantity(discountPrice, quantity) {
  const plusEl = document.getElementById("plus");
  const count = parseInt(plusEl.textContent) - quantity;

  if (count > 0) {
    plusEl.textContent = count;
    discountPrice = discountPrice * count;
    const outputPrice = document.getElementById("outputPrice");
outputPrice.textContent = `${discountPrice.toFixed(2)} VNĐ`;
  }
}

// Lưu thông tin sản phẩm vào giỏ hàng
async function saveProductToCart() {
  const userData = JSON.parse(localStorage.getItem('userData'));
  try {
    const { data } = await axios.get(accountDataUrl);
    const account = data.find((item) => item.username === userData.username);

    if (account) {
      const cartData = {
        img: document.querySelector(".rounded").src,
        nameUser: userData.username,
        NameHair: document.getElementById("outNameProduct").textContent,
        quantity: parseInt(document.getElementById("plus").textContent),
        price: parseFloat(document.getElementById("outputPrice").textContent)
      };
      const response = await axios.post(cartDataUrl, cartData);
      alert("Đặt hàng thành công.");
    } else {
      alert('Bạn chưa đăng kí thành viên!');
    }
  } catch (error) {
    console.log(error);
  }
}

// Khởi tạo trang chi tiết sản phẩm tóc
async function initProductDetailPage() {
  await getProductDetails();
}

// Kiểm tra người dùng đã đăng nhập mới cho phép truy cập vào trang
function checkUserLogin() {
  const userData = JSON.parse(localStorage.getItem('userData'));
  if (!userData || userData.username === '') {
    window.location.replace("./TN-1_Login.html");
  }
}

// Thực thi các chức năng
checkUserLogin();
initProductDetailPage();