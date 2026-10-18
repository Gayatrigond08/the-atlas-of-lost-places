
import { useState } from "react";
import MiniatureWorld from "./MiniatureWorld";
import MoonlitForest from "./MoonlitForest";
import "./App.css";

export default function App() {
  const [currentWorld, setCurrentWorld] = useState("atlas");

  const [discoveredSecrets, setDiscoveredSecrets] = useState(() => {
    try {
      return JSON.parse(
        localStorage.getItem("atlas-discovered-secrets") || "[]"
      );
    } catch {
      return [];
    }
  });

  const handleSecretFound = (id) => {
    setDiscoveredSecrets((previous) => {
      if (previous.includes(id)) {
        return previous;
      }

      const updated = [...previous, id];

      localStorage.setItem(
        "atlas-discovered-secrets",
        JSON.stringify(updated)
      );

      return updated;
    });
  };

  if (currentWorld === "garden") {
    return (
      <MiniatureWorld
        onBack={() => setCurrentWorld("atlas")}
        onSecretFound={handleSecretFound}
      />
    );
  }

  if (currentWorld === "forest") {
    return (
      <MoonlitForest
        onBack={() => setCurrentWorld("atlas")}
        onSecretFound={handleSecretFound}
      />
    );
  }

  return (
    <main className="atlas-page">
      <div className="atlas-content">
        <p className="atlas-eyebrow">
          A COLLECTION OF FORGOTTEN WORLDS
        </p>

        <h1>The Atlas of Lost Places</h1>

        <p className="atlas-description">
          Somewhere between a dream and a memory, there are places
          waiting to be found.
        </p>

        <p className="atlas-progress">
          ✧ {discoveredSecrets.length} OF 10 SECRETS DISCOVERED ✧
        </p>

        <div className="world-grid">
          <button
            className="world-card garden-card"
            onClick={() => setCurrentWorld("garden")}
          >
            <span className="world-icon">🌷</span>
            <span className="world-number">FIELD NOTE Nº 001</span>
            <span className="world-title">
              The Forgotten Garden
            </span>
            <span className="world-description">
              A quiet little garden hiding stories among its flowers.
            </span>
            <span className="world-enter">
              Explore this place ↗
            </span>
          </button>

          <button
            className="world-card forest-card"
            onClick={() => setCurrentWorld("forest")}
          >
            <span className="world-icon">🌙</span>
            <span className="world-number">FIELD NOTE Nº 002</span>
            <span className="world-title">
              The Moonlit Forest
            </span>
            <span className="world-description">
              A sleepy forest where moonstones glow beneath the stars.
            </span>
            <span className="world-enter">
              Explore this place ↗
            </span>
          </button>
        </div>

        <p className="atlas-footer">
          TWO PLACES FOUND · MANY MORE TO COME
        </p>
      </div>
    </main>
  );
}
