import { BuzzControllerButtonEvent } from "src/app/models/BuzzControllerButtonEvent";
import { GameStatus } from "src/app/models/GameStatus";
import { GameStateMachine } from "../GameStateMachine";
import StateMachine, { IState } from "../StateMachine";
import { Subscription } from 'rxjs';

export class WaitingForTeams implements IState {
    name: string = 'waiting-for-teams';

    gamepadEventSubscription?: Subscription;

    onEnter(stateMachine: GameStateMachine) {
        const thisState = this;
        this.gamepadEventSubscription = stateMachine.buzzGamepadService.buttonReleaseEvents.subscribe({
            next(controllerButtonEvent: BuzzControllerButtonEvent) {
                thisState.handleGamepadEvent(stateMachine, controllerButtonEvent);
            },
            error(err) {
              console.error('something wrong occurred: ' + err);
            },
        });
    }
    onExit(stateMachine: GameStateMachine) {
        this.gamepadEventSubscription?.unsubscribe();
    }

    private handleGamepadEvent(stateMachine: GameStateMachine, controllerButtonEvent: BuzzControllerButtonEvent) {
        stateMachine.ngZone.run(() => {
            const team = controllerButtonEvent.controller.team;
            team!.ready = true;
            if ( this.allTeamsAreReady(stateMachine) ) {
              stateMachine.setState(GameStatus["waiting-votes"]);
              console.log(stateMachine.gameState);
            }
        });
    }

    allTeamsAreReady(stateMachine: GameStateMachine): boolean {
        for ( let team of stateMachine.gameState.teams ) {
          if ( team.ready !== true ) {
            return false; 
          }
        }
        return true;
      }
}