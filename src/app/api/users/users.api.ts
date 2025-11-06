interface TrackApiDto {
    Id: string;
    Title: string;
    Description: string;
    FileUrl: string;
    PreviewUrl: string;
    Duration: number;
    UploadedAt: string;
    UserId: string;
    GenreId: string;
    ListenCount: number;
    DownloadCount: number;
    Likes: number;
    Comments: number;
    GenreName: string;
    UserName: string;
}

interface PlaylistApiDto {
    Id: string;
    Name: string;
    Description: string;
    UserId: string;
    CreatedAt: string;
    UserName: string;
    TrackCount: number;
    // Tracks: TrackApiDto[];
}

export interface UserProfileApiDto {
    id: string;
    userName: string;
    avatarUrl: string | null;
    bio: string | null;
    followersCount: number;
    followingsCount: number;
    playlists: PlaylistApiDto[];
    tracks: TrackApiDto[];
    // likes followings later
}

export async function getUserProfileData(id: string): Promise<UserProfileApiDto> {

    const url = `/api/profile/${id}`;

    const response = await fetch(url, {
        method: 'GET',
        cache: 'no-store',
    });

    if (response.status === 401) {
        throw new Error("Unauthorized");
    }

    if (response.status === 404) {
        throw new Error(`User with ID ${id} not found.`);
    }

    if (!response.ok) {
        try {
            const errorBody = await response.json();
            throw new Error(`Error loading data: ${errorBody.message || response.statusText}`);
        } catch {
            throw new Error(`Error API (${response.status}): ${response.statusText}`);
        }
    }

    return response.json();
}