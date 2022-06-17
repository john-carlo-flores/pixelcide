import { SocketContext, socket } from "./context/socket";
import Router from "./Router";

const App = () => {
  return(
    <SocketContext.Provider value={socket}>
      <Router />
    </SocketContext.Provider>
  )
};

export default App;