import React from "react";
import PropTypes from "prop-types";

const CommonTooltip = ({ title: p_title, ...props }) => {

    const openTooltip = (e) => {
        let content = e.target.innerText;

        if (p_title) {
            content = p_title;
        }

        if (content.trim() === "") return;

        document.getElementById("common-tooltip").innerHTML = content;

        document.getElementById("common-tooltip").style.visibility = "visible";
        document.getElementById("common-tooltip").style.opacity = "1";
        document.getElementById("common-tooltip").style.top = (e.pageY) + "px";
        document.getElementById("common-tooltip").style.left = (e.pageX + 10) + "px";
    }

    const closeTooltip = (e) => {
        document.getElementById("common-tooltip").style.visibility = "hidden";
        document.getElementById("common-tooltip").style.opacity = "0";
    }

    return (
        <div
            onMouseEnter={openTooltip}
            onMouseLeave={closeTooltip}
            {...props} />
    );
}

export default CommonTooltip;

CommonTooltip.propTypes = {
    title: PropTypes.string,
};