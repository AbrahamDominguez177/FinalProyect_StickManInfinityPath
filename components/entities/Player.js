//app/components/entities/Player.js

export class Player {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.width = 20;
    this.height = 60;
    this.dx = 0;
    this.dy = 0;
    this.onGround = false;
  }

  getFeetBox() {
    return {
      x: this.x + this.width * 0.25,
      y: this.y + this.height - 5,
      width: this.width * 0.5,
      height: 5,
    };
  }


  update(keys, gravity, jumpPower, moveSpeed) {
    if (keys["ArrowLeft"]) this.dx = -moveSpeed;
    else if (keys["ArrowRight"]) this.dx = moveSpeed;
    else this.dx = 0;

    if (keys[" "] && this.onGround) {
      this.dy = jumpPower;
      this.onGround = false;
    }

    this.dy += gravity;
    this.x += this.dx;
    this.y += this.dy;
  }

  draw(ctx) {
    const x = this.x;
    const y = this.y;

    ctx.strokeStyle = "black";
    ctx.lineWidth = 2;

    // Cabeza
    ctx.beginPath();
    ctx.arc(x + this.width / 2, y, 10, 0, Math.PI * 2);
    ctx.stroke();

    // Cuerpo
    ctx.beginPath();
    ctx.moveTo(x + this.width / 2, y + 10);
    ctx.lineTo(x + this.width / 2, y + 40);
    ctx.stroke();

    // Brazos
    ctx.beginPath();
    ctx.moveTo(x + this.width / 2, y + 20);
    ctx.lineTo(x + this.width / 2 - 10, y + 30);
    ctx.moveTo(x + this.width / 2, y + 20);
    ctx.lineTo(x + this.width / 2 + 10, y + 30);
    ctx.stroke();

    // Piernas
    ctx.beginPath();
    ctx.moveTo(x + this.width / 2, y + 40);
    ctx.lineTo(x + this.width / 2 - 10, y + 60);
    ctx.moveTo(x + this.width / 2, y + 40);
    ctx.lineTo(x + this.width / 2 + 10, y + 60);
    ctx.stroke();
  }


}
