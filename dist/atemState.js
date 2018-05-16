"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Resolvers = require("./resolvers");
class AtemState {
    setState(state) {
        this._state = state;
    }
    getState() {
        return this._state;
    }
    diffState(newState) {
        return this.diffStates(this._state, newState);
    }
    diffStates(oldState, newState) {
        let commands = [];
        commands = commands.concat(Resolvers.videoState(oldState, newState));
        return commands;
    }
}
exports.AtemState = AtemState;
//# sourceMappingURL=atemState.js.map