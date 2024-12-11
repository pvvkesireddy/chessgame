import { Request, Response } from 'express';
import {createGame, getGame} from './models';
import {Move} from './types';
import { validateMove } from './service';

export class ChessController {
    
    static createGame(req: Request, res: Response) {
      const gameId = `game-${Date.now()}`;
      createGame(gameId);
      res.status(201).json({ gameId, message: 'Game created successfully' });
    }
  
    static getBoard(req: Request, res: Response) {
      const gameId = req.params.gameId;
      const game = getGame(gameId);
  
      if (!game) {
        res.status(404).json({ error: 'Game not found' });
        return;
      }
  
      res.json({ board: Array.from(game.getBoard().entries()) });
    }
  
    static makeMove(req: Request, res: Response) {
      const gameId = req.params.gameId;
      const game = getGame(gameId);
  
      if (!game) {
        res.status(404).json({ error: 'Game not found' });
        return;
      }
  
      const move: Move = req.body;

      if(!validateMove(game.getBoard(), move)){
        res.status(400).json({ error: "Invalid Move" });
        return;
      }
  
      try {
        const success = game.movePiece(move);
        res.json({ success, message: 'Move made successfully' });
      } catch (error) {
        res.status(400).json({ error: (error as Error).message });
      }
    }
  }