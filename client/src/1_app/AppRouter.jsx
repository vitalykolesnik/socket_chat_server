import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { Layout } from "1_app/layouts/Layout";
import { RequireAuth } from "1_app/model/hoc/RequireAuth";
import { AutoLogin } from "1_app/model/hoc/AutoLogin";
import {
  LoginPage,
  RegisterPage,
  ConversationPage,
  MainPage,
  ProfilePage,
  UsersPage,
} from "2_pages";

export const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <RequireAuth>
              <Layout />
            </RequireAuth>
          }
        >
          <Route index element={<MainPage />} />
          <Route path="/:id" element={<ConversationPage />} />
          <Route path="/user">
            <Route index element={<UsersPage />} />
            <Route path="/user/:id" element={<ProfilePage />} />
          </Route>
        </Route>
        <Route
          path="/signup"
          element={
            <AutoLogin>
              <RegisterPage />
            </AutoLogin>
          }
        />
        <Route
          path="/login"
          element={
            <AutoLogin>
              <LoginPage />
            </AutoLogin>
          }
        />
        <Route path="*" element={<Navigate to={"/"} />} />
      </Routes>
    </BrowserRouter>
  );
};
