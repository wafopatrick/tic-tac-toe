import { Injectable } from '@angular/core';
import { GameMode, AILevel } from '../constants';

@Injectable({
  providedIn: 'root',
})
export class GameService {
  board: string[][] = [['', '', ''], ['', '', ''], ['', '', '']];
  winner: string | null = null;
  currentPlayer: string = 'X'; // Player 'X' starts
  gameMode: GameMode = GameMode.HumanVsHuman; // Default to playing against human
  aiLevel: AILevel = AILevel.Easy; // Default AI level
  winningCells: [number, number][] = []; // Track winning cells

  initializeBoard() {
    this.board = [['', '', ''], ['', '', ''], ['', '', '']];
    this.winner = null;
    this.currentPlayer = 'X'; // Reset to Player X
    this.winningCells = []; // Reset winning cells
  }

  // Set the AI level (Easy, Medium, Hard)
  setAILevel(level: AILevel) {
    this.aiLevel = level;
  }

  // Set the Game mode (Human vs Human, Human vs AI)
  setGameMode(gameMode: GameMode) {
    this.gameMode = gameMode;
  }

  // Handle a move by a player or AI
  onCellClick(row: number, col: number) {
    if (this.board[row][col] || this.winner) return; // Do nothing if cell is occupied or game is over

    // Player makes a move
    this.board[row][col] = this.currentPlayer;

    // Check for a winner after the move
    if (this.checkWinner()) {
      this.winner = this.currentPlayer;
      return;
    }

    // Switch the player
    this.currentPlayer = this.currentPlayer === 'X' ? 'O' : 'X';

    // If game mode is AI and it's AI's turn, make an AI move
    if (this.gameMode === GameMode.HumanVsAI && this.currentPlayer === 'O') {
      this.makeAIMove();
    }
  }

  // AI makes a move based on the selected level
  makeAIMove() {
    if (this.isBoardFull()) return; // Do nothing if the board is full

    let row = -1;
    let col = -1;

    // Select move based on AI level
    switch (this.aiLevel) {
      case AILevel.Easy:
        // Easy AI: Pick a random available cell
        [row, col] = this.getRandomMove();
        break;
      case AILevel.Medium:
        // Medium AI: Try to block or make a random move
        [row, col] = this.getMediumMove();
        break;
      case AILevel.Hard:
        // Hard AI: Implement a more intelligent strategy
        [row, col] = this.getHardMove();
        break;
    }

    // Apply the selected AI move
    this.board[row][col] = 'O';

    // Check for a winner after the move
    if (this.checkWinner()) {
      this.winner = 'O';
      return;
    }

    // Switch back to player X
    this.currentPlayer = 'X';
  }

  // Get random AI move (returning a tuple [row, col])
  getRandomMove(): [number, number] {
    let availableMoves: [number, number][] = [];

    // Find all empty cells on the board
    for (let row = 0; row < 3; row++) {
      for (let col = 0; col < 3; col++) {
        if (this.board[row][col] === '') {
          availableMoves.push([row, col]);
        }
      }
    }

    // Randomly pick a move from available moves
    const randomIndex = Math.floor(Math.random() * availableMoves.length);
    return availableMoves[randomIndex];
  }

  // Get a strategic move for Medium AI (block or random)
  getMediumMove(): [number, number] {
    // First, try to block the player if they are one move away from winning
    for (let row = 0; row < 3; row++) {
      for (let col = 0; col < 3; col++) {
        if (this.board[row][col] === '') {
          this.board[row][col] = 'X'; // Temporarily pretend player made the move
          if (this.checkWinner()) {
            this.board[row][col] = 'O'; // Block the player
            return [row, col];
          }
          this.board[row][col] = ''; // Undo the move
        }
      }
    }

    // If no blocking move, pick a random move
    return this.getRandomMove();
  }

  // Get a more advanced move for Hard AI using the minimax algorithm
  getHardMove(): [number, number] {
    let bestMove: [number, number] = [-1, -1];
    let bestScore = -Infinity;

    for (let row = 0; row < 3; row++) {
      for (let col = 0; col < 3; col++) {
        if (this.board[row][col] === '') {
          this.board[row][col] = 'O';
          let score = this.minimax(this.board, 0, false);
          this.board[row][col] = '';
          if (score > bestScore) {
            bestScore = score;
            bestMove = [row, col];
          }
        }
      }
    }

    return bestMove;
  }

  // Minimax algorithm
  minimax(board: string[][], depth: number, isMaximizing: boolean): number {
    if (this.checkWinner()) {
      return isMaximizing ? -1 : 1;
    }
    if (this.isBoardFull()) {
      return 0;
    }

    return isMaximizing 
      ? this.maximize(board, depth)
      : this.minimize(board, depth);
  }

  private maximize(board: string[][], depth: number): number {
    let bestScore = -Infinity;
    for (let row = 0; row < 3; row++) {
      for (let col = 0; col < 3; col++) {
        if (board[row][col] === '') {
          board[row][col] = 'O';
          bestScore = Math.max(this.minimax(board, depth + 1, false), bestScore);
          board[row][col] = '';
        }
      }
    }
    return bestScore;
  }

  private minimize(board: string[][], depth: number): number {
    let bestScore = Infinity;
    for (let row = 0; row < 3; row++) {
      for (let col = 0; col < 3; col++) {
        if (board[row][col] === '') {
          board[row][col] = 'X';
          bestScore = Math.min(this.minimax(board, depth + 1, true), bestScore);
          board[row][col] = '';
        }
      }
    }
    return bestScore;
  }

  // Check if the board is full
  isBoardFull(): boolean {
    for (let row = 0; row < 3; row++) {
      for (let col = 0; col < 3; col++) {
        if (this.board[row][col] === '') {
          return false;
        }
      }
    }
    return true;
  }

  // Check for a winner
  checkWinner(): boolean {
    // Check rows, columns, and diagonals for a winner
    for (let i = 0; i < 3; i++) {
      if (this.board[i][0] && this.board[i][0] === this.board[i][1] && this.board[i][1] === this.board[i][2]) {
        this.winningCells = [[i, 0], [i, 1], [i, 2]];
        return true;
      }
      if (this.board[0][i] && this.board[0][i] === this.board[1][i] && this.board[1][i] === this.board[2][i]) {
        this.winningCells = [[0, i], [1, i], [2, i]];
        return true;
      }
    }

    if (this.board[0][0] && this.board[0][0] === this.board[1][1] && this.board[1][1] === this.board[2][2]) {
      this.winningCells = [[0, 0], [1, 1], [2, 2]];
      return true;
    }

    if (this.board[0][2] && this.board[0][2] === this.board[1][1] && this.board[1][1] === this.board[2][0]) {
      this.winningCells = [[0, 2], [1, 1], [2, 0]];
      return true;
    }

    this.winningCells = []; // Reset winning cells if no winner
    return false;
  }

  // Check if a cell is part of the winning combination
  isWinningCell(row: number, col: number): boolean {
    return this.winningCells.some(cell => cell[0] === row && cell[1] === col);
  }

  // Reset the game
  resetGame() {
    this.initializeBoard();
    this.winner = null;
    this.currentPlayer = 'X';
  }
}