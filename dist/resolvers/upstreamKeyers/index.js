"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const atem_connection_1 = require("atem-connection");
const dveKeyer_1 = require("./dveKeyer");
const chromaKeyer_1 = require("./chromaKeyer");
const lumaKeyer_1 = require("./lumaKeyer");
const patternKeyer_1 = require("./patternKeyer");
function resolveUpstreamKeyerState(oldState, newState) {
    let commands = [];
    commands = commands.concat(resolveUpstreamKeyerMaskState(oldState, newState));
    commands = commands.concat(dveKeyer_1.resolveDVEKeyerState(newState, oldState));
    commands = commands.concat(chromaKeyer_1.resolveChromaKeyerState(newState, oldState));
    commands = commands.concat(lumaKeyer_1.resolveLumaKeyerState(newState, oldState));
    commands = commands.concat(patternKeyer_1.resolvePatternKeyerState(newState, oldState));
    for (const mixEffectId in oldState.video.ME) {
        for (const upstreamKeyerId in oldState.video.ME[mixEffectId].upstreamKeyers) {
            const oldKeyer = oldState.video.ME[mixEffectId].upstreamKeyers[upstreamKeyerId];
            const newKeyer = newState.video.ME[mixEffectId].upstreamKeyers[upstreamKeyerId];
            if (oldKeyer.fillSource !== newKeyer.fillSource) {
                const command = new atem_connection_1.Commands.MixEffectKeyFillSourceSetCommand();
                command.upstreamKeyerId = Number(upstreamKeyerId);
                command.mixEffect = Number(mixEffectId);
                command.updateProps({
                    fillSource: newKeyer.fillSource
                });
                commands.push(command);
            }
            if (oldKeyer.cutSource !== newKeyer.cutSource) {
                const command = new atem_connection_1.Commands.MixEffectKeyCutSourceSetCommand();
                command.upstreamKeyerId = Number(upstreamKeyerId);
                command.mixEffect = Number(mixEffectId);
                command.updateProps({
                    cutSource: newKeyer.cutSource
                });
                commands.push(command);
            }
            if (oldKeyer.mixEffectKeyType !== newKeyer.mixEffectKeyType || oldKeyer.flyEnabled !== newKeyer.flyEnabled) {
                const command = new atem_connection_1.Commands.MixEffectKeyTypeSetCommand();
                command.upstreamKeyerId = Number(upstreamKeyerId);
                command.mixEffect = Number(mixEffectId);
                if (oldKeyer.mixEffectKeyType !== newKeyer.mixEffectKeyType)
                    command.updateProps({ keyType: newKeyer.mixEffectKeyType });
                if (oldKeyer.flyEnabled !== newKeyer.flyEnabled)
                    command.updateProps({ flyEnabled: newKeyer.flyEnabled });
                commands.push(command);
            }
            if (oldKeyer.onAir !== newKeyer.onAir) {
                const command = new atem_connection_1.Commands.MixEffectKeyOnAirCommand();
                command.upstreamKeyerId = Number(upstreamKeyerId);
                command.mixEffect = Number(mixEffectId);
                command.updateProps({
                    onAir: newKeyer.onAir
                });
                commands.push(command);
            }
        }
    }
    return commands;
}
exports.resolveUpstreamKeyerState = resolveUpstreamKeyerState;
function resolveUpstreamKeyerMaskState(oldState, newState) {
    let commands = [];
    for (const mixEffectId in oldState.video.ME) {
        for (const upstreamKeyerId in oldState.video.ME[mixEffectId].upstreamKeyers) {
            const oldKeyer = oldState.video.ME[mixEffectId].upstreamKeyers[upstreamKeyerId];
            const newKeyer = newState.video.ME[mixEffectId].upstreamKeyers[upstreamKeyerId];
            const props = {};
            if (oldKeyer.maskEnabled !== newKeyer.maskEnabled)
                props.maskEnabled = newKeyer.maskEnabled;
            if (oldKeyer.maskLeft !== newKeyer.maskLeft)
                props.maskLeft = newKeyer.maskLeft;
            if (oldKeyer.maskRight !== newKeyer.maskRight)
                props.maskRight = newKeyer.maskRight;
            if (oldKeyer.maskTop !== newKeyer.maskTop)
                props.maskTop = newKeyer.maskTop;
            if (oldKeyer.maskBottom !== newKeyer.maskBottom)
                props.maskBottom = newKeyer.maskBottom;
            if (Object.keys(props).length > 0) {
                const command = new atem_connection_1.Commands.MixEffectKeyMaskSetCommand();
                command.upstreamKeyerId = Number(upstreamKeyerId);
                command.mixEffect = Number(mixEffectId);
                command.updateProps(props);
                commands.push(command);
            }
        }
    }
    return commands;
}
exports.resolveUpstreamKeyerMaskState = resolveUpstreamKeyerMaskState;
//# sourceMappingURL=index.js.map