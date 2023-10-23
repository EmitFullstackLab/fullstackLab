const form = document.querySelector("form");
const emailEl = document.querySelector("#email");
const passwordEl = document.querySelector("#password");
// const confirmEl = document.querySelector("#confirmPwd");

async function fetchAsync(url) {
  let response = await fetch(url);
  let data = await response.json();
  return data;
}

const toRegister = document.querySelector("#toRegister");
toRegister.addEventListener("click", () => {
  console.log("vai a register");
  goToPage("/register");
});
