import './style.css';
import './test.scss';
import Icon from './asset/iu.jpg';
import {add, addAfterOneSecond} from './add.js';
import {multiply} from './multiply.js';

const component = (func) => {
  const element = document.createElement('div');
  element.innerHTML = `value = ${func(1, 2)}`;
  element.classList.add('hello');
  const myIcon = new Image();
  myIcon.src = Icon;
  element.appendChild(myIcon);
  return element;
}

document.body.appendChild(component(add));
document.body.appendChild(component(multiply));

addAfterOneSecond(2, 3)
  .then((result) => console.log(result))
  .catch(error => console.error(error));