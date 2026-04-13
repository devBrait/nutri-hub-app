import { CssBaseline, ThemeProvider } from "@mui/material";
import Home from "./pages/Home";
import theme from "./utils/theme";

function App() {
	return (
		<ThemeProvider theme={theme}>
			<CssBaseline />
			<Home />
		</ThemeProvider>
	);
}

export default App;
