import { createGame, getGame, movePiece } from '../src/models';
import { validateMove } from '../src/service';
import { Move, Position } from '../src/types';


describe('Chess Game Tests', () => {
  const gameId = 'test-game';

  beforeEach(() => {
    createGame(gameId);
  });

  test('should create a new game', () => {
    const game = getGame(gameId);
    expect(game).toBeDefined();
    expect(game?.getBoard().size).toBe(64); 
  });

  test('should retrieve a created game', () => {
    const game = getGame(gameId);
    expect(game).toBeDefined();
  });

  test('should make a valid pawn move', () => {
    const move: Move = { from: 'e2', to: 'e4' };
    const game = getGame(gameId);

    expect(validateMove(game!.getBoard(), move)).toBe(true);
    const success = movePiece(gameId, move);

    expect(success).toBe(true);
    expect(game?.getBoard().get('e4')?.type).toBe('pawn');
    expect(game?.getBoard().get('e2')).toBeNull();
  });

  test('should throw error for invalid move (no piece at source)', () => {
    const move: Move = { from: 'e3', to: 'e5' }; 
    const game = getGame(gameId);

    expect(() => validateMove(game!.getBoard(), move)).toThrowError('Invalid');
  });

  test('should throw error for moving a piece from non-existent game', () => {
    const invalidGameId = 'invalid-game';
    const move: Move = { from: 'e2', to: 'e4' };

    expect(() => movePiece(invalidGameId, move)).toThrowError('No active game for this gameId');
  });

  test('should correctly initialize board pieces', () => {
    const game = getGame(gameId);
    const board = game?.getBoard();

    expect(board?.get('e2')?.type).toBe('pawn'); 
    expect(board?.get('e7')?.type).toBe('pawn'); 
    expect(board?.get('d1')?.type).toBe('queen'); 
    expect(board?.get('d8')?.type).toBe('queen'); 
    expect(board?.get('e1')?.type).toBe('king'); 
    expect(board?.get('e8')?.type).toBe('king'); 
  });

  test('should make a valid knight move', () => {
    const move: Move = { from: 'g1', to: 'f3' }; 
    const game = getGame(gameId);

    expect(validateMove(game!.getBoard(), move)).toBe(true);
    const success = movePiece(gameId, move);

    expect(success).toBe(true);
    expect(game?.getBoard().get('f3')?.type).toBe('knight');
    expect(game?.getBoard().get('g1')).toBeNull();
  });

  test('should return false for invalid pawn move', () => {
    const move: Move = { from: 'e2', to: 'e5' }; 
    const game = getGame(gameId);

    expect(validateMove(game!.getBoard(), move)).toBe(false);
  });

  test('should capture opponent piece with pawn', () => {
    const game = getGame(gameId);
    game!.getBoard().set('d5', { type: 'pawn', color: 'black' }); 

    const move: Move = { from: 'c4', to: 'd5' }; 
    expect(validateMove(game!.getBoard(), move)).toBe(true);

    const success = movePiece(gameId, move);
    expect(success).toBe(true);
    expect(game?.getBoard().get('d5')?.color).toBe('white'); 
    expect(game?.getBoard().get('c4')).toBeNull();
  });
});
