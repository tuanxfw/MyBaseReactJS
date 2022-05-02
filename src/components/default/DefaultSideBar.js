import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Offcanvas, OffcanvasHeader, OffcanvasBody, Button } from "reactstrap";
import { Menu } from "antd";
import { v4 as uuidv4 } from "uuid";
import { UserUtils } from 'utils/UserUtils';
import store from "redux/store";
import { getStatusSidebar } from "redux/selectors/defaultSidebarSelectors";
import { toggleSideBar } from "redux/actions/defaultSidebarActions";
import { Config } from 'constants/Constants';
import CommonTooltip from "components/CommonTooltip";

const DefaultSideBar = (props) => {
  const dispatch = useDispatch();
  const r_statusSidebar = useSelector(getStatusSidebar);

  const [s_rootSubmenu, s_setRootSubmenu] = useState([]);

  const [s_subSelected, s_setSubSelected] = useState([]);
  const [s_itemSelected, s_setItemSelected] = useState([]);

  const [s_menu, s_setMenu] = useState(null);

  //#region Effect
  useEffect(() => {
    let menuData = UserUtils.getUserMenuDataLocal();
    let menu = genMenu(menuData);
    s_setMenu(menu);
  }, []);

  //#region Event
  const onToggleSidebar = () => {
    dispatch(toggleSideBar(false));
  };

  const onSubMenuClick = (keys) => {
    const latestOpenKey = keys.find((key) => s_subSelected.indexOf(key) === -1);
    if (s_rootSubmenu.indexOf(latestOpenKey) === -1) {
      s_setSubSelected(keys);
    } else {
      s_setSubSelected(latestOpenKey ? [latestOpenKey] : []);
    }
  };

  const onMenuItemClick = ({ key }) => {
    s_setItemSelected([String(key)]);
    onToggleSidebar();
  };
  //#endregion

  //#region Method

  const genMenu = (menuData, isRoot = true) => {
    let menu = [];

    menuData.map((item) => {
      if (item.children) {
        if (isRoot === true && s_rootSubmenu.indexOf(item.path) === -1) {
          s_setRootSubmenu(prevRootSubmenu => [...prevRootSubmenu, item.path]);
        }

        menu.push(
          <Menu.SubMenu
            key={item.path}
            icon={<i key={uuidv4()} className={item.icon} />}
            title={<CommonTooltip
              title={item["title"]}>
              {item["title"]}
            </CommonTooltip>}
          >
            {genMenu(item.children, false)}
          </Menu.SubMenu>
        );
      } else {

        menu.push(
          <Menu.Item
            key={item.path}
            icon={<i key={uuidv4()} className={item.icon} />}
          >
            <CommonTooltip
              title={item["title"]}>
              <Link to={item["path"] || "/"}>{item["title"]}</Link>
            </CommonTooltip>
          </Menu.Item>
        );
      }
    });

    return menu;
  };

  //#endregion

  return (
    <>
      <Offcanvas
        className="sidebar-style"
        style={{
          backgroundImage: `url('${Config.PUBLIC_URL}/images/background.jpg')`,
        }}
        isOpen={r_statusSidebar}
        fade={true}
        scrollable={true}
        backdrop={true}
        direction="start"
        toggle={onToggleSidebar}
      >
        <OffcanvasHeader className="sidebar-header-style">
          <div className="img-field">
            <img alt="" src={`${Config.PUBLIC_URL}/images/logo.png`} />
          </div>
          <Button
            close
            className="button-toggle-sidebar"
            onClick={onToggleSidebar}
          />
        </OffcanvasHeader>
        <OffcanvasBody className="sidebar-body-style">
          <Menu
            mode="inline"
            //mode="vertical" subMenuCloseDelay={0.5}
            style={{ width: "100%" }}
            onOpenChange={onSubMenuClick}
            openKeys={s_subSelected}
            onClick={onMenuItemClick}
            selectedKeys={s_itemSelected}
          >
            {s_menu}
          </Menu>
        </OffcanvasBody>
      </Offcanvas>
    </>
  );
};

export default DefaultSideBar;

export const openSidebar = function () {
  store.dispatch(toggleSideBar(true));
};
