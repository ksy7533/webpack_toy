import './style.css';
import './test.scss';
import Icon from './asset/iu.jpg';
import add from './add.js';

function component() {
  const element = document.createElement('div');
  
  const sum = add(1, 2);
  element.innerHTML = '!!!!!! Hello Webpack!!  '+ sum;
  element.classList.add('hello');

  const myIcon = new Image();
  
  myIcon.src = Icon;
  element.appendChild(myIcon);

  return element;
}

document.body.appendChild(component());