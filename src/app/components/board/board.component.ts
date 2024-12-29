import { Component, Input, OnInit } from '@angular/core';
import { GameService } from '../../services/game.service'; // Import the service
import { CommonModule } from '@angular/common';
import { GameMode, AILevel } from '../../constants';

@Component({
  standalone: true,
  selector: 'app-board',
  imports: [ CommonModule ],
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css'],
})
export class BoardComponent implements OnInit {
  @Input() gameMode: GameMode = GameMode.HumanVsHuman; // Default to 'Human vs Human' if not passed
  @Input() aiLevel: AILevel = AILevel.Easy; // Default to 'Easy' if not passed

  selectedRow: number = 0; // Track the selected row (starting at the top-left cell)
  selectedCol: number = 0; // Track the selected column (starting at the top-left cell)

  constructor(public gameService: GameService) {}

  ngOnInit() {
    this.gameService.initializeBoard();
    this.setupGameMode(); // Set up based on the selected game mode
  }

  // Method to set up the game mode
  setupGameMode() {
    if (this.gameMode === GameMode.HumanVsAI) {
      this.gameService.setGameMode(this.gameMode); // Set the AI Mode
      this.gameService.setAILevel(this.aiLevel); // Set the AI difficulty level
    }
  }

  // This method is triggered when a user clicks on a cell
  onCellClick(row: number, col: number) {
    this.gameService.onCellClick(row, col);
  }

  // This method is triggered when a user interacts with the keyboard
  onKeyDown(event: KeyboardEvent, row: number, col: number) {
    event.preventDefault();

    if (event.key === 'Enter') {
      // If the user presses Enter, make a move at the selected cell
      this.gameService.onCellClick(row, col);
    } else if (event.key === 'ArrowUp' && row > 0) {
      // Move selection up
      this.selectedRow--;
    } else if (event.key === 'ArrowDown' && row < 2) {
      // Move selection down
      this.selectedRow++;
    } else if (event.key === 'ArrowLeft' && col > 0) {
      // Move selection left
      this.selectedCol--;
    } else if (event.key === 'ArrowRight' && col < 2) {
      // Move selection right
      this.selectedCol++;
    }
  }

  // Reset the game
  resetGame() {
    this.gameService.resetGame();
  }
}