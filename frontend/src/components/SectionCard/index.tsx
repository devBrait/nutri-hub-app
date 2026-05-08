import Box from "@mui/material/Box";
import { useTheme } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import type { ReactNode } from "react";

interface SectionCardProps {
	title?: string;
	titleColor?: string;
	action?: ReactNode;
	children: ReactNode;
	highlight?: boolean;
	sx?: object;
}

export default function SectionCard({
	title,
	titleColor,
	action,
	children,
	highlight = false,
	sx,
}: SectionCardProps) {
	const theme = useTheme();

	return (
		<Box
			sx={{
				bgcolor: highlight ? theme.palette.brand.main : theme.palette.neutral.card,
				borderRadius: "16px",
				border: `1px solid ${highlight ? theme.palette.brand.main : theme.palette.divider}`,
				p: { xs: 2.25, md: 2.75 },
				...sx,
			}}
		>
			{(title || action) && (
				<Box
					sx={{
						display: "flex",
						alignItems: "center",
						justifyContent: "space-between",
						mb: 2.25,
					}}
				>
					{title ? (
						<Typography
							sx={{
								fontSize: "0.78rem",
								fontWeight: 600,
								color:
									titleColor ??
									(highlight ? "rgba(255,255,255,0.6)" : theme.palette.green.cardTitle),
								textTransform: "uppercase",
								letterSpacing: "0.05em",
							}}
						>
							{title}
						</Typography>
					) : (
						<Box />
					)}
					{action}
				</Box>
			)}
			{children}
		</Box>
	);
}
