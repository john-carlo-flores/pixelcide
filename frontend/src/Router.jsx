import "./Router.scss";

import Homepage from "./components/Root";
import GameRoom from "./components/GameRoom";
import Games from "./components/Games";
import Registration from "./components/Authentication/Registration";
import Leaderboard from "./components/Leaderboard";
import Statistics from "./components/Statistics";
import Game from "./components/Game";
import useAuth from "./hooks/useAuth";

import { useContext } from "react";
import { SocketContext } from "./context/socket"; 
import { BrowserRouter, Routes, Route } from "react-router-dom";

function Router() {
  const socket = useContext(SocketContext);
  const { user, verifyLogin, logout, register } = useAuth(socket);

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <Homepage userAuth={verifyLogin} logout={logout} user={user} />
          }
        />
        <Route path="games" element={<Games />} />
        <Route
          path="games/:id"
          element={
            <GameRoom userAuth={verifyLogin} logout={logout} user={user} />
          }
        />
        <Route path="leaderboard" element={<Leaderboard />} />
        <Route path="statistics" element={<Statistics />} />
        <Route path="signup" element={<Registration onSubmit={register} />} />
        <Route path="test" element={<Game />} />
      </Routes>
    </BrowserRouter>
  );
}

export default Router;
