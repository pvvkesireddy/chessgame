import { ChessBoard, Move, ChessPiece, Position } from "./types"

export const validateMove = (board: ChessBoard, move: Move): boolean => {

    const currentChessPiece = board.get(move.from);
    if(!currentChessPiece) {
        throw new Error("Invalid")
    }
    if(isMoveValid(board, currentChessPiece, move)){
        return true;
    }

    return false;
}

const isMoveValid = (board: ChessBoard, piece: ChessPiece, move: Move): boolean => {
    const [fromCol, fromRow] = move.from.split('') as [string, string];
    const [toCol, toRow] = move.to.split('') as [string, string];
    const colDiff = Math.abs(fromCol.charCodeAt(0) - toCol.charCodeAt(0));
    const rowDiff = Math.abs(parseInt(fromRow) - parseInt(toRow));

    switch (piece.type) {
      case 'pawn':
        return validatePawnMove(board, move.to, piece, fromRow, toRow, colDiff, rowDiff);
      case 'rook':
        return colDiff === 0 || rowDiff === 0;
      case 'knight':
        return (colDiff === 2 && rowDiff === 1) || (colDiff === 1 && rowDiff === 2);
      case 'bishop':
        return colDiff === rowDiff;
      case 'queen':
        return colDiff === rowDiff || colDiff === 0 || rowDiff === 0;
      case 'king':
        return colDiff <= 1 && rowDiff <= 1;
      default:
        return false;
    }
  }

  const  validatePawnMove = (board: ChessBoard, moveTo: Position, piece: ChessPiece, fromRow: string, toRow: string, colDiff: number, rowDiff: number): boolean => {
    const direction = piece.color === 'white' ? 1 : -1;
    const startRow = piece.color === 'white' ? '2' : '7';

    if (colDiff === 0) {
      if (rowDiff === 1 && parseInt(toRow) - parseInt(fromRow) === direction) {
        return true;
      }
      if (rowDiff === 2 && fromRow === startRow && parseInt(toRow) - parseInt(fromRow) === 2 * direction) {
        return true;
      }
    } else if (colDiff === 1 && rowDiff === 1) {
      const targetPiece = board.get(moveTo);
      if (targetPiece && targetPiece.color !== piece.color) {
        return true;
      }
    }

    return false;
  }