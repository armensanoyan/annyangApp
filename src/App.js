import './App.css';
import annyang from  'annyang'

function App() {
  annyang.start({autoReset: false})
  console.log(annyang)
  annyang.addCallback('result', function(phrases) {
    console.log('Speech recognized. Possible sentences said:');
    console.log(phrases);
  });
  return (
    <div className="App">
      <header className="App-header">
        <h1> Welcome </h1>
      </header>
    </div>
  );
}

export default App;
