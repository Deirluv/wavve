"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import Link from "next/link"; // Импортируем Link для кликабельности
import {
    getUserProfileData,
    UserProfileApiDto
} from "@/app/api/users/users.api";
import {
    Share2,
    Edit,
    Play,
    Disc,
    AlertTriangle
} from 'lucide-react';
import {
    FacebookShareButton,
    TwitterShareButton,
    TelegramShareButton
} from "next-share";

const ACCENT_COLOR_CLASS = "text-sc-accent";
const SECONDARY_TEXT_CLASS = "text-sc-tertiary";
const CARD_BG_CLASS = "bg-sc-card-bg";
const BORDER_COLOR_CLASS = "border-sc-tertiary/50";
const ICON_COLOR_CLASS = "text-sc-secondary";

type ProfileTab = 'all' | 'tracks' | 'playlists';

// --- ИСПРАВЛЕНО: TrackCard теперь кликабельный и без ArtistName ---
const TrackCard = ({ track }: { track: any }) => (
    // 🔑 ИЗМЕНЕНИЕ: Оборачиваем в Link для перехода на страницу трека
    <Link href={`/song/${track.id}`} className="block group">
        <div className="flex flex-col">
            <div className="relative w-full aspect-square object-cover rounded-md overflow-hidden bg-gray-700">
                <img
                    src={track.previewUrl || "/image_icon.png"}
                    alt={track.title}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
            </div>
            {/* 🔑 ИЗМЕНЕНИЕ: Удалена строка с Artist Name */}
            <span className="text-sm font-semibold text-white mt-2 truncate group-hover:text-sc-accent transition">{track.title}</span>
        </div>
    </Link>
);

// --- PlaylistListItem (Без изменений) ---
const PlaylistListItem = ({ playlist }: { playlist: any }) => (
    <div className="flex items-center space-x-3 p-2 rounded-lg hover:bg-white/5 transition duration-150">
        <div className="w-14 h-14 relative flex-shrink-0">
            <img
                src={"/image_icon.png"}
                alt={playlist.name || playlist}
                className="w-full h-full object-cover rounded-md"
            />
            <Play className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white w-5 h-5 opacity-75 fill-white" />
        </div>
        <div className="flex-grow">
            <span className={`text-xs ${ACCENT_COLOR_CLASS}`}>Playlist</span>
            <h3 className="text-white font-semibold truncate">{playlist.name || playlist}</h3>
            <p className={`text-xs ${SECONDARY_TEXT_CLASS} truncate`}>{playlist.description || 'No description'}</p>
        </div>
        <div className={SECONDARY_TEXT_CLASS}>
            &#x22EE;
        </div>
    </div>
);


export default function ProfilePage() {
    const params = useParams();
    const userIdInUrl = Array.isArray(params?.id) ? params.id[0] : null;

    const { data: session, status } = useSession();
    const CURRENT_USER_ID = session?.user?.id || "loading";

    const [profileData, setProfileData] = useState<UserProfileApiDto | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [activeTab, setActiveTab] = useState<ProfileTab>('all');

    const router = useRouter();
    const [showShare, setShowShare] = useState(false);


    useEffect(() => {
        if (status === 'loading') return;

        const profileIdToLoad = userIdInUrl || (status === 'authenticated' ? CURRENT_USER_ID : null);

        if (!profileIdToLoad || profileIdToLoad === "loading") {
            if (status === 'unauthenticated' && !userIdInUrl) {
                setIsLoading(false);
                setError("Please, authorize to see the profiles data.");
            }
            return;
        }

        const fetchProfile = async () => {
            setIsLoading(true);
            setError(null);

            try {
                const apiData = await getUserProfileData(profileIdToLoad);

                setProfileData(apiData);

            } catch (err) {
                console.error("Loading data error:", err);
                setError((err as Error).message || "An unknown error occurred while fetching data.");
                setProfileData(null);
            } finally {
                setIsLoading(false);
            }
        };

        fetchProfile();

    }, [userIdInUrl, status, CURRENT_USER_ID]);

    if (isLoading || status === 'loading') {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="flex flex-col items-center">
                    <Disc className="w-10 h-10 animate-spin text-sc-accent" />
                    <div className={`text-center mt-4 text-white/70`}>Loading profile...</div>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-sc-background text-white">
                <div className={`max-w-md w-full ${CARD_BG_CLASS} border border-red-700/50 rounded-2xl p-8 text-center shadow-2xl`}>
                    <div className="flex justify-center mb-4">
                        <AlertTriangle className="w-14 h-14 text-red-400" />
                    </div>

                    <h2 className="text-2xl font-bold mb-2 text-white">Error loading data</h2>
                    <p className={`${SECONDARY_TEXT_CLASS} mb-6`}>
                        {error || "Can't get user's data. Please try again later."}
                    </p>

                    <div className="flex flex-col space-y-3">
                        <button
                            onClick={() => window.location.reload()}
                            className={`w-full px-4 py-2 bg-sc-accent text-white rounded-full font-semibold hover:opacity-80 transition duration-150`}
                        >
                            Try again
                        </button>

                        <button
                            onClick={() => window.history.back()}
                            className={`w-full px-4 py-2 border ${BORDER_COLOR_CLASS} ${ICON_COLOR_CLASS} rounded-full hover:${ACCENT_COLOR_CLASS} hover:border-sc-accent transition duration-150`}
                        >
                            Back
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    if (!profileData) {
        return <div className={`text-center mt-10 text-white/70`}>Profile not found.</div>;
    }

    const isMyProfile = status === 'authenticated' && CURRENT_USER_ID === profileData.id;

    const tracksCount = profileData.tracks?.length ?? 0;
    // last 5 tracks
    const recentTracks = profileData.tracks ?
        [...profileData.tracks]
            .sort((a, b) => new Date(b.uploadedAt).getTime() - new Date(a.uploadedAt).getTime())
            .slice(0, 5)
        : [];
    const playlistsCount = profileData.playlists?.length ?? 0;

    const navItems: { label: string, tab: ProfileTab, count?: number }[] = [
        { label: 'All', tab: 'all' },
        { label: 'Tracks', tab: 'tracks', count: tracksCount },
        { label: 'Playlists', tab: 'playlists', count: playlistsCount },
    ];


    return (
        <div className="min-h-screen flex justify-center">
            <div className="w-full max-w-7xl bg-sc-background min-h-screen text-white shadow-2xl">

                {/* header (banner and user info) */}
                <header className="relative">
                    {/* banner */}
                    <div className="w-full h-40 bg-gradient-to-r from-sc-accent/70 to-sc-card-bg/70"></div>

                    {/* container pfp, name and buttons */}
                    <div className="flex items-end px-6 md:px-10 pb-2 -mt-10">

                        {/* pfp */}
                        <div className="relative flex-shrink-0">
                            <img
                                src={
                                    profileData.avatarUrl
                                        ? profileData.avatarUrl
                                        : "https://www.svgrepo.com/show/452030/avatar-default.svg"
                                }
                                alt={profileData.userName}
                                className="w-32 h-32 md:w-40 md:h-40 rounded-full object-cover shadow-lg border-2 border-white"
                            />
                        </div>

                        {/* name */}
                        <div className="ml-6 flex-grow">
                            <h1 className="text-3xl font-bold">{profileData.userName}</h1>
                            <p className={`${SECONDARY_TEXT_CLASS} mt-1`}>{profileData.bio || 'Musician / Artist'}</p>
                        </div>

                        {/* buttons share/edit/follow */}
                        <div className="flex space-x-3 pb-2">
                            {/* share always visible */}
                            <div className="relative">
                                <button
                                    onClick={() => setShowShare(!showShare)}
                                    className={`flex items-center px-4 py-2 text-sm ${CARD_BG_CLASS} border ${BORDER_COLOR_CLASS} ${ICON_COLOR_CLASS} rounded-full hover:bg-white/10 transition duration-150`}
                                >
                                    <Share2 className="w-4 h-4 mr-2" />
                                    Share
                                </button>

                                {showShare && (
                                    <div className="absolute right-0 mt-2 bg-sc-card-bg border border-sc-tertiary/40 rounded-lg shadow-lg p-3 z-50 flex space-x-3">
                                        <FacebookShareButton url={typeof window !== "undefined" ? window.location.href : ""}>
                                            <img src="https://www.svgrepo.com/show/299425/facebook.svg" alt="Facebook" className="w-20 h-6" />
                                        </FacebookShareButton>

                                        <TwitterShareButton url={typeof window !== "undefined" ? window.location.href : ""}>
                                            <img src="https://www.svgrepo.com/show/183608/twitter.svg" alt="Twitter" className="w-20 h-6" />
                                        </TwitterShareButton>

                                        <TelegramShareButton url={typeof window !== "undefined" ? window.location.href : ""}>
                                            <img src="https://www.svgrepo.com/show/354443/telegram.svg" alt="Telegram" className="w-20 h-6" />
                                        </TelegramShareButton>
                                    </div>
                                )}
                            </div>

                            {/* button edit or follow */}
                            {isMyProfile ? (
                                <button
                                    onClick={() => router.push("/edit")}
                                    className={`flex items-center px-4 py-2 text-sm ${CARD_BG_CLASS} border ${BORDER_COLOR_CLASS} ${ICON_COLOR_CLASS} rounded-full hover:bg-white/10 transition duration-150`}
                                >
                                    <Edit className="w-4 h-4 mr-2" />
                                    Edit
                                </button>
                            ) : (
                                <button
                                    className={`flex items-center px-4 py-2 text-sm bg-sc-accent text-white rounded-full hover:opacity-80 transition duration-150`}
                                >
                                    Follow
                                </button>
                            )}
                        </div>
                    </div>
                </header>

                {/* nav tabs */}
                <nav className="w-full border-b border-white/10 mt-4 px-6 md:px-10">
                    <ul className="flex space-x-6 text-sm font-semibold">
                        {navItems.map(item => (
                            <li key={item.tab}>
                                <button
                                    onClick={() => setActiveTab(item.tab)}
                                    className={`py-3 ${activeTab === item.tab
                                        ? `border-b-2 border-sc-accent text-sc-accent`
                                        : `text-white/70 hover:text-white`
                                    } transition duration-150`}
                                >
                                    {item.label}
                                    {item.count !== undefined && <span className="ml-1 text-xs text-white/50">{item.count}</span>}
                                </button>
                            </li>
                        ))}
                    </ul>
                </nav>

                {/* content 2 columns */}
                <main className="grid grid-cols-1 lg:grid-cols-3 gap-8 p-6 md:px-10 md:pt-6">
                    {/* left column (main content based on tab) */}
                    <div className="lg:col-span-2 space-y-10">

                        {/* all tab content (recent Tracks + playlists) */}
                        {activeTab === 'all' && (
                            <>
                                {/* recent Tracks (last 5) */}
                                <section>
                                    <h2 className="text-xl font-bold mb-4">Recent Tracks</h2>
                                    {recentTracks.length > 0 ? (
                                        // grid 5
                                        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                                            {recentTracks.map((track) => (
                                                <TrackCard
                                                    key={track.id}
                                                    track={track}
                                                />
                                            ))}
                                        </div>
                                    ) : (
                                        <p className="text-white/70">No recently uploaded tracks.</p>
                                    )}
                                </section>

                                {/* playlists */}
                                <section>
                                    <h2 className="text-xl font-bold mb-4">Playlists</h2>
                                    {profileData.playlists && profileData.playlists.length > 0 ? (
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            {profileData.playlists.slice(0, 4).map((playlist, index) => (
                                                <PlaylistListItem
                                                    key={playlist.id || index}
                                                    playlist={playlist}
                                                />
                                            ))}
                                        </div>
                                    ) : (
                                        <p className="text-white/70">No public playlists.</p>
                                    )}
                                </section>
                            </>
                        )}


                        {/* tracks tab */}
                        {activeTab === 'tracks' && (
                            <section>
                                <h2 className="text-xl font-bold mb-4">All Tracks ({tracksCount})</h2>
                                {profileData.tracks && profileData.tracks.length > 0 ? (
                                    // Сетка 4 колонки для всех треков
                                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                        {profileData.tracks.map((track) => ( // Все треки
                                            <TrackCard
                                                key={track.id}
                                                track={track}
                                            />
                                        ))}
                                    </div>
                                ) : (
                                    <p className="text-white/70">This user hasn&#39;t uploaded any tracks yet.</p>
                                )}
                            </section>
                        )}

                        {/* playlists tab */}
                        {activeTab === 'playlists' && (
                            <section>
                                <h2 className="text-xl font-bold mb-4">All Playlists ({playlistsCount})</h2>
                                {profileData.playlists && profileData.playlists.length > 0 ? (
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        {profileData.playlists.map((playlist, index) => (
                                            <PlaylistListItem
                                                key={playlist.id || index}
                                                playlist={playlist}
                                            />
                                        ))}
                                    </div>
                                ) : (
                                    <p className="text-white/70">This user hasn&#39;t created any public playlists yet.</p>
                                )}
                            </section>
                        )}


                    </div>

                    {/* right column (stats, liked Tracks, following) */}
                    <aside className="lg:col-span-1 space-y-8">

                        {/* stats (followers, following, tracks) */}
                        <div className={`flex justify-between items-center p-4 ${CARD_BG_CLASS} rounded-lg`}>
                            <div className="text-center">
                                <p className="text-xl font-bold text-white">{profileData.followersCount}</p>
                                <p className={`text-sm ${SECONDARY_TEXT_CLASS}`}>Followers</p>
                            </div>
                            <div className="text-center">
                                <p className="text-xl font-bold text-white">{profileData.followingsCount}</p>
                                <p className={`text-sm ${SECONDARY_TEXT_CLASS}`}>Following</p>
                            </div>
                            <div className="text-center">
                                <p className="text-xl font-bold text-white">{tracksCount}</p>
                                <p className={`text-sm ${SECONDARY_TEXT_CLASS}`}>Tracks</p>
                            </div>
                        </div>

                        {/* likes (ЗАГЛУШКА) */}
                        <div className={`bg-sc-card-bg p-4 rounded-lg`}>
                            <div className="flex justify-between items-center mb-4">
                                <h3 className="text-white font-bold">0 LIKES</h3>
                                <button className={`text-sm ${ACCENT_COLOR_CLASS} hover:underline`}>Show All</button>
                            </div>
                            <p className="text-white/70 text-sm">No liked tracks to show.</p>
                        </div>

                        {/* following (ЗАГЛУШКА) */}
                        <div className={`bg-sc-card-bg p-4 rounded-lg`}>
                            <div className="flex justify-between items-center mb-4">
                                <h3 className="text-white font-bold">0 FOLLOWING</h3>
                                <button className={`text-sm ${ACCENT_COLOR_CLASS} hover:underline`}>Show All</button>
                            </div>
                            <p className="text-white/70 text-sm">No users followed.</p>
                        </div>
                    </aside>
                </main>
            </div>
        </div>
    );
}