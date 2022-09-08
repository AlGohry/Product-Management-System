// Variables
let productName = document.getElementById("productName");
let price = document.getElementById("price");
let tax = document.getElementById("tax");
let discount = document.getElementById("discount");
let total = document.getElementById("total");
let quantity = document.getElementById("quantity");
let category = document.getElementById("category");
let submit = document.getElementById("submit");
let btnUpdate = document.getElementById("btnUpdate");
let btnSearchName = document.getElementById("btnSearchName");
let btnSearchCategory = document.getElementById("btnSearchCategory");
let inputSearch = document.getElementById("inputSearch");



// Global variables 
let mood = 'create';
let tmp;



// Get Total Function
function getTotal() {
  if (price.value != "") {
    let result = +price.value + +tax.value - +discount.value;
    total.innerHTML = result;
  } else {
    total.innerHTML = "";
  }
}







// Create & Update Function
let dataProduct;
if (localStorage.product != null) {
  dataProduct = JSON.parse(localStorage.product);
} else {
  dataProduct = [];
}

submit.onclick = function () {
  let newProduct = {
    productName: productName.value,
    price: price.value,
    tax: tax.value,
    discount: discount.value,
    total: total.innerHTML,
    quantity: quantity.value,
    category: category.value,
  };

  if(productName.value !='' && total.value !='' && category.value !='' && newProduct.quantity < 10){
            if(mood === 'create'){
              if (newProduct.quantity > 1) {
                for (let i = 0; i < newProduct.quantity; i++) {
                  dataProduct.push(newProduct); // Create one or more product
                }
              } else {
                dataProduct.push(newProduct);  // Create new one product
              }
            }else{
              dataProduct[tmp] = newProduct;      // Update data
              mood = 'create';                    // Return Mood to Create
              submit.innerHTML = 'Create';        // Set name of button "Create"
              quantity.removeAttribute('readonly');  // Remove "readonly" Attribute 
            }
            clearData();
  }else{
  }
  localStorage.setItem("product", JSON.stringify(dataProduct));
  
  showDate();
};






// Clear Function
function clearData() {
  productName.value = "";
  price.value = "";
  tax.value = "";
  // ads.value = "";
  discount.value = "";
  total.innerHTML = "";
  quantity.value = "";
  category.value = "";
}




// Read Function
function showDate() {
  let table = "";

  for (let i = 0; i < dataProduct.length; i++) {
    table += `
    <tr>
      <td>${i}</td>
      <td>${dataProduct[i].productName}</td>
      <td>${dataProduct[i].category}</td>
      <td>${dataProduct[i].total}</td>
      <td>
        <button class="btn btn-secondary btn-sm me-1" onclick="updateData( ${i} )">Update</button>
        <button class="btn btn-danger btn-sm me-1" onclick="deleteDate( ${i} )" id="delete">Delete</button>
      </td>
      <td></td>
    </tr>
    `;
  }
  document.getElementById("tbody").innerHTML = table;
  let btnDeleteAll = document.getElementById("btnDeleteAll");
  if (dataProduct.length > 0) {
    btnDeleteAll.style.display = "block";
    btnDeleteAll.innerHTML = `Delete All (${dataProduct.length}) `;
  } else {
    btnDeleteAll.style.display = "none";
  }
}

showDate(); // Show data when page load






// Delete Function
function deleteDate(i) {
  dataProduct.splice(i, 1);
  localStorage.product = JSON.stringify(dataProduct);
  showDate();
}








// Delete All Function
function deleteAll() {
  localStorage.clear(); // Delete from Local Storage only
  dataProduct.splice(0); // Delete from Array also
  showDate(); // Show the new data in Table
}








// Update Function
function updateData(i){
  productName.value = dataProduct[i].productName;
  price.value = dataProduct[i].price;
  tax.value = dataProduct[i].tax;
  discount.value = dataProduct[i].discount;
  getTotal();
  quantity.value = dataProduct[i].quantity;
  quantity.setAttribute('readonly', 'readonly');
  category.value = dataProduct[i].category;
  submit.innerHTML = 'Update';
  mood = 'update';
  tmp = i;
  scroll({
    top:0,
    behavior:'smooth'
  })
};






// Search Get Mood prepare for Search

let searchMood = 'Name';

function getSearchMood(id){
  if( id == 'btnSearchName'){
    searchMood = 'Name';
  }else{
    searchMood = 'Category';
  }
  inputSearch.focus();
  inputSearch.placeholder = 'Search by ' + searchMood;
  inputSearch.value = '';
  showDate();
}


// Search Function
function searchData(value){
  let table = '';
  
  for(let i = 0; i < dataProduct.length; i++){
    if(searchMood == 'Name'){
      if(dataProduct[i].productName.toLowerCase().includes(value) || dataProduct[i].productName.toUpperCase().includes(value)){
        table += `
          <tr>
            <td>
                <div class="form-check form-check-sm form-check-custom form-check-solid">
                    <input class="form-check-input" type="checkbox" value="1" />
                </div>
            </td>
            <td>${dataProduct[i].productName}</td>
            <td>${dataProduct[i].price}</td>
            <td>${dataProduct[i].tax}</td>
            <td>${dataProduct[i].discount}</td>
            <td>${dataProduct[i].total}</td>
            <td>${dataProduct[i].quantity}</td>
            <td>${dataProduct[i].category}</td>
            <td>
              <button class="btn btn-primary btn-sm me-1" onclick="updateData( ${i} )" title="Update"> </button>
              <button class="btn btn-danger btn-sm me-1" onclick="deleteDate( ${i} )" id="delete" title="Delete"> </button>
            </td>
            <td></td>
          </tr>
        `;
      }

    }else if(searchMood == 'Category'){
      if(dataProduct[i].category.toLowerCase().includes(value) || dataProduct[i].category.toUpperCase().includes(value)){
        table += `
          <tr>
            <td>
                <div class="form-check form-check-sm form-check-custom form-check-solid">
                    <input class="form-check-input" type="checkbox" value="1" />
                </div>
            </td>
            <td>${dataProduct[i].productName}</td>
            <td>${dataProduct[i].price}</td>
            <td>${dataProduct[i].tax}</td>
            <td>${dataProduct[i].discount}</td>
            <td>${dataProduct[i].total}</td>
            <td>${dataProduct[i].quantity}</td>
            <td>${dataProduct[i].category}</td>
            <td>
              <button class="btn btn-primary btn-sm me-1" onclick="updateData( ${i} )" title="Update"> </button>
              <button class="btn btn-danger btn-sm me-1" onclick="deleteDate( ${i} )" id="delete" title="Delete"> </button>
            </td>
            <td></td>
          </tr>
        `;
      }
    }
  }
  
  document.getElementById("tbody").innerHTML = table;
}