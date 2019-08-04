import './style_02.css';
export const add = (a, b) => {
  return a + b
}

export const addAfterOneSecond = (a, b) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(add(a, b));
      reject(new Error('Error'));
    }, 1000);
  })
}