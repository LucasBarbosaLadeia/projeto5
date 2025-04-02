import { BrowserRouter, Outlet, Route, Routes } from "react-router";
import Login from "./pages/public/Login";
import SignUp from "./pages/public/SignUp";
import PrivateRoute from "./components/PrivateRoute";
import Home from "./pages/auth/Home";
import Movies from "./pages/auth/Movies";
import CreateMovies from "./pages/auth/CreateMovies";


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route
          element={
            <PrivateRoute>
              <Outlet />
            </PrivateRoute>
          }
        >
          <Route path="/createMovies" element={<CreateMovies />} />
          <Route path="/home" element={<Home />} />
          <Route path="/movies/:id" element={<Movies />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
