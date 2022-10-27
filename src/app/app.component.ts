import { animate, style, transition, trigger } from '@angular/animations';
import { Component, NgZone } from '@angular/core';
import { AnimationItem } from 'lottie-web';
import { AnimationOptions } from 'ngx-lottie';
import { Observable } from 'rxjs';
import { hasTeamAnsweredCurrentQuestion } from './helpers/Common';
import { ButtonColors } from './models/ButtonColors';
import { GameState } from './models/GameState';
import { GameStatus } from './models/GameStatus';
import { IHash } from './models/IHash';
import { Team } from './models/Team';
import { BuzzGamepadService } from './services/buzz-gamepad.service';
import { MusicService } from './services/music.service';
import { TimerService } from './services/timer.service';
import { GameStateMachine } from './statemachine/GameStateMachine';

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

  SCORE_EARNED_BY_RIGHT_GUESS: number = 25;

  visualTimer$?: Observable<string>;

  lottieOptions: AnimationOptions = {
    path: './assets/animations/votecasted.json',
    loop: false,
    autoplay: false,
  };

  teamAnsweredAnimationItems?:IHash<AnimationItem> = {};

  gameStateMachine: GameStateMachine;
  gameState: GameState;

  constructor(
    private buzzGamepadService: BuzzGamepadService,
    private musicService: MusicService,
    public timerService: TimerService,
    ngZone: NgZone,
  ) {
    this.gameStateMachine = new GameStateMachine('GameStateMachine', ngZone, buzzGamepadService, musicService, timerService);
    this.gameState = this.gameStateMachine.gameState;
  }

  ngOnInit() {
    this.startAudio();
    this.listenToGamepadEvents().then(() => {
      this.gameStateMachine.start();
    })
  }


  /**
   * Gamepad Setup
   */
  private listenToGamepadEvents(): Promise<void> {
    return this.buzzGamepadService.listenToGamepad();
  }

  /**
   * Audio functions
   */
  private startAudio() {
    this.musicService.start();
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
  isCurrentlyPlayingGameStatus() {
    return this.gameStateMachine.gameState.state === GameStatus['waiting-votes'] || this.gameStateMachine.gameState.state === GameStatus['answer-review-time'];
  }

  getOptionColor(optionIndex: number): string {
    return "#" + Object.values(ButtonColors)[optionIndex];
  }

  hasTeamAnsweredCurrentQuestion(team: Team) {
    return hasTeamAnsweredCurrentQuestion(team, this.gameStateMachine);
  }

  orderTeamsByScore(): Team[] {
    return this.gameStateMachine.gameState.teams.sort((a: Team, b: Team) => {
      return b.score - a.score;
    });
  }
}
