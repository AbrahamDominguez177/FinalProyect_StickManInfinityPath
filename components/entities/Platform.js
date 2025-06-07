export class Platform {
  constructor(x, y, width, height, options = {}) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.moving = options.moving || false;
    this.range = options.range || 0;
    this.direction = options.direction || "horizontal";
    this.speed = options.speed || 1;
    this.isDeadly = options.isDeadly || false;
    this.tipo = options.tipo || null; // 👈 importante: guarda si es "checkpoint"
  }

  draw(ctx) {
    if (this.isDeadly) {
      // 🎯 Picos peligrosos
      const spikeWidth = this.width / 10;
      const spikeHeight = this.height;

      ctx.fillStyle = "#ccc";
      for (let i = 0; i < 10; i++) {
        const spikeX = this.x + i * spikeWidth;
        ctx.beginPath();
        ctx.moveTo(spikeX, this.y + this.height);
        ctx.lineTo(spikeX + spikeWidth / 2, this.y);
        ctx.lineTo(spikeX + spikeWidth, this.y + this.height);
        ctx.closePath();
        ctx.fill();
      }

    } else if (this.tipo === "checkpoint") {
      // ✅ Plataforma checkpoint (verde brillante)
      ctx.fillStyle = "#2ecc71";
      ctx.fillRect(this.x, this.y, this.width, this.height);

    } else {
      // 🟤 Plataforma normal
      ctx.fillStyle = "#5c3b1e";
      ctx.fillRect(this.x, this.y, this.width, this.height);
    }
  }
}

