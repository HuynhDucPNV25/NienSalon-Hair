// const urlAccount="https://pnv-hair.onrender.com/Account"
const urlAccount = "http://localhost:4002/Account";
const resetEmailUrl = "http://localhost:4002/reset";
async function searchAccount() {
    const currentAccount = document.getElementById('searchInput').value;
    // console.log(currentAccount);
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
            window.location.href='TN-17_loginPage.html';
            const data= await axios.post(resetEmailUrl, { email })
            console.log(data)          
        }
        else {
            alert("Không tìm thấy tài khoản!!")
        } 
    }
    catch (error) {
        console.log(error);
    }
}