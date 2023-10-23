const formSubmit = document.querySelector(".register-form");
const body = document.querySelector("body");

// formSubmit.addEventListener("submit", function (event) {
//   event.preventDefault();

//   /*

//     aggiungere controllo nel database se esiste gia la email inserita
//     aggiungere controllo se nome e cognome corrispondono alla matricola inserita

//   */

//   // Recupera i valori dei campi "password" e "confirmPwd"
//   const password = document.getElementById("password").value;
//   const confirmPwd = document.getElementById("confirmPwd").value;

//   // Verifica se i campi sono uguali
//   if (password === confirmPwd) {
//     const verificationFormHtml = `
//       <div class="confirm-form-container">
//         <form action="submit" class="confirm-form">
//             <span class="form-title">VERIFICATION CODE</span>
//             <p class="form-description">
//             Please enter the verification code sent to your email address.
//             </p>
//             <div class="inputs-container variant">
//             <div class="small-input-container">
//                 <input
//                 type="text"
//                 id="verification-code"
//                 name="verification-code"
//                 placeholder="INSERT CODE"
//                 maxlength="5"
//                 required
//                 />
//             </div>
//             <div class="group">
//                 <span class="clickable-span">resend code</span>
//                 <img src="mdi_email-resend-outline.svg" alt="" class="icon" />
//             </div>
//             </div>
//             <div class="submit-container variant">
//             <input
//                 type="submit"
//                 id="verification-code-btn"
//                 name="verification-code-btn"
//                 value="CONFIRM"
//             />
//             </div>
//         </form>
//       </div>
//     `;
//     body.innerHTML += verificationFormHtml;
//     const formConfirm = document.querySelector(".confirm-form");
//     // genero una stringa alfanumarica random, in questo caso di lunghezza di 5 caratteri
//     let verificationCode = generateRandomString(5);
//     console.log(verificationCode);
//     // premendo su resend code viene rigenerato il codice
//     const resendCode = formConfirm.querySelector(".group");
//     resendCode.addEventListener("click", () => {
//       verificationCode = generateRandomString(5);
//       console.log(verificationCode);
//     });
//     formConfirm.addEventListener("submit", function (event) {
//       event.preventDefault();
//       // prendo dal form il codice inserito dall'utente
//       const userVerificationCode =
//         document.getElementById("verification-code").value;
//       // controllo che l'utente abbia inserito il codice giusto
//       if (verificationCode != userVerificationCode) {
//         error("The entered verification code is not correct.");
//       } else {
//         /*

//           aggiungere inserimento nel database del nuovo user e reindirizzamento alla pagina di login

//         */
//       }
//     });
//   } else {
//     error("Passwords do not match.");
//   }
// });

/*

  funzione easter egg di badjeej

  ↓
  ↓
  ↓

*/

document.addEventListener("DOMContentLoaded", function () {
  // Definisci la funzione che desideri eseguire dopo 20 secondi
  function badjeej() {
    function wow() {
      const badjeejDiv = document.querySelector(".badjeej");

      // Aggiungi la classe al div
      badjeejDiv.classList.add("active");

      // Imposta un timeout per rimuovere la classe dopo 5 secondi
      setTimeout(function () {
        badjeejDiv.classList.remove("active");
      }, 5000); // 5000 millisecondi = 5 secondi
    }

    // Chiamare la funzione per aggiungere la classe e avviare il processo
    wow();
  }
  // Imposta un timeout di 20 secondi (in millisecondi)
  setTimeout(badjeej, 10000); // 20000 millisecondi = 20 secondi
});

/*

  funzione per andare in una pagina

  ↓
  ↓
  ↓

*/

function goToPage(pageUrl) {
  window.location.href = pageUrl;
}

/*

  controllo sul click su LOGIN HERE!

  ↓
  ↓
  ↓

*/

const toLogin = document.querySelector("#toLogin");
toLogin.addEventListener("click", () => {
  console.log("vai a login");
  goToPage("/login");
});

/*

  funzione di comparsa errore a schermo
  
  ↓
  ↓
  ↓

*/

function error(text) {
  const errorContainer = document.querySelector(".error-container");
  const errorText = errorContainer.querySelector(".error-text");
  errorText.textContent = text;
  // Aggiungi la classe al div
  errorContainer.classList.add("active");
  // Imposta un timeout per rimuovere la classe dopo 5 secondi
  setTimeout(function () {
    errorContainer.classList.remove("active");
  }, 5000); // 5000 millisecondi = 5 secondi
}

/*

  funzione di creazione di stringa alfanumerica random
  
  ↓
  ↓
  ↓

*/

// function generateRandomString(length) {
//   const charset = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";
//   let result = "";
//   for (let i = 0; i < length; i++) {
//     const randomIndex = Math.floor(Math.random() * charset.length);
//     result += charset[randomIndex];
//   }
//   return result;
// }
