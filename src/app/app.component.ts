import { Component, OnInit } from '@angular/core';
import { GameService } from './services/game.service';
import { MenuComponent } from './components/menu/menu.component';
import { LoginComponent } from './components/login/login.component';
import { AILevel } from './constants';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { GameModeService, GameMode } from './services/game-mode.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [MenuComponent, LoginComponent, FormsModule, CommonModule, RouterModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {

  constructor(
    public gameService: GameService,
    private readonly gameModeService: GameModeService,
    private readonly router: Router
  ) {}

  gameMode: GameMode = GameMode.HumanVsHuman; // Default to Human vs Human
  aiLevel: AILevel = AILevel.Easy; // Default AI level

  ngOnInit() {
    this.gameModeService.gameMode$.subscribe((mode) => {
      this.gameMode = mode;
      this.gameService.resetGame(); // Reset the board when the game mode changes
    });
  }
}