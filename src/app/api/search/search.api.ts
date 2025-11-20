export interface SearchTrackDto {
    id: string;
    title: string;
    description?: string;
    fileUrl?: string;
    previewUrl?: string;
    duration?: number;
    userId?: string;
}

export interface SearchUserDto {
    id: string;
    userName: string;
    avatarUrl: string | null;
}

export interface SearchPlaylistDto {
    id: string;
    name: string;
    description: string | null;
    userId: string;


    coverUrl?: string | null;
}

export interface SearchResultsApiDto {
    tracks: SearchTrackDto[];
    users: SearchUserDto[];
    playlists: SearchPlaylistDto[];
}

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

export async function search(query: string): Promise<SearchResultsApiDto> {
    if (!query) {
        return { tracks: [], users: [], playlists: [] };
    }

    const encodedQuery = encodeURIComponent(query);
    const url = `${apiUrl}/Search?query=${encodedQuery}`;

    const response = await fetch(url, {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
        },
        cache: 'no-store',
    });

    if (!response.ok) {
        throw new Error(`Error searching for "${query}" (${response.status}): ${response.statusText}`);
    }

    const data = await response.json();
    return data as SearchResultsApiDto;
}