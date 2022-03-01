import React, { Suspense, lazy, useState, useEffect } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { withTranslation } from "react-i18next";
import { ConfigProvider } from 'antd';

import ErrorBoundary from "components/default/ErrorBoundary";
import { Language } from "translation/language"


const Login = lazy(() => import("views/authen/login"));
const CommonLayout = lazy(() => import("views/CommonLayout"));

const PrivateRoute = lazy(() => import("routes/PrivateRoute"));

const MessageBox = lazy(() => import("components/MessageBox"));
const Dialog = lazy(() => import("components/Dialog"));
const CircleLoading = lazy(() => import("components/CircleLoading"));

const App = (props) => {
  const { i18n } = props;

  const [s_langAntd, s_setLangAntd] = useState(null);

  useEffect(() => {
    let lang = Language.changeLanguage(i18n);
    s_setLangAntd(lang.antd);
  }, [props]);

  return (
    // <ConfigProvider locale={Language.changeLanguage(i18n).antd}>
    <ConfigProvider locale={s_langAntd}>
      <ErrorBoundary>
        <BrowserRouter basename={process.env.PUBLIC_URL}>
          <Suspense fallback="...loading">
            <MessageBox />
            <Dialog />
            <CircleLoading />
            <Switch>
            <Route path="/login" component={Login} />
            <PrivateRoute path="/" component={CommonLayout} />
          </Switch>
          </Suspense>
        </BrowserRouter>
      </ErrorBoundary>
    </ConfigProvider >
  );
};

export default withTranslation(["common"])(App);
