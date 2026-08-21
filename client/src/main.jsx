import { createRoot } from "react-dom/client";
import { createBrowserRouter, redirect, RouterProvider } from "react-router-dom";
import { Provider } from "react-redux";

import "./index.css";
import App from "./App.jsx";
import Home from "./pages/home/Home.jsx";
import Login from "./pages/authentication/login.jsx";
import Signup from "./pages/authentication/signup.jsx";
import { store } from "./store/store.js";
import { getProfileThunk } from "./store/slice/user.thunk.js";

const requireAuth = async () => {
  try {
    await store.dispatch(getProfileThunk()).unwrap();
    return null;
  } catch {
    return redirect("/login");
  }
};

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        loader: requireAuth,
        element: <Home />,
      },
      {
        path: "home",
        loader: requireAuth,
        element: <Home />,
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "signup",
        element: <Signup />,
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>
);
