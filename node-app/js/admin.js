/*

  aggiungere le varie funzioni delle select nella schermata di view dei feedback
  
  ↓
  ↓
  ↓

*/

document.addEventListener("DOMContentLoaded", function () {
  // Seleziona le select
  var subjectSelectView = document.getElementById("subject-view");

  // Seleziona tutti i div feedback-card
  var feedbackCards = document.querySelectorAll(".feedback-card");

  // Aggiungi un gestore di eventi all'evento "change" della select del soggetto
  subjectSelectView.addEventListener("change", function () {
    var selectedValueSubject = subjectSelectView.value;

    // Itera su tutti i div feedback-card e nascondi/quelli che non corrispondono al valore selezionato
    feedbackCards.forEach(function (card) {
      var idFeedback = card.getAttribute("idfeedback");
      if (
        selectedValueSubject === "ALL" ||
        selectedValueSubject === idFeedback
      ) {
        card.style.display = "block"; // Mostra il div
      } else {
        card.style.display = "none"; // Nascondi il div
      }
    });
  });
});

/*

  creazione del grafico con le medie dei feedback dei vari moduli
  
  ↓
  ↓
  ↓

*/

function filterArray(array, selected) {
  const filtered = array.filter((obj) => {
    // Utilizzo trim() per rimuovere eventuali spazi bianchi dall'ID
    return obj.id.trim() === selected.trim();
  });
  return filtered;
}

function chartVars(arrayFiltered) {
  const x = [];
  const y = [];
  arrayFiltered.forEach((el) => {
    x.push(el.date);
    y.push(el.average);
  });
  const values = [x, y];

  return values;
}

const divDatiNascostiAverages = document.querySelector(
  "#dati-nascosti-averages"
);

const averages = divDatiNascostiAverages.getAttribute("averages").slice(0, -1);
const dates = divDatiNascostiAverages.getAttribute("dates").slice(0, -1);
const subjectsId = divDatiNascostiAverages
  .getAttribute("subjectsId")
  .slice(0, -1);

// Splitta la stringa in un array utilizzando la virgola come delimitatore
const arrayAverages = averages.split(",");
const arrayDates = dates.split(",");
const arraySubjectsId = subjectsId.split(",");

let averageObjectsArray = [];
arrayAverages.forEach((average, index) => {
  let obj = {
    average: parseFloat(average),
    date: arrayDates[index],
    id: arraySubjectsId[index],
  };
  averageObjectsArray.push(obj);
});

function changeChart(xDatesValues, yAveragesValues) {
  new Chart("myChart", {
    type: "line",
    data: {
      labels: xDatesValues,
      datasets: [
        {
          backgroundColor: "rgba(255,255,255,.5)",
          data: yAveragesValues,
          fill: true,
          label: "Subject feedback rate average",
          borderColor: "rgb(75, 192, 192)",
          tension: 0.3,
          pointBackgroundColor: "rgb(0,0,0,.5)",
          pointBorderWidth: 1,
          drawActiveElementsOnTop: true,
          pointStyle: "circle",
          pointRadius: 7,
          pointHoverRadius: 12,
        },
      ],
    },
    options: {
      legend: { display: true },
      scales: {
        yAxes: [{ ticks: { min: 0, max: 5 } }],
      },
    },
  });
}

const subjectSelect = document.querySelector("#subject-average");
let subjectSelected = subjectSelect.value;

const filteredArray = filterArray(averageObjectsArray, subjectSelected);

const startValues = chartVars(filteredArray);

const xValues = startValues[0];
const yValues = startValues[1];

// alla selezione di una nuova materia nella section verrà cambiato il grafico
subjectSelect.addEventListener("change", () => {
  const newSubjectSelected = subjectSelect.value;

  const newArrayFiltered = filterArray(averageObjectsArray, newSubjectSelected);

  const changedValues = chartVars(newArrayFiltered);

  const xDates = changedValues[0];
  const yAverages = changedValues[1];

  changeChart(xDates, yAverages);
});

changeChart(xValues, yValues);

/*

  funzione di switch schermata
  
  ↓
  ↓
  ↓

*/

const viewFeedbacks = document.querySelector("#view-feedbacks");
const feedbacksAverage = document.querySelector("#feedbacks-average");
const viewFeedbacksDiv = document.querySelector(".view-feedbacks-container");
const feedbacksAverageContainer = document.querySelector(
  ".feedbacks-average-container"
);
const addAdmin = document.querySelector("#add-admin");
const adminLogout = document.querySelector("#admin-logout");
const addAdminContainer = document.querySelector(".add-admin-container");

viewFeedbacks.addEventListener("click", () => {
  feedbacksAverageContainer.classList.remove("active");
  feedbacksAverage.classList.remove("active");
  addAdmin.classList.remove("active");
  addAdminContainer.classList.remove("active");
  viewFeedbacksDiv.classList.add("active");
  viewFeedbacks.classList.add("active");
});

feedbacksAverage.addEventListener("click", () => {
  viewFeedbacksDiv.classList.remove("active");
  viewFeedbacks.classList.remove("active");
  addAdmin.classList.remove("active");
  addAdminContainer.classList.remove("active");
  feedbacksAverageContainer.classList.add("active");
  feedbacksAverage.classList.add("active");
});

addAdmin.addEventListener("click", () => {
  feedbacksAverageContainer.classList.remove("active");
  feedbacksAverage.classList.remove("active");
  viewFeedbacksDiv.classList.remove("active");
  viewFeedbacks.classList.remove("active");
  addAdmin.classList.add("active");
  addAdminContainer.classList.add("active");
});

adminLogout.addEventListener("click", () => {
  window.location.href = "/logout";
});

/*

  aggiungere funzione di logout dell'admin
  
  ↓
  ↓
  ↓

*/

adminLogout.addEventListener("click", () => {
  window.location.href = "/logout";
});
