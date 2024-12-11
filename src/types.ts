export type Position = `${'a'|'b'|'c'|'d'|'e'|'f'|'g'|'h'}${'1'|'2'|'3'|'4'|'5'|'6'|'7'|'8'}`;

export type ChessPiece = {
  type: 'pawn' | 'knight' | 'bishop' | 'rook' | 'queen' | 'king';
  color: 'white' | 'black';
}

export type Move = {
  from: Position;
  to: Position;
}

export type ChessBoard = Map<Position, ChessPiece | null>;