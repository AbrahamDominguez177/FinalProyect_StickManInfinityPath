export const level10 = {
  id: 10,
  playerStart: { x: 40, y: 520 },
  keyItem: { x: 740, y: 40, width: 12, height: 12 },
  platforms: [
    // Zona segura donde aparece el jugador
    { x: 0, y: 580, width: 120, height: 20 }, // suelo inicial

    // Plataformas hacia arriba
    { x: 150, y: 500, width: 100, height: 12 },
    {
      x: 300,
      y: 460,
      width: 100,
      height: 12,
      moving: true,
      direction: "horizontal",
      range: 100,
      speed: 1.4,
    },
    { x: 460, y: 400, width: 100, height: 12 },
    {
      x: 600,
      y: 300,
      width: 100,
      height: 12,
      moving: true,
      direction: "vertical",
      range: 100,
      speed: 1.2,
    },
    { x: 720, y: 150, width: 80, height: 12 },
    { x: 740, y: 50, width: 100, height: 12 }, // donde está la llave

    // Picos en todo el fondo excepto el área de aparición
    ...Array.from({ length: 17 }, (_, i) => {
      const x = i * 40;
      // Saltamos los primeros 3 bloques (120px) donde está el spawn
      if (x < 120) return null;
      return {
        x,
        y: 560,
        width: 40,
        height: 40,
        isDeadly: true,
      };
    }).filter(Boolean),
  ],
};
