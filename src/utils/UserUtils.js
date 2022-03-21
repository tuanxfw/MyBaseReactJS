import { Config } from "constants/Constants";

const find = require('lodash/find');

export const UserUtils = {
    setUserInfoLocal,
    getUserInfoLocal,

    setUserMenuDataLocal,
    getUserMenuDataLocal,

    setUserMenuSubLocal,
    getAllUserMenuSubLocal,
    findUserMenuSubLocal,

    setUserMenuItemLocal,
    getAllUserMenuItemLocal,
    findUserMenuItemLocal,
};

function setUserInfoLocal (info) {
    let localStorageData = JSON.parse(localStorage.getItem(Config.CODE) || "{}");
    localStorageData.userInfo = info;

    localStorage.setItem(Config.CODE, JSON.stringify(localStorageData));
};

function getUserInfoLocal () {
    let localStorageData = JSON.parse(localStorage.getItem(Config.CODE) || "{}");

    return localStorageData.userInfo || {};
};

function setUserMenuDataLocal (menuData) {
    let localStorageData = JSON.parse(localStorage.getItem(Config.CODE) || "{}");
    localStorageData.menuData = menuData;

    localStorage.setItem(Config.CODE, JSON.stringify(localStorageData));
};

function getUserMenuDataLocal () {
    let localStorageData = JSON.parse(localStorage.getItem(Config.CODE) || "{}");

    return localStorageData.menuData || [];
};

function setUserMenuSubLocal (subs) {
    let localStorageData = JSON.parse(localStorage.getItem(Config.CODE) || "{}");
    localStorageData.menuSubs = subs;

    localStorage.setItem(Config.CODE, JSON.stringify(localStorageData));
};

function getAllUserMenuSubLocal () {
    let localStorageData = JSON.parse(localStorage.getItem(Config.CODE) || "{}");

    return localStorageData.menuSubs || [];
};

function findUserMenuSubLocal (objCondition) {
    let sub = getAllUserMenuSubLocal();

    return find(sub, objCondition) || null;
};

function setUserMenuItemLocal (items) {
    let localStorageData = JSON.parse(localStorage.getItem(Config.CODE) || "{}");
    localStorageData.menuItems = items;

    localStorage.setItem(Config.CODE, JSON.stringify(localStorageData));
};

function getAllUserMenuItemLocal () {
    let localStorageData = JSON.parse(localStorage.getItem(Config.CODE) || "{}");
    return localStorageData.menuItems || [];
};

function findUserMenuItemLocal (objCondition) {
    let menu = getAllUserMenuItemLocal();

    return find(menu, objCondition) || null;
};

