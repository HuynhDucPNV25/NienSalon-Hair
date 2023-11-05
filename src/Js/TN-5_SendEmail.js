// const urlAccount="https://pnv-hair.onrender.com/Account"
const urlAccount = "https://pnv-hair.onrender.com/Account";
const resetEmailUrl = "https://pnv-hair.onrender.com/reset";
async function searchAccount() {
    const currentAccount = document.getElementById('searchInput').value;
    console.log(currentAccount);
    try {
        const response = await axios.get(urlAccount);
        const data = response.data;
        // console.log(data);
        
        const foundAccount = data.find(Account => Account.email === currentAccount || Account.phone === currentAccount);
        if (currentAccount == ""){
            alert("Bạn chưa nhập");
               
        }else if (foundAccount) {
            alert("Mời bạn kiểm tra Email!!")
            const email = currentAccount;
            const data= await axios.post(resetEmailUrl, { email })
            window.location.href='TN-17_loginPage.html';
        }
        else {
            alert("Không tìm thấy tài khoản!!")
        } 
    }
    catch (error) {
        console.log(error);
    }
}