"use strict";
window.addEventListener("DOMContentLoaded", init);
let companyArray = [];
let body = document.querySelector("body");
let loggedIn = false;
let loggedInUser;
function init() {
  targetMarket();
  makeDummyData();
  makeButtons();
  makeModalButtons();
  toPortfolio();
}
function toPortfolio() {
  document.getElementById("menuItem3").addEventListener("click", () => {
    console.log("CLICK");
    if (loggedIn == false) {
      alert("you need to be logged in");
    } else {
      window.location.href = `portfolio.html?userName=${loggedInUser.name}`;
    }
  });
}

function makeModalButtons() {
  document.querySelector("#login").addEventListener("click", () => {
    openModalLogin();
  });
  document.querySelector("#signup").addEventListener("click", () => {
    openModalSignUp();
  });
}

function openModalLogin() {
  console.log("OPEN MODAL FOR LOGIN");
  document.querySelector("#loginModal").classList.remove("hide");
  document.querySelector("#lukLoginModal").addEventListener("click", () => {
    document.querySelector("#loginModal").classList.add("hide");
  });
  document.querySelector("#loginButton").addEventListener("click", () => {
    fetchLoginData();
  });
}
function fetchLoginData() {
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
      checkLoginCredentials(data);
    });
}
function checkLoginCredentials(dataArray) {
  console.log(dataArray);
  let username = document.querySelector("#loginUsernameInput").value;
  let passwordInp = document.querySelector("#loginPasswordInput").value;

  dataArray.forEach(item => {
    if (item.name == username) {
      console.log("USERNAME IN SYSTEM");
      if (item.password == passwordInp) {
        console.log("CORRECT PASSWORD");
        changepage(item);
      }
    }
  });
}
function openModalSignUp() {
  console.log("OPEN MODAL FOR SIGNUP");
  document.querySelector("#signUpModal").classList.remove("hide");
  document.querySelector("#lukSignUpModal").addEventListener("click", () => {
    document.querySelector("#signUpModal").classList.add("hide");
  });
  document.querySelector("#signUpbutton").addEventListener("click", () => {
    saveUser();
    body.style.cursor = "wait";
  });
}
function saveUser() {
  let inputName = document.getElementById("inpName").value;
  let inputEmail = document.querySelector("#inpEmail").value;
  let inputPass = document.querySelector("#inpPass").value;

  let userObj = {
    name: inputName,
    email: inputEmail,
    password: inputPass,
    portdata: {
      portData1: "",
      portData2: "",
      portData3: "",
      portData4: "",
      portData5: ""
    }
  };
  sendToRestDB(userObj);
}
function sendToRestDB(obj) {
  const postData = JSON.stringify(obj);
  fetch("https://fundstower-cd8c.restdb.io/rest/fundsusers", {
    method: "post",
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "x-apikey": "5d7a2da3bdaac80423d2c74c",
      "cache-control": "no-cache"
    },
    body: postData
  })
    .then(res => res.json())

    .then(data => changepage(data));
}
function changepage(data) {
  loggedInUser = data;
  updatePortDisplay();
  body.style.cursor = "default";
  let changeArea = document.querySelector("#userloginArea");
  document.querySelector("#signUpModal").classList.add("hide");
  document.querySelector("#loginModal").classList.add("hide");
  changeArea.innerHTML = "";
  let generatedH1 = document.createElement("h1");
  generatedH1.textContent = `Hi ${data.name}`;
  generatedH1.setAttribute("id", "generatedH1");
  changeArea.appendChild(generatedH1);
  let logoutButton = document.createElement("div");
  logoutButton.setAttribute("id", "logoutButton");
  logoutButton.addEventListener("click", () => {
    logout();
  });
  let loginButtonText = document.createElement("p");
  loginButtonText.textContent = "Logout";
  logoutButton.appendChild(loginButtonText);
  changeArea.appendChild(logoutButton);
  loggedIn = true;
  /* fetch("https://fundstower-cd8c.restdb.io/rest/fundsusers", {
    method: "get",
    headers: {
      Accept: "application/json",
      "x-apikey": "5d7a2da3bdaac80423d2c74c",
      "Content-Type": "application/json"
    }
  })
    .then(res => res.json())
    .then(data => {
      console.log(data);
    }); */
}

function logout() {
  loggedIn = false;
  loggedInUser = "";

  let dist = document.querySelector("#userloginArea");
  dist.innerHTML = "";

  let signup = document.createElement("div");
  let login = document.createElement("div");
  let signUpText = document.createElement("p");
  let loginText = document.createElement("p");

  signup.setAttribute("id", "signup");
  login.setAttribute("id", "login");
  signUpText.textContent = "Sign Up";
  loginText.textContent = "Login";
  loginText.setAttribute("id", "loginText");
  signUpText.setAttribute("id", "signupText");

  signup.appendChild(signUpText);
  login.appendChild(loginText);

  dist.appendChild(login);
  dist.appendChild(signup);
}

function updatePortDisplay() {
  let portDisplay = document.querySelector("#portDisplay");
  portDisplay.innerHTML = "";
  let objArray = Object.values(loggedInUser.portdata);
  objArray.forEach(item => {
    if (item != "") {
      let portObj = document.createElement("div");
      portObj.setAttribute("class", "portObj");
      let portObjP = document.createElement("p");
      portObjP.textContent = item;
      portObj.appendChild(portObjP);
      portDisplay.appendChild(portObj);
    }
  });
}
function makeButtons() {
  let filterbuttons = document.querySelectorAll(".sektorItem");

  filterbuttons.forEach(item => {
    item.addEventListener("click", () => {
      makeNewData(item);
    });
  });
  document.querySelector("#reset").addEventListener("click", () => {
    displayCompanies(companyArray);
  });
  document.querySelector("#tHeadBusiness").addEventListener("click", () => {
    sortForBusiness();
  });
  document.querySelector("#tHeadValue").addEventListener("click", () => {
    sortForValue();
  });
  document.querySelector("#tHeadRevenue").addEventListener("click", () => {
    sortForRevenue();
  });
  document.querySelector("#tHeadPlus").addEventListener("click", () => {
    sortForPlus();
  });
}

let compareCounterValue = 0;
let sortArrayValue = [];
function sortForValue() {
  if (compareCounterValue == 0) {
    sortArrayValue = [];
    companyArray.forEach(item => {
      sortArrayValue.push(item);
    });
    sortArrayValue.sort(function compareNumbers(a, b) {
      return a.totalValue - b.totalValue;
    });
    compareCounterValue++;
  } else {
    sortArrayValue.reverse(function compareNumbers(a, b) {
      return a.totalValue - b.totalValue;
    });
    compareCounterValue = compareCounterValue - 1;
  }

  displayCompanies(sortArrayValue);
}

let compareCounterBusiness = 0;
let sortArrayBusiness = [];
function sortForBusiness() {
  if (compareCounterBusiness == 0) {
    sortArrayBusiness = [];
    companyArray.forEach(item => {
      sortArrayBusiness.push(item);
    });
    sortArrayBusiness.sort(function compareNumbers(a, b) {
      return a.business - b.business;
    });
    compareCounterBusiness++;
  } else {
    sortArrayBusiness.reverse(function compareNumbers(a, b) {
      return a.business - b.business;
    });
    compareCounterBusiness = compareCounterBusiness - 1;
  }

  displayCompanies(sortArrayBusiness);
}

let compareCounterRevenue = 0;
let sortArrayRevenue = [];
function sortForRevenue() {
  if (compareCounterRevenue == 0) {
    sortArrayRevenue = [];
    companyArray.forEach(item => {
      sortArrayRevenue.push(item);
    });
    sortArrayRevenue.sort(function compareNumbers(a, b) {
      return a.revenue - b.revenue;
    });
    compareCounterRevenue++;
  } else {
    sortArrayRevenue.reverse(function compareNumbers(a, b) {
      return a.revenue - b.revenue;
    });
    compareCounterRevenue = compareCounterRevenue - 1;
  }

  displayCompanies(sortArrayRevenue);
}

let compareCounterPlus = 0;
let sortArrayPlus = [];
function sortForPlus() {
  if (compareCounterPlus == 0) {
    sortArrayPlus = [];
    companyArray.forEach(item => {
      sortArrayPlus.push(item);
    });
    sortArrayPlus.sort(function compareNumbers(a, b) {
      return a.plusNegative - b.plusNegative;
    });
    compareCounterPlus++;
  } else {
    sortArrayPlus.reverse(function compareNumbers(a, b) {
      return a.plusNegative - b.plusNegative;
    });
    compareCounterPlus = compareCounterPlus - 1;
  }

  displayCompanies(sortArrayPlus);
}

function makeNewData(obj) {
  let businessValue = obj.id.split(".")[1];
  let newDisplayArray = [];
  companyArray.forEach(item => {
    if (item.business == businessValue) {
      newDisplayArray.push(item);
    }
  });
  console.log(newDisplayArray);
  displayCompanies(newDisplayArray);
}
function makeDummyData() {
  let stockCounter = 1;
  for (stockCounter; stockCounter < 41; stockCounter++) {
    let companyObject = {
      name: `Company ${stockCounter}`,
      plusNegative: Math.floor(Math.random() * 101) - 50,
      revenue: Math.floor(Math.random() * 191) + 10,
      totalValue: Math.floor(Math.random() * 181) + 20,
      business: Math.floor(Math.random() * 10) + 1
    };
    companyArray.push(companyObject);
  }

  displayCompanies(companyArray);
}
function displayCompanies(input) {
  let theTableBody = document.querySelector("#companyObjTarget");
  while (theTableBody.rows.length > 0) {
    theTableBody.deleteRow(0);
  }

  input.forEach((comp, index) => {
    let tableObj = document.createElement("tr");
    tableObj.setAttribute("id", `company.${index}`);
    tableObj.setAttribute("class", "tableRow");

    let tableObjName = document.createElement("td");
    tableObjName.textContent = comp.name;
    tableObj.append(tableObjName);
    tableObjName.setAttribute("class", "linkTarget");

    let tableObjIndex = document.createElement("td");
    tableObjIndex.textContent = `${comp.plusNegative}%`;
    tableObj.append(tableObjIndex);

    let tableObjRev = document.createElement("td");
    tableObjRev.textContent = `${comp.revenue} mio,-`;
    tableObj.append(tableObjRev);

    let tableObjTotal = document.createElement("td");
    tableObjTotal.textContent = `${comp.totalValue} mia,-`;
    tableObj.append(tableObjTotal);

    let tableObjBusiness = document.createElement("td");
    let businessText;
    switch (comp.business) {
      case 1:
        businessText = "Olie og Gas";
        break;
      case 2:
        businessText = "Telekom";
        break;
      case 3:
        businessText = "Basismaterialer";
        break;
      case 4:
        businessText = "Forsyning";
        break;
      case 5:
        businessText = "Industri";
        break;
      case 6:
        businessText = "Finans";
        break;
      case 7:
        businessText = "Forbrugsvarer";
        break;
      case 8:
        businessText = "Teknologi";
        break;
      case 9:
        businessText = "Sundhedspleje";
        break;
      case 10:
        businessText = "Forbrugstjenester";
        break;
    }
    tableObjBusiness.textContent = businessText;
    tableObj.append(tableObjBusiness);

    let tableObjButton = document.createElement("td");
    let addToPort = document.createElement("button");
    addToPort.setAttribute("id", `button${index + 1}`);
    addToPort.textContent = "Add to Portfolio";
    addToPort.addEventListener("click", () => {
      console.log(`clicked ${addToPort.id}`);
      if (loggedIn == false) {
        openModalSignUp();
      } else {
        console.log("LOGGED IN");
        saveStockToPort(comp.name);
      }
    });
    tableObjButton.append(addToPort);
    tableObj.append(tableObjButton);

    theTableBody.append(tableObj);
  });
  let allRowsInTable = document.querySelectorAll(".linkTarget");
  allRowsInTable.forEach(item => {
    item.addEventListener("click", () => {
      window.location.href = `index.html?compName=${item.firstChild.textContent}`;
    });
  });
}
function saveStockToPort(id) {
  document.querySelector("#portDisplayContainer").classList.remove("hide");
  console.log(id);
  console.log(loggedInUser);
  if (loggedInUser.portdata.portData1 === "") {
    loggedInUser.portdata.portData1 = id;
    console.log(loggedInUser.portdata);
  } else {
    if (loggedInUser.portdata.portData2 === "") {
      loggedInUser.portdata.portData2 = id;
      console.log(loggedInUser.portdata);
    } else {
      if (loggedInUser.portdata.portData3 === "") {
        loggedInUser.portdata.portData3 = id;
        console.log(loggedInUser.portdata);
      } else {
        if (loggedInUser.portdata.portData4 === "") {
          loggedInUser.portdata.portData4 = id;
          console.log(loggedInUser.portdata);
        } else {
          if (loggedInUser.portdata.portData5 === "") {
            loggedInUser.portdata.portData5 = id;
            console.log(loggedInUser.portdata);
          } else {
            console.log("alle 5 portfolio pladser er brugt");
          }
        }
      }
    }
  }
  const postData = JSON.stringify(loggedInUser);
  fetch(
    `https://fundstower-cd8c.restdb.io/rest/fundsusers/${loggedInUser._id}`,
    {
      method: "put",
      headers: {
        "Content-Type": "application/json; charset=utf-8",
        "x-apikey": "5d7a2da3bdaac80423d2c74c",
        "cache-control": "no-cache"
      },
      body: postData
    }
  )
    .then(res => res.json())

    .then(data => changepage(data));
}
function targetMarket() {
  let items = document.querySelectorAll(".countryItem");

  items.forEach(item => {
    item.addEventListener("click", () => {
      setHeadlines(item);
    });
  });
}
function setHeadlines(div) {
  console.log(div);
  let items = document.querySelectorAll(".countryItem");
  items.forEach(item => {
    item.classList.remove("active");
  });

  let h1Text = div.childNodes[1].textContent;
  console.log(h1Text);
  let targeth1 = document.querySelector("#targeth1");
  targeth1.textContent = h1Text;
  div.classList.add("active");
  let targeth2 = document.querySelector("#targeth2Span");

  let h2Text;

  switch (div.getAttribute("id").slice(-1)) {
    case "1":
      h2Text = "Danmark";
      break;
    case "2":
      h2Text = "Europa";
      break;
    case "3":
      h2Text = "Amerika";
      break;
    case "4":
      h2Text = "Asien";
      break;
    case "5":
      h2Text = "mindre markeder rundt om kloden";
      break;
  }

  targeth2.textContent = h2Text;
}
