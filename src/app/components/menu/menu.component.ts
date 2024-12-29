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
  levels = [AILevel.Easy, AILevel.Medium, AILevel.Hard];
  selectedMode: GameMode = GameMode.HumanVsHuman; // Default game mode
  selectedLevel: AILevel = AILevel.Easy; // Default difficulty for AI

  // Emit the selected game mode and level (if AI is selected)
  selectMode(mode: GameMode) {
    if (mode === GameMode.HumanVsAI) {
      this.selectedMode = mode;
      this.selectedLevel = this.getNextLevel(this.selectedLevel);
      this.gameModeChange.emit({ mode, level: this.selectedLevel });
    } else {
      this.selectedMode = mode;
      this.gameModeChange.emit({ mode });
    }
  }

  // Get the next level in the sequence
  getNextLevel(currentLevel: AILevel): AILevel {
    const currentIndex = this.levels.indexOf(currentLevel);
    const nextIndex = (currentIndex + 1) % this.levels.length;
    return this.levels[nextIndex];
  }
}