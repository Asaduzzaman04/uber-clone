import { useNavigate } from "react-router";

const ErrorPage = () => {
  const backButton = useNavigate();
  return (
    <div>
      <h1>There was an error</h1>
      <button onClick={() => backButton(-1)}>go back</button>
    </div>
  );
};

export default ErrorPage;
