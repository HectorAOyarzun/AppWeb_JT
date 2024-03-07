const lineas = document.querySelectorAll('.linea');

function moverLinea(evento) {
  const linea = evento.target;
  const x = evento.clientX;
  const y = evento.clientY;
  linea.style.left = `${x}px`;
  linea.style.top = `${y}px`;
}

for (const linea of lineas) {
  linea.addEventListener('mousedown', moverLinea);
}

