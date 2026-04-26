import AddIcon from "@mui/icons-material/Add";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { useTheme } from "@mui/material/styles";
import type { Food } from "../../types/diet";

interface FoodItemProps {
	food: Food;
	onClick?: () => void;
}

export default function FoodItem({ food, onClick }: FoodItemProps) {
	const theme = useTheme();
	const isLight = theme.palette.mode === "light";

	return (
		<Box
			onClick={onClick}
			sx={{
				display: "flex",
				alignItems: "center",
				gap: 1.75,
				p: 1.5,
				borderRadius: "12px",
				bgcolor: isLight
					? theme.palette.neutral.background
					: theme.palette.neutral.textFieldBg,
				mb: 1,
				cursor: "pointer",
				transition: "background 0.15s",
				"&:hover": { bgcolor: theme.palette.neutral.altTempBackground },
			}}
		>
			<Box
				sx={{
					width: 36,
					height: 36,
					borderRadius: "10px",
					bgcolor: theme.palette.neutral.altTempBackground,
					display: "flex",
					alignItems: "center",
					justifyContent: "center",
					fontSize: "1rem",
					flexShrink: 0,
				}}
			>
				{food.icon}
			</Box>
			<Box sx={{ flex: 1 }}>
				<Typography
					sx={{
						fontSize: "0.82rem",
						fontWeight: 600,
						color: theme.palette.typography.mainText,
						mb: 0.25,
					}}
				>
					{food.name}
				</Typography>
				<Typography
					sx={{
						fontSize: "0.68rem",
						color: theme.palette.typography.secondaryCardText,
					}}
				>
					{food.caloriesPer100g} cal / 100g
				</Typography>
				<Box sx={{ display: "flex", gap: 1, mt: 0.25 }}>
					<MicroMacro label="Carb" value={food.macrosPer100g.carbs} />
					<MicroMacro label="Prot" value={food.macrosPer100g.protein} />
					<MicroMacro label="Fat" value={food.macrosPer100g.fat} />
				</Box>
			</Box>
			<IconButton
				sx={{
					width: 28,
					height: 28,
					borderRadius: "50%",
					bgcolor: theme.palette.brand.main,
					color: "#fff",
					flexShrink: 0,
					"&:hover": { bgcolor: theme.palette.brand.hoverItem },
				}}
			>
				<AddIcon sx={{ fontSize: "0.82rem" }} />
			</IconButton>
		</Box>
	);
}

function MicroMacro({ label, value }: { label: string; value: number }) {
	const theme = useTheme();
	return (
		<Typography
			sx={{
				fontSize: "0.62rem",
				color: theme.palette.typography.secondaryCardText,
			}}
		>
			<Box
				component="span"
				sx={{ color: theme.palette.typography.secondaryText, fontWeight: 500 }}
			>
				{label}:
			</Box>{" "}
			{value}g
		</Typography>
	);
}
