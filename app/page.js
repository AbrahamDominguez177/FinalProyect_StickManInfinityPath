"use client";

import { useState } from "react";
import StickmanPlatformer from "@/components/StickmanPlatformer";
import LevelMenu from "@/components/LevelMenu";
import { levels } from "@/components/levels";

export default function Home() {
  const [selectedLevel, setSelectedLevel] = useState(null);

  const handleLevelSelect = (level) => {
    setSelectedLevel(level);
  };

  const handleNextLevel = (nextLevel) => {
    // 🔁 Desmonta y vuelve a montar el componente para reiniciar el nivel
    setSelectedLevel(null);
    setTimeout(() => {
      setSelectedLevel(nextLevel);
    }, 50);
  };

  return (
    <main>
      {selectedLevel ? (
        <StickmanPlatformer
          levelData={levels[selectedLevel]}
          onExit={() => setSelectedLevel(null)}
          onNextLevel={handleNextLevel}
        />
      ) : (
        <LevelMenu onSelectLevel={handleLevelSelect} />
      )}
    </main>
  );
}
