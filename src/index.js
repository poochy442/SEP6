import React from 'react';
import ReactDOM from 'react-dom';
import './Styles/index.scss';
import App from './Components/App.jsx';
import { applyMiddleware, compose, createStore } from 'redux';
import rootReducer from './Store/Reducers/rootReducer';
import { reduxFirestore, getFirestore } from 'redux-firestore';
import thunk from 'redux-thunk';
import fbConfig from './Config/fbConfig'
import { Provider } from 'react-redux';

// Bootstrap styling
import 'bootstrap/dist/css/bootstrap.min.css';

const store = createStore(rootReducer,
  compose(
    applyMiddleware(thunk.withExtraArgument({getFirestore})),
    reduxFirestore(fbConfig) // redux bindings for firestore
  )
);

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);