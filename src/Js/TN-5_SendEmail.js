const urlAccount="https://pnv-hair.onrender.com/Account"


console.log(searchInput);
async function searchAccount() {
    const currentAccount = document.getElementById('searchInput').value;
    try {
        const response = await axios.get(urlAccount);
        const data = response.data;

        const foundAccount = data.find(Account => Account.email === currentAccount || Account.phone === currentAccount);
    
        if (foundAccount) {
            alert("Đúng")
        }
        else {
            alert("Sai")
        } 
    }
    catch (error) {
        console.log(error);
    }
}