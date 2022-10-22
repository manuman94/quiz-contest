import { BuzzControllerButton } from "./BuzzControllerButton";
import { Team } from "./Team";

export interface Controller {
    team?: Team;
    buttonOffset: number;
}