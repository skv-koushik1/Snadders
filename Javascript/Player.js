// A player
class Player {
  // Call a reset function to initialize
  constructor() {
    this.reset();
  }

  // Reset variables
  reset() {
    this.spot = -1; // Where I am now
    this.next = -1; // Where I'm going
    this.roll = -1; // What was my latest roll
  }

  end() {
    let restart = createButton('REPLAY');
    restart.position(610, 10);
    restart.mousePressed(function () {
      window.location.reload();
    });
  }

  displayInfo() {
    if (this.spot == 4 ||
      this.spot == 7 ||
      this.spot == 20 ||
      this.spot == 42 ||
      this.spot == 49 ||
      this.spot == 53 ||
      this.spot == 61 ||
      this.spot == 65 ||
      this.spot == 79) {
      let randomNum = floor(random(1, 8));
      switch (randomNum) {
        case 1:
          image(porus, 650, 50, 550, 500);
          break;
        case 2:
          image(rrchola, 650, 50, 550, 500);
          break;
        case 3:
          image(vikram, 650, 50, 550, 500);
          break;
        case 4:
          image(pratap, 650, 50, 550, 500);
          break;
          case 5:
            image(pratap, 650, 50, 550, 500);
            break;
          default:
          break;
      }
    } else if (this.spot == 97 ||
      this.spot == 91 ||
      this.spot == 94 ||
      this.spot == 82 ||
      this.spot == 72 ||
      this.spot == 63 ||
      this.spot == 58 ||
      this.spot == 54 ||
      this.spot == 51 ||
      this.spot == 43 ||
      this.spot == 45 ||
      this.spot == 47 ||
      this.spot == 19) {
      let randomNum = floor(random(1, 6));

      switch (randomNum) {
        case 1:
          image(clive, 650, 50, 550, 500);
          break;
        case 2:
          image(genghiskhan, 650, 50, 550, 500);
          break;
        case 3:
          image(aurangzeb, 650, 50, 550, 500);
          break;
        case 4:
          image(babur, 650, 50, 550, 500);
          break;
        case 5:
          image(aibak, 650, 50, 550, 500);
          break;
        default:
          break;
      }
    }
    textSize(20);
    fill(0);
    noStroke();
    text('Click to continue. If did not proceed, click once again.', 650, 600);
  }

  // random dice roll 1 - 6
  rollDice() {
    this.roll = floor(random(1, 7));
    this.next = this.spot + this.roll;
  }

  // Update spot to next
  move() {
    this.spot = this.next;
  }

  // Highlight the tiles ahead
  showPreview() {
    let start = max(0, this.spot);
    let end = min(this.next, tiles.length - 1);
    for (let i = start; i <= end; i++) {
      tiles[i].highlight();
    }
  }

  // Is player on a Snake or Ladder?
  isSnadder() {
    let tile = tiles[this.spot];
    return tile && tile.snadder !== 0;
  }

  // Move according to the Snake or Ladder
  moveSnadder() {
    let tile = tiles[this.spot];
    this.spot += tile.snadder;
  }

  // Display on the current tile
  show() {
    let current = tiles[this.spot];
    // Just get out of here if it's not a valid tile
    if (!current) return;
    fill(255);
    strokeWeight(2);
    stroke(0);
    let center = current.getCenter();
    ellipse(center[0], center[1], 20);
  }
}