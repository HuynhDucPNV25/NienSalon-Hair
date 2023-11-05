const host = "https://provinces.open-api.vn/api/";
const hairDataUrl = "https://pnv-hair.onrender.com/Hairs";
// const hairDataUrl = "http://localhost:4002/Hairs";
const hairModel = document.getElementById('Hairmodel-Agency');
const hairAll = document.getElementById('AllHair');

// Hàm khởi tạo thẻ select và hiển thị dữ liệu
const initCitySelect = (selectedCity) => {
  const citySelectElement = document.getElementById('city');
  const agencyElement = document.getElementById('agency');
  const topSalonElement = document.getElementById('topSalon');
  const topMauTocElement = document.getElementById('topMauToc');
  citySelectElement.value = selectedCity;
  agencyElement.textContent = selectedCity;
  agencyElement.setAttribute('data-agency', selectedCity);
  topSalonElement.textContent = `Mẫu tóc tại ${selectedCity}`;
  topSalonElement.setAttribute('data-agency', selectedCity);
  topMauTocElement.textContent = `Tất cả mẫu tóc`;
};
const renderCitySelect = (data) => {
  const citySelectElement = document.getElementById('city');
  let row = '';
  data.forEach(element => {
    row += `<option data-id="${element.code}" value="${element.name}">${element.name}</option>`;
  });
  citySelectElement.innerHTML = row;
};
// Hàm gọi API để lấy danh sách các tỉnh, thành phố
const callAPI = async () => {
  try {
    const response = await axios.get(`${host}?depth=1`);
    renderCitySelect(response.data);
    const selectedCity = localStorage.getItem('selectedCity') || 'Thành phố Hà Nội';
    initCitySelect(selectedCity);
    renderHairData(selectedCity);
  } catch (error) {
    console.error(error);
  }
};
// Hàm gọi API để lấy danh sách các mẫu tóc tương ứng với thành phố được chọn
const fetchHairData = async (selectedCity) => {
  try {
    const response = await axios.get(`${hairDataUrl}?city=${selectedCity}`);
    while (hairModel.firstChild) {
      hairModel.firstChild.remove();
    }
    if (response.data.length === 0) {
      const div = document.createElement('div');
      div.classList.add('col');
      div.innerHTML = `
          <div class="card" id="card">
            <center>
              <h2>Chưa có chi nhánh này</h2>
            </center>
          </div>
        `;
      hairModel.appendChild(div);
    } else {
      response.data.forEach(item => {
        const div = document.createElement('div');
        div.classList.add('col-lg-3', 'col-md-4', 'col-sm-6', 'col-12');
        div.innerHTML = `
              <div class="card card" id="cards">
              <b class="text-light px-1" id="discountP" style="position: absolute; top:5px;left:0px; background-color: rgb(254, 90, 58);">
                ${item.discount}%
              </b>
                <img style="max-height:190px; border-radius:4px" src="${item.img}" alt="${item.name}" class="card-img-center>
                <div class="card-body">
                  <h5 class="card-title" style="color: #CC2C2C;">${item.name}</h5>
                  <p class="card-text" style="color: gray;">Địa chỉ: ${item.address}</p>
                  <div class="d-flex flex-row">
                      <a href="/src/html/TN-2_BookingPage.html?id=${item.id}" class="btn btn-danger btn-rounded mr-2" role="button">
                        <i class="fa-solid fa-calendar-days fa-beat-fade mr-1"></i>Đặt lịch
                      </a>
                      <a href="/src/html/TN-16_Hair-Model.html?id=${item.id}" class="cards">
                        <button id="schedule" type="button" class="btn btn-danger btn-rounded" >
                          <i class="fa-regular fa-eye mr-1"></i>Xem
                        </button> 
                      </a>
                  </div>   
                </div>  
              </div><br>
          `;
        hairModel.appendChild(div);
      });
    }
  } catch (error) {
    console.error(error);
  }
};

const renderHairData = (selectedCity) => {
  fetchHairData(selectedCity);
};
const updateCityText = (selectedCity) => {
  const agencyElement = document.getElementById('agency');
  const topSalonElement = document.getElementById('topSalon');
  agencyElement.textContent = selectedCity;
  agencyElement.setAttribute('data-agency', selectedCity);
  topSalonElement.textContent = `Mẫu tóc tại ${selectedCity}`;
  topSalonElement.setAttribute('data-agency', selectedCity);
  localStorage.setItem('selectedCity', selectedCity);
};
document.addEventListener('DOMContentLoaded', function() {
  // Gọi API để lấy danh sách các tỉnh, thành phố và hiển thị dữ liệu lên thẻ select
  callAPI();
  // Xử lý sự kiện thay đổi của thẻ select
  const citySelectElement = document.getElementById('city');
  citySelectElement.addEventListener('change', function() {
    const selectedCity = citySelectElement.options[citySelectElement.selectedIndex].text;
    updateCityText(selectedCity);
    renderHairData(selectedCity);
  });
  // Xử lý sự kiện nhấp chuột vào thẻ select để mở hoặc đóng dropdown
  citySelectElement.addEventListener('click', function() {
    const dropdownToggleElement = document.querySelector('.dropdown-toggle');
    dropdownToggleElement.classList.toggle('show');
  });
});

//..........................................................................................................
// Số phần tử bạn muốn hiển thị trên mỗi Page
const limit = 4;
// Hàm hiển thị danh sách mẫu tóc tương ứng với page hiện tại
const fetchAllHairData = async () => {
  try {
    const response = await axios.get(hairDataUrl);
    let page = 1;
    const hairData = response.data;

    const hairListElement = $("#hairList");
    const paginationElement = $("#pagination");
    
    const renderHairList = (hairData) => {
      hairListElement.empty();
      hairData.forEach((item) => {
        const div = $("<div>").addClass("col-lg-3 col-md-4 col-sm-6 col-12 col");
        div.html(`
          <div class="card card" id="card">
          <b class="text-light px-1" id="discountP" style="position: absolute; top:5px;left:0px; background-color: rgb(254, 90, 58);">
            ${item.discount}%
          </b>
          <img style="max-height:190px; border-radius:4px" src="${item.img}" alt="${item.name}" class="card-img-center>
          <div class="card-body">
              <h5 class="card-title" style="color: #CC2C2C;">${item.name}</h5>
              <p class="card-text" style="color: gray;">Địa chỉ: ${item.address}</p>
              <div class="d-flex flex-row">
                <a href="/src/html/TN-2_BookingPage.html?id=${item.id}" class="btn btn-danger btn-rounded mr-2" role="button">
                  <i class="fa-solid fa-calendar-days fa-beat-fade mr-1"></i>Đặt lịch
                </a>
                <a href="/src/html/TN-16_Hair-Model.html?id=${item.id}" class="cards">
                  <button id="schedule" type="button" class="btn btn-danger btn-rounded" >
                    <i class="fa-regular fa-eye mr-1"></i>Xem
                  </button> 
                </a>
              </div>
            </div>
          </div><br>
        `);
        hairListElement.append(div);
      });
    };
    
    const renderPagination = (page, totalPages) => {
      paginationElement.empty();
      if (totalPages > 0) {
        paginationElement.append(`
          <nav aria-label="Page navigation">
            <ul class="pagination">
              <li class="page-item ${page === 1 ? "disabled" : ""}">
                <a class="page-link" href="#" data-page="${page - 1}" aria-label="Previous">
                  <span aria-hidden="true">&laquo;</span>
                  <span class="sr-only">Previous</span>
                </a>
              </li>
            </ul>
          </nav>
        `);
        for (let i = 1; i <= totalPages; i++) {
          paginationElement.find("ul.pagination").append(`
            <li class="page-item ${page === i ? "active" : ""}">
              <a class="page-link" href="#" data-page="${i}">${i}</a>
            </li>
          `);
        }
        paginationElement.find("ul.pagination").append(`
          <li class="page-item ${page === totalPages ? "disabled" : ""}">
            <a class="page-link" href="#" data-page="${page + 1}" aria-label="Next">
              <span aria-hidden="true">&raquo;</span>
              <span class="sr-only">Next</span>
            </a>
          </li> 
        `);
        paginationElement.find("a.page-link").on("click", (e) => {
e.preventDefault();
          const newPage = parseInt($(e.target).attr("data-page"));
          if (newPage && newPage !== page) {
            page = newPage;
            renderHairData(page);
          }
        });
      }
    };
    
    const renderHairData = (page) => {
      const start = (page - 1) * limit;
      const end = start + limit;
      const hairDatalimit = hairData.slice(start, end);
      const totalPages = Math.ceil(hairData.length / limit);
      renderPagination(page, totalPages);
      renderHairList(hairDatalimit);
    };
    
    renderHairData(page);
    
  } catch (error) {
    console.error(error);
  }
};

fetchAllHairData();

async function searchHair(event) {
  const searchString = event.target.value.trim().toLowerCase();
  console.log(searchString);
  const hairList = document.getElementById("hair-list");
  if (searchString === "") {
    hairList.innerHTML = "";
    return;
  }
  const response = await axios.get(`${hairDataUrl}`);
  const data = response.data;
  const arr = data.filter(hair => hair.name.toLowerCase().includes(searchString));
  console.log(arr);
  if (arr.length > 0) {
    hairList.innerHTML = "";
    arr.forEach(hair => {
      const listItem = document.createElement("button");
      listItem.setAttribute("type", "button");
      listItem.setAttribute("class", "list-group-item list-group-item-action");
      listItem.textContent = hair.name;
      listItem.addEventListener("click", () => {
        window.location.href=`TN-16_Hair-Model.html?id=${hair.id}`;
        hairList.innerHTML = "";
      });
      hairList.appendChild(listItem);
    });
  } else {
    hairList.innerHTML = "Không tìm thấy mẫu tóc";
  }
}

// ..................................................................................................
const productDataUrl = "https://pnv-hair.onrender.com/Product";
const getProductData = async () => {
  try {
    const response = await axios.get(productDataUrl);
    const data = response.data;
    const productContainer = document.getElementById("product-Homepage");
    data.forEach((product) => {
      const productItem = document.createElement("div");
      productItem.classList.add("carousel-itemmm");
      productItem.innerHTML = `
      <a href="/src/html/TN-30-Detail-Product.html?id=${product.id}" class="text-decoration-none" style="position: relative;">
      <i class="fa-regular fa-heart mt-1" style="position: absolute; right:5px;"></i>
      <img class="carousel-item__img2" src="${product.img}" alt="${product.name}">
        <p class="carousel-item__text2">${product.name}</p>
        <b class="text-light px-1" id="discountP" style="position: absolute; top:-70px; background-color: rgb(254, 90, 58);">
        ${product.discount}%
        </b>
        <button class="text-light" id="ShowProduct" 
        style="
          position: absolute;
          top: 70px; 
          right:10.3%;
          border-radius: 4px;
          border: 1px solid #ff4742;
          background-color: #dc3545;
          font-weight: 800;
          font-size: 14px;
          display:none" onclick="store()"
        >
          <i class="fa-regular fa-eye"></i>
          Xem
      </button>

        <button class="text-light" id="storeP" 
          style="
            position: absolute;
            top: 70px; 
            right:55%;
            border-radius: 4px;
            border: 1px solid #ff4742;
            background-color: #dc3545;
            font-weight: 800;
            font-size: 14px;
            display:none" onclick="store()"
          >
            <i class="fa-solid fa-basket-shopping fa-beat"></i>
            Mua
        </button>  
      </a>
      `;
      const storeB = productItem.querySelector('#storeP');
      const ShowProduct = productItem.querySelector('#ShowProduct');
      const productAnchor = productItem.querySelector('a');
      productAnchor.addEventListener('mouseenter', () => {
        storeB.style.display = 'inline-block';
        ShowProduct.style.display = 'inline-block';
      });
      productAnchor.addEventListener('mouseleave', () => {
        storeB.style.display = 'none';
        ShowProduct.style.display = 'none';
      })
      productContainer.appendChild(productItem);
    });
  } catch (error) {
    console.log(error);
  }
};
getProductData();
