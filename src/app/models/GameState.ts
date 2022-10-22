import { Controller } from "./Controller";
import { Team } from "./Team";

export interface GameState {
    state: 'waiting-for-teams' | 'playing' | 'results-page';
    controllers: Controller[];
    teams: Team[];
}