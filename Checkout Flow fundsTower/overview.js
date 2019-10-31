"use strict";
import List from "./newListOfIndex.json";
import TweenMax from "gsap/TweenMax";

window.addEventListener("DomContentLoaded", init());
let compArray;

function init() {
  makeCompArrayStructure();
  console.log("INIT");

  console.log(List);

  makedivs(List);

  makeFilterSelectors();
}
function makeCompArrayStructure() {
  const subCompArray1 = ["", "", ""];
  const subCompArray2 = ["", "", ""];
  const subCompArray3 = ["", "", ""];
  compArray = [subCompArray1, subCompArray2, subCompArray3];
  console.log(compArray);
}

function makeFilterSelectors() {
  document.querySelector("#categoryFilter").addEventListener("change", () => {
    filterList();
  });
  document
    .querySelector("#marketStatusFilter")
    .addEventListener("change", () => {
      filterList();
    });
  document.querySelector("#regionFilter").addEventListener("change", () => {
    filterList();
  });
  document.querySelector("#exchangeFilter").addEventListener("change", () => {
    filterList();
  });
}
function filterList() {
  let categoryOtion = document.querySelector("#categoryFilter").value;
  let regionOption = document.querySelector("#regionFilter").value;
  let marketOption = document.querySelector("#marketStatusFilter").value;
  let exchangeOption = document.querySelector("#exchangeFilter").value;
  let array1 = [];
  let array2 = [];
  let array3 = [];
  let array4 = [];
  if (categoryOtion != "noFilter") {
    List.forEach(item => {
      if (item.Category == categoryOtion) {
        array1.push(item);
      }
    });
  } else {
    array1 = List;
  }
  if (regionOption != "noFilter") {
    array1.forEach(item => {
      if (item.Region == regionOption) {
        array2.push(item);
      }
    });
  } else {
    array2 = array1;
  }
  if (marketOption != "noFilter") {
    array2.forEach(item => {
      if (item.marketStatus == marketOption) {
        array3.push(item);
      }
    });
  } else {
    array3 = array2;
  }
  if (exchangeOption != "noFilter") {
    array3.forEach(item => {
      if (item.Exchange == exchangeOption) {
        array4.push(item);
      }
    });
  } else {
    array4 = array3;
  }
  if (
    marketOption == "noFilter" &&
    regionOption == "noFilter" &&
    categoryOtion == "noFilter" &&
    exchangeOption == "noFilter"
  ) {
    array4 = List;
  }

  console.log(exchangeOption, categoryOtion, regionOption, marketOption);
  console.log(array1, array2, array3, array4);
  makedivs(array4);
}

function makedivs(array) {
  let target = document.querySelector("#indexTarget");
  target.innerHTML = "";
  array.forEach(item => {
    let container = document.createElement("div");
    container.setAttribute("class", "indexItem");
    let name = document.createElement("h2");
    name.setAttribute("class", "name");
    if (item.selected == true) {
      container.classList.add("selected");
    }

    name.textContent = `${item.Ticker}, ${item.indexName} `;
    container.appendChild(name);
    let subCon = document.createElement("div");
    subCon.setAttribute("class", "subCon");
    let region = document.createElement("p");
    region.setAttribute("class", "region");
    region.textContent = `Region: ${item.Region}`;
    subCon.appendChild(region);
    let marketStatus = document.createElement("p");
    marketStatus.setAttribute("class", "marketStatus");
    marketStatus.textContent = `Market Status: ${item.marketStatus}`;
    subCon.appendChild(marketStatus);
    let category = document.createElement("p");
    category.setAttribute("class", "category");
    category.textContent = `Index Category: ${item.Category}`;
    subCon.appendChild(category);
    let exchange = document.createElement("p");
    exchange.setAttribute("class", "exchange");
    exchange.textContent = `Exchange: ${item.Exchange}`;
    subCon.appendChild(exchange);
    container.appendChild(subCon);
    container.addEventListener("click", () => {
      clickHandler(item, container, compArray);
    });
    target.appendChild(container);
  });
}

function clickHandler(obj, node, array) {
  console.log(array);
  console.log(array[(0, 1, 2)][(0, 1, 2)]);
  obj.selected = true;

  let emptyIndex = 0;

  array.forEach(item => {
    item.forEach(place => {
      if (place == "") {
        emptyIndex = emptyIndex + 1;
      }
    });
  });
  console.log(emptyIndex);
  if (emptyIndex > 0) {
    node.classList.add("selected");
  }

  if (emptyIndex < 10) {
    console.log("valg af første Index");

    if (array[0][0] == "") {
      console.log("valg af første Index");
      array[0][0] = obj;
      createExchangeItem(obj, 0);
    } else {
      console.log("første er udfyldt");
      if (obj.Exchange == array[0][0].Exchange) {
        if (array[0][1] == "") {
          array[0][1] = obj;
        } else {
          if (array[0][2] == "") {
            array[0][2] = obj;
          }
        }
      }

      if (
        obj.Exchange != array[0][0].Exchange &&
        obj.Exchange != array[2][0].Exchange
      ) {
        if (array[1][0] == "") {
          array[1][0] = obj;
          createExchangeItem(obj, 1);
          console.log("array2 udflydning");
        } else {
          if (array[1][1] == "") {
            array[1][1] = obj;
          } else {
            if (array[1][2] == "") {
              array[1][2] = obj;
            }
          }
        }
      }
      if (
        obj.Exchange != array[0][0].Exchange &&
        obj.Exchange != array[1][0].Exchange
      ) {
        if (array[2][0] == "") {
          array[2][0] = obj;
          createExchangeItem(obj, 2);
        } else {
          if (array[2][1] == "") {
            array[2][1] = obj;
          } else {
            if (array[2][2] == "") {
              array[2][2] = obj;
            }
          }
        }
      }
    }
  }

  if (array[0][0] != "" && array[1][0] != "" && array[2][0] != "") {
    console.log("de første 3 er valgt");
  }
  let localNewArray = [];
  console.log(array);
  array.forEach(array => {
    array.forEach(obj => {
      if (obj != "") {
        localNewArray.push(obj);
      }
    });
  });
  showList(localNewArray);
}

function createExchangeItem(obj, blockNumber) {
  console.log(obj, blockNumber + 1);
  let exchangeTarget = document.querySelector(
    `#exchangeTarget${blockNumber + 1}`
  );
  console.log(exchangeTarget);

  let item = document.createElement("div");
  item.setAttribute("class", "border");
  let subItem = document.createElement("div");
  subItem.setAttribute("class", "itemContent");
  let exchangeText = document.createElement("p");
  exchangeText.setAttribute("class", "exchangeText");
  exchangeText.textContent = obj.Exchange;
  let removeButton = document.createElement("div");
  removeButton.setAttribute("class", "exchangeRemoveButton");
  removeButton.textContent = "X";
  removeButton.addEventListener("click", () => {
    removeExchangeFromList(blockNumber + 1, obj);
  });
  subItem.appendChild(removeButton);
  subItem.appendChild(exchangeText);
  item.appendChild(subItem);

  exchangeTarget.appendChild(item);
}

function removeExchangeFromList(number, obj) {
  console.log(number);
  let exchangeTarget = document.querySelector(`#exchangeTarget${number}`);
  exchangeTarget.innerHTML = "";
  let localNewArray = [];
  compArray.forEach(array => {
    array.forEach(item => {
      if (item.Exchange == obj.Exchange) {
        item.selected = false;
        let local = document.querySelectorAll(".selected");
        local.forEach(div => {
          if (
            div.firstChild.textContent == `${item.Ticker}, ${item.indexName} `
          ) {
            div.classList.remove("selected");
          }
        });
        let i = array.indexOf(item);
        array[i] = "";
        compArray.forEach(array => {
          array.forEach(obj => {
            if (obj != "") {
              localNewArray.push(obj);
            }
          });
        });
        showList(localNewArray);
        alert(`Du har fjernet ${obj.Exchange}`);
      }
    });
  });
  console.log(compArray);
}

function showList(inputArray) {
  console.log(inputArray);
  let target = document.querySelector("#indexList");
  target.innerHTML = "";
  inputArray.forEach(item => {
    let container = document.createElement("div");
    container.setAttribute("class", "indexItem");

    let name = document.createElement("h2");
    name.setAttribute("class", "name");
    name.textContent = `${item.Ticker}, ${item.indexName} `;
    container.appendChild(name);

    let removeBtn = document.createElement("div");
    removeBtn.setAttribute("class", "removeBtn");
    removeBtn.setAttribute("id", item.Ticker);
    removeBtn.textContent = "Remove Index";
    removeBtn.addEventListener("click", () => {
      removeItemFromArray(item.Ticker);
    });
    container.appendChild(removeBtn);

    target.appendChild(container);
  });
}
function removeItemFromArray(tick) {
  console.log(tick);
  compArray.forEach(array => {
    array.forEach(item => {
      if (item.Ticker == tick) {
        item.selected = false;
        console.log(item);
        let i = array.indexOf(item);
        array[i] = "";

        let local = document.querySelectorAll(".selected");
        local.forEach(div => {
          if (
            div.firstChild.textContent == `${item.Ticker}, ${item.indexName} `
          ) {
            div.classList.remove("selected");
          }
        });
      }
    });
  });
  let localNewArray = [];

  compArray.forEach(array => {
    array.forEach(obj => {
      if (obj != "") {
        localNewArray.push(obj);
      }
    });
  });
  console.log(compArray);
  showList(localNewArray);
}
