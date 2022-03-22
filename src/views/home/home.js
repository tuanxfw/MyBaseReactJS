import React, { useState, useEffect } from "react";
import {Row, Col} from "reactstrap";
import {withTranslation} from "react-i18next";

const Home = (props) => {
  const {t} = props;

  return (
    <div style={{
      backgroundImage: "linear-gradient(90deg, #f7fcf0, #e5f5df, #d4eece, #bde5bf, #9fd9bb, #7bcbc4, #58b7cd, #399cc6, #1e7eb7, #0b60a1, #0b60a1)", 
      height: "100vh"}}>
    </div>
  );
};


export default withTranslation(["home", "common"])(Home);
