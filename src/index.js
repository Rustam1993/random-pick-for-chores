import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Roulette from './Roulette';
import registerServiceWorker from './registerServiceWorker';
import App from './app'
const handleOnComplete = (value) => {
  console.log(value);
};

const options = [

];






ReactDOM.render(
  <div>
    <App />
  </div>,
 document.getElementById('root'));
registerServiceWorker();
