import { Injectable } from '@angular/core';

import { Observable, map, timer, take } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TimerService {

  timer: Observable<number>;

  constructor() {
    this.timer = new Observable<number>();
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
}
