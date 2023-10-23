const form = document.querySelector("form");
const emailEl = document.querySelector("#email");
const passwordEl = document.querySelector("#password");
// const confirmEl = document.querySelector("#confirmPwd");

async function fetchAsync(url) {
  let response = await fetch(url);
  let data = await response.json();
  return data;
}

// form.addEventListener("submit", (e) => {
//   e.preventDefault();
//   const email = emailEl.value;
//   const password = passwordEl.value;

//   window.location.replace("/pages/register.html");
// });

function goToPage(pageUrl) {
  window.location.href = pageUrl;
}

const toRegister = document.querySelector("#toRegister");
toRegister.addEventListener("click", () => {
  goToPage("/register");
});
