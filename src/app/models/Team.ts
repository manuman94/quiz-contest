import { Controller } from "./Controller";

export interface Team {
    ready?: boolean;
    name: string;
    icon: string;
    controller: Controller;
    score: number;
}