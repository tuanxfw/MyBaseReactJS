import React, { useState } from "react";
import { withTranslation } from "react-i18next";
import { v4 as uuidv4 } from 'uuid';
import {
  Navbar,
  NavbarBrand,
  NavbarToggler,
  Collapse,
  Nav,
  DropdownToggle,
  DropdownMenu,
  Dropdown,
  Button,
} from "reactstrap";
import { Menu } from "antd";
import { openSidebar } from "components/default/DefaultSideBar"
import { showError } from "components/MessageBox"
import { AuthenticationService } from "services/authen/AuthenticationService";
//import { Language } from "translation/language"

const DefaultHeader = (props) => {

  const [s_openDropdown, s_setOpenDropdown] = useState(false);
  const [s_openCollapse, s_setOpenCollapse] = useState(false);

  const { t } = props;

  //#region useEffect

  //#endregion

  //#region Event
  const onClickItem = function (e, menuItem) {
    let which = e.nativeEvent.which;
    if (which !== 1) {
      return;
    }

    menuItem.command();
    
  };
  //#endregion

  //#region Method

  const genActionOptions = () => {
    let options = [
      {
        name: "changePassword",
        type: "action",
        title: t("defaultHeader:optionsDropdown.changePassword"),
        icon: <i key="icoChangePassword" className="fas fa-key" />,
        command: ()=>{},
      },
      {
        name: "logout",
        type: "action",
        title: t("defaultHeader:optionsDropdown.logout"),
        icon: <i key="icoLogout" className="fas fa-power-off" />,
        command: logout,
      },
    ];

    let menuElement = options.map((item) => {
      return (
        <Menu.Item
          onPointerDown={(e) => onClickItem(e, item)}
          key={uuidv4()}
          icon={item.icon}
        >
          {item.title}
        </Menu.Item>
      );
    });
    return menuElement;
  };

  const logout = () => {
    try {
      AuthenticationService.logout();
    }
    catch (error) {
      console.log(error);
      showError(t('common:errors.exception'));
    }
  };

  //#endregion

  return (
    <div className="navbar-style">
      <Navbar id="defaultNavbar" expand="md">
        <NavbarBrand>
          <Button outline onClick={() => openSidebar()}>
            <i className="fas fa-bars" />
          </Button>
        </NavbarBrand>
        <NavbarBrand>
          {/* <img alt="" src={`${process.env.PUBLIC_URL}/images/logo.png`} /> */}
          <span>Base</span>
        </NavbarBrand>
        <NavbarToggler onClick={() => s_setOpenCollapse(!s_openCollapse)}>
          <i className="fas fa-ellipsis-v" />
        </NavbarToggler>
        <Collapse navbar isOpen={s_openCollapse}>
          <Nav className="me-auto" navbar></Nav>
          <Dropdown
            isOpen={s_openDropdown}
            toggle={() => s_setOpenDropdown(!s_openDropdown)}
          >
            <DropdownToggle caret nav>
              <i className="fas fa-user" />
              <span>Username</span>
            </DropdownToggle>
            <DropdownMenu>
              <div>
                <Menu mode="vertical">
                  {genActionOptions()}
                </Menu>
              </div>
            </DropdownMenu>
          </Dropdown>
        </Collapse>
      </Navbar>
    </div>
  );
};

export default withTranslation(["defaultHeader", "common"])(DefaultHeader);
