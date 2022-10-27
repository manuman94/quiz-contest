import { NgZone } from '@angular/core';

export interface IState {
    name: string;
    onEnter?: (stateMachine: any) => void;
	onExit?: (stateMachine: any) => void;
}

let machineId = 0

export default class StateMachine
{
	private states = new Map<string, IState>();
	private currentState?: IState;

	private context?: object;

    constructor(private id: string){}

    addStateFromInstance(state: IState) {
        this.states.set(state.name, state);
    }

	setState(name: string)
    {
        if (!this.states.has(name))
        {
            console.warn(`Tried to change to unknown state: ${name}`)
            return
        }
    
        if (this.isCurrentState(name))
        {
            console.log('Trying to change to the same');
            return;
        }
    
        console.log(`[StateMachine (${this.id})] change from ${this.currentState?.name ?? 'none'} to ${name}`);
    
        if (this.currentState && this.currentState.onExit)
        {
            this.currentState.onExit(this);
        }

        this.currentState = this.states.get(name)!;

        if (this.currentState.onEnter)
        {
            this.currentState.onEnter(this);
        }
    }

    isCurrentState(name: string)
	{
		if (!this.currentState)
		{
			return false
		}

		return this.currentState.name === name
	}
}