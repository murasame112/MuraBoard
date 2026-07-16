import { LanguageProvider } from "./contexts/language/LanguageProvider";
import { AuthProvider } from "./contexts/auth/AuthProvider";
import MainLayout from "./layouts/main-layout/MainLayout/MainLayout";
import {Routes, Route} from 'react-router';
import DashboardPage from "./pages/DashboardPage/DashboardPage";
import AuthLayout from "./layouts/auth-layout/AuthLayout/AuthLayout";
import LoginPage from "./pages/LoginPage/LoginPage";
import RegisterPage from "./pages/RegisterPage/RegisterPage";

function App() {

  return (
  <LanguageProvider>
    <AuthProvider>
      <Routes>
        <Route element={<AuthLayout />}>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
        </Route>

        <Route element={<MainLayout />}>
          <Route path="/dashboard/*" element={<DashboardPage />} />
        </Route>
      </Routes>
    </AuthProvider>
	</LanguageProvider>
  );
}

export default App
