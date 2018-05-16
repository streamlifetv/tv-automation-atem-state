"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const atem_connection_1 = require("atem-connection");
const mixEffect_1 = require("./mixEffect");
const downstreamKeyer_1 = require("./downstreamKeyer");
const supersourceBox_1 = require("./supersourceBox");
function videoState(oldState, newState) {
    let commands = [];
    commands = commands.concat(mixEffect_1.resolveMixEffectsState(oldState, newState));
    commands = commands.concat(downstreamKeyer_1.resolveDownstreamKeyerState(oldState, newState));
    commands = commands.concat(supersourceBox_1.resolveSupersourceBoxState(oldState, newState));
    // resolve auxilliaries:
    for (const index in newState.video.auxilliaries) {
        if (oldState.video.auxilliaries[index] !== newState.video.auxilliaries[index]) {
            const command = new atem_connection_1.Commands.AuxSourceCommand();
            command.auxBus = Number(index);
            command.updateProps({ source: newState.video.auxilliaries[index] });
            commands.push(command);
        }
    }
    return commands;
}
exports.videoState = videoState;
//# sourceMappingURL=index.js.map