import React, { useState, useEffect } from "react";
import {Row, Col} from "reactstrap";
import useDeepCompareEffect from 'hooks/useDeepCompareEffect';
import {withTranslation} from "react-i18next";

const Home = (props) => {
  const {t} = props;

  const [s_data, s_setData] = useState([<button/>, <button/>]);

  useEffect(() => {
    console.log("s_data change useEffect");
  }, [s_data]);

  useDeepCompareEffect(() => {
    console.log("s_data change useDeepCompareEffect");
  }, [s_data]);

  const onClickButton = () => {
    s_setData([<button/>, <button/>]);
  };

  return (
    <div style={{
      backgroundImage: "linear-gradient(90deg, #f7fcf0, #e5f5df, #d4eece, #bde5bf, #9fd9bb, #7bcbc4, #58b7cd, #399cc6, #1e7eb7, #0b60a1, #0b60a1)", 
      height: "100vh"}}>

        <button onClick={onClickButton}>test</button>
    </div>
  );
};


export default withTranslation(["home", "common"])(Home);
