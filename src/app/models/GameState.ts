import { Controller } from "./Controller";
import { GameStatus } from "./GameStatus";
import { Question } from "./Question";
import { Quiz } from "./Quiz";
import { Team } from "./Team";

export interface GameState {
    state: GameStatus;
    question_state: 'waiting-votes' | 'answer-review-time';
    controllers: Controller[];
    teams: Team[];
    quiz: Quiz;
    currentQuestion: Question;
}