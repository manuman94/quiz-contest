import { Injectable } from '@angular/core';
import { map, Observable, pipe, UnaryFunction } from 'rxjs';
import { getDefaultControllers } from '../data/DefaultValues';
import { BuzzControllerButton } from '../models/BuzzControllerButton';
import { BuzzControllerButtonEvent } from '../models/BuzzControllerButtonEvent';
import { Controller } from '../models/Controller';
import { GamepadService } from './gamepad.service';

@Injectable({
  providedIn: 'root'
})
export class BuzzGamepadService {

  buttonReleaseEvents: Observable<BuzzControllerButtonEvent> = new Observable<BuzzControllerButtonEvent>();

  constructor(
    private gamepadService: GamepadService
  ){}

  public listenToGamepad(): Promise<void> {
    return new Promise((resolve) => {
      this.gamepadService.listenToGamepad().then(() => {
        this.buttonReleaseEvents = this.gamepadService.buttonReleaseEvents.pipe(
          this.transformToBuzzEvent()
        );
        resolve();
      });
    });
  }

  private transformToBuzzEvent(): UnaryFunction<Observable<number>, Observable<BuzzControllerButtonEvent>> {
    return pipe(
      map(this.fromButtonIndexToBuzzControllerEvent)
    );
  }

  private fromButtonIndexToBuzzControllerEvent(buttonIndex: number): BuzzControllerButtonEvent {
    const maxButtons = Object.keys(BuzzControllerButton).length / 2;
    const buzzControllerButtonEvent: BuzzControllerButtonEvent = {
      button: buttonIndex % maxButtons,
      controller: getDefaultControllers()[Math.floor(buttonIndex/maxButtons)],
    };
    return buzzControllerButtonEvent;
  }
}
