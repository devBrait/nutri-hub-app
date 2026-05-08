import Box from "@mui/material/Box";
import { alpha, useTheme } from "@mui/material/styles";
import Typography from "@mui/material/Typography";

interface ProgressRingProps {
	value: number;
	goal: number;
	displayValue: string | number;
	unit: string;
	subLabel?: string;
	size?: "sm" | "md";
}

const SIZE_MAP = {
	sm: { box: 52, r: 20, stroke: 5 },
	md: { box: 56, r: 22, stroke: 5 },
} as const;

export default function ProgressRing({
	value,
	goal,
	displayValue,
	unit,
	subLabel,
	size = "md",
}: ProgressRingProps) {
	const theme = useTheme();
	const { box, r, stroke } = SIZE_MAP[size];
	const center = box / 2;
	const circumference = 2 * Math.PI * r;
	const progress = goal > 0 ? Math.max(0, Math.min(1, value / goal)) : 0;
	const dashOffset = circumference * (1 - progress);

	const trackColor =
		theme.palette.mode === "light"
			? theme.palette.neutral.altTempBackground
			: alpha(theme.palette.brand.main, 0.18);

	return (
		<Box sx={{ display: "flex", alignItems: "center", gap: 1.25 }}>
			<Box
				component="svg"
				width={box}
				height={box}
				viewBox={`0 0 ${box} ${box}`}
				sx={{ flexShrink: 0 }}
			>
				<title>Progresso</title>
				<circle
					cx={center}
					cy={center}
					r={r}
					fill="none"
					stroke={trackColor}
					strokeWidth={stroke}
				/>
				<circle
					cx={center}
					cy={center}
					r={r}
					fill="none"
					stroke={theme.palette.brand.main}
					strokeWidth={stroke}
					strokeLinecap="round"
					strokeDasharray={circumference}
					strokeDashoffset={dashOffset}
					transform={`rotate(-90 ${center} ${center})`}
				/>
			</Box>
			<Box sx={{ minWidth: 0 }}>
				<Typography
					sx={{
						fontSize: { xs: "1rem", md: "1.15rem" },
						fontWeight: 700,
						color: theme.palette.brand.main,
						lineHeight: 1,
					}}
				>
					{displayValue}
				</Typography>
				<Typography
					sx={{
						fontSize: "0.66rem",
						color: theme.palette.typography.secondaryCardText,
						mt: 0.25,
					}}
				>
					{unit}
				</Typography>
				{subLabel ? (
					<Typography
						sx={{
							fontSize: "0.68rem",
							color: theme.palette.typography.secondaryText,
							fontWeight: 500,
						}}
					>
						{subLabel}
					</Typography>
				) : null}
			</Box>
		</Box>
	);
}
