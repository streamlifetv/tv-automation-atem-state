import { Commands } from 'atem-connection' // @todo: should come from main exports
import { State as StateObject } from '../../'
import { UpstreamKeyerPatternSettings } from 'atem-connection/dist/state/video/upstreamKeyers'

export function resolvePatternKeyerState (oldState: StateObject, newState: StateObject): Array<Commands.AbstractCommand> {
	let commands: Array<Commands.AbstractCommand> = []

	for (const mixEffectId in oldState.video.ME) {
		for (const upstreamKeyerId in oldState.video.ME[mixEffectId].upstreamKeyers) {
			const oldPatternKeyer = oldState.video.ME[mixEffectId].upstreamKeyers[upstreamKeyerId].patternSettings
			const newPatternKeyer = newState.video.ME[mixEffectId].upstreamKeyers[upstreamKeyerId].patternSettings
			const props: Partial<UpstreamKeyerPatternSettings> = {}

			for (const key in Commands.MixEffectKeyLumaCommand.MaskFlags) {
				if ((oldPatternKeyer as any)[key] !== (newPatternKeyer as any)[key]) {
					(props as any)[key] = (newPatternKeyer as any)[key]
				}
			}

			if (Object.keys(props).length > 0) {
				const command = new Commands.MixEffectKeyPatternCommand()
				command.upstreamKeyerId = Number(upstreamKeyerId)
				command.mixEffect = Number(mixEffectId)
				command.updateProps(props)
				commands.push(command)
			}
		}
	}

	return commands
}
