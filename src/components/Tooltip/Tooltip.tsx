import React, {ReactNode, useState} from "react";

interface TooltipProps {
    content: string
    children: ReactNode;
}

export default (props: TooltipProps) => {
    const {content, children} = props;
    const [isVisible, setIsVisible] = useState(false);

    return (
        <div>
            {isVisible && <div onMouseLeave={() => setIsVisible(false)}>
                {content}
            </div>
            }
            <div onMouseEnter={() => setIsVisible(true)}>
                {children}
            </div>
        </div>
    )
}