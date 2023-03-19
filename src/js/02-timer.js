import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const refs = {
    btnStart: document.querySelector("[data-start]"),
    fieldDays: document.querySelector("[data-days]"),
    fieldHours: document.querySelector("[data-hours]"),
    fieldMinutes: document.querySelector("[data-minutes]"),
    fieldSeconds: document.querySelector("[data-seconds]"),
    dateTime: document.querySelector("#datetime-picker")
}

let selectedDateValue;
let timerId = null;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
    onClose(selectedDates) {
        selectedDateValue = selectedDates[0].valueOf();
        if (selectedDateValue <= new Date().valueOf()) {
            Notify.failure('Please choose a date in the future');
            changeInputState(refs.btnStart, "disable");
            return;
        };
        changeInputState(refs.btnStart, "enable");
  },
};

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

function handleStart() {
    changeInputState(refs.btnStart, "disable");
    changeInputState(refs.dateTime, "disable");
    showTime();
    timerId = setInterval(showTime, 1000);
}

function addLeadingZero(val) {
    return String(val).padStart(2, "0");
}

function showTime() {
    const timerValue = selectedDateValue - new Date().valueOf();
    if (timerValue > 0) {
        const time = convertMs(timerValue);
        refs.fieldDays.textContent = addLeadingZero(time.days);
        refs.fieldHours.textContent = addLeadingZero(time.hours);
        refs.fieldMinutes.textContent = addLeadingZero(time.minutes);
        refs.fieldSeconds.textContent = addLeadingZero(time.seconds);
    } else {
        clearInterval(timerId);
        changeInputState(refs.btnStart, "enable");
        changeInputState(refs.dateTime, "enable");
        Notify.success('Countdown finished');
    }
}

function changeInputState(fieldname, state) {
    if (state === "enable") {
        fieldname.removeAttribute("disabled");
    } else {
        fieldname.setAttribute("disabled", "disabled");
    }
}

flatpickr(refs.dateTime, options);

refs.btnStart.addEventListener("click", handleStart);
changeInputState(refs.btnStart, "disable");
