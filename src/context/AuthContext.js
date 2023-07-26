import { useState, useContext, createContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axiosClient from '../axios-client';
import BACKEND_URL from '../url';

const AuthContext = createContext({
    user: {
        name: null,
        email: null,
        role: null,
    },
    setUser: () => { },
    token: null,
    setToken: () => { }
});

export const AuthProvider = ({ children }) => {
    const [token, _setToken] = useState(localStorage.getItem('ACCESS_TOKEN'));
    const [user, _setUser] = useState(null);
    const [isUserFetching, setUserFetching] = useState(true);
    const navigate = useNavigate();

    const setToken = (token) => {
        _setToken(token);
        if (token) {
            localStorage.setItem('ACCESS_TOKEN', token);
        } else {
            localStorage.removeItem('ACCESS_TOKEN');
        }
    }

    const setUser = (user) => {
        if (user === null) {
            _setUser(null)
        } else {
            _setUser(user);
        }
    }

    useEffect(() => {
        console.log(user, token);
        (async () => {
            setUserFetching(true);
            if (token && user === null) {
                await axiosClient.get(BACKEND_URL.CHECK_TOKEN_ENDPOINT)
                .then((response) => {
                    // Store the fetched user data in AuthContext
                    console.log(`Fetched! ${response}`);
                    setUser(response.data.user);
                })
                .catch((error) => {
                    console.log(error);
                    setUser(null);
                    setToken(null);
                    return navigate('/login');
                })
            }
            setUserFetching(false)
        })()
    }, [token, user])

    if (isUserFetching) return <p>Loading...</p>

    return (
        <AuthContext.Provider value={{ user, setUser, token, setToken }}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContext;