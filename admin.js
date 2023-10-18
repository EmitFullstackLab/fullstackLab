/*

  creazione del grafico con le medie dei feedback dei vari moduli
  
  ↓
  ↓
  ↓

*/

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
];
const yValues = [1, 5, 3, 2, 5, 5, 4, 0, 2, 1, 2, 3];

new Chart("myChart", {
  type: "line",
  data: {
    labels: xValues,
    datasets: [
      {
        fill: false,
        lineTension: 0,
        backgroundColor: "rgba(0,0,255,1.0)",
        borderColor: "rgba(0,0,255,0.1)",
        data: yValues,
      },
    ],
  },
  options: {
    legend: { display: false },
    scales: {
      yAxes: [{ ticks: { min: 0, max: 5 } }],
    },
  },
});

/*

  funzione di switch schermata
  
  ↓
  ↓
  ↓

    <span class="sidebar-text" id="view-feedbacks">VIEW FEEDBACKS</span>
    <span class="sidebar-text" id="feedbacks-average">FEEDBACKS AVERAGE</span>

    <div class="feedbacks-average-container">
    <div class="view-feedbacks-container">

*/

const viewFeedbacks = document.querySelector("#view-feedbacks");
const feedbacksAverage = document.querySelector("#feedbacks-average");
const viewFeedbacksDiv = document.querySelector(".view-feedbacks-container");
const feedbacksAverageContainer = document.querySelector(
  ".feedbacks-average-container"
);

viewFeedbacks.addEventListener("click", () => {
  viewFeedbacksDiv.classList.add("active");
  feedbacksAverageContainer.classList.remove("active");
  viewFeedbacks.classList.add("active");
  feedbacksAverage.classList.remove("active");
});

feedbacksAverage.addEventListener("click", () => {
  feedbacksAverageContainer.classList.add("active");
  viewFeedbacksDiv.classList.remove("active");
  feedbacksAverage.classList.add("active");
  viewFeedbacks.classList.remove("active");
});
