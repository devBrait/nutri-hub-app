import Box from "@mui/material/Box";
import { alpha, useTheme } from "@mui/material/styles";
import Typography from "@mui/material/Typography";

interface Option<T extends string> {
	value: T;
	label: string;
	description?: string;
	icon?: string;
}

interface OptionPickerProps<T extends string> {
	options: Option<T>[];
	value: T | null;
	onChange: (next: T) => void;
}

export default function OptionPicker<T extends string>({
	options,
	value,
	onChange,
}: OptionPickerProps<T>) {
	const theme = useTheme();

	return (
		<Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
			{options.map((opt) => {
				const selected = value === opt.value;
				return (
					<Box
						key={opt.value}
						onClick={() => onChange(opt.value)}
						sx={{
							p: 1.75,
							borderRadius: "12px",
							border: `1.5px solid ${selected ? theme.palette.brand.main : theme.palette.divider}`,
							bgcolor: selected
								? alpha(theme.palette.brand.main, 0.06)
								: theme.palette.neutral.card,
							cursor: "pointer",
							display: "flex",
							alignItems: "center",
							gap: 1.5,
							transition: "all 0.15s ease",
							"&:hover": {
								borderColor: theme.palette.brand.main,
							},
						}}
					>
						{opt.icon ? (
							<Box
								sx={{
									width: 38,
									height: 38,
									borderRadius: "10px",
									bgcolor: theme.palette.neutral.altTempBackground,
									display: "flex",
									alignItems: "center",
									justifyContent: "center",
									fontSize: "1.1rem",
									flexShrink: 0,
								}}
							>
								{opt.icon}
							</Box>
						) : null}
						<Box sx={{ flex: 1 }}>
							<Typography
								sx={{
									fontSize: "0.9rem",
									fontWeight: 600,
									color: theme.palette.typography.mainText,
								}}
							>
								{opt.label}
							</Typography>
							{opt.description ? (
								<Typography
									sx={{
										fontSize: "0.74rem",
										color: theme.palette.typography.secondaryText,
										mt: 0.25,
									}}
								>
									{opt.description}
								</Typography>
							) : null}
						</Box>
						<Box
							sx={{
								width: 18,
								height: 18,
								borderRadius: "50%",
								border: `1.5px solid ${selected ? theme.palette.brand.main : theme.palette.divider}`,
								bgcolor: selected ? theme.palette.brand.main : "transparent",
								flexShrink: 0,
							}}
						/>
					</Box>
				);
			})}
		</Box>
	);
}
