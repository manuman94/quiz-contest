import { Injectable } from '@angular/core';

import { GamepadService as ngGamepad } from 'ngx-gamepad';
import { map, merge, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GamepadService {

  BUTTON_MAPPING = {
    button0: {
      
    }
  };

  TOTAL_BUTTON_COUNT = 20;

  buttonReleaseEvents: Observable<string> = new Observable<string>();

  constructor(
    private gamepad: ngGamepad
  ){}

  public listenToGamepad() {
    this.gamepad.connect()
      .subscribe(() => {
        this.setupButtonEvents();
        this.subscribeToGamepadEvents();
      });
  }

  private setupButtonEvents() {
    let buttonReleaseObservables: Array<Observable<string>> = [];
    for ( let i = 0; i < this.TOTAL_BUTTON_COUNT; i++ ) {
      const buttonTag = "button" + i;
      buttonReleaseObservables.push(this.gamepad.after(buttonTag).pipe(map(() => buttonTag)));
    }
    this.buttonReleaseEvents = merge(...buttonReleaseObservables);
  }

  private subscribeToGamepadEvents()
  {
    this.buttonReleaseEvents.subscribe({
      next(x) {
        console.log('Button released ' + x);
      },
      error(err) {
        console.error('something wrong occurred: ' + err);
      },
      complete() {
        console.log('done');
      },
    });
  }
}
