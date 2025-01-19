import { atom, useAtom } from 'jotai';
import { jwtDecode } from "jwt-decode";

export const loggedAtom = atom(false);
export const tokenAtom = atom('');
export const userInfoAtom = atom({});

export const useApp = () => {
    const [logged, setLogged] = useAtom(loggedAtom);
    const [token, setToken] = useAtom(tokenAtom);
    const [userInfo, setUserInfo] = useAtom(userInfoAtom);

    const login = (token: string) => {

        setLogged(true);
        setToken(token);
        const decoded = jwtDecode(token);
        console.log("DECODED", decoded);
        setUserInfo(decoded);
    }
    const logout = () => {
        setLogged(false);
        setToken('');
        setUserInfo({});
    }

    return {
        logged, setLogged,
        token, setToken,
        login, logout,
        userInfo, setUserInfo,
    }
}