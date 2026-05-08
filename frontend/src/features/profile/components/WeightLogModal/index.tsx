import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";
import OutlinedInput from "@mui/material/OutlinedInput";
import { useTheme } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import { isAxiosError } from "axios";
import { useSnackbar } from "notistack";
import { useState } from "react";
import ResponsiveModal from "../../../../components/ResponsiveModal";
import { logWeight } from "../../../../lib/api/patient.service";
import { todayIso } from "../../../../utils/format";

interface WeightLogModalProps {
	open: boolean;
	onClose: () => void;
	onSuccess?: () => void;
}

export default function WeightLogModal({ open, onClose, onSuccess }: WeightLogModalProps) {
	const theme = useTheme();
	const { enqueueSnackbar } = useSnackbar();
	const today = todayIso();
	const [weight, setWeight] = useState("80");
	const [date, setDate] = useState(today);
	const [loading, setLoading] = useState(false);

	const handleDateChange = (value: string) => {
		if (value > today) {
			setDate(today);
			enqueueSnackbar("Data futura ajustada para hoje.", { variant: "info" });
			return;
		}
		setDate(value);
	};

	const handleSubmit = async () => {
		const kg = parseFloat(weight);
		if (isNaN(kg) || kg < 20 || kg > 300) {
			enqueueSnackbar("Informe um peso válido entre 20 e 300 kg.", {
				variant: "error",
			});
			return;
		}

		if (date > today) {
			enqueueSnackbar("A data não pode ser no futuro.", { variant: "error" });
			return;
		}

		const token = localStorage.getItem("accessToken") ?? "";
		setLoading(true);
		try {
			await logWeight({ weightKg: kg, recordedAt: date }, token);
			enqueueSnackbar("Peso registrado com sucesso!", { variant: "success" });
			onSuccess?.();
			onClose();
		} catch (err) {
			const msg = isAxiosError(err) ? (err.response?.data?.message ?? null) : null;
			enqueueSnackbar(msg ?? "Não foi possível registrar o peso.", {
				variant: "error",
			});
		} finally {
			setLoading(false);
		}
	};

	return (
		<ResponsiveModal open={open} onClose={() => !loading && onClose()} title="Registro de peso">
			<FieldRow label="Peso" unit="kg">
				<OutlinedInput
					size="small"
					type="number"
					value={weight}
					onChange={(e) => setWeight(e.target.value)}
					inputProps={{ min: 20, max: 300 }}
					sx={{ maxWidth: 110 }}
				/>
			</FieldRow>
			<FieldRow label="Data">
				<OutlinedInput
					size="small"
					type="date"
					value={date}
					onChange={(e) => handleDateChange(e.target.value)}
					inputProps={{ max: today }}
					fullWidth
				/>
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
				{loading ? <CircularProgress size={22} sx={{ color: "#fff" }} /> : "Confirmar"}
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
					sx={{
						fontSize: "0.82rem",
						color: theme.palette.typography.secondaryCardText,
						width: 30,
					}}
				>
					{unit}
				</Typography>
			)}
		</Box>
	);
}
