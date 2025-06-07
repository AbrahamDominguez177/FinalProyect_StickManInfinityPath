export function checkCollision(a, b) {
  return (
    a.x < b.x + b.width &&
    a.x + a.width > b.x &&
    a.y < b.y + b.height &&
    a.y + a.height > b.y
  );
}

export function resolveCollision(player, platform) {
  const feetBox = player.getFeetBox();

  if (checkCollision(feetBox, platform) && player.dy >= -1) {
    player.y = platform.y - player.height;
    player.dy = 0;
    player.onGround = true;
    return "landed"; // NUEVO: devolvemos si aterrizó
  }

  if (!checkCollision(player, platform)) return;

  const prevX = player.x - player.dx;
  const prevY = player.y - player.dy;

  const fromLeft = prevX + player.width <= platform.x;
  const fromRight = prevX >= platform.x + platform.width;
  const fromBottom = prevY >= platform.y + platform.height;

  if (fromBottom) {
    player.y = platform.y + platform.height;
    player.dy = 0;
  } else if (fromLeft) {
    player.x = platform.x - player.width;
    player.dx = 0;
  } else if (fromRight) {
    player.x = platform.x + platform.width;
    player.dx = 0;
  }
}

