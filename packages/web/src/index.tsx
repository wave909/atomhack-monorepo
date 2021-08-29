import React from 'react';
import ReactDOM from 'react-dom'
import App from "./app";
import Modal from 'react-modal';

require("dotenv").config()

Modal.setAppElement('#root');

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root'),
)
