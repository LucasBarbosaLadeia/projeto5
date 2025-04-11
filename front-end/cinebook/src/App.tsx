import { BrowserRouter, Outlet, Route, Routes } from "react-router";
import Login from "./pages/public/Login";
import SignUp from "./pages/public/SignUp";
import PrivateRoute from "./components/PrivateRoute";
import Home from "./pages/auth/Home";
import Movies from "./pages/auth/Movies";
import CreateMovies from "./pages/auth/CreateMovies";
import UserProfile from "./pages/auth/UserProfile";
import CreateActor from "./pages/auth/CreateActor";
import Favorites from "./pages/auth/Favorites";
import HomeAdmin from "./pages/auth/HomeAdmin";

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
          <Route path="/favorites" element={<Favorites />} />
          <Route path="/createActor" element={<CreateActor />} />
          <Route path="/createMovies" element={<CreateMovies />} />
          <Route path="/userProfile" element={<UserProfile />} />
          <Route path="/home" element={<Home />} />
          <Route path="/movies/:id" element={<Movies />} />
          <Route path="/auth/HomeAdmin" element={<HomeAdmin />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;