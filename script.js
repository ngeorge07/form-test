let today = new Date();
let lastDay = new Date();

const dd = String(today.getDate()).padStart(2, "0");
const mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
const yyyy = today.getFullYear();

const mmLast = String(today.getMonth() + 2).padStart(2, "0");

today = `${dd}-${mm}-${yyyy}`;
lastDay = `${dd}-${mmLast}-${yyyy}`;

const elem = document.getElementById("date");
const datepicker = new Datepicker(elem, {
  buttonClass: "btn",
  minDate: today,
  maxDate: lastDay,
  daysOfWeekDisabled: [0, 6],
  format: "dd/mm/yyyy",
  autohide: true,
});
