import { atom, useAtom } from 'jotai';

export const refreshTracksAtom = atom(false);

export const useRefresh = () => {
    const [refreshTracks, setRefreshTracks] = useAtom(refreshTracksAtom);


    return {
        refreshTracks,
        setRefreshTracks,
    }
}