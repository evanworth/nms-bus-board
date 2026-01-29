
const buses = Array.from({ length: 11 }, (_, i) => `Bus ${i + 1}`);
const states = JSON.parse(localStorage.getItem("busStates")) || {};

buses.forEach(b => states[b] = states[b] || "waiting");

function save() {
  localStorage.setItem("busStates", JSON.stringify(states));
}

function renderBoard() {
  const board = document.getElementById("busBoard");
  if (!board) return;
  board.innerHTML = "";
  buses.forEach(bus => {
    const div = document.createElement("div");
    div.className = `bus ${states[bus]}`;
    div.innerText = bus.toUpperCase();
    board.appendChild(div);
  });
}

function renderControls() {
  const controls = document.getElementById("controls");
  if (!controls) return;
  buses.forEach(bus => {
    const btn = document.createElement("button");
    btn.innerText = bus;
    btn.onclick = () => {
      states[bus] = states[bus] === "waiting" ? "calling" :
                    states[bus] === "calling" ? "called" : "waiting";
      save();
      renderBoard();
    };
    controls.appendChild(btn);
  });
}

function clearAll() {
  buses.forEach(bus => states[bus] = "waiting");
  save();
  renderBoard();
}

renderBoard();
renderControls();
