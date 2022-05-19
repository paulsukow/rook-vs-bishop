/*
* Assumptions/Notes:
* When moving, pieces can pass thru others without a collision.
* According to the directions the rook only moves right or up, so don't worry about left, down, or negative movements
* Using 0 indexes for x and y direction
* ChessBoard is static size
*/

interface Board {
  width: number
  height: number
}

interface Position {
  x: number
  y: number
}

enum RookDirection {
  'right',
  'up',
}

class Rook {
  private x: number
  private y: number
  private board: Board

  get position(): Position {
    return { x: this.x, y: this.y }
  }

  constructor(startingPosition: Position, board: Board) {
    this.x = startingPosition.x
    this.y = startingPosition.y
    this.board = board
  }

  public move(direction: RookDirection, distance: number): void {
    if (distance < 0) {
      console.log('Invalid distance. Distance cannot be negative.')
      return
    }

    switch(direction) {
      case RookDirection.up: {
        this.y = (this.y + distance) % this.board.height
        this.logMove()
        break
      }
      case RookDirection.right: {
        this.x = (this.x + distance) % this.board.width
        this.logMove()
        break
      }
      default: {
        console.log('Invalid direction. Cannot make move.')
        break
      }
    }
  }

  private logMove() {
    console.log(`Rook moved to ${convertToFileRank(this.x, this.y)}.`)
  }
}

class Bishop {
  private x: number
  private y: number

  constructor(startingPosition: Position) {
    this.x = startingPosition.x
    this.y = startingPosition.y
  }

  public canCapturePieceAtPosition(position: Position): boolean {
    return Math.abs(position.x - this.x) === Math.abs((position.y - this.y))
  }
}

function convertToFileRank(x: number, y: number): string {
  return `${String.fromCharCode(x + 65)}${y + 1}`
}

function convertFromFileRank(fileRank: string): Position {
  return {
    x: fileRank[0].toUpperCase().charCodeAt(0) - 65,
    y: Number(fileRank[1]) - 1,
  }
}

function flipCoin(): number {
  return generateRandomNumberInclusive(0, 1)
}

function rollDice(): number {
  return generateRandomNumberInclusive(1, 6) + generateRandomNumberInclusive(1, 6)
}

function generateRandomNumberInclusive(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1) + min)
}

function playGame() {
  const chessBoard: Board = {
    width: 8,
    height: 8,
  }

  const rookStartingPosition: Position = convertFromFileRank('H1')
  const rook = new Rook(rookStartingPosition, chessBoard)

  const bishopStartingPosition: Position = convertFromFileRank('C3')
  const bishop = new Bishop(bishopStartingPosition)

  const totalMoves = 15

  let captured = false
  for (let i = 0; i < totalMoves; i++) {
    const direction = flipCoin()
    const distance = rollDice()
    rook.move(direction, distance)
    captured = bishop.canCapturePieceAtPosition(rook.position)
    if (captured) {
      break
    }
  }

  const result = captured ? 'Bishop wins' : 'Rook wins'
  console.log(result)
}

playGame()
