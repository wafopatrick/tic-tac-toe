import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { GameMode, AILevel } from '../../constants';

@Component({
  standalone: true,
  selector: 'app-menu',
  imports: [ CommonModule],
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css'],
})
export class MenuComponent {
  @Output() gameModeChange = new EventEmitter<{ mode: GameMode; level?: AILevel }>();

  gameModes = [GameMode.HumanVsHuman, GameMode.HumanVsAI];
  selectedMode: GameMode = GameMode.HumanVsHuman; // Default game mode
  menuOpen: boolean = false; // Toggle menu visibility

  // Emit the selected game mode
  selectMode(mode: GameMode) {
    this.selectedMode = mode;
    this.gameModeChange.emit({ mode });
    this.menuOpen = false; // Close the menu after selection
  }

  // Toggle menu visibility
  toggleMenu() {
    this.menuOpen = !this.menuOpen;
  }
}