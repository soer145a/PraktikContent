"use strict";
import Chart from "chart.js";
window.addEventListener("DOMContentLoaded", init);
let companyArray = [];
let globalChartVariable;
let dataArrayForchart = [];

function init() {
  makeChart();
  let username = readUrlParams();
  makeDummyData();
  fetchData(username);
}

function readUrlParams() {
  let urlParams = new URLSearchParams(window.location.search);
  let name = urlParams.get("userName");
  return name;
}
function fetchData(seachData) {
  fetch("https://fundstower-cd8c.restdb.io/rest/fundsusers", {
    method: "get",
    headers: {
      Accept: "application/json",
      "x-apikey": "5d7a2da3bdaac80423d2c74c",
      "Content-Type": "application/json"
    }
  })
    .then(res => res.json())
    .then(data => {
      data.forEach(item => {
        if (item.name == seachData) {
          selectData(item);
        }
      });
    });
}
function makeDummyData() {
  let stockCounter = 1;

  for (stockCounter; stockCounter < 41; stockCounter++) {
    let companyObject = {
      name: `Company ${stockCounter}`,
      plusNegative: Math.floor(Math.random() * 101) - 50,
      revenue: Math.floor(Math.random() * 191) + 10,
      totalValue: Math.floor(Math.random() * 181) + 20,
      business: Math.floor(Math.random() * 10) + 1,
      currentValue: makeArray()
    };
    companyArray.push(companyObject);
  }
}
function makeArray() {
  let localArray = [];
  let i = 1;
  for (i; i < 13; i++) {
    let dataPoint = Math.floor(Math.random() * 99) + 1;

    localArray.push(dataPoint);
  }

  return localArray;
}
function selectData(obj) {
  console.log(obj);
  console.log(obj.portdata);
  console.log(companyArray);
  let portDataValues = Object.values(obj.portdata);
  portDataValues.forEach(compName => {
    if (compName != "") {
      companyArray.forEach(comp => {
        if (comp.name == compName) {
          dataForChart(comp);
        }
      });
    }
  });
}

function dataForChart(comp) {
  console.log(comp);
  let datasetForChart = {
    label: comp.name,
    data: comp.currentValue,
    backgroundColor: "rgba(250, 145, 70, 1)",
    borderWidth: 2,
    borderColor: "rgba(250, 145, 70, 1)",
    hoverBorderWidth: 2,
    fill: false
  };
  console.log(datasetForChart);

  console.log(dataArrayForchart);
  dataArrayForchart.push(datasetForChart);
  globalChartVariable.data.datasets = dataArrayForchart;
  globalChartVariable.update();
}
function makeChart() {
  console.log("CHART");

  let ctx = document.getElementById("myChart");
  ctx.height = "100%";

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
      datasets: []
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
}
