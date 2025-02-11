// const base_url =  "https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies/";
const url = "https://api.exchangerate-api.com/v4/latest/USD";
const dropdownSelects = document.querySelectorAll("select"); // Selects all dropdowns
const btn = document.querySelector(".convert-btn");
const msg = document.querySelector(".exchange-message");
const from = document.querySelector("#from-currency");
const to = document.querySelector("#to-currency");
import {countryList} from "./codes.js"
// List of currency codes mapped to country codes

// Populating dropdowns with currency codes
for (let select of dropdownSelects) {
  for (let currCode in countryList) {
    let newOption = document.createElement("option");
    newOption.innerText = currCode;
    newOption.value = currCode;

    // Set default values
    if (select.id === "from-currency" && currCode === "USD") {
      newOption.selected = "selected";
    } else if (select.id === "to-currency" && currCode === "PKR") {
      newOption.selected = "selected";
    }

    select.append(newOption);
  }

  // Event listener to update flag when currency changes
  select.addEventListener("change", (evt) => {
    evt.preventDefault();
    updateFlag(evt.target);
  });
}

// Function to update flag when currency changes
const updateFlag = (element) => {
  let currCode = element.value;
  let countryCode = countryList[currCode];
  let newSrc = `https://flagsapi.com/${countryCode}/shiny/64.png`;
  let img = element.parentElement.querySelector("img");
  img.src = newSrc;
};

// Event listener for Convert button
btn.addEventListener("click", async (evt) => {
  evt.preventDefault();

  let amount = document.querySelector("#amount");
  let amtVal = amount.value;

  // Default to 1 if input is empty or invalid
  if (amtVal === "" || amtVal <= 0) {
    amtVal = "1";
    amount.value = "1";
  }

  try {
    let response = await fetch("https://api.exchangerate-api.com/v4/latest/USD");
    let data = await response.json();

    // const url = `${base_url}/${from.value.toLowerCase()}/${to.value.toLowerCase()}.json`;
    // let response = await fetch(url);
    // let data = await response.json();

    let rate = data.rates[to.value] / data.rates[from.value];
    let finalAmount = (amtVal * rate).toFixed(2);

    msg.innerText = `${amtVal} ${from.value} = ${finalAmount} ${to.value} approx`;
  } catch (error) {
    msg.innerText = "Error fetching exchange rates. Try again!";
  }
});
