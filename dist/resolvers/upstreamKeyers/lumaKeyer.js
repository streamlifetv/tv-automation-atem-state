"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const atem_connection_1 = require("atem-connection");
function resolveLumaKeyerState(oldState, newState) {
    let commands = [];
    for (const mixEffectId in oldState.video.ME) {
        for (const upstreamKeyerId in oldState.video.ME[mixEffectId].upstreamKeyers) {
            const oldLumaKeyer = oldState.video.ME[mixEffectId].upstreamKeyers[upstreamKeyerId].lumaSettings;
            const newLumaKeyer = newState.video.ME[mixEffectId].upstreamKeyers[upstreamKeyerId].lumaSettings;
            const props = {};
            for (const key in atem_connection_1.Commands.MixEffectKeyLumaCommand.MaskFlags) {
                if (oldLumaKeyer[key] !== newLumaKeyer[key]) {
                    props[key] = newLumaKeyer[key];
                }
            }
            if (Object.keys(props).length > 0) {
                const command = new atem_connection_1.Commands.MixEffectKeyLumaCommand();
                command.upstreamKeyerId = Number(upstreamKeyerId);
                command.mixEffect = Number(mixEffectId);
                command.updateProps(props);
                commands.push(command);
            }
        }
    }
    return commands;
}
exports.resolveLumaKeyerState = resolveLumaKeyerState;
//# sourceMappingURL=lumaKeyer.js.map