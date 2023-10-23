let selectedStar = 0;
let feedbackData = [];

function changeStarColor(selectedValue) {
  selectedStar = selectedValue;
  const stars = document.querySelectorAll(".star svg");
  stars.forEach((star, index) => {
    star.classList.toggle("selected", index < selectedValue);
  });
}

const stars = document.querySelectorAll(".star svg");
stars.forEach((star, index) => {
  star.addEventListener("click", () => changeStarColor(index + 1));
});

function resetForm() {
  form.reset();
  selectedStar = 0;
  changeStarColor(0);
}

const form = document.querySelector("form");
form.addEventListener("submit", (event) => {
  event.preventDefault();
  // Aggiungi qui la convalida del modulo
  const subject = document.querySelector("#subject").value;
  const message = document.querySelector("#text").value;

  // Convalida dei campi
  let errors = [];

  if (subject.trim() === "") {
    errors.push('Il campo "Subject" è obbligatorio.');
  }

  if (selectedStar === 0) {
    errors.push("Seleziona un voto!");
  }

  if (message.trim() === "") {
    errors.push("Inserisci un commento!");
  }

  // Se ci sono errori, mostra un messaggio di errore
  if (errors.length > 0) {
    alert("Si sono verificati i seguenti errori:\n" + errors.join("\n"));
  } else {
    // Se non ci sono errori, procedi con l'invio del modulo
    const feedback = { subject, rating: selectedStar, message };
    feedbackData.push(feedback);

    fetch("/feedback", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(feedback),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("success: ", data);
      })
      .catch((error) => {
        console.log("error: ", error);
      });

    // Esegui altre azioni, ad esempio l'invio al server o il reset del modulo
    resetForm();

    // Visualizza il popup di conferma
    popup.style.display = "block";
    overlay.style.display = "block";
  }
});

const popup = document.getElementById("popup");
const overlay = document.getElementById("overlay");
const continua = document.getElementById("continua");

// Aggiungi un evento per chiudere il popup e nascondere lo sfondo opaco
continua.addEventListener("click", function () {
  popup.style.display = "none";
  overlay.style.display = "none";
  resetForm();
  window.location.href = "/feedback";
});

const exitButton = document.querySelector("#exit"); // Seleziona l'elemento per il pulsante "Esci"

exitButton.addEventListener("click", () => {
  popup.style.display = "none";
  overlay.style.display = "none";
  window.location.href = "/logout";
});
