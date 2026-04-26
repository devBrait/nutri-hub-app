import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import OutlinedInput from "@mui/material/OutlinedInput";
import Typography from "@mui/material/Typography";
import { useTheme } from "@mui/material/styles";
import { useEffect, useState } from "react";
import ResponsiveModal from "../../components/ResponsiveModal";
import { useProfile } from "../../hooks/useProfile";

interface EditDataModalProps {
	open: boolean;
	onClose: () => void;
}

export default function EditDataModal({ open, onClose }: EditDataModalProps) {
	const theme = useTheme();
	const { profile } = useProfile();
	const [goalWeight, setGoalWeight] = useState("70");
	const [age, setAge] = useState("22");
	const [height, setHeight] = useState("175");

	useEffect(() => {
		if (profile) {
			setGoalWeight(String(profile.goalWeightKg));
			setAge(String(profile.ageYears));
			setHeight(String(profile.heightCm));
		}
	}, [profile]);

	const handleSubmit = () => {
		// TODO(backend): enviar dados atualizados para a API
		onClose();
	};

	return (
		<ResponsiveModal open={open} onClose={onClose} title="Dados do usuário">
			<FieldRow label="Peso objetivo" unit="kg">
				<OutlinedInput
					size="small"
					type="number"
					value={goalWeight}
					onChange={(e) => setGoalWeight(e.target.value)}
					inputProps={{ min: 0 }}
					sx={{ maxWidth: 110 }}
				/>
			</FieldRow>
			<FieldRow label="Idade" unit="anos">
				<OutlinedInput
					size="small"
					type="number"
					value={age}
					onChange={(e) => setAge(e.target.value)}
					inputProps={{ min: 0 }}
					sx={{ maxWidth: 110 }}
				/>
			</FieldRow>
			<FieldRow label="Altura" unit="cm">
				<OutlinedInput
					size="small"
					type="number"
					value={height}
					onChange={(e) => setHeight(e.target.value)}
					inputProps={{ min: 0 }}
					sx={{ maxWidth: 110 }}
				/>
			</FieldRow>

			<Button
				fullWidth
				disabled={false}
				onClick={handleSubmit}
				sx={{
					bgcolor: theme.palette.brand.main,
					color: "#fff",
					borderRadius: "12px",
					py: 1.5,
					mt: 1,
					fontSize: "0.92rem",
					fontWeight: 700,
					"&:hover": { bgcolor: theme.palette.brand.hoverItem },
				}}
			>
				Aplicar
			</Button>
		</ResponsiveModal>
	);
}

function FieldRow({
	label,
	unit,
	children,
}: {
	label: string;
	unit?: string;
	children: React.ReactNode;
}) {
	const theme = useTheme();
	return (
		<Box sx={{ display: "flex", alignItems: "center", gap: 1.25, mb: 1.75 }}>
			<Typography
				sx={{
					fontSize: "0.82rem",
					fontWeight: 500,
					color: theme.palette.typography.secondaryText,
					width: 110,
					flexShrink: 0,
				}}
			>
				{label}
			</Typography>
			<Box sx={{ flex: 1 }}>{children}</Box>
			{unit ? (
				<Typography
					sx={{
						fontSize: "0.82rem",
						color: theme.palette.typography.secondaryCardText,
						width: 38,
					}}
				>
					{unit}
				</Typography>
			) : null}
		</Box>
	);
}
