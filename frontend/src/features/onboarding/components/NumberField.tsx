import Box from "@mui/material/Box";
import OutlinedInput from "@mui/material/OutlinedInput";
import { useTheme } from "@mui/material/styles";
import Typography from "@mui/material/Typography";

interface NumberFieldProps {
	label: string;
	unit?: string;
	value: number | null;
	onChange: (next: number | null) => void;
	placeholder?: string;
	min?: number;
	max?: number;
}

export default function NumberField({
	label,
	unit,
	value,
	onChange,
	placeholder,
	min = 0,
	max,
}: NumberFieldProps) {
	const theme = useTheme();

	return (
		<Box sx={{ mb: 2.5 }}>
			<Typography
				sx={{
					fontFamily: '"DM Sans", sans-serif',
					fontSize: "0.72rem",
					fontWeight: 600,
					color: theme.palette.typography.secondaryText,
					letterSpacing: "0.07em",
					textTransform: "uppercase",
					mb: 0.75,
				}}
			>
				{label}
			</Typography>
			<OutlinedInput
				fullWidth
				type="number"
				placeholder={placeholder}
				value={value ?? ""}
				inputProps={{ min, max }}
				onChange={(e) => {
					const raw = e.target.value;
					if (raw === "") {
						onChange(null);
						return;
					}
					let parsed = Number(raw);
					if (Number.isNaN(parsed)) return;
					if (parsed < min) parsed = min;
					if (typeof max === "number" && parsed > max) parsed = max;
					onChange(parsed);
				}}
				endAdornment={
					unit ? (
						<Typography
							sx={{
								fontSize: "0.85rem",
								color: theme.palette.typography.secondaryCardText,
								fontWeight: 500,
								mr: 0.5,
							}}
						>
							{unit}
						</Typography>
					) : null
				}
				sx={{
					bgcolor: theme.palette.neutral.textFieldBg,
					borderRadius: "12px",
					"& fieldset": { border: "none" },
					"&:hover fieldset": { border: "none" },
					"&.Mui-focused fieldset": {
						border: `1.5px solid ${theme.palette.brand.main} !important`,
					},
					"& input": {
						fontFamily: '"DM Sans", sans-serif',
						fontSize: "0.92rem",
						color: theme.palette.typography.mainText,
						py: 1.5,
						px: 2,
					},
				}}
			/>
		</Box>
	);
}
