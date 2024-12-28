import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  standalone: true,
  selector: 'app-menu',
  imports: [ CommonModule],
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css'],
})
export class MenuComponent {
  @Output() gameModeChange = new EventEmitter<{ mode: string; level?: string }>();

  gameModes = ['Human vs Human', 'Human vs AI'];
  levels = ['Easy', 'Medium', 'Hard'];
  selectedMode = 'Human vs Human'; // Default game mode
  selectedLevel = 'Easy'; // Default difficulty for AI

  // Emit the selected game mode and level (if AI is selected)
  selectMode(mode: string) {
    if (mode === 'Human vs AI') {
      this.selectedMode = mode;
      this.selectedLevel = this.getNextLevel(this.selectedLevel);
      this.gameModeChange.emit({ mode, level: this.selectedLevel });
    } else {
      this.selectedMode = mode;
      this.gameModeChange.emit({ mode });
    }
  }

  // Get the next level in the sequence
  getNextLevel(currentLevel: string): string {
    const currentIndex = this.levels.indexOf(currentLevel);
    const nextIndex = (currentIndex + 1) % this.levels.length;
    return this.levels[nextIndex];
  }
}