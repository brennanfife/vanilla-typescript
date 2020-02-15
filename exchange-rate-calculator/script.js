var currencyElement1 = document.getElementById("currency-one");
var amountElement1 = document.getElementById("amount-one");
var currencyElement2 = document.getElementById("currency-two");
var amountElement2 = document.getElementById("amount-two");
var rateElement = document.getElementById("rate");
var swap = document.getElementById("swap");
// Fetch exchange rates and update DOM
function calculate() {
    var currrency1 = currencyElement1.value;
    var currrency2 = currencyElement2.value;
    fetch("https://api.exchangerate-api.com/v4/latest/" + currrency1)
        .then(function (res) { return res.json(); })
        .then(function (data) {
        var rate = data.rates[currrency2];
        rateElement.innerText = "1 " + currrency1 + " = " + rate + " " + currrency2;
        amountElement2.value = (+amountElement1.value * rate).toFixed(2);
    });
}
// event listeners
currencyElement1.addEventListener("change", calculate);
amountElement1.addEventListener("input", calculate);
currencyElement2.addEventListener("change", calculate);
amountElement2.addEventListener("input", calculate);
swap.addEventListener("click", function () {
    var temp = currencyElement1.value;
    currencyElement1.value = currencyElement2.value;
    currencyElement2.value = temp;
    calculate();
});
calculate(); //Initial calcualtion
