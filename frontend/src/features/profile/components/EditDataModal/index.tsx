import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";
import OutlinedInput from "@mui/material/OutlinedInput";
import { useTheme } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import { isAxiosError } from "axios";
import { useSnackbar } from "notistack";
import { useEffect, useState } from "react";
import ResponsiveModal from "../../../../components/ResponsiveModal";
import { useProfile } from "../../../../hooks/useProfile";
import { updateProfile } from "../../../../lib/api/patient.service";
import type { Goal } from "../../../../types/profile";

interface EditDataModalProps {
	open: boolean;
	onClose: () => void;
}

const GOAL_OPTIONS: { value: Goal; label: string }[] = [
	{ value: "lose", label: "Perder peso" },
	{ value: "maintain", label: "Manter peso" },
	{ value: "gain", label: "Ganhar músculo" },
];

export default function EditDataModal({ open, onClose }: EditDataModalProps) {
	const theme = useTheme();
	const { enqueueSnackbar } = useSnackbar();
	const { profile, refetch } = useProfile();
	const [goalWeight, setGoalWeight] = useState("70");
	const [age, setAge] = useState("22");
	const [height, setHeight] = useState("175");
	const [goal, setGoal] = useState<Goal>("maintain");
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		if (profile) {
			setGoalWeight(String(profile.goalWeightKg));
			setAge(String(profile.ageYears));
			setHeight(String(profile.heightCm));
			setGoal(profile.goal);
		}
	}, [profile]);

	const handleSubmit = async () => {
		if (!profile) return;

		const token = localStorage.getItem("accessToken") ?? "";
		setLoading(true);
		try {
			await updateProfile(
				{
					name: profile.fullName,
					email: profile.email,
					sex: profile.gender,
					ageYears: parseInt(age, 10),
					heightCm: parseFloat(height),
					objective: goal,
					activityLevel: profile.activityLevel,
					targetWeightKg: parseFloat(goalWeight),
				},
				token,
			);
			enqueueSnackbar("Dados atualizados com sucesso!", { variant: "success" });
			refetch();
			onClose();
		} catch (err) {
			const msg = isAxiosError(err) ? (err.response?.data?.message ?? null) : null;
			enqueueSnackbar(msg ?? "Não foi possível atualizar os dados.", { variant: "error" });
		} finally {
			setLoading(false);
		}
	};

	return (
		<ResponsiveModal open={open} onClose={() => !loading && onClose()} title="Dados do usuário">
			<FieldRow label="Peso objetivo" unit="kg">
				<OutlinedInput
					size="small"
					type="number"
					value={goalWeight}
					onChange={(e) => setGoalWeight(e.target.value)}
					inputProps={{ min: 20, max: 300 }}
					sx={{ maxWidth: 110 }}
				/>
			</FieldRow>
			<FieldRow label="Idade" unit="anos">
				<OutlinedInput
					size="small"
					type="number"
					value={age}
					onChange={(e) => setAge(e.target.value)}
					inputProps={{ min: 1, max: 120 }}
					sx={{ maxWidth: 110 }}
				/>
			</FieldRow>
			<FieldRow label="Altura" unit="cm">
				<OutlinedInput
					size="small"
					type="number"
					value={height}
					onChange={(e) => setHeight(e.target.value)}
					inputProps={{ min: 50, max: 250 }}
					sx={{ maxWidth: 110 }}
				/>
			</FieldRow>
			<FieldRow label="Objetivo">
				<Box sx={{ display: "flex", gap: 0.75, flexWrap: "wrap" }}>
					{GOAL_OPTIONS.map((opt) => (
						<Box
							key={opt.value}
							onClick={() => setGoal(opt.value)}
							sx={{
								px: 1.5,
								py: 0.65,
								borderRadius: "8px",
								fontSize: "0.78rem",
								fontWeight: goal === opt.value ? 600 : 500,
								cursor: "pointer",
								border: `1.5px solid ${goal === opt.value ? theme.palette.brand.main : theme.palette.divider}`,
								color:
									goal === opt.value
										? theme.palette.brand.main
										: theme.palette.typography.secondaryText,
								bgcolor: goal === opt.value ? `${theme.palette.brand.main}12` : "transparent",
								transition: "all 0.15s",
								userSelect: "none",
							}}
						>
							{opt.label}
						</Box>
					))}
				</Box>
			</FieldRow>
			<Button
				fullWidth
				disabled={loading}
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
					"&.Mui-disabled": { opacity: 0.7 },
				}}
			>
				{loading ? <CircularProgress size={22} sx={{ color: "#fff" }} /> : "Aplicar"}
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
			{unit && (
				<Typography
					sx={{ fontSize: "0.82rem", color: theme.palette.typography.secondaryCardText, width: 38 }}
				>
					{unit}
				</Typography>
			)}
		</Box>
	);
}
