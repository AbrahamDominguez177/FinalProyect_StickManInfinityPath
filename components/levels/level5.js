export const level5 = {
  id: 5,
  enableJumpQueue: true, // ✅ Activamos la cola de saltos
  playerStart: { x: 40, y: 480 },
  keyItem: { x: 750, y: 250, width: 12, height: 12 },
  platforms: [
  { x: 0, y: 540, width: 200, height: 60 }, // suelo inicial
  { x: 220, y: 460, width: 100, height: 12, tipo: "checkpoint" },
  { x: 370, y: 400, width: 100, height: 12 },
  { x: 520, y: 340, width: 100, height: 12, tipo: "checkpoint" },
  { x: 680, y: 280, width: 100, height: 12 },

  // picos
  { x: 250, y: 540, width: 40, height: 40, isDeadly: true },
  { x: 450, y: 540, width: 40, height: 40, isDeadly: true },
  { x: 650, y: 540, width: 40, height: 40, isDeadly: true },
  { x: 750, y: 540, width: 50, height: 40, isDeadly: true },
  ],
};
