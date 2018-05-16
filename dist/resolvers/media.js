"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const atem_connection_1 = require("atem-connection");
function resolveMediaPlayerState(oldState, newState) {
    const commands = [];
    for (const index in newState.media.players) {
        const newPlayer = newState.media.players[index];
        const oldPlayer = oldState.media.players[index];
        const props = {};
        for (let key in newPlayer) {
            if (newPlayer[key] !== oldPlayer[key]) {
                props[key] = newPlayer[key];
            }
        }
        if (Object.keys(props).length > 0) {
            const command = new atem_connection_1.Commands.MediaPlayerStatusCommand();
            command.mediaPlayerId = Number(index);
            command.updateProps(props);
            commands.push(command);
        }
    }
    return commands;
}
exports.resolveMediaPlayerState = resolveMediaPlayerState;
//# sourceMappingURL=media.js.map