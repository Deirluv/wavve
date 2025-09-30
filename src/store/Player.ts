import { create } from 'zustand'

type PlayerState = {
    currentTrack: {
        title: string
        artist: string
        cover: string
    } | null
    isPlaying: boolean
    currentTime: number
    duration: number

    setTrack: (track: PlayerState['currentTrack']) => void
    togglePlay: () => void
    setTime: (time: number, duration: number) => void
}

export const usePlayerStore = create<PlayerState>((set) => ({
    currentTrack: {
        title: 'Default Track',
        artist: 'Default Artist',
        cover: 'https://images.squarespace-cdn.com/content/v1/520ed800e4b0229123208764/1625363370811-K6AOMZHX6KGT3T1GA14Q/_112482696_doja-cat-1392x1044.jpeg?format=2500w',
    },
    isPlaying: false,
    currentTime: 0,
    duration: 240,

    setTrack: (track) => set({ currentTrack: track, isPlaying: true, currentTime: 0, duration: 240 }), // Reset time after change track
    togglePlay: () =>
        set((state) => ({ isPlaying: !state.isPlaying })),

    setTime: (time, duration) => set({ currentTime: time, duration: duration }), // Function of updating
}))