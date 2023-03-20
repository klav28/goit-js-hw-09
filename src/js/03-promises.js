import { Notify } from 'notiflix/build/notiflix-notify-aio';

const refs = {
  formData: document.querySelector(".form"),
};

function createPromise(position, delay) {
  const promise = new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;
    setTimeout(() => {
      if (shouldResolve) {
        resolve(`SUCCESS No ${position} in ${delay} ms`);
      } else {
        reject(`REJECT No ${position} in ${delay} ms`);
      }
    }, delay);
  });
  return promise
    .then((value) => Notify.success(value))
    .catch((error) => Notify.failure(error));
}

function handleSubmit(ev) {
  ev.preventDefault();
  const {
        elements: { delay, step, amount }
    } = ev.currentTarget;
  
  let currentDelay = Number(delay.value);
  
  for (let count = 1; count <= amount.value; count += 1) {
    createPromise(count, currentDelay);
    currentDelay += Number(step.value);
  }
}

// const myPromise = new Promise((resolve, reject) => {
//   setTimeout(() => {
//     const shouldResolve = Math.random() > 0.3;
//     if (shouldResolve) {
//       resolve("Success!!!!");
//     } else {
//       reject("ERROR!!");
//     }
//   }, 1000);
// })

// myPromise.then(value => {
//   console.log(value)
// }).catch(error => {
//   console.log(error)
// });

refs.formData.addEventListener("submit", handleSubmit);
