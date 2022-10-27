import { Configuration } from "src/app/config/Configuration";
import { GameStatus } from "src/app/models/GameStatus";
import { GameStateMachine } from "../GameStateMachine";
import StateMachine, { IState } from "../StateMachine";

export class AnswerReviewTimeState implements IState {
    name: string = 'answer-review-time';
    onEnter(stateMachine: GameStateMachine) {
        stateMachine.timerService.startTimer(Configuration.REVIEW_ANSWER_TIME);
        stateMachine.timerService.syncAnswerReviewVisualTimer();
        const thisState = this;
        stateMachine.timerService.getTimer().subscribe({
          complete() {
            thisState.switchToNextQuestion(stateMachine);
          }
        });
    }
    onExit(stateMachine: GameStateMachine) {
        stateMachine.timerService.stopSyncingAnswerReviewVisualTimer();
    }

    private switchToNextQuestion(stateMachine: GameStateMachine) {
        stateMachine.gameState.currentQuestion.hidden = true;

        stateMachine.timerService.startTimer(1).subscribe({
            complete() {
                stateMachine.currentQuestionIndex++;
                const nextQuestion = stateMachine.gameState.quiz.questions[stateMachine.currentQuestionIndex];

                if ( typeof nextQuestion === 'undefined' ) {
                    stateMachine.setState(GameStatus['results-page']);
                } else {
                    stateMachine.setState(GameStatus['waiting-votes']);
                    nextQuestion.hidden = false;
                    stateMachine.setCurrentQuestion(nextQuestion);
                }
            }
          });
    }
}