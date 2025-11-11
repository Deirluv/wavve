"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
// Import the updated API function
import { getUserProfileData, updateUserProfile } from "@/app/api/users/users.api";

export default function EditProfilePage() {
    const { data: session, status } = useSession();
    const router = useRouter();

    const [userName, setUserName] = useState("");
    const [bio, setBio] = useState("");
    // ⬇️ NEW: State for the file object
    const [avatarFile, setAvatarFile] = useState<File | null>(null);
    // ⬇️ STILL NEEDED: To display the current avatar or set the initial URL
    const [currentAvatarUrl, setCurrentAvatarUrl] = useState("");
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState(false);

    useEffect(() => {
        if (status === "loading") return;
        if (status !== "authenticated") {
            router.push("/login");
            return;
        }

        const loadProfile = async () => {
            if (!session?.user?.id) return;
            try {
                const data = await getUserProfileData(session.user.id);
                setUserName(data.userName || "");
                setBio(data.bio || "");
                setCurrentAvatarUrl(data.avatarUrl || "");
            } catch (err) {
                setError((err as Error).message);
            } finally {
                setIsLoading(false);
            }
        };

        loadProfile();
    }, [status, session, router]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!session?.user?.id) return;

        try {
            // ⬇️ NEW: Create FormData to handle the file upload
            const formData = new FormData();
            formData.append("userName", userName);
            formData.append("bio", bio);

            if (avatarFile) {
                formData.append("avatar", avatarFile);
            }

            await updateUserProfile(session.user.id, formData);
            setSuccess(true);
            setTimeout(() => router.push(`/profile/${session.user.id}`), 1500);
        } catch (err) {
            setError((err as Error).message);
        }
    };

    if (isLoading) return <p className="text-center text-white mt-10">Loading...</p>;

    return (
        <div className="min-h-screen bg-sc-background text-white flex justify-center items-center p-6">
            <div className="w-full max-w-md bg-sc-card-bg border border-sc-tertiary/50 rounded-2xl p-8 shadow-2xl">
                <h1 className="text-2xl font-bold mb-6 text-center">Edit Profile</h1>

                {error && <p className="text-red-400 mb-4 text-center">{error}</p>}
                {success && <p className="text-green-400 mb-4 text-center">Profile updated!</p>}

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm mb-1">Username</label>
                        <input
                            type="text"
                            value={userName}
                            onChange={(e) => setUserName(e.target.value)}
                            className="w-full p-2 rounded-md bg-sc-background border border-sc-tertiary/50 text-white"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm mb-1">Bio</label>
                        <textarea
                            value={bio}
                            onChange={(e) => setBio(e.target.value)}
                            className="w-full p-2 rounded-md bg-sc-background border border-sc-tertiary/50 text-white"
                            rows={3}
                        />
                    </div>

                    <div>
                        <label className="block text-sm mb-2">Avatar Image</label>
                        <input
                            type="file"
                            id="avatar-upload"
                            accept="image/*"
                            onChange={(e) => setAvatarFile(e.target.files ? e.target.files[0] : null)}
                            className="hidden"
                        />
                        <div className="flex items-center space-x-4">
                            <label
                                htmlFor="avatar-upload"
                                className="flex-grow text-center bg-sc-background border border-sc-tertiary/50 text-white py-2 px-4 rounded-md cursor-pointer hover:border-sc-accent transition"
                            >
                                {avatarFile ? `File Selected: ${avatarFile.name}` : "Choose Avatar File"}
                            </label>
                            {currentAvatarUrl && (
                                <img
                                    src={currentAvatarUrl}
                                    alt="Current Avatar"
                                    className="w-10 h-10 rounded-full object-cover border border-sc-tertiary/50"
                                />
                            )}
                        </div>
                        {avatarFile && (
                            <p className="text-xs text-sc-tertiary mt-1 truncate">
                                Selected: {avatarFile.name}
                            </p>
                        )}
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-sc-accent text-white py-2 rounded-full font-semibold hover:opacity-80 transition"
                    >
                        Save Changes
                    </button>
                </form>
            </div>
        </div>
    );
}