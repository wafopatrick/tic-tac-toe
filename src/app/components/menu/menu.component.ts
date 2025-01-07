import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { GameModeService, GameMode } from '../../services/game-mode.service';
import { GameService } from '../../services/game.service';

@Component({
  standalone: true,
  selector: 'app-menu',
  imports: [ CommonModule, RouterModule],
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css'],
})
export class MenuComponent {

  gameModes = [GameMode.HumanVsHuman, GameMode.HumanVsAI];
  selectedMode: GameMode | null = GameMode.HumanVsHuman; // Default game mode
  selectedRoom: string | null = null; // Track the selected room
  menuOpen: boolean = false; // Toggle menu visibility

  constructor(
    private readonly router: Router,
    private readonly gameService: GameService,
    private readonly gameModeService: GameModeService
  ) {}

  // Emit the selected game mode
  selectMode(mode: GameMode) {
    this.router.navigate(['']); // Navigate to the root path
    this.selectedMode = mode;
    this.selectedRoom = null; // Reset selected room
    this.gameModeService.setGameMode(mode); // Set the game mode
    this.gameService.setGameMode(mode); // Set the game mode
    this.menuOpen = false; // Close the menu after selection
  }

  // Toggle menu visibility
  toggleMenu() {
    this.menuOpen = !this.menuOpen;
  }

  // Navigate to the specified route
  navigateTo(route: string) {
    this.selectedRoom = route; // Set the selected room
    this.selectedMode = null; // Reset selected mode
    this.menuOpen = false; // Close the menu after navigation
  }
}