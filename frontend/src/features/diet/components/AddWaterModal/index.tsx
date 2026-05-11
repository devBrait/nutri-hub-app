import AddIcon from "@mui/icons-material/Add";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import OutlinedInput from "@mui/material/OutlinedInput";
import { alpha, useTheme } from "@mui/material/styles";
import { isAxiosError } from "axios";
import { useSnackbar } from "notistack";
import { useState } from "react";
import ResponsiveModal from "../../../../components/ResponsiveModal";
import { addWaterIntake } from "../../../../lib/api/patient.service";

interface AddWaterModalProps {
	open: boolean;
	onClose: () => void;
	date: string;
	onSuccess?: () => void;
}

const PRESETS = [250, 350, 500];

export default function AddWaterModal({ open, onClose, date, onSuccess }: AddWaterModalProps) {
	const theme = useTheme();
	const { enqueueSnackbar } = useSnackbar();
	const [amount, setAmount] = useState<string>("");
	const [loading, setLoading] = useState(false);

	const handleAdd = async (ml: number) => {
		if (ml <= 0) return;
		try {
			setLoading(true);
			const token = localStorage.getItem("accessToken") ?? "";
			if (!token) return;

			await addWaterIntake(date, ml, token);
			if (onSuccess) onSuccess();
			handleClose();
			enqueueSnackbar("Água adicionada com sucesso!", { variant: "success", autoHideDuration: 2000 });
		} catch (error) {
			const msg = isAxiosError(error) ? (error.response?.data?.message ?? null) : null;
			enqueueSnackbar(msg ?? "Erro de conexão.", {
				variant: "error",
				autoHideDuration: 2000,
			});
		} finally {
			setLoading(false);
		}
	};

	const handleClose = () => {
		setAmount("");
		onClose();
	};

	return (
		<ResponsiveModal open={open} onClose={() => !loading && handleClose()} title="Adicionar Água">
			<Box sx={{ display: "flex", gap: 1, mb: 3 }}>
				{PRESETS.map((val) => (
					<Button
						key={val}
						onClick={() => handleAdd(val)}
						disabled={loading}
						sx={{
							flex: 1,
							bgcolor: alpha(theme.palette.brand.main, 0.1),
							color: theme.palette.brand.main,
							fontWeight: 600,
							py: 1.5,
							borderRadius: "12px",
							fontSize: "0.95rem",
							"&:hover": {
								bgcolor: alpha(theme.palette.brand.main, 0.2),
							},
						}}
					>
						+{val} ml
					</Button>
				))}
			</Box>

			<Box sx={{ display: "flex", gap: 1.5 }}>
				<OutlinedInput
					fullWidth
					type="number"
					placeholder="Outro valor"
					value={amount}
					onChange={(e) => setAmount(e.target.value)}
					disabled={loading}
					endAdornment={<InputAdornment position="end">ml</InputAdornment>}
					sx={{
						borderRadius: "12px",
						bgcolor: theme.palette.neutral.altTempBackground,
						"& fieldset": { border: "none" },
					}}
				/>
				<IconButton
					onClick={() => handleAdd(Number(amount))}
					disabled={loading || !amount || Number(amount) <= 0}
					sx={{
						bgcolor: theme.palette.brand.main,
						color: "#fff",
						borderRadius: "12px",
						width: 52,
						height: 52,
						"&:hover": {
							bgcolor: theme.palette.brand.hoverItem,
						},
						"&.Mui-disabled": {
							bgcolor: alpha(theme.palette.brand.main, 0.5),
							color: alpha("#fff", 0.7),
						},
					}}
				>
					{loading ? <CircularProgress size={24} color="inherit" /> : <AddIcon />}
				</IconButton>
			</Box>
		</ResponsiveModal>
	);
}
