import { Injectable } from '@angular/core';

import { GamepadService as ngGamepad } from 'ngx-gamepad';
import { map, merge, Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GamepadService {

  TOTAL_BUTTON_COUNT = 20;

  buttonReleaseEvents: Observable<number> = new Observable<number>();

  constructor(
    private gamepad: ngGamepad
  ){}

  public listenToGamepad(): Promise<void> {
    return new Promise((resolve) => {
      this.gamepad.connect()
        .subscribe(() => {
          this.setupButtonEvents();
          resolve();
        });
    });
  }

  private setupButtonEvents() {
    let buttonReleaseObservables: Array<Observable<number>> = [];
    for ( let i = 0; i < this.TOTAL_BUTTON_COUNT; i++ ) {
      const buttonTag = "button" + i;
      buttonReleaseObservables.push(this.gamepad.after(buttonTag).pipe(map(() => i)));
    }
    this.buttonReleaseEvents = merge(...buttonReleaseObservables);
  }

  public getEvents() {
    return this.buttonReleaseEvents;
  }
}
