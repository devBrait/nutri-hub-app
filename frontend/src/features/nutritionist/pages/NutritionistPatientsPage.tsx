import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import PersonAddIcon from "@mui/icons-material/PersonAddOutlined";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Skeleton from "@mui/material/Skeleton";
import { alpha, useTheme } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import { useNavigate } from "react-router-dom";
import SectionCard from "../../../components/SectionCard";
import { useMyPatients } from "../../../hooks/useMyPatients";
import { useTopbar } from "../../../hooks/useTopbar";

export default function NutritionistPatientsPage() {
	const theme = useTheme();
	const navigate = useNavigate();
	const { patients, loading } = useMyPatients();

	useTopbar("Pacientes");

	return (
		<Box>
			<Box
				sx={{
					mb: { xs: 2, md: 3 },
					display: "flex",
					alignItems: { xs: "center", md: "flex-end" },
					justifyContent: "space-between",
					gap: 2,
				}}
			>
				<Box sx={{ display: { xs: "none", md: "block" } }}>
					<Typography
						sx={{
							fontSize: "1.4rem",
							fontWeight: 700,
							color: theme.palette.typography.mainText,
							mb: 0.5,
						}}
					>
						Meus Pacientes
					</Typography>
					<Typography sx={{ fontSize: "0.82rem", color: theme.palette.typography.secondaryText }}>
						Pacientes vinculados ao seu consultório.
					</Typography>
				</Box>
				<Button
					onClick={() => navigate("/nutritionist/invitations")}
					startIcon={<PersonAddIcon />}
					sx={{
						bgcolor: theme.palette.brand.main,
						color: "#fff",
						fontFamily: '"Inter", sans-serif',
						fontWeight: 600,
						fontSize: "0.82rem",
						borderRadius: "10px",
						px: 2,
						py: 1,
						whiteSpace: "nowrap",
						flexShrink: 0,
						"&:hover": { bgcolor: theme.palette.brand.hoverItem },
					}}
				>
					Convidar paciente
				</Button>
			</Box>

			<SectionCard>
				{loading ? (
					[0, 1, 2].map((i) => (
						<Skeleton
							key={i}
							variant="rounded"
							height={64}
							sx={{ borderRadius: "12px", mb: 1, bgcolor: theme.palette.neutral.altTempBackground }}
						/>
					))
				) : patients.length === 0 ? (
					<Box sx={{ textAlign: "center", py: { xs: 6, md: 8 } }}>
						<Typography sx={{ fontSize: "2.5rem", mb: 1.5 }}>👥</Typography>
						<Typography
							sx={{
								fontSize: "0.95rem",
								fontWeight: 600,
								color: theme.palette.typography.mainText,
								mb: 0.5,
							}}
						>
							Nenhum paciente vinculado ainda
						</Typography>
						<Typography
							sx={{
								fontSize: "0.82rem",
								color: theme.palette.typography.secondaryCardText,
							}}
						>
							Use o botão acima para enviar um convite.
						</Typography>
					</Box>
				) : (
					patients.map((p) => (
						<Box
							key={p.id}
							onClick={() => navigate(`/nutritionist/patients/${p.id}`)}
							sx={{
								display: "flex",
								alignItems: "center",
								gap: 2,
								p: 1.75,
								borderRadius: "12px",
								mb: 1,
								bgcolor: theme.palette.neutral.background,
								cursor: "pointer",
								"&:hover": { bgcolor: alpha(theme.palette.brand.main, 0.05) },
								transition: "background-color 0.15s",
							}}
						>
							<Box
								sx={{
									width: 42,
									height: 42,
									borderRadius: "50%",
									bgcolor: alpha(theme.palette.brand.main, 0.12),
									display: "flex",
									alignItems: "center",
									justifyContent: "center",
									fontSize: "1rem",
									fontWeight: 700,
									color: theme.palette.brand.main,
									flexShrink: 0,
								}}
							>
								{p.name.slice(0, 1).toUpperCase()}
							</Box>
							<Box sx={{ flex: 1, minWidth: 0 }}>
								<Typography
									sx={{
										fontSize: "0.88rem",
										fontWeight: 600,
										color: theme.palette.typography.mainText,
									}}
								>
									{p.name}
								</Typography>
								<Typography
									sx={{ fontSize: "0.74rem", color: theme.palette.typography.secondaryCardText }}
								>
									{p.email}
								</Typography>
							</Box>
							<Typography
								sx={{
									fontSize: "0.72rem",
									color: theme.palette.typography.secondaryCardText,
									flexShrink: 0,
								}}
							>
								Desde {new Date(p.linkedAt).toLocaleDateString("pt-BR")}
							</Typography>
							<ChevronRightIcon
								sx={{
									fontSize: "1.1rem",
									color: theme.palette.typography.secondaryCardText,
									flexShrink: 0,
								}}
							/>
						</Box>
					))
				)}
			</SectionCard>
		</Box>
	);
}
