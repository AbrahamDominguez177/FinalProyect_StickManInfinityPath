export const level7 = {
  id: 7,
  playerStart: { x: 50, y: 500 },
  keyItem: { x: 380, y: 50, width: 12, height: 12 },
  platforms: [
    // Base
    { x: 0, y: 580, width: 800, height: 20 }, // suelo base

    // Escalera tipo zig-zag vertical
    { x: 100, y: 520, width: 80, height: 12 },
    { x: 200, y: 460, width: 80, height: 12 },
    { x: 120, y: 400, width: 80, height: 12 },
    { x: 200, y: 340, width: 80, height: 12 },
    { x: 120, y: 280, width: 80, height: 12 },
    { x: 200, y: 220, width: 80, height: 12 },
    { x: 120, y: 160, width: 80, height: 12 },

    // Cruce hacia la derecha
    { x: 220, y: 140, width: 100, height: 12 },
    {
      x: 340,
      y: 140,
      width: 100,
      height: 12,
      moving: true,
      direction: "horizontal",
      range: 80,
      speed: 1.2,
    },

    // Plataforma elevadora
    {
      x: 460,
      y: 100,
      width: 80,
      height: 12,
      moving: true,
      direction: "vertical",
      range: 80,
      speed: 1,
    },

    { x: 380, y: 40, width: 100, height: 12 }, // final

    // Picos al fondo, lejos del spawn
    { x: 500, y: 560, width: 40, height: 40, isDeadly: true },
    { x: 540, y: 560, width: 40, height: 40, isDeadly: true },
    { x: 580, y: 560, width: 40, height: 40, isDeadly: true },
    { x: 620, y: 560, width: 40, height: 40, isDeadly: true },
    { x: 660, y: 560, width: 40, height: 40, isDeadly: true },
  ],
};
