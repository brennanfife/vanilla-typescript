"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const main = document.getElementById("main");
const addUserButton = document.getElementById("add-user");
const doubleButton = document.getElementById("double");
const showMillionairesButton = document.getElementById("show-millionaires");
const sortButton = document.getElementById("sort");
const calculateWealthButton = document.getElementById("calculate-wealth");
let data = [];
getRandomUser();
getRandomUser();
getRandomUser();
// fetch random user and add money
function getRandomUser() {
    return __awaiter(this, void 0, void 0, function* () {
        const res = yield fetch("https://randomuser.me/api");
        const data = yield res.json();
        const user = data.results[0];
        const newUser = {
            name: `${user.name.first} ${user.name.last}`,
            money: Math.floor(Math.random() * 1000000)
        };
        addData(newUser);
    });
}
function addData(object) {
    data.push(object);
    updateDOM();
}
// Double eveyones money
function doubleMoney() {
    data = data.map(user => {
        return Object.assign(Object.assign({}, user), { money: user.money * 2 });
    });
    updateDOM();
}
// Sorts by richest
function sortByRichest() {
    data.sort((a, b) => b.money - a.money);
    updateDOM();
}
// Filter only millionaires
function showMillionaires() {
    data = data.filter(user => user.money > 1000000);
    updateDOM();
}
// Sums up all money
function calculateWeatlh() {
    const wealth = data.reduce((acc, user) => (acc += user.money), 0);
    const wealthElement = document.createElement("div");
    wealthElement.innerHTML = `<h3>Total Wealth: <strong>${formatMoney(wealth)}</strong></h3>`;
    main.appendChild(wealthElement);
}
// Update DOM
function updateDOM(providedData = data) {
    // clear main div
    main.innerHTML = "<h2><strong>Person</strong> Wealth</h2>";
    providedData.forEach(item => {
        const element = document.createElement("div");
        element.classList.add("person");
        element.innerHTML = `<strong>${item.name}</strong> ${formatMoney(item.money)}`;
        main.appendChild(element);
    });
}
// format number as money
function formatMoney(number) {
    return "$" + number.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,");
}
//Event listeners
addUserButton.addEventListener("click", getRandomUser);
doubleButton.addEventListener("click", doubleMoney);
sortButton.addEventListener("click", sortByRichest);
showMillionairesButton.addEventListener("click", showMillionaires);
calculateWealthButton.addEventListener("click", calculateWeatlh);
