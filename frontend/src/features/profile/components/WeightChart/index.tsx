import Box from "@mui/material/Box";
import { useTheme } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import { LineChart } from "@mui/x-charts/LineChart";
import type { WeightEntry } from "../../../../types/profile";

interface WeightChartProps {
	entries: WeightEntry[];
	range: "3m" | "6m" | "1a";
}

const RANGE_MONTHS: Record<WeightChartProps["range"], number> = {
	"3m": 3,
	"6m": 6,
	"1a": 12,
};

function formatAxisDate(isoDate: string): string {
	const [, month, day] = isoDate.split("-");
	return `${day}/${month}`;
}

export default function WeightChart({ entries, range }: WeightChartProps) {
	const theme = useTheme();

	const cutoff = new Date();
	cutoff.setMonth(cutoff.getMonth() - RANGE_MONTHS[range]);
	const cutoffIso = cutoff.toISOString().slice(0, 10);

	const sorted = [...entries]
		.filter((e) => e.date >= cutoffIso)
		.sort((a, b) => a.date.localeCompare(b.date));

	if (sorted.length === 0) {
		return (
			<Box sx={{ display: "flex", alignItems: "center", justifyContent: "center", height: 200 }}>
				<Typography sx={{ fontSize: "0.82rem", color: theme.palette.typography.secondaryCardText }}>
					Nenhum registro no período selecionado.
				</Typography>
			</Box>
		);
	}

	return (
		<LineChart
			height={200}
			series={[
				{
					data: sorted.map((e) => e.weightKg),
					color: theme.palette.brand.main,
					showMark: true,
					curve: "monotoneX",
					valueFormatter: (v) => `${v} kg`,
				},
			]}
			xAxis={[
				{
					scaleType: "point",
					data: sorted.map((e) => formatAxisDate(e.date)),
					tickLabelStyle: {
						fontSize: 11,
						fill: theme.palette.typography.secondaryCardText,
						fontFamily: '"DM Sans", sans-serif',
					},
				},
			]}
			yAxis={[
				{
					tickLabelStyle: {
						fontSize: 11,
						fill: theme.palette.typography.secondaryCardText,
						fontFamily: '"DM Sans", sans-serif',
					},
				},
			]}
			slots={{ legend: () => null }}
			sx={{
				width: "100%",
				"& .MuiChartsAxis-line": { stroke: theme.palette.divider },
				"& .MuiChartsAxis-tick": { stroke: theme.palette.divider },
				"& .MuiChartsGrid-line": { stroke: theme.palette.divider, strokeDasharray: "4 4" },
			}}
			grid={{ horizontal: true }}
		/>
	);
}
