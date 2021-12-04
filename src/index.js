import React from 'react';
import ReactDOM from 'react-dom';
import './Styles/index.scss';
import App from './Components/App.jsx';

import firebase from 'firebase/compat/app'
import  'firebase/database'
import 'firebase/compat/auth'
import 'firebase/compat/firestore'

import { applyMiddleware, createStore } from 'redux';
import rootReducer from './Store/Reducers/rootReducer';
import { createFirestoreInstance, getFirestore} from 'redux-firestore';
import { getFirebase } from 'react-redux-firebase'
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';

// Bootstrap styling
import 'bootstrap/dist/css/bootstrap.min.css';
import { ReactReduxFirebaseProvider } from 'react-redux-firebase';

const rrfConfig = {
  userProfile: 'users',
  useFirestoreForProfile: true
}
const firebaseConfig = {
  apiKey: "AIzaSyD56qfU8WTtcpnSarwoDx55oop_Acbg7Ac",
  authDomain: "sep6-123456.firebaseapp.com",
  projectId: "sep6-123456",
  storageBucket: "sep6-123456.appspot.com",
  messagingSenderId: "1053045522173",
  appId: "1:1053045522173:web:505beac44c210cbb50c894",
  measurementId: "G-VSBVEG5YNK"
};

firebase.initializeApp(firebaseConfig);
firebase.firestore();

const store = createStore(rootReducer, {}, applyMiddleware(thunk.withExtraArgument({getFirebase,  getFirestore})));

const rrfProps = {
  firebase,
  config: rrfConfig,
  dispatch: store.dispatch,
  createFirestoreInstance
}

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <ReactReduxFirebaseProvider {...rrfProps}>
        <App />
      </ReactReduxFirebaseProvider>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);