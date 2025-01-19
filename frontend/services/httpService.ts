import { http } from "../utils/http";

interface Credentials {
    email: string;
    password: string;
}

interface UserData {
    username: string;
    email: string;
    password: string;
}

interface PlaylistData {
    name: string;
}

interface TrackData {
    youtube_url: string;
}

export const httpService = {
    user: {
        login: async ({ email, password }: Credentials): Promise<any> => {
            return await http.post('api/auth/login', { email, password });
        },

        register: async (data: UserData): Promise<any> => {
            return await http.post('api/auth/register', data);
        },

        getProfile: async (): Promise<any> => {
            return await http.get('api/user/profile');
        },

        updateProfile: async (data: UserData): Promise<any> => {
            return await http.put('api/user/profile', data);
        },

        logout: async (): Promise<any> => {
            return await http.post('api/auth/logout');
        },
    },

    playlist: {
        getAll: async (): Promise<any> => {
            return await http.get('api/playlists');
        },

        getById: async (playlistId: number): Promise<any> => {
            return await http.get(`api/playlists/${playlistId}`);
        },

        create: async (data: PlaylistData): Promise<any> => {
            return await http.post('api/playlists', data);
        },

        update: async (playlistId: number, data: PlaylistData): Promise<any> => {
            return await http.put(`api/playlists/${playlistId}`, data);
        },

        delete: async (playlistId: number): Promise<any> => {
            return await http.delete(`api/playlists/${playlistId}`);
        },

        addTrack: async (playlistId: number, trackData: TrackData): Promise<any> => {
            return await http.post(`api/playlists/${playlistId}/tracks`, trackData);
        },

        removeTrack: async (playlistId: number, trackId: string): Promise<any> => {
            return await http.delete(`api/playlists/${playlistId}/tracks/${trackId}`);
        },

        getTracks: async (playlistId: number): Promise<any> => {
            return await http.get(`api/playlists/${playlistId}/tracks`);
        }
    },

    track: {
        getDetails: async (trackId: string): Promise<any> => {
            return await http.get(`api/tracks/${trackId}`);
        },

        getUrl: (trackId: string): string => {
            const url = `api/tracks/streambytrack/${trackId}`;
            return `${http.BASE_URL}/${url}`;
        }
    },
};