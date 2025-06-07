//app/components/levels/level4.js

export const level4 = {
  id: 4,
  playerStart: { x: 50, y: 450 },
  keyItem: { x: 680, y: 200, width: 12, height: 12 },
  platforms: [
    { x: 0, y: 550, width: 150, height: 50 }, // suelo inicial
    { x: 250, y: 480, width: 100, height: 10, moving: true, range: 100, direction: "horizontal", speed: 1 },
    { x: 420, y: 400, width: 100, height: 10, moving: true, range: 60, direction: "vertical", speed: 0.8 },
    { x: 600, y: 320, width: 100, height: 10 },
  ],
};
