import { Injectable } from '@angular/core';

import { GamepadService as ngGamepad } from 'ngx-gamepad';
import { map, merge, Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GamepadService {

  TOTAL_BUTTON_COUNT = 20;
  alreadyListening = false;

  buttonReleaseEvents: Subject<number> = new Subject<number>();

  constructor(
    private gamepad: ngGamepad
  ){}

  public listenToGamepad(): Promise<void> {
    return new Promise((resolve) => {
      this.gamepad.connect()
        .subscribe(() => {
          if ( !this.alreadyListening ) {
            this.setupButtonEvents();
          }
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
    const eventObservable: Observable<number> = merge(...buttonReleaseObservables);
    eventObservable.subscribe(this.buttonReleaseEvents);
  }

  public getEvents() {
    return this.buttonReleaseEvents;
  }
}
