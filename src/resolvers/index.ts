import { Commands } from 'atem-connection' // @todo: should come from main exports
import { State as StateObject } from '../'

import { resolveMixEffectsState } from './mixEffect'
import { resolveDownstreamKeyerState } from './downstreamKeyer'
import { resolveSupersourceBoxState } from './supersourceBox'

export function videoState (oldState: StateObject, newState: StateObject): Array<Commands.AbstractCommand> {
	let commands: Array<Commands.AbstractCommand> = []

	commands = commands.concat(resolveMixEffectsState(oldState, newState))
	commands = commands.concat(resolveDownstreamKeyerState(oldState, newState))
	commands = commands.concat(resolveSupersourceBoxState(oldState, newState))

	// resolve auxilliaries:
	for (const index in newState.video.auxilliaries) {
		if (oldState.video.auxilliaries[index] !== newState.video.auxilliaries[index]) {
			const command = new Commands.AuxSourceCommand()
			command.auxBus = Number(index)
			command.updateProps({ source: newState.video.auxilliaries[index] })
			commands.push(command)
		}
	}

	return commands
}
