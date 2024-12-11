import express, { Request, Response } from 'express';
import { ChessController } from './controller';

const app = express();
app.use(express.json());

app.post('/game', ChessController.createGame);
app.get('/game/:gameId/board', ChessController.getBoard);
app.post('/game/:gameId/move', ChessController.makeMove);

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Chess game server is running on http://localhost:${PORT}`);
});
