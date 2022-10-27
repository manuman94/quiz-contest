import { Injectable } from '@angular/core';

import { Observable, map, timer, take, of, merge } from 'rxjs';
import { formatSecondsToMMSS } from '../helpers/Common';

@Injectable({
  providedIn: 'root'
})
export class TimerService {

  timer: Observable<number>;
  questionVisualTimer: Observable<string>;
  answerReviewVisualTimer: Observable<number>;

  constructor() {
    this.timer = new Observable<number>();
    this.questionVisualTimer = new Observable<string>();
    this.answerReviewVisualTimer = new Observable<number>();
  }

  getTimer(): Observable<number> {
    return this.timer;
  }

  clearTimer(): void {
    this.timer = new Observable<number>();
  }

  startTimer(duration: number): Observable<number> {
    return this.timer = timer(1000, 1000).pipe(
      map(i => duration - i),
      take(duration + 1)
    );
  }

  syncQuestionVisualTimer() {
    this.questionVisualTimer = merge(this.timer).pipe(map(formatSecondsToMMSS));
  }

  stopSyncingQuestionVisualTimer() {
    this.questionVisualTimer = of("00:00");
  }

  syncAnswerReviewVisualTimer() {
    this.answerReviewVisualTimer = merge(this.timer);
  }

  stopSyncingAnswerReviewVisualTimer() {
    this.answerReviewVisualTimer = of();
  }
}
