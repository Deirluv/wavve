"use client";

import React, { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { Save, AlertTriangle, ArrowLeft, Loader2, Disc, CheckCircle } from 'lucide-react'; // Добавлен CheckCircle

import { getTrackById, editTrack, TrackApiDto, TrackUpdateDto } from '@/app/api/tracks/tracks.api';
import { getGenres, GenreApiDto } from '@/app/api/genres/genres.api';


interface EditTrackPageProps {
    params: {
        id: string;
    };
}

const LoadingState = ({ message }: { message: string }) => (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-gray-400">
        <Disc className="w-12 h-12 mb-4 animate-spin text-purple-600" />
        <p className="text-xl">{message}</p>
    </div>
);

export default function EditTrackPage({ params }: EditTrackPageProps) {
    const { id } = params;
    const router = useRouter();
    const { data: session, status } = useSession();
    const CURRENT_USER_ID = session?.user?.id;

    const [trackData, setTrackData] = useState<TrackApiDto | null>(null);
    const [genres, setGenres] = useState<GenreApiDto[]>([]);
    const [loading, setLoading] = useState(true);
    const [isSaving, setIsSaving] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const [updateError, setUpdateError] = useState<string | null>(null);
    const [updateSuccess, setUpdateSuccess] = useState(false);

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [genreId, setGenreId] = useState('');

    const isAuthenticated = status === 'authenticated';
    const isOwner = trackData && isAuthenticated && CURRENT_USER_ID === trackData.userId;


    useEffect(() => {
        if (!id) return;

        const fetchData = async () => {
            setLoading(true);
            setError(null);
            try {
                const track = await getTrackById(id);
                setTrackData(track);
                setTitle(track.title);
                setDescription(track.description || '');
                setGenreId(track.genreId);

                const genreList = await getGenres();
                setGenres(genreList);

            } catch (err) {
                console.error("Error fetching data:", err);
                setError((err as Error).message || "Failed to load track or genres.");
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [id]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setUpdateError(null);
        setUpdateSuccess(false);
        setIsSaving(true);

        if (!isOwner) {
            setUpdateError("You are not authorized to edit this track.");
            setIsSaving(false);
            return;
        }

        const updateData: TrackUpdateDto = {
            title: title.trim(),
            description: description.trim(),
            genreId: genreId,
        };

        try {
            await editTrack(id, updateData);

            setUpdateSuccess(true);
            setTimeout(() => {
                router.push(`/song/${id}`);
            }, 1500);

        } catch (err) {
            console.error("Track update failed:", err);
            setUpdateError((err as Error).message || "Failed to save changes.");
            setIsSaving(false);
        }
    };

    if (loading || status === 'loading') {
        return <LoadingState message="Loading track data for editing..." />;
    }

    if (error) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[60vh] text-red-500 p-6">
                <AlertTriangle className="w-12 h-12 mb-4" />
                <p className="text-xl font-bold">Error</p>
                <p className="text-gray-400 mt-2">{error}</p>
                <button
                    onClick={() => router.push('/')}
                    className="mt-6 text-purple-400 hover:text-purple-300 flex items-center"
                >
                    <ArrowLeft className="w-4 h-4 mr-2" /> Back to Home
                </button>
            </div>
        );
    }

    if (!isOwner) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[60vh] text-red-500 p-6">
                <AlertTriangle className="w-12 h-12 mb-4" />
                <p className="text-xl font-bold">Access Denied</p>
                <p className="text-gray-400 mt-2">You do not have permission to edit this track.</p>
                <button
                    onClick={() => router.push(`/song/${id}`)}
                    className="mt-6 text-purple-400 hover:text-purple-300 flex items-center"
                >
                    <ArrowLeft className="w-4 h-4 mr-2" /> Back to Track Page
                </button>
            </div>
        );
    }


    return (
        <main className="min-h-screen text-white p-6 md:p-10">
            <div className="max-w-4xl mx-auto">
                <button
                    onClick={() => router.push(`/song/${id}`)}
                    className="text-gray-400 hover:text-purple-400 flex items-center mb-6 transition"
                >
                    <ArrowLeft className="w-5 h-5 mr-2" /> Back to Track
                </button>

                <h1 className="text-3xl font-extrabold mb-8 border-b border-gray-800 pb-4">
                    Editing Track: <span className="text-purple-400">&#34;{trackData?.title}&#34;</span>
                </h1>

                {updateError && (
                    <div className="bg-red-900/50 border border-red-700 text-red-300 p-3 rounded-lg flex items-center mb-6">
                        <AlertTriangle className="w-5 h-5 mr-2" />
                        <p className="text-sm font-medium">{updateError}</p>
                    </div>
                )}

                {updateSuccess && (
                    <div className="bg-green-900/50 border border-green-700 text-green-300 p-3 rounded-lg flex items-center mb-6">
                        <CheckCircle className="w-5 h-5 mr-2" />
                        <p className="text-sm font-medium">Track &#34;{title}&#34; updated successfully! Redirecting...</p>
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6 bg-gray-900 p-8 rounded-xl shadow-lg border border-gray-800">

                    {/* Title Input */}
                    <div>
                        <label htmlFor="title" className="block text-sm font-medium text-gray-300 mb-2">
                            Title *
                        </label>
                        <input
                            type="text"
                            id="title"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            required
                            className="w-full p-3 bg-gray-800 border border-gray-700 rounded-lg focus:ring-purple-500 focus:border-purple-500 text-white"
                            placeholder="Enter track title"
                            disabled={isSaving || updateSuccess}
                        />
                    </div>

                    {/* Description Textarea */}
                    <div>
                        <label htmlFor="description" className="block text-sm font-medium text-gray-300 mb-2">
                            Description
                        </label>
                        <textarea
                            id="description"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            rows={5}
                            className="w-full p-3 bg-gray-800 border border-gray-700 rounded-lg focus:ring-purple-500 focus:border-purple-500 text-white whitespace-pre-wrap"
                            placeholder="Describe your track..."
                            disabled={isSaving || updateSuccess}
                        />
                    </div>

                    {/* Genre Select */}
                    <div>
                        <label htmlFor="genre" className="block text-sm font-medium text-gray-300 mb-2">
                            Genre *
                        </label>
                        <select
                            id="genre"
                            value={genreId}
                            onChange={(e) => setGenreId(e.target.value)}
                            required
                            className="w-full p-3 bg-gray-800 border border-gray-700 rounded-lg focus:ring-purple-500 focus:border-purple-500 text-white appearance-none"
                            disabled={isSaving || updateSuccess} // Блокируем при сохранении/успехе
                        >
                            <option value="" disabled className="bg-gray-800 text-gray-500">Select a genre</option>
                            {genres.map((genre) => (
                                <option key={genre.id} value={genre.id} className="bg-gray-800">
                                    {genre.name}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* Submit Button */}
                    <div className="pt-4">
                        <button
                            type="submit"
                            disabled={isSaving || !title || !genreId || updateSuccess} // Блокируем также при успехе
                            className={`w-full flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-lg shadow-sm text-white 
                                ${isSaving || !title || !genreId || updateSuccess ?
                                'bg-gray-600 cursor-not-allowed' :
                                'bg-purple-600 hover:bg-purple-700'
                            } transition`}
                        >
                            {updateSuccess ? (
                                <>
                                    <CheckCircle className="w-5 h-5 mr-3" />
                                    Success! Redirecting...
                                </>
                            ) : isSaving ? (
                                <>
                                    <Loader2 className="w-5 h-5 mr-3 animate-spin" />
                                    Saving...
                                </>
                            ) : (
                                <>
                                    <Save className="w-5 h-5 mr-3" />
                                    Save Changes
                                </>
                            )}
                        </button>
                    </div>
                </form>
            </div>
        </main>
    );
}