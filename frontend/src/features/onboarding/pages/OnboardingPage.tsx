import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";
import { alpha, useTheme } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import { isAxiosError } from "axios";
import { useSnackbar } from "notistack";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import logoSm from "../../../assets/logo-sm.png";
import ThemeToggle from "../../../components/ThemeToggle";
import { saveOnboarding } from "../../../lib/api/patient.service";
import { EMPTY_ONBOARDING, type OnboardingData } from "../../../types/onboarding";
import StepActivity from "../steps/StepActivity";
import StepGenderAge from "../steps/StepGenderAge";
import StepGoal from "../steps/StepGoal";
import StepHeightWeight from "../steps/StepHeightWeight";
import StepTargetWeight from "../steps/StepTargetWeight";

const STEPS = [
	{ id: "gender-age", label: "Sobre você", Component: StepGenderAge },
	{ id: "height-weight", label: "Medidas", Component: StepHeightWeight },
	{ id: "goal", label: "Objetivo", Component: StepGoal },
	{ id: "target-weight", label: "Meta de peso", Component: StepTargetWeight },
	{ id: "activity", label: "Atividade", Component: StepActivity },
] as const;

export default function OnboardingPage() {
	const theme = useTheme();
	const navigate = useNavigate();
	const { enqueueSnackbar } = useSnackbar();
	const [step, setStep] = useState(0);
	const [data, setData] = useState<OnboardingData>(EMPTY_ONBOARDING);
	const [loading, setLoading] = useState(false);

	const isFirst = step === 0;
	const isLast = step === STEPS.length - 1;
	const Current = STEPS[step].Component;

	const handleBack = () => {
		if (isFirst) {
			navigate("/login");
		} else {
			setStep((s) => s - 1);
		}
	};

	const handleNext = async () => {
		if (!isLast) {
			setStep((s) => s + 1);
			return;
		}

		const accessToken = localStorage.getItem("accessToken") ?? "";

		if (
			!data.gender ||
			data.ageYears === null ||
			data.heightCm === null ||
			data.currentWeightKg === null ||
			!data.goal ||
			data.goalWeightKg === null ||
			!data.activityLevel
		) {
			enqueueSnackbar("Preencha todos os campos antes de continuar.", { variant: "error" });
			return;
		}

		setLoading(true);
		try {
			await saveOnboarding(
				{
					sex: data.gender,
					ageYears: data.ageYears,
					heightCm: data.heightCm,
					currentWeightKg: data.currentWeightKg,
					objective: data.goal,
					targetWeightKg: data.goalWeightKg,
					activityLevel: data.activityLevel,
				},
				accessToken,
			);
			const pendingRedirect = sessionStorage.getItem("postOnboardingRedirect");
			if (pendingRedirect) {
				sessionStorage.removeItem("postOnboardingRedirect");
				navigate(pendingRedirect);
			} else {
				navigate("/diet");
			}
		} catch (error) {
			if (isAxiosError(error) && error.response?.data?.message) {
				enqueueSnackbar(error.response.data.message, { variant: "error" });
			} else {
				enqueueSnackbar("Não foi possível salvar seu perfil. Tente novamente.", {
					variant: "error",
				});
			}
		} finally {
			setLoading(false);
		}
	};

	const canAdvance = isStepValid(step, data);

	return (
		<Box
			sx={{
				minHeight: "100vh",
				bgcolor: theme.palette.neutral.background,
				display: "flex",
				flexDirection: "column",
				position: "relative",
				overflow: "hidden",
			}}
		>
			<Box
				sx={{
					position: "absolute",
					top: 0,
					left: 0,
					right: 0,
					height: 320,
					background: `linear-gradient(to bottom, ${alpha(theme.palette.brand.main, 0.05)} 0%, transparent 100%)`,
					pointerEvents: "none",
				}}
			/>

			{/* Header */}
			<Box
				sx={{
					width: "100%",
					position: "relative",
					zIndex: 10,
					display: "flex",
					alignItems: "center",
					px: { xs: 3, md: 5 },
					pt: 3.5,
					pb: 2,
				}}
			>
				<Box
					onClick={handleBack}
					sx={{
						flex: 1,
						display: "flex",
						alignItems: "center",
						gap: 0.75,
						cursor: "pointer",
						color: theme.palette.typography.secondaryText,
						"&:hover": { color: theme.palette.brand.main },
					}}
				>
					<ArrowBackIcon sx={{ fontSize: "1rem" }} />
					<Typography
						sx={{
							fontFamily: '"DM Sans", sans-serif',
							fontSize: "0.85rem",
							fontWeight: 500,
							display: { xs: "none", sm: "block" },
						}}
					>
						Voltar
					</Typography>
				</Box>
				<Box
					component="img"
					src={logoSm}
					alt="nutrihub"
					sx={{ height: 28, objectFit: "contain" }}
				/>
				<Box sx={{ flex: 1, display: "flex", justifyContent: "flex-end" }}>
					<ThemeToggle size="small" />
				</Box>
			</Box>

			{/* Card */}
			<Box
				sx={{
					position: "relative",
					zIndex: 1,
					flex: 1,
					display: "flex",
					alignItems: "center",
					justifyContent: "center",
					width: "100%",
					px: 2,
					py: 4,
				}}
			>
				<Box
					sx={{
						bgcolor: theme.palette.neutral.card,
						borderRadius: "20px",
						p: { xs: 3.5, sm: 5 },
						width: "100%",
						maxWidth: 480,
						boxShadow: `0 4px 6px ${alpha(theme.palette.brand.main, 0.04)}, 0 16px 40px ${alpha("#000", 0.07)}`,
						border: `1px solid ${alpha(theme.palette.brand.main, 0.08)}`,
					}}
				>
					<ProgressBar current={step + 1} total={STEPS.length} />

					<Typography
						sx={{
							fontFamily: '"DM Sans", sans-serif',
							fontWeight: 800,
							fontSize: "1.5rem",
							color: theme.palette.typography.mainText,
							mb: 0.5,
						}}
					>
						{STEPS[step].label}
					</Typography>
					<Typography
						sx={{
							fontFamily: '"DM Sans", sans-serif',
							fontSize: "0.88rem",
							color: theme.palette.typography.secondaryText,
							mb: 4,
						}}
					>
						Passo {step + 1} de {STEPS.length}
					</Typography>

					<Current data={data} setData={setData} />

					<Box sx={{ display: "flex", gap: 1.5, mt: 4 }}>
						<Button
							onClick={handleBack}
							sx={{
								flex: 1,
								bgcolor: "transparent",
								color: theme.palette.typography.mainText,
								border: `1.5px solid ${alpha(theme.palette.typography.mainText, 0.12)}`,
								borderRadius: "12px",
								py: 1.4,
								fontSize: "0.9rem",
								fontWeight: 500,
								textTransform: "none",
								"&:hover": {
									bgcolor: alpha(theme.palette.brand.main, 0.04),
									borderColor: alpha(theme.palette.brand.main, 0.3),
									color: theme.palette.brand.main,
								},
							}}
						>
							{isFirst ? "Cancelar" : "Voltar"}
						</Button>
						<Button
							onClick={handleNext}
							disabled={!canAdvance || loading}
							sx={{
								flex: 2,
								bgcolor: theme.palette.brand.main,
								color: "#fff",
								borderRadius: "12px",
								py: 1.5,
								fontSize: "0.92rem",
								fontWeight: 600,
								textTransform: "none",
								"&:hover": { bgcolor: theme.palette.brand.hoverItem },
								"&.Mui-disabled": {
									bgcolor: alpha(theme.palette.brand.main, 0.4),
									color: alpha("#fff", 0.8),
								},
							}}
						>
							{loading ? (
								<CircularProgress size={22} sx={{ color: "#fff" }} />
							) : isLast ? (
								"Concluir →"
							) : (
								"Continuar →"
							)}
						</Button>
					</Box>
				</Box>
			</Box>
		</Box>
	);
}

function ProgressBar({ current, total }: { current: number; total: number }) {
	const theme = useTheme();
	const progress = (current / total) * 100;
	return (
		<Box
			sx={{
				height: 6,
				borderRadius: "99px",
				bgcolor: theme.palette.neutral.altTempBackground,
				overflow: "hidden",
				mb: 3,
			}}
		>
			<Box
				sx={{
					height: "100%",
					width: `${progress}%`,
					bgcolor: theme.palette.brand.main,
					borderRadius: "99px",
					transition: "width 0.3s ease",
				}}
			/>
		</Box>
	);
}

function isStepValid(step: number, data: OnboardingData): boolean {
	switch (step) {
		case 0:
			return data.gender !== null && data.ageYears !== null && data.ageYears > 0;
		case 1:
			return (
				data.heightCm !== null &&
				data.heightCm > 0 &&
				data.currentWeightKg !== null &&
				data.currentWeightKg > 0
			);
		case 2:
			return data.goal !== null;
		case 3:
			return data.goalWeightKg !== null && data.goalWeightKg > 0;
		case 4:
			return data.activityLevel !== null;
		default:
			return false;
	}
}
