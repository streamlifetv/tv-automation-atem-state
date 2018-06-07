"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const atem_connection_1 = require("atem-connection");
function resolveChromaKeyerState(oldState, newState) {
    let commands = [];
    for (const mixEffectId in oldState.video.ME) {
        for (const upstreamKeyerId in oldState.video.ME[mixEffectId].upstreamKeyers) {
            const oldChromaKeyer = oldState.video.ME[mixEffectId].upstreamKeyers[upstreamKeyerId].chromaSettings;
            const newChromaKeyer = newState.video.ME[mixEffectId].upstreamKeyers[upstreamKeyerId].chromaSettings;
            const props = {};
            for (const key in atem_connection_1.Commands.MixEffectKeyChromaCommand.MaskFlags) {
                if (oldChromaKeyer[key] !== newChromaKeyer[key]) {
                    props[key] = newChromaKeyer[key];
                }
            }
            if (Object.keys(props).length > 0) {
                const command = new atem_connection_1.Commands.MixEffectKeyChromaCommand();
                command.upstreamKeyerId = Number(upstreamKeyerId);
                command.mixEffect = Number(mixEffectId);
                command.updateProps(props);
                commands.push(command);
            }
        }
    }
    return commands;
}
exports.resolveChromaKeyerState = resolveChromaKeyerState;
//# sourceMappingURL=chromaKeyer.js.map