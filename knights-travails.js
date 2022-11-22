class Gameboard {
  constructor(size = 9) {
    this.size = size;
    this.board = this.create();
  }

  create(size = this.size) {
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

const knightMoves = (start, target, boardSize = 9) => {
  const board = new Gameboard(boardSize);
  const [targetRow, targetCol] = target;

  // prevent illegal user input
  if (!board.isPositionOnBoard(start) || !board.isPositionOnBoard(target)) {
    console.log("\nerror:");
    console.log(
      `- invalid input! valid range: 0-${board.size - 1} for board size ${
        board.size
      }`
    );
    console.log(`- start: [${start}] | target: [${target}]`);
    return;
  }

  // track all previously made moves to prevent duplicates
  const allPreviousMoves = new Set();

  // breadth-first search queue: contains a position & history of previous moves
  const queue = [[start, []]];

  while (queue.length) {
    let [currentPosition, currentPositionsHistory] = queue.shift();
    const [currentRow, currentCol] = currentPosition;

    currentPositionsHistory = [...currentPositionsHistory, currentPosition];

    if (currentRow === targetRow && currentCol === targetCol) {
      console.log("\nKNIGHT TRAVAILS __________________________\n");
      console.log(`start position:   ${start}`);
      console.log(`target position:  ${target}`);
      console.log(`minimum moves:    ${currentPositionsHistory.length - 1}`);
      console.log(`move history:     ${currentPositionsHistory.join(" => ")}`);
      board.markMoveHistory(currentPositionsHistory);
      board.print();
      return;
    }

    allPreviousMoves.add(currentPosition);

    const nextMove = board.getKnightMoves(currentPosition);

    nextMove.forEach((potentialMove) => {
      let moveHasBeenMade = 0;
      for (const previousMove of allPreviousMoves) {
        if (previousMove.toString() === potentialMove.toString())
          moveHasBeenMade = 1;
      }

      if (!moveHasBeenMade) {
        allPreviousMoves.add(currentPosition);
        queue.push([potentialMove, currentPositionsHistory]);
      }
    });
  }
};

// Test Data

knightMoves([3, 3], [0, 10]); // error checking: out of bounds
knightMoves([0, 0], [8, 5]);
knightMoves([8, 5], [0, 0]);
knightMoves([3, 0], [8, 8]);
knightMoves([8, 8], [3, 0]);
knightMoves([0, 2], [9, 11], 12);
