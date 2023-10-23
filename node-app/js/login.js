const form = document.querySelector("form");
const emailEl = document.querySelector("#email");
const passwordEl = document.querySelector("#password");

async function fetchAsync(url) {
  let response = await fetch(url);
  let data = await response.json();
  return data;
}

function goToPage(pageUrl) {
  window.location.href = pageUrl;
}

const toRegister = document.querySelector("#toRegister");
toRegister.addEventListener("click", () => {
  goToPage("/register");
});
