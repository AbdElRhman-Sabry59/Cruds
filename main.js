// Start Select Items
let title = document.querySelector(".title");
let price = document.querySelector(".price");
let taxes = document.querySelector(".taxes");
let ads = document.querySelector(".ads");
let discount = document.querySelector(".discount");
let total = document.querySelector(".total");
let count = document.querySelector(".count");
let category = document.querySelector(".category");
let create = document.querySelector(".btn-create");
let search = document.querySelector(".search");
let SearchByTitle = document.querySelector(".searchByTitle");
let SearchByCategory = document.querySelector(".searchByCategory");
let mood = "create";
let tmp;
// End Select Items

// Start Function getTotal
function getTotal() {
  if (price.value != "") {
    let result = +price.value + +taxes.value + +ads.value - +discount.value;
    total.innerHTML = result;
    total.style.backgroundColor = "red";
  } else {
    price.value = "";
    taxes.value = "";
    ads.value = "";
    discount.value = "";
    total.innerHTML = "";
    total.style.backgroundColor = "#444";
  }
}
// End Function getTotal

// Start getData
let dataArray;
if (localStorage["data"]) {
  dataArray = JSON.parse(localStorage.getItem("data"));
} else {
  dataArray = [];
}
create.onclick = function () {
  let dataObject = {
    title: title.value.toLowerCase(),
    price: price.value,
    taxes: taxes.value,
    ads: ads.value,
    discount: discount.value,
    count: count.value,
    category: category.value.toLowerCase(),
    total: total.innerHTML,
  };
  if (
    (title.value !== "" && price.value !== "" && dataObject.count <= 100) ||
    title.focus()
  ) {
    if (mood === "create") {
      if (dataObject.count > 1) {
        for (let i = 0; i < dataObject.count; i++) {
          dataArray.push(dataObject);
        }
      } else {
        dataArray.push(dataObject);
      }
    } else {
      mood = "create";
      dataArray[tmp] = dataObject;
      count.style.display = "block";
      create.innerHTML = "Create";
    }
  }
  localStorage.setItem("data", JSON.stringify(dataArray));
  title.value = "";
  price.value = "";
  taxes.value = "";
  ads.value = "";
  discount.value = "";
  count.value = "";
  category.value = "";
  total.innerHTML = "";
  showData();
};
// End getData
// Start showData
function showData() {
  getTotal();
  let table = "";

  for (let i = 0; i < dataArray.length; i++) {
    table += `
      <tr>
        <td>${i + 1}</td>
        <td>${dataArray[i].title}</td>
        <td>${dataArray[i].price}</td>
        <td>${dataArray[i].taxes}</td>
        <td>${dataArray[i].ads}</td>
        <td>${dataArray[i].discount}</td>
        <td>${dataArray[i].total}</td>
        <td>${dataArray[i].category}</td>
        <td><button onclick="updateData(${i})">Update</button></td>
        <td><button onclick="deleteData(${i})">Delete</button></td>
      </tr>
    `;
  }
  document.querySelector(".tbody").innerHTML = table;
  let btnDeleteAll = document.querySelector(".deleteAll");
  btnDeleteAll.style.display = "none";
  if (dataArray.length > 0) {
    btnDeleteAll.style.display = "block";
    btnDeleteAll.innerHTML = `
    <td><button onclick ="btnDeleteAll()" >Delete All (${dataArray.length})</button></td>
    `;
  }
}

showData();
// Start Function deleteData
function deleteData(i) {
  dataArray.splice(i, 1);
  localStorage["data"] = JSON.stringify(dataArray);
  showData();
}
// End Function deleteData
// Start function updateData

function updateData(i) {
  count.style.display = "none";
  create.innerHTML = "Update";
  title.value = dataArray[i].title;
  price.value = dataArray[i].price;
  taxes.value = dataArray[i].taxes;
  ads.value = dataArray[i].ads;
  discount.value = dataArray[i].discount;
  total.innerHTML = dataArray[i].total;
  category.value = dataArray[i].category;
  mood = "update";
  tmp = i;
  getTotal();
  scroll({
    top: 0,
    behavior: "smooth",
  });
}

// End function updateData
// Start function delteAll
function btnDeleteAll() {
  localStorage.clear();
  dataArray.splice(0);
  showData();
}
// End function delteAll

let searchMood = "title";

function getSearchMood(className) {

  if (className === "searchByTitle") {
    searchMood = "title";
  } else if (className === "searchByCategory") {
    searchMood = "category";
  }

  search.placeholder = "Search By " + searchMood;
  search.focus();
  search.value = "";
  showData(); // Assuming showData() is defined elsewhere to update the search results
}
// End Search Data

// Function searchData
function searchData(value) {
   let table = "";

  for (let i = 0; i < dataArray.length; i++) {
    let lowerCaseValue = value.toLowerCase(); // تحسين أداء عن طريق تحويل القيمة إلى حالة صغيرة مرة واحدة

    if (searchMood === "title") {
      if (dataArray[i].title.toLowerCase().includes(lowerCaseValue)) {
        table += `
          <tr>
            <td>${i + 1}</td>
            <td>${dataArray[i].title}</td>
            <td>${dataArray[i].price}</td>
            <td>${dataArray[i].taxes}</td>
            <td>${dataArray[i].ads}</td>
            <td>${dataArray[i].discount}</td>
            <td>${dataArray[i].total}</td>
            <td>${dataArray[i].category}</td>
            <td><button onclick="updateData(${i})">Update</button></td>
            <td><button onclick="deleteData(${i})">Delete</button></td>
          </tr>
        `;
      }
    } else if (searchMood === "category") {
      if (dataArray[i].category.toLowerCase().includes(lowerCaseValue)) {
        table += `
          <tr>
            <td>${i + 1}</td>
            <td>${dataArray[i].title}</td>
            <td>${dataArray[i].price}</td>
            <td>${dataArray[i].taxes}</td>
            <td>${dataArray[i].ads}</td>
            <td>${dataArray[i].discount}</td>
            <td>${dataArray[i].total}</td>
            <td>${dataArray[i].category}</td>
            <td><button onclick="updateData(${i})">Update</button></td>
            <td><button onclick="deleteData(${i})">Delete</button></td>
          </tr>
        `;
      }
    }
  }

  document.querySelector(".tbody").innerHTML = table;

}
