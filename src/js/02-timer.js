import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import { Report } from 'notiflix/build/notiflix-report-aio';

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
  onClose: getTimer,
};

function getTimer (selectedDates) {
        selectedDateValue = selectedDates[0].valueOf();
        if (selectedDateValue <= Date.now()) {
            Report.failure('Selected Past Time', 'Please choose a date in the future', 'Close');
            changeInputState(refs.btnStart, "disable");
            return;
        };
        changeInputState(refs.btnStart, "enable");
  }

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
    if (selectedDateValue <= Date.now()) {
        Report.warning('No more time to Countdown', 'Please again choose a date in the future', 'Close');
        return;
    };    
    changeInputState(refs.btnStart, "disable");
    changeInputState(refs.dateTime, "disable");    
    showTime();
    timerId = setInterval(showTime, 1000);
}

function addLeadingZero(val) {
    return String(val).padStart(2, "0");
}

function showTime() {
    const timerValue = selectedDateValue - Date.now();
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
        Report.success('Countdown finished', 'Have a Nice Day', 'Thanks');
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
