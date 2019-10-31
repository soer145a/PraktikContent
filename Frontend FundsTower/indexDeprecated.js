"use strict";
import Chart from "chart.js";
window.addEventListener("DOMContentLoaded", init);
let rawDataFromCompany = [];
let tableArray = [];
let checkForDubCounter = 0;
let globalChartVariable;

function init() {
  createDummyData();
  makeChartDummyData();
  document.querySelector("#addToPortBtn").addEventListener("click", () => {
    addToPort();
  });
}

function createDummyData() {
  let compArray = [];
  let companyCounter = 0;
  for (companyCounter = 1; companyCounter < 41; companyCounter++) {
    let companyObj = `Company ${companyCounter}`;
    compArray.push(companyObj);
  }

  createMenu(compArray);
}
function createMenu(data) {
  let dist = document.querySelector("#companyBlock");
  data.forEach((comp, index) => {
    let compData = document.createElement("div");

    compData.setAttribute("class", "companyDiv");
    compData.setAttribute("customId", `company.${index + 1}`);
    compData.addEventListener("click", () => {
      colorMenu(compData);
    });
    let compP = document.createElement("p");
    compP.textContent = comp;

    compData.appendChild(compP);

    dist.appendChild(compData);
  });
}
function colorMenu(compData) {
  let menuItems = document.querySelectorAll(".companyDiv");
  menuItems.forEach(item => {
    item.style.backgroundColor = "white";
  });
  // In case I need the other divs

  /* let menuArray = [];
  menuItems.forEach(item => {
    menuArray.push(item);
  });
  console.log(menuArray);
  for (let i = 0; i < menuArray.length; i++) {
    if (menuArray[i] === compData) {
      menuArray.splice(i, 1);
    }
  }
  console.log(menuArray);
  menuArray.forEach(item => {
    item.style.backgroundColor = "white";
  }); */

  compData.style.backgroundColor = "lightBlue";

  changeGraphDummyData(compData.getAttribute("customId"));
}

function changeGraphDummyData(id) {
  let idNumber = id.split(".")[1] - 1;

  globalChartVariable.data.datasets[0].data = [];
  rawDataFromCompany[idNumber].forEach(item => {
    globalChartVariable.data.datasets[0].data.push(item);
  });

  globalChartVariable.data.datasets[1].data = [];
  rawDataFromCompany[idNumber].forEach(item => {
    globalChartVariable.data.datasets[1].data.push(item + 10);
  });

  let falseTarget = document.querySelector("#falseTarget");
  let fundsTarget = document.querySelector("#fundsTarget");
  falseTarget.textContent = `${globalChartVariable.data.datasets[0].data.slice(
    -1
  )} DKK,-`;
  fundsTarget.textContent = `${globalChartVariable.data.datasets[1].data.slice(
    -1
  )} DKK,-`;

  globalChartVariable.update();
}
function makeChartDummyData() {
  for (let counter = 1; counter < 41; counter++) {
    let compDataArray = [];
    for (let monthCounter = 1; monthCounter < 13; monthCounter++) {
      let monthlyValue = Math.floor(Math.random() * 200) + 50;
      compDataArray.push(monthlyValue);
    }
    rawDataFromCompany.push(compDataArray);
  }
  makeChart(rawDataFromCompany);
}

function makeChart(rawData) {
  let fundsValue = [];
  rawData[0].forEach(item => {
    let newValue = item + 10;
    fundsValue.push(newValue);
  });

  Chart.defaults.global.defaultFontFamily = "Roboto";
  Chart.defaults.global.defaultFontSize = 18;

  let ctx = document.getElementById("myChart");
  ctx.height = "50vw";

  let myChart = new Chart(ctx, {
    type: "line",
    data: {
      labels: [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December"
      ],
      datasets: [
        {
          label: "False Value",
          data: rawData[0],
          backgroundColor: "rgba(250, 145, 70, 1)",
          borderWidth: 2,
          borderColor: "rgba(250, 145, 70, 1)",
          hoverBorderWidth: 2,
          fill: false
        },
        {
          label: "Funds Value",
          data: fundsValue,
          backgroundColor: "rgba(30, 210, 120,1)",
          borderWidth: 2,
          borderColor: "rgba(30, 210, 120,1)",
          hoverBorderWidth: 2,
          fill: false
        }
      ]
    },
    options: {
      responsive: true,
      title: {
        display: true,
        text: "Stock Value",
        fontSize: 30
      },
      legend: {
        position: "right",
        labels: {
          fontColor: "black"
        }
      }
    }
  });

  globalChartVariable = myChart;

  let falseTarget = document.querySelector("#falseTarget");
  let fundsTarget = document.querySelector("#fundsTarget");
  falseTarget.textContent = `${globalChartVariable.data.datasets[0].data.slice(
    -1
  )} DKK,-`;
  fundsTarget.textContent = `${globalChartVariable.data.datasets[1].data.slice(
    -1
  )} DKK,-`;
}
function addToPort() {
  let compName = findName();
  let compData = globalChartVariable.data.datasets[0].data;
  let compObj = {
    compName,
    compData
  };
  checkForDubCounter++;

  if (checkForDubCounter < 2) {
    console.log("First is true");
    tableArray.push(compObj);
    console.log(tableArray);
    createPorfolio();
  } else {
    let testCounter = 0;
    tableArray.forEach(item => {
      if (compObj.compName == item.compName) {
        testCounter++;
        console.log(testCounter);
      }
    });
    if (testCounter < 1) {
      tableArray.push(compObj);
      console.log(tableArray);
      createPorfolio();
    } else {
      alert("Data Already in Portfolio");
    }
  }
}

function createPorfolio() {
  let table = document.querySelector("#tableBody");
  while (table.rows.length > 0) {
    table.deleteRow(0);
  }
  let tableDataCounter = 0;
  document.querySelector("#companyTarget").innerHTML = "";
  tableArray.forEach(item => {
    tableDataCounter++;
    createPortNameTag(item.compName);
    createPortTableItem(item.compData, tableDataCounter);
  });
}

function createPortNameTag(name) {
  let nameTagDiv = document.createElement("div");
  nameTagDiv.setAttribute("class", "portDiv");
  let nameTagP = document.createElement("p");
  nameTagP.textContent = name;
  nameTagDiv.append(nameTagP);
  document.querySelector("#companyTarget").append(nameTagDiv);
}
function createPortTableItem(dataArray, nmbr) {
  let tableContent = document.createElement("tr");
  let localCounter = 0;
  tableContent.setAttribute("rowId", `Row#${nmbr}`);
  tableContent.setAttribute("class", `tableRow`);
  dataArray.forEach(item => {
    localCounter++;
    let tableItem = document.createElement("th");
    tableItem.setAttribute("itemId", `R${nmbr}_I${localCounter}`);
    tableItem.setAttribute("class", `tableItem`);
    tableItem.textContent = `${item}`;
    tableContent.appendChild(tableItem);
  });
  document.querySelector("#tableBody").append(tableContent);
}

function findName() {
  let target;
  document.querySelectorAll(".companyDiv").forEach(item => {
    if (item.style.backgroundColor == "lightblue") {
      target = item.getAttribute("customId");
    }
  });
  let splitTarget = target.split(".");
  let returnValaue = `${splitTarget[0]} ${splitTarget[1]}`;
  return returnValaue;
}
