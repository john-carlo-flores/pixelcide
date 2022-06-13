import { Link } from "react-router-dom";

const Leaderboard = () => {
  return(
    <>
      <h1>This is the leaderboard page where users can see and compare where they rank compared to the best.</h1>
      <Link to="/">Back to home page</Link>
    </>
  );
};

export default Leaderboard;