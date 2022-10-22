import { Component } from '@angular/core';
import { getDefaultControllers, getDefaultTeams } from './data/DefaultValues';
import { GameState } from './models/GameState';
import { BuzzGamepadService } from './services/buzz-gamepad.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  gameState: GameState;

  constructor(
    private buzzGamepadService: BuzzGamepadService
  ){
    this.gameState = {
      controllers: getDefaultControllers(),
      state: 'waiting-for-teams',
      teams: getDefaultTeams(),
    };
  }

  ngOnInit() {
    this.buzzGamepadService.listenToGamepad().then(() => {
      this.buzzGamepadService.buttonReleaseEvents.subscribe({
        next(x) {
          console.log('Got event ', x);
        },
        error(err) {
          console.error('something wrong occurred: ' + err);
        },
      });
    });
  }

}
