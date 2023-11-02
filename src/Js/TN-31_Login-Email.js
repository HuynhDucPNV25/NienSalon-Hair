// const accountDataUrl = "https://pnv-hair.onrender.com/Account";

// const loginWithEmail = async () => {
//   const response = await axios.get(accountDataUrl);
//   const accountData = response.data;
//   const email = document.getElementById("loginEmail").value;
//   const password = document.getElementById("password").value;
  
//   if (email === "" || password === "") {
//     alert("Xin hãy nhập email đăng nhập và mật khẩu!");
//   } else {
//     const account = accountData.find((item) => item.email === email);
//     if (account) {
//       const isPasswordMatch = password === account.password;
//       if (isPasswordMatch) {
//         const userData = {
//           email: email,
//           password: account.password,
//         };
//         localStorage.setItem("userData", JSON.stringify(userData));
//         alert("Đăng nhập thành công");
//         document.getElementById("loginEmail").value = "";
//         document.getElementById("password").value = "";
//         // window.location.href = "/src/html/TN-1_HomePage.html"; // Redirect to user or admin page
//       } else {
//         alert("Sai email đăng nhập hoặc mật khẩu!");
//       }
//     } else {
//       alert("Sai email đăng nhập hoặc mật khẩu!");
//     }
//   }
// };
