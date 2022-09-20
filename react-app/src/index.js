import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import './index.css';
import App from './App';
import configureStore from './store';
import { ModalProvider } from './context/Modal';

const store = configureStore();

// added
if (process.env.NODE_ENV !== 'production') {
  // restoreCSRF();
  // window.csrfFetch = csrfFetch;
  window.store = store;
}


ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <ModalProvider>
          <App />
      </ModalProvider>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
