import { LanguageProvider } from "./contexts/language/LanguageProvider";
import { AuthProvider } from "./contexts/auth/AuthProvider";
import MainLayout from "./layouts/main-layout/MainLayout/MainLayout";
import {Routes, Route, Navigate} from 'react-router';
import DashboardPage from "./pages/DashboardPage/DashboardPage";
import AuthLayout from "./layouts/auth-layout/AuthLayout/AuthLayout";
import LoginPage from "./pages/LoginPage/LoginPage";
import RegisterPage from "./pages/RegisterPage/RegisterPage";
import ProtectedRoute from "./features/auth/ProtectedRoute/ProtectedRoute";
import GuestRoute from "./features/auth/GuestRoute/GuestRoute";
import NotFoundPage from "./pages/NotFoundPage/NotFoundPage";
function App() {

  return (
  <LanguageProvider>
    <AuthProvider>
      <Routes>
				<Route element={<GuestRoute/>}>
					<Route element={<AuthLayout />}>
						<Route path="/login" element={<LoginPage />} />
						<Route path="/register" element={<RegisterPage />} />
					</Route>
				</Route>

				<Route element={<ProtectedRoute/>}>
					<Route element={<MainLayout />}>
						<Route path="/dashboard/*" element={<DashboardPage />} />
					</Route> 
				</Route>
				<Route path="/" element={<Navigate to="/login" replace />} />
				<Route path="*" element={<NotFoundPage />} />
      </Routes>
    </AuthProvider>
	</LanguageProvider>
  );
}

export default App
