"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const atem_connection_1 = require("atem-connection");
class AtemState {
    setState(state) {
        this._state = state;
    }
    getState() {
        return this._state;
    }
    diffState(newState) {
        return this.diffStates(this._state, newState);
    }
    diffStates(oldState, newState) {
        let commands = [];
        commands = commands.concat(this.resolveVideoState(oldState, newState));
        return commands;
    }
    applyCommands(commands) {
        for (let command of commands) {
            command.applyToState(this._state); // do we care about the read only parameters?
        }
    }
    resolveVideoState(oldState, newState) {
        let commands = [];
        commands = commands.concat(this.resolveMixEffectsState(oldState, newState));
        return commands;
    }
    resolveMixEffectsState(oldState, newState) {
        let commands = [];
        for (const mixEffectId in oldState.video.ME) {
            const oldMixEffect = oldState.video.ME[mixEffectId];
            const newMixEffect = newState.video.ME[mixEffectId];
            if (oldMixEffect.previewInput !== newMixEffect.previewInput) {
                const command = new atem_connection_1.Commands.PreviewInputCommand();
                command.mixEffect = Number(mixEffectId);
                command.properties.source = newMixEffect.previewInput;
                commands.push(command);
            }
            if (oldMixEffect.programInput !== newMixEffect.programInput) {
                // @todo: check if we need to use the cut command?
                // use cut command if:
                //   DSK is tied
                //   Upstream Keyer is set for next transition
                const command = new atem_connection_1.Commands.ProgramInputCommand();
                command.mixEffect = Number(mixEffectId);
                command.updateProps({ source: newMixEffect.programInput });
                commands.push(command);
            }
            if (!oldMixEffect.inTransition && newMixEffect.inTransition) {
                const command = new atem_connection_1.Commands.AutoTransitionCommand();
                command.mixEffect = Number(mixEffectId);
                commands.push(command);
            }
            else if (!oldMixEffect.inTransition && oldMixEffect.transitionPosition !== newMixEffect.transitionPosition) {
                const command = new atem_connection_1.Commands.TransitionPositionCommand();
                command.mixEffect = Number(mixEffectId);
                command.updateProps({
                    handlePosition: newMixEffect.transitionPosition
                });
                commands.push(command);
            }
            if (oldMixEffect.transitionPreview !== newMixEffect.transitionPreview) {
                const command = new atem_connection_1.Commands.PreviewTransitionCommand();
                command.mixEffect = Number(mixEffectId);
                command.updateProps({
                    preview: newMixEffect.transitionPreview
                });
                commands.push(command);
            }
            // @todo: fadeToBlack
        }
        commands = commands.concat(this.resolveTransitionPropertiesState(oldState, newState));
        commands = commands.concat(this.resolveTransitionSettingsState(oldState, newState));
        return commands;
    }
    resolveTransitionPropertiesState(oldState, newState) {
        const commands = [];
        for (const mixEffectId in oldState.video.ME) {
            const oldTransitionProperties = oldState.video.ME[mixEffectId].transitionProperties;
            const newTransitionProperties = newState.video.ME[mixEffectId].transitionProperties;
            let props = {};
            if (oldTransitionProperties.selection !== newTransitionProperties.selection) {
                props.selection = newTransitionProperties.selection;
            }
            if (oldTransitionProperties.style !== newTransitionProperties.style) {
                props.style = newTransitionProperties.style;
            }
            if (props.selection || props.style) {
                const command = new atem_connection_1.Commands.TransitionPropertiesCommand();
                command.mixEffect = Number(mixEffectId);
                command.updateProps(props);
                commands.push(command);
            }
        }
        return commands;
    }
    resolveTransitionSettingsState(oldState, newState) {
        const commands = [];
        /**
         * NOTE(balte - 2018-05-01):
         * It's okay to use "as any" here, since all the keys come from the
         * transitionObjects anyway, so we may assume everything has the same
         * type. Unfortunately TypeScript is not able to understand that if
         * we copy properties of the same name between objects of the same type
         * the types are still safe.
         */
        for (const mixEffectId in oldState.video.ME) {
            const oldTransitionSettings = oldState.video.ME[mixEffectId].transitionSettings;
            const newTransitionSettings = newState.video.ME[mixEffectId].transitionSettings;
            const dipProperties = {};
            for (let key in oldTransitionSettings.dip) {
                if (oldTransitionSettings.dip[key] !== newTransitionSettings.dip[key]) {
                    dipProperties[key] = newTransitionSettings.dip[key];
                }
            }
            if (Object.keys(dipProperties).length > 0) {
                let command = new atem_connection_1.Commands.TransitionDipCommand();
                command.mixEffect = Number(mixEffectId);
                command.updateProps(dipProperties);
                commands.push(command);
            }
            const dveProperties = {};
            for (let key in oldTransitionSettings.DVE) {
                if (oldTransitionSettings.DVE[key] !== newTransitionSettings.DVE[key]) {
                    dveProperties[key] = newTransitionSettings.DVE[key];
                }
            }
            if (Object.keys(dveProperties).length > 0) {
                let command = new atem_connection_1.Commands.TransitionDVECommand();
                command.mixEffect = Number(mixEffectId);
                command.updateProps(dveProperties);
                commands.push(command);
            }
            const mixProperties = {};
            for (let key in oldTransitionSettings.mix) {
                if (oldTransitionSettings.mix[key] !== newTransitionSettings.mix[key]) {
                    mixProperties[key] = newTransitionSettings.mix[key];
                }
            }
            if (Object.keys(mixProperties).length > 0) {
                let command = new atem_connection_1.Commands.TransitionMixCommand();
                command.mixEffect = Number(mixEffectId);
                command.updateProps(mixProperties);
                commands.push(command);
            }
            const stingerProperties = {};
            for (let key in oldTransitionSettings.stinger) {
                if (oldTransitionSettings.stinger[key] !== newTransitionSettings.stinger[key]) {
                    stingerProperties[key] = newTransitionSettings.stinger[key];
                }
            }
            if (Object.keys(stingerProperties).length > 0) {
                let command = new atem_connection_1.Commands.TransitionStingerCommand();
                command.mixEffect = Number(mixEffectId);
                command.updateProps(stingerProperties);
                commands.push(command);
            }
            const wipeProperties = {};
            for (let key in oldTransitionSettings.wipe) {
                if (oldTransitionSettings.wipe[key] !== newTransitionSettings.wipe[key]) {
                    wipeProperties[key] = newTransitionSettings.wipe[key];
                }
            }
            if (Object.keys(wipeProperties).length > 0) {
                let command = new atem_connection_1.Commands.TransitionWipeCommand();
                command.mixEffect = Number(mixEffectId);
                command.updateProps(wipeProperties);
                commands.push(command);
            }
        }
        return commands;
    }
}
exports.AtemState = AtemState;
//# sourceMappingURL=atemState.js.map