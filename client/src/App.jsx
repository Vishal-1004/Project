import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Home, Login, Register, ResetPassword } from "./Pages";

const App = () => {
  // Check if any of the key-value pairs exist in sessionStorage
  const isAuthenticated =
    sessionStorage.getItem("name") ||
    sessionStorage.getItem("registrationNo") ||
    sessionStorage.getItem("id");

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={!isAuthenticated ? <Login /> : <Home />} />
          <Route
            path="/login"
            element={!isAuthenticated ? <Login /> : <Home />}
          />
          <Route
            path="/register"
            element={!isAuthenticated ? <Register /> : <Home />}
          />
          <Route
            path="/reset-password"
            element={!isAuthenticated ? <Login /> : <ResetPassword />}
          />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
