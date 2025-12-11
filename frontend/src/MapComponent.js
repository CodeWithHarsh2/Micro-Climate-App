import React, { useState, useEffect } from "react";
import {
  MapContainer,
  TileLayer,
  CircleMarker,
  Popup,
  useMapEvents,
  useMap
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { fetchFeltHeat } from "./api";
import FeedbackForm from "./FeedbackForm";

// Fix Leaflet map size after render
function FixMapSize() {
  const map = useMap();
  useEffect(() => {
    map.invalidateSize();
  }, [map]);
  return null;
}

// Handle map clicks
function ClickHandler({ onClick }) {
  useMapEvents({
    click(e) {
      onClick(e.latlng);
    }
  });
  return null;
}

export default function MapComponent() {
  const [selected, setSelected] = useState(null);
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
      alert("Failed to fetch felt heat. Check backend + API key.");
      console.error(err);
    }
  }

  return (
    <div style={{ display: "flex", flex: 1, gap: "20px" }}>
      
      {/* MAP COLUMN */}
      <div className="map-column fade-in">
        <MapContainer
          center={[28.6, 77.2]}
          zoom={12}
          style={{ height: "80vh", width: "100%", borderRadius: "22px" }}
        >
          <FixMapSize />
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          <ClickHandler onClick={handleMapClick} />

          {markers.map(m => (
            <CircleMarker
              key={m.id}
              center={[m.lat, m.lon]}
              radius={10}
              pathOptions={{
                color: "#4c8fff",
                fillColor: "#ffb55a",
                fillOpacity: 0.85
              }}
              className="glow-marker"
            >
              <Popup>
                <div style={{ fontSize: "14px" }}>
                  <strong>Felt Heat: {m.data.felt_heat_score.toFixed(2)}</strong>
                  <div>Temp: {m.data.temperature}°C</div>
                  <div>Humidity: {m.data.humidity}%</div>
                  <div>Wind: {m.data.wind} m/s</div>
                </div>
              </Popup>
            </CircleMarker>
          ))}
        </MapContainer>
      </div>

      {/* INFO COLUMN */}
      <div className="info-column slide-up">
        {!selected ? (
          // BEFORE click: show project info + how to use
          <div className="result-card fade-in">
            <h2>About This Project</h2>
            <p>
              Cities around the world are getting hotter every year, and traditional temperature readings often fail to capture the true experience of human discomfort. Micro-climate conditions, such as humidity, wind, sun exposure, shade, urban heat islands, and surrounding infrastructure, all influence how hot it actually feels. The Micro-Climate Stress Detector goes beyond ordinary weather measurements to provide a dynamic, human-centered view of perceived heat across a city. By combining data from weather APIs, satellite imagery, real-time sensor readings, and crowdsourced user feedback, this tool estimates the felt heat in specific locations, helping residents, commuters, tourists, and planners understand local micro-climates and make informed decisions. It emphasizes not just temperature, but the full environmental context that affects human comfort and safety.
            </p>

            <p>
              Heat stress is a growing concern in urban areas, affecting health, productivity, and well-being. Extreme heat can cause fatigue, dehydration, and serious health risks, particularly for vulnerable populations. This project highlights the areas most prone to discomfort, suggesting cooler routes, shaded paths, and safer outdoor locations. It also promotes awareness of climate change impacts at a local scale, enabling communities to take proactive measures and adapt to increasingly variable weather conditions.
            </p>

            <h3>Why This Project is Innovative</h3>
            <p>
              Unlike traditional weather applications that report only temperature or occasional humidity readings, the Micro-Climate Stress Detector blends environmental data with real human perceptions. By continuously integrating user feedback and refining predictions through machine learning regression models, it creates a living, evolving representation of felt heat across the city. This approach allows the system to highlight cool zones, suggest safe walking routes, and dynamically adapt as more data is collected. It provides actionable insights that are relevant for everyday life, urban planning, tourism, and emergency preparedness.
            </p>

            <h3>Real-World Impact</h3>
            <p>
              The practical benefits of this project are significant. Citizens can plan their activities and avoid heat stress, tourists can find safer and more comfortable areas to visit, and city planners can identify heat hotspots to design better infrastructure and green spaces. By offering a localized and continuously updated view of perceived heat, this tool helps reduce health risks, improve urban comfort, and foster awareness about micro-climate variations and climate change. It empowers individuals and authorities alike to make data-driven decisions that improve quality of life in increasingly hot urban environments.
            </p>

            <h3>How to Use</h3>
            <p>
              Click anywhere on the map to fetch the perceived heat for that location. You will see the environmental conditions and an animated heat score. Submit feedback to help improve the accuracy of the model. This tool is designed to be interactive and easy to understand, allowing anyone to make informed decisions about outdoor activities, safe routes, and heat exposure.
            </p>
          </div>
        ) : (
          // AFTER click: show only location details + feedback
          <div className="result-card fade-in">
            <h2>Location Details</h2>
            <p><strong>Latitude:</strong> {selected.lat.toFixed(5)}</p>
            <p><strong>Longitude:</strong> {selected.lon.toFixed(5)}</p>

            <h3>Environmental Conditions</h3>
            <p>Temperature: {selected.data.temperature}°C</p>
            <p>Humidity: {selected.data.humidity}%</p>
            <p>Wind: {selected.data.wind} m/s</p>

            <h3>Felt Heat Score</h3>
            <div className="heat-bar-container">
              <div
                className="heat-bar-fill"
                style={{ "--heat-width": `${(selected.data.felt_heat_score / 10) * 100}%` }}
              ></div>
            </div>

            {/* Premium Feedback Card */}
            <div className="feedback-card fade-in">
              <h3 style={{ marginBottom: "10px" }}>Submit Feedback</h3>
              <FeedbackForm
                lat={selected.lat}
                lon={selected.lon}
                temp={selected.data.temperature}
                humidity={selected.data.humidity}
                wind={selected.data.wind}
                onSent={() => alert("Feedback sent! Thank you")}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
