import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { withTranslation } from "react-i18next";
import { useHistory } from "react-router-dom";
import { UserUtils } from 'utils/UserUtils';
import { v4 as uuidv4 } from "uuid";
import { Spinner } from 'reactstrap'
import { Breadcrumb, Dropdown, Menu } from 'antd';
import { AuthenticationService } from "services/authen/AuthenticationService";
import { Config } from 'constants/Constants';

const DefaultBreadcrumb = (props) => {
    const { t } = props;
    let history = useHistory();

    const [s_breadcrumb, s_setBreadcrumb] = useState(null);

    useEffect(() => {

        let url = new URL(window.location.href);
        let pathName = url.pathname.replace(/\/$/, "");

        //Truy cập màn home
        if (pathName === Config.PUBLIC_URL) {
            s_setBreadcrumb(null);
            return;
        }

        let menuItem = UserUtils.findUserMenuItemLocal({ path: pathName });

        //Check quyền truy cập
        if (menuItem === null) {
            alert(t('common:errors.cantAccessThisPage'));
            AuthenticationService.logout();
        }
        else {
            document.title = menuItem["title"];

            let breadcrumb = genBreadcrumb(menuItem);
            s_setBreadcrumb(breadcrumb);
        }
    }, [props]);

    //#region Method
    const genBreadcrumb = (menuItem) => {
        let lstBreadcrumb = [];

        let item = menuItem;
        while (true) {
            let content = null;
            if (item.type === "sub") {
                content = <BreadcrumbSub key={uuidv4()} menu={item} />
            }
            else {
                content = <BreadcrumbChild key={uuidv4()} menu={item} />
            }

            lstBreadcrumb.unshift(
                <Breadcrumb.Item key={uuidv4()}>
                    {content}
                </Breadcrumb.Item>
            );

            if (item.parent !== "") {
                item = UserUtils.findUserMenuSubLocal({ path: item.parent });
            }
            else {
                break;
            }
        }

        return lstBreadcrumb;
    };

    //#endregion

    return (
        <div className="breadcrumb-style">
            <Breadcrumb>
                <Breadcrumb.Item>
                    <span
                        className="breadcrumbItem"
                        onClick={() => history.push("/")}>
                        <i className="fa-solid fa-house" />
                    </span>
                </Breadcrumb.Item>
                {s_breadcrumb}
            </Breadcrumb>

        </div>
    )
};

const BreadcrumbSub = (props) => {

    //#region init 
    const initContent = <div className="init-content-dropdown-breadcrum-item" key={uuidv4()}>
        <Spinner key={uuidv4()} />
    </div>;
    //#endregion

    const [s_content, s_setContent] = useState(null);
    let history = useHistory();

    //#region Event 
    const onHoverBreadcrumb = () => {
        if (s_content !== null) {
            return;
        }

        let menuData = UserUtils.getUserMenuDataLocal();
        let meunSub = findSubMenu(props.menu, menuData);

        if (meunSub) {
            s_setContent(null);

            let menu = genMenuBreadcrumb(meunSub.children);
            s_setContent(
                <Menu
                    key={uuidv4()}>
                    {menu}
                </Menu>
            );
        }
    };

    //#endregion

    //#region Method
    const findSubMenu = (currentSub, menuData) => {
        let sub = {};

        for (let i = 0; i < menuData.length; i++) {
            const menu = menuData[i];

            if (currentSub.path === menu.path) {
                sub = menu;
                break;
            }
            else if (menu.children) {
                let child = findSubMenu(currentSub, menu.children);
                if (currentSub.path === child.path) {
                    sub = child;
                    break;
                }
            }

        }

        return sub;
    };

    const genMenuBreadcrumb = (menuData) => {
        let menu = [];

        menuData.map((item) => {
            if (item.children) {

                menu.push(
                    <Menu.SubMenu
                        key={item.path}
                        icon={<i key={uuidv4()} className={item.icon} />}
                        title={item.title}
                    >
                        {genMenuBreadcrumb(item.children, false)}
                    </Menu.SubMenu>
                );
            } else {

                menu.push(
                    <Menu.Item
                        key={item.path}
                        icon={<i key={uuidv4()} className={item.icon} />}
                    >
                        <Link to={item["url"] || "/"}>{item.title}</Link>
                    </Menu.Item>
                );
            }
        });

        return menu;
    };
    //#endregion

    return (
        <Dropdown
            overlay={s_content || initContent}
            trigger={["click"]}
            key={uuidv4()}
        >
            <span
                className="ant-dropdown-link breadcrumbItem over-flow-text"
                onMouseMove={onHoverBreadcrumb}
                key={uuidv4()}>
                {props.menu.title}
            </span>
        </Dropdown>
    );
};

const BreadcrumbChild = (props) => {
    return (
        <span className="breadcrumbItem" >{props.menu.title}</span>
    );
};

export default withTranslation(["common"])(DefaultBreadcrumb);