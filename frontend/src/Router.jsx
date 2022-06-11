import "./Router.scss";
import Homepage from "./components/Root";
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
      </Routes>
    </BrowserRouter>
  );
}

export default Router;
