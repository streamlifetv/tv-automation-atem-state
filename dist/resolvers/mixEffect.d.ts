import AbstractCommand from 'atem-connection/dist/commands/AbstractCommand';
import { State as StateObject } from '../';
export declare function resolveMixEffectsState(oldState: StateObject, newState: StateObject): Array<AbstractCommand>;
export declare function resolveTransitionPropertiesState(oldState: StateObject, newState: StateObject): Array<AbstractCommand>;
export declare function resolveTransitionSettingsState(oldState: StateObject, newState: StateObject): Array<AbstractCommand>;
