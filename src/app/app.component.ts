import { Component, NgZone } from '@angular/core';
import { AnimationItem } from 'lottie-web';
import * as moment from 'moment';
import { AnimationOptions } from 'ngx-lottie';
import { EMPTY, from, interval, map, merge, Observable, repeat, scan, startWith, Subject, switchMap, takeUntil, takeWhile, tap } from 'rxjs';
import { getDefaultControllers, getDefaultQuiz, getDefaultTeams } from './data/DefaultValues';
import { ButtonColors } from './models/ButtonColors';
import { BuzzControllerButton } from './models/BuzzControllerButton';
import { BuzzControllerButtonEvent } from './models/BuzzControllerButtonEvent';
import { GameState } from './models/GameState';
import { GameStatus } from './models/GameStatus';
import { IHash } from './models/IHash';
import { QuestionOptionVote } from './models/QuestionOptionVote';
import { Team } from './models/Team';
import { BuzzGamepadService } from './services/buzz-gamepad.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  lottieOptions: AnimationOptions = {
    path: './assets/animations/votecasted.json',
    loop: false,
    autoplay: false,
  };

  teamAnsweredAnimationItems?:IHash<AnimationItem> = {};

  gameState: GameState;
  questionTimer$?: Observable<string>;
  questionTimerInternal?: Observable<string>;

  private readonly _stopTimer = new Subject<void>();
  private readonly _pauseTimer = new Subject<void>();
  private readonly _startTimer = new Subject<void>();

  constructor(
    private buzzGamepadService: BuzzGamepadService,
    public ngZone: NgZone,
  ){
    this.gameState = {
      controllers: getDefaultControllers(),
      state: GameStatus['waiting-for-teams'],
      question_state: 'waiting-votes',
      teams: getDefaultTeams(),
      quiz: getDefaultQuiz(),
      currentQuestion: getDefaultQuiz().questions[0],
    };
  }

  ngOnInit() {
    this.setupTimer();
    this.setupGamepad();
    setTimeout(() => {
      this.startGame();
    }, 2000);
  }

  /**
   * Gamepad Setup
   */
  private setupGamepad() {
    this.buzzGamepadService.listenToGamepad().then(() => {
      this.setupGamepadEvents();
    });
  }

  private setupGamepadEvents() {
    const appComponent = this;
    this.buzzGamepadService.buttonReleaseEvents.subscribe({
      next(controllerButtonEvent: BuzzControllerButtonEvent) {
        appComponent.handleGamepadEvent(controllerButtonEvent);
      },
      error(err) {
        console.error('something wrong occurred: ' + err);
      },
    });
  }

  private handleGamepadEvent(controllerButtonEvent: BuzzControllerButtonEvent) {
    const appComponent = this;
    if ( appComponent.isOptionButton(controllerButtonEvent.button) ) {
      const team = controllerButtonEvent.controller.team;
      appComponent.ngZone.run(() => {
        if ( !appComponent.hasTeamAnsweredCurrentQuestion(team!) ) {
          const selectedOption = appComponent.buzzButtonToOptionIndex(controllerButtonEvent.button.valueOf());
          appComponent.gameState.currentQuestion.options[selectedOption].votes.push({ team: team } as QuestionOptionVote);
        }
      });
      appComponent.ngZone.runOutsideAngular(() => {
        console.log(appComponent.teamAnsweredAnimationItems);
        appComponent.teamAnsweredAnimationItems![team!.name].play();
      });
    }
  }

  /**
   * Game state functions
   */
  private startGame() {
    this.changeGameState(GameStatus.playing);
    this.startQuestionsLoop();
  }
  
  private startQuestionsLoop() {
    this.startQuestion();
  }
  
  private changeGameState(gameStatus: GameStatus) {
    this.gameState.state = gameStatus;
  }

  /**
   * Game Hook functions
   */
  private startQuestion() {
    this.stopTimer();
    this.startTimer();
    console.log(this.questionTimer$);
    // TODO
    this.questionTimer$?.subscribe({
      next(x) {
        console.log('Timer next', x);
      },
      error(x) {
        console.log('Timer error', x);
      },
      complete() {
        console.log('Timer complete');
      }
    });
  }

  /**
   * Timer functions
   */
  private setupTimer() {
    const startValue = 15;
    
    this.questionTimer$ = merge(this._startTimer.pipe(map(() => true)), this._pauseTimer.pipe(map(() => false)))
      .pipe(
        switchMap(shouldStart => (shouldStart ? interval(1000) : EMPTY)),
        map((x) => -1),
        scan((acc: number, curr: number) => acc + curr, startValue),
        takeWhile(val => val >= 0),
        startWith(startValue),
        takeUntil(this._stopTimer),
        repeat(),
    ).pipe(map(this.formatSecondsToMMSS));
  }

  startTimer() {
    console.log("Start timer");
    this.ngZone.run(() => {
      this._startTimer.next();
    });
  }

  pauseTimer() {
    console.log("Pause timer");
    this.ngZone.run(() => {
      this._pauseTimer.next();
    });
  }
  
  stopTimer() {
    console.log("Stop timer");
    this.ngZone.run(() => {
      this._stopTimer.next();
    });
  }

  /**
   * Animation functions
   */
  teamAnsweredAnimationCreated(animationItem: AnimationItem, teamName: string): void {
    this.teamAnsweredAnimationItems![teamName] = animationItem;
  }

  /**
   * Helpers
   */
  getOptionColor(optionIndex: number): string {
    return "#" + Object.values(ButtonColors)[optionIndex];
  }

  formatSecondsToMMSS(seconds: number): string {
    return moment.utc(seconds * 1000).format('mm:ss');
  }

  buzzButtonToOptionIndex(buzzButton: number) {
    return 4 - buzzButton;
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
      voted = voted || (option.votes.filter((vote: QuestionOptionVote) => {
        return vote.team.name === team.name;
      }).length > 0)
    }
    return voted;
  }
}
