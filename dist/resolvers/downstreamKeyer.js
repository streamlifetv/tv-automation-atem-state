"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const atem_connection_1 = require("atem-connection");
function resolveDownstreamKeyerState(oldState, newState) {
    let commands = [];
    commands = commands.concat(resolveDownstreamKeyerMaskState(oldState, newState));
    commands = commands.concat(resolveDownstreamKeyerPropertiesState(oldState, newState));
    for (const index in newState.video.downstreamKeyers) {
        const oldDsk = oldState.video.downstreamKeyers[index];
        const newDsk = newState.video.downstreamKeyers[index];
        if (oldDsk.sources.fillSource !== newDsk.sources.fillSource) {
            const command = new atem_connection_1.Commands.DownstreamKeyFillSourceCommand();
            command.downstreamKeyerId = Number(index);
            command.updateProps({ input: newDsk.sources.fillSource });
            commands.push(command);
        }
        if (oldDsk.sources.cutSource !== newDsk.sources.cutSource) {
            const command = new atem_connection_1.Commands.DownstreamKeyCutSourceCommand();
            command.downstreamKeyerId = Number(index);
            command.updateProps({ input: newDsk.sources.cutSource });
            commands.push(command);
        }
        if (!oldDsk.isAuto && newDsk.isAuto) {
            const command = new atem_connection_1.Commands.DownstreamKeyAutoCommand();
            command.downstreamKeyId = Number(index);
            commands.push(command);
        }
        else if (oldDsk.onAir !== newDsk.onAir) {
            const command = new atem_connection_1.Commands.DownstreamKeyOnAirCommand();
            command.downstreamKeyId = Number(index);
            command.properties = { onAir: newDsk.onAir };
            commands.push(command);
        }
    }
    return commands;
}
exports.resolveDownstreamKeyerState = resolveDownstreamKeyerState;
function resolveDownstreamKeyerPropertiesState(oldState, newState) {
    const commands = [];
    for (const index in newState.video.downstreamKeyers) {
        const oldProps = oldState.video.downstreamKeyers[index].properties;
        const newProps = newState.video.downstreamKeyers[index].properties;
        const dskIndex = Number(index);
        const props = {};
        if (oldProps.clip !== newProps.clip) {
            props.clip = newProps.clip;
        }
        if (oldProps.gain !== newProps.gain) {
            props.gain = newProps.gain;
        }
        if (oldProps.invert !== newProps.invert) {
            props.invert = newProps.invert;
        }
        if (oldProps.preMultiply !== newProps.preMultiply) {
            props.preMultiply = newProps.preMultiply;
        }
        if (Object.keys(props).length > 0) {
            const command = new atem_connection_1.Commands.DownstreamKeyGeneralCommand();
            command.downstreamKeyerId = dskIndex;
            command.updateProps(props);
            commands.push(command);
        }
        if (oldProps.rate !== newProps.rate) {
            const command = new atem_connection_1.Commands.DownstreamKeyRateCommand();
            command.downstreamKeyerId = dskIndex;
            command.updateProps({ rate: newProps.rate });
            commands.push(command);
        }
        if (oldProps.tie !== newProps.tie) {
            const command = new atem_connection_1.Commands.DownstreamKeyTieCommand();
            command.downstreamKeyId = dskIndex;
            command.updateProps({ tie: newProps.tie });
            commands.push(command);
        }
    }
    return commands;
}
exports.resolveDownstreamKeyerPropertiesState = resolveDownstreamKeyerPropertiesState;
function resolveDownstreamKeyerMaskState(oldState, newState) {
    const commands = [];
    for (const index in newState.video.downstreamKeyers) {
        const oldProps = oldState.video.downstreamKeyers[index].properties.mask;
        const newProps = newState.video.downstreamKeyers[index].properties.mask;
        const dskIndex = Number(index);
        const props = {};
        for (let key in newProps) {
            if (newProps[key] !== oldProps[key]) {
                props[key] = newProps[key];
            }
        }
        if (Object.keys(props).length > 0) {
            const command = new atem_connection_1.Commands.DownstreamKeyMaskCommand();
            command.downstreamKeyerId = dskIndex;
            command.updateProps(props);
            commands.push(command);
        }
    }
    return commands;
}
exports.resolveDownstreamKeyerMaskState = resolveDownstreamKeyerMaskState;
//# sourceMappingURL=downstreamKeyer.js.map