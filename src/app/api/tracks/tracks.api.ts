export interface TrackApiDto {
    id: string;
    title: string;
    description: string;
    fileUrl: string;
    previewUrl: string;
    duration: number;
    uploadedAt: string;
    userId: string;
    genreId: string;
    listenCount: number;
    downloadCount: number;
    likes: number;
    comments: number;
    genreName: string;
    userName: string;
}

export interface TrackUpdateDto {
    title?: string;
    description?: string;
    genreId?: string;
}

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

export async function uploadTrack(data: FormData): Promise<TrackApiDto> {
    const url = `${apiUrl}/Tracks`;

    const response = await fetch(url, {
        method: 'POST',
        credentials: 'include',
        headers: {
            'Accept': 'application/json',
        },
        body: data,
    });

    if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Error uploading track (${response.status}): ${errorText}`);
    }

    return await response.json() as TrackApiDto;
}

export async function getTrackById(id: string): Promise<TrackApiDto> {
    const url = `${apiUrl}/Tracks/${id}`;

    const response = await fetch(url, {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
        },
        cache: 'no-store',
    });

    if (!response.ok) {
        throw new Error(`Error loading track ${id}: ${response.statusText}`);
    }

    const data = await response.json();
    return data as TrackApiDto;
}

export async function trackListen(id: string): Promise<void> {
    const url = `${apiUrl}/Tracks/${id}/listen`;

    const response = await fetch(url, {
        method: 'POST',
        credentials: 'include',
        headers: {
            'Accept': '*/*',
        },
        body: ''
    });

    if (!response.ok && response.status !== 204) {
        throw new Error(`Error registering listen count for track ${id}: ${response.statusText}`);
    }
}

export async function editTrack(id: string, updateData: TrackUpdateDto): Promise<void> {
    const url = `${apiUrl}/Tracks/${id}`;

    const response = await fetch(url, {
        method: 'PUT',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json',
            'Accept': '*/*',
        },
        body: JSON.stringify(updateData),
    });

    if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Error updating track ${id} (${response.status}): ${errorText}`);
    }
}

export async function deleteTrack(id: string): Promise<void> {
    const url = `${apiUrl}/Tracks/${id}`;

    const response = await fetch(url, {
        method: 'DELETE',
        credentials: 'include',
        headers: {
            'Accept': '*/*',
        },
    });

    if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Error deleting track ${id} (${response.status}): ${errorText}`);
    }
}

async function fetchTracksFeed(endpoint: string): Promise<TrackApiDto[]> {
    const url = `${apiUrl}/Tracks/${endpoint}`;

    const response = await fetch(url, { cache: 'no-store' });

    if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Error fetching ${endpoint} tracks (${response.status}): ${errorText}`);
    }

    return await response.json() as TrackApiDto[];
}


export function getHotTracks(): Promise<TrackApiDto[]> {
    return fetchTracksFeed('hot');
}

export function getCommunityFavorites(): Promise<TrackApiDto[]> {
    return fetchTracksFeed('communityFavorites');
}

export function getMostCommented(): Promise<TrackApiDto[]> {
    return fetchTracksFeed('mostCommented');
}

export function getFreshTracks(): Promise<TrackApiDto[]> {
    return fetchTracksFeed('fresh');
}