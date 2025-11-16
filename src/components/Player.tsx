'use client'
import { usePlayerStore } from '@/store/Player'
import Image from 'next/image'
import { Play, Pause, SkipBack, SkipForward, Shuffle, Repeat, Heart, Volume2, List} from 'lucide-react'
import { useSession } from 'next-auth/react'
import { useRef, useEffect } from 'react'
import { useRouter } from 'next/navigation'

const formatTime = (timeInSeconds: number): string => {
    if (!isFinite(timeInSeconds) || timeInSeconds < 0) return '0:00';

    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = Math.floor(timeInSeconds % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
};

export default function Player() {
    const router = useRouter();
    const { status } = useSession();
    const audioRef = useRef<HTMLAudioElement | null>(null);

    const {
        currentTrack,
        isPlaying,
        togglePlay,
        currentTime,
        duration,
        setDuration,
        setCurrentTime,
        togglePlayingState,
        volume,
        setVolume,
    } = usePlayerStore()

    const isAuthenticated = status === 'authenticated';
    const isLoading = status === 'loading';

    useEffect(() => {
        const audio = audioRef.current;
        if (!audio || !currentTrack) return;

        const fileUrl = currentTrack.fileUrl;

        // sync the src
        if (audio.src !== fileUrl) {
            audio.src = fileUrl;
            audio.load(); // Инициирует загрузку и событие loadedmetadata
            console.log(`[Player] Track source updated to: ${fileUrl}`);
        }

        // sync the volume
        if (audio.volume !== volume) {
            audio.volume = volume;
        }

        // play/pause

        if (isPlaying) {
            audio.play().catch(error => {
                console.error("Autoplay prevented:", error);
                togglePlayingState(false);
            });
        } else {
            audio.pause();
        }

        // events

        const handleLoadedMetadata = () => {
            const newDuration = audio.duration;
            if (isFinite(newDuration) && newDuration > 0) {
                setDuration(Math.floor(newDuration));
                console.log(`[Player] Metadata loaded. Duration set to: ${Math.floor(newDuration)}s`);
            } else {
                console.warn(`[Player] Invalid duration received: ${newDuration}`);
                setDuration(0);
            }
        };

        const handleTimeUpdate = () => {
            setCurrentTime(audio.currentTime);
        };

        const handlePlay = () => togglePlayingState(true);
        const handlePause = () => togglePlayingState(false);
        const handleEnded = () => {
            togglePlayingState(false);
            setCurrentTime(0);
        };

        const handleError = () => {
            console.error("[Player] Audio Error:", audio.error);
            togglePlayingState(false);
        };

        // listeners
        audio.addEventListener('loadedmetadata', handleLoadedMetadata);
        audio.addEventListener('timeupdate', handleTimeUpdate);
        audio.addEventListener('ended', handleEnded);
        audio.addEventListener('play', handlePlay);
        audio.addEventListener('pause', handlePause);
        audio.addEventListener('error', handleError);

        // cleanup

        // if component destroyed or dependencies change delete listeners
        return () => {
            audio.removeEventListener('loadedmetadata', handleLoadedMetadata);
            audio.removeEventListener('timeupdate', handleTimeUpdate);
            audio.removeEventListener('ended', handleEnded);
            audio.removeEventListener('play', handlePlay);
            audio.removeEventListener('pause', handlePause);
            audio.removeEventListener('error', handleError);
        };

        // dependency
    }, [isPlaying, currentTrack?.fileUrl, volume, setDuration, setCurrentTime, togglePlayingState]);


    // seek and volume

    // move seekbar
    const handleSeek = (event: React.MouseEvent<HTMLDivElement>) => {
        const audio = audioRef.current;
        if (!audio || duration === 0) return;

        const rect = event.currentTarget.getBoundingClientRect();
        // click in percent
        const clickPositionRatio = (event.clientX - rect.left) / rect.width;
        // new time
        const newTime = duration * clickPositionRatio;

        audio.currentTime = newTime;
        setCurrentTime(newTime); // updating store immedietly

        // if the track wasn't playing while clicking the seekbar it will turn on
        if (!isPlaying) {
            togglePlay(true);
        }
    };

    // volume change
    const handleVolumeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        // volume from 0 to 1
        const newVolume = parseFloat(event.target.value);
        setVolume(newVolume);
        // sync with audio.volume happens in useEffect
    };

    if (isLoading || !isAuthenticated || !currentTrack) {
        return null
    }

    const progressPercent = duration > 0 ? (currentTime / duration) * 100 : 0
    const progressBarWidth = `${Math.min(progressPercent, 100)}%`

    const navigateToSongPage = () => {
        if (currentTrack?.id) {
            router.push(`/song/${currentTrack.id}`);
        }
    };


    return (
        <div className="fixed bottom-0 left-0 right-0 z-50">
            {/* html5 audio element */}
            <audio
                ref={audioRef}
                preload="auto"
            />

            {/* progress bar */}
            <div
                className="relative w-full h-1 bg-gray-400 cursor-pointer group"
                onClick={handleSeek} // seek move on click
            >
                <div
                    className="absolute top-0 left-0 h-1 bg-purple-600 rounded-r transition-all duration-100 ease-linear"
                    style={{ width: progressBarWidth }}
                >
                    {/* handler small dot */}
                    <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 bg-purple-600 rounded-full shadow-md transition-all duration-150 scale-0 group-hover:scale-100"></div>
                </div>
            </div>

            <div className="bg-[#D9D9D9] text-black rounded-t-xl px-4 py-2">
                <div className="flex items-center justify-between mt-1">

                    {/* track info cover title */}
                    <div className="flex items-center gap-3 cursor-pointer" onClick={navigateToSongPage}>
                        <div className="w-14 h-14 relative rounded-lg">
                            <Image
                                src={currentTrack.cover}
                                alt={currentTrack.title}
                                fill
                                className="object-cover rounded-lg"
                            />
                        </div>
                        <div className="flex flex-col">
                            <span className="font-semibold truncate max-w-[150px]">{currentTrack.title}</span>
                            <span className="text-sm truncate max-w-[150px]">{currentTrack.artist}</span>
                        </div>
                    </div>

                    {/* elements */}
                    <div className="flex flex-col items-center w-1/3">
                        <div className="flex items-center gap-4">
                            <Shuffle className="w-5 h-5 cursor-pointer" />
                            <SkipBack className="w-5 h-5 fill-black cursor-pointer" />
                            <button
                                onClick={() => togglePlay()}
                                className="bg-black rounded-full p-2"
                            >
                                {isPlaying ? (
                                    <Pause className="text-white w-6 h-6" />
                                ) : (
                                    <Play className="text-white w-6 h-6" />
                                )}
                            </button>
                            <SkipForward className="w-5 h-5 fill-black cursor-pointer" />
                            <Repeat className="w-5 h-5 cursor-pointer" />
                        </div>

                        {/* time */}
                        <div className='flex items-center text-xs gap-2 mt-1'>
                            <span>{formatTime(currentTime)}</span>
                            <span className='text-gray-600'>/</span>
                            <span>{formatTime(duration)}</span>
                        </div>
                    </div>

                    {/* volume and list */}
                    <div className="flex items-center gap-3">
                        <Heart className="w-5 h-5 cursor-pointer" />
                        <Volume2 className="w-5 h-5" />
                        {/* volume knob */}
                        <input
                            type="range"
                            min="0"
                            max="1"
                            step="0.01"
                            value={volume} // linked to store
                            onChange={handleVolumeChange} // updates store and audio.volume through useEffect
                            className="w-24 accent-black cursor-pointer"
                        />
                        <List className="w-5 h-5 fill-black cursor-pointer" />
                    </div>
                </div>
            </div>
        </div>
    )
}