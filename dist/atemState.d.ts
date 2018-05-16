import AbstractCommand from 'atem-connection/dist/commands/AbstractCommand';
import { State as StateObject } from '.';
export declare class AtemState {
    private _state;
    setState(state: StateObject): void;
    getState(): StateObject;
    diffState(newState: StateObject): Array<AbstractCommand>;
    diffStates(oldState: StateObject, newState: StateObject): Array<AbstractCommand>;
}
