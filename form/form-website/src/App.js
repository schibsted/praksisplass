import './App.css';

function App() {
  return (
    <div className="App">
      <h1>Søknad</h1>
      <form id='applicationForm'>
        <label>Fornavn:</label>
        <input type="text" placeholder='Fornavn'></input>
        <label>Etternavn:</label>
        <input type="text" placeholder='Etternavn'></input>
        <label>E-post:</label>
        <input type="text" placeholder='E-post'></input>
        <label>Telefonnummer:</label>
        <input type="text" placeholder='Tlf'></input>
        <label>Skole:</label>
        <input type="text" placeholder='Skole'></input>
        <input type="submit"></input>
      </form>
    </div>
  );
}

export default App;
