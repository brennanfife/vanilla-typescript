const currencyElement1 = document.getElementById(
  "currency-one"
) as HTMLSelectElement;
const amountElement1 = document.getElementById(
  "amount-one"
) as HTMLInputElement;
const currencyElement2 = document.getElementById(
  "currency-two"
) as HTMLSelectElement;
const amountElement2 = document.getElementById(
  "amount-two"
) as HTMLInputElement;
const rateElement = document.getElementById("rate") as HTMLButtonElement;
const swap = document.getElementById("swap") as HTMLElement;

// Fetch exchange rates and update DOM
function calculate() {
  const currrency1 = currencyElement1.value;
  const currrency2 = currencyElement2.value;
  fetch(`https://api.exchangerate-api.com/v4/latest/${currrency1}`)
    .then(res => res.json())
    .then(data => {
      const rate = data.rates[currrency2];
      rateElement.innerText = `1 ${currrency1} = ${rate} ${currrency2}`;
      amountElement2.value = (+amountElement1.value * rate).toFixed(2);
    });
}

// event listeners
currencyElement1.addEventListener("change", calculate);
amountElement1.addEventListener("input", calculate);
currencyElement2.addEventListener("change", calculate);
amountElement2.addEventListener("input", calculate);
swap.addEventListener("click", () => {
  const temp = currencyElement1.value;
  currencyElement1.value = currencyElement2.value;
  currencyElement2.value = temp;
  calculate();
});

calculate(); //Initial calcualtion
