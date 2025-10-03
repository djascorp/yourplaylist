import { http } from "../utils/http";

interface Credentials {
    email: string;
    password: string;
}

interface UserData {
    username?: string;
    email: string;
    password?: string;
}

interface PlaylistData {
    name: string;
}

interface TrackData {
    youtube_url: string;
}

// Define more specific response types based on backend API
interface AuthResponse {
    token: string;
}

interface UserProfileResponse {
    id: number;
    username: string;
    email: string;
}

interface PlaylistResponse {
    id: number;
    name: string;
    ownerId: number;
    username?: string;
}

interface TrackResponse {
    id: number;
    youtube_url: string;
    title: string;
    duration: number;
    playlist_id: number;
    added_by: number;
}

export const httpService = {
    user: {
        login: async ({ email, password }: Credentials): Promise<AuthResponse> => {
            return await http.post<AuthResponse>('api/auth/login', { email, password });
        },

        register: async (data: UserData): Promise<AuthResponse> => {
            return await http.post<AuthResponse>('api/auth/register', data);
        },

        getProfile: async (): Promise<UserProfileResponse> => {
            return await http.get<UserProfileResponse>('api/user/profile');
        },

        updateProfile: async (data: UserData): Promise<UserProfileResponse> => {
            return await http.put<UserProfileResponse>('api/user/profile', data);
        },

        logout: async (): Promise<{ message: string }> => {
            return await http.post<{ message: string }>('api/auth/logout');
        },
    },

    playlist: {
        getAll: async (): Promise<PlaylistResponse[]> => {
            return await http.get<PlaylistResponse[]>('api/playlists');
        },

        getById: async (playlistId: number): Promise<PlaylistResponse> => {
            return await http.get<PlaylistResponse>(`api/playlists/${playlistId}`);
        },

        create: async (data: PlaylistData): Promise<PlaylistResponse> => {
            return await http.post<PlaylistResponse>('api/playlists', data);
        },

        update: async (playlistId: number, data: PlaylistData): Promise<PlaylistResponse> => {
            return await http.put<PlaylistResponse>(`api/playlists/${playlistId}`, data);
        },

        delete: async (playlistId: number): Promise<{ message: string }> => {
            return await http.delete<{ message: string }>(`api/playlists/${playlistId}`);
        },

        addTrack: async (playlistId: number, trackData: TrackData): Promise<TrackResponse> => {
            return await http.post<TrackResponse>(`api/playlists/${playlistId}/tracks`, trackData);
        },

        removeTrack: async (playlistId: number, trackId: string): Promise<{ message: string }> => {
            return await http.delete<{ message: string }>(`api/playlists/${playlistId}/tracks/${trackId}`);
        },

        getTracks: async (playlistId: number): Promise<TrackResponse[]> => {
            return await http.get<TrackResponse[]>(`api/playlists/${playlistId}/tracks`);
        }
    },

    track: {
        getDetails: async (trackId: string): Promise<TrackResponse> => {
            return await http.get<TrackResponse>(`api/tracks/${trackId}`);
        },

        getUrl: (trackId: string): string => {
            const url = `api/tracks/streambytrack/${trackId}`;
            return `${http.BASE_URL}/${url}`;
        }
    },
};
