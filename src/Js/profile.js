
const fileInput = document.getElementById("fileInput");
const uploading_text = document.getElementById("uploading_text");

const cloud_name = "duas1juqs";
const upload_preset = "pnvimage";

fileInput.addEventListener("change", (e) => {
  uploading_text.innerText = "uploading...";
  const file = e.target.files[0];
  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", upload_preset);
  const options = {
    method: "POST",
    body: formData,
  };
  return fetch(
    `https://api.cloudinary.com/v1_1/${cloud_name}/image/upload`,
    options
  )
    .then((res) => res.json())
    .then((data) => {
      console.log(data.secure_url);
      const avatarUser = document.getElementById("avatar-user");
      avatarUser.src = data.secure_url;
      uploading_text.innerHTML = `
      <br /> 
      `;
    })
    .catch((err) => console.log(err));
});
