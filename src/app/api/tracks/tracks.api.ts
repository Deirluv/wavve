export interface TrackApiDto {
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