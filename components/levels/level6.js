export const level6 = {
  id: 6,
  playerStart: { x: 50, y: 450 },
  keyItem: { x: 720, y: 150, width: 12, height: 12 },
  platforms: [
    { x: 0, y: 540, width: 200, height: 60 }, // suelo inicial

    // plataformas fijas
    { x: 300, y: 460, width: 100, height: 12 },
    { x: 550, y: 360, width: 100, height: 12 },
    { x: 700, y: 250, width: 100, height: 12 },

    // plataforma móvil horizontal
    {
      x: 400,
      y: 500,
      width: 100,
      height: 12,
      moving: true,
      direction: "horizontal",
      range: 120,
      speed: 1.5,
    },

    // plataforma móvil vertical
    {
      x: 620,
      y: 420,
      width: 80,
      height: 12,
      moving: true,
      direction: "vertical",
      range: 100,
      speed: 1.2,
    },

    // picos a lo largo del fondo
    { x: 250, y: 540, width: 40, height: 40, isDeadly: true },
    { x: 300, y: 540, width: 40, height: 40, isDeadly: true },
    { x: 350, y: 540, width: 40, height: 40, isDeadly: true },
    { x: 400, y: 540, width: 40, height: 40, isDeadly: true },
    { x: 600, y: 540, width: 40, height: 40, isDeadly: true },
    { x: 660, y: 540, width: 40, height: 40, isDeadly: true },
  ],
};
