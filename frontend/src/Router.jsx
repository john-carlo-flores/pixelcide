import "./Router.scss";

import Homepage from "./components/Root";
import GameRoom from "./components/GameRoom";
import Games from "./components/Games";
import Leaderboard from "./components/Leaderboard";
import Statistics from "./components/Statistics";

import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function Router() {
  const [user, setUser] = useState();
  const onClick = () => {
    if (!user) {
      return setUser("Mo");
    }
    return setUser(null);
  };
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Homepage onClick={onClick} user={user} />} />
        <Route path="/games" element={<Games />} />
        <Route path="/games/:id" element={<GameRoom />} />
        <Route path="/leaderboard" element={<Leaderboard />} />
        <Route path="/statistics" element={<Statistics />} />
      </Routes>
    </BrowserRouter>
  );
}

export default Router;
