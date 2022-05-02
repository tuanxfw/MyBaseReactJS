import React from "react";
import store from "redux/store";
import { useSelector } from "react-redux";
import { Modal } from "reactstrap";
import {
  getStatusCircleLoading,
} from "redux/selectors/circleLoadingSelectors";
import {
  toggleCircleLoading,
} from "redux/actions/circleLoadingActions";

const CircleLoading = (props) => {
  const r_statusCircleLoading = useSelector(getStatusCircleLoading);

  return (
    <>
      <Modal
        className="circle-loading"
        autoFocus={false}
        backdrop={true}
        scrollable={false}
        fullscreen={true}
        zIndex={3000}
        isOpen={r_statusCircleLoading}
      >
        <div className="dashed-loading"/>
      </Modal>
    </>
  );
};

export default CircleLoading;

export const showCircleLoading = () => {
  store.dispatch(toggleCircleLoading(true));
};

export const closeCircleLoading = () => {
  store.dispatch(toggleCircleLoading(false));
};
