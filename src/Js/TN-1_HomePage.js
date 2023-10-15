const host = "https://provinces.open-api.vn/api/";
const hairDataUrl = "http://localhost:4002/hairs";
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
            <a href="/src/html/TN-16_Hair-Model.html?id=${item.id}" class="cards">
              <div class="card card" id="cards">
                <img style="max-height:190.05px;" src="${item.img}" alt="${item.name}" class="card-img-top">
                <div class="card-body">
                  <h5 class="card-title" style="color: #CC2C2C;">${item.name}</h5>
                  <p class="card-text" style="color: gray;">Địa chỉ: ${item.address}</p>
                  <p class="card-text"> ID: ${item.id}</p>
                </div>
              </div><br>
            </a>
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
  const topMauTocElement = document.getElementById('topMauToc');
  agencyElement.textContent = selectedCity;
  agencyElement.setAttribute('data-agency', selectedCity);
  topSalonElement.textContent = `Top salon tại ${selectedCity}`;
  topSalonElement.setAttribute('data-agency', selectedCity);
  topMauTocElement.textContent = `${selectedCity}`;
  topMauTocElement.setAttribute('data-agency', selectedCity);
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

// Hàm gọi API để lấy danh sách tất cả mẫu tóc
const fetchAllHairData = async () => {
  try {
    const response = await axios.get(hairDataUrl);
    while (hairAll.firstChild) {
      hairAll.firstChild.remove();
    }
    response.data.forEach(item => {
      const div = document.createElement('div');
      div.classList.add('col-lg-3', 'col-md-4', 'col-sm-6', 'col-12');
      div.innerHTML = `
        <a href="/src/html/TN-16_Hair-Model.html?id=${item.id}" class="cards">
          <div class="card card">
            <img style="max-height:190.05px;" src="${item.img}" alt="${item.name}" class="card-img-top">
            <div class="card-body">
              <h5 class="card-title" style="color: #CC2C2C;">${item.name}</h5>
              <p class="card-text card-text--wrap" style="color: gray;">Địa chỉ: ${item.address}</p>
              <p class="card-text"> ID: ${item.id}</p>
            </div>
          </div><br>
        </a>
        `;
      hairAll.appendChild(div);
    });
  } catch (error) {
    console.error(error);
  }
};
fetchAllHairData();