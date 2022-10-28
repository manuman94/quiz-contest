import { NgZone } from '@angular/core';
import { getDefaultControllers, getDefaultQuiz, getDefaultTeams } from "../data/DefaultValues";
import { GameState } from "../models/GameState";
import { GameStatus } from "../models/GameStatus";
import { Question } from "../models/Question";
import { BuzzGamepadService } from "../services/buzz-gamepad.service";
import { MusicService } from "../services/music.service";
import { TimerService } from "../services/timer.service";
import StateMachine from "./StateMachine";
import { AnswerReviewTimeState } from "./states/AnswerReviewTimeState";
import { ResultsPageState } from "./states/ResultsPageState";
import { WaitingForTeams } from "./states/WaitingForTeamsState";
import { WaitingForVotesState } from "./states/WaitingForVotesState";

export class GameStateMachine extends StateMachine {
    
    gameState: GameState;
    currentQuestionIndex: number = 0;

    constructor(id: string,
        public ngZone: NgZone,
        public buzzGamepadService: BuzzGamepadService,
        public musicService: MusicService,
        public timerService: TimerService) {
        super(id);
        this.setupStates();
        this.gameState = {
            controllers: getDefaultControllers(),
            state: GameStatus['waiting-for-teams'],
            teams: getDefaultTeams(),
            quiz: getDefaultQuiz(),
            currentQuestion: getDefaultQuiz().questions[this.currentQuestionIndex],
          };
    }

    private setupStates() {
        this.addStateFromInstance(new WaitingForTeams());
        this.addStateFromInstance(new WaitingForVotesState());
        this.addStateFromInstance(new AnswerReviewTimeState());
        this.addStateFromInstance(new ResultsPageState());
    }

    start() {
        this.setState(GameStatus["waiting-for-teams"]);
    }

    override setState(name: GameStatus) {
        super.setState(name.toString());
        this.gameState.state = name;
    }

    public setCurrentQuestion(question: Question) {
        this.gameState.currentQuestion = question;
    }
}