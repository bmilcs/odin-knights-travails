class Gameboard {
  constructor(size = 9) {
    this.board = this.create(size);
    this.size = size;
  }

  create(size) {
    const board = [];
    for (let row = 0; row < size; row++) {
      board[row] = [];
      for (let col = 0; col < size; col++) {
        board[row][col] = "_";
      }
    }
    return board;
  }

  getKnightMoves(pos) {
    const [col, row] = pos;
    const moves = [
      [col + 2, row + 1],
      [col - 2, row + 1],
      [col + 2, row - 1],
      [col - 2, row - 1],
      [col + 1, row + 2],
      [col - 1, row + 2],
      [col + 1, row - 2],
      [col - 1, row - 2],
    ];
    return moves.filter((move) => this.isPositionOnBoard(move));
  }

  markMove(move, marker = "x") {
    const [col, row] = move;
    this.board[row][col] = marker;
  }

  markMoveHistory(movesArray) {
    movesArray.forEach((move, i) => this.markMove(move, i));
  }

  isPositionOnBoard(pos) {
    const [col, row] = pos;
    if (col >= 0 && row >= 0 && col < this.size && row < this.size) return true;
    return false;
  }

  print() {
    let columnNumbers = "  ";
    for (let i = 0; i < this.size; i++) {
      columnNumbers = `${columnNumbers}${i},`;
    }
    console.log(`\n${columnNumbers.slice(0, -1)}`);
    this.board.forEach((row, i) => console.log(i, `${row}`));
  }
}

const knightMoves = (start, target) => {
  const board = new Gameboard();
  const [targetRow, targetCol] = target;

  // prevent illegal user input
  if (!board.isPositionOnBoard(start) || !board.isPositionOnBoard(target)) {
    console.log(
      `\nerror!\n- invalid input: one of your positions doesn't land on the board!\n- start: [${start}] | target: [${target}]\n`
    );
    return;
  }

  const moveHistory = new Set();
  const queue = [[start, []]];

  while (queue.length) {
    let [currentPosition, history] = queue.shift();
    const [currentRow, currentCol] = currentPosition;

    moveHistory.add(currentPosition);
    history = [...history, currentPosition];

    if (currentRow === targetRow && currentCol === targetCol) {
      console.log("\nKNIGHT TRAVAILS __________________________\n");
      console.log(`start position:    ${start}`);
      console.log(`target position:   ${target}`);
      console.log(`moves count:       ${history.length - 1}`);
      console.log(`move breakdown:    ${history.join(" -> ")}`);
      console.log("gameboard:");
      board.markMoveHistory(history);
      board.print();
      return;
    }

    const nextMove = board.getKnightMoves(currentPosition);

    nextMove.forEach((move) => {
      let historyContainsNextMove = 0;
      for (const prevMov of moveHistory) {
        if (prevMov.toString() === move.toString()) {
          historyContainsNextMove = 1;
        }
      }

      if (!historyContainsNextMove) {
        moveHistory.add(currentPosition);
        queue.push([move, history]);
      }
    });
  }
};

knightMoves([0, 0], [1, 2]);
knightMoves([0, 0], [3, 3]);
knightMoves([3, 3], [0, 0]);
knightMoves([3, 3], [8, 9]);
