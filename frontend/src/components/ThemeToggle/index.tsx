import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import IconButton from "@mui/material/IconButton";
import { alpha, useTheme } from "@mui/material/styles";
import Tooltip from "@mui/material/Tooltip";
import { useThemeMode } from "../../contexts/ThemeModeContext";

interface ThemeToggleProps {
	size?: "small" | "medium";
}

export default function ThemeToggle({ size = "medium" }: ThemeToggleProps) {
	const theme = useTheme();
	const { mode, toggleMode } = useThemeMode();
	const isDark = mode === "dark";
	const label = isDark ? "Ativar modo claro" : "Ativar modo escuro";

	return (
		<Tooltip title={label} arrow>
			<IconButton
				onClick={toggleMode}
				aria-label={label}
				size={size}
				sx={{
					color: theme.palette.brand.main,
					bgcolor: alpha(theme.palette.brand.main, 0.08),
					borderRadius: "12px",
					p: size === "small" ? 0.75 : 1,
					transition: "background-color 0.2s ease, transform 0.2s ease",
					"&:hover": {
						bgcolor: alpha(theme.palette.brand.main, 0.16),
						transform: "translateY(-1px)",
					},
				}}
			>
				{isDark ? (
					<LightModeOutlinedIcon sx={{ fontSize: "1.15rem" }} />
				) : (
					<DarkModeOutlinedIcon sx={{ fontSize: "1.15rem" }} />
				)}
			</IconButton>
		</Tooltip>
	);
}
