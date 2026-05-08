import type { PaletteMode } from "@mui/material";
import {
	createContext,
	type ReactNode,
	useCallback,
	useContext,
	useEffect,
	useMemo,
	useState,
} from "react";

interface ThemeModeContextValue {
	mode: PaletteMode;
	toggleMode: () => void;
}

const STORAGE_KEY = "nutrihub:theme-mode";

const ThemeModeContext = createContext<ThemeModeContextValue | undefined>(undefined);

function getInitialMode(): PaletteMode {
	if (typeof window === "undefined") return "light";
	const stored = window.localStorage.getItem(STORAGE_KEY);
	if (stored === "light" || stored === "dark") return stored;
	return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

interface ThemeModeProviderProps {
	children: ReactNode;
}

export function ThemeModeProvider({ children }: ThemeModeProviderProps) {
	const [mode, setMode] = useState<PaletteMode>(getInitialMode);

	useEffect(() => {
		window.localStorage.setItem(STORAGE_KEY, mode);
	}, [mode]);

	const toggleMode = useCallback(() => {
		setMode((current) => (current === "light" ? "dark" : "light"));
	}, []);

	const value = useMemo(() => ({ mode, toggleMode }), [mode, toggleMode]);

	return <ThemeModeContext.Provider value={value}>{children}</ThemeModeContext.Provider>;
}

export function useThemeMode() {
	const ctx = useContext(ThemeModeContext);
	if (!ctx) throw new Error("useThemeMode deve ser usado dentro de ThemeModeProvider");
	return ctx;
}
