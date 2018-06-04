"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const atem_connection_1 = require("atem-connection");
function resolveSupersourceBoxState(oldState, newState) {
    const commands = [];
    for (const index in newState.video.superSourceBoxes) {
        const newBox = newState.video.superSourceBoxes[index] || {};
        const oldBox = oldState.video.superSourceBoxes[index] || {};
        const props = {};
        for (let key in newBox) {
            if (newBox[key] !== oldBox[key]) {
                props[key] = newBox[key];
            }
        }
        if (Object.keys(props).length > 0) {
            const command = new atem_connection_1.Commands.SuperSourceBoxParametersCommand();
            command.boxId = Number(index);
            command.updateProps(props);
            commands.push(command);
        }
    }
    return commands;
}
exports.resolveSupersourceBoxState = resolveSupersourceBoxState;
//# sourceMappingURL=supersourceBox.js.map