import React, { useState, useEffect } from "react";
import { Row, Col, Form, InputGroup, InputGroupText, Input, Button } from "reactstrap";
import { withTranslation } from "react-i18next";
import { useHistory } from "react-router-dom";
import { UserUtils } from 'utils/UserUtils';
import { AuthenUtils } from 'utils/AuthenUtils';
import { AuthenticationService } from "services/authen/AuthenticationService";
import {App as AppConstant, Services as ServicesConstant} from "constants/Constants"
import { showError } from "components/MessageBox";
//import CommonValidTooltip from 'components/CommonValidTooltip';

const Login = (props) => {
  const { t } = props;
  let history = useHistory();

  let refForm = React.createRef();

  //#region Event

  const onLogin = async () => {

    

    let form = refForm.current;
    let username = form['inputUsername'].value.trim();
    let password = form['inputPassword'].value.trim();

    if (username === "" || password === "") {
      showError(t('login:errors.usernameOrPasswordIsNull'));
      return;
    }

    let isLoginSuccess = await login(username, password);

    if (isLoginSuccess) {
      history.push("/");
    }
  };

  //#endregion

  //#region Method
  const login = async (username, password) => {
    let isLoginSuccess = false;

    try {
      const result = await AuthenticationService.login(
        {
          appCode: AppConstant.CODE,
          username: username,
          password: password,
        }
      );

      if (result.messageCode === ServicesConstant.RESPONSE_CODE.SUCCESS) {
        isLoginSuccess = true;

        UserUtils.setUserInfoLocal(result.payload.userInfo);
        AuthenUtils.setUserTokenLocal(result.payload.token);

        let menuData = await getMenu(username);
        UserUtils.setUserMenuDataLocal(menuData);
      }
      else {
        showError(result.message);
      }
      
    } 
    catch (error) {
      console.log(error);
      showError(t('common:errors.exception'));
    }

    return isLoginSuccess;
  };

  const getMenu = async (username) => {
    let menuData = [];

    try {
      const result = await AuthenticationService.getMenu(username);

      if (result.messageCode === ServicesConstant.RESPONSE_CODE.SUCCESS) {
        menuData = result.payload;

        let menuDataSplit = splitMenuData(menuData);
        UserUtils.setUserMenuSubLocal(menuDataSplit.subs);
        UserUtils.setUserMenuItemLocal(menuDataSplit.items);
      }
    } catch (error) {
      menuData = [];

      console.log(error);
      showError(t('common:errors.exception'));
    }

    return menuData;
  };

  const splitMenuData = (menuData, parent = "") => {
    let subs =  [];
    let items =  [];

    menuData.map((menu) => {
      if (menu.children) {
        let sub = {...menu};
        sub.parent = parent;
        sub.type = "sub";
        delete sub.children;
        
        subs.push(sub);

        let resultSplit = splitMenuData(menu.children, menu.path);
        subs = subs.concat(resultSplit.subs);
        items = items.concat(resultSplit.items);
      }
      else {
        let item = {...menu};
        item.parent = parent;
        item.type = "item";

        items.push(item);
      }
    });

    return {
      subs: subs,
      items: items
    };
  };
  //#region 

  return (
    <Form 
    innerRef={refForm}
    noValidate='novalidate'
    onSubmit={(e) => e.preventDefault()}>
      <Row className="login-layout"
        style={{ backgroundImage: `url('${process.env.PUBLIC_URL}/images/background.jpg')` }}>
        <Col {...{ xxl: 9, xl: 9, lg: 9, md: 8, sm: 6, xs: 0 }}
          className="login-left-layout" />

        <Col {...{ xxl: 3, xl: 3, lg: 3, md: 4, sm: 6, xs: 12 }}
          className="login-right-layout">
          <Row>
            {/* <Col md={12} style={{height: "20vh"}}/> */}
            <Col md={12} className="login-title">
              <div style={{ backgroundImage: `url('${process.env.PUBLIC_URL}/images/logo.png')` }} />
              <h4>{t('common:app:appName')}</h4>
            </Col>
            <Col md={12} style={{ padding: "20px 30px 0px 30px" }}>
              <InputGroup>
                <InputGroupText>
                  <i className="fas fa-user" />
                </InputGroupText>
                <Input
                id={"inputUsername"}
                placeholder={t('login:username')} />
              </InputGroup>
            </Col>
            <Col md={12} style={{ padding: "20px 30px 20px 30px" }}>
              <InputGroup>
                <InputGroupText>
                  <i className="fas fa-key" />
                </InputGroupText>
                <Input type="password" id="inputPassword" placeholder={t('login:password')} />
              </InputGroup>
            </Col>
            <Col md={12} className="login-group-button">
              <Button color="primary" onClick={onLogin}>{t('login:login')}</Button>
            </Col>
            <Col md={12} className="login-group-advanced">
              <a href="/" target="_self">{t('login:forgotPassword')}</a>
              {/* <a href="/" target="_self">{t('login:register')}</a> */}
            </Col>
          </Row>
        </Col>
      </Row>
    </Form>
  );
};


export default withTranslation(["login", "common"])(Login);
