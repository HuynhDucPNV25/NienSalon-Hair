// Lấy dữ liệu sản phẩm từ LocalStorage hoặc sử dụng mảng mẫu nếu chưa có dữ liệu trong LocalStorage
var products = JSON.parse(localStorage.getItem('products')) || [
];

// Lưu trữ dữ liệu sản phẩm vào LocalStorage
localStorage.setItem('products', JSON.stringify(products));

// Hiển thị dữ liệu sản phẩm lên màn hình
var productContainer = document.getElementById('product-container');

// Tạo phần tử con để gán
function renderProducts() {
  productContainer.innerHTML = '';

  products.forEach(function (product, index) { //Callback
    var productDiv = document.createElement('div');
    productDiv.innerHTML = `
    <h2>${product.name}</h2>
    <p><strong>Thương hiệu:</strong> ${product.brand}</p>
    <p><strong>Giá:</strong> ${product.price} VND</p>
    <p>${product.description}</p>
    <img src="${product.image}" alt="${product.name}">
    <button class="deleteButton" data-index="${index}">Xoá</button>
  `;
    productContainer.appendChild(productDiv); // Copy phần tử cha và lưu vào trong bộ nhớ
  });
}

renderProducts();

var addProductButton = document.getElementById('addProductButton');
addProductButton.addEventListener('click', function () {
  var productName = document.getElementById('productNameInput').value;
  var brand = document.getElementById('brandInput').value;
  var price = document.getElementById('priceInput').value;
  var description = document.getElementById('descriptionInput').value;
  var image = document.getElementById('imageInput').value;

  var newProduct = {
    name: productName,
    brand: brand,
    price: parseFloat(price),
    description: description,
    image: image
  };

  products.push(newProduct);

  localStorage.setItem('products', JSON.stringify(products));

  renderProducts();
});

// Xoá sản phẩm button
productContainer.addEventListener('click', function (event) {
  // sử dụng addEventListener() để gắn sự kiện "click" vào productContainer
  // khi có sự kiện "click" hàm truyền vào sẽ được thực thi

  if (event.target.classList.contains('deleteButton')) {
    // kiểm tra trong DOM có 'deleteButton' đúng thì xoá
    var index = event.target.dataset.index; 
    products.splice(index, 1);
    localStorage.setItem('products', JSON.stringify(products));
    renderProducts();
  }
});