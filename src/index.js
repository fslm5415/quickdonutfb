import React           from 'react';
import ReactDOM        from 'react-dom';
import { Provider }    from "react-redux";
import firebase        from "firebase/app";
import                      'firebase/firestore';
import App             from './App';
import reportWebVitals from './reportWebVitals';
import store           from "./store/index";
import                      './index.css';

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey           : "AIzaSyD_BdPqp8QLDE05d4tCrIaeaNeBiH-6pOs",
  authDomain       : "quickdonutfb.firebaseapp.com",
  projectId        : "quickdonutfb",
  storageBucket    : "quickdonutfb.appspot.com",
  messagingSenderId: "510153669984",
  appId            : "1:510153669984:web:6868d896e62d34fef07205",
  measurementId    : "G-2E8CKB9B4Y"
};
firebase.initializeApp(firebaseConfig);

window.store = store;

ReactDOM.render(
  <Provider store={ store }>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </Provider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
