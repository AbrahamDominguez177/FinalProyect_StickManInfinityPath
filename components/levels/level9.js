export const level9 = {
  id: 9,
  playerStart: { x: 40, y: 540 },
  keyItem: { x: 720, y: 160, width: 12, height: 12 }, // Llave de victoria (amarilla)
  ordenarKey: { x: 50, y: 50, width: 20, height: 20 }, // Llave ordenadora (roja)
  platforms: [
    { x: 0, y: 580, width: 800, height: 20 }, // suelo

    { x: 700, y: 560, width: 25, height: 20, isDeadly: true },
    { x: 725, y: 560, width: 25, height: 20, isDeadly: true },
    { x: 750, y: 560, width: 25, height: 20, isDeadly: true },
    { x: 775, y: 560, width: 25, height: 20, isDeadly: true },

    // Plataformas de acceso a la llave ordenadora
    { x: 60, y: 500, width: 80, height: 12 },
    { x: 40, y: 400, width: 80, height: 12 },
    { x: 120, y: 300, width: 80, height: 12 },
    { x: 40, y: 200, width: 80, height: 12 },

    // Plataformas desordenadas a ordenar
    { x: 400, y: 370, width: 40, height: 240 },
    { x: 450, y: 480, width: 40, height: 100 },
    { x: 500, y: 500, width: 40, height: 80 },
    { x: 550, y: 460, width: 40, height: 120 },
    { x: 600, y: 300, width: 40, height: 280 },
    { x: 650, y: 430, width: 40, height: 150 },
    { x: 700, y: 400, width: 40, height: 180 },

  ],
};
