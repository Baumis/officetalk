import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import rootStore from './Stores/RootStore'

export const rootstore = new rootStore()

ReactDOM.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>,
  document.getElementById('root')
);