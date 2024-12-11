import { ChessPiece, Move, Position , ChessBoard} from "./types";

const games: Map<string, ChessGame> = new Map();

class ChessGame {
  private board: ChessBoard;

  constructor() {
    this.board = new Map<Position, ChessPiece | null>();
    this.initializeBoard();
  }

  private initializeBoard() {
    const setup = [
      ['rook', 'knight', 'bishop', 'queen', 'king', 'bishop', 'knight', 'rook'],
      Array(8).fill('pawn'),
    ];

    ['1', '2'].forEach((row, i) => {
      'abcdefgh'.split('').forEach((col, j) => {
        const piece = { type: setup[i][j], color: 'white' } as ChessPiece;
        this.board.set(`${col}${row}` as Position, piece);
      });
    });

    ['8', '7'].forEach((row, i) => {
      'abcdefgh'.split('').forEach((col, j) => {
        const piece = { type: setup[i][j], color: 'black' } as ChessPiece;
        this.board.set(`${col}${row}` as Position, piece);
      });
    });

    ['3', '4', '5', '6'].forEach((row) => {
      'abcdefgh'.split('').forEach((col) => {
        this.board.set(`${col}${row}` as Position, null);
      });
    });
  }

  public movePiece(move: Move): boolean {
    const piece = this.board.get(move.from);
    if (!piece) {
      throw new Error('No piece at the source position');
    }

    this.board.set(move.to, piece);
    this.board.set(move.from, null);
    return true;
  }

  public getBoard() {
    return this.board;
  }
}

export const createGame = (gameId: string): void => {
    const game = new ChessGame();
    games.set(gameId, game);
}

export const getGame = (gameId: string): ChessGame | undefined => {
    return games.get(gameId)
}

export const movePiece = (gameId: string, move: Move): boolean => {
    const game = games.get(gameId)
    if(!game) {
        throw new Error('No active game for this gameId');
    }
    game?.movePiece(move)
    return true;
}