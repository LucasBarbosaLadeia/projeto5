import { useNavigate, useParams } from "react-router";

const Home = () => {
  const navigation = useNavigate();
  const { id } = useParams();

  return (
    <div>
      <button onClick={() => navigation("/")}>Ir para Login</button>
      Home - ID: {id}
    </div>
  );
};

export default Home;