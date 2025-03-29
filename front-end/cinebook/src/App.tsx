<<<<<<< HEAD
import { BrowserRouter, Outlet, Route, Routes } from "react-router";
import Login from "./pages/public/Login";
import SignUp from "./pages/public/SignUp";
import Movies from "./pages/auth/Movies";
import PrivateRoute from "./components/PrivateRoute";

=======
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
>>>>>>> aaed07f096c937496bde8a96e800eef39a4337c7

function App() {
  return (
    <BrowserRouter>
      <Routes>
<<<<<<< HEAD
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route
          element={
            <PrivateRoute>
              <Outlet />
            </PrivateRoute>
          }
        >
          <Route path="/" element={<Movies />} />
        
        </Route>
=======
        <Route path="/login" element={<Login />} />
>>>>>>> aaed07f096c937496bde8a96e800eef39a4337c7
      </Routes>
    </BrowserRouter>
  );
}

export default App;
