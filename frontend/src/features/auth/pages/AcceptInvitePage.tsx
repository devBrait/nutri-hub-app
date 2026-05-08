import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";
import { alpha, useTheme } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import { isAxiosError } from "axios";
import { useSnackbar } from "notistack";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { acceptInvitation } from "../../../lib/api/clinic.service";

export default function AcceptInvitePage() {
	const theme = useTheme();
	const navigate = useNavigate();
	const { enqueueSnackbar } = useSnackbar();
	const { token } = useParams<{ token: string }>();
	const [loading, setLoading] = useState(false);
	const [done, setDone] = useState(false);
	const [nutritionistName, setNutritionistName] = useState<string | null>(null);

	const accessToken = localStorage.getItem("accessToken");
	const role = localStorage.getItem("role");
	const isPatient = role === "Patient";

	useEffect(() => {
		if (!accessToken) {
			sessionStorage.setItem("pendingInviteToken", token ?? "");
		}
	}, [accessToken, token]);

	const handleAccept = async () => {
		if (!token || !accessToken) return;
		setLoading(true);
		try {
			const res = await acceptInvitation(token, accessToken);
			if (res.success && res.output) {
				setNutritionistName(res.output.nutritionistName);
				setDone(true);
				enqueueSnackbar("Convite aceito com sucesso!", { variant: "success" });
			} else {
				enqueueSnackbar(res.message ?? "Não foi possível aceitar o convite.", { variant: "error" });
			}
		} catch (err) {
			const msg = isAxiosError(err) ? (err.response?.data?.message ?? null) : null;
			enqueueSnackbar(msg ?? "Não foi possível aceitar o convite.", { variant: "error" });
		} finally {
			setLoading(false);
		}
	};

	return (
		<Box
			sx={{
				minHeight: "100vh",
				display: "flex",
				alignItems: "center",
				justifyContent: "center",
				bgcolor: theme.palette.neutral.background,
				p: 2,
			}}
		>
			<Box
				sx={{
					maxWidth: 420,
					width: "100%",
					bgcolor: theme.palette.neutral.card,
					borderRadius: "20px",
					p: { xs: 3, md: 4 },
					border: `1px solid ${theme.palette.divider}`,
					textAlign: "center",
				}}
			>
				<Typography sx={{ fontSize: "2rem", mb: 2 }}>{done ? "🎉" : "🤝"}</Typography>

				{done ? (
					<>
						<Typography
							sx={{
								fontSize: "1.2rem",
								fontWeight: 700,
								color: theme.palette.typography.mainText,
								mb: 1,
							}}
						>
							Vínculo criado!
						</Typography>
						<Typography
							sx={{ fontSize: "0.88rem", color: theme.palette.typography.secondaryText, mb: 3 }}
						>
							Você agora está vinculado a <strong>{nutritionistName}</strong>.
						</Typography>
						<Button
							fullWidth
							onClick={() => navigate("/diet")}
							sx={{
								bgcolor: theme.palette.brand.main,
								color: "#fff",
								borderRadius: "12px",
								py: 1.5,
								fontWeight: 600,
								textTransform: "none",
								"&:hover": { bgcolor: theme.palette.brand.hoverItem },
							}}
						>
							Ir para o painel
						</Button>
					</>
				) : !accessToken ? (
					<>
						<Typography
							sx={{
								fontSize: "1.2rem",
								fontWeight: 700,
								color: theme.palette.typography.mainText,
								mb: 1,
							}}
						>
							Convite recebido
						</Typography>
						<Typography
							sx={{ fontSize: "0.88rem", color: theme.palette.typography.secondaryText, mb: 3 }}
						>
							Para aceitar este convite, você precisa estar logado como paciente.
						</Typography>
						<Button
							fullWidth
							onClick={() => navigate(`/login?redirect=/accept-invite/${token}`)}
							sx={{
								bgcolor: theme.palette.brand.main,
								color: "#fff",
								borderRadius: "12px",
								py: 1.5,
								fontWeight: 600,
								textTransform: "none",
								mb: 1,
								"&:hover": { bgcolor: theme.palette.brand.hoverItem },
							}}
						>
							Fazer login
						</Button>
						<Button
							fullWidth
							variant="outlined"
							onClick={() => navigate(`/register?redirect=/accept-invite/${token}`)}
							sx={{
								borderRadius: "12px",
								py: 1.5,
								fontWeight: 600,
								textTransform: "none",
								borderColor: theme.palette.divider,
							}}
						>
							Criar conta
						</Button>
					</>
				) : !isPatient ? (
					<>
						<Typography
							sx={{
								fontSize: "1.2rem",
								fontWeight: 700,
								color: theme.palette.typography.mainText,
								mb: 1,
							}}
						>
							Perfil incompatível
						</Typography>
						<Typography
							sx={{ fontSize: "0.88rem", color: theme.palette.typography.secondaryText, mb: 3 }}
						>
							Convites só podem ser aceitos por pacientes. Faça login com uma conta de paciente.
						</Typography>
						<Button
							fullWidth
							onClick={() => navigate("/diet")}
							sx={{
								bgcolor: alpha(theme.palette.brand.main, 0.1),
								color: theme.palette.brand.main,
								borderRadius: "12px",
								py: 1.5,
								fontWeight: 600,
								textTransform: "none",
							}}
						>
							Voltar ao painel
						</Button>
					</>
				) : (
					<>
						<Typography
							sx={{
								fontSize: "1.2rem",
								fontWeight: 700,
								color: theme.palette.typography.mainText,
								mb: 1,
							}}
						>
							Convite de nutricionista
						</Typography>
						<Typography
							sx={{ fontSize: "0.88rem", color: theme.palette.typography.secondaryText, mb: 3 }}
						>
							Você foi convidado para se vincular a um nutricionista no NutriHub. Aceite para
							começar o acompanhamento.
						</Typography>
						<Button
							fullWidth
							disabled={loading}
							onClick={handleAccept}
							sx={{
								bgcolor: theme.palette.brand.main,
								color: "#fff",
								borderRadius: "12px",
								py: 1.5,
								fontWeight: 600,
								textTransform: "none",
								"&:hover": { bgcolor: theme.palette.brand.hoverItem },
								"&.Mui-disabled": { opacity: 0.65 },
							}}
						>
							{loading ? <CircularProgress size={20} sx={{ color: "#fff" }} /> : "Aceitar convite"}
						</Button>
					</>
				)}
			</Box>
		</Box>
	);
}
