/*

  aggiungere le varie funzioni delle select nella schermata di view dei feedback
  
  ↓
  ↓
  ↓







*/

/*

  creazione del grafico con le medie dei feedback dei vari moduli
  
  ↓
  ↓
  ↓

*/

//qui andranno le date

//      subjectsAveragesRow
// {
//   subject_average: '4.5000',
//   feedback_date: 1969-12-31T23:00:00.000Z
// }

const divDatiNascosti = document.querySelector("#dati-nascosti");

const xValues = [
  "12 / 02 / 2023",
  "30 / 03 / 2023",
  "23 / 04 / 2023",
  "06 / 05 / 2023",
  "15 / 06 / 2023",
  "29 / 07 / 2023",
  "01 / 08 / 2023",
  "06 / 09 / 2023",
  "15 / 10 / 2023",
  "29 / 11 / 2023",
  "01 / 12 / 2023",
  "06 / 01 / 2024",
  "15 / 02 / 2024",
  "29 / 03 / 2024",
  "01 / 04 / 2024",
];

// qui andranno le varie medie che escono raggruppando i feedback_rate per data (mese e anno)
const yValues = [1, 5, 3, 3.5, 2, 5, 4.7, 5, 4, 0, 2, 4.5, 1, 2, 2.5, 3];

const subjectSelect = document.querySelector("#subject-average");

// alla selezione di una nuova materia nella section verrà cambiato il grafico
subjectSelect.addEventListener("change", () => {
  //qui andranno le date
  const xValues = [
    "12 / 02 / 2023",
    "30 / 03 / 2023",
    "23 / 04 / 2023",
    "06 / 05 / 2023",
    "15 / 06 / 2023",
    "29 / 07 / 2023",
    "01 / 08 / 2023",
    "06 / 09 / 2023",
    "15 / 10 / 2023",
    "29 / 11 / 2023",
    "01 / 12 / 2023",
    "06 / 01 / 2024",
    "15 / 02 / 2024",
    "29 / 03 / 2024",
    "01 / 04 / 2024",
  ];

  // qui andranno le varie medie che escono raggruppando i feedback_rate per data (mese e anno)
  const yValues = [1, 5, 3, 3.5, 2, 5, 4.7, 5, 4, 0, 2, 4.5, 1, 2, 2.5, 3];

  changeChart(xValues, yValues);
});

function changeChart(xValues, yValues) {
  // qui andranno le date (mese e anno)

  new Chart("myChart", {
    type: "line",
    data: {
      labels: xValues,
      datasets: [
        {
          backgroundColor: "rgba(255,255,255,.5)",
          data: yValues,
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

/*

  aggiungere funzione di logout dell'admin
  
  ↓
  ↓
  ↓

<span class="sidebar-text" id="add-admin">ADD ADMIN</span>
<div class="add-admin-container">





*/
