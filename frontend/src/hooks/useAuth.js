import { useState } from "react";
import axios from "axios";

const baseURL = 'http://localhost:8080';

const useAuth = (initial) => {
  const [user, setUser] = useState(JSON.parse(sessionStorage.getItem('user')));

  const verifyLogin = (username, password) => {
    if (username && password) {
      const user = { username, password };

      return axios.post(`${baseURL}/login`, { user })
        .then(response => {
          setUser({...response.data});
          sessionStorage.setItem('user', JSON.stringify({...response.data}))
          return true;
        })
        .catch(err => {
          return false;
        });
    }

    setUser(null);
    return false;
  };

  const logout = () => {
    axios.post(`${baseURL}/logout`, { token: user.refreshToken }, {
      headers: { Authorization: `Bearer ${user.accessToken}` }
    })
      .then(response => {
        sessionStorage.removeItem('user');
        setUser(null);
      });
  };

  return { user, verifyLogin, logout };
};

export default useAuth;