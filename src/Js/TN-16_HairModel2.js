const hairDataUrl = "https://pnv-hair.onrender.com/Hairs";

const hairAll = document.getElementById('DetailHair2');

async function getData() {
  try {
    const response = await axios.get(hairDataUrl);
    response.data.forEach(item => {
      const div = document.createElement('div');
      div.classList.add('col-lg-3', 'col-md-4', 'col-sm-6', 'col-12');
      div.innerHTML = `
      <div class="card card" id="card">
      <b class="text-light px-1" id="discountP" style="position: absolute; top:5px;left:0px; background-color: rgb(254, 90, 58);">
        ${item.discount}%
      </b>
      <img style="max-height:190px;" src="${item.img}" alt="${item.name}" class="card-img-center>
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
      hairAll.appendChild(div);
    });
  } catch (error) {
    console.error(error);
  }
}

// Gọi hàm getData
getData();
async function searchHair1(event) {
  const searchString = event.target.value.trim().toLowerCase();
  console.log(searchString);
  const hairList = document.getElementById("hair-list1");
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