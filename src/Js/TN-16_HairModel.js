// const hairDataUrl = "https://pnv-hair.onrender.com/Hairs";
const hairDataUrl = "http://localhost:4002/Hairs";
// Lấy id từ URL
function getHairIdFromURL() {
  const urlParams = new URLSearchParams(window.location.search);
  const id = urlParams.get('id');
  return parseInt(id); // Chuyển đổi id thành số nguyên
}

// Sử dụng id lấy được để thực hiện các thay đổi và truy vấn dữ liệu tương ứng
const currentHairId = getHairIdFromURL();
console.log(currentHairId); 

// Lấy thẻ body
const body = document.getElementById('DetailHair');

// Tạo một đối tượng div để chứa mã HTML
const div = document.createElement('div');

// Lấy dữ liệu từ mock API
async function getData() {
  try {
    const response = await axios.get(`${hairDataUrl}/${currentHairId}`);
    // Tìm mẫu tóc hiện tại dựa trên id
    const currentHair = response.data;

    if (currentHair) {
      // Lấy thẻ img để thay đổi hình ảnh
      // const img = div.querySelector('#Hair-Model-Details-img img');  
      const discountPrice = (currentHair.price * (100 - currentHair.discount)) / 100;
      console.log(discountPrice);
      // Thay đổi mã HTML theo mẫu tóc hiện tại
      div.innerHTML = `
        <div class="container" id="Hair-Model-Details">
          <div class="row">
            <div class="col-md-4" id="Hair-Model-Details-img">
              <img src="${currentHair.img}" alt="${currentHair.name}">
              <div id="discount">${currentHair.discount}%</div>
            </div>
            <div class="col-md-8" id="Hair-Model-Details-text">
              <h3 class="Hair-Model-Details-title">Mẫu tóc: ${currentHair.name}</h3><br>
              <h6 class="font-weight-normal" id="text-describe">
                <lable class="text-secondary h5" >
                  ${currentHair.describe.substring(0, 200)}
                  ${currentHair.describe.length > 200 ? "..." : ""}.
                </lable>
              </h6>
              <p class="text-secondary"><u>Dịch vụ :</u> ${currentHair.service} .</p>
              <p>Địa chỉ: ${currentHair.address}</p>
              <pb class="text-secondary">Giá:</pb>
              <pb class="text-warning" id="price">${currentHair.price}${currentHair.new ? "" : "&nbsp;&nbsp;-->&nbsp;"}${currentHair.new ? "" : discountPrice.toFixed(3)} <u>vnđ</u> 
              </pb>
              <div>
              <button id="schedule" type="button" class="btn btn-light mt-2" onclick="Calender()">
                <i class="fa-solid fa-calendar-days fa-beat-fade mr-3""></i>
                Đặt lịch
              </button>
              </div>
            </div>
          </div>      
        </div>
        <div class="col-md-12 mt-4" id="Hair-Model-Details-texts-feedback">
          <h3>Chi tiết mẫu tóc</h3>
          <p>
            ${currentHair.describe.substring(0, 300)}
            ${currentHair.describe.length > 300 ? `
              <span id="moreDescription" style="display:none;">
                ${currentHair.describe.substring(300)}
                <pb type="button" class="text-warning" onclick="toggleMoreDescription()">Thu gọn</pb>
              </span>
              <k type="button" id="showMoreBtn" class="text-warning" onclick="toggleMoreDescription()">...Xem thêm</k>
            ` : ""}
          </p>
        </div>
        <div class="col-md-12" id="Hair-Model-Details-icon">
          <h3>Đánh giá mẫu tóc</h3>
          <div class="col-md-12" id="Hair-Model-Details-star">
            <p id="rating-text">0.0/5</p>
            <i class="fa-regular fa-star" onclick="rateHair(1)"></i>
            <i class="fa-regular fa-star" onclick="rateHair(2)"></i>
            <i class="fa-regular fa-star" onclick="rateHair(3)"></i>
            <i class="fa-regular fa-star" onclick="rateHair(4)"></i>
            <i class="fa-regular fa-star" onclick="rateHair(5)"></i>
            <p class="Evaluate" id="rating-count">(0 đánh giá)</p>
            <p>Hãy đánh giá để có trải nghiệm tốt hơn</p>
          </div>
        </div>
      `;
    } else {
      // Hiển thị thông báo khi không tìm thấy mẫu tóc
      div.innerHTML = `
      <div class="banner container-fluid">
      <div class="row">
        <div class="col-1" id="colbanner1"></div>
        <div class="col col-bannerForm ">
          <!-- Form tìm kiếm và đặt lịch -->
          <div class="Rectangle">
            <div class="searchBook">Tìm kiếm và đặt lịch </div>
            <center>
              <p class="form-inline dropdown-toggle" type="button" id="dropdownSearch" data-toggle="dropdown">
                <i class="fa-solid fa-magnifying-glass" style="color:#E55247D9;"></i>
                <input placeholder="Tìm Kiếm ..." class="searchSalon"></input>
              </p>
              <p class="form-inline dropdown-toggle" type="button" id="dropdownSearch" data-toggle="dropdown">
                <i class="fa-solid fa-wand-magic-sparkles" style="color:#E55247D9;"></i>
                <input placeholder="Mẫu Tóc ..." class="searchSalon"></input>
              </p>
              <p class="form-inline dropdown-toggle" type="button" id="dropdownSearch" data-toggle="dropdown">
                <i class="fa-solid fa-bars" style="color: #E55247D9;"></i>
                <input placeholder="Dịch Vụ ..." class="searchSalon"></input>
              </p>
              <button class="btn btn-outline" id="FocusSearch">
                TÌM KIẾM
              </button>
            </center>
          </div>
        </div>
  
        <div class="col col-bannerSlide d-none d-md-block">
          <!-- Slider quảng cáo -->
          <div id="carouselId" class="carousel slide" data-ride="carousel" data-interval="2500">
            <ol class="carousel-indicators">
              <li data-target="#carouselId" data-slide-to="0"></li>
              <li data-target="#carouselId" data-slide-to="1"></li>
              <li data-target="#carouselId" data-slide-to="2"></li>
            </ol>
            <div class="carousel-inner" role="listbox" id="carouselInner">
            </div>
            <div id="sp-icon" class="carousel-control-prev" href="#carouselId" data-slide="prev">
              <span class="carousel-control-prev-icon"></span>
            </div>
            <a id="sp-icon" class="carousel-control-next" href="#carouselId" role="button" data-slide="next">
              <span class="carousel-control-next-icon" aria-hidden="true"></span>
            </a>
          </div>
        </div>
        <div class="col-1"></div>
      </div>
    </div>
      `;
    }
  } catch (error) {
    console.log(error);
  }
}

getData();
// Thêm đối tượng div vào thẻ body
body.appendChild(div);

function toggleMoreDescription() {
  const moreDescription = document.getElementById("moreDescription");
  const showMoreBtn = document.getElementById("showMoreBtn");

  if (moreDescription.style.display === "none") {
    moreDescription.style.display = "inline";
    showMoreBtn.style.display = "none";
  } else {
    moreDescription.style.display = "none";
    showMoreBtn.style.display = "inline";
  }
}
