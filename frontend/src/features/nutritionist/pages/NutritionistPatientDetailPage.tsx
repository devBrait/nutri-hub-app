import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import Skeleton from "@mui/material/Skeleton";
import { alpha, useTheme } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import SectionCard from "../../../components/SectionCard";
import { useTopbar } from "../../../hooks/useTopbar";
import {
	getPatientDailySummaryByNutritionist,
	getPatientProfileByNutritionist,
	type MealSummary,
} from "../../../lib/api/patient.service";

const OBJECTIVE_LABELS: Record<string, string> = {
	LoseWeight: "Perder peso",
	Maintain: "Manter peso",
	GainMuscle: "Ganhar músculo",
};

const ACTIVITY_LABELS: Record<string, string> = {
	Sedentary: "Sedentário",
	LightlyActive: "Levemente ativo",
	ModeratelyActive: "Moderadamente ativo",
	VeryActive: "Muito ativo",
	Athlete: "Atleta",
};

const MEAL_LABELS: Record<string, string> = {
	Breakfast: "Café da manhã",
	Lunch: "Almoço",
	Snack: "Lanche",
	Dinner: "Jantar",
};

function formatDate(d: Date): string {
	const year = d.getFullYear();
	const month = String(d.getMonth() + 1).padStart(2, "0");
	const day = String(d.getDate()).padStart(2, "0");
	return `${year}-${month}-${day}`;
}

export default function NutritionistPatientDetailPage() {
	const theme = useTheme();
	const navigate = useNavigate();
	const { patientId } = useParams<{ patientId: string }>();
	const [selectedDate, setSelectedDate] = useState(new Date());

	const [profile, setProfile] = useState<{
		name: string;
		email: string;
		objective: string | null;
		activityLevel: string | null;
		dailyCalorieGoal: number | null;
		targetWeightKg: number | null;
		currentWeightKg: number | null;
		ageYears: number | null;
		heightCm: number | null;
	} | null>(null);

	const [summary, setSummary] = useState<{
		caloriesConsumed: number;
		caloriesGoal: number;
		carbsG: number;
		proteinG: number;
		fatG: number;
		carbsGoalG: number;
		proteinGoalG: number;
		fatGoalG: number;
		meals: MealSummary[];
	} | null>(null);

	const [profileLoading, setProfileLoading] = useState(true);
	const [summaryLoading, setSummaryLoading] = useState(true);

	useTopbar("Detalhes do paciente");

	useEffect(() => {
		if (!patientId) return;
		const token = localStorage.getItem("accessToken") ?? "";
		setProfileLoading(true);
		getPatientProfileByNutritionist(patientId, token)
			.then((res) => {
				if (res.success && res.output) {
					const o = res.output;
					setProfile({
						name: o.name,
						email: o.email,
						objective: o.objective,
						activityLevel: o.activityLevel,
						dailyCalorieGoal: o.dailyCalorieGoal,
						targetWeightKg: o.targetWeightKg,
						currentWeightKg: o.currentWeightKg,
						ageYears: o.ageYears,
						heightCm: o.heightCm,
					});
				}
			})
			.finally(() => setProfileLoading(false));
	}, [patientId]);

	useEffect(() => {
		if (!patientId) return;
		const token = localStorage.getItem("accessToken") ?? "";
		setSummaryLoading(true);
		getPatientDailySummaryByNutritionist(patientId, formatDate(selectedDate), token)
			.then((res) => {
				if (res.success && res.output) {
					const o = res.output;
					setSummary({
						caloriesConsumed: o.caloriesConsumed,
						caloriesGoal: o.caloriesGoal,
						carbsG: o.carbsG,
						proteinG: o.proteinG,
						fatG: o.fatG,
						carbsGoalG: o.carbsGoalG,
						proteinGoalG: o.proteinGoalG,
						fatGoalG: o.fatGoalG,
						meals: o.meals,
					});
				}
			})
			.finally(() => setSummaryLoading(false));
	}, [patientId, selectedDate]);

	const shiftDate = (days: number) => {
		setSelectedDate((d) => {
			const next = new Date(d);
			next.setDate(next.getDate() + days);
			return next;
		});
	};

	const isToday = formatDate(selectedDate) === formatDate(new Date());

	return (
		<Box sx={{ pb: { xs: 2, md: 0 } }}>
			{/* Back button */}
			<Box
				sx={{
					display: "flex",
					alignItems: "center",
					gap: 1,
					mb: 2,
					cursor: "pointer",
					width: "fit-content",
				}}
				onClick={() => navigate("/nutritionist/patients")}
			>
				<ArrowBackIcon sx={{ fontSize: "1.1rem", color: theme.palette.typography.secondaryText }} />
				<Typography sx={{ fontSize: "0.82rem", color: theme.palette.typography.secondaryText }}>
					Voltar
				</Typography>
			</Box>

			<Box
				sx={{
					display: "grid",
					gridTemplateColumns: { xs: "1fr", lg: "340px 1fr" },
					gap: 2,
					alignItems: "start",
				}}
			>
				{/* Profile card */}
				<SectionCard title="Perfil do paciente">
					{profileLoading ? (
						[0, 1, 2, 3, 4].map((i) => (
							<Skeleton
								key={i}
								variant="rounded"
								height={28}
								sx={{ mb: 1, bgcolor: theme.palette.neutral.altTempBackground }}
							/>
						))
					) : profile ? (
						<>
							<Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 2.5 }}>
								<Box
									sx={{
										width: 52,
										height: 52,
										borderRadius: "50%",
										bgcolor: alpha(theme.palette.brand.main, 0.12),
										display: "flex",
										alignItems: "center",
										justifyContent: "center",
										fontSize: "1.3rem",
										fontWeight: 700,
										color: theme.palette.brand.main,
									}}
								>
									{profile.name.slice(0, 1).toUpperCase()}
								</Box>
								<Box>
									<Typography
										sx={{
											fontSize: "1rem",
											fontWeight: 700,
											color: theme.palette.typography.mainText,
										}}
									>
										{profile.name}
									</Typography>
									<Typography
										sx={{ fontSize: "0.75rem", color: theme.palette.typography.secondaryCardText }}
									>
										{profile.email}
									</Typography>
								</Box>
							</Box>

							<Divider sx={{ mb: 2 }} />

							<ProfileRow
								label="Objetivo"
								value={
									profile.objective
										? (OBJECTIVE_LABELS[profile.objective] ?? profile.objective)
										: "—"
								}
							/>
							<ProfileRow
								label="Nível de atividade"
								value={
									profile.activityLevel
										? (ACTIVITY_LABELS[profile.activityLevel] ?? profile.activityLevel)
										: "—"
								}
							/>
							<ProfileRow
								label="Meta calórica diária"
								value={profile.dailyCalorieGoal ? `${profile.dailyCalorieGoal} kcal` : "—"}
							/>
							<ProfileRow
								label="Peso atual"
								value={profile.currentWeightKg ? `${profile.currentWeightKg} kg` : "—"}
							/>
							<ProfileRow
								label="Peso alvo"
								value={profile.targetWeightKg ? `${profile.targetWeightKg} kg` : "—"}
							/>
							<ProfileRow
								label="Altura"
								value={profile.heightCm ? `${profile.heightCm} cm` : "—"}
							/>
							<ProfileRow
								label="Idade"
								value={profile.ageYears ? `${profile.ageYears} anos` : "—"}
							/>
						</>
					) : (
						<Typography
							sx={{
								fontSize: "0.82rem",
								color: theme.palette.typography.secondaryCardText,
								py: 2,
								textAlign: "center",
							}}
						>
							Dados não disponíveis.
						</Typography>
					)}
				</SectionCard>

				{/* Daily diet */}
				<Box>
					{/* Date picker */}
					<Box
						sx={{
							display: "flex",
							alignItems: "center",
							justifyContent: "space-between",
							mb: 2,
							bgcolor: theme.palette.neutral.card,
							border: `1px solid ${theme.palette.divider}`,
							borderRadius: "16px",
							p: "12px 16px",
						}}
					>
						<IconButton size="small" onClick={() => shiftDate(-1)}>
							<ChevronLeftIcon />
						</IconButton>
						<Typography
							sx={{
								fontSize: "0.88rem",
								fontWeight: 600,
								color: theme.palette.typography.mainText,
							}}
						>
							{isToday
								? "Hoje"
								: selectedDate.toLocaleDateString("pt-BR", {
										weekday: "long",
										day: "2-digit",
										month: "long",
									})}
						</Typography>
						<IconButton size="small" onClick={() => shiftDate(1)} disabled={isToday}>
							<ChevronRightIcon />
						</IconButton>
					</Box>

					{summaryLoading ? (
						<Box sx={{ display: "flex", justifyContent: "center", py: 6 }}>
							<CircularProgress size={32} />
						</Box>
					) : summary ? (
						<>
							{/* Calories overview */}
							<SectionCard title="Resumo calórico" sx={{ mb: 2 }}>
								<Box
									sx={{
										display: "grid",
										gridTemplateColumns: "repeat(2, 1fr)",
										gap: { xs: 1, md: 1.5 },
										mb: 2,
									}}
								>
									<MacroBox
										label="Consumido"
										value={`${Math.round(summary.caloriesConsumed)} kcal`}
										color={theme.palette.brand.main}
									/>
									<MacroBox
										label="Meta"
										value={`${summary.caloriesGoal} kcal`}
										color={theme.palette.typography.secondaryText}
									/>
								</Box>
								<Box
									sx={{
										display: "grid",
										gridTemplateColumns: "repeat(3, 1fr)",
										gap: { xs: 0.75, md: 1 },
									}}
								>
									<MacroBox
										label="Carboidratos"
										value={`${Math.round(summary.carbsG)}g`}
										goal={`/${Math.round(summary.carbsGoalG)}g`}
										color="#f59e0b"
									/>
									<MacroBox
										label="Proteínas"
										value={`${Math.round(summary.proteinG)}g`}
										goal={`/${Math.round(summary.proteinGoalG)}g`}
										color="#10b981"
									/>
									<MacroBox
										label="Gorduras"
										value={`${Math.round(summary.fatG)}g`}
										goal={`/${Math.round(summary.fatGoalG)}g`}
										color="#ef4444"
									/>
								</Box>
							</SectionCard>

							{/* Meals */}
							<SectionCard title="Refeições do dia">
								{summary.meals.length === 0 ? (
									<Typography
										sx={{
											fontSize: "0.82rem",
											color: theme.palette.typography.secondaryCardText,
											py: 2,
											textAlign: "center",
										}}
									>
										Nenhuma refeição registrada.
									</Typography>
								) : (
									summary.meals.map((meal) => (
										<Box
											key={meal.id}
											sx={{
												display: "flex",
												alignItems: "center",
												justifyContent: "space-between",
												p: 1.5,
												borderRadius: "12px",
												mb: 1,
												bgcolor: theme.palette.neutral.background,
											}}
										>
											<Box>
												<Typography
													sx={{
														fontSize: "0.85rem",
														fontWeight: 600,
														color: theme.palette.typography.mainText,
													}}
												>
													{MEAL_LABELS[meal.mealType] ?? meal.mealType}
												</Typography>
												<Typography
													sx={{
														fontSize: "0.72rem",
														color: theme.palette.typography.secondaryCardText,
													}}
												>
													C: {Math.round(meal.carbsG)}g · P: {Math.round(meal.proteinG)}g · G:{" "}
													{Math.round(meal.fatG)}g
												</Typography>
											</Box>
											<Typography
												sx={{
													fontSize: "0.88rem",
													fontWeight: 700,
													color: theme.palette.brand.main,
												}}
											>
												{Math.round(meal.caloriesConsumed)} kcal
											</Typography>
										</Box>
									))
								)}
							</SectionCard>
						</>
					) : (
						<Typography
							sx={{
								fontSize: "0.82rem",
								color: theme.palette.typography.secondaryCardText,
								py: 4,
								textAlign: "center",
							}}
						>
							Sem dados para este dia.
						</Typography>
					)}
				</Box>
			</Box>
		</Box>
	);
}

function ProfileRow({ label, value }: { label: string; value: string }) {
	const theme = useTheme();
	return (
		<Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 1.25 }}>
			<Typography sx={{ fontSize: "0.78rem", color: theme.palette.typography.secondaryCardText }}>
				{label}
			</Typography>
			<Typography
				sx={{ fontSize: "0.82rem", fontWeight: 600, color: theme.palette.typography.mainText }}
			>
				{value}
			</Typography>
		</Box>
	);
}

function MacroBox({
	label,
	value,
	goal,
	color,
}: {
	label: string;
	value: string;
	goal?: string;
	color: string;
}) {
	const theme = useTheme();
	return (
		<Box sx={{ bgcolor: alpha(color, 0.08), borderRadius: "12px", p: 1.25, textAlign: "center" }}>
			<Typography
				sx={{ fontSize: "0.68rem", color: theme.palette.typography.secondaryCardText, mb: 0.25 }}
			>
				{label}
			</Typography>
			<Typography sx={{ fontSize: "0.95rem", fontWeight: 700, color }}>
				{value}
				{goal && (
					<Box
						component="span"
						sx={{
							fontSize: "0.7rem",
							fontWeight: 400,
							color: theme.palette.typography.secondaryCardText,
						}}
					>
						{goal}
					</Box>
				)}
			</Typography>
		</Box>
	);
}
