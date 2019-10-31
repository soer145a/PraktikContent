"use strict";
let theModal = document.querySelector("#optionModal");
window.addEventListener("DOMContentLoaded", init);
function init() {
  console.log("It's linked");
  makeModalButton();
}

function makeModalButton() {
  document.querySelector("#startButton").addEventListener("click", openModal);
}
function openModal() {
  theModal.classList.remove("hide");
  document.querySelector("#continue").addEventListener("click", () => {
    window.location.href = "indexOverview.html";
  });
}
