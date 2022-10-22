import { Component } from '@angular/core';
import { getDefaultControllers, getDefaultQuiz, getDefaultTeams } from './data/DefaultValues';
import { ButtonColors } from './models/ButtonColors';
import { GameState } from './models/GameState';
import { BuzzGamepadService } from './services/buzz-gamepad.service';
import * as moment from 'moment';
import { EMPTY, interval, map, merge, Observable, repeat, repeatWhen, scan, startWith, Subject, switchMap, takeUntil, takeWhile, tap, timer } from 'rxjs';
import { BuzzControllerButtonEvent } from './models/BuzzControllerButtonEvent';
import { BuzzControllerButton } from './models/BuzzControllerButton';
import { Team } from './models/Team';
import { QuestionOption } from './models/QuestionOption';
import { QuestionOptionVote } from './models/QuestionOptionVote';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  gameState: GameState;
  timer$?: Observable<number>;

  private readonly _stopTimer = new Subject<void>();
  private readonly _pauseTimer = new Subject<void>();
  private readonly _startTimer = new Subject<void>();

  constructor(
    private buzzGamepadService: BuzzGamepadService
  ){
    this.gameState = {
      controllers: getDefaultControllers(),
      state: 'playing',
      question_state: 'waiting-votes',
      teams: getDefaultTeams(),
      quiz: getDefaultQuiz(),
      currentQuestion: getDefaultQuiz().questions[0],
    };
    const startValue = 120;
    this.timer$ = 
      merge(this._startTimer.pipe(map(() => true)), this._pauseTimer.pipe(map(() => false)))
        .pipe(
          switchMap(shouldStart => (shouldStart ? interval(1000) : EMPTY)),
          map((x) => -1),
          scan((acc: number, curr: number) => acc + curr, startValue),
          takeWhile(val => val >= 0),
          startWith(startValue),
          takeUntil(this._stopTimer),
          repeat(),
      );
  }

  ngOnInit() {
    const appComponent = this;
    this.buzzGamepadService.listenToGamepad().then(() => {
      this.buzzGamepadService.buttonReleaseEvents.subscribe({
        next(controllerButtonEvent: BuzzControllerButtonEvent) {
          if ( appComponent.isOptionButton(controllerButtonEvent.button) ) {

          }
        },
        error(err) {
          console.error('something wrong occurred: ' + err);
        },
      });
    });
  }

  getOptionColor(optionIndex: number): string {
    return "#" + Object.values(ButtonColors)[optionIndex];
  }

  formatSecondsToMMSS(seconds: number): string {
    return moment.utc(seconds * 1000).format('mm:ss');
  }

  isOptionButton(buzzControllerButton: BuzzControllerButton): boolean {
    return buzzControllerButton == BuzzControllerButton.BLUE ||
      buzzControllerButton == BuzzControllerButton.GREEN ||
      buzzControllerButton == BuzzControllerButton.YELLOW ||
      buzzControllerButton == BuzzControllerButton.ORANGE;
  }

  hasTeamAnsweredCurrentQuestion(team: Team): boolean {
    let voted = false;
    for (let option of this.gameState.currentQuestion.options) {
      voted = (option.votes.filter((vote: QuestionOptionVote) => {
        return vote.team === team;
      }).length > 0)
    }
    return voted;
  }

  startTimer() {
    console.log("Start timer");
    this._startTimer.next();
  }

  pauseTimer() {
    console.log("Pause timer");
    this._pauseTimer.next();
  }

  stopTimer() {
    console.log("Stop timer");
    this._stopTimer.next();
  }

}
