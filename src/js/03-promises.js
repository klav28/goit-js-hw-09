import { Notify } from 'notiflix/build/notiflix-notify-aio';

const refs = {
  formData: document.querySelector(".form"),
};

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;
    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });
}

function handleSubmit(ev) {
  ev.preventDefault();
  const {
        elements: { delay, step, amount }
    } = ev.currentTarget;
  
  let currentDelay = Number(delay.value);
  
  for (let count = 1; count <= amount.value; count += 1) {
    createPromise(count, currentDelay)
      .then(({ position, delay }) => Notify.success(`✅ Fulfilled promise ${position} in ${delay} ms`))
      .catch(({ position, delay }) => Notify.failure(`❌ Rejected promise ${position} in ${delay} ms`));
    currentDelay += Number(step.value);
  }
}

refs.formData.addEventListener("submit", handleSubmit);