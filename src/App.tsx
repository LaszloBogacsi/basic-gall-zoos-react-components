import React from 'react';
import logo from './logo.svg';
import './App.css';
import Alert from './components/Alert/Alert';

function App() {
  return (
    <div className="App">
      <Alert 
      banner
      type = {"success"}
      cancellable
      delay={2000}
      title={"Title"}
      message={"This is the main message"}
      action ={() => console.log("clicked!")}
      buttonTitle={"Retry"}/>
    </div>
  );
}

export default App;
