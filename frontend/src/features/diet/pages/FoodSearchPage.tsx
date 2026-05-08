import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import CloseIcon from "@mui/icons-material/Close";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import SearchIcon from "@mui/icons-material/Search";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import IconButton from "@mui/material/IconButton";
import OutlinedInput from "@mui/material/OutlinedInput";
import { alpha, useTheme } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import { isAxiosError } from "axios";
import { useSnackbar } from "notistack";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import SectionCard from "../../../components/SectionCard";
import { useFoodSearch } from "../../../hooks/useFoodSearch";
import { useTopbar } from "../../../hooks/useTopbar";
import { addMealItem } from "../../../lib/api/patient.service";
import type { Food } from "../../../types/diet";
import FoodItem from "../components/FoodItem";
import QuantityModal from "../components/QuantityModal";

export default function FoodSearchPage() {
	const theme = useTheme();
	const navigate = useNavigate();
	const { enqueueSnackbar } = useSnackbar();
	const { state } = useLocation();
	const mealId = (state as { mealId?: string } | null)?.mealId ?? null;

	const [query, setQuery] = useState("");
	const [page, setPage] = useState(1);
	const [selected, setSelected] = useState<Food | null>(null);
	const [addedToday, setAddedToday] = useState<{ food: Food; grams: number }[]>([]);
	const [submitting, setSubmitting] = useState(false);
	const { results, loading, totalPages, currentPage } = useFoodSearch(query, page);

	useTopbar("Buscar Alimento");

	const handleConfirm = async (grams: number) => {
		if (!selected) return;

		if (!mealId) {
			enqueueSnackbar("Selecione uma refeição para adicionar este alimento.", {
				variant: "warning",
			});
			setSelected(null);
			return;
		}

		const factor = grams / 100;
		const calories = Math.round(selected.caloriesPer100g * factor * 10) / 10;
		const carbsG = Math.round(selected.macrosPer100g.carbs * factor * 10) / 10;
		const proteinG = Math.round(selected.macrosPer100g.protein * factor * 10) / 10;
		const fatG = Math.round(selected.macrosPer100g.fat * factor * 10) / 10;

		const token = localStorage.getItem("accessToken") ?? "";
		setSubmitting(true);
		try {
			await addMealItem(
				mealId,
				{
					foodName: selected.name,
					quantityG: grams,
					calories,
					carbsG,
					proteinG,
					fatG,
				},
				token,
			);
			setAddedToday((prev) => [...prev, { food: selected, grams }]);
			enqueueSnackbar(`${selected.name} adicionado à refeição!`, {
				variant: "success",
			});
			setSelected(null);
			navigate(-1);
		} catch (error) {
			const msg = isAxiosError(error) ? (error.response?.data?.message ?? null) : null;
			enqueueSnackbar(msg ?? "Não foi possível adicionar o alimento.", {
				variant: "error",
			});
		} finally {
			setSubmitting(false);
		}
	};

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
					Adicionar alimento
				</Typography>
				<Typography
					sx={{
						fontSize: "0.82rem",
						color: theme.palette.typography.secondaryText,
					}}
				>
					Busque e adicione alimentos às suas refeições.
				</Typography>
			</Box>

			<Box
				sx={{
					display: "grid",
					gridTemplateColumns: { xs: "1fr", lg: "2fr 1fr" },
					gap: 2,
				}}
			>
				<SectionCard
					sx={{
						p: { xs: 0, md: 2.75 },
						bgcolor: { xs: "transparent", md: theme.palette.neutral.card },
						border: { xs: "none", md: `1px solid ${theme.palette.divider}` },
					}}
				>
					{/* Banner informativo quando não há refeição selecionada */}
					{!mealId && (
						<Box
							sx={{
								display: "flex",
								alignItems: "center",
								gap: 1,
								mb: 2,
								p: 1.5,
								borderRadius: "10px",
								bgcolor: alpha(theme.palette.brand.main, 0.08),
								border: `1px solid ${alpha(theme.palette.brand.main, 0.2)}`,
							}}
						>
							<InfoOutlinedIcon
								sx={{ fontSize: "1rem", color: theme.palette.brand.main, flexShrink: 0 }}
							/>
							<Typography sx={{ fontSize: "0.8rem", color: theme.palette.brand.main }}>
								Você está em modo de visualização. Para adicionar alimentos, navegue até uma
								refeição.
							</Typography>
						</Box>
					)}

					{/* Search bar */}
					<OutlinedInput
						fullWidth
						value={query}
						onChange={(e) => {
							setQuery(e.target.value);
							setPage(1);
						}}
						placeholder="Buscar alimento..."
						startAdornment={
							<SearchIcon
								sx={{
									fontSize: "1rem",
									color: theme.palette.typography.secondaryCardText,
									mr: 1,
								}}
							/>
						}
						endAdornment={
							query ? (
								<IconButton size="small" onClick={() => setQuery("")}>
									<CloseIcon sx={{ fontSize: "0.95rem" }} />
								</IconButton>
							) : null
						}
						sx={{
							bgcolor: theme.palette.neutral.background,
							borderRadius: "12px",
							mb: 2,
							"& fieldset": { border: `1.5px solid ${theme.palette.divider}` },
							"&.Mui-focused fieldset": {
								border: `1.5px solid ${theme.palette.brand.main} !important`,
							},
							"& input": {
								fontSize: "0.88rem",
								py: 1.25,
							},
						}}
					/>

					{/* Results */}
					{loading ? (
						<Box sx={{ display: "flex", justifyContent: "center", py: 3 }}>
							<CircularProgress size={24} />
						</Box>
					) : results.length === 0 ? (
						<Typography
							sx={{
								textAlign: "center",
								py: 3,
								color: theme.palette.typography.secondaryCardText,
								fontSize: "0.82rem",
							}}
						>
							{query.trim()
								? `Nenhum alimento encontrado para "${query}".`
								: "Nenhum alimento disponível."}
						</Typography>
					) : (
						<>
							{results.map((food) => (
								<FoodItem key={food.id} food={food} onClick={() => setSelected(food)} />
							))}

							{totalPages > 1 && (
								<Box
									sx={{
										display: "flex",
										alignItems: "center",
										justifyContent: "center",
										gap: 1,
										mt: 2,
										pt: 2,
										borderTop: `1px solid ${theme.palette.divider}`,
									}}
								>
									<IconButton
										size="small"
										disabled={currentPage <= 1}
										onClick={() => setPage((p) => p - 1)}
										sx={{
											bgcolor: alpha(theme.palette.brand.main, 0.08),
											"&:hover": {
												bgcolor: alpha(theme.palette.brand.main, 0.16),
											},
											"&.Mui-disabled": { opacity: 0.35 },
										}}
									>
										<ChevronLeftIcon sx={{ fontSize: "1.1rem" }} />
									</IconButton>

									<Typography
										sx={{
											fontSize: "0.78rem",
											color: theme.palette.typography.secondaryCardText,
											minWidth: 64,
											textAlign: "center",
										}}
									>
										{currentPage} / {totalPages}
									</Typography>

									<IconButton
										size="small"
										disabled={currentPage >= totalPages}
										onClick={() => setPage((p) => p + 1)}
										sx={{
											bgcolor: alpha(theme.palette.brand.main, 0.08),
											"&:hover": {
												bgcolor: alpha(theme.palette.brand.main, 0.16),
											},
											"&.Mui-disabled": { opacity: 0.35 },
										}}
									>
										<ChevronRightIcon sx={{ fontSize: "1.1rem" }} />
									</IconButton>
								</Box>
							)}
						</>
					)}
				</SectionCard>

				{/* Adicionado à refeição — só visível quando há mealId */}
				<SectionCard
					title="Adicionado à refeição"
					sx={{ alignSelf: "start", display: { xs: "none", lg: mealId ? "block" : "none" } }}
				>
					{addedToday.length === 0 ? (
						<Typography
							sx={{
								textAlign: "center",
								py: 3,
								color: theme.palette.typography.secondaryCardText,
								fontSize: "0.82rem",
							}}
						>
							Nenhum alimento adicionado ainda.
							<br />
							Use a busca para adicionar.
						</Typography>
					) : (
						addedToday.map((item) => (
							<Box
								key={item.food.id}
								sx={{
									display: "flex",
									alignItems: "center",
									gap: 1.5,
									p: 1.25,
									bgcolor: theme.palette.neutral.background,
									borderRadius: "10px",
									mb: 1,
								}}
							>
								<Typography sx={{ fontSize: "1.05rem" }}>{item.food.icon}</Typography>
								<Box sx={{ flex: 1 }}>
									<Typography
										sx={{
											fontSize: "0.82rem",
											fontWeight: 600,
											color: theme.palette.typography.mainText,
										}}
									>
										{item.food.name}
									</Typography>
									<Typography
										sx={{
											fontSize: "0.68rem",
											color: theme.palette.typography.secondaryCardText,
										}}
									>
										{item.grams}g
									</Typography>
								</Box>
							</Box>
						))
					)}
				</SectionCard>
			</Box>

			<QuantityModal
				food={selected}
				onClose={() => !submitting && setSelected(null)}
				onConfirm={handleConfirm}
				loading={submitting}
			/>
		</Box>
	);
}
