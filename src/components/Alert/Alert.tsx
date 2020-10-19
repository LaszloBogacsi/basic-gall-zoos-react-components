import React, {useEffect, useState} from 'react';
import styles from './styles.module.css';

type AlertType = 'success' | 'failure' | 'info'

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
    const {unMountOnExit, show} = props;
    const shouldUnMountOnExit = unMountOnExit || false;
    const [unmount, setUnmount] = useState(false);

    const onTransitionEnd = (e: any) => {
        console.log(e);
        if (!show && shouldUnMountOnExit) {
            setUnmount(true);
        }
    };

    useEffect(() => {
        setUnmount(false);

    }, [show])
    return (
        <React.Fragment>

             {!unmount ?
            <div onAnimationEnd={(e) => onTransitionEnd(e)} className={`${styles[props.show ? 'show' : 'hide']} `}>
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
    const btnTitle = buttonTitle || "OK";
    const close = () => onDismiss(false);
    if (delay) {
        setTimeout(close, delay)
    }
    const style = `${styles.alert} ${styles[type]} ${banner ? styles.banner : ''} ${dismissible ? styles.dismissible : ''}`;
    return (
        <div className={style}>
            <div>
                {title ? <div className={styles.alertTitle}>{title}</div> : null}
                <p className={styles.alertMessage}>{message}</p>
            </div>
            <div className={styles.actions}>
                {dismissible ? <div className={styles.dismiss} onClick={close}>+</div> : null}
                {action ? <button className={styles[type]} onClick={() => action()}>{btnTitle}</button> : null}
            </div>
        </div>
    )
}