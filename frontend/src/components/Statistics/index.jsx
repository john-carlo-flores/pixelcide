import { Link } from "react-router-dom";

const Statistics = () => {
  return(
    <>
      <h1>This is the statistics page where users can see their own stats and what achievements they've unlocked.</h1>
      <Link to="/">Back to home page</Link>
    </>
  );
};

export default Statistics;