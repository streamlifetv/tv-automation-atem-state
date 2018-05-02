import { AtemState as StateObject } from 'atem-connection';
import AbstractCommand from 'atem-connection/dist/commands/AbstractCommand';
export declare class AtemState {
    private _state;
    setState(state: StateObject): void;
    getState(): StateObject;
    diffState(newState: StateObject): Array<AbstractCommand>;
    diffStates(oldState: StateObject, newState: StateObject): Array<AbstractCommand>;
    applyCommands(commands: Array<AbstractCommand>): void;
    private resolveVideoState(oldState, newState);
    private resolveMixEffectsState(oldState, newState);
    private resolveTransitionPropertiesState(oldState, newState);
    private resolveTransitionSettingsState(oldState, newState);
}
