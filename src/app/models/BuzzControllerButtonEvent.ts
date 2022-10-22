import { BuzzControllerButton } from "./BuzzControllerButton";
import { Controller } from "./Controller";

export interface BuzzControllerButtonEvent {
    controller: Controller;
    button: BuzzControllerButton;
}