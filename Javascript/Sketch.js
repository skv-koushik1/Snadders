
// What is the state?
const ROLL_STATE = 0; // Rolling the dice
const MOVE_STATE = 1; // Moving to next spot
const SNADDER_STATE = 2; // Moving along a Snake or Ladder
let state = ROLL_STATE;

// Array of tiles
let tiles = [];
// One player
let player;

// Unecessary for playing the game
// these variables or for storing all the rolls over time
let rolls = [];
let index = 0;
let averageRolls = 0;
let dice;

function setup() {
  createCanvas(1300, 600);
  rolls[index] = 0;

  dice = createButton('ROLL DICE');
  dice.position(610, 50);

  // Size of tile, columns and rows
  let resolution = 60;
  let cols = 600 / resolution;
  let rows = height / resolution;

  // Create all the tiles from bottom to top
  let x = 0;
  let y = (rows - 1) * resolution;
  let dir = 1;
  for (let i = 0; i < cols * rows; i++) {
    let tile = new Tile(x, y, resolution, i, i + 1);
    tiles.push(tile);
    x = x + resolution * dir;
    // Move along a winding path up the rows
    if (x >= 600 || x <= -resolution) {
      dir *= -1;
      x += resolution * dir;
      y -= resolution;
    }
  }

  // Pick Snakes
  tiles[97].snadder = -70;
  tiles[94].snadder = -71;
  tiles[91].snadder = -41;
  tiles[82].snadder = -64;
  tiles[72].snadder = -72;
  tiles[63].snadder = -28;
  tiles[58].snadder = -42;
  tiles[54].snadder = -48;
  tiles[51].snadder = -41;
  tiles[43].snadder = -19;
  tiles[45].snadder = -31;
  tiles[47].snadder = -39;
  tiles[19].snadder = -16;

  // Pick Ladders
  tiles[7].snadder = 18;
  tiles[20].snadder = 61;
  tiles[42].snadder = 34;
  tiles[49].snadder = 41;
  tiles[53].snadder = 39;
  tiles[61].snadder = 34;
  tiles[65].snadder = 21;
  tiles[79].snadder = 20;
  tiles[4].snadder = 48;

  // for (let i = 0; i < 7; i++) {
  //   let index = floor(random(cols, tiles.length - 1));
  //   // -1 makes in a Snake (drop down a number of spots)
  //   tiles[index].snadder = -1 * floor(random(index % cols, index - 1));
  // }

  // for (let i = 0; i < 7; i++) {
  //   let index = floor(random(0, tiles.length - cols));
  //   tiles[index].snadder = floor(
  //     random(cols - (index % cols), tiles.length - index - 1)
  //   );
  // }

  // A new player
  player = new Player();

}

function draw() {
  frameRate(1);
  background("#0e4b48");

  dice.hide();
  // Draw all the tiles, snakes, and ladders
  for (let tile of tiles) {
    tile.show();
  }
  for (let tile of tiles) {
    tile.showSnadders();
  }

  // Rolling the dice
  if (state === ROLL_STATE) {
    dice.show();
    dice.mousePressed(function () {
      player.rollDice();
      textSize(30);
      noStroke();
      textFont(numbers);
      text(player.roll, 610, 150);

      rolls[index]++;
      player.showPreview();
      state = MOVE_STATE;
    });
    // Moving the player
  } else if (state === MOVE_STATE) {
    player.move();
    if (player.isSnadder()) {
      state = SNADDER_STATE;
    } else {
      state = ROLL_STATE;
    }
    // Moving along a Snake or Ladder
  } else if (state == SNADDER_STATE) {
    player.displayInfo();
    noLoop();
  }

  // Draw the player
  player.show();

  // Is the game over?
  if (player.spot >= tiles.length - 1) {
    state = ROLL_STATE;
    dice.hide();
    player.end();
    index++;
    rolls[index] = 0;
    noStroke();
    text('Congratulations!!, you won the game.', 610, 100);
  }
}

function mouseClicked() {
  if (state == SNADDER_STATE) {
    player.moveSnadder();
    state = ROLL_STATE;
  }
  loop();
}