import { Controller } from "./Controller";

export interface Team {
    name: string;
    controller: Controller;
    score: number;
}