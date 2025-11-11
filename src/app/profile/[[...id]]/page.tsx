"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { useSession } from "next-auth/react";
import { getUserProfileData, UserProfileApiDto } from "@/app/api/users/users.api";
import { Share2, Edit, Play} from 'lucide-react';
import { FacebookShareButton, TwitterShareButton, TelegramShareButton } from "next-share";
import { useRouter } from "next/navigation";

const ACCENT_COLOR_CLASS = "text-sc-accent";
const SECONDARY_TEXT_CLASS = "text-sc-tertiary";
const CARD_BG_CLASS = "bg-sc-card-bg";
const BORDER_COLOR_CLASS = "border-sc-tertiary/50";
const ICON_COLOR_CLASS = "text-sc-secondary";

const TEST_IMAGES = {
    PROFILE: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSw7n9x9XbO-qBaZc1-kB0ShF1o8XFiQdtzlU3oyEpuDG--ElM0Aus7mwqo78ilVxjHi9U&usqp=CAU",
    RECENT_1: "https://thecircle.de/cdn/shop/articles/sabrina-carpenter-header-1.jpg?v=1726603933",
    RECENT_2: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR2SnQX0dupw_oXQfUC_oeGszGR8W7lVIcDog&s",
    PLAYLIST_1: "https://image.stern.de/33665872/t/IH/v13/w1440/r1.3333/-/dua-lipa-barbie.jpg",
    PLAYLIST_2: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQhNr8htJYmdreoSRcqDgOl7SVUs0kaEiPICg&s",
    LIKE: "https://thecircle.de/cdn/shop/articles/Billie-Eilish-HEADER.jpg?v=1719391383",
    FOLLOWING: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR6sDdZ6oItg8kPZsiSHS7NEuVTRCqrRkm6RA&s",
};


// Functional components
const RecentTrackCard = ({ track, imageSrc }) => (
    <div className="flex flex-col">
        <img src={imageSrc} alt={track.Title} className="w-full aspect-square object-cover rounded-md" />
        <span className="text-sm font-semibold text-white mt-2 truncate">{track.Title}</span>
        <span className={`text-xs ${SECONDARY_TEXT_CLASS} truncate`}>{track.UserName || 'Unknown Artist'}</span>
    </div>
);

const PlaylistListItem = ({ playlist, imageSrc }) => (
    <div className="flex items-center space-x-3">
        <div className="w-14 h-14 relative flex-shrink-0">
            <img src={imageSrc} alt={playlist.Name} className="w-full h-full object-cover rounded-md" />
            <Play className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white w-5 h-5 opacity-75 fill-white" />
        </div>
        <div className="flex-grow">
            <span className={`text-xs ${ACCENT_COLOR_CLASS}`}>Playlist</span>
            <h3 className="text-white font-semibold truncate">{playlist.Name}</h3>
            <p className={`text-xs ${SECONDARY_TEXT_CLASS} truncate`}>{playlist.Description}</p>
        </div>
        <div className={SECONDARY_TEXT_CLASS}>
            &#x22EE;
        </div>
    </div>
);

const LikedTrackItem = ({ track, imageSrc }) => (
    <div className="flex items-center space-x-3 p-2 rounded-lg hover:bg-white/5 transition duration-150">
        <img src={imageSrc} alt={track.title} className="w-12 h-12 object-cover rounded-md flex-shrink-0" />
        <div className="flex-grow">
            <p className="text-sm font-semibold truncate">{track.title}</p>
            <p className={`text-xs ${SECONDARY_TEXT_CLASS} truncate`}>{track.artist}</p>
        </div>
        <div className={SECONDARY_TEXT_CLASS}>
            &#x22EE;
        </div>
    </div>
);

const FollowingUserItem = ({ user, imageSrc }) => (
    <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
            <img src={imageSrc} alt={user.name} className="w-10 h-10 rounded-full object-cover" />
            <div>
                <p className="text-white font-semibold">{user.name}</p>
                <p className={`text-xs ${SECONDARY_TEXT_CLASS}`}>{user.followers} followers</p>
            </div>
        </div>
        <button className={`text-xs px-3 py-1 border ${BORDER_COLOR_CLASS} ${ICON_COLOR_CLASS} rounded-full hover:${ACCENT_COLOR_CLASS} hover:border-sc-accent transition duration-150`}>
            Following
        </button>
    </div>
);


// Main Component
export default function ProfilePage() {
    const params = useParams();
    const userIdInUrl = Array.isArray(params?.id) ? params.id[0] : null;

    const { data: session, status } = useSession();
    const CURRENT_USER_ID = session?.user?.id || "loading";

    const [profileData, setProfileData] = useState<UserProfileApiDto | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const [likes, setLikes] = useState<any[]>([]);
    const [following, setFollowing] = useState<any[]>([
        { name: "Billie Eilish", followers: "3.06M" },
        { name: "The Chainsmokers", followers: "4.5M" },
    ]);

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
        return <div className={`text-center mt-10 text-white/70`}>Loading profile...</div>;
    }

    if (error) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-sc-background text-white">
                <div className={`max-w-md w-full ${CARD_BG_CLASS} border ${BORDER_COLOR_CLASS} rounded-2xl p-8 text-center shadow-2xl`}>
                    <div className="flex justify-center mb-4">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            className="w-14 h-14 text-red-400"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M12 9v3.75m0 3.75h.008v.008H12V16.5zm0 6.75a9.75 9.75 0 1 0 0-19.5 9.75 9.75 0 0 0 0 19.5z"
                            />
                        </svg>
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
    const likesCount = 0;

    return (
        <div className="min-h-screen flex justify-center">
            <div className="w-full max-w-7xl bg-sc-background min-h-screen text-white shadow-2xl">

                {/* Header (Banner and user info) */}
                <header className="relative">
                    {/* Banner */}
                    <div className="w-full h-40 bg-gradient-to-r from-sc-accent/70 to-sc-card-bg/70"></div>

                    {/* Container PFP, name and buttons */}
                    <div className="flex items-end px-6 md:px-10 pb-2">

                        {/* Pfp */}
                        <div className="relative -mt-10 flex-shrink-0">
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

                        {/* Name */}
                        <div className="ml-6 flex-grow">
                            <h1 className="text-3xl font-bold">{profileData.userName}</h1>
                            <p className={`${SECONDARY_TEXT_CLASS} mt-1`}>@{profileData.userName}</p>
                            {profileData.bio && <p className={`${SECONDARY_TEXT_CLASS} mt-1`}>{profileData.bio}</p>}
                        </div>

                        {/* Buttons Share/Edit/Follow */}
                        <div className="flex space-x-3 pb-2">
                            {/* Share always visible */}
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

                            {/* Button EDIT or FOLLOW */}
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

                {/* Nav (Tabs) */}
                {/* ... */}

                {/* Content (2 Columns) */}
                <main className="grid grid-cols-1 lg:grid-cols-3 gap-8 p-6 md:px-10 md:pt-6">
                    {/* Left column (Recent, Playlists) */}
                    <div className="lg:col-span-2 space-y-10">

                        {/* Recent Tracks */}
                        <section>
                            <h2 className="text-xl font-bold mb-4">Recent Tracks</h2>
                            {profileData.tracks && profileData.tracks.length > 0 ? (
                                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                    {profileData.tracks.slice(0, 8).map((track, index) => (
                                        <RecentTrackCard
                                            key={track.Id}
                                            track={track}
                                            imageSrc={TEST_IMAGES.RECENT_1}
                                        />
                                    ))}
                                </div>
                            ) : (
                                <p className="text-white/70">No recently uploaded tracks.</p>
                            )}
                        </section>

                        {/* Playlists */}
                        <section>
                            <h2 className="text-xl font-bold mb-4">Playlists</h2>
                            {profileData.playlists && profileData.playlists.length > 0 ? (
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {profileData.playlists.map((playlist, index) => (
                                        <PlaylistListItem
                                            key={playlist.Id}
                                            playlist={playlist}
                                            imageSrc={TEST_IMAGES.PLAYLIST_1}
                                        />
                                    ))}
                                </div>
                            ) : (
                                <p className="text-white/70">No public playlists.</p>
                            )}
                        </section>
                    </div>

                    {/* Right column (Stats, Liked Tracks, Following) */}
                    <aside className="lg:col-span-1 space-y-8">

                        {/* Stats (Followers, Following, Tracks) */}
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

                        {/* Likes (ЗАГЛУШКА) */}
                        <div className={`bg-sc-card-bg p-4 rounded-lg`}>
                            <div className="flex justify-between items-center mb-4">
                                <h3 className="text-white font-bold">{likesCount} LIKES</h3>
                            </div>
                        </div>

                        {/* Following (ЗАГЛУШКА) */}
                        <div className={`bg-sc-card-bg p-4 rounded-lg`}>
                            <div className="flex justify-between items-center mb-4">
                                <h3 className="text-white font-bold">{following.length} FOLLOWING</h3>
                            </div>
                        </div>
                    </aside>
                </main>
            </div>
        </div>
    );
}