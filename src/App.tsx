import React, {useState} from 'react';
import './App.css';
import Alert from './components/Alert/Alert';

function App() {
    const [show, setShow] = useState(true);

    return (
        <div className="App">
            <Alert
                show={show}
                onDismiss={setShow}
                type={"success"}
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
    );
}

export default App;
