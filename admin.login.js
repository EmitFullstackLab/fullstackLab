const form = document.querySelector("form");

form.addEventListener('submit', (event) => {
  event.preventDefault();


   const password = document.querySelector("#password").value;
   const confirmPwd = document.querySelector("#confirmPwd").value;

   if (password==confirmPwd){
    console.log("uguale");
   }else{
    console.log("sbagliata");
   }
});