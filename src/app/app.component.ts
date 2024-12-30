import { Component, OnInit } from '@angular/core';
import { GameService } from './services/game.service';
import { MenuComponent } from './components/menu/menu.component';
import { BoardComponent } from './components/board/board.component';
import { LoginComponent } from './components/login/login.component';
import { GameMode, AILevel } from './constants';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [MenuComponent, BoardComponent, LoginComponent, FormsModule, CommonModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  GameMode = GameMode;
  AILevel = AILevel;

  constructor(public gameService: GameService) {}

  gameMode: GameMode = GameMode.HumanVsHuman; // Default to Human vs Human
  aiLevel: AILevel = AILevel.Easy; // Default AI level
  playerXName: string = ''; // Player X name
  playerOName: string = ''; // Player O name

  ngOnInit() {
    // Initialize game mode
  }

  // Handle game mode and AI level changes from the menu
  onGameModeChange(event: { mode: GameMode; level?: AILevel }) {
    this.gameMode = event.mode;
    if (event.level) {
      this.aiLevel = event.level;
    }
    this.gameService.setGameMode(this.gameMode);
    if (this.gameMode === GameMode.HumanVsAI) {
      this.gameService.setAILevel(this.aiLevel);
    }
    this.gameService.resetGame(); // Reset the board when the game mode changes
  }

  // Handle AI level change
  onAILevelChange(level: AILevel) {
    this.aiLevel = level;
    this.gameService.setAILevel(this.aiLevel);
  }
}