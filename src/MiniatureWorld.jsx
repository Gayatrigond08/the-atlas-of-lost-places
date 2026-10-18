
import { useState } from "react";
import { Canvas } from "@react-three/fiber";
import { Float, OrbitControls, Sparkles } from "@react-three/drei";
import "./MiniatureWorld.css";

const JOURNAL_ITEMS = {
  cottage: {
    title: "The little cottage",
    emoji: "🏡",
  },
  "pink-flower": {
    title: "A sleepy pink flower",
    emoji: "🌸",
  },
  "lavender-flower": {
    title: "A lavender flower",
    emoji: "💜",
  },
  sunflower: {
    title: "A little sunflower",
    emoji: "🌼",
  },
  "pink-mushroom": {
    title: "A tiny forest mushroom",
    emoji: "🍄",
  },
  "purple-mushroom": {
    title: "The lavender mushroom",
    emoji: "🍄",
  },
  "golden-mushroom": {
    title: "The golden mushroom",
    emoji: "🍄",
  },
};

function Tree({ position, scale = 1 }) {
  return (
    <group position={position} scale={scale}>
      <mesh position={[0, 0.55, 0]}>
        <cylinderGeometry args={[0.12, 0.2, 1.1, 7]} />
        <meshStandardMaterial color="#79513e" />
      </mesh>

      {[0.9, 1.3, 1.65].map((height, i) => (
        <mesh
          key={i}
          position={[0, height, 0]}
          scale={1 - i * 0.17}
        >
          <icosahedronGeometry args={[0.55, 1]} />
          <meshStandardMaterial
            color={["#577c59", "#71966b", "#91ae7c"][i]}
            roughness={1}
            flatShading
          />
        </mesh>
      ))}
    </group>
  );
}

function Flower({ position, color, onDiscover }) {
  const handlePointerDown = (e) => {
    e.stopPropagation();
    onDiscover();
  };

  return (
    <group position={position}>
      <mesh position={[0, 0.25, 0]}>
        <cylinderGeometry args={[0.025, 0.035, 0.5, 6]} />
        <meshStandardMaterial color="#527a48" />
      </mesh>

      <Float speed={1.5} floatIntensity={0.08}>
        <group position={[0, 0.52, 0]}>
          {[0, 1, 2, 3, 4].map((i) => (
            <mesh
              key={i}
              position={[
                Math.cos((i * Math.PI * 2) / 5) * 0.13,
                0,
                Math.sin((i * Math.PI * 2) / 5) * 0.13,
              ]}
              onPointerDown={handlePointerDown}
            >
              <sphereGeometry args={[0.13, 12, 10]} />
              <meshStandardMaterial
                color={color}
                roughness={0.65}
                emissive={color}
                emissiveIntensity={0.25}
              />
            </mesh>
          ))}

          <mesh onPointerDown={handlePointerDown}>
            <sphereGeometry args={[0.09, 12, 10]} />
            <meshStandardMaterial
              color="#f5d78d"
              emissive="#d9a746"
              emissiveIntensity={0.8}
            />
          </mesh>
        </group>
      </Float>
    </group>
  );
}

function Mushroom({
  position,
  color = "#d97b83",
  scale = 1,
  onDiscover,
}) {
  const handlePointerDown = (e) => {
    e.stopPropagation();
    onDiscover();
  };

  return (
    <group position={position} scale={scale}>
      <mesh
        position={[0, 0.16, 0]}
        onPointerDown={handlePointerDown}
      >
        <cylinderGeometry args={[0.09, 0.12, 0.32, 8]} />
        <meshStandardMaterial color="#f2dfc4" />
      </mesh>

      <mesh
        position={[0, 0.34, 0]}
        scale={[1, 0.65, 1]}
        onPointerDown={handlePointerDown}
      >
        <sphereGeometry args={[0.3, 12, 10]} />
        <meshStandardMaterial
          color={color}
          roughness={0.8}
          emissive={color}
          emissiveIntensity={0.2}
        />
      </mesh>

      {[-0.1, 0.08, 0.17].map((x, i) => (
        <mesh
          key={i}
          position={[x, 0.44, 0.19]}
          onPointerDown={handlePointerDown}
        >
          <sphereGeometry args={[0.035, 8, 8]} />
          <meshStandardMaterial color="#fff0d8" />
        </mesh>
      ))}
    </group>
  );
}

function Cottage({ onDiscover }) {
  const handlePointerDown = (e) => {
    e.stopPropagation();
    onDiscover();
  };

  return (
    <group position={[0, 0.12, -0.85]}>
      <mesh
        position={[0, 0.65, 0]}
        onPointerDown={handlePointerDown}
      >
        <boxGeometry args={[1.25, 1.15, 1]} />
        <meshStandardMaterial color="#e4cba8" roughness={0.95} />
      </mesh>

      <mesh
        position={[0, 1.42, 0]}
        rotation={[0, Math.PI / 4, 0]}
        onPointerDown={handlePointerDown}
      >
        <coneGeometry args={[1.02, 0.85, 4]} />
        <meshStandardMaterial color="#a65f4f" roughness={1} />
      </mesh>

      <mesh
        position={[0, 0.4, 0.51]}
        onPointerDown={handlePointerDown}
      >
        <boxGeometry args={[0.27, 0.58, 0.05]} />
        <meshStandardMaterial color="#75503d" />
      </mesh>

      <mesh
        position={[0.37, 0.85, 0.515]}
        onPointerDown={handlePointerDown}
      >
        <boxGeometry args={[0.2, 0.23, 0.035]} />
        <meshStandardMaterial
          color="#ffdc91"
          emissive="#ffb84f"
          emissiveIntensity={2}
        />
      </mesh>

      <pointLight
        position={[0.37, 0.85, 0.8]}
        color="#ffc777"
        intensity={2}
        distance={2.5}
      />
    </group>
  );
}


function SecretDoor({ onClick, unlocked }) {
  return (
    <group position={[0, 0.12, -2.1]}>
      {/* Hidden stone frame */}
      <mesh position={[0, 0.48, 0]}>
        <boxGeometry args={[0.85, 1.05, 0.16]} />
        <meshStandardMaterial
          color={unlocked ? "#b99a68" : "#52664b"}
          roughness={1}
        />
      </mesh>

      {/* The door */}
      <mesh
        position={[0, 0.48, 0.1]}
        onPointerDown={(event) => {
          event.stopPropagation();
          onClick();
        }}
      >
        <boxGeometry args={[0.65, 0.85, 0.08]} />
        <meshStandardMaterial
          color={unlocked ? "#9b795a" : "#405746"}
          emissive={unlocked ? "#e8b85e" : "#000000"}
          emissiveIntensity={unlocked ? 0.8 : 0}
          roughness={0.9}
        />
      </mesh>

      {/* Golden doorknob */}
      <mesh
        position={[0.2, 0.45, 0.16]}
        onPointerDown={(event) => {
          event.stopPropagation();
          onClick();
        }}
      >
        <sphereGeometry args={[0.055, 12, 12]} />
        <meshStandardMaterial
          color="#f4cf79"
          emissive="#e7ad48"
          emissiveIntensity={0.6}
        />
      </mesh>
    </group>
  );
}

function World({ onDiscover, discoveredCount, onSecretDoorClick }) {
  return (
    <>
      <color attach="background" args={["#b8d6dc"]} />
      <fog attach="fog" args={["#b8d6dc", 10, 24]} />

      <Sparkles
        count={120}
        scale={[8, 5, 8]}
        size={3}
        speed={0.35}
        opacity={0.8}
        color="#fff0a8"
        position={[0, 1.5, 0]}
        raycast={() => null}
      />

      <ambientLight intensity={1.6} />

      <directionalLight
        position={[-4, 8, 5]}
        intensity={2.5}
        color="#fff0d2"
        castShadow
      />

      <pointLight
        position={[0, 3, 2]}
        intensity={1.2}
        distance={9}
        color="#ffc8e8"
      />

      {/* Floating island */}
      <mesh position={[0, -0.65, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[3.8, 2.6, 1.3, 10]} />
        <meshStandardMaterial color="#725c4c" roughness={1} />
      </mesh>

      {/* Grassy island top */}
      <mesh position={[0, -0.02, 0]} receiveShadow>
        <cylinderGeometry args={[3.82, 3.7, 0.3, 10]} />
        <meshStandardMaterial color="#9dbb7d" roughness={1} />
      </mesh>

      {/* Stepping stones */}
      {[
        [0.9, 0.14, 1.6],
        [0.55, 0.14, 1.25],
        [0.1, 0.14, 1.05],
        [-0.35, 0.14, 0.9],
        [-0.65, 0.14, 0.55],
      ].map(([x, y, z], i) => (
        <mesh
          key={i}
          position={[x, y, z]}
          rotation={[-Math.PI / 2, 0, i * 0.12]}
        >
          <cylinderGeometry args={[0.24, 0.24, 0.045, 6]} />
          <meshStandardMaterial color="#d4c4a6" roughness={1} />
        </mesh>
      ))}

      <Cottage
        onDiscover={() =>
          onDiscover(
            "cottage",
            "The little cottage",
            "Someone has left a tiny light on inside."
          )
        }
      />
      
      
<SecretDoor
  unlocked={discoveredCount >= 7}
  onClick={onSecretDoorClick}
/>

      {/* Trees */}
      <Tree position={[-2.2, 0.1, -0.7]} scale={1.05} />
      <Tree position={[2.1, 0.1, -0.8]} scale={0.9} />
      <Tree position={[-2.2, 0.1, 1.3]} scale={0.72} />
      <Tree position={[2.4, 0.1, 1.2]} scale={0.8} />

      {/* Mushrooms */}
      <Mushroom
        position={[-1.75, 0.12, 0.5]}
        scale={0.75}
        onDiscover={() =>
          onDiscover(
            "pink-mushroom",
            "A tiny forest mushroom",
            "A little creature might call this its home."
          )
        }
      />

      <Mushroom
        position={[1.25, 0.12, -1.8]}
        color="#b6a0e8"
        scale={0.65}
        onDiscover={() =>
          onDiscover(
            "purple-mushroom",
            "The lavender mushroom",
            "It glows whenever the garden falls asleep."
          )
        }
      />

      <Mushroom
        position={[2.15, 0.12, 0.45]}
        color="#e8b76c"
        scale={0.55}
        onDiscover={() =>
          onDiscover(
            "golden-mushroom",
            "The golden mushroom",
            "They say it marks the beginning of a hidden path."
          )
        }
      />

      {/* Flowers */}
      <Flower
        position={[-1.3, 0.12, 0.5]}
        color="#ed9cb8"
        onDiscover={() =>
          onDiscover(
            "pink-flower",
            "A sleepy pink flower",
            "Its petals glow softly when you touch them."
          )
        }
      />

      <Flower
        position={[1.7, 0.12, 0.3]}
        color="#b8a1eb"
        onDiscover={() =>
          onDiscover(
            "lavender-flower",
            "A lavender flower",
            "A tiny golden sparkle hides between its petals."
          )
        }
      />

      <Flower
        position={[-0.8, 0.12, 2.1]}
        color="#f0c88d"
        onDiscover={() =>
          onDiscover(
            "sunflower",
            "A little sunflower",
            "It always turns toward the warmest light."
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
        autoRotate
        autoRotateSpeed={0.35}
      />
    </>
  );
}

export default function MiniatureWorld({ onBack,onSecretFound }) {
  const [discovery, setDiscovery] = useState(null);
  const [journalOpen, setJournalOpen] = useState(false);
  const [discovered, setDiscovered] = useState([]);
  const [secretDoorOpen, setSecretDoorOpen] = useState(false);
  const handleDiscover = (id, title, text) => {
  setDiscovery({ title, text });

  setDiscovered((previous) =>
    previous.includes(id) ? previous : [...previous, id]
  );

  onSecretFound?.(id);
};

const unlockSecretDoor = () => {
  if (discovered.length < 7) {
    setDiscovery({
      title: "A door beneath the ivy",
      text: "Seven little wonders guard this secret. Find them all, and the garden will show you its hidden way.",
    });
    return;
  }

  setSecretDoorOpen(true);
  setDiscovery({
    title: "The garden's hidden secret",
    text: "Behind the old cottage, a forgotten doorway opens. A tiny golden light invites you into a place that time forgot.",
  });
};
  
return (
  <main className="miniature-world">
    <button
      className="back-to-atlas"
      onClick={onBack}
    >
      ← Back to Atlas
    </button>

    <Canvas
      shadows
      camera={{ position: [7, 6, 9], fov: 38 }}
      dpr={[1, 1.5]}
    >
      <World
  onDiscover={handleDiscover}
  discoveredCount={discovered.length}
  onSecretDoorClick={() => {
    if (discovered.length < 7) {
      setDiscovery({
        title: "A door beneath the ivy",
        text: `The door is still locked. You have found ${discovered.length} of 7 garden secrets.`,
      });
    } else {
      setSecretDoorOpen(true);
      setDiscovery({
        title: "The garden's hidden secret",
        text: "The ivy parts, and the forgotten door opens. A golden light leads to a place hidden from the world.",
      });
    }
  }}
/>
    </Canvas>


      <header className="mini-header">
        <span>✳ THE LITTLE ATLAS</span>
        <span>FIELD NOTE Nº 001</span>
      </header>

      <section className="mini-intro">
        <p>A LITTLE WORLD, JUST FOR YOU</p>
        <h1>
          The Forgotten
          <br />
          <i>Garden</i>
        </h1>
        <span>There are little wonders everywhere.</span>
      </section>

      <div className="mini-hint">
        ✿ DRAG TO EXPLORE · CLICK TO DISCOVER
      </div>

      <button
        className="journal-button"
        onClick={() => setJournalOpen((open) => !open)}
      >
        📖 Journal · {discovered.length}/7
      </button>

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
          <h2>Garden discoveries</h2>

          {discovered.length === 0 ? (
            <p>Nothing discovered yet. Explore the garden!</p>
          ) : (
            <ul className="journal-list">
  {discovered.map((id) => (
    <li key={id}>
      <button
        className="journal-entry"
        onClick={() => {
          setDiscovery({
            title: JOURNAL_ITEMS[id].title,
            text: {
              cottage: "Someone has left a tiny light on inside.",
              "pink-flower": "Its petals glow softly when you touch them.",
              "lavender-flower": "A tiny golden sparkle hides between its petals.",
              sunflower: "It always turns toward the warmest light.",
              "pink-mushroom": "A little creature might call this its home.",
              "purple-mushroom": "It glows whenever the garden falls asleep.",
              "golden-mushroom": "They say it marks the beginning of a hidden path.",
            }[id],
          });
          setJournalOpen(false);
        }}
      >
        <span>{JOURNAL_ITEMS[id].emoji}</span>
        <span>{JOURNAL_ITEMS[id].title}</span>
        <span className="journal-entry-arrow">↗</span>
      </button>
    </li>
  ))}
</ul>
          )}

          <p>{discovered.length} of 7 secrets found</p>
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
        A PLACE WHERE SMALL THINGS FEEL MAGICAL
      </footer>
    </main>
  );
}
