import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { useTheme } from "@mui/material/styles";
import type { ReactNode } from "react";
import ThemeToggle from "../ThemeToggle";

interface TopbarProps {
	title: string;
	right?: ReactNode;
}

export default function Topbar({ title, right }: TopbarProps) {
	const theme = useTheme();

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
			</Box>
		</Box>
	);
}
