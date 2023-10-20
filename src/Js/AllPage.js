const slideData = [
    { imageSrc: "../../image/pd1.png" },
    { imageSrc: "../../image/pd2.png" },
    { imageSrc: "../../image/GGG 2.png" }
  ];
  
  const createCarouselSlide = (slide, isActive) => {
    const slideElement = document.createElement("div");
    slideElement.classList.add("carousel-item");
    if (isActive) {
      slideElement.classList.add("active");
    }
    slideElement.innerHTML = `
      <div>
        <img src="${slide.imageSrc}" alt="">
      </div>
    `;
    document.getElementById("carouselInner").appendChild(slideElement);
  };
  
  slideData.forEach(function(slide, index) {
    const isActive = index === 0 ? true : false;
    createCarouselSlide(slide, isActive);
  });

  
// Lấy đường dẫn URL hiện tại
var url = window.location.href;
// Lấy danh sách các phần tử menu
var menuItems = document.querySelectorAll('.navbar-nav .nav-item');
// Lặp qua từng phần tử menu
menuItems.forEach(function(item, index) {
  // Kiểm tra nếu đường dẫn URL chứa "/src/html/TN-16_Hair-Model.html" và truyền vào id tương ứng
  if (url.includes(`/src/html/TN-16_Hair-Model.html?id=${item.id}`)) {
    // Thêm lớp active cho phần tử thứ 2
    if (index === 1) {
      item.classList.add('active');
    } else {
      // Xóa lớp active của các phần tử khác
      item.classList.remove('active');
    }
  } else {
    // Gán sự kiện click cho mỗi phần tử menu
    item.addEventListener('click', function() {
      // Xóa lớp active tất cả các phần tử menu
      menuItems.forEach(function(menuItem) {
        menuItem.classList.remove('active');
      });
      
      // Thêm lớp active cho phần tử được chọn
      this.classList.add('active');
    });
  }
});

//.......nút di chuyên lên đầu trang
const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
};

const onScroll = () => {
  const scrollTopBtn = document.querySelector(".scroll-top-btn");
  const { scrollTop } = document.documentElement;

  scrollTopBtn.style.display = scrollTop > 20 ? "block" : "none";
  scrollTopBtn.style.bottom = "30vh"; // Thiết lập bottom là -25px
  scrollTopBtn.style.position = "absolute"; // Thiết lập position là absolute
  scrollTopBtn.style.position = "fixed"; // Thiết lập position là absolute
};
window.addEventListener("scroll", onScroll);

//.............................Uppload Hình Ảnh.......................................................
//Code HTML 👇
/* <input type="file" id="fileInput" />
<p id="uploading_text"></p> */
//Code HTML 👆
// const fileInput = document.getElementById("fileInput");
// const uploading_text = document.getElementById("uploading_text");

// // replace with your data 👇
// const cloud_name = "duas1juqs";
// const upload_preset = "pnvimage";
// // replace with your data 👆

// fileInput.addEventListener("change", (e) => {
//   uploading_text.innerText = "uploading...";
//   const file = e.target.files[0];
//   const formData = new FormData();
//   formData.append("file", file);
//   formData.append("upload_preset", upload_preset);
//   const options = {
//     method: "POST",
//     body: formData,
//   };

//   return fetch(
//     `https://api.cloudinary.com/v1_1/${cloud_name}/image/upload`,
//     options
//   )
//     .then((res) => res.json())
//     .then((data) => {
//       console.log(data.secure_url);

//       uploading_text.innerHTML = `
//       <span>upload complete.</span>
//       <br />
//       <img style="max-width:300px" src="${data.secure_url}" alt="">
//       <a href="${data.secure_url}">${data.secure_url}</a>
//       `;
//     })
//     .catch((err) => console.log(err));
// });
