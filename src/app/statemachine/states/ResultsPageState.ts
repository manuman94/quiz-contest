import StateMachine, { IState } from "../StateMachine";

export class ResultsPageState implements IState {
    name: string = 'results-page';
    onEnter(this: StateMachine) {
    }
    onExit(this: StateMachine) {

    }
}