import { CssBaseline, ThemeProvider } from "@mui/material";
import { SnackbarProvider } from "notistack";
import { useMemo } from "react";
import { Route, Routes } from "react-router-dom";
import AppLayout from "./components/AppLayout";
import { ThemeModeProvider, useThemeMode } from "./contexts/ThemeModeContext";
import Dashboard from "./pages/Dashboard";
import EditMeal from "./pages/EditMeal";
import FoodSearch from "./pages/FoodSearch";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Nutritionists from "./pages/Nutritionists";
import Onboarding from "./pages/Onboarding";
import Profile from "./pages/Profile";
import Register from "./pages/Register";
import { createAppTheme } from "./utils/theme";

function ThemedApp() {
  const { mode } = useThemeMode();
  const theme = useMemo(() => createAppTheme(mode), [mode]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <SnackbarProvider
        maxSnack={3}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        style={{ maxWidth: "min(420px, calc(100vw - 32px))" }}
      >
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/onboarding" element={<Onboarding />} />

          <Route element={<AppLayout />}>
            <Route path="/diet" element={<Dashboard />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/meal" element={<EditMeal />} />
            <Route path="/food-search" element={<FoodSearch />} />
            <Route path="/nutritionists" element={<Nutritionists />} />
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
