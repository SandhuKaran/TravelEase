import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom/client";
import AnimatedBackground from "./components/AnimatedBackground";
import OriginInput from "./components/OriginInput";
import Results from "./components/Results";
import axios from "axios";
import "./App.css";
import Header from "./components/Header";

function App() {
  const [addresses, setAddresses] = useState([]);
  const [shortestPath, setShortestPath] = useState([""]);

  const handleSubmit = async (newAddresses) => {
    setAddresses(newAddresses);
    const element = document.getElementById("section-results");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }

    const origin = newAddresses[0];
    const destination = newAddresses[newAddresses.length - 1];
    const stops = newAddresses.slice(1, newAddresses.length - 1);

    try {
      const response = await axios.post(
        "http://localhost:3000/api/shortest-path",
        {
          origin,
          destination,
          stops,
        }
      );

      const path = response.data.shortestPath;
      setShortestPath(path);
    } catch (error) {
      console.error("Error fetching shortest path:", error);
    }
  };

  useEffect(() => {
    // Scroll to the top of the page when the component mounts
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="App">
      <section id="section-welcome" className="section">
        <Header />
        <AnimatedBackground />
      </section>
      <section id="section-origin" className="section section-origin">
        <OriginInput onSubmit={handleSubmit} />
      </section>
      <section id="section-results" className="section section-results">
        <Results addresses={shortestPath} />
      </section>
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

export default App;
