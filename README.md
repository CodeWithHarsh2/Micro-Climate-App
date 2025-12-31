# 🌞 Micro-Climate Stress Detector: Felt Heat Mapping for Cities  

## Project Overview  

With cities getting hotter every year, ordinary temperature readings often fail to show how people actually feel. Feeling hot depends on more than just the thermometer it depends on humidity, wind, shade, surroundings, and even personal activity. The **Micro-Climate Stress Detector** is designed to map how hot people actually feel in real time across a city. By combining weather APIs, satellite humidity data, smartphone sensors, and crowdsourced feedback, this project produces a hyper-local heat stress map that tells you which areas are safe, which areas to avoid & the best time to go outdoors.  

---

## Why This Project is Innovative  

Most weather apps only show temperature or sometimes humidity. They rarely capture **human discomfort and real perceived heat**.  

This project goes beyond traditional apps by creating a dynamic model that blends environmental data and human feedback. It can highlight cool zones, suggest shaded walking routes, and even adapt over time as more people contribute their perceptions. The result is a tool that is practical, interactive, and genuinely helpful for citizens, city planners, delivery workers, and tourists.  

---

## Features  

🌡️ **Real-Time Felt Heat Prediction**  
- Calculates perceived heat using temperature, humidity, wind, sun exposure, shade, and surroundings  
- Machine learning regression models refine predictions using real crowdsourced feedback  

🗺️ **Interactive City Map**  
- Visualizes hotspots and cool zones  
- Shows shaded paths and walking routes  
- Built using React.js, Leaflet.js, and Mapbox for smooth interaction  

👥 **Crowdsourced Feedback Integration**  
- Users can report their perceived heat levels from any location  
- Data improves over time, making the model more accurate  

📅 **Smart Recommendations**  
- Suggests the best time to go outdoors based on current conditions  
- Useful for tourists, delivery workers, or daily commuters  

---

## Technology and Skills Used  

💻 **Backend:** Python, Django or Flask, PostGIS for spatial data  
🤖 **Machine Learning:** Regression models predicting felt heat  
🌐 **Frontend:** React.js, Leaflet.js, Mapbox, dynamic map layers  
📡 **APIs and Data Sources:** OpenWeather, satellite data, smartphone sensors  
📊 **Data Visualization:** Heat-stress maps, user feedback overlay, interactive routes  
🧩 **Additional Skills:** Geospatial data handling, sensor data processing, full-stack integration, version control with Git  

---

## Real-World Impact  

Cities can use this system to make daily life safer during heat waves. Citizens can avoid heat stress, tourists can plan their trips, and urban planners can identify heat hotspots to design better infrastructure. It promotes awareness about climate change and micro-climate variation, while also providing a practical solution that adapts in real time.  

---

## How to Run the Project  

1. Clone the repository and set up a Python virtual environment for the backend  
2. Install the required Python packages and API keys for weather and satellite data  
3. Navigate to the frontend folder and install dependencies using `npm install`  
4. Start the backend server using `python main.py` or `flask run`  
5. Start the frontend with `npm start` to view the interactive heat map in the browser  
6. Contribute feedback on perceived heat to improve the model over time  

---

## Future Enhancements  

- Mobile app integration to collect live sensor data from smartphones  
- Heat stress notifications based on user location  
- AI-driven predictive modeling for future heatwave risk  
- Integration with wearables for more precise personal heat stress monitoring  

---

## Why This Project Matters  

Extreme heat is becoming a serious global challenge. This project focuses not just on raw temperature, but on **human experience**, making it a real-life tool that can save lives, improve comfort, and guide city planning. It is more than a weather map it is a human-centered solution for navigating urban heat safely and efficiently 🌿☀️
