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

    </div>
  );
}

export default App;