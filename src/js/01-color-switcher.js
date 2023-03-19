let timerId = null;

const refs = {
    btnStart: document.querySelector("[data-start]"),
    btnStop: document.querySelector("[data-stop]"),
}

function btnSwitchState (buttonEnabled, buttonDisabled) {
    buttonEnabled.removeAttribute("disabled");
    buttonDisabled.setAttribute("disabled", "disabled");
}

function handleStart () {
    btnSwitchState(refs.btnStop, refs.btnStart);
    timerId = setInterval(() => {
        document.body.style.backgroundColor = getRandomHexColor();
    }, 1000);
}

function handleStop () {
    clearInterval(timerId);
    btnSwitchState(refs.btnStart, refs.btnStop);
}

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, 0)}`;
}

btnSwitchState(refs.btnStart, refs.btnStop);

refs.btnStart.addEventListener("click", handleStart);
refs.btnStop.addEventListener("click", handleStop);

