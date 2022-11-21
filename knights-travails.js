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
        board[row][col] = " ";
      }
    }
    return board;
  }

  potentialMoves(pos) {
    console.log(pos);
    const col = pos[1];
    const row = pos[0];
    const moves = [
      [row + 2, col + 1],
      [row - 2, col + 1],
      [row + 2, col - 1],
      [row - 2, col - 1],
      [row + 1, col + 2],
      [row - 1, col + 2],
      [row + 1, col - 2],
      [row - 1, col - 2],
    ];
    return moves.filter(
      (move) =>
        move[0] >= 0 &&
        move[1] >= 0 &&
        move[0] < this.size &&
        move[1] < this.size
    );
  }

  mark(pos, marker = "X") {
    const row = pos[0];
    const col = pos[1];
    this.board[row][col] = marker;
  }

  print() {
    let columnNumbers = "  ";
    for (let i = 0; i < this.size; i++) {
      columnNumbers = `${columnNumbers}${i},`;
    }
    console.log(columnNumbers.slice(0, -1));
    this.board.forEach((row, i) => console.log(i, `${row}`));
  }
}

const knightMoves = (start, target) => {
  const board = new Gameboard();

  board.mark(start);
  board.print();

  const moves = board.potentialMoves(start);
  moves.forEach((move) => {
    board.mark(move, 1);
    const nextMoves = board.potentialMoves(move);
    nextMoves.forEach((next) => {
      board.mark(next, 2);
      console.log(next);
    });
  });

  board.print();
};

knightMoves([6, 2], [8, 8]);
