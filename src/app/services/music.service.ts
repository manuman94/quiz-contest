import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MusicService {

  private audio: HTMLAudioElement;

  constructor() {
    this.audio = new Audio();
  }

  public start() {
    this.audio.src = "./assets/audio/music.mp3";
    this.audio.loop = true;
    this.audio.load();
    // this.audio.play();
  }
}
