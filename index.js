var productName = document.getElementById("productName");
var productPrice = document.getElementById("productPrice");
var productCat = document.getElementById("productCat");
var productDes = document.getElementById("productDes");
var productList = [];
var mainBtn = document.getElementById("main-btn");

var regexName = /^[A-Z][a-z]{1,20}$/;
var regexPrice = /^([1-9][0-9]{3}|10000)$/;
var regexCat = /^(Mobile|Tv|Laptop)$/i;
var regexDes = /^.{10,500}$/
var nameWarning = document.getElementById("name-warning")

if (localStorage.getItem("list") != null) {
    productList = JSON.parse(localStorage.getItem("list"));
    displayProduct();
} else {
    productList = [];
}

function AddProduct() {
    if (regexName.test(productName.value) && regexPrice.test(productPrice.value) && regexCat.test(productCat.value) && regexDes.test(productDes.value)) {
        clearWarning();

        if (mainBtn.innerText == "Update") {
            Update(i);
        } else {
            var product = {
                name: productName.value,
                price: productPrice.value,
                Category: productCat.value,
                Description: productDes.value,
            }
            productList.push(product);
            setToLocalStorage()
            displayProduct();
            clearForm();
            

        }
    } else {
        window.alert("invalid data");
        validateForm()
    }
}


function displayProduct() {
    var list = "";
    for (i = 0; i < productList.length; i++) {
        list += `
        <tr>
            <td>${i + 1}</td>
            <td>${productList[i].name}</td>
            <td>${productList[i].price}</td>
            <td>${productList[i].Category}</td>
            <td>${productList[i].Description}</td>
            <td><button class="btn btn-warning" onclick="getProductData(${i})">Update</button></td>
            <td><button class="btn btn-danger" onclick="deleteProduct(${i})">Delete</button></td>
            </tr>    `
    }
    document.getElementById("tableData").innerHTML = (list);0
    
}
function clearForm() {
    productName.value = "";
    productPrice.value = "";
    productCat.value = "";
    productDes.value = "";
}
function setToLocalStorage() {
    window.localStorage.setItem("list", JSON.stringify(productList));
}
function deleteProduct(i) {
    productList.splice(i, 1);
    displayProduct();
    setToLocalStorage();
}
function getProductData(i) {
    productName.value = productList[i].name;
    productPrice.value = productList[i].price;
    productCat.value = productList[i].Category;
    productDes.value = productList[i].Description;
    mainBtn.innerText = "Update"
}
function Update(i) {
    for (i = 0; i < productList.length; i++) {
        productList[i].name = productName.value;
        productList[i].price = productPrice.value;
        productList[i].Category = productCat.value;
        productList[i].Description = productDes.value
    }
    displayProduct()
    mainBtn.innerText = "Add Product";
    clearForm()
}
function validateForm() {
    if (regexName.test(productName.value) == false) {
        document.getElementById("name-warning").classList.replace("d-none", "d-block")
    } else {
        document.getElementById("name-warning").classList.replace("d-none", "d-block")
    }
    if (regexPrice.test(productPrice.value) == false) {
        document.getElementById("price-warning").classList.replace("d-none", "d-block")
    } else {
        document.getElementById("price-warning").classList.replace("d-block", "d-none")
    }
    if (regexCat.test(productCat.value) == false) {
        document.getElementById("category-warning").classList.replace("d-none", "d-block")
    } else {
        document.getElementById("category-warning").classList.replace("d-block", "d-none")
    }
    if (regexDes.test(productDes.value) == false) {
        document.getElementById("des-warning").classList.replace("d-none", "d-block")
    } else {
        document.getElementById("des-warning").classList.replace("d-block", "d-none")
    }
}
var nameWarning = document.getElementById("name-warning")
var priceWarning = document.getElementById("price-warning")
var catWarning = document.getElementById("cat-warning")
var desWarning = document.getElementById("des-warning")

function clearWarning() {
    document.getElementById("name-warning").classList.replace("d-block", "d-none")
    document.getElementById("price-warning").classList.replace("d-block", "d-none");
    document.getElementById("category-warning").classList.replace("d-block", "d-none");
    document.getElementById("des-warning").classList.replace("d-block", "d-none");

}
