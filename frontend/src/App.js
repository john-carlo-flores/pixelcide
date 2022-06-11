import "./App.css";

import Button from "./components/Button";
import Card from "./components/Card";
import Bunny from "./components/Bunny";

import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <>
              <Button primary>Sign Up</Button>
              <Button warning>Create Lobby</Button>
              <Button success>Start Game</Button>
              <Button error>Quit Game</Button>
            </>
          }
        />
        <Route
          path="button"
          element={
            <>
              <Button />
              <Outlet />
            </>
          }
        >
          <Route path="card" element={<Card />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
