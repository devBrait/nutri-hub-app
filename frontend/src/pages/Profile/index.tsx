import EditIcon from "@mui/icons-material/Edit";
import ScaleIcon from "@mui/icons-material/MonitorWeightOutlined";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { alpha, useTheme } from "@mui/material/styles";
import { useState } from "react";
import SectionCard from "../../components/SectionCard";
import WeightChart from "../../components/WeightChart";
import { useProfile } from "../../hooks/useProfile";
import { useTopbar } from "../../hooks/useTopbar";
import WeightLogModal from "../Dashboard/WeightLogModal";
import EditDataModal from "./EditDataModal";

const RANGES = ["3m", "6m", "1a"] as const;

export default function Profile() {
	const theme = useTheme();
	const { profile } = useProfile();
	const [range, setRange] = useState<(typeof RANGES)[number]>("3m");
	const [weightModalOpen, setWeightModalOpen] = useState(false);
	const [editModalOpen, setEditModalOpen] = useState(false);

	useTopbar("Perfil");

	if (!profile) return null;

	return (
		<Box sx={{ mt: { xs: -2, md: 0 } }}>
			<Box
				sx={{
					display: "grid",
					gridTemplateColumns: { xs: "1fr", lg: "2fr 1fr" },
					gap: 2,
				}}
			>
				<Box>
					{/* Header verde — full-bleed em mobile */}
					<Box
						sx={{
							bgcolor: theme.palette.brand.main,
							borderRadius: { xs: 0, md: "16px" },
							p: { xs: 2.5, md: 3.5 },
							mb: 2,
							mx: { xs: -2, md: 0 },
						}}
					>
						<Typography
							sx={{
								fontSize: { xs: "1.05rem", md: "1.25rem" },
								fontWeight: 700,
								color: "#fff",
								mb: 2,
							}}
						>
							{profile.fullName}
						</Typography>
						<Box
							sx={{
								display: "grid",
								gridTemplateColumns: "repeat(3, 1fr)",
								gap: 1.5,
								mb: 2.5,
							}}
						>
							<HeaderStat value={`${profile.initialWeightKg}kg`} label="Peso Inicial" />
							<HeaderStat value={`${profile.currentWeightKg}kg`} label="Peso Atual" />
							<HeaderStat value={`${profile.goalWeightKg}kg`} label="Peso Objetivo" />
						</Box>
						<Box sx={{ display: "flex", gap: 1.25 }}>
							<HeaderButton
								icon={<ScaleIcon sx={{ fontSize: "1rem", mr: 0.75 }} />}
								onClick={() => setWeightModalOpen(true)}
							>
								Registrar peso
							</HeaderButton>
							<HeaderButton
								icon={<EditIcon sx={{ fontSize: "1rem", mr: 0.75 }} />}
								onClick={() => setEditModalOpen(true)}
							>
								Editar dados
							</HeaderButton>
						</Box>
					</Box>

					{/* Chart */}
					<SectionCard
						title="Evolução de peso"
						action={
							<Box
								sx={{
									display: "flex",
									gap: 0.5,
									bgcolor: theme.palette.neutral.background,
									borderRadius: "10px",
									p: 0.5,
								}}
							>
								{RANGES.map((r) => (
									<Box
										key={r}
										onClick={() => setRange(r)}
										sx={{
											px: { xs: 1.5, md: 2 },
											py: 0.7,
											borderRadius: "8px",
											fontSize: "0.74rem",
											fontWeight: range === r ? 600 : 500,
											color:
												range === r
													? theme.palette.typography.mainText
													: theme.palette.typography.secondaryText,
											bgcolor: range === r ? theme.palette.neutral.card : "transparent",
											cursor: "pointer",
											boxShadow:
												range === r ? "0 1px 4px rgba(0,0,0,0.08)" : "none",
										}}
									>
										{r}
									</Box>
								))}
							</Box>
						}
					>
						<WeightChart entries={profile.weightHistory} />
					</SectionCard>
				</Box>

				{/* Histórico */}
				<SectionCard
					title="Histórico de peso"
					action={
						<Typography
							onClick={() => setWeightModalOpen(true)}
							sx={{
								fontSize: "0.74rem",
								fontWeight: 600,
								color: theme.palette.brand.main,
								cursor: "pointer",
							}}
						>
							+ Registrar
						</Typography>
					}
					sx={{ alignSelf: "start" }}
				>
					{profile.weightHistory.map((entry) => (
						<Box
							key={entry.id}
							sx={{
								display: "flex",
								alignItems: "center",
								justifyContent: "space-between",
								p: 1.5,
								px: 2,
								bgcolor: theme.palette.neutral.background,
								borderRadius: "12px",
								mb: 1,
							}}
						>
							<Typography
								sx={{
									fontSize: "0.88rem",
									fontWeight: 600,
									color: theme.palette.typography.mainText,
								}}
							>
								Peso: {entry.weightKg}kg
							</Typography>
							<Box sx={{ display: "flex", alignItems: "center", gap: 1.25 }}>
								<Typography
									sx={{
										fontSize: "0.74rem",
										color: theme.palette.typography.secondaryCardText,
									}}
								>
									{entry.date.slice(5, 7)}/{entry.date.slice(0, 4)}
								</Typography>
								<IconButton
									sx={{
										width: 28,
										height: 28,
										bgcolor: theme.palette.brand.main,
										color: "#fff",
										"&:hover": { bgcolor: theme.palette.brand.hoverItem },
									}}
								>
									<EditIcon sx={{ fontSize: "0.75rem" }} />
								</IconButton>
							</Box>
						</Box>
					))}
				</SectionCard>
			</Box>

			<WeightLogModal
				open={weightModalOpen}
				onClose={() => setWeightModalOpen(false)}
			/>
			<EditDataModal open={editModalOpen} onClose={() => setEditModalOpen(false)} />
		</Box>
	);
}

function HeaderStat({ value, label }: { value: string; label: string }) {
	return (
		<Box
			sx={{
				bgcolor: alpha("#fff", 0.15),
				borderRadius: "12px",
				p: 1.75,
				textAlign: "center",
			}}
		>
			<Typography sx={{ fontSize: "1.35rem", fontWeight: 700, color: "#fff" }}>
				{value}
			</Typography>
			<Typography
				sx={{ fontSize: "0.7rem", color: alpha("#fff", 0.65), mt: 0.25 }}
			>
				{label}
			</Typography>
		</Box>
	);
}

function HeaderButton({
	icon,
	children,
	onClick,
}: {
	icon: React.ReactNode;
	children: React.ReactNode;
	onClick: () => void;
}) {
	return (
		<Button
			fullWidth
			onClick={onClick}
			sx={{
				bgcolor: alpha("#fff", 0.15),
				color: "#fff",
				borderRadius: "10px",
				py: 1.25,
				fontSize: "0.82rem",
				fontWeight: 600,
				textTransform: "none",
				fontFamily: '"DM Sans", sans-serif',
				"&:hover": { bgcolor: alpha("#fff", 0.25) },
			}}
		>
			{icon}
			{children}
		</Button>
	);
}
