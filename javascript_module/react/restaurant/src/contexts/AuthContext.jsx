import { createContext, useContext, useState, useEffect } from 'react';
import axiosHTTP from '../axios_handlers/loginAxiosHandler.js';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(localStorage.getItem('token') || null);

    const login = async(username, password) => {
        try {
            const response = await axiosHTTP.post('/login', {
                username: username,
                password: password,
                expiresInMins: 30,
            })
            setUser(response.data);
            // setToken is preproccesed in axios interceptor before returning response
        }
        catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        if (token) {
            localStorage.setItem('token', token);
        }
        else {
            localStorage.removeItem('token', token);
        }
    }, [token])

    const logout = () => {
        setToken(null);
        localStorage.removeItem('token');
    }

    return (
        <AuthContext.Provider value = {{'user': user, 'login': login, 'logout': logout}}>
            { children }
        </AuthContext.Provider>
    )
}

// eslint-disable-next-line react-refresh/only-export-components
export const useAuthContext = () => {
    return useContext(AuthContext);
}