import { Component } from '@angular/core';
import { GameService } from './services/game.service';
import { MenuComponent } from './components/menu/menu.component';
import { BoardComponent } from './components/board/board.component';

@Component({
  selector: 'app-root',
  imports: [MenuComponent, BoardComponent ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  constructor(public gameService: GameService) {}

  gameMode: string = 'Human vs Human'; // Default to Human vs Human
  aiLevel: string = 'Easy'; // Default AI level

  // Handle game mode and AI level changes from the menu
  onGameModeChange(event: { mode: string; level?: string }) {
    this.gameMode = event.mode;
    if (event.level) {
      this.aiLevel = event.level;
    }
    this.gameService.setGameMode(this.gameMode);
    if (this.gameMode === 'Human vs AI') {
      this.gameService.setAILevel(this.aiLevel);
    }
  }
}