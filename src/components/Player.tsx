'use client'
import { usePlayerStore } from '@/store/Player'
import Image from 'next/image'
import { Play, Pause, SkipBack, SkipForward, Shuffle, Repeat, Heart, Volume2, List} from 'lucide-react'
import { useSession } from 'next-auth/react'

export default function Player() {

    const { status } = useSession();

    const {
        currentTrack,
        isPlaying,
        togglePlay,
        currentTime,
        duration,
    } = usePlayerStore()


    const isAuthenticated = status === 'authenticated';
    const isLoading = status === 'loading';

    if (isLoading || !isAuthenticated || !currentTrack) {
        return null
    }

    // To check so we're not diving by zero
    const progressPercent = duration > 0 ? (currentTime / duration) * 100 : 0
    const progressBarWidth = `${Math.min(progressPercent, 100)}%`


    return (
        <div className="fixed bottom-0 left-0 right-0 z-50">
            <div className="relative w-full h-1 bg-gray-400">
                <div
                    className="absolute top-0 left-0 h-1 bg-purple-600 rounded-r transition-all duration-300 ease-linear"
                    style={{ width: progressBarWidth }}
                ></div>
            </div>

            <div className="bg-[#D9D9D9] text-black rounded-t-xl px-4 py-2">
                <div className="flex items-center justify-between mt-1">
                    <div className="flex items-center gap-3">
                        <div className="w-14 h-14 relative rounded-lg">
                            <Image
                                src={currentTrack.cover}
                                alt={currentTrack.title}
                                fill
                                className="object-cover rounded-lg"
                            />
                        </div>
                        <div className="flex flex-col">
                            <span className="font-semibold">{currentTrack.title}</span>
                            <span className="text-sm">{currentTrack.artist}</span>
                        </div>
                    </div>

                    <div className="flex flex-col items-center w-1/3">
                        <div className="flex items-center gap-4">
                            <Shuffle className="w-5 h-5" />
                            <SkipBack className="w-5 h-5 fill-black" />
                            <button
                                onClick={togglePlay}
                                className="bg-black rounded-full p-2"
                            >
                                {isPlaying ? (
                                    <Pause className="text-white w-6 h-6" />
                                ) : (
                                    <Play className="text-white w-6 h-6" />
                                )}
                            </button>
                            <SkipForward className="w-5 h-5 fill-black" />
                            <Repeat className="w-5 h-5" />
                        </div>
                    </div>

                    <div className="flex items-center gap-3">
                        <Heart className="w-5 h-5" />
                        <Volume2 className="w-5 h-5" />
                        <input type="range" className="w-24 accent-black" />
                        <List className="w-5 h-5 fill-black" />
                    </div>
                </div>
            </div>
        </div>
    )
}
