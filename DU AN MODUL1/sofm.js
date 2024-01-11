class User{
    constructor(id,userName,password) {
        this.id = id;
        this.userName = userName;
        this.password = password
    }
}
class Order{
    constructor(name,size,quantity,address) {
        this.name = name;
        this.size = size;
        this.quantity = quantity;
        this.address = address;
    }
}
let user = new User(1,'admin','123');
let isLogin =false;
let carts = [];
class Product {
    constructor(id, name, price,quantity, image) {
        this.id = id;
        this.name = name;
        this.price = price;
        this.quantity = quantity;
        this.image = image;
    }
    static currentId = 7;
}
let products = [
    new Product(1,"Coffee Đen",10000,100,"https://drive.gianhangvn.com/image/uong-ca-phe-dung-cach-co-loi-cho-suc-khoe-824585j12208.jpg"),
    new Product(2,"Coffee Sữa",15000,100,"https://oola.vn/wp-content/uploads/2023/03/14.-Ca-phe-nau.png"),
    new Product(3,"Coffee Muối",20000,100,"https://cdn.tgdd.vn/Files/2023/05/26/1531616/ca-phe-muoi-chu-long-co-gi-ma-hap-dan-cong-dong-mang-den-the-202305261129533569.jpg"),
    new Product(4,"Coffee Trứng Sữa",25000,100,"https://hvnclc.vn/wp-content/uploads/2022/10/CafeGiang.jpg"),
    new Product(5,"Sinh tố bơ",30000,100,"https://cdn.tgdd.vn/Files/2017/10/04/1030185/cach-lam-sinh-to-bo-ngon-don-gian-khong-bi-dang-202111031415543158.jpg"),
    new Product(6,"Sinh tố xoài",30000,100,"https://quangon.vn/resources/2020/04/03/cach-lam-sinh-to-xoai--2.jpg"),
    new Product(7,"Sinh tố mãng cầu",30000,100,"https://dayphache.edu.vn/wp-content/uploads/2016/06/sinh-to-mang-cau.jpg")
];
let filter = {
    kw: "",
    currentPage: 1,
    limit: 2
}
displayFiltered(products);

function displayFiltered(){
    let productCopies = [...products];
    let filterProducts = productCopies.slice((filter.currentPage-1) *filter.limit, (filter.currentPage-1) *filter.limit + filter.limit);
    display(filterProducts);
}
function display(arr){
    let str = "";
    for (let i = 0; i < arr.length; i++){
        str += `<tr>
           <td>${arr[i].id}</td>
           <td>${arr[i].name}</td>
           <td>${arr[i].price}</td>
           <td>${arr[i].quantity}</td>
           <td>
                <img src="${arr[i].image}" width="120" height="140">
           </td>
           <td>
                <button class="btn-edit-delete" id="edit${i}" onclick="editAccount(${i})" disabled>Edit</button>
           </td>
           <td>
                <button class="btn-edit-delete" id="delete${i}" onclick="deleteAccount(${i})" disabled>Delete</button>
           </td>         
       </tr>`
    }
    document.getElementById('display').innerHTML = str;
    let strPage  = "";
    let pageNumber = Math.ceil(products.length / filter.limit);
    console.log(pageNumber)
    // hiển thị ra previous
    if (filter.currentPage >1){
        strPage += `<li onclick="goToPage(${filter.currentPage-1})">Previous</li>`
    }
    for(let i = 1;i<= pageNumber;i++){
        strPage += `<li onclick="goToPage(${i})" ${filter.currentPage === i ? 'class="active"' : ''}>${i}</li>`
    }
    if(filter.currentPage <= pageNumber-1){
        strPage += `<li onclick="goToPage(${filter.currentPage+1})">Next</li>`
    }
    document.getElementById("cf-pagination").innerHTML = strPage;
    disableAction();
}


function goToPage(page){
    filter.currentPage = page;
    let productCopies = [...products];
    let filterProducts = productCopies.slice((page-1) *filter.limit, (page-1) *filter.limit + filter.limit);
    display(filterProducts);
}
function deleteAccount(index){
    products.splice(index,1)
    displayFiltered(products);
    alert('đã xóa sản phẩm thành công');
}
function editAccount(index){
    let drink = prompt("nhập tên đồ uống mới");
    let price = prompt('nhập giá mới');
    let quantity = prompt('nhập số lượng mới') ;
    let image = prompt("nhập ảnh mới");
    if (drink === "" && price === "" && quantity === "" && image === "" || drink === null && price === null && quantity === null && image === null)  {
        alert("không được để trống sản phẩm");
        return;
    }
    price = parseInt(price);
    quantity = parseInt(quantity);
    let editproduct = products[index];
    editproduct.name = drink;
    editproduct.price = price;
    editproduct.quantity = quantity;
    editproduct.image = image;
    displayFiltered(products);
    alert('đã sửa sản phẩm thành công');
}
function addProductnew(){
    let drink = prompt("nhập tên đồ uống mới");
    let price = prompt("nhập giá mới");
    let quantity = prompt("nhập số lượng mới");
    let image = prompt("nhập ảnh mới");
    if (drink === "" && price === "" && quantity === "" && image === "" || drink === null && price === null && quantity === null && image === null){
        alert("không được để trống sản phẩm");
        return;
    }
    price = parseInt(price);
    quantity = parseInt(quantity);
    let productnew = new Product()
    productnew.name = drink;
    productnew.price = price;
    productnew.quantity = quantity;
    productnew.image = image;
    productnew.id = ++Product.currentId;
    products.push(productnew);
    displayFiltered(products);
    alert('đã thêm sản phẩm thành công');
}
function oderProduct() {
    let drinkName = document.getElementById('ip-name').value.trim();
    let size = document.getElementById('ip-size').value.trim();
    let quantity = document.getElementById('ip-quantity').value;
    let address = document.getElementById('ip-adress').value.trim();
    if (drinkName === "" && size === "" && quantity === "" && address === "") {
        alert('vui lòng nhập thông tin vào');
    }
    let index = -1;
    for (let i = 0; i < products.length; i++){
        if (products[i].name === drinkName){
            index = i;
            break;
        }
    }
    if (index === -1){
        alert('thông tin sản phẩm không tồn tại');
        return;
    }
    if (quantity < 0){
        alert('không tồn tại số lượng âm')
        return;
    }
    if (products[index].quantity < quantity) {
        alert('số lượng không đủ');
        return;
    }
    alert('order thành công');
    products[index].quantity-= parseInt(quantity);
    let orderObj = new Order(drinkName,size,quantity,address)
    addToCart(orderObj);
    document.getElementById('ip-name').value = "";
    document.getElementById('ip-size').value = "";
    document.getElementById('ip-quantity').value = "";
    document.getElementById('ip-adress').value = "";
    displayFiltered(products);
}
function searchProduct(){
    let nameSearch = document.getElementById('search').value;
    let productSearch = [];
    for (let i = 0; i < products.length; i++){
        if (products[i].name.includes(nameSearch)){
            productSearch.push(products[i]);
        }
    }
    display(productSearch);
}

function login(){
    let userName = prompt("Nhập userName");
    let password = prompt("Nhập pass")
    if (userName === user.userName && password === user.password){
        alert('đăng nhập thành công')
        isLogin = true;
        disableAction();
    }

}
function disableAction(){
    if(isLogin){
        document.getElementById("bt-add").removeAttribute("disabled");
        for (let i = 0; i < products.length; i++ ) {
            let editId = "edit" + i;
            let deleteId = "delete" + i;
            document.getElementById(editId).removeAttribute("disabled");
            document.getElementById(deleteId).removeAttribute("disabled");
        }
    }
}

function addToCart(order) {
    carts.push(order);
}
function displayCart(){
    let str = "";
    for (let i = 0; i < carts.length; i++){
        str += `<tr>
           <td>${i + 1}</td>
           <td>${carts[i].name}</td>
           <td>${carts[i].size}</td>
           <td>${carts[i].quantity}</td>
       </tr>`
        console.log(carts[i].name);
    }
    document.getElementById('cart').innerHTML = str;
    document.getElementById('cart-table').style.display = "";
}
