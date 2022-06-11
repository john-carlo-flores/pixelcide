import "./App.scss";

import Button from "./components/Button";
import Bunny from "./components/Bunny";
import Homepage from "./routes/Homepage";

import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Homepage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
