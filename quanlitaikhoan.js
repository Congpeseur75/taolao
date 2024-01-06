class Account{
    id;
    username;
    password;
    role;
    avatar;
    constructor(id,username,password,role,avatar) {
        this.id = id;
        this.username = username;
        this.password = password;
        this.role = role;
        this.avatar = avatar;
    }
    changePassword(newpasss){
        if (this.password === newpasss){
            alert('trùng với password cũ')
        }else {
            this.password = newpasss
        }
    }
}
let user = new Account(1,"user","123","user","https://dragonballwiki.net/wp-content/uploads/2019/03/GotenNV.jpg");
let admin = new Account(2,"admin","123","admin","https://i.pinimg.com/originals/05/41/8c/05418cf00cfe79e957c9c359f972eb5d.jpg");

let account = [user,admin];
display(account);
function display(account){
    let str = "";
   for (let i = 0; i < account.length; i++){
       str += `<tr>
           <td>${account[i].id}</td>
           <td>${account[i].username}</td>
           <td>${account[i].password}</td>
           <td>${account[i].role}</td>
           <td>
                <img src="${account[i].avatar}" width="120" height="140">
           </td>
           <td>
                <button onclick="editAccount(${i})">Edit</button>
           </td>
           <td>
                <button onclick="deleteAccount(${i})">Delete</button>
           </td>  
       </tr>`
   }
    document.getElementById('display').innerHTML = str;
}
function deleteAccount(index){
    account.splice(index,1)
    display(account);
}
function editAccount(index){
    let avatar = prompt("nhập avatar mới");
    let role = prompt("nhập role mới");
    let accounts = account[index];
    accounts.avatar = avatar;
    accounts.role = role;
    display(account);
}

function findByUsername(){
    let nameSearch = document.getElementById('search').value;
    let accountsearch = [];
    for (let i = 0; i < account.length; i++){
        if (account[i].username.includes(nameSearch)){
            accountsearch.push(account[i]);
        }
    }
    display(accountsearch);
}
