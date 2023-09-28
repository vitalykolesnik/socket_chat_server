import {
  BrowserRouter,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import Login from "components/Login";
import Register from "components/Register";
import Home from "components/Home";
import { RequireAuth } from "hoc/RequireAuth";
import { AutoLogin } from "hoc/AutoLogin";
import { TokenProvider } from "context/TokenContext";
import { SocketProvider } from "context/SocketContext";

export const App = () => {
  return (
    <TokenProvider>
      <BrowserRouter>
        <Routes>
          <Route
            path="/chat"
            element={
              <RequireAuth>
                <SocketProvider>
                  <Home />
                </SocketProvider>
              </RequireAuth>
            }
          />
          <Route
            path="/signup"
            element={
              <AutoLogin>
                <Register />
              </AutoLogin>
            }
          />
          <Route
            path="/login"
            element={
              <AutoLogin>
                <Login />
              </AutoLogin>
            }
          />
          <Route
            path="*"
            element={<Navigate to={"/chat"} />}
          />
        </Routes>
      </BrowserRouter>
    </TokenProvider>
  );
};
