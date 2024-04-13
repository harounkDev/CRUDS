//Create Elements Variables
let title = document.getElementById("title");
let price = document.getElementById("price");
let taxes = document.getElementById("taxes");
let ads = document.getElementById("ads");
let discount = document.getElementById("discount");
let total = document.getElementById("total");
//
let count = document.getElementById("count");
let category = document.getElementById("category");
let btnCreate = document.getElementById("create");
let search = document.getElementById("search");
//

let deletall = document.getElementById("deletall");
//
let tbody = document.getElementById("tbody");
let mood = "create";
//Create global variable
let tmp;

// Create Function To Makes The Calc For prices,taxes,ads
//Get Total
function getTotal() {
  if (price.value != "") {
    let result = +price.value + +taxes.value + +ads.value - +discount.value;
    total.innerHTML = `${result}`; //show result in total span
    total.style.backgroundColor = "green"; //change background-color of total when we write
  } else {
    total.innerHTML = ``;
    total.style.backgroundColor = "#e78284"; //if empty color and input back
  }
}

//Create Product
//Create Array To save Data From Intputs:
let dataPro;
if (localStorage.product != null) {
  // on onload if we have already data in localstorage show them if not create empty arrey
  dataPro = JSON.parse(localStorage.product);
} else {
  dataPro = [];
}

btnCreate.onclick = function () {
  //Create Object To Save Data In:

  if (title.value != "") {
    let newPro = {
      title: title.value.toLowerCase(),
      price: price.value,
      taxes: taxes.value,
      ads: ads.value,
      discount: discount.value,
      total: total.innerHTML,
      count: count.value,
      category: category.value.toLowerCase(),
    };
    //Add Object In Array + Using counter
    if (mood === "create") {
      if (newPro.count > 1) {
        for (i = 0; i < count.value; i++) {
          dataPro.push(newPro);
        }
      } else {
        dataPro.push(newPro); //create product one time
      }
    } else {
      //in update mood
      dataPro[tmp] = newPro; //change array data usning global variable
      mood = "create"; //after save change return to mood create and show the count input
      btnCreate.innerHTML = "Create";
      count.style.display = "block";
    }
    //Save Data In local Storag

    localStorage.setItem("product", JSON.stringify(dataPro));

    //Call the fnctions to work onclick on
    clearInputs();
    showData();
    showDelAll();
  }
};

//Clear Inputs

function clearInputs() {
  title.value = "";
  price.value = "";
  taxes.value = "";
  ads.value = "";
  discount.value = "";
  total.innerHTML = "";
  count.value = "";
  category.value = "";
}
//Show Data on Table
function showData() {
  getTotal();
  let table = "";
  for (i = 0; i < dataPro.length; i++) {
    table += `
    <tr>
    <td>${[i]}</td>
    <td>${dataPro[i].title}</td>
    <td>${dataPro[i].price}</td>
    <td>${dataPro[i].taxes}</td>
    <td>${dataPro[i].ads}</td>
    <td>${dataPro[i].discount}</td>
    <td>${dataPro[i].total}</td>
    <td>${dataPro[i].category}</td>
    <td><button id="update" onclick="updatePro(${i})">UPDATE</button></td>
    <td><button id="delete" onclick="deletePro(${i})">DELETE</button></td>
    </tr>
    `;
  }
  document.getElementById("tbody").innerHTML = table;
}
//Make the functions works permentaly:
showData();
showDelAll();
//Delete product
function deletePro(i) {
  //delete the product from the array
  dataPro.splice(i, 1);
  //create a new updated aray
  localStorage.product = JSON.stringify(dataPro);

  // Update The Table
  showData(); //the function will called every time together local function
  showDelAll(); //the function will called every time together local function
}
//Show The DeleteAll Button

function showDelAll() {
  // the button will shown only if there data stored
  if (dataPro.length > 0) {
    deletall.style.display = "block";
    deletall.innerHTML = `Delete All(${dataPro.length}) `; //show number of products in localstore
  } else {
    deletall.style.display = "none";
  }
  showData(); //the function will called every time together local function
}
//Delete All Data
function delAll() {
  localStorage.clear(); //Clear localstorage
  dataPro.splice(0); //Clear the arrey

  showDelAll(); //the function will called every time together local function
}

//Update
function updatePro(i) {
  //get the product data and show them on inputs
  title.value = dataPro[i].title;
  price.value = dataPro[i].price;
  taxes.value = dataPro[i].taxes;
  ads.value = dataPro[i].ads;
  discount.value = dataPro[i].discount;
  getTotal(); //call the function to calc total
  category.value = dataPro[i].category;
  count.style.display = "none";
  //Change button Create to update
  btnCreate.innerHTML = "Update";
  mood = "update";
  tmp = i; //transfer the value of i to tmp to use it globaly
  scroll({ top: 0, behavior: "smooth" });
}
//Search
let searchMood = "title";

function getSearchMood(id) {
  //choise the searchBy depend on which click button
  if (id == "bytitle") {
    searchMood = "title";
    search.placeholder = "Search by title";
  } else {
    searchMood = "category";
    search.placeholder = "Search by category";
  }
  search.focus();
  search.value = ""; //Clear the input
  showData(); // show the table after search
}

//Create function for search

function searchData(value) {
  let table = ""; //get the table to show the result of searching
  if (searchMood == "title") {
    for (i = 0; i < dataPro.length; i++) {
      if (dataPro[i].title.includes(value.toLowerCase())) {
        table += `
    <tr>
    <td>${[i]}</td>
    <td>${dataPro[i].title}</td>
    <td>${dataPro[i].price}</td>
    <td>${dataPro[i].taxes}</td>
    <td>${dataPro[i].ads}</td>
    <td>${dataPro[i].discount}</td>
    <td>${dataPro[i].total}</td>
    <td>${dataPro[i].category}</td>
    <td><button id="update" onclick="updatePro(${i})">UPDATE</button></td>
    <td><button id="delete" onclick="deletePro(${i})">DELETE</button></td>
    </tr>
    `;
      }
    }
  } else {
    //for search by category
    for (i = 0; i < dataPro.length; i++) {
      if (dataPro[i].category.includes(value.toLowerCase())) {
        table += `
      <tr>
      <td>${[i]}</td>
      <td>${dataPro[i].title}</td>
      <td>${dataPro[i].price}</td>
      <td>${dataPro[i].taxes}</td>
      <td>${dataPro[i].ads}</td>
      <td>${dataPro[i].discount}</td>
      <td>${dataPro[i].total}</td>
      <td>${dataPro[i].category}</td>
      <td><button id="update" onclick="updatePro(${i})">UPDATE</button></td>
      <td><button id="delete" onclick="deletePro(${i})">DELETE</button></td>
      </tr>
      `;
      }
    }
  }
  document.getElementById("tbody").innerHTML = table;
}
