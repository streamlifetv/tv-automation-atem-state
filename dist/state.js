"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const atem_connection_1 = require("atem-connection");
class AtemVideoState extends atem_connection_1.VideoState.AtemVideoState {
    constructor() {
        super(...arguments);
        this.ME = [];
    }
}
exports.AtemVideoState = AtemVideoState;
class State extends atem_connection_1.AtemState {
    constructor() {
        super(...arguments);
        this.video = new AtemVideoState();
    }
}
exports.State = State;
//# sourceMappingURL=state.js.map