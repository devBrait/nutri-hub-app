import { CssBaseline, ThemeProvider } from "@mui/material";
import { useMemo } from "react";
import { Route, Routes } from "react-router-dom";
import { ThemeModeProvider, useThemeMode } from "./contexts/ThemeModeContext";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { createAppTheme } from "./utils/theme";

function ThemedApp() {
	const { mode } = useThemeMode();
	const theme = useMemo(() => createAppTheme(mode), [mode]);

	return (
		<ThemeProvider theme={theme}>
			<CssBaseline />
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/login" element={<Login />} />
				<Route path="/register" element={<Register />} />
			</Routes>
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
