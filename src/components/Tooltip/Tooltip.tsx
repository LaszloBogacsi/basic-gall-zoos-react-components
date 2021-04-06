import React, {ReactNode, useState} from "react";
import styles from './styles.module.css'
interface TooltipProps {
    content?: string
    children: ReactNode;
}

export default (props: TooltipProps) => {
    const {content, children} = props;
    const [isVisible, setIsVisible] = useState(false);

    return (
        <div className={styles.tooltip} onMouseLeave={() => setIsVisible(false)}>
            {isVisible && content && <div className={`${styles.tooltipLeft} ${ styles.tooltipBubble}`} >
                <div className={styles.tooltipMessage}>
                    {content}
                </div>
            </div>
            }
            <div onMouseOver={() => setIsVisible(true)}>
                {children}
            </div>
        </div>
    )
}