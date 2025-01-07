import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';


export enum GameMode {
  HumanVsHuman,
  HumanVsAI
}

@Injectable({
  providedIn: 'root'
})
export class GameModeService {

  private readonly gameModeSubject = new BehaviorSubject<GameMode>(GameMode.HumanVsHuman); // Default to Human vs Human
  gameMode$ = this.gameModeSubject.asObservable();

  setGameMode(gameMode: GameMode) {
    this.gameModeSubject.next(gameMode);
  }

  getGameMode(): GameMode {
    return this.gameModeSubject.value;
  }

}
