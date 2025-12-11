import React from "react";
import MapComponent from "./MapComponent";

function App() {
  return (
    <div className="app-container">
      <header className="header">
        <h1>Micro-Climate Felt Heat Map</h1>
        <p>Click on the map to check perceived heat at a location</p>
      </header>

      <main className="main">
        <MapComponent />
      </main>

      <footer className="footer">
        <small>Demo app - replace API key and extend model for production</small>
      </footer>
    </div>
  );
}

export default App;
