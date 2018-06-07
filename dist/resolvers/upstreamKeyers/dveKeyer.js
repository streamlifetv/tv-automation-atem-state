"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const atem_connection_1 = require("atem-connection");
function resolveDVEKeyerState(oldState, newState) {
    let commands = [];
    for (const mixEffectId in oldState.video.ME) {
        for (const upstreamKeyerId in oldState.video.ME[mixEffectId].upstreamKeyers) {
            const oldDVEKeyer = oldState.video.ME[mixEffectId].upstreamKeyers[upstreamKeyerId].dveSettings;
            const newDVEKeyer = newState.video.ME[mixEffectId].upstreamKeyers[upstreamKeyerId].dveSettings;
            const props = {};
            for (const key in atem_connection_1.Commands.MixEffectKeyDVECommand.MaskFlags) {
                if (oldDVEKeyer[key] !== newDVEKeyer[key]) {
                    props[key] = newDVEKeyer[key];
                }
            }
            if (Object.keys(props).length > 0) {
                const command = new atem_connection_1.Commands.MixEffectKeyDVECommand();
                command.upstreamKeyerId = Number(upstreamKeyerId);
                command.mixEffect = Number(mixEffectId);
                command.updateProps(props);
                commands.push(command);
            }
        }
    }
    return commands;
}
exports.resolveDVEKeyerState = resolveDVEKeyerState;
//# sourceMappingURL=dveKeyer.js.map