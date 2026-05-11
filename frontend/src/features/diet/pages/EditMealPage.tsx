import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";
import IconButton from "@mui/material/IconButton";
import { alpha, useTheme } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import { isAxiosError } from "axios";
import { useSnackbar } from "notistack";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import SectionCard from "../../../components/SectionCard";
import { useDailyDiet } from "../../../hooks/useDailyDiet";
import { useTopbar } from "../../../hooks/useTopbar";
import { deleteMealItem, getMealItems } from "../../../lib/api/patient.service";
import type { Meal, MealItem } from "../../../types/diet";
import { todayIso } from "../../../utils/format";

export default function EditMealPage() {
	const theme = useTheme();
	const navigate = useNavigate();
	const _location = useLocation();
	const { enqueueSnackbar } = useSnackbar();
	const { diet, refetch } = useDailyDiet(todayIso());
	const [activeMealId, setActiveMealId] = useState<string | null>(null);
	const [mealItems, setMealItems] = useState<MealItem[]>([]);
	const [itemsLoading, setItemsLoading] = useState(false);

	useTopbar("Editar Refeição");

	const activeMeal = diet ? (diet.meals.find((m) => m.id === activeMealId) ?? diet.meals[0]) : null;

	// Atualiza os totais do dia quando o usuário retorna do food-search
	useEffect(() => {
		refetch();
	}, [refetch]);

	useEffect(() => {
		if (!activeMeal) return;
		const token = localStorage.getItem("accessToken") ?? "";
		setItemsLoading(true);
		getMealItems(activeMeal.id, token)
			.then((res) => {
				if (res.success && res.output) setMealItems(res.output.items);
			})
			.catch(() => setMealItems([]))
			.finally(() => setItemsLoading(false));
	}, [activeMeal?.id, activeMeal]);

	const handleDeleteItem = async (item: MealItem) => {
		if (!activeMeal) return;
		const token = localStorage.getItem("accessToken") ?? "";
		try {
			await deleteMealItem(activeMeal.id, item.id, token);
			setMealItems((prev) => prev.filter((i) => i.id !== item.id));
			refetch();
		} catch (err) {
			const msg = isAxiosError(err) ? (err.response?.data?.message ?? null) : null;
			enqueueSnackbar(msg ?? "Não foi possível remover o alimento.", { variant: "error" });
		}
	};

	if (!diet || !activeMeal) return null;

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
					Editar Refeição
				</Typography>
				<Typography sx={{ fontSize: "0.82rem", color: theme.palette.typography.secondaryText }}>
					Gerencie os alimentos de cada refeição.
				</Typography>
			</Box>

			{/* Tabs */}
			<Box
				sx={{
					display: "flex",
					gap: { xs: 0.75, md: 0.5 },
					bgcolor: { xs: "transparent", md: theme.palette.neutral.background },
					borderRadius: "10px",
					p: { xs: 0, md: 0.5 },
					width: { xs: "auto", md: "fit-content" },
					mb: 2.5,
					overflowX: "auto",
					mx: { xs: -2, md: 0 },
					px: { xs: 2, md: 0.5 },
					"&::-webkit-scrollbar": { display: "none" },
					scrollbarWidth: "none",
				}}
			>
				{diet.meals.map((meal) => {
					const isActive = meal.id === activeMeal.id;
					return (
						<Box
							key={meal.id}
							onClick={() => setActiveMealId(meal.id)}
							sx={{
								px: { xs: 2, md: 2 },
								py: { xs: 0.9, md: 0.85 },
								borderRadius: { xs: "99px", md: "8px" },
								fontSize: "0.78rem",
								fontWeight: isActive ? 600 : 500,
								color: isActive
									? { xs: "#fff", md: theme.palette.typography.mainText }
									: theme.palette.typography.secondaryText,
								bgcolor: isActive
									? { xs: theme.palette.brand.main, md: theme.palette.neutral.card }
									: { xs: "transparent", md: "transparent" },
								border: {
									xs: `1.5px solid ${isActive ? theme.palette.brand.main : theme.palette.divider}`,
									md: "none",
								},
								cursor: "pointer",
								boxShadow: { xs: "none", md: isActive ? "0 1px 4px rgba(0,0,0,0.08)" : "none" },
								whiteSpace: "nowrap",
								flexShrink: 0,
							}}
						>
							{meal.icon} {meal.name}
						</Box>
					);
				})}
			</Box>

			{/* Layout principal */}
			<Box
				sx={{
					display: "grid",
					gridTemplateColumns: { xs: "1fr", lg: "2fr 1fr" },
					gap: 2,
				}}
			>
				<Box>
					<MealHeader
						meal={activeMeal}
						onAdd={() => navigate("/food-search", { state: { mealId: activeMeal.id } })}
					/>
					<SectionCard title="Alimentos adicionados">
						{itemsLoading ? (
							<Box sx={{ display: "flex", justifyContent: "center", py: 3 }}>
								<CircularProgress size={24} />
							</Box>
						) : mealItems.length === 0 ? (
							<Typography
								sx={{
									textAlign: "center",
									py: 3,
									color: theme.palette.typography.secondaryCardText,
									fontSize: "0.82rem",
								}}
							>
								Nenhum alimento nesta refeição. Use o botão acima para adicionar.
							</Typography>
						) : (
							mealItems.map((item, idx) => (
								<MealItemRow
									key={item.id}
									item={item}
									isLast={idx === mealItems.length - 1}
									onDelete={() => handleDeleteItem(item)}
								/>
							))
						)}
					</SectionCard>
				</Box>

				<SectionCard
					title="Resumo do dia"
					sx={{ alignSelf: "start", display: { xs: "none", lg: "block" } }}
				>
					<Box sx={{ display: "flex", flexDirection: "column", gap: 1.25 }}>
						{diet.meals.map((m) => (
							<Box
								key={m.id}
								sx={{
									display: "flex",
									alignItems: "center",
									justifyContent: "space-between",
									p: 1.25,
									px: 1.75,
									bgcolor: theme.palette.neutral.background,
									borderRadius: "10px",
								}}
							>
								<Typography
									sx={{
										fontSize: "0.82rem",
										fontWeight: 600,
										color: theme.palette.typography.mainText,
									}}
								>
									{m.icon} {m.name}
								</Typography>
								<Typography
									sx={{
										fontSize: "0.82rem",
										fontWeight: 700,
										color:
											m.consumedCalories > 0
												? theme.palette.brand.main
												: theme.palette.typography.secondaryCardText,
									}}
								>
									{m.consumedCalories > 0 ? `${m.consumedCalories} cal` : "—"}
								</Typography>
							</Box>
						))}
						<Box
							sx={{
								borderTop: `1px solid ${theme.palette.divider}`,
								pt: 1.5,
								display: "flex",
								alignItems: "center",
								justifyContent: "space-between",
							}}
						>
							<Typography
								sx={{
									fontSize: "0.82rem",
									fontWeight: 700,
									color: theme.palette.typography.mainText,
								}}
							>
								Total
							</Typography>
							<Typography
								sx={{
									fontSize: "1rem",
									fontWeight: 700,
									color: theme.palette.brand.main,
								}}
							>
								{diet.caloriesConsumed} / {diet.caloriesGoal} cal
							</Typography>
						</Box>
					</Box>
				</SectionCard>
			</Box>
		</Box>
	);
}

function MealHeader({ meal, onAdd }: { meal: Meal; onAdd: () => void }) {
	const theme = useTheme();
	const progress =
		meal.targetCalories > 0
			? Math.min(100, (meal.consumedCalories / meal.targetCalories) * 100)
			: 0;

	return (
		<Box
			sx={{
				bgcolor: theme.palette.brand.main,
				borderRadius: { xs: 0, md: "16px" },
				p: { xs: 2.5, md: 3 },
				mb: 2,
				mx: { xs: -2, md: 0 },
			}}
		>
			<Typography sx={{ fontSize: "1.05rem", fontWeight: 700, color: "#fff", mb: 1.5 }}>
				{meal.name}
			</Typography>
			<Box
				sx={{
					bgcolor: alpha("#fff", 0.15),
					borderRadius: "12px",
					p: 2,
				}}
			>
				<Box sx={{ display: "flex", alignItems: "baseline", gap: 0.75, mb: 1.5 }}>
					<Typography sx={{ fontSize: "2rem", fontWeight: 800, color: "#fff" }}>
						{meal.consumedCalories}
					</Typography>
					<Typography sx={{ fontSize: "0.82rem", color: alpha("#fff", 0.65) }}>
						/ {meal.targetCalories} cal
					</Typography>
				</Box>
				<Box
					sx={{
						display: "flex",
						justifyContent: "space-between",
						mb: 0.5,
					}}
				>
					<Typography sx={{ fontSize: "0.7rem", color: alpha("#fff", 0.8), fontWeight: 600 }}>
						Consumido
					</Typography>
					<Typography sx={{ fontSize: "0.7rem", color: alpha("#fff", 0.8), fontWeight: 600 }}>
						{Math.round(progress)}%
					</Typography>
				</Box>
				<Box
					sx={{
						height: 7,
						bgcolor: alpha("#fff", 0.2),
						borderRadius: "99px",
						overflow: "hidden",
						mb: 1.75,
					}}
				>
					<Box
						sx={{
							height: "100%",
							width: `${progress}%`,
							bgcolor: "#fff",
							borderRadius: "99px",
						}}
					/>
				</Box>
				<Box sx={{ display: "flex" }}>
					<MacroCol value={`${meal.macros.carbs}g`} label="Carb" />
					<MacroCol value={`${meal.macros.protein}g`} label="Prot" />
					<MacroCol value={`${meal.macros.fat}g`} label="Gord" />
				</Box>
			</Box>
			<Button
				onClick={onAdd}
				sx={{
					mt: 1.75,
					bgcolor: alpha("#fff", 0.18),
					border: `1.5px solid ${alpha("#fff", 0.3)}`,
					borderRadius: "99px",
					px: 2.5,
					py: 1,
					color: "#fff",
					fontSize: "0.82rem",
					fontWeight: 600,
					textTransform: "none",
					fontFamily: '"DM Sans", sans-serif',
					"&:hover": { bgcolor: alpha("#fff", 0.25) },
				}}
				startIcon={
					<Box
						sx={{
							width: 22,
							height: 22,
							borderRadius: "50%",
							bgcolor: "#fff",
							display: "flex",
							alignItems: "center",
							justifyContent: "center",
						}}
					>
						<AddIcon sx={{ fontSize: "0.9rem", color: theme.palette.brand.main }} />
					</Box>
				}
			>
				Adicionar alimento
			</Button>
		</Box>
	);
}

function MacroCol({ value, label }: { value: string; label: string }) {
	return (
		<Box sx={{ flex: 1, textAlign: "center" }}>
			<Typography sx={{ fontSize: "1rem", fontWeight: 700, color: "#fff" }}>{value}</Typography>
			<Typography sx={{ fontSize: "0.62rem", color: alpha("#fff", 0.6), mt: 0.25 }}>
				{label}
			</Typography>
		</Box>
	);
}

function MealItemRow({
	item,
	isLast,
	onDelete,
}: {
	item: MealItem;
	isLast: boolean;
	onDelete: () => void;
}) {
	const theme = useTheme();

	return (
		<Box
			sx={{
				display: "flex",
				alignItems: "center",
				gap: 1.75,
				py: 1.75,
				borderBottom: isLast ? "none" : `1px solid ${theme.palette.divider}`,
				pb: isLast ? 0 : 1.75,
			}}
		>
			<Box
				sx={{
					width: 38,
					height: 38,
					borderRadius: "10px",
					bgcolor: theme.palette.neutral.altTempBackground,
					display: "flex",
					alignItems: "center",
					justifyContent: "center",
					fontSize: "1rem",
					flexShrink: 0,
				}}
			>
				🍽️
			</Box>
			<Box sx={{ flex: 1 }}>
				<Typography
					sx={{
						fontSize: "0.88rem",
						fontWeight: 600,
						color: theme.palette.typography.mainText,
						mb: 0.25,
					}}
				>
					{item.foodName}
				</Typography>
				<Typography
					sx={{
						fontSize: "0.68rem",
						color: theme.palette.typography.secondaryCardText,
					}}
				>
					{Math.round(item.calories)} cal / {item.quantityG}g
				</Typography>
				<Box sx={{ display: "flex", gap: 1.25, mt: 0.4 }}>
					<MicroMacro label="Carb" value={`${Math.round(item.carbsG)}g`} />
					<MicroMacro label="Prot" value={`${Math.round(item.proteinG)}g`} />
					<MicroMacro label="Gord" value={`${Math.round(item.fatG)}g`} />
				</Box>
			</Box>
			<IconButton
				onClick={onDelete}
				sx={{
					width: 30,
					height: 30,
					bgcolor: theme.palette.error.main,
					color: "#fff",
					"&:hover": { bgcolor: theme.palette.error.dark },
				}}
			>
				<DeleteIcon sx={{ fontSize: "0.85rem" }} />
			</IconButton>
		</Box>
	);
}

function MicroMacro({ label, value }: { label: string; value: string }) {
	const theme = useTheme();
	return (
		<Typography
			sx={{
				fontSize: "0.66rem",
				color: theme.palette.typography.secondaryCardText,
			}}
		>
			<Box component="span" sx={{ color: theme.palette.typography.secondaryText, fontWeight: 500 }}>
				{label}:
			</Box>{" "}
			{value}
		</Typography>
	);
}
