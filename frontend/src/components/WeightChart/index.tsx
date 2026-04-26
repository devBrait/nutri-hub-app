import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { useTheme } from "@mui/material/styles";
import type { WeightEntry } from "../../types/profile";
import { formatMonthYear } from "../../utils/format";

interface WeightChartProps {
	entries: WeightEntry[];
}

const W = 600;
const H = 180;
const PAD_L = 36;
const PAD_R = 12;

export default function WeightChart({ entries }: WeightChartProps) {
	const theme = useTheme();
	const sorted = [...entries].sort((a, b) => a.date.localeCompare(b.date));
	const max = Math.max(150, ...sorted.map((e) => e.weightKg));
	const min = 50;

	const xFor = (i: number) =>
		PAD_L +
		(i / Math.max(1, sorted.length - 1)) * (W - PAD_L - PAD_R);
	const yFor = (kg: number) =>
		20 + ((max - kg) / (max - min)) * (H - 60);

	const points = sorted.map((e, i) => `${xFor(i)},${yFor(e.weightKg)}`).join(" ");
	const gridStroke = theme.palette.divider;

	return (
		<Box>
			<Box
				component="svg"
				viewBox={`0 0 ${W} ${H}`}
				preserveAspectRatio="none"
				sx={{ width: "100%", height: 180 }}
			>
				<title>Evolução de peso</title>
				{[150, 100, 50].map((value, idx) => (
					<g key={value}>
						<line
							x1={PAD_L}
							y1={20 + idx * ((H - 60) / 2)}
							x2={W}
							y2={20 + idx * ((H - 60) / 2)}
							stroke={gridStroke}
							strokeWidth={1}
						/>
						<text
							x={0}
							y={22 + idx * ((H - 60) / 2)}
							fontSize={11}
							fill={theme.palette.typography.secondaryCardText}
							fontFamily="DM Sans"
						>
							{value}
						</text>
					</g>
				))}
				{sorted.length > 0 && (
					<polyline
						points={points}
						fill="none"
						stroke={theme.palette.brand.main}
						strokeWidth={2.5}
						strokeLinecap="round"
						strokeLinejoin="round"
					/>
				)}
				{sorted.map((e, i) => (
					<circle
						key={e.id}
						cx={xFor(i)}
						cy={yFor(e.weightKg)}
						r={5}
						fill={theme.palette.brand.main}
					/>
				))}
			</Box>
			<Box sx={{ display: "flex", justifyContent: "space-between", mt: 0.5, px: 0.5 }}>
				{sorted.map((e) => (
					<Typography
						key={e.id}
						sx={{
							fontSize: "0.68rem",
							color: theme.palette.typography.secondaryCardText,
						}}
					>
						{formatMonthYear(e.date)}
					</Typography>
				))}
			</Box>
		</Box>
	);
}
