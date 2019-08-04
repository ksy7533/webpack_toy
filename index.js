import './style.css';
import './test.scss';
import Icon from './asset/iu.jpg';
import {add} from './add.js';
import {multiply} from './multiply.js';

const component = (func) => {
  const element = document.createElement('div');
  console.log(func)
  
  element.innerHTML = `value = ${func(1, 2)}`;
  element.classList.add('hello');

  const myIcon = new Image();
  
  myIcon.src = Icon;
  element.appendChild(myIcon);

  return element;
}

document.body.appendChild(component(add));
document.body.appendChild(component(multiply));