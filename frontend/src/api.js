import axios from "axios";

const BASE = process.env.REACT_APP_API_URL || "http://127.0.0.1:8000";

export async function fetchFeltHeat(lat, lon) {
  const res = await axios.post(`${BASE}/felt-heat`, { lat, lon });
  return res.data;
}

export async function sendFeedback(payload) {
  const res = await axios.post(`${BASE}/feedback`, payload);
  return res.data;
}
