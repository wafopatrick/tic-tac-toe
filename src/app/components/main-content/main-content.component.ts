import { Component, OnInit } from '@angular/core';
import { AILevel } from '../../constants';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { GameService } from '../../services/game.service';
import { BoardComponent } from '../board/board.component';
import { GameModeService, GameMode } from '../../services/game-mode.service';

@Component({
  standalone: true,
  selector: 'app-main-content',
  imports: [ CommonModule, FormsModule, BoardComponent ],
  templateUrl: './main-content.component.html',
  styleUrl: './main-content.component.css',
})
export class MainContentComponent implements OnInit {

  constructor(private readonly gameService: GameService, private readonly gameModeService: GameModeService) {}

  GameMode = GameMode;
  AILevel = AILevel;

  gameMode: GameMode = GameMode.HumanVsHuman; // Default to Human vs Human
  aiLevel: AILevel = AILevel.Easy; // Default AI level
  playerXName: string = ''; // Player X name
  playerOName: string = ''; // Player O name

  ngOnInit(): void {
    this.gameModeService.gameMode$.subscribe((mode) => {
      this.gameMode = mode;
      this.gameService.initializeBoard(); // Reset the board when the game mode changes
    });
  }

  // Handle AI level change
  onAILevelChange(level: AILevel) {
    this.aiLevel = level;
    this.gameService.setAILevel(this.aiLevel);
  }

  // Reset the game
  resetGame() {
    this.gameService.resetGame();
  }

  // Select game mode
  selectMode(mode: GameMode) {
    this.gameMode = mode;
    this.gameModeService.setGameMode(mode);
    this.gameService.setGameMode(mode);
    this.gameService.resetGame();
  }
}
