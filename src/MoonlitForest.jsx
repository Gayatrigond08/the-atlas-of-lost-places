
import { useState } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Sparkles } from "@react-three/drei";
import "./MiniatureWorld.css";

function MoonTree({ position, scale = 1 }) {
  return (
    <group position={position} scale={scale}>
      <mesh position={[0, 0.65, 0]}>
        <cylinderGeometry args={[0.1, 0.16, 1.3, 7]} />
        <meshStandardMaterial color="#55465e" />
      </mesh>

      {[1.15, 1.55, 1.9].map((height, i) => (
        <mesh
          key={i}
          position={[0, height, 0]}
          scale={1 - i * 0.15}
        >
          <coneGeometry args={[0.65, 1, 7]} />
          <meshStandardMaterial
            color={["#334f58", "#42656a", "#587b78"][i]}
            roughness={1}
          />
        </mesh>
      ))}
    </group>
  );
}

function Moonstone({ position, onDiscover }) {
  return (
    <mesh
      position={position}
      onPointerDown={(e) => {
        e.stopPropagation();
        onDiscover();
      }}
    >
      <dodecahedronGeometry args={[0.35, 0]} />
      <meshStandardMaterial
        color="#b5d9df"
        emissive="#73bdcf"
        emissiveIntensity={0.8}
        roughness={0.3}
      />
    </mesh>
  );
}

function ForestWorld({ onDiscover }) {
  return (
    <>
      <color attach="background" args={["#17263b"]} />
      <fog attach="fog" args={["#17263b", 9, 22]} />

      <ambientLight intensity={0.7} color="#a6b8ed" />
      <directionalLight
        position={[-4, 8, 5]}
        intensity={1.8}
        color="#b9d8ff"
      />
      <pointLight
        position={[0, 4, 0]}
        intensity={2}
        distance={10}
        color="#9bb9ff"
      />

      <Sparkles
        count={100}
        scale={[8, 5, 8]}
        size={2.5}
        speed={0.3}
        color="#c7eaff"
        position={[0, 1.5, 0]}
        raycast={() => null}
      />

      {/* Floating forest island */}
      <mesh position={[0, -0.65, 0]}>
        <cylinderGeometry args={[3.8, 2.6, 1.3, 10]} />
        <meshStandardMaterial color="#343d4d" roughness={1} />
      </mesh>

      <mesh position={[0, -0.02, 0]}>
        <cylinderGeometry args={[3.82, 3.7, 0.3, 10]} />
        <meshStandardMaterial color="#456b64" roughness={1} />
      </mesh>

      {/* Forest trees */}
      <MoonTree position={[-2.2, 0.1, -0.7]} scale={1.1} />
      <MoonTree position={[2.1, 0.1, -0.8]} scale={0.95} />
      <MoonTree position={[-2.2, 0.1, 1.3]} scale={0.8} />
      <MoonTree position={[2.4, 0.1, 1.2]} scale={0.85} />
      <MoonTree position={[0.1, 0.1, -2.3]} scale={0.75} />

      {/* Moonstone discoveries */}
      <Moonstone
        position={[-1.1, 0.5, 0.5]}
        onDiscover={() =>
          onDiscover(
            "The sleeping moonstone",
            "It holds a little piece of moonlight inside."
          )
        }
      />

      <Moonstone
        position={[1.4, 0.4, 0.9]}
        onDiscover={() =>
          onDiscover(
            "The blue forest crystal",
            "Its glow reveals a path hidden between the trees."
          )
        }
      />

      <Moonstone
        position={[0.4, 0.35, -1.7]}
        onDiscover={() =>
          onDiscover(
            "The lost star",
            "A fallen star is waiting to find its way home."
          )
        }
      />

      <OrbitControls
        enablePan={false}
        minDistance={6}
        maxDistance={11}
        minPolarAngle={0.5}
        maxPolarAngle={1.35}
        target={[0, 0.5, 0]}
        autoRotate={false}
      />
    </>
  );
}


const FOREST_DISCOVERIES = {
  "The sleeping moonstone": {
    emoji: "🌙",
    text: "It holds a little piece of moonlight inside.",
  },
  "The blue forest crystal": {
    emoji: "💎",
    text: "Its glow reveals a path hidden between the trees.",
  },
  "The lost star": {
    emoji: "⭐",
    text: "A fallen star is waiting to find its way home.",
  },
};

export default function MoonlitForest({ onBack, onSecretFound }) {
  const [discovery, setDiscovery] = useState(null);
  const [discovered, setDiscovered] = useState([]);
const [journalOpen, setJournalOpen] = useState(false);
  return (
    <main className="miniature-world">
      <Canvas
        camera={{ position: [7, 6, 9], fov: 38 }}
        dpr={[1, 1.5]}
      >
       


<ForestWorld
  onDiscover={(title, text) => {
    setDiscovery({ title, text });

    setDiscovered((previous) =>
      previous.includes(title) ? previous : [...previous, title]
    );

    onSecretFound?.(title);
  }}
/>



      </Canvas>

      <header className="mini-header">
        <span>✳ THE LITTLE ATLAS</span>
        <span>FIELD NOTE Nº 002</span>
      </header>

      <section className="mini-intro">
        <p>A PLACE AFTER DARK</p>
        <h1>
          The Moonlit
          <br />
          <i>Forest</i>
        </h1>
        <span>Some secrets only appear beneath the stars.</span>
      </section>

      
<div className="forest-actions">
  <button
    className="journal-button"
    onClick={() => setJournalOpen((open) => !open)}
  >
    📖 Forest Journal · {discovered.length}/3
  </button>

  <button
    className="journal-button"
    onClick={onBack}
  >
    ← Back to Atlas
  </button>
</div>


      <div className="mini-hint">
        ✧ DRAG TO EXPLORE · TOUCH THE MOONSTONES
      </div>


{journalOpen && (
  <section className="journal-panel">
    <button
      className="journal-close"
      onClick={() => setJournalOpen(false)}
      aria-label="Close journal"
    >
      ×
    </button>

    <p>YOUR FIELD NOTES</p>
    <h2>Forest discoveries</h2>

    {discovered.length === 0 ? (
      <p>No secrets found yet. Explore the moonstones!</p>
    ) : (
      <ul className="journal-list">
        {discovered.map((title) => (
          <li key={title}>
            <button
              className="journal-entry"
              onClick={() => {
                setDiscovery({
                  title,
                  text: FOREST_DISCOVERIES[title].text,
                });
                setJournalOpen(false);
              }}
            >
              <span>{FOREST_DISCOVERIES[title].emoji}</span>
              <span>{title}</span>
              <span className="journal-entry-arrow">↗</span>
            </button>
          </li>
        ))}
      </ul>
    )}

    <p>{discovered.length} of 3 secrets found</p>
  </section>
)}

      {discovery && (
        <div className="discovery-card">
          <button
            className="discovery-close"
            onClick={() => setDiscovery(null)}
            aria-label="Close discovery"
          >
            ×
          </button>
          <p>A LITTLE DISCOVERY ✧</p>
          <h2>{discovery.title}</h2>
          <span>{discovery.text}</span>
        </div>
      )}

      <footer className="mini-footer">
        FOLLOW THE LIGHT BETWEEN THE TREES
      </footer>
    </main>
  );
}
