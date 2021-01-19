import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import OfficeStore from './Stores/OfficeStore'
import UserStore from './Stores/UserStore'

export const StoreContext = React.createContext();

ReactDOM.render(
  <StoreContext.Provider value={{ OfficeStore, UserStore }}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </StoreContext.Provider>,
  document.getElementById('root')
);