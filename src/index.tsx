import React from 'react';
import ReactDOM from 'react-dom';
import store, { AppStateType } from './redux/redux-store';
import reportWebVitals from './reportWebVitals';
import App from './App';
import './index.css';

let rerenderEntireTree = (state: AppStateType) => {
  ReactDOM.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>,
    document.getElementById('root')
  );
};

rerenderEntireTree(store.getState());

store.subscribe(() => {
  let state = store.getState();
  rerenderEntireTree(state);
});

reportWebVitals();
