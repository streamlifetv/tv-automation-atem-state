import AbstractCommand from 'atem-connection/dist/commands/AbstractCommand';
import { State as StateObject } from '../';
export declare function resolveDownstreamKeyerState(oldState: StateObject, newState: StateObject): Array<AbstractCommand>;
export declare function resolveDownstreamKeyerPropertiesState(oldState: StateObject, newState: StateObject): Array<AbstractCommand>;
export declare function resolveDownstreamKeyerMaskState(oldState: StateObject, newState: StateObject): Array<AbstractCommand>;
