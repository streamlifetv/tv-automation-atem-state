"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const atem_connection_1 = require("atem-connection");
function resolveDownstreamKeyerState(oldState, newState) {
    const commands = [];
    for (const index in newState.video.downstreamKeyers) {
        const oldDsk = oldState.video.downstreamKeyers[index];
        const newDsk = newState.video.downstreamKeyers[index];
        if (!oldDsk.isAuto && newDsk.isAuto) {
            // @todo: transition rate
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
//# sourceMappingURL=downstreamKeyer.js.map