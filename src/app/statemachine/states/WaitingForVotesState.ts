import { Configuration } from "src/app/config/Configuration";
import { BuzzControllerButtonEvent } from "src/app/models/BuzzControllerButtonEvent";
import { GameStatus } from "src/app/models/GameStatus";
import { GameStateMachine } from "../GameStateMachine";
import { IState } from "../StateMachine";
import { Subscription } from 'rxjs';
import { buzzButtonToOptionIndex, hasTeamAnsweredCurrentQuestion, isOptionButton, recalculateTeamScores } from "src/app/helpers/Common";
import { QuestionOptionVote } from "src/app/models/QuestionOptionVote";

export class WaitingForVotesState implements IState {
    name: string = 'waiting-votes';

    gamepadEventSubscription?: Subscription;

    onEnter(gameStateMachine: GameStateMachine) {
        const thisState = this;
        console.log(gameStateMachine.buzzGamepadService.buttonReleaseEvents);
        this.gamepadEventSubscription = gameStateMachine.buzzGamepadService.buttonReleaseEvents.subscribe({
            next(controllerButtonEvent: BuzzControllerButtonEvent) {
                thisState.handleGamepadEvent(gameStateMachine, controllerButtonEvent);
            },
            error(err) {
              console.error('something wrong occurred: ' + err);
            },
        });
        gameStateMachine.timerService.startTimer(Configuration.QUESTION_TIME);
        gameStateMachine.timerService.syncQuestionVisualTimer();
        gameStateMachine.timerService.getTimer().subscribe({
          complete() {
            gameStateMachine.setState(GameStatus["answer-review-time"]);
          }
        });
    }
    onExit(gameStateMachine: GameStateMachine) {
        gameStateMachine.timerService.stopSyncingQuestionVisualTimer();
        recalculateTeamScores(gameStateMachine);
        this.gamepadEventSubscription?.unsubscribe();
    }

    private handleGamepadEvent(gameStateMachine: GameStateMachine, controllerButtonEvent: BuzzControllerButtonEvent) {
        if ( isOptionButton(controllerButtonEvent.button) ) {
            const team = controllerButtonEvent.controller.team;
            gameStateMachine.ngZone.run(() => {
              if ( !hasTeamAnsweredCurrentQuestion(team!, gameStateMachine) ) {
                const selectedOption = buzzButtonToOptionIndex(controllerButtonEvent.button.valueOf());
                gameStateMachine.gameState.currentQuestion.options[selectedOption].votes.push({ team: team } as QuestionOptionVote);
                gameStateMachine.ngZone.runOutsideAngular(() => {
                    // TODO animate buttons
                    // gameStateMachine.teamAnsweredAnimationItems![team!.name].goToAndPlay(0);
                });
              }
            });
        }
    }
}