import { Commands } from 'atem-connection' // @todo: should come from main exports
import { State as StateObject } from '../'
import { DownstreamKeyerProperties, DownstreamKeyerMask } from 'atem-connection/dist/state/video/downstreamKeyers'

export function resolveDownstreamKeyerState (oldState: StateObject, newState: StateObject): Array<Commands.AbstractCommand> {
	let commands: Array<Commands.AbstractCommand> = []

	commands = commands.concat(resolveDownstreamKeyerMaskState(oldState, newState))
	commands = commands.concat(resolveDownstreamKeyerPropertiesState(oldState, newState))

	for (const index in newState.video.downstreamKeyers) {
		const oldDsk = oldState.video.downstreamKeyers[index]
		const newDsk = newState.video.downstreamKeyers[index]

		if (oldDsk.sources.fillSource !== newDsk.sources.fillSource) {
			const command = new Commands.DownstreamKeyFillSourceCommand()
			command.downstreamKeyerId = Number(index)
			command.updateProps({ input: newDsk.sources.fillSource })
			commands.push(command)
		}
		if (oldDsk.sources.cutSource !== newDsk.sources.cutSource) {
			const command = new Commands.DownstreamKeyCutSourceCommand()
			command.downstreamKeyerId = Number(index)
			command.updateProps({ input: newDsk.sources.cutSource })
			commands.push(command)
		}

		if (!oldDsk.isAuto && newDsk.isAuto) {
			const command = new Commands.DownstreamKeyAutoCommand()
			command.downstreamKeyId = Number(index)
			commands.push(command)
		} else if (oldDsk.onAir !== newDsk.onAir) {
			const command = new Commands.DownstreamKeyOnAirCommand()
			command.downstreamKeyId = Number(index)
			command.properties = { onAir: newDsk.onAir }
			commands.push(command)
		}
	}

	return commands
}

export function resolveDownstreamKeyerPropertiesState (oldState: StateObject, newState: StateObject): Array<Commands.AbstractCommand> {
	const commands: Array<Commands.AbstractCommand> = []

	for (const index in newState.video.downstreamKeyers) {
		const oldProps = oldState.video.downstreamKeyers[index].properties
		const newProps = newState.video.downstreamKeyers[index].properties
		const dskIndex = Number(index)
		const props: Partial<DownstreamKeyerProperties> = {}

		if (oldProps.clip !== newProps.clip) {
			props.clip = newProps.clip
		}
		if (oldProps.gain !== newProps.gain) {
			props.gain = newProps.gain
		}
		if (oldProps.invert !== newProps.invert) {
			props.invert = newProps.invert
		}
		if (oldProps.preMultiply !== newProps.preMultiply) {
			props.preMultiply = newProps.preMultiply
		}

		if (Object.keys(props).length > 0) {
			const command = new Commands.DownstreamKeyGeneralCommand()
			command.downstreamKeyerId = dskIndex
			command.updateProps(props)
			commands.push(command)
		}

		if (oldProps.rate !== newProps.rate) {
			const command = new Commands.DownstreamKeyRateCommand()
			command.downstreamKeyerId = dskIndex
			command.updateProps({ rate: newProps.rate })
			commands.push(command)
		}

		if (oldProps.tie !== newProps.tie) {
			const command = new Commands.DownstreamKeyTieCommand()
			command.downstreamKeyId = dskIndex
			command.updateProps({ tie: newProps.tie })
			commands.push(command)
		}
	}

	return commands
}

export function resolveDownstreamKeyerMaskState (oldState: StateObject, newState: StateObject): Array<Commands.AbstractCommand> {
	const commands: Array<Commands.AbstractCommand> = []

	for (const index in newState.video.downstreamKeyers) {
		const oldProps = oldState.video.downstreamKeyers[index].properties.mask
		const newProps = newState.video.downstreamKeyers[index].properties.mask
		const dskIndex = Number(index)
		const props: Partial<DownstreamKeyerMask> = {}

		for (let key in newProps) {
			if ((newProps as any)[key] !== (oldProps as any)[key]) {
				(props as any)[key] = (newProps as any)[key]
			}
		}

		if (Object.keys(props).length > 0) {
			const command = new Commands.DownstreamKeyMaskCommand()
			command.downstreamKeyerId = dskIndex
			command.updateProps(props)
			commands.push(command)
		}
	}

	return commands
}
