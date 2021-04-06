import React, {useEffect, useState} from 'react';
import './Alert.css'
type AlertType = 'success' | 'failure' | 'info' | 'warning';

interface AlertProps {
    show: boolean
    onDismiss: (show: boolean) => void
    type: AlertType
    message: string
    unMountOnExit?: boolean
    banner?: boolean
    dismissible?: boolean
    delay?: number
    title?: string
    action?: () => void
    buttonTitle?: string
}

export default (props: AlertProps) => {
    const {unMountOnExit, show, banner} = props;
    const shouldUnMountOnExit = unMountOnExit || false;
    const [unmount, setUnmount] = useState(false);

    const onTransitionEnd = (e: any) => {
            if (!show && shouldUnMountOnExit) setUnmount(true)
    };

    useEffect(() => {
        setUnmount(false);
    }, [show])
    return (
        <React.Fragment>
             {!unmount ?
            <div onAnimationEnd={(e) => onTransitionEnd(e)} className={`${props.show ? 'show' : 'hide'} ${banner ? 'float' : ''}`}>
                <ClosableAlert {...props} />
            </div>
             : null}
        </React.Fragment>
    )
}

interface ClosableAlertProps extends AlertProps {

}
const ClosableAlert = (props: ClosableAlertProps) => {
    const { onDismiss, banner, dismissible, type, delay, title, message, action, buttonTitle } = props;
    const [timeoutId, setTimeoutId] = useState<NodeJS.Timeout>();
    const btnTitle = buttonTitle || "OK";
    const close = () => {
        if (timeoutId) clearTimeout(timeoutId);
        onDismiss(false);
    }

    useEffect(() => {
        if (delay) {
            setTimeoutId(setTimeout(close, delay));
        }
    }, [])
    const style = `alert ${type} ${banner ? 'banner' : ''} ${dismissible ? 'dismissible' : ''}`;
    return (
        <div className={style}>
            <div>
                {title ? <div className={"alertTitle"}>{title}</div> : null}
                <p className={"alertMessage"}>{message}</p>
            </div>
            <div className={"actions"}>
                {dismissible ? <div className={"dismiss"} onClick={close}>+</div> : null}
                {action ? <button className={`${type}`} onClick={() => action()}>{btnTitle}</button> : null}
            </div>
        </div>
    )
}