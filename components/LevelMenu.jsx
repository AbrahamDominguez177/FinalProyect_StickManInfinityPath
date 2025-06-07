"use client";

import { useEffect, useState } from "react";

export default function LevelMenu({ onSelectLevel }) {
  const [completed, setCompleted] = useState([]);
  const [sortedTimes, setSortedTimes] = useState([]);

  useEffect(() => {
    const list = [];
    const times = [];

    for (let i = 1; i <= 10; i++) {
      if (localStorage.getItem(`nivel_completado_${i}`) === "true") {
        list.push(i);

        const tiempo = parseInt(localStorage.getItem(`tiempo_nivel_${i}`));
        if (!isNaN(tiempo)) {
          times.push({ level: i, time: tiempo });
        }
      }
    }

    setCompleted(list);
    setSortedTimes(insertionSort(times));
  }, []);

  function insertionSort(arr) {
    for (let i = 1; i < arr.length; i++) {
      let current = arr[i];
      let j = i - 1;
      while (j >= 0 && arr[j].time > current.time) {
        arr[j + 1] = arr[j];
        j--;
      }
      arr[j + 1] = current;
    }
    return arr;
  }

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        paddingTop: "60px",
        minHeight: "100vh",
        background: "linear-gradient(to bottom right, #1e1e2f, #2e2e40)",
        color: "#fff",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <h1 style={{ marginBottom: "20px", fontSize: "32px", fontWeight: "bold" }}>
        🎮 Selección de Nivel
      </h1>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(120px, 1fr))",
          gap: "16px",
          width: "80%",
          maxWidth: "600px",
        }}
      >
        {Array.from({ length: 10 }, (_, i) => {
          const num = i + 1;
          const isCompleted = completed.includes(num);
          return (
            <button
              key={num}
              onClick={() => onSelectLevel(num)}
              style={{
                padding: "18px 0",
                fontSize: "16px",
                fontWeight: "bold",
                borderRadius: "8px",
                border: "2px solid #444",
                backgroundColor: isCompleted ? "#2ecc71" : "#444",
                color: "#fff",
                transition: "transform 0.2s, background 0.2s",
                cursor: "pointer",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.05)")}
              onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
            >
              {isCompleted ? "✅" : "🕹️"} Nivel {num}
            </button>
          );
        })}
      </div>

      <p style={{ marginTop: "30px", color: "#aaa", fontSize: "14px" }}>
        Los niveles completados se marcan en verde ✅
      </p>

      {sortedTimes.length > 0 && (
        <div
          style={{
            marginTop: "40px",
            backgroundColor: "#1a1a2d",
            padding: "20px",
            borderRadius: "10px",
            width: "90%",
            maxWidth: "400px",
            boxShadow: "0 4px 10px rgba(0, 0, 0, 0.5)",
          }}
        >
          <h2 style={{ fontSize: "20px", marginBottom: "10px", color: "#f1c40f" }}>
            🕒 Mejores tiempos (ordenados)
          </h2>
          <ul style={{ listStyle: "none", padding: 0, fontSize: "16px" }}>
            {sortedTimes.map((item, index) => (
              <li key={index}>
                Nivel {item.level}: {item.time} segundos
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
