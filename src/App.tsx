import React, {ReactComponentElement, ReactNode, useState} from 'react';
import './App.css';
import Tooltip from "./components/Tooltip/Tooltip";
import Alert from "./components/Alert/Alert";

function App() {
    const [show, setShow] = useState(false);
    const MyGreatToolTip = ({children, content}: { children?: ReactNode, content?: { content?: string } }) => <Tooltip {...{content: "Content from definition"}} {...content}>{children}</Tooltip>
    return (
        <div className="App">
            <div>
                <Alert
                    show={show}
                    onDismiss={setShow}
                    type={"warning"}
                    message={"This is the main message"}
                    banner
                    unMountOnExit
                    dismissible
                    // delay={5000}
                    title={"Title"}
                    action={() => console.log("clicked!")}
                    buttonTitle={"Retry"}
                />
                <button onClick={() => setShow(!show)}>{show ? "Close" : "Open"}</button>
            </div>

            <div>
                <SomeComp MyTooltip={MyGreatToolTip}/>
                <p>
                    <MyGreatToolTip>Inside Tooltip, with default content</MyGreatToolTip>
                </p>
                <p>
                    <MyGreatToolTip content={{content: undefined}}>Inside Tooltip, with undefined tooltip</MyGreatToolTip>
                </p>
                <p>
                    <Tooltip content={"Normal use"}>Normal Children</Tooltip>
                </p>
            </div>
        </div>
    );
}

interface SomeCompProps {
    MyTooltip: (props: { children: ReactNode, content?: { content?: string } }) => JSX.Element;
}

const SomeComp = (props: SomeCompProps) => {
    const {MyTooltip} = props;
    const content = {content: "Tooltip content from point of use"}
    return (<div>
        <MyTooltip content={content}><p>Children</p></MyTooltip>
    </div>)
}

export default App;
