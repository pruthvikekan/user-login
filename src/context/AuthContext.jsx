import { createContext, useState, useEffect } from 'react';
import api from '../api/axiosConfig';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const token = localStorage.getItem('token');
        const storedUser = localStorage.getItem('user');
        
        if (token && storedUser) {
            setUser(JSON.parse(storedUser));
        }
        setLoading(false);
    }, []);

    const login = async (email, password) => {
        const response = await api.post('/auth/signin', { email, password });
        if (response.data.accessToken) {
            localStorage.setItem('token', response.data.accessToken);
            const userData = { 
                id: response.data.id, 
                name: response.data.name, 
                email: response.data.email,
                village: response.data.village,
                district: response.data.district,
                photo: response.data.photo
            };
            localStorage.setItem('user', JSON.stringify(userData));
            setUser(userData);
        }
        return response.data;
    };

    const register = async (name, email, password, village, district, photo) => {
        const response = await api.post('/auth/signup', { name, email, password, village, district, photo });
        return response.data;
    };

    const logout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, login, register, logout, loading }}>
            {children}
        </AuthContext.Provider>
    );
};
