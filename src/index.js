import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'antd/dist/antd.css';
import "@fortawesome/fontawesome-free/css/all.min.css";
import './style/main.scss';
import { I18nextProvider } from 'react-i18next';
import i18n from './translation/i18n';
import { Provider } from 'react-redux';
import store from './redux/store';

import App from './App';

ReactDOM.render(
  <Provider store={store}>
    <I18nextProvider i18n={i18n}>
      <App />
    </I18nextProvider>
  </Provider>
  ,
  document.getElementById('root')
);

