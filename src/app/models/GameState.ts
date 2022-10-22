import { Controller } from "./Controller";
import { Question } from "./Question";
import { Quiz } from "./Quiz";
import { Team } from "./Team";

export interface GameState {
    state: 'waiting-for-teams' | 'playing' | 'results-page';
    question_state: 'waiting-votes' | 'showing-result';
    controllers: Controller[];
    teams: Team[];
    quiz: Quiz;
    currentQuestion: Question;
}