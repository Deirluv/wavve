import { create } from 'zustand'

type TrackMetadata = {
    id: string
    title: string
    artist: string
    cover: string
    fileUrl: string
}

type PlayerState = {
    currentTrack: TrackMetadata | null
    isPlaying: boolean
    currentTime: number
    duration: number
    volume: number // volume from 0 to 1

    setTrack: (track: TrackMetadata | null) => void
    togglePlay: (forcePlay?: boolean) => void
    setDuration: (duration: number) => void
    setCurrentTime: (time: number) => void
    togglePlayingState: (isPlaying: boolean) => void
    setVolume: (volume: number) => void
}

const DEFAULT_DURATION = 0;
const INITIAL_VOLUME = 0.5;
const STORAGE_KEY = 'wavve-player-state';

const getInitialState = (): Partial<PlayerState> => {
    if (typeof window === 'undefined') {
        return { volume: INITIAL_VOLUME };
    }
    try {
        const storedState = localStorage.getItem(STORAGE_KEY);
        if (storedState) {
            const parsed = JSON.parse(storedState);
            // Loading track and volume
            return {
                currentTrack: parsed.currentTrack || null,
                volume: parsed.volume ?? INITIAL_VOLUME,
            };
        }
    } catch (e) {
        console.error("Failed to load state from Local Storage:", e);
    }
    return { volume: INITIAL_VOLUME };
};

const initialState = getInitialState();

export const usePlayerStore = create<PlayerState>((set, get) => ({
    currentTrack: initialState.currentTrack || null,
    isPlaying: false,
    currentTime: 0,
    duration: DEFAULT_DURATION,
    volume: initialState.volume || INITIAL_VOLUME,

    setTrack: (track) => set({
        currentTrack: track,
        isPlaying: track !== null,
        currentTime: 0,
        duration: DEFAULT_DURATION
    }),

    togglePlay: (forcePlay) =>
        set((state) => {
            const newIsPlaying = forcePlay !== undefined ? forcePlay : !state.isPlaying;
            return { isPlaying: newIsPlaying };
        }),

    setDuration: (duration) => set({ duration: duration }),

    setCurrentTime: (time) => set({ currentTime: time }),

    togglePlayingState: (isPlaying) => set({ isPlaying }),

    // Volume
    setVolume: (volume) => set({ volume: Math.min(1, Math.max(0, volume)) }),
}))

// Save in storage only track and volume
if (typeof window !== 'undefined') {
    usePlayerStore.subscribe((state) => {
        const stateToSave = {
            currentTrack: state.currentTrack,
            volume: state.volume,
        };
        localStorage.setItem(STORAGE_KEY, JSON.stringify(stateToSave));
    });
}