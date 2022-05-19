/*
* Assumptions:
* When moving, pieces can pass thru others without triggering a collision.
* Collisions are detected when the piece comes to rest.
* According to the directions the rook only moves right, so don't worry about right to left or negative movements
* Using 0 indexes for x and y direction
*/

interface Board {
  xValues: number[]
  yValues: number[]
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
  public position: Position
  private board: Board

  constructor(startingPosition: Position, board: Board) {
    this.position = startingPosition
    this.board = board
  }

  public movePiece(direction: RookDirection, distance: number): void {
    if (distance < 0) {
      console.log('Distance must positive')
      return
    }

    switch(direction) {
      case RookDirection.up: {
        const dimensionSize = this.board.yValues.length
        const y = (this.position.y + distance) % dimensionSize

        this.position = {
          ...this.position,
          y
        }
        break
      }
      case RookDirection.right: {
        const dimensionSize = this.board.xValues.length
        const x = (this.position.x + distance) % dimensionSize

        this.position = {
          ...this.position,
          x
        }
        break
      }
      default: {
        console.log('Invalid direction')
        break
      }
    }
    // console.log(`Rook moved to x: ${this.position.x}, y: ${this.position.y}`)
  }
}

class Bishop {
  private position: Position
  private board: Board

  constructor(startingPosition: Position, board: Board) {
    this.position = startingPosition
    this.board = board
  }

  public canCapturePieceAtPosition(otherPiecePosition: Position): boolean {
    return Math.abs(otherPiecePosition.x - this.position.x) === Math.abs((otherPiecePosition.y - this.position.y))
  }
}

function flipCoin(): number {
  return generateBoundedRandomNumber(0, 1)
}

function rollDice(): number {
  return generateBoundedRandomNumber(1, 6) + generateBoundedRandomNumber(1, 6)
}

function generateBoundedRandomNumber(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1) + min)
}

const chessBoard: Board = {
  xValues: [0, 1, 2, 3, 4, 5, 6, 7],
  yValues: [0, 1, 2, 3, 4, 5, 6, 7],
}

const rookStartingPosition: Position = {
  x: 7,
  y: 0,
}

const bishopStartingPosition: Position = {
  x: 2,
  y: 2,
}

const rook = new Rook(rookStartingPosition, chessBoard)
const bishop = new Bishop(bishopStartingPosition, chessBoard)

function moveRookAndGameStatus() {
  const direction = flipCoin()
  const distance = rollDice()
  rook.movePiece(direction, distance)
  return bishop.canCapturePieceAtPosition(rook.position)
}

const totalMoves = 15

function playGame() {
  for(let i = 0; i < totalMoves; i++) {
    const a = moveRookAndGameStatus()
    console.log('a')
    if (a) {
      return 'Bishop wins'
    }
  }
  return 'Rook wins'
}

const result = playGame()
console.log(result)










//
// if(!bishop.canCapturePieceAtPosition({ x: 0, y: 0 })) {
//   console.log('wronge')
// }
//
// if(!bishop.canCapturePieceAtPosition({ x: 1, y: 1 })) {
//   console.log('wronge')
// }
//
// if(!bishop.canCapturePieceAtPosition({ x: 2, y: 2 })) {
//   console.log('wronge')
// }
//
// if(!bishop.canCapturePieceAtPosition({ x: 3, y: 3 })) {
//   console.log('wronge')
// }
//
// if(!bishop.canCapturePieceAtPosition({ x: 7, y: 7 })) {
//   console.log('wronge')
// }
//
// if(!bishop.canCapturePieceAtPosition({ x: 0, y: 4 })) {
//   console.log('wronge')
// }
//
// if(!bishop.canCapturePieceAtPosition({ x: 1, y: 3 })) {
//   console.log('wronge')
// }
//
// if(!bishop.canCapturePieceAtPosition({ x: 2, y: 2 })) {
//   console.log('wronge')
// }
//
// if(!bishop.canCapturePieceAtPosition({ x: 3, y: 1 })) {
//   console.log('wronge')
// }
// if(!'expected: true') {
//   console.log('wronge')
// }
//
// if(!bishop.canCapturePieceAtPosition({ x: 4, y: 0 })) {
//   console.log('wronge')
// }
//
//
//
// if(bishop.canCapturePieceAtPosition({ x: 0, y: 1 })) {
//   console.log('noooo1')
// }
// if(bishop.canCapturePieceAtPosition({ x: 0, y: 2 })) {
//   console.log('noooo2')
// }
// if(bishop.canCapturePieceAtPosition({ x: 0, y: 3 })) {
//   console.log('noooo3')
// }
// // if(bishop.canCapturePieceAtPosition({ x: 0, y: 4 })) {
// //   console.log('noooo4')
// // }
// if(bishop.canCapturePieceAtPosition({ x: 2, y: 1 })) {
//   console.log('noooo5')
// }
// if(bishop.canCapturePieceAtPosition({ x: 2, y: 5 })) {
//   console.log('noooo6')
// }
// if(bishop.canCapturePieceAtPosition({ x: 3, y: 5 })) {
//   console.log('noooo7')
// }
// if(bishop.canCapturePieceAtPosition({ x: 3, y: 0 })) {
//   console.log('noooo8')
// }






// console.log(RookDirection[tossCoin()])
// console.log(RookDirection[tossCoin()])
// console.log(RookDirection[tossCoin()])
// console.log(RookDirection[tossCoin()])
// console.log(RookDirection[tossCoin()])
//
// rook.movePiece(RookDirection.up, 1)
// console.log('expected y: 1')
//
// rook.movePiece(RookDirection.up, 4)
// console.log('expected y: 5')
//
// rook.movePiece(RookDirection.up, 10)
// console.log('expected y: 7')
//
//
// rook.movePiece(RookDirection.right, 1)
// console.log('expected x: 0')
//
// rook.movePiece(RookDirection.right, 4)
// console.log('expected x: 4')
//
// rook.movePiece(RookDirection.right, 10)
// console.log('expected x: 6')


