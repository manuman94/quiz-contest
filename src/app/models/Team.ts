import { Controller } from "./Controller";
import { TeamColor } from "./TeamColor";

export interface Team {
    name: String;
    color: TeamColor;
    controller: Controller;
}