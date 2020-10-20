import React, { useEffect, useState } from 'react';
import './Alert.css';
export default (props) => {
    const { unMountOnExit, show, banner } = props;
    const shouldUnMountOnExit = unMountOnExit || false;
    const [unmount, setUnmount] = useState(false);
    const onTransitionEnd = (e) => {
        console.log(e);
        if (!show && shouldUnMountOnExit) {
            setUnmount(true);
        }
    };
    useEffect(() => {
        setUnmount(false);
    }, [show]);
    return (React.createElement(React.Fragment, null, !unmount ?
        React.createElement("div", { onAnimationEnd: (e) => onTransitionEnd(e), className: `${props.show ? 'show' : 'hide'} ${banner ? 'float' : ''}` },
            React.createElement(ClosableAlert, Object.assign({}, props)))
        : null));
};
const ClosableAlert = (props) => {
    const { onDismiss, banner, dismissible, type, delay, title, message, action, buttonTitle } = props;
    const btnTitle = buttonTitle || "OK";
    const close = () => onDismiss(false);
    if (delay) {
        setTimeout(close, delay);
    }
    const style = `alert ${type} ${banner ? 'banner' : ''} ${dismissible ? 'dismissible' : ''}`;
    return (React.createElement("div", { className: style },
        React.createElement("div", null,
            title ? React.createElement("div", { className: "alertTitle" }, title) : null,
            React.createElement("p", { className: "alertMessage" }, message)),
        React.createElement("div", { className: "actions" },
            dismissible ? React.createElement("div", { className: "dismiss", onClick: close }, "+") : null,
            action ? React.createElement("button", { className: `${type}`, onClick: () => action() }, btnTitle) : null)));
};
