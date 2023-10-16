const form = document.querySelector("form");
const emailEl = document.querySelector("#email");
const passwordEl = document.querySelector("#password");
const confirmEl = document.querySelector("#confirmPwd");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const email = emailEl.value;
  const password = passwordEl.value;
  const confirmPwd = confirmEl.value;

  if (password === confirmPwd) {
    console.log("pwd: ", passwordEl.value);
    console.log("confirm: ", confirmEl.value);
    console.log("password uguali");
  } else {
    console.log("pwd: ", passwordEl.value);
    console.log("confirm: ", confirmEl.value);
    console.log("password sbagliata");
  }

  console.log("email: ", emailEl.value);
});
