import { Toaster } from "react-hot-toast";
import { Outlet } from "react-router-dom";

const App = () => {
  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />
      <Outlet />
    </>
  );
};

export default App;
