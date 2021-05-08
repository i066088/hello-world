import logo from './logo.svg';
import './App.css';

function accessServiceLayer() {
  fetch("/b1s/v1/BusinessPartners?$select=CardCode, CardName&$top=1")
    .then(res => res.json())
    .then((result) => {
      alert("Response from Service Layer:\n" + JSON.stringify(result));
    }, (error) => {
      alert(error);
    }
  )
}

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        <div>
          <button className="App-button" onClick={accessServiceLayer}>Access ServiceLayer</button>
        </div>
      </header>
    </div>
  );
}

export default App;
