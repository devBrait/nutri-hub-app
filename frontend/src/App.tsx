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
			<SnackbarProvider maxSnack={3} anchorOrigin={{ vertical: 'top', horizontal: 'right' }}>
				<Routes>
					<Route path="/" element={<Home />} />
					<Route path="/login" element={<Login />} />
					<Route path="/register" element={<Register />} />
					<Route path="/onboarding" element={<Onboarding />} />
					<Route element={<AppLayout />}>
						<Route path="/dieta" element={<Dashboard />} />
						<Route path="/perfil" element={<Profile />} />
						<Route path="/refeicao" element={<EditMeal />} />
						<Route path="/buscar-alimento" element={<FoodSearch />} />
						<Route path="/nutricionistas" element={<Nutritionists />} />
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
