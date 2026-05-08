import type { SvgIconComponent } from "@mui/icons-material";
import AppRegistrationIcon from "@mui/icons-material/AppRegistration";
import DinnerDiningIcon from "@mui/icons-material/DinnerDining";
import InsightsIcon from "@mui/icons-material/Insights";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import Box from "@mui/material/Box";
import { alpha, useTheme } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import { useInView } from "../../../../hooks/useInView";

interface Step {
	step: string;
	Icon: SvgIconComponent;
	title: string;
	desc: string;
}

const STEPS: Step[] = [
	{
		step: "01",
		Icon: AppRegistrationIcon,
		title: "Crie sua conta",
		desc: "Cadastre-se gratuitamente em menos de 1 minuto, sem cartão de crédito.",
	},
	{
		step: "02",
		Icon: ManageAccountsIcon,
		title: "Configure seu perfil",
		desc: "Informe seus dados, objetivos e restrições alimentares para personalizar sua experiência.",
	},
	{
		step: "03",
		Icon: DinnerDiningIcon,
		title: "Registre suas refeições",
		desc: "Adicione o que você come ao longo do dia com nossa busca inteligente de alimentos.",
	},
	{
		step: "04",
		Icon: InsightsIcon,
		title: "Evolua com dados",
		desc: "Acompanhe seu progresso em tempo real e receba orientações do seu nutricionista.",
	},
];

export default function HowItWorksSection() {
	const theme = useTheme();
	const { ref: headerRef, inView: headerInView } = useInView();
	const { ref: stepsRef, inView: stepsInView } = useInView(0.05);

	const fadeIn = (delay: string, inView: boolean) => ({
		opacity: inView ? 1 : 0,
		transform: inView ? "translateY(0)" : "translateY(28px)",
		transition: `opacity 0.65s ease ${delay}, transform 0.65s ease ${delay}`,
	});

	return (
		<Box
			id="como-funciona"
			sx={{
				bgcolor: theme.palette.neutral.background,
				px: { xs: 4, md: 10 },
				py: { xs: 7, md: 10 },
			}}
		>
			<Box ref={headerRef} sx={{ textAlign: "center", mb: 8, ...fadeIn("0s", headerInView) }}>
				<Box
					sx={{
						display: "inline-flex",
						alignItems: "center",
						bgcolor: alpha(theme.palette.brand.main, 0.08),
						border: `1px solid ${alpha(theme.palette.brand.main, 0.18)}`,
						borderRadius: "20px",
						px: 2,
						py: 0.6,
						mb: 2.5,
					}}
				>
					<Typography
						sx={{
							fontFamily: '"DM Sans", sans-serif',
							fontSize: "0.78rem",
							fontWeight: 600,
							color: theme.palette.brand.main,
							letterSpacing: "0.04em",
							textTransform: "uppercase",
						}}
					>
						Como funciona
					</Typography>
				</Box>
				<Typography
					sx={{
						fontFamily: '"DM Sans", sans-serif',
						fontWeight: 800,
						fontSize: { xs: "2.2rem", md: "2.8rem" },
						color: theme.palette.typography.mainText,
						lineHeight: 1.15,
						mb: 1.5,
					}}
				>
					Simples do início
					<br />
					<Box component="span" sx={{ color: theme.palette.brand.main, fontWeight: 300 }}>
						ao resultado.
					</Box>
				</Typography>
				<Typography
					sx={{
						fontFamily: '"DM Sans", sans-serif',
						fontSize: "0.95rem",
						color: theme.palette.typography.secondaryText,
						maxWidth: "400px",
						mx: "auto",
						lineHeight: 1.7,
					}}
				>
					Em quatro passos simples você começa a transformar sua alimentação.
				</Typography>
			</Box>

			<Box
				ref={stepsRef}
				sx={{
					display: "grid",
					gridTemplateColumns: { xs: "1fr", md: "1fr 1fr 1fr 1fr" },
					gap: { xs: 3, md: 2 },
					position: "relative",
				}}
			>
				{/* Linha conectora — apenas desktop */}
				<Box
					sx={{
						display: { xs: "none", md: "block" },
						position: "absolute",
						top: "44px",
						left: "calc(12.5% + 28px)",
						right: "calc(12.5% + 28px)",
						height: "2px",
						zIndex: 0,
						background: `repeating-linear-gradient(90deg, ${alpha(theme.palette.brand.main, 0.35)} 0px, ${alpha(theme.palette.brand.main, 0.35)} 8px, transparent 8px, transparent 18px)`,
					}}
				/>

				{STEPS.map(({ step, Icon, title, desc }, i) => (
					<Box
						key={step}
						sx={{
							...fadeIn(`${i * 0.12}s`, stepsInView),
							position: "relative",
							zIndex: 1,
							display: "flex",
							flexDirection: "column",
							alignItems: { xs: "flex-start", md: "center" },
							textAlign: { xs: "left", md: "center" },
							px: { xs: 0, md: 1 },
						}}
					>
						<Box
							sx={{
								width: 56,
								height: 56,
								borderRadius: "50%",
								bgcolor: theme.palette.neutral.card,
								border: `2px solid ${alpha(theme.palette.brand.main, 0.25)}`,
								display: "flex",
								alignItems: "center",
								justifyContent: "center",
								mb: 2.5,
								boxShadow: `0 4px 16px ${alpha(theme.palette.brand.main, 0.1)}`,
								position: "relative",
							}}
						>
							<Icon sx={{ color: theme.palette.brand.main, fontSize: "1.4rem" }} />
							<Box
								sx={{
									position: "absolute",
									top: -6,
									right: -6,
									width: 20,
									height: 20,
									borderRadius: "50%",
									bgcolor: theme.palette.brand.main,
									display: "flex",
									alignItems: "center",
									justifyContent: "center",
								}}
							>
								<Typography
									sx={{
										fontFamily: '"DM Sans", sans-serif',
										fontSize: "0.58rem",
										fontWeight: 700,
										color: "#FFFFFF",
										lineHeight: 1,
									}}
								>
									{step}
								</Typography>
							</Box>
						</Box>

						<Typography
							sx={{
								fontFamily: '"DM Sans", sans-serif',
								fontWeight: 700,
								fontSize: "1rem",
								color: theme.palette.typography.mainText,
								mb: 0.75,
							}}
						>
							{title}
						</Typography>
						<Typography
							sx={{
								fontFamily: '"DM Sans", sans-serif',
								fontSize: "0.86rem",
								color: theme.palette.typography.secondaryText,
								lineHeight: 1.65,
								maxWidth: { xs: "100%", md: "200px" },
							}}
						>
							{desc}
						</Typography>
					</Box>
				))}
			</Box>
		</Box>
	);
}
