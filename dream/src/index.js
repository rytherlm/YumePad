import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

import { FirebaseAppProvider } from 'reactfire';

const firebaseConfig = JSON.parse(process.env.REACT_APP_FIREBASE_CONFIG);

const root = document.getElementById('root');

ReactDOM.render(
  <FirebaseAppProvider firebaseConfig={firebaseConfig}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </FirebaseAppProvider>,
  root
);

reportWebVitals();
