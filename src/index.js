import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import registerServiceWorker from './registerServiceWorker';
import App from './app'

ReactDOM.render(
  <div>
    <App />
  </div>,
 document.getElementById('root'));
registerServiceWorker();
