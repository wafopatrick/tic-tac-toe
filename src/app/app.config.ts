import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter, Routes } from '@angular/router';
import { CreateRoomComponent } from './components/create-room/create-room.component';
import { JoinRoomComponent } from './components/join-room/join-room.component';
import { MainContentComponent } from './components/main-content/main-content.component';

const routes: Routes = [
  { path: '', component: MainContentComponent },
  { path: 'create-room', component: CreateRoomComponent },
  { path: 'join-room', component: JoinRoomComponent },
];

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideZoneChangeDetection({ eventCoalescing: true })
  ]
};
