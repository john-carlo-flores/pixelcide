import { useState } from "react";
import axios from "axios";
import jwtDecode from "jwt-decode";

const useAuth = (socket) => {
  const [user, setUser] = useState(JSON.parse(sessionStorage.getItem('user')));
  const axiosJWT = axios.create();
  
  const setupSocketSession = (user) => {
    socket.auth = { 
      username: user.username,
      userID: user.id
    }

    socket.connect();

    socket.on("session", ({ sessionID }) => {
      setUser(prev => {
        return {
          ...prev,
          sessionID
        };
      });

      socket.auth.sessionID = sessionID;
    });
  };

  const verifyLogin = (username, password) => {
    if (username && password) {
      const user = { username, password };

      return axios.post(`/login`, { user })
        .then(response => {
          
          setUser(response.data);
          setupSocketSession(response.data);
          sessionStorage.setItem('user', JSON.stringify({...response.data}));
          return true;
        })
        .catch(err => {
          return false;
        });
    }

    setUser(null);
    return false;
  };

  const register = (user) => {
    if (user.username && user.name && user.email && user.password && user.avatar_id) {

      return axios.post(`/users`, { user })
        .then(response => {
          setUser({...response.data});
          sessionStorage.setItem('user', JSON.stringify({...response.data}))
          return true;
        })
        .catch(err => {
          return false;
        });
    }
  };

  const logout = () => {
    axiosJWT.post(`/logout`, { token: user.refreshToken }, {
      headers: { Authorization: `Bearer ${user.accessToken}` }
    })
      .then(response => {
        sessionStorage.removeItem('user');
        // socket.emit("logout");
        socket.disconnect();

        setUser(null);
      });
  };

  const refreshToken = () => {
    return axios.post(`/refresh`, { token: user.refreshToken })
      .then(res => {
        const refreshUser = {
          ...user,
          accessToken: res.data.accessToken,
          refreshToken: res.data.refreshToken
        };

        setUser(refreshUser);
        sessionStorage.setItem('user', JSON.stringify(refreshUser))
      });
  };

  axiosJWT.interceptors.request.use(config => {
    const currentDate = new Date();
      const decodeToken = jwtDecode(user.accessToken);

      // If token has expired
      if(decodeToken.exp * 1000 < currentDate.getTime()) {
        refreshToken().then(data => {
          config.headers.authorization = `Bearer ${data.accessToken}`;
        }).catch(err => {
          return Promise.reject(err);
        });
      }

      return config;
  });

  return { user, verifyLogin, logout, register };
};

export default useAuth;