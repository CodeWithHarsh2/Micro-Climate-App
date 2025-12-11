import React, { useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMapEvents, CircleMarker } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { fetchFeltHeat } from "./api";
import FeedbackForm from "./FeedbackForm";

function ClickHandler({ onClick }) {
  useMapEvents({
    click(e) {
      onClick(e.latlng);
    }
  });
  return null;
}

export default function MapComponent() {
  const [selected, setSelected] = useState(null); // {lat, lng, data}
  const [markers, setMarkers] = useState([]);

  async function handleMapClick(latlng) {
    const lat = latlng.lat;
    const lon = latlng.lng;
    try {
      const res = await fetchFeltHeat(lat, lon);
      const item = { id: Date.now(), lat, lon, data: res };
      setSelected(item);
      setMarkers(prev => [item, ...prev].slice(0, 20));
    } catch (err) {
      alert("Failed to fetch felt heat. Make sure backend is running and API key is valid.");
      console.error(err);
    }
  }

  return (
    <div style={{ display: "flex", flex: 1 }}>
      <div className="map-column" style={{ flex: 2 }}>
        <MapContainer center={[28.6, 77.2]} zoom={12} style={{ height: "80vh" }}>
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          <ClickHandler onClick={handleMapClick} />

          {markers.map(m => (
            <CircleMarker key={m.id} center={[m.lat, m.lon]} radius={8} fillOpacity={0.8}>
              <Popup>
                <div>
                  <strong>Felt heat: {m.data.felt_heat_score.toFixed(2)}</strong>
                  <div>Temp: {m.data.temperature} C</div>
                  <div>Humidity: {m.data.humidity} %</div>
                </div>
              </Popup>
            </CircleMarker>
          ))}
        </MapContainer>
      </div>

      <div className="info-column" style={{ flex: 1 }}>
        {selected ? (
          <div className="result-card">
            <h2>Location details</h2>
            <div>Lat: {selected.lat.toFixed(5)}</div>
            <div>Lon: {selected.lon.toFixed(5)}</div>
            <div>Temperature: {selected.data.temperature} C</div>
            <div>Humidity: {selected.data.humidity} %</div>
            <div>Wind: {selected.data.wind} m/s</div>
            <h3>Felt heat score: {selected.data.felt_heat_score.toFixed(2)} / 10</h3>

            <FeedbackForm
              lat={selected.lat}
              lon={selected.lon}
              temp={selected.data.temperature}
              humidity={selected.data.humidity}
              wind={selected.data.wind}
              onSent={() => console.log("feedback sent")}
            />
          </div>
        ) : (
          <div className="result-card">
            <h3>How to use</h3>
            <ol>
              <li>Click anywhere on the map</li>
              <li>View predicted felt heat score</li>
              <li>Send your feedback to improve the model</li>
            </ol>
          </div>
        )}
      </div>
    </div>
  );
}
