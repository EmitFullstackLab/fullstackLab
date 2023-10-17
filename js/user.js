const form = document.querySelector("form");
const emailEl = document.querySelector("#email");
const passwordEl = document.querySelector("#password");
// const confirmEl = document.querySelector("#confirmPwd");

async function fetchAsync(url) {
  let response = await fetch(url);
  let data = await response.json();
  return data;
}

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const email = emailEl.value;
  const password = passwordEl.value;
  // const confirmPwd = confirmEl.value;

  // if (password === confirmPwd) {
  //   console.log("pwd: ", passwordEl.value);
  //   console.log("confirm: ", confirmEl.value);
  //   console.log("password uguali");
  // } else {
  //   console.log("confirm: ", confirmEl.value);
  //   console.log("password sbagliata");
  // }

  console.log("email: ", email);
  console.log("pwd: ", password);

  window.location.replace("/pages/register.html");
});
