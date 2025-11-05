import Image from 'next/image';
import Link from 'next/link';
import { Play, Heart, Share2, CornerUpRight, MessageSquare } from 'lucide-react';

// Assuming Next.js App Router structure where params are passed to the component
interface SongPageProps {
    params: {
        id: string; // The song ID (slug) from the URL
    };
}

export default function SongPage({ params }: SongPageProps) {
    const { id } = params;

    // Simulate fetching/decoding data from the slug
    const slugParts = id.split('-');
    const songArtist = slugParts.length > 1 ? slugParts[slugParts.length - 1].replace(/[^a-z0-9]/gi, ' ') : 'Unknown Artist';
    const songTitle = slugParts.slice(0, slugParts.length - 1).join(' ').replace(/[^a-z0-9\s]/gi, ' ') || 'Unknown Title';

    // Placeholder Data
    const actualTitle = songTitle.split(' ').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
    const actualArtist = songArtist.charAt(0).toUpperCase() + songArtist.slice(1);
    const placeholderImage = "https://i.ytimg.com/vi/d846WI05ySU/maxresdefault.jpg";
    const totalComments = 124;
    const totalLikes = 1530;

    return (
        // Set a base dark background for the entire page
        <main className="min-h-screen text-white">

            {/* 🎧 Header Section */}
            <section className="">
                <div className="max-w-7xl mx-auto px-6 py-8 flex flex-col md:flex-row gap-6 items-start">

                    {/* Cover Art */}
                    <div className="flex-shrink-0 w-48 h-48 sm:w-64 sm:h-64 rounded-lg overflow-hidden shadow-lg">
                        <Image
                            src={placeholderImage}
                            alt={actualTitle}
                            width={300}
                            height={300}
                            className="w-full h-full object-cover"
                        />
                    </div>

                    {/* Info and Play Button */}
                    <div className="flex-grow flex flex-col justify-between h-48 sm:h-64">
                        <div className="flex flex-col">
                            {/* Artist Link (Placeholder) */}
                            <Link href={`/artist/${actualArtist.toLowerCase().replace(' ', '-')}`} className="text-sm font-medium text-gray-400 hover:text-purple-400 transition mb-1">
                                {actualArtist}
                            </Link>

                            {/* Title */}
                            <h1 className="text-3xl sm:text-4xl font-extrabold mb-3 leading-tight">
                                {actualTitle}
                            </h1>
                        </div>

                        {/* ⏯️ Play Button & Stats */}
                        <div className="flex items-center space-x-4 mt-auto">
                            <button className="flex items-center bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 px-6 rounded-full transition text-lg shadow-lg">
                                {/* 👈 Используем компонент Play из lucide-react */}
                                <Play className="w-6 h-6 mr-2 stroke-white" />
                                Play
                            </button>
                            <span className="text-sm text-gray-500">
                                4.5M Plays
                            </span>
                        </div>
                    </div>
                </div>
            </section>

            {/* Action Bar */}
            <div className="max-w-7xl mx-auto px-6 py-4">
                <div className="flex space-x-3 text-sm">
                    <button className="flex items-center space-x-1 p-2 rounded-full border border-gray-700 text-gray-300 hover:bg-gray-800 transition">
                        <Heart className="w-5 h-5" />
                        <span>Like</span>
                        <span className="text-xs text-gray-500 ml-1">{totalLikes}</span>
                    </button>

                    <button className="flex items-center space-x-1 p-2 rounded-full border border-gray-700 text-gray-300 hover:bg-gray-800 transition">
                        <CornerUpRight className="w-5 h-5" />
                        <span>Repost</span>
                    </button>

                    <button className="flex items-center space-x-1 p-2 rounded-full border border-gray-700 text-gray-300 hover:bg-gray-800 transition">
                        <Share2 className="w-5 h-5" />
                        <span>Share</span>
                    </button>
                </div>
            </div>

            {/* 💬 Main Content */}
            <div className="max-w-7xl mx-auto px-6 py-8 space-y-8">

                {/* Description/Info */}
                <div className="max-w-4xl">
                    <div className="p-4 rounded-xl border border-gray-800">
                        <h2 className="text-xl font-semibold mb-3 border-b border-gray-700 pb-2">Description</h2>
                        <p className="text-gray-400">
                            Welcome to the page for **{actualTitle}** by **{actualArtist}** (Slug: `{id}`).
                            This area is typically used for track notes, lyrics, and production credits.
                            The content is now aligned to the left.
                        </p>
                    </div>
                </div>

                {/* Comment Input */}
                <div className="max-w-4xl">
                    <div className="p-4 rounded-xl border border-gray-800">
                        <h2 className="text-xl font-semibold mb-3 border-b border-gray-700 pb-2">Join the Conversation</h2>
                        <input
                            type="text"
                            placeholder="Write a comment..."
                            className="w-full p-3 bg-gray-900 border border-gray-700 rounded-lg focus:ring-purple-500 focus:border-purple-500 text-sm"
                        />
                        <button className="mt-3 bg-purple-600 hover:bg-purple-700 text-white font-medium py-2 px-4 rounded-lg text-sm">
                            Post Comment
                        </button>
                    </div>
                </div>

                {/* Comments List */}
                <div className="max-w-4xl">
                    <div className="space-y-4">
                        <div className="flex items-center space-x-2 text-xl font-semibold mb-4">
                            <MessageSquare className="w-6 h-6 text-gray-500" />
                            <h3>All Comments ({totalComments})</h3>
                        </div>

                        {[...Array(5)].map((_, i) => (
                            <div key={i} className="flex space-x-4 p-3 bg-gray-900 rounded-xl hover:bg-gray-800 transition">
                                <div className="w-10 h-10 bg-gray-800 rounded-full flex-shrink-0 flex items-center justify-center">
                                    <span className="text-sm font-bold text-white">U{i + 1}</span>
                                </div>
                                <div>
                                    <p className="font-medium text-sm text-purple-400">User_{i + 1}</p>
                                    <p className="text-gray-300 text-sm">
                                        This is a great track! The vibes are absolutely perfect for a late-night drive.
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </main>
    );
}