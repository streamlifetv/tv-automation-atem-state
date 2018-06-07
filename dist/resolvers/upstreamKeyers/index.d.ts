import AbstractCommand from 'atem-connection/dist/commands/AbstractCommand';
import { State as StateObject } from '../../';
export declare function resolveUpstreamKeyerState(oldState: StateObject, newState: StateObject): Array<AbstractCommand>;
export declare function resolveUpstreamKeyerMaskState(oldState: StateObject, newState: StateObject): Array<AbstractCommand>;
