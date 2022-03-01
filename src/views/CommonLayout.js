import React from "react";
import DefaultHeader from "components/default/DefaultHeader";
import DefaultBreadcrumb from "components/default/DefaultBreadcrumb";
import DefaultSideBar from "components/default/DefaultSideBar";
import DefaultFooter from "components/default/DefaultFooter";
import CommonRouter from "routes/CommonRouter";

const CommonLayout = (props) => {

  //#region Method
  
  //#endregion

  return (
    <div className="common-layout">
      <DefaultSideBar />
      <DefaultHeader />
      <DefaultBreadcrumb/>
      <div className="body">
        <CommonRouter />
      </div>
      <DefaultFooter />
    </div>
  );
};

export default CommonLayout;
