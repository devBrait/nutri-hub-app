import { CssBaseline, GlobalStyles, ThemeProvider, useMediaQuery } from "@mui/material";
import { SnackbarProvider } from "notistack";
import { useMemo } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import AppLayout from "./components/AppLayout";
import { ThemeModeProvider, useThemeMode } from "./contexts/ThemeModeContext";
import { getStoredRole } from "./lib/api/auth.service";
import AcceptInvite from "./pages/AcceptInvite";
import Dashboard from "./pages/Dashboard";
import EditMeal from "./pages/EditMeal";
import FoodSearch from "./pages/FoodSearch";
import Home from "./pages/Home";
import Login from "./pages/Login";
import NutritionistDashboard from "./pages/NutritionistDashboard";
import NutritionistInvitations from "./pages/NutritionistInvitations";
import NutritionistPatients from "./pages/NutritionistPatients";
import NutritionistProfile from "./pages/NutritionistProfile";
import Nutritionists from "./pages/Nutritionists";
import Onboarding from "./pages/Onboarding";
import Profile from "./pages/Profile";
import Register from "./pages/Register";
import { createAppTheme } from "./utils/theme";

function RoleGuard({ requiredRole, children }: { requiredRole: "Patient" | "Nutritionist"; children: React.ReactNode }) {
  const role = getStoredRole();
  if (!role) return <Navigate to="/login" replace />;
  if (role !== requiredRole) {
    const fallback = role === "Nutritionist" ? "/nutritionist/dashboard" : "/diet";
    return <Navigate to={fallback} replace />;
  }
  return <>{children}</>;
}

function ThemedApp() {
  const { mode } = useThemeMode();
  const theme = useMemo(() => createAppTheme(mode), [mode]);
  const isMobile = useMediaQuery("(max-width:899px)");

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <GlobalStyles
        styles={{
          ".snackbar-desktop-offset": { top: "64px !important" },
          ".snackbar-mobile-offset": { bottom: "72px !important" },
        }}
      />
      <SnackbarProvider
        maxSnack={3}
        anchorOrigin={
          isMobile
            ? { vertical: "bottom", horizontal: "center" }
            : { vertical: "top", horizontal: "right" }
        }
        style={isMobile ? { maxWidth: "calc(100vw - 32px)" } : undefined}
        classes={
          isMobile
            ? { containerAnchorOriginBottomCenter: "snackbar-mobile-offset" }
            : { containerAnchorOriginTopRight: "snackbar-desktop-offset" }
        }
      >
        <Routes>
          {/* Public */}
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/onboarding" element={<Onboarding />} />
          <Route path="/accept-invite/:token" element={<AcceptInvite />} />

          {/* Patient area */}
          <Route element={<AppLayout />}>
            <Route
              path="/diet"
              element={<RoleGuard requiredRole="Patient"><Dashboard /></RoleGuard>}
            />
            <Route
              path="/profile"
              element={<RoleGuard requiredRole="Patient"><Profile /></RoleGuard>}
            />
            <Route
              path="/meal"
              element={<RoleGuard requiredRole="Patient"><EditMeal /></RoleGuard>}
            />
            <Route
              path="/food-search"
              element={<RoleGuard requiredRole="Patient"><FoodSearch /></RoleGuard>}
            />
            <Route
              path="/nutritionists"
              element={<RoleGuard requiredRole="Patient"><Nutritionists /></RoleGuard>}
            />

            {/* Nutritionist area */}
            <Route
              path="/nutritionist/dashboard"
              element={<RoleGuard requiredRole="Nutritionist"><NutritionistDashboard /></RoleGuard>}
            />
            <Route
              path="/nutritionist/patients"
              element={<RoleGuard requiredRole="Nutritionist"><NutritionistPatients /></RoleGuard>}
            />
            <Route
              path="/nutritionist/invitations"
              element={<RoleGuard requiredRole="Nutritionist"><NutritionistInvitations /></RoleGuard>}
            />
            <Route
              path="/nutritionist/profile"
              element={<RoleGuard requiredRole="Nutritionist"><NutritionistProfile /></RoleGuard>}
            />
          </Route>
        </Routes>
      </SnackbarProvider>
    </ThemeProvider>
  );
}

function App() {
  return (
    <ThemeModeProvider>
      <ThemedApp />
    </ThemeModeProvider>
  );
}

export default App;
