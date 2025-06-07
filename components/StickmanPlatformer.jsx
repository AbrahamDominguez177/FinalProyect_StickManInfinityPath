
"use client";
import ListaDobleCheckpoints from "@/components/utils/CheckpointList.js";
import { useEffect, useRef, useState } from "react";
import { Player } from "./entities/Player";
import { Platform } from "./entities/Platform";
import { KeyItem } from "./entities/KeyItem";
import { checkCollision, resolveCollision } from "./utils/collision";
import { setupInput } from "./utils/input";
import { levels } from "./levels";

export default function StickmanPlatformer({ levelData, onExit, onNextLevel }) {
  const canvasRef = useRef(null);
  const [canvasSize, setCanvasSize] = useState({ width: 0, height: 0 });
  const [showPopup, setShowPopup] = useState(false);
  const [showGameOver, setShowGameOver] = useState(false);
  const [elapsedTime, setElapsedTime] = useState(0);
  const level = levelData.id || 1;
  const allowJumpQueue = levelData.enableJumpQueue === true;
  const checkpointsRef = useRef(new ListaDobleCheckpoints(3));

  const keys = [];
  let animationFrameId;

  const clearKeys = () => {
    for (let key in keys) {
      keys[key] = false;
    }
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      setCanvasSize({ width: canvas.width, height: canvas.height });
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    const removeListeners = setupInput(keys);

    const gravity = 0.7;
    const jumpPower = -15;
    const moveSpeed = 5.5;

    let player, platforms, key, ordenarKey;
    let startTime = Date.now();
    let jumpQueue = [];


    const ordenarPlataformasAnimadas = async () => {
      const plataformasOrdenables = platforms.filter(
        (p) => p.x >= canvas.width * 0.5 && !p.moving
      );

      const drawAndPause = async () => {
        draw();
        await new Promise((res) => setTimeout(res, 300));
      };

      if (level === 8) {
        // Bubble Sort
        for (let i = 0; i < plataformasOrdenables.length - 1; i++) {
          for (let j = 0; j < plataformasOrdenables.length - i - 1; j++) {
            if (plataformasOrdenables[j].height > plataformasOrdenables[j + 1].height) {
              const tempHeight = plataformasOrdenables[j].height;
              const tempY = plataformasOrdenables[j].y;

              plataformasOrdenables[j].height = plataformasOrdenables[j + 1].height;
              plataformasOrdenables[j].y = plataformasOrdenables[j + 1].y;

              plataformasOrdenables[j + 1].height = tempHeight;
              plataformasOrdenables[j + 1].y = tempY;

              await drawAndPause();
            }
          }
        }
      } else if (level === 9) {
        // Insertion Sort
        for (let i = 1; i < plataformasOrdenables.length; i++) {
          const keyHeight = plataformasOrdenables[i].height;
          const keyY = plataformasOrdenables[i].y;
          let j = i - 1;

          while (j >= 0 && plataformasOrdenables[j].height > keyHeight) {
            plataformasOrdenables[j + 1].height = plataformasOrdenables[j].height;
            plataformasOrdenables[j + 1].y = plataformasOrdenables[j].y;
            j--;
            await drawAndPause();
          }

          plataformasOrdenables[j + 1].height = keyHeight;
          plataformasOrdenables[j + 1].y = keyY;
          await drawAndPause();
        }
      }
    };


    const createLevel = () => {
      const w = canvas.width;
      const h = canvas.height;

      player = new Player(levelData.playerStart.x, levelData.playerStart.y);

      platforms = levelData.platforms.map((p) => {
        return new Platform(
          (p.x / 800) * w,
          (p.y / 600) * h,
          (p.width / 800) * w,
          (p.height / 600) * h,
          {
            moving: p.moving,
            range: p.range,
            direction: p.direction,
            speed: p.speed,
            isDeadly: p.isDeadly,
            tipo: p.tipo
          }
        );
      });

      if (levelData.ordenarKey) {
        ordenarKey = new KeyItem(
          (levelData.ordenarKey.x / 800) * w,
          (levelData.ordenarKey.y / 600) * h,
          levelData.ordenarKey.width,
          levelData.ordenarKey.height,
          "#e74c3c"
        );
      }

      key = new KeyItem(
        (levelData.keyItem.x / 800) * w,
        (levelData.keyItem.y / 600) * h,
        levelData.keyItem.width,
        levelData.keyItem.height
      );
    };

    createLevel();

    const update = () => {
  if (showPopup || showGameOver) return;

  setElapsedTime(Math.floor((Date.now() - startTime) / 1000));

  // Movimiento de plataformas
  platforms.forEach((plat) => {
    if (plat.moving) {
      if (!plat._offset) plat._offset = 0;
      if (!plat._dir) plat._dir = 1;

      const movement = plat.speed || 1;
      plat._offset += plat._dir * movement;

      if (Math.abs(plat._offset) > plat.range / 2) {
        plat._dir *= -1;
      }

      if (plat.direction === "horizontal") {
        plat.x += plat._dir * movement;
      } else if (plat.direction === "vertical") {
        plat.y += plat._dir * movement;
      }
    }
  });

  player.update(keys, gravity, jumpPower, moveSpeed);

  // Si el jugador cae fuera del mapa
  if (player.y > canvas.height + 100) {
  const lastCheckpoint = checkpointsRef.current.getLastCheckpoint();

  if (level === 5 && lastCheckpoint) {
    player.x = lastCheckpoint.x;
    player.y = lastCheckpoint.y - 10;
    player.velocityY = 0;
    clearKeys();
    return;
  }

  if (allowJumpQueue && jumpQueue.length > 0) {
    const last = jumpQueue.pop();
    player.x = last.x;
    player.y = last.y - 10;
    player.velocityY = 0;
    clearKeys();
    return;
  } else {
    clearKeys();
    setShowGameOver(true);
    return;
  }
}


  player.onGround = false;

  for (const plat of platforms) {
    // Colisión mortal
    if (plat.isDeadly && checkCollision(player, plat)) {
      clearKeys();
      setShowGameOver(true);
      return;
    }

    // Resolución de colisión normal
    const result = resolveCollision(player, plat);

    if (!plat.isDeadly && result === "landed") {
      const pos = {
        x: plat.x + plat.width / 2 - player.width / 2,
        y: plat.y - player.height
      };
      const last = jumpQueue[jumpQueue.length - 1];

      if (!last || last.y !== pos.y || last.x !== pos.x) {
        jumpQueue.push(pos);
        if (jumpQueue.length > 5) jumpQueue.shift();
      }

      // 👇 Guardar checkpoint si aplica
      if (plat.tipo === "checkpoint") {
        checkpointsRef.current.add({
          x: pos.x,
          y: pos.y,
          nivel: level
        });
        console.log("Checkpoint guardado:", pos);
      }
    }
  }

  // Recolección de llave normal
  if (!key.collected && checkCollision(player, key)) {
    key.collected = true;
    clearKeys();
    const finalTime = Math.floor((Date.now() - startTime) / 1000);
    localStorage.setItem(`nivel_completado_${level}`, "true");
    localStorage.setItem(`tiempo_nivel_${level}`, finalTime);
    setShowPopup(true);
    keys.length = 0;
  }

  // Recolección de ordenarKey (si aplica)
  if (ordenarKey && !ordenarKey.collected && checkCollision(player, ordenarKey)) {
    ordenarKey.collected = true;
    ordenarPlataformasAnimadas();
  }
};


    const draw = () => {
      ctx.fillStyle = "#cceeff";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      platforms.forEach((plat) => plat.draw(ctx));
      key.draw(ctx);
      if (ordenarKey) ordenarKey.draw(ctx);
      player.draw(ctx);
    };

    const loop = () => {
      update();
      draw();
      if (!showPopup && !showGameOver) animationFrameId = requestAnimationFrame(loop);
    };

    animationFrameId = requestAnimationFrame(loop);

    return () => {
      removeListeners();
      window.removeEventListener("resize", resizeCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, [levelData, showPopup, showGameOver]);

  return (
    <>
      <button
        onClick={onExit}
        style={{
          position: "absolute",
          top: 20,
          left: 20,
          padding: "10px 16px",
          fontSize: "15px",
          backgroundColor: "#ff5e57",
          color: "white",
          border: "none",
          borderRadius: "10px",
          boxShadow: "0 2px 8px rgba(0,0,0,0.3)",
          cursor: "pointer",
          zIndex: 999,
        }}
      >
        ⬅ Salir
      </button>

      <canvas
        ref={canvasRef}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          display: "block",
          backgroundColor: "#000",
        }}
      />

      {showPopup && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            backgroundColor: "rgba(0, 0, 0, 0.7)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 1000,
          }}
        >
          <div
            style={{
              background: "#ffffff",
              padding: "30px",
              borderRadius: "12px",
              textAlign: "center",
              maxWidth: "300px",
              boxShadow: "0 4px 12px rgba(0,0,0,0.4)",
            }}
          >
            <h2 style={{ marginBottom: "20px", color: "#2ecc71" }}>¡Nivel completado!</h2>
            <button
              onClick={onExit}
              style={{
                padding: "10px 20px",
                marginBottom: "10px",
                backgroundColor: "#3498db",
                color: "#fff",
                border: "none",
                borderRadius: "6px",
                cursor: "pointer",
              }}
            >
              Volver al menú
            </button>
            {levels[level + 1] && (
              <button
                onClick={() => onNextLevel(level + 1)}
                style={{
                  padding: "10px 20px",
                  backgroundColor: "#2ecc71",
                  color: "#fff",
                  border: "none",
                  borderRadius: "6px",
                  marginTop: "10px",
                  cursor: "pointer",
                }}
              >
                Siguiente nivel →
              </button>
            )}
          </div>
        </div>
      )}

      {showGameOver && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            backgroundColor: "rgba(0, 0, 0, 0.7)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 1000,
          }}
        >
          <div
            style={{
              background: "#ffffff",
              padding: "30px",
              borderRadius: "12px",
              textAlign: "center",
              maxWidth: "300px",
              boxShadow: "0 4px 12px rgba(0,0,0,0.4)",
            }}
          >
            <h2 style={{ marginBottom: "20px", color: "#e74c3c" }}>¡Game Over!</h2>
            <button
              onClick={() => onNextLevel(level)}
              style={{
                padding: "10px 20px",
                backgroundColor: "#e74c3c",
                color: "#fff",
                border: "none",
                borderRadius: "6px",
                fontSize: "16px",
                cursor: "pointer",
              }}
            >
              Reintentar
            </button>
          </div>
        </div>
      )}
    </>
  );
}
