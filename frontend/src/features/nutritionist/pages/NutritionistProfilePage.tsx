import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";
import OutlinedInput from "@mui/material/OutlinedInput";
import { alpha, useTheme } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import { isAxiosError } from "axios";
import { useSnackbar } from "notistack";
import { useEffect, useState } from "react";
import SectionCard from "../../../components/SectionCard";
import { useProfile } from "../../../hooks/useProfile";
import { useTopbar } from "../../../hooks/useTopbar";
import { updateNutritionistProfile } from "../../../lib/api/clinic.service";

export default function NutritionistProfilePage() {
	const theme = useTheme();
	const { enqueueSnackbar } = useSnackbar();
	const { profile, refetch } = useProfile();
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [crn, setCrn] = useState("");
	const [loading, setLoading] = useState(false);

	useTopbar("Perfil");

	useEffect(() => {
		if (profile) {
			setName(profile.fullName);
			setEmail(profile.email);
		}
	}, [profile]);

	const handleSubmit = async () => {
		const token = localStorage.getItem("accessToken") ?? "";
		setLoading(true);
		try {
			const res = await updateNutritionistProfile(
				{ name, email, crn: crn.trim() || undefined },
				token,
			);
			if (res.success) {
				enqueueSnackbar("Perfil atualizado com sucesso!", { variant: "success" });
				refetch();
			} else {
				enqueueSnackbar(res.message ?? "Não foi possível atualizar o perfil.", {
					variant: "error",
				});
			}
		} catch (err) {
			const msg = isAxiosError(err) ? (err.response?.data?.message ?? null) : null;
			enqueueSnackbar(msg ?? "Não foi possível atualizar o perfil.", { variant: "error" });
		} finally {
			setLoading(false);
		}
	};

	const initials = name
		.split(" ")
		.slice(0, 2)
		.map((w) => w[0]?.toUpperCase() ?? "")
		.join("");

	return (
		<Box>
			<Box sx={{ mb: { xs: 2, md: 3 }, display: { xs: "none", md: "block" } }}>
				<Typography
					sx={{
						fontSize: "1.4rem",
						fontWeight: 700,
						color: theme.palette.typography.mainText,
						mb: 0.5,
					}}
				>
					Meu Perfil
				</Typography>
				<Typography sx={{ fontSize: "0.82rem", color: theme.palette.typography.secondaryText }}>
					Atualize suas informações profissionais.
				</Typography>
			</Box>

			<Box
				sx={{
					display: "grid",
					gridTemplateColumns: { xs: "1fr", md: "auto 1fr" },
					gap: 2,
					alignItems: "start",
				}}
			>
				{/* Avatar */}
				<Box sx={{ display: "flex", justifyContent: { xs: "center", md: "flex-start" } }}>
					<Box
						sx={{
							width: 80,
							height: 80,
							borderRadius: "50%",
							bgcolor: alpha(theme.palette.brand.main, 0.15),
							display: "flex",
							alignItems: "center",
							justifyContent: "center",
							fontSize: "1.6rem",
							fontWeight: 700,
							color: theme.palette.brand.main,
						}}
					>
						{initials || "N"}
					</Box>
				</Box>

				<SectionCard title="Dados profissionais">
					<FieldRow label="Nome completo">
						<OutlinedInput
							fullWidth
							size="small"
							value={name}
							onChange={(e) => setName(e.target.value)}
							sx={{ borderRadius: "10px", "& input": { fontSize: "0.88rem" } }}
						/>
					</FieldRow>
					<FieldRow label="E-mail">
						<OutlinedInput
							fullWidth
							size="small"
							type="email"
							value={email}
							onChange={(e) => setEmail(e.target.value)}
							sx={{ borderRadius: "10px", "& input": { fontSize: "0.88rem" } }}
						/>
					</FieldRow>
					<FieldRow label="CRN (opcional)">
						<OutlinedInput
							fullWidth
							size="small"
							value={crn}
							onChange={(e) => setCrn(e.target.value)}
							placeholder="Ex: CRN-3 12345"
							sx={{ borderRadius: "10px", "& input": { fontSize: "0.88rem" } }}
						/>
					</FieldRow>
					<Button
						disabled={loading || !name.trim() || !email.trim()}
						onClick={handleSubmit}
						sx={{
							mt: 1,
							bgcolor: theme.palette.brand.main,
							color: "#fff",
							borderRadius: "10px",
							py: 1.25,
							px: 3,
							fontSize: "0.88rem",
							fontWeight: 600,
							textTransform: "none",
							"&:hover": { bgcolor: theme.palette.brand.hoverItem },
							"&.Mui-disabled": { opacity: 0.65 },
						}}
					>
						{loading ? <CircularProgress size={20} sx={{ color: "#fff" }} /> : "Salvar alterações"}
					</Button>
				</SectionCard>
			</Box>
		</Box>
	);
}

function FieldRow({ label, children }: { label: string; children: React.ReactNode }) {
	const theme = useTheme();
	return (
		<Box sx={{ mb: 1.75 }}>
			<Typography
				sx={{
					fontSize: "0.78rem",
					fontWeight: 600,
					color: theme.palette.typography.secondaryText,
					mb: 0.6,
				}}
			>
				{label}
			</Typography>
			{children}
		</Box>
	);
}
