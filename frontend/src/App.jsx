import { Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import FloatingShape from "./components/FloatingIcon";
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";
import VerifyMail from "./pages/VerifyMail";
import { Toaster } from "react-hot-toast";
import { useAuthStore } from "./store/authStore";
import { useEffect } from "react";
import LoadingSpinner from "./components/LoadingSpinner";

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, user } = useAuthStore();
  console.log(isAuthenticated);

  console.log(user);

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (user && !user.isVerified) {
    return <Navigate to="/verify-email" replace />;
  }

  return children;
};

const RedirectAuthenticated = ({ children }) => {
  const { isAuthenticated, user } = useAuthStore();

  console.log(user);

  if (isAuthenticated && user?.isVerified) {
    return <Navigate to="/" replace />;
  }

  return children;
};
function App() {
  const { isCheckingAuth, checkAuth } = useAuthStore();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  if (isCheckingAuth) return <LoadingSpinner />;
  return (
    <>
      <div
        className="min-h-screen bg-gradient-to-br
    from-gray-900 via-green-900 to-emerald-900 flex items-center justify-center relative overflow-hidden"
      >
        <FloatingShape
          color="bg-green-500"
          size="w-64 h-64"
          top="-5%"
          left="10%"
          delay={0}
        />
        <FloatingShape
          color="bg-emerald-500"
          size="w-48 h-48"
          top="70%"
          left="80%"
          delay={5}
        />
        <FloatingShape
          color="bg-lime-500"
          size="w-32 h-32"
          top="40%"
          left="-10%"
          delay={2}
        />

        <Routes>
          {/* Add routes here */}
          <Route path="/" element={"Home"} />
          <Route
            path="/register"
            element={
              <RedirectAuthenticated>
                <RegisterPage />
              </RedirectAuthenticated>
            }
          />
          <Route
            path="/login"
            element={
              <ProtectedRoute>
                <LoginPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/verify-email"
            element={
              <RedirectAuthenticated>
                <VerifyMail />
              </RedirectAuthenticated>
            }
          />
        </Routes>
        <Toaster />
      </div>
    </>
  );
}

export default App;
