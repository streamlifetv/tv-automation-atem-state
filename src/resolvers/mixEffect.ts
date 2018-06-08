import {
	Commands,
	Enums as ConnectionEnums,
	VideoState } from 'atem-connection'
import { Enums, State as StateObject } from '../'

import { resolveUpstreamKeyerState } from './upstreamKeyers'

export function resolveMixEffectsState (oldState: StateObject, newState: StateObject): Array<Commands.AbstractCommand> {
	let commands: Array<Commands.AbstractCommand> = []

	commands = commands.concat(resolveTransitionPropertiesState(oldState, newState))
	commands = commands.concat(resolveTransitionSettingsState(oldState, newState))
	commands = commands.concat(resolveUpstreamKeyerState(oldState, newState))

	// let a = resolveUpstreamKeyerState(oldState, newState)
	for (const mixEffectId in oldState.video.ME) {
		const oldMixEffect = oldState.video.ME[mixEffectId]
		const newMixEffect = newState.video.ME[mixEffectId]

		if (typeof newMixEffect.input !== 'undefined' && typeof newMixEffect.transition !== 'undefined') {
			if (typeof oldMixEffect.input === 'undefined') {
				oldMixEffect.input = oldMixEffect.programInput
			}
			if (newMixEffect.input !== oldMixEffect.input) {
				const command = new Commands.PreviewInputCommand()
				command.mixEffect = Number(mixEffectId)
				command.updateProps({ source: newMixEffect.input })
				commands.push(command)

				if (newMixEffect.transition === Enums.TransitionStyle.CUT) {
					const command = new Commands.CutCommand()
					command.mixEffect = Number(mixEffectId)
					commands.push(command)
				} else {
					if (newMixEffect.transition !== newMixEffect.transitionProperties.style) { // set style before auto transition command
						const command = new Commands.TransitionPropertiesCommand()
						command.mixEffect = Number(mixEffectId)
						command.updateProps({ style: newMixEffect.transition! as ConnectionEnums.TransitionStyle })
						commands.push(command)
					}

					const command = new Commands.AutoTransitionCommand()
					command.mixEffect = Number(mixEffectId)
					commands.push(command)
				}
			}
		} else {
			if (oldMixEffect.previewInput !== newMixEffect.previewInput) {
				const command = new Commands.PreviewInputCommand()
				command.mixEffect = Number(mixEffectId)
				command.updateProps({ source: newMixEffect.previewInput })
				commands.push(command)
			}
			if (oldMixEffect.programInput !== newMixEffect.programInput) {
				// @todo: check if we need to use the cut command?
				// use cut command if:
				//   DSK is tied
				//   Upstream Keyer is set for next transition
				const command = new Commands.ProgramInputCommand()
				command.mixEffect = Number(mixEffectId)
				command.updateProps({ source: newMixEffect.programInput })
				commands.push(command)
			}
		}

		if (newMixEffect.inTransition && oldMixEffect.transitionPosition !== newMixEffect.transitionPosition) {
			const command = new Commands.TransitionPositionCommand()
			command.mixEffect = Number(mixEffectId)
			command.updateProps({
				handlePosition: newMixEffect.transitionPosition
			})
			commands.push(command)
		}

		if (oldMixEffect.transitionPreview !== newMixEffect.transitionPreview) {
			const command = new Commands.PreviewTransitionCommand()
			command.mixEffect = Number(mixEffectId)
			command.updateProps({
				preview: newMixEffect.transitionPreview
			})
			commands.push(command)
		}

		// @todo: fadeToBlack
	}

	return commands
}

export function resolveTransitionPropertiesState (oldState: StateObject, newState: StateObject): Array<Commands.AbstractCommand> {
	const commands: Array<Commands.AbstractCommand> = []

	for (const mixEffectId in oldState.video.ME) {
		const oldTransitionProperties = oldState.video.ME[mixEffectId].transitionProperties
		const newTransitionProperties = newState.video.ME[mixEffectId].transitionProperties
		let props: Partial<{ selection: number, style: number }> = {}

		if (oldTransitionProperties.selection !== newTransitionProperties.selection) {
			props.selection = newTransitionProperties.selection
		}
		if (oldTransitionProperties.style !== newTransitionProperties.style) {
			props.style = newTransitionProperties.style
		}

		if (props.selection || props.style) {
			const command = new Commands.TransitionPropertiesCommand()
			command.mixEffect = Number(mixEffectId)
			command.updateProps(props)
			commands.push(command)
		}
	}

	return commands
}

export function resolveTransitionSettingsState (oldState: StateObject, newState: StateObject): Array<Commands.AbstractCommand> {
	const commands: Array<Commands.AbstractCommand> = []

	/**
	 * NOTE(balte - 2018-05-01):
	 * It's okay to use "as any" here, since all the keys come from the
	 * transitionObjects anyway, so we may assume everything has the same
	 * type. Unfortunately TypeScript is not able to understand that if
	 * we copy properties of the same name between objects of the same type
	 * the types are still safe.
	 */
	for (const mixEffectId in oldState.video.ME) {
		const oldTransitionSettings = oldState.video.ME[mixEffectId].transitionSettings
		const newTransitionSettings = newState.video.ME[mixEffectId].transitionSettings

		if (newTransitionSettings.dip) {
			const dipProperties: Partial<VideoState.DipTransitionSettings> = {}
			for (let key in oldTransitionSettings.dip) {
				if ((oldTransitionSettings.dip as any)[key] !== (newTransitionSettings.dip as any)[key]) {
					(dipProperties as any)[key] = (newTransitionSettings.dip as any)[key]
				}
			}
			if (Object.keys(dipProperties).length > 0) {
				let command = new Commands.TransitionDipCommand()
				command.mixEffect = Number(mixEffectId)
				command.updateProps(dipProperties)
				commands.push(command)
			}
		}

		if (newTransitionSettings.DVE) {
			const dveProperties: Partial<VideoState.DVETransitionSettings> = {}
			for (let key in oldTransitionSettings.DVE) {
				if ((oldTransitionSettings.DVE as any)[key] !== (newTransitionSettings.DVE as any)[key]) {
					(dveProperties as any)[key] = (newTransitionSettings.DVE as any)[key]
				}
			}
			if (Object.keys(dveProperties).length > 0) {
				let command = new Commands.TransitionDVECommand()
				command.mixEffect = Number(mixEffectId)
				command.updateProps(dveProperties)
				commands.push(command)
			}
		}

		if (newTransitionSettings.mix) {
			const mixProperties: Partial<VideoState.MixTransitionSettings> = {}
			for (let key in oldTransitionSettings.mix) {
				if ((oldTransitionSettings.mix as any)[key] !== (newTransitionSettings.mix as any)[key]) {
					(mixProperties as any)[key] = (newTransitionSettings.mix as any)[key]
				}
			}
			if (Object.keys(mixProperties).length > 0) {
				let command = new Commands.TransitionMixCommand()
				command.mixEffect = Number(mixEffectId)
				command.updateProps(mixProperties)
				commands.push(command)
			}
		}

		if (newTransitionSettings.stinger) {
			const stingerProperties: Partial<VideoState.StingerTransitionSettings> = {}
			for (let key in oldTransitionSettings.stinger) {
				if ((oldTransitionSettings.stinger as any)[key] !== (newTransitionSettings.stinger as any)[key]) {
					(stingerProperties as any)[key] = (newTransitionSettings.stinger as any)[key]
				}
			}
			if (Object.keys(stingerProperties).length > 0) {
				let command = new Commands.TransitionStingerCommand()
				command.mixEffect = Number(mixEffectId)
				command.updateProps(stingerProperties)
				commands.push(command)
			}
		}

		if (newTransitionSettings.wipe) {
			const wipeProperties: Partial<VideoState.WipeTransitionSettings> = {}
			for (let key in oldTransitionSettings.wipe) {
				if ((oldTransitionSettings.wipe as any)[key] !== (newTransitionSettings.wipe as any)[key]) {
					(wipeProperties as any)[key] = (newTransitionSettings.wipe as any)[key]
				}
			}
			if (Object.keys(wipeProperties).length > 0) {
				let command = new Commands.TransitionWipeCommand()
				command.mixEffect = Number(mixEffectId)
				command.updateProps(wipeProperties)
				commands.push(command)
			}
		}

	}

	return commands
}
