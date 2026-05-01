import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { alpha, useTheme } from "@mui/material/styles";

interface StatCardProps {
	label: string;
	value: string | number;
	unit?: string;
	subtitle?: string;
	progress?: number;
	highlight?: boolean;
}

export default function StatCard({
	label,
	value,
	unit,
	subtitle,
	progress,
	highlight = false,
}: StatCardProps) {
	const theme = useTheme();
	const isLight = theme.palette.mode === "light";

	const fg = highlight ? "#fff" : theme.palette.brand.main;
	const labelColor = highlight
		? alpha("#fff", 0.6)
		: theme.palette.green.cardTitle;
	const subColor = highlight
		? alpha("#fff", 0.55)
		: theme.palette.typography.secondaryCardText;
	const trackBg = highlight
		? alpha("#fff", 0.2)
		: isLight
			? theme.palette.neutral.altTempBackground
			: alpha(theme.palette.brand.main, 0.18);

	return (
		<Box
			sx={{
				bgcolor: highlight ? theme.palette.brand.main : theme.palette.neutral.card,
				border: `1px solid ${highlight ? theme.palette.brand.main : theme.palette.divider}`,
				borderRadius: "16px",
				p: { xs: 2, md: 2.5 },
				display: "flex",
				flexDirection: "column",
				gap: 0.5,
				minWidth: 0,
				overflow: "hidden",
			}}
		>
			<Typography
				sx={{
					fontSize: "0.72rem",
					fontWeight: 500,
					color: labelColor,
					textTransform: "uppercase",
					letterSpacing: "0.06em",
				}}
			>
				{label}
			</Typography>
			<Box
				sx={{
					display: "flex",
					alignItems: "baseline",
					gap: 0.75,
					flexWrap: "wrap",
					rowGap: 0.25,
				}}
			>
				<Typography
					sx={{
						fontSize: { xs: "1.5rem", sm: "1.75rem" },
						fontWeight: 700,
						color: fg,
						lineHeight: 1.1,
					}}
				>
					{value}
				</Typography>
				{unit ? (
					<Typography
						sx={{ fontSize: "0.82rem", color: subColor, fontWeight: 400 }}
					>
						{unit}
					</Typography>
				) : null}
			</Box>
			{subtitle ? (
				<Typography sx={{ fontSize: "0.74rem", color: subColor, mt: 0.25 }}>
					{subtitle}
				</Typography>
			) : null}
			{typeof progress === "number" ? (
				<Box
					sx={{
						mt: 1.25,
						height: 5,
						borderRadius: "99px",
						bgcolor: trackBg,
						overflow: "hidden",
					}}
				>
					<Box
						sx={{
							height: "100%",
							width: `${Math.max(0, Math.min(100, progress))}%`,
							bgcolor: highlight ? "#fff" : theme.palette.brand.main,
							borderRadius: "99px",
						}}
					/>
				</Box>
			) : null}
		</Box>
	);
}
