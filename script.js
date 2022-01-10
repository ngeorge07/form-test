function getFormData() {
  let url =
    "https://usebasin.com/api/v1/submissions?form_id=ab2834d7e27b&api_token=1cbd5d2e93116be3389923b4e8c5fd5d";

  const options = {
    headers: {
      "x-apikey": "61b64c7672a03f5dae822307",
    },
  };

  let data = fetch(url, options)
    .then((response) => response.json())
    .then(updateForm);
}

let today = new Date();
let lastDay = new Date();

const dd = String(today.getDate()).padStart(2, "0");
const mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
const yyyy = today.getFullYear();

const mmLast = String(today.getMonth() + 2).padStart(2, "0");

today = `${dd}-${mm}-${yyyy}`;
lastDay = `${dd}-${mmLast}-${yyyy}`;

let unavailableDays = [];

function updateForm(a) {
  a.submissions.forEach((e) => {
    unavailableDays.push(e.payload_params.date);
  });
  console.log(unavailableDays);
  const elem = document.getElementById("date");
  const datepicker = new Datepicker(elem, {
    buttonClass: "btn",
    minDate: today,
    maxDate: lastDay,
    daysOfWeekDisabled: [0, 6],
    format: "dd/mm/yyyy",
    autohide: true,
    datesDisabled: unavailableDays,
  });
}

function makeDayClick() {
  const calendar = document.querySelector(".datepicker-grid");
  const nextButton = document.querySelector(".next-btn");
  const prevButton = document.querySelector(".prev-btn");
  const viewSwitch = document.querySelector(".view-switch");
  let availableDays = calendar.querySelectorAll(
    ".datepicker-cell:not(.disabled)"
  );

  function dayIsClicked() {
    let t = 0;
    console.log(t);

    availableDays.forEach((d) => {
      d.removeEventListener("click", dayIsClicked);
    });

    nextButton.removeEventListener("click", nextClicked);
    prevButton.removeEventListener("click", nextClicked);
  }

  availableDays.forEach((d) => {
    d.addEventListener("click", dayIsClicked);
  });

  function nextClicked() {
    availableDays = calendar.querySelectorAll(
      ".datepicker-cell:not(.disabled)"
    );

    const unDays = document.querySelectorAll(".datepicker-cell.disabled");

    unDays.forEach((z) => {
      z.removeEventListener("click", dayIsClicked);
    });

    availableDays.forEach((d) => {
      d.addEventListener("click", dayIsClicked);
    });

    console.log(availableDays);
  }

  nextButton.addEventListener("click", nextClicked);
  prevButton.addEventListener("click", nextClicked);
}

document.querySelector("#date").addEventListener("click", makeDayClick);

getFormData();
