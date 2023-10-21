// 

const userAPI = "https://pnv-hair.onrender.com/Account";

const apppaerUsser =document.querySelector(getUsser); //('getUsser');

const getUsers = async()=>{
    const response= await axios.get(userAPI);
    const table = document.createElement("tbody");
    response.data.forEach(element => {
        
        if(element.role==false){
            table.innerHTML +=`
            <tr>
                <th scope="row">${element.id}</th>
                <td>${element.name}</td>
                <td>${element.password}</td>
                <td>${element.email}</td>
                <td>${element.phone}</td>
                <td>${element.sex}</td>
            </tr>`;
        };
        apppaerUsser.appendChild(table);
    });
    table.innerHTML += "</tbody>";
   
}
getUsers();