"use strict";
import Chart from "chart.js";
import Stock from "./csvjson.json";

window.addEventListener("DOMContentLoaded", init);
let globalChartVariable;

function init() {
  let dataArray = createDummyData();
  let compName = readUrlParams();
  let compData = findComp(compName, dataArray);

  makeGraph(compData);
  makeGraphArray(Stock);
}

function makeGraphArray(data) {
  console.log(data);

  let stockArrayIndex = [];
  let stockArrayFunds = [];
  let stockArrayDate = [];
  data.forEach((point, index) => {
    stockArrayIndex.push(point.INDX);
    stockArrayFunds.push(point.FUNDSTOWER);
    stockArrayDate.push(point.date);
  });
  console.log(stockArrayDate);
  stockArrayDate.forEach(date => {
    makeGraphWeek(date);
  });
}
let weekArray = [];
let startCheck = 0;
function makeGraphWeek(date) {
  weekArray.push(date);

  if (weekArray.length == 4 && startCheck == 0) {
    let firstWeekArrayToExtension = weekArray;
    extendFirstWeekArray(firstWeekArrayToExtension);
    weekArray.length = 0;
    startCheck++;
  }
  if (weekArray.length == 5) {
    let weekArrayToExtension = weekArray;
    extendWeekArray(weekArrayToExtension);
    weekArray.length = 0;
  }
}
function extendFirstWeekArray(array) {
  let calcRemainingWeek = array[3].split("/");
  console.log(calcRemainingWeek);
  let extendedfirstWeekArray = [
    "1/1/2018",
    array[0],
    array[1],
    array[2],
    array[3],
    `1/${calcRemainingWeek[1] + 1}/2018`,
    array[3]
  ];
  console.log(extendedfirstWeekArray);
}
function extendWeekArray(array) {
  let finalWeekArray = [
    array[0],
    array[1],
    array[2],
    array[3],
    array[4],
    array[4],
    array[4]
  ];
  console.log(finalWeekArray);
}
function makeGraph(data) {
  let fundsValue = [];

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
          label: "Current Value",
          data: data,
          backgroundColor: "rgba(250, 145, 70, 1)",
          borderWidth: 2,
          borderColor: "rgba(250, 145, 70, 1)",
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
  globalChartVariable = Chart;
  console.log(data);
  document.querySelector("#falseTarget").textContent = `${data[11]},-`;
}

function findComp(name, data) {
  let returnData;
  data.forEach(item => {
    if (item.name == name) {
      returnData = item.compData;
    }
  });
  return returnData;
}
function createDummyData() {
  let compArray = [];

  for (let companyCounter = 1; companyCounter < 41; companyCounter++) {
    let compObj = {
      name: `Company ${companyCounter}`,
      compData: getArray()
    };
    compArray.push(compObj);
  }
  return compArray;
}
function getArray() {
  let returnArray = [];
  for (let i = 1; i < 13; i++) {
    let data = Math.floor(Math.random() * 191) + 10;
    returnArray.push(data);
  }

  return returnArray;
}

function readUrlParams() {
  let urlParams = new URLSearchParams(window.location.search);
  let name = urlParams.get("compName");
  return name;
}
