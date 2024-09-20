// const base_url =  "https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies/";
console.time("time taken : ");
const url = "https://api.exchangerate-api.com/v4/latest/USD";
const dropdownSelects = document.querySelectorAll(".dropdown select");
const btn = document.querySelector(".btn");
const msg = document.querySelector(".msg");
const from = document.querySelector(".selectfrom");
const to = document.querySelector(".selectto");

for (select of dropdownSelects) {
  for (currCode in countryList) {
    let newOption = document.createElement("option");
    newOption.innerText = currCode;
    newOption.value = currCode;
    if (select.name === "from" && currCode === "USD") {
      newOption.selected = "selected";
    } else if (select.name === "to" && currCode === "PKR") {
      newOption.selected = "selected";
    }
    select.append(newOption);
  }
  select.addEventListener("change", (evt) => {
    evt.preventDefault();
    updateFlag(evt.target);
  });
}
const updateFlag = (element) => {
  let currCode = element.value;
  let countryCode = countryList[currCode];
  let newSrc = `https://flagsapi.com/${countryCode}/shiny/64.png`;
  let img = element.parentElement.querySelector("img");
  img.src = newSrc;
};
btn.addEventListener("click", async (evt) => {
  evt.preventDefault();
  let amount = document.querySelector("#amt");
  let amtVal = amount.value;
  if (amtVal === "" || amtVal <= 0) {
    amtVal = "1";
    amount.value = "1";
  }
  let response = await fetch("https://api.exchangerate-api.com/v4/latest/USD");
  // console.log(response);
  let data = await response.json();
  // const url = `${base_url}/${from.value.toLowerCase()}/${to.value.toLowerCase()}.json`;
  // let response = await fetch(url);
  // let data = await response.json();
  let rate = data.rates[to.value] / data.rates[from.value];
  let finalAmount = amtVal * rate;
  msg.innerText = `${amtVal} ${from.value} = ${finalAmount} ${to.value} approx`;
  console.timeEnd("time taken : ");
});
