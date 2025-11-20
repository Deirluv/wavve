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
    // Tracks?: TrackApiDto[];
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
    // likes, followings — later
}

export interface UpdateUserProfileDto {
    userName: string;
    bio: string;
    avatarUrl: string;
}

export interface AuthCheckDto {
    authenticated: boolean;
    id: string | null;
    email: string | null;
    role: string | null;
    userName: string | null;
}

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

export async function getUserProfileData(id: string): Promise<UserProfileApiDto> {
    const url = `${apiUrl}/Users/${id}`;

    const response = await fetch(url, {
        method: 'GET',
        credentials: 'include',
        headers: {
            'Accept': 'application/json',
        },
        cache: 'no-store',
    });

    if (response.status === 401) {
        throw new Error('Unauthorized');
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

    const data = await response.json();
    return data as UserProfileApiDto;
}

export async function updateUserProfile(id: string, data: FormData): Promise<UserProfileApiDto | null>  {
    const url = `${apiUrl}/Users/${id}`;

    const response = await fetch(url, {
        method: 'PUT',
        credentials: 'include',
        // the browser will automatically set the correct multipart/form-data header
        headers: {
            'Accept': 'application/json',
        },
        body: data,
    });

    if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Error updating profile (${response.status}): ${errorText}`);
    }

    if (response.status === 204) {
        return null;
    }

    return await response.json();
}

export async function followUser(targetUserId: string, token: string): Promise<void> {
    const url = `${apiUrl}/Users/${targetUserId}/follow`;

    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${token}`,
        },
    });

    if (response.status === 401) {
        throw new Error('Unauthorized. Please log in again.');
    }

    if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Error following user (${response.status}): ${errorText}`);
    }
}

export async function unfollowUser(targetUserId: string, token: string): Promise<void> {
    const url = `${apiUrl}/Users/${targetUserId}/unfollow`;

    const response = await fetch(url, {
        method: 'DELETE',
        headers: {
            'Authorization': `Bearer ${token}`,
        },
    });

    if (response.status === 401) {
        throw new Error('Unauthorized. Please log in again.');
    }

    if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Error unfollowing user (${response.status}): ${errorText}`);
    }
}

export async function checkAuth(): Promise<AuthCheckDto> {
    const url = `${apiUrl}/Auth/checkAuth`;

    const response = await fetch(url, {
        method: 'GET',
        credentials: 'include',
        headers: {
            'Accept': 'application/json',
        },
        cache: 'no-store',
    });

    if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Error checking authentication status (${response.status}): ${errorText}`);
    }

    try {
        const data = await response.json();
        return data as AuthCheckDto;
    } catch (e) {
        throw new Error("Failed to parse authentication response.");
    }
}