export interface GenreApiDto {
    id: string;
    name: string;
    trackCount: number;
}

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

export async function getGenres(): Promise<GenreApiDto[]> {
    const url = `${apiUrl}/Genres`;

    const response = await fetch(url, {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
        },
        cache: 'no-store',
    });

    if (!response.ok) {
        try {
            const errorBody = await response.json();
            throw new Error(`Error loading genres: ${errorBody.message || response.statusText}`);
        } catch {
            throw new Error(`Error API (${response.status}): ${response.statusText}`);
        }
    }

    const data = await response.json();
    return data as GenreApiDto[];
}