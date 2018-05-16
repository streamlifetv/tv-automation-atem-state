"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const atem_connection_1 = require("atem-connection");
var Defaults;
(function (Defaults) {
    let Video;
    (function (Video) {
        Video.defaultInput = 0; // black
        Video.defaultRate = 25; // 1 second
        Video.DownStreamKeyer = {
            onAir: false,
            inTransition: false,
            isAuto: false,
            remainingFrames: Video.defaultRate
        };
        Video.DipTransitionSettings = {
            rate: Video.defaultRate,
            input: Video.defaultInput
        };
        Video.DVETransitionSettings = {
            rate: Video.defaultRate,
            logoRate: Video.defaultRate,
            style: atem_connection_1.Enums.DVEEffect.PushLeft,
            fillSource: Video.defaultInput,
            keySource: Video.defaultInput,
            enableKey: false,
            preMultiplied: false,
            clip: 0,
            gain: 0,
            invertKey: false,
            reverse: false,
            flipFlop: false
        };
        Video.MixTransitionSettings = {
            rate: Video.defaultRate
        };
        Video.StingerTransitionSettings = {
            source: Video.defaultInput,
            preMultipliedKey: false,
            clip: 0,
            gain: 0,
            invert: false,
            preroll: 0,
            clipDuration: Video.defaultRate,
            triggerPoint: Math.ceil(Video.defaultRate / 2),
            mixRate: 1
        };
        Video.WipeTransitionSettings = {
            rate: Video.defaultRate,
            pattern: 1,
            borderWidth: 0,
            borderInput: Video.defaultInput,
            symmetry: 0,
            borderSoftness: 0,
            xPosition: 0,
            yPosition: 0,
            reverseDirection: false,
            flipFlop: false
        };
        Video.TransitionProperties = {
            style: atem_connection_1.Enums.TransitionStyle.MIX,
            selection: 1
        };
        Video.TransitionSettings = {
            dip: Video.DipTransitionSettings,
            DVE: Video.DVETransitionSettings,
            mix: Video.MixTransitionSettings,
            stinger: Video.StingerTransitionSettings,
            wipe: Video.WipeTransitionSettings
        };
        Video.MixEffect = {
            programInput: Video.defaultInput,
            previewInput: Video.defaultInput,
            inTransition: false,
            transitionPreview: false,
            transitionPosition: 0,
            fadeToBlack: false,
            transitionProperties: Video.TransitionProperties,
            transitionSettings: Video.TransitionSettings
        };
        Video.SuperSourceBox = {
            enabled: false,
            source: Video.defaultInput,
            x: 0,
            y: 0,
            size: 1,
            cropped: false,
            cropTop: 0,
            cropBottom: 0,
            cropLeft: 0,
            cropRight: 0
        };
    })(Video = Defaults.Video || (Defaults.Video = {}));
})(Defaults = exports.Defaults || (exports.Defaults = {}));
//# sourceMappingURL=defaults.js.map