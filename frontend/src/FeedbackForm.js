import React, { useState } from "react";
import { sendFeedback } from "./api";

export default function FeedbackForm({ lat, lon, temp, humidity, wind, onSent }) {
  const [score, setScore] = useState(5);
  const [notes, setNotes] = useState("");
  const [loading, setLoading] = useState(false);

  async function submit(e) {
    e.preventDefault();
    setLoading(true);
    try {
      const payload = { lat, lon, felt_score: score, temp, humidity, wind, notes };
      await sendFeedback(payload);
      setLoading(false);
      setScore(5);
      setNotes("");
      if (onSent) onSent();
      alert("Thanks for your feedback");
    } catch (err) {
      setLoading(false);
      alert("Failed to send feedback");
    }
  }

  return (
    <div className="result-card">
      <h3>Send Feedback</h3>
      <form onSubmit={submit}>
        <div>
          <label>Felt heat rating (1 cool - 10 very hot)</label>
          <input type="range" min="1" max="10" value={score} onChange={e => setScore(Number(e.target.value))} />
          <div>Value: {score}</div>
        </div>
        <div>
          <label>Notes (optional)</label>
          <textarea value={notes} onChange={e => setNotes(e.target.value)} rows={3} style={{ width: "100%" }} />
        </div>
        <button type="submit" disabled={loading}>{loading ? "Sending..." : "Send Feedback"}</button>
      </form>
    </div>
  );
}
