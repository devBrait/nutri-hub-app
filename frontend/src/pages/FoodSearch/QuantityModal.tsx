import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import OutlinedInput from "@mui/material/OutlinedInput";
import Typography from "@mui/material/Typography";
import { useTheme } from "@mui/material/styles";
import { useEffect, useState } from "react";
import ResponsiveModal from "../../components/ResponsiveModal";
import type { Food } from "../../types/diet";

interface QuantityModalProps {
	food: Food | null;
	onClose: () => void;
	onConfirm: (grams: number) => void;
}

export default function QuantityModal({ food, onClose, onConfirm }: QuantityModalProps) {
	const theme = useTheme();
	const [grams, setGrams] = useState(120);

	useEffect(() => {
		if (food) setGrams(120);
	}, [food]);

	if (!food) return null;

	const factor = grams / 100;
	const carbs = Math.round(food.macrosPer100g.carbs * factor);
	const protein = Math.round(food.macrosPer100g.protein * factor);
	const fat = Math.round(food.macrosPer100g.fat * factor);

	return (
		<ResponsiveModal open={!!food} onClose={onClose} title={food.name}>
			<Typography
				sx={{
					color: theme.palette.typography.secondaryCardText,
					fontSize: "0.78rem",
					textAlign: "center",
					mt: -1.5,
					mb: 2,
				}}
			>
				{food.caloriesPer100g} cal / 100g
			</Typography>

			<Box
				sx={{
					display: "flex",
					alignItems: "center",
					justifyContent: "center",
					gap: 1.25,
					mb: 1.5,
				}}
			>
				<OutlinedInput
					size="small"
					type="number"
					value={grams}
					onChange={(e) => {
						const next = Number(e.target.value);
						setGrams(Number.isNaN(next) || next < 0 ? 0 : next);
					}}
					inputProps={{ min: 0 }}
					sx={{
						maxWidth: 130,
						"& input": {
							textAlign: "center",
							fontSize: { xs: "1.15rem", md: "1.05rem" },
							fontWeight: 700,
						},
					}}
				/>
				<Typography
					sx={{
						fontSize: "0.95rem",
						fontWeight: 600,
						color: theme.palette.typography.secondaryText,
					}}
				>
					g
				</Typography>
			</Box>

			<Box
				sx={{
					display: "flex",
					justifyContent: "center",
					gap: 2,
					mb: 2,
				}}
			>
				<MacroSpan label="Carb" value={`${carbs}g`} />
				<MacroSpan label="Prot" value={`${protein}g`} />
				<MacroSpan label="Fat" value={`${fat}g`} />
			</Box>

			<Button
				fullWidth
				onClick={() => onConfirm(grams)}
				sx={{
					bgcolor: theme.palette.brand.main,
					color: "#fff",
					borderRadius: "12px",
					py: 1.75,
					fontSize: "0.95rem",
					fontWeight: 700,
					textTransform: "none",
					"&:hover": { bgcolor: theme.palette.brand.hoverItem },
				}}
			>
				Adicionar à refeição
			</Button>
		</ResponsiveModal>
	);
}

function MacroSpan({ label, value }: { label: string; value: string }) {
	const theme = useTheme();
	return (
		<Typography
			sx={{
				fontSize: "0.74rem",
				color: theme.palette.typography.secondaryCardText,
			}}
		>
			<Box
				component="span"
				sx={{ color: theme.palette.typography.secondaryText, fontWeight: 600 }}
			>
				{label}:
			</Box>{" "}
			{value}
		</Typography>
	);
}
