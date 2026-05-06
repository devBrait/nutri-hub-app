import LogoutIcon from "@mui/icons-material/Logout";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { alpha, useTheme } from "@mui/material/styles";
import type { ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import { clearAuthData, logout } from "../../lib/api/auth.service";
import ThemeToggle from "../ThemeToggle";

interface TopbarProps {
	title: string;
	right?: ReactNode;
}

export default function Topbar({ title, right }: TopbarProps) {
	const theme = useTheme();
	const navigate = useNavigate();

	async function handleLogout() {
		const accessToken = localStorage.getItem("accessToken") ?? "";
		try {
			if (accessToken) await logout(accessToken);
		} finally {
			clearAuthData();
			navigate("/login");
		}
	}

	return (
		<Box
			sx={{
				bgcolor: theme.palette.neutral.card,
				borderBottom: `1px solid ${theme.palette.divider}`,
				minHeight: 56,
				px: { xs: 2, md: 4 },
				py: { xs: 1, md: 0 },
				display: "flex",
				alignItems: "center",
				justifyContent: "space-between",
				gap: 1.5,
				position: "sticky",
				top: 0,
				zIndex: 5,
			}}
		>
			<Typography
				sx={{
					fontSize: { xs: "0.95rem", md: "1rem" },
					fontWeight: 700,
					color: theme.palette.typography.mainText,
					whiteSpace: "nowrap",
					overflow: "hidden",
					textOverflow: "ellipsis",
				}}
			>
				{title}
			</Typography>
			<Box
				sx={{
					display: "flex",
					alignItems: "center",
					gap: { xs: 0.75, md: 1.5 },
					flexShrink: 0,
				}}
			>
				{right}
				<ThemeToggle size="small" />
				<IconButton
					onClick={handleLogout}
					size="small"
					sx={{
						display: { xs: "flex", md: "none" },
						color: theme.palette.typography.secondaryText,
						bgcolor: alpha(theme.palette.typography.secondaryText, 0.08),
						borderRadius: "8px",
						width: 32,
						height: 32,
						"&:hover": { bgcolor: alpha(theme.palette.error.main, 0.1), color: theme.palette.error.main },
					}}
				>
					<LogoutIcon sx={{ fontSize: "1rem" }} />
				</IconButton>
			</Box>
		</Box>
	);
}
