import React, { Suspense, lazy, useState, useEffect } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { withTranslation } from "react-i18next";
import { ConfigProvider } from 'antd';
import { QueryClient, QueryClientProvider } from 'react-query'

import ErrorBoundary from "components/default/ErrorBoundary";
import { Language } from "translation/language"
import { Config } from "constants/Constants";

const Login = lazy(() => import("views/authen/login"));
const CommonLayout = lazy(() => import("views/CommonLayout"));

const PrivateRoute = lazy(() => import("routes/PrivateRoute"));

const MessageBox = lazy(() => import("components/MessageBox"));
const CircleLoading = lazy(() => import("components/CircleLoading"));

const App = (props) => {
  const { i18n } = props;

  const [s_langAntd, s_setLangAntd] = useState(null);

  const queryClient = new QueryClient()

  useEffect(() => {
    let lang = Language.changeLanguage(i18n);
    s_setLangAntd(lang.antd);
  }, [props]);

  return (
    // <ConfigProvider locale={Language.changeLanguage(i18n).antd}>
    <ConfigProvider locale={s_langAntd}>
      <QueryClientProvider client={queryClient}>
        <ErrorBoundary>
          <BrowserRouter basename={Config.PUBLIC_URL}>
            <Suspense fallback="...loading">
              <MessageBox />
              <CircleLoading />
              <Switch>
                <Route path="/login" component={Login} />
                <PrivateRoute path="/" component={CommonLayout} />
              </Switch>
            </Suspense>
          </BrowserRouter>
        </ErrorBoundary>
      </QueryClientProvider>
    </ConfigProvider >
  );
};

export default withTranslation(["common, messageBox"])(App);
