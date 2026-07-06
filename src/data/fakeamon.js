// ---- FAKEAMON ----  Each fighter: name, type, stats, and its 4 moves.
const GROWLER = {
  name: "Growler", type: "fire", sprite: "assets/sprites/growler.png",
  maxHP: 40, attack: 13, defense: 10, speed: 12,
  moves: ["tackle", "bite", "burn", "flare"],
};

const WHALEY = {
  name: "Whaley", type: "water", sprite: "assets/sprites/whaley.png",
  maxHP: 44, attack: 12, defense: 12, speed: 9,
  moves: ["tackle", "splash", "spout", "breech"],
};

const LEAFICK = {
  name: "Leafick", type: "grass", sprite: "assets/sprites/leafick.png",
  maxHP: 42, attack: 11, defense: 13, speed: 10,
  moves: ["tackle", "leafage", "pounce", "confusion"],
};

// ---- STARTERS ----  The 3 choices on the "Choose your starter" screen.
const STARTERS = [GROWLER, WHALEY, LEAFICK];
