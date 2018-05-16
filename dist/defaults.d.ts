import { VideoState } from 'atem-connection';
export declare namespace Defaults {
    namespace Video {
        const defaultInput = 0;
        const defaultRate = 25;
        const DownStreamKeyer: VideoState.DownstreamKeyer;
        const DipTransitionSettings: VideoState.DipTransitionSettings;
        const DVETransitionSettings: VideoState.DVETransitionSettings;
        const MixTransitionSettings: VideoState.MixTransitionSettings;
        const StingerTransitionSettings: VideoState.StingerTransitionSettings;
        const WipeTransitionSettings: VideoState.WipeTransitionSettings;
        const TransitionProperties: Partial<VideoState.TransitionProperties>;
        const TransitionSettings: VideoState.TransitionSettings;
        const MixEffect: Partial<VideoState.MixEffect>;
        const SuperSourceBox: VideoState.SuperSourceBox;
    }
}
