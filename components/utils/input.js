export function setupInput(keys) {
  const down = (e) => (keys[e.key] = true);
  const up = (e) => (keys[e.key] = false);
  window.addEventListener("keydown", down);
  window.addEventListener("keyup", up);

  return () => {
    window.removeEventListener("keydown", down);
    window.removeEventListener("keyup", up);
  };
}
