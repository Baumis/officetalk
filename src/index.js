import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import RootStore from './Stores/RootStore'
import { Provider } from 'mobx-react';

export const StoreContext = React.createContext(RootStore);

ReactDOM.render(
  <Provider value={StoreContext}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </Provider>,
  document.getElementById('root')
);