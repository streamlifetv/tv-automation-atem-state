"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const atem_connection_1 = require("atem-connection");
function resolvePatternKeyerState(oldState, newState) {
    let commands = [];
    for (const mixEffectId in oldState.video.ME) {
        for (const upstreamKeyerId in oldState.video.ME[mixEffectId].upstreamKeyers) {
            const oldPatternKeyer = oldState.video.ME[mixEffectId].upstreamKeyers[upstreamKeyerId].patternSettings;
            const newPatternKeyer = newState.video.ME[mixEffectId].upstreamKeyers[upstreamKeyerId].patternSettings;
            const props = {};
            for (const key in atem_connection_1.Commands.MixEffectKeyLumaCommand.MaskFlags) {
                if (oldPatternKeyer[key] !== newPatternKeyer[key]) {
                    props[key] = newPatternKeyer[key];
                }
            }
            if (Object.keys(props).length > 0) {
                const command = new atem_connection_1.Commands.MixEffectKeyPatternCommand();
                command.upstreamKeyerId = Number(upstreamKeyerId);
                command.mixEffect = Number(mixEffectId);
                command.updateProps(props);
                commands.push(command);
            }
        }
    }
    return commands;
}
exports.resolvePatternKeyerState = resolvePatternKeyerState;
//# sourceMappingURL=patternKeyer.js.map