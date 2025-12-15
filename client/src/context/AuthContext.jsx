import { createContext, useContext, useEffect, useState } from 'react';
import api from '../services/api';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => JSON.parse(localStorage.getItem('user')) || null);
  const [token, setToken] = useState(() => localStorage.getItem('token') || '');

  useEffect(() => {
    if (token && !user) {
      api.get('/auth/me', { headers: { Authorization: `Bearer ${token}` } })
        .then((res) => setUser(res.data.user))
        .catch(() => logout());
    }
  }, []);

  const saveSession = (payload) => {
    setUser(payload.user);
    setToken(payload.token);
    localStorage.setItem('user', JSON.stringify(payload.user));
    localStorage.setItem('token', payload.token);
  };

  const login = async (email, password) => {
    const { data } = await api.post('/auth/login', { email, password });
    saveSession(data);
    return data;
  };

  const register = async (name, email, password) => {
    const { data } = await api.post('/auth/register', { name, email, password });
    saveSession(data);
    return data;
  };

  const logout = () => {
    setUser(null);
    setToken('');
    localStorage.removeItem('user');
    localStorage.removeItem('token');
  };

  return (
    <AuthContext.Provider value={{ user, token, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

