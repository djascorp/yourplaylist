import { atom, useAtom } from 'jotai';
import { jwtDecode } from "jwt-decode";

export const loggedAtom = atom(false);
export const tokenAtom = atom(false);
export const userInfoAtom = atom(false);

export const useApp = () => {
    const [logged, setLogged] = useAtom(loggedAtom);
    const [token, setToken] = useAtom(tokenAtom);
    const [userInfo, setUserInfo] = useAtom(userInfoAtom);

    const login = (token) => {

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