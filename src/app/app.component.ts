import { animate, style, transition, trigger } from '@angular/animations';
import { Component, NgZone } from '@angular/core';
import { AnimationItem } from 'lottie-web';
import * as moment from 'moment';
import { AnimationOptions } from 'ngx-lottie';
import { map, merge, Observable, of } from 'rxjs';
import { getDefaultControllers, getDefaultQuiz, getDefaultTeams } from './data/DefaultValues';
import { ButtonColors } from './models/ButtonColors';
import { BuzzControllerButton } from './models/BuzzControllerButton';
import { BuzzControllerButtonEvent } from './models/BuzzControllerButtonEvent';
import { GameState } from './models/GameState';
import { GameStatus } from './models/GameStatus';
import { IHash } from './models/IHash';
import { Question } from './models/Question';
import { QuestionOptionVote } from './models/QuestionOptionVote';
import { Team } from './models/Team';
import { BuzzGamepadService } from './services/buzz-gamepad.service';
import { MusicService } from './services/music.service';
import { TimerService } from './services/timer.service';

const enterTransition = transition(':enter', [
  style({
    opacity: 0
  }),
  animate('1s ease-in', style({
    opacity: 1
  }))
]);

const leaveTrans = transition(':leave', [
  style({
    opacity: 1
  }),
  animate('1s ease-out', style({
    opacity: 0
  }))
])

const fadeIn = trigger('fadeIn', [
  enterTransition
]);

const fadeOut = trigger('fadeOut', [
  leaveTrans
]);

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [
    fadeIn,
    fadeOut
  ],
})
export class AppComponent {
  readonly GameStatus = GameStatus;

  QUESTION_TIME: number = 30;
  REVIEW_ANSWER_TIMER: number = 10;
  SCORE_EARNED_BY_RIGHT_GUESS: number = 25;

  visualTimer$?: Observable<string>;

  currentQuestionIndex: number = 0;

  lottieOptions: AnimationOptions = {
    path: './assets/animations/votecasted.json',
    loop: false,
    autoplay: false,
  };

  teamAnsweredAnimationItems?:IHash<AnimationItem> = {};

  gameState: GameState;

  constructor(
    private buzzGamepadService: BuzzGamepadService,
    private musicService: MusicService,
    private timerService: TimerService,
    public ngZone: NgZone,
  ){
    this.gameState = {
      controllers: getDefaultControllers(),
      state: GameStatus['waiting-for-teams'],
      question_state: 'waiting-votes',
      teams: getDefaultTeams(),
      quiz: getDefaultQuiz(),
      currentQuestion: getDefaultQuiz().questions[this.currentQuestionIndex],
    };
  }

  ngOnInit() {
    this.startAudio();
    this.setupGamepad();
    this.startGame();
  }

  /**
   * Timer functions
   */
  private syncVisualTimer() {
    this.visualTimer$ = merge(this.timerService.getTimer()).pipe(map(this.formatSecondsToMMSS));
  }

  private stopSyncingVisualTimer() {
    this.visualTimer$ = of("00:00");
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
    if ( this.gameState.state === GameStatus['waiting-for-teams'] ) {
      appComponent.ngZone.run(() => {
        const team = controllerButtonEvent.controller.team;
        team!.ready = true;
        if ( appComponent.allTeamsAreReady() ) {
          appComponent.onAllTeamsReady();
        }
      });
    } else if ( this.gameState.state === GameStatus.playing ) {
      if ( appComponent.isOptionButton(controllerButtonEvent.button) ) {
        const team = controllerButtonEvent.controller.team;
        appComponent.ngZone.run(() => {
          if ( !appComponent.hasTeamAnsweredCurrentQuestion(team!) ) {
            const selectedOption = appComponent.buzzButtonToOptionIndex(controllerButtonEvent.button.valueOf());
            appComponent.gameState.currentQuestion.options[selectedOption].votes.push({ team: team } as QuestionOptionVote);
            appComponent.ngZone.runOutsideAngular(() => {
                appComponent.teamAnsweredAnimationItems![team!.name].goToAndPlay(0);
            });
          }
        });
      }
    }
  }

  /**
   * Audio functions
   */
  private startAudio() {
    this.musicService.start();
  }

  /**
   * Game state functions
   */
  private startGame() {
    this.changeGameState(GameStatus['waiting-for-teams']);
  }
  
  private startQuestionsLoop() {
    this.startQuestion();
  }

  private setCurrentQuestion(question: Question) {
    this.gameState.currentQuestion = question;
  }

  private switchToNextQuestion() {
    const appComponent = this;
    this.gameState.currentQuestion.hidden = true;
    this.timerService.startTimer(1).subscribe({
      complete() {
        appComponent.currentQuestionIndex++;
        const nextQuestion = appComponent.gameState.quiz.questions[appComponent.currentQuestionIndex];
        if ( typeof nextQuestion === 'undefined' ) {
          appComponent.gameState.state = GameStatus['results-page'];
        } else {
          nextQuestion.hidden = false;
          appComponent.setCurrentQuestion(nextQuestion);
          appComponent.startQuestion();
        }
      }
    });
  }

  private startAnswerReviewTime() {
    const appComponent = this;
    this.gameState.question_state = 'answer-review-time';
    this.recalculateTeamScores();
    this.timerService.startTimer(this.REVIEW_ANSWER_TIMER);
    this.timerService.getTimer().subscribe({
      complete() {
        appComponent.onAnswerReviewTimeEnd();
      }
    });
  }
  
  private changeGameState(gameStatus: GameStatus) {
    this.gameState.state = gameStatus;
  }

  /**
   * Game Hook functions
   */
  private startQuestion() {
    this.gameState.question_state = 'waiting-votes';
    const appComponent = this;
    this.timerService.startTimer(this.QUESTION_TIME);
    this.syncVisualTimer();
    this.timerService.getTimer().subscribe({
      complete() {
        appComponent.onQuestionEnd();
      }
    });
  }

  private onQuestionEnd() {
    this.stopSyncingVisualTimer();
    this.startAnswerReviewTime();
  }

  private onAnswerReviewTimeEnd() {
    this.switchToNextQuestion();
  }

  private onAllTeamsReady() {
    this.changeGameState(GameStatus.playing);
    this.startQuestionsLoop();
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
  recalculateTeamScores() 
  {
    for ( let team of this.gameState.teams ) {
      if ( this.hasTeamAnsweredQuestion(team, this.gameState.currentQuestion) && 
           this.checkIfTeamVotedQuestionCorrectly(team, this.gameState.currentQuestion) ) {
        team.score += this.SCORE_EARNED_BY_RIGHT_GUESS;
      }
    }
  }

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

  hasTeamAnsweredQuestion(team: Team, question: Question) {
    let voted = false;
    for (let option of question.options) {
      voted = voted || (option.votes.filter((vote: QuestionOptionVote) => {
        return vote.team.name === team.name;
      }).length > 0)
    }
    return voted;
  }

  hasTeamAnsweredCurrentQuestion(team: Team): boolean {
    return this.hasTeamAnsweredQuestion(team, this.gameState.currentQuestion);
  }

  checkIfTeamVotedQuestionCorrectly(team: Team, question: Question) {
    for (let option of question.options) {
      const chosenOption = option.votes.filter((vote: QuestionOptionVote) => {
        return vote.team.name === team.name;
      });
      if ( chosenOption.length > 0 ) {
        return option.correct;
      }
    }
    return false;
  }

  orderTeamsByScore(): Team[] {
    return this.gameState.teams.sort((a: Team, b: Team) => {
      return b.score - a.score;
    });
  }

  allTeamsAreReady(): boolean {
    for ( let team of this.gameState.teams ) {
      if ( team.ready !== true ) {
        return false; 
      }
    }
    return true;
  }
}
