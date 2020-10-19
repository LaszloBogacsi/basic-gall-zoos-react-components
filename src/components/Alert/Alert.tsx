import React, { useState } from 'react';
import styles from './styles.module.css';
import { CSSTransition } from 'react-transition-group';

type AlertType = 'success' | 'failure' | 'info'

interface AlertProps {
    banner: boolean
    cancellable: boolean
    type: AlertType
    delay: number
    title: string
    message: string
    action: () => void
    buttonTitle: string
}

export default (props: AlertProps) => {
    const [show, setShow] = useState(true);

    return (
        <React.Fragment>

            {/* {show ?  */}
            <div className={`${styles[show ? 'show' : 'hide']} ${styles.wrapper} `}>
                <ClosableAlert {...props} setShow={setShow} /> 
            </div>
            {/* : null} */}
        </React.Fragment>
    )
}

interface ClosableAlertProps extends AlertProps {
    setShow: (showing: boolean) => void
}
const ClosableAlert = (props: ClosableAlertProps) => {
    const { setShow, banner, cancellable, type, delay, title, message, action, buttonTitle } = props;
    const close = () => setShow(false);
    const style = `${styles.alert} ${styles[type]} ${banner ? styles.banner : ''}`;
    return (
        <div className={style}>
            <div>
                <div className={styles.alertTitle}>{title}</div>
                <p className={styles.alertMessage}>{message}</p>
            </div>
            <div className={styles.actions}>
                {cancellable ? <div onClick={close}>X</div> : null}
                <button className={styles[type]} onClick={() => action()}>{buttonTitle}</button>
            </div>
        </div>
    )
}