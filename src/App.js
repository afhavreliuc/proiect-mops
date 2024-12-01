import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";

import ProtectedRoute from "./components/ProtectedRoute";
import "./App.css";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { logout, setIsAuthenticated } from "./redux/auth.reducer";

import Register from './pages/Register';
import Home from './pages/Home';
import Login from './pages/Login';

import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase/firebase";
import NotFound from "./pages/NotFound";

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route>
        <Route path="/login" element={<Login/>} />
        <Route path="/register" element={<Register/>} />
        <Route element={<ProtectedRoute redirectTo="/login" />}>
          <Route element={<Home/>} path='/'/>
        </Route>
        <Route path="*" element={<NotFound />} />
      </Route>
    </>
  )
);

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        dispatch(setIsAuthenticated());
      } else {
        dispatch(logout());
      }
    });

    return () => {
      unsubscribe();
    };
  }, [dispatch]);

  return <RouterProvider router={router}/>;
}

export default App;
