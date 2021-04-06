/// <reference types="react" />
import './Alert.css';
declare type AlertType = 'success' | 'failure' | 'info' | 'warning';
interface AlertProps {
    show: boolean;
    onDismiss: (show: boolean) => void;
    type: AlertType;
    message: string;
    unMountOnExit?: boolean;
    banner?: boolean;
    dismissible?: boolean;
    delay?: number;
    title?: string;
    action?: () => void;
    buttonTitle?: string;
}
declare const _default: (props: AlertProps) => JSX.Element;
export default _default;
