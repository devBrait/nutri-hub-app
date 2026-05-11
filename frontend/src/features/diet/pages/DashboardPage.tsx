import AddIcon from "@mui/icons-material/Add";
import ScaleIcon from "@mui/icons-material/MonitorWeightOutlined";
import RestaurantIcon from "@mui/icons-material/RestaurantOutlined";
import SearchIcon from "@mui/icons-material/Search";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Skeleton from "@mui/material/Skeleton";
import { alpha, useTheme } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import SectionCard from "../../../components/SectionCard";
import { useDailyDiet } from "../../../hooks/useDailyDiet";
import { useProfile } from "../../../hooks/useProfile";
import { useTopbar } from "../../../hooks/useTopbar";
import { todayIso } from "../../../utils/format";
import WeightLogModal from "../../profile/components/WeightLogModal";
import AddWaterModal from "../components/AddWaterModal";
import DateNav from "../components/DateNav";
import MacroBar from "../components/MacroBar";
import MealRow from "../components/MealRow";
import StatCard from "../components/StatCard";

export default function DashboardPage() {
	const theme = useTheme();
	const navigate = useNavigate();
	const [date, setDate] = useState(todayIso);
	const [weightModalOpen, setWeightModalOpen] = useState(false);
	const [waterModalOpen, setWaterModalOpen] = useState(false);
	const { diet } = useDailyDiet(date);
	const { profile } = useProfile();

	useTopbar(
		"Dieta",
		useMemo(() => <DateNav value={date} onChange={setDate} maxDate={todayIso()} />, [date]),
	);

	if (!diet) return <DashboardSkeleton />;

	const waterRemaining = Math.max(0, diet.waterGoalMl - diet.waterMl);
	const caloriesRemaining = Math.max(0, diet.caloriesGoal - diet.caloriesConsumed);
	const overallProgress =
		diet.caloriesGoal > 0 ? Math.round((diet.caloriesConsumed / diet.caloriesGoal) * 100) : 0;

	return (
		<Box>
			{/* Header */}
			<Box sx={{ mb: { xs: 2, md: 3 } }}>
				<Typography
					sx={{
						fontSize: { xs: "1.2rem", md: "1.4rem" },
						fontWeight: 700,
						color: theme.palette.typography.mainText,
						mb: 0.5,
					}}
				>
					Olá, {profile?.fullName.split(" ")[0] ?? "—"} 👋
				</Typography>
				<Typography
					sx={{
						fontSize: "0.82rem",
						color: theme.palette.typography.secondaryText,
					}}
				>
					Acompanhe sua ingestão de hoje.
				</Typography>
			</Box>

			{/* Stats top row */}
			<Box
				sx={{
					display: "grid",
					gridTemplateColumns: {
						xs: "minmax(0, 1fr) minmax(0, 1fr)",
						md: "repeat(3, minmax(0, 1fr))",
					},
					gap: { xs: 1.25, md: 2 },
					mb: 2,
				}}
			>
				<StatCard
					label="Água"
					value={waterRemaining}
					unit="ml restando"
					subtitle={`Meta: ${diet.waterGoalMl} ml`}
					progress={(diet.waterMl / diet.waterGoalMl) * 100}
					action={
						<IconButton
							size="small"
							onClick={() => setWaterModalOpen(true)}
							sx={{
								color: theme.palette.brand.main,
								bgcolor: alpha(theme.palette.brand.main, 0.1),
								"&:hover": { bgcolor: alpha(theme.palette.brand.main, 0.2) },
							}}
						>
							<AddIcon fontSize="small" />
						</IconButton>
					}
				/>
				<StatCard
					label="Calorias"
					value={caloriesRemaining}
					unit="Cal restando"
					subtitle={`Meta: ${diet.caloriesGoal} Cal`}
					progress={(diet.caloriesConsumed / diet.caloriesGoal) * 100}
				/>
				<Box sx={{ gridColumn: { xs: "span 2", md: "auto" } }}>
					<StatCard
						label={
							date === todayIso()
								? "Progresso hoje"
								: `Progresso - ${date.slice(8, 10)}/${date.slice(5, 7)}`
						}
						value={`${overallProgress}%`}
						subtitle="da meta diária atingida"
						progress={overallProgress}
						highlight
					/>
				</Box>
			</Box>

			{/* Macros + Quick actions */}
			<Box
				sx={{
					display: "grid",
					gridTemplateColumns: { xs: "1fr", md: "2fr 1fr" },
					gap: 2,
					mb: 2,
				}}
			>
				<SectionCard
					title="Macronutrientes"
					action={
						<Box
							sx={{
								px: 1.25,
								py: 0.4,
								borderRadius: "99px",
								bgcolor: theme.palette.neutral.altTempBackground,
								color: theme.palette.brand.main,
								fontSize: "0.66rem",
								fontWeight: 600,
							}}
						>
							Hoje
						</Box>
					}
				>
					<Box
						sx={{
							display: "grid",
							gridTemplateColumns: "repeat(3, 1fr)",
							gap: 2,
						}}
					>
						<MacroBar label="Carboidrato" value={diet.macros.carbs} goal={diet.macrosGoal.carbs} />
						<MacroBar label="Proteína" value={diet.macros.protein} goal={diet.macrosGoal.protein} />
						<MacroBar label="Gordura" value={diet.macros.fat} goal={diet.macrosGoal.fat} />
					</Box>
				</SectionCard>

				<SectionCard
					title="Ações rápidas"
					highlight
					titleColor={alpha("#fff", 0.6)}
					sx={{ display: { xs: "none", md: "block" } }}
				>
					<QuickActionButton
						icon={<RestaurantIcon sx={{ fontSize: "1.1rem" }} />}
						onClick={() => navigate("/meal")}
					>
						Editar refeição
					</QuickActionButton>
					<QuickActionButton
						icon={<SearchIcon sx={{ fontSize: "1.1rem" }} />}
						onClick={() => navigate("/food-search")}
					>
						Buscar alimento
					</QuickActionButton>
					<QuickActionButton
						icon={<ScaleIcon sx={{ fontSize: "1.1rem" }} />}
						onClick={() => setWeightModalOpen(true)}
					>
						Registrar peso
					</QuickActionButton>
				</SectionCard>
			</Box>

			{/* Meals list */}
			<SectionCard
				title="Refeições de hoje"
				action={
					<Typography
						onClick={() => navigate("/meal")}
						sx={{
							fontSize: "0.74rem",
							fontWeight: 600,
							color: theme.palette.brand.main,
							cursor: "pointer",
						}}
					>
						Ver todas →
					</Typography>
				}
			>
				{diet.meals.map((meal, idx) => (
					<MealRow
						key={meal.id}
						meal={meal}
						isLast={idx === diet.meals.length - 1}
						onEdit={() => navigate("/meal")}
					/>
				))}
			</SectionCard>

			<WeightLogModal open={weightModalOpen} onClose={() => setWeightModalOpen(false)} />
			<AddWaterModal open={waterModalOpen} onClose={() => setWaterModalOpen(false)} date={date} />
		</Box>
	);
}

function DashboardSkeleton() {
	const theme = useTheme();

	return (
		<Box>
			{/* Header */}
			<Box sx={{ mb: { xs: 2, md: 3 } }}>
				<Skeleton variant="text" width={200} height={34} sx={{ borderRadius: "8px" }} />
				<Skeleton variant="text" width={160} height={20} sx={{ borderRadius: "8px" }} />
			</Box>

			{/* Stats */}
			<Box
				sx={{
					display: "grid",
					gridTemplateColumns: { xs: "1fr 1fr", md: "repeat(3, 1fr)" },
					gap: { xs: 1.25, md: 2 },
					mb: 2,
				}}
			>
				{[0, 1].map((i) => (
					<Skeleton
						key={i}
						variant="rounded"
						height={120}
						sx={{
							borderRadius: "16px",
							bgcolor: theme.palette.neutral.altTempBackground,
						}}
					/>
				))}
				<Box sx={{ gridColumn: { xs: "span 2", md: "auto" } }}>
					<Skeleton
						variant="rounded"
						height={120}
						sx={{
							borderRadius: "16px",
							bgcolor: theme.palette.neutral.altTempBackground,
						}}
					/>
				</Box>
			</Box>

			{/* Macros + Actions */}
			<Box
				sx={{
					display: "grid",
					gridTemplateColumns: { xs: "1fr", md: "2fr 1fr" },
					gap: 2,
					mb: 2,
				}}
			>
				<Skeleton
					variant="rounded"
					height={160}
					sx={{
						borderRadius: "16px",
						bgcolor: theme.palette.neutral.altTempBackground,
					}}
				/>
				<Skeleton
					variant="rounded"
					height={160}
					sx={{
						borderRadius: "16px",
						bgcolor: theme.palette.neutral.altTempBackground,
						display: { xs: "none", md: "block" },
					}}
				/>
			</Box>

			{/* Meals */}
			<Skeleton
				variant="rounded"
				width={120}
				height={22}
				sx={{
					borderRadius: "8px",
					mb: 1.5,
					bgcolor: theme.palette.neutral.altTempBackground,
				}}
			/>
			<Box
				sx={{
					bgcolor: theme.palette.neutral.card,
					borderRadius: "16px",
					border: `1px solid ${theme.palette.divider}`,
					p: { xs: 2.25, md: 2.75 },
				}}
			>
				{[0, 1, 2, 3].map((i) => (
					<Box
						key={i}
						sx={{
							display: "flex",
							alignItems: "center",
							gap: 1.5,
							py: 1.5,
							borderBottom: i < 3 ? `1px solid ${theme.palette.divider}` : "none",
						}}
					>
						<Skeleton variant="circular" width={40} height={40} sx={{ flexShrink: 0 }} />
						<Box sx={{ flex: 1 }}>
							<Skeleton variant="text" width="40%" height={18} sx={{ borderRadius: "6px" }} />
							<Skeleton variant="text" width="60%" height={14} sx={{ borderRadius: "6px" }} />
							<Skeleton variant="rounded" height={4} sx={{ borderRadius: "99px", mt: 0.75 }} />
						</Box>
						<Skeleton variant="text" width={40} height={18} sx={{ borderRadius: "6px" }} />
					</Box>
				))}
			</Box>
		</Box>
	);
}

function QuickActionButton({
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
			startIcon={icon}
			sx={{
				justifyContent: "flex-start",
				gap: 1,
				bgcolor: alpha("#fff", 0.15),
				color: "#fff",
				borderRadius: "12px",
				py: 1.4,
				px: 2,
				mb: 1,
				fontSize: "0.82rem",
				fontWeight: 600,
				textTransform: "none",
				fontFamily: '"DM Sans", sans-serif',
				"&:hover": { bgcolor: alpha("#fff", 0.25) },
				"&:last-child": { mb: 0 },
			}}
		>
			{children}
		</Button>
	);
}
