import { keyframes } from "@emotion/react";
import RiceBowlIcon from "@mui/icons-material/RiceBowl";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { alpha, useTheme } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import { useNavigate } from "react-router-dom";
import { useScrollY } from "../../../../hooks/useScrollY";

const fadeUp = keyframes`
  from { opacity: 0; transform: translateY(22px); }
  to   { opacity: 1; transform: translateY(0);    }
`;

const pulse = keyframes`
  0%, 100% { transform: scale(1);   opacity: 1;   }
  50%       { transform: scale(1.5); opacity: 0.6; }
`;

const float = keyframes`
  0%, 100% { transform: translateY(0px);  }
  50%       { transform: translateY(-10px); }
`;

const appear = (delay: string) => ({
	opacity: 0,
	animation: `${fadeUp} 0.65s cubic-bezier(0.22,1,0.36,1) ${delay} forwards`,
});

function AppPreviewCard() {
	const theme = useTheme();

	const macros = [
		{ label: "Proteína", value: 68, max: 90, color: theme.palette.brand.main },
		{
			label: "Carboidratos",
			value: 140,
			max: 200,
			color: theme.palette.green.buttonBg,
		},
		{ label: "Gordura", value: 42, max: 60, color: theme.palette.green.text3 },
	];

	return (
		<Box
			sx={{
				bgcolor: theme.palette.neutral.card,
				borderRadius: "24px",
				p: 3,
				width: "268px",
				boxShadow: `0 24px 64px rgba(0,0,0,0.11), 0 4px 16px ${alpha(theme.palette.brand.main, 0.08)}`,
				animation: `${float} 5s ease-in-out infinite`,
			}}
		>
			<Box
				sx={{
					display: "flex",
					justifyContent: "space-between",
					alignItems: "center",
					mb: 2.5,
				}}
			>
				<Typography
					sx={{
						fontFamily: '"DM Sans", sans-serif',
						fontWeight: 600,
						fontSize: "0.88rem",
						color: theme.palette.typography.mainText,
					}}
				>
					Resumo de hoje
				</Typography>
				<Box
					sx={{
						bgcolor: theme.palette.neutral.altTempBackground,
						borderRadius: "8px",
						px: 1.5,
						py: 0.4,
					}}
				>
					<Typography
						sx={{
							fontFamily: '"DM Sans", sans-serif',
							fontSize: "0.72rem",
							color: theme.palette.brand.main,
							fontWeight: 600,
						}}
					>
						Seg, 12 Abr
					</Typography>
				</Box>
			</Box>

			<Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 3 }}>
				<Box sx={{ position: "relative", width: 72, height: 72, flexShrink: 0 }}>
					<svg width="72" height="72" viewBox="0 0 72 72">
						<circle
							cx="36"
							cy="36"
							r="28"
							fill="none"
							stroke={theme.palette.neutral.altTempBackground}
							strokeWidth="7"
						/>
						<circle
							cx="36"
							cy="36"
							r="28"
							fill="none"
							stroke={theme.palette.brand.main}
							strokeWidth="7"
							strokeLinecap="round"
							strokeDasharray="176"
							strokeDashoffset="50"
							transform="rotate(-90 36 36)"
						/>
					</svg>
					<Box
						sx={{
							position: "absolute",
							inset: 0,
							display: "flex",
							flexDirection: "column",
							alignItems: "center",
							justifyContent: "center",
						}}
					>
						<Typography
							sx={{
								fontFamily: '"DM Sans", sans-serif',
								fontSize: "0.95rem",
								fontWeight: 700,
								color: theme.palette.typography.mainText,
								lineHeight: 1,
							}}
						>
							1420
						</Typography>
						<Typography
							sx={{
								fontFamily: '"DM Sans", sans-serif',
								fontSize: "0.58rem",
								color: theme.palette.typography.secondaryCardText,
							}}
						>
							kcal
						</Typography>
					</Box>
				</Box>
				<Box>
					<Typography
						sx={{
							fontFamily: '"DM Sans", sans-serif',
							fontSize: "0.72rem",
							color: theme.palette.typography.secondaryCardText,
							mb: 0.25,
						}}
					>
						Meta diária
					</Typography>
					<Typography
						sx={{
							fontFamily: '"DM Sans", sans-serif',
							fontSize: "1.05rem",
							fontWeight: 700,
							color: theme.palette.typography.mainText,
						}}
					>
						1.800 kcal
					</Typography>
					<Typography
						sx={{
							fontFamily: '"DM Sans", sans-serif',
							fontSize: "0.7rem",
							color: theme.palette.brand.main,
							fontWeight: 600,
						}}
					>
						380 restantes
					</Typography>
				</Box>
			</Box>

			{macros.map((m) => (
				<Box key={m.label} sx={{ mb: 1.5 }}>
					<Box sx={{ display: "flex", justifyContent: "space-between", mb: 0.5 }}>
						<Typography
							sx={{
								fontFamily: '"DM Sans", sans-serif',
								fontSize: "0.71rem",
								color: theme.palette.typography.secondaryText,
								fontWeight: 500,
							}}
						>
							{m.label}
						</Typography>
						<Typography
							sx={{
								fontFamily: '"DM Sans", sans-serif',
								fontSize: "0.71rem",
								color: theme.palette.typography.mainText,
								fontWeight: 600,
							}}
						>
							{m.value}g
						</Typography>
					</Box>
					<Box
						sx={{
							bgcolor: theme.palette.neutral.altTempBackground,
							borderRadius: "4px",
							height: "6px",
							overflow: "hidden",
						}}
					>
						<Box
							sx={{
								bgcolor: m.color,
								borderRadius: "4px",
								height: "100%",
								width: `${(m.value / m.max) * 100}%`,
								transition: "width 0.8s ease",
							}}
						/>
					</Box>
				</Box>
			))}

			<Box
				sx={{
					mt: 2.5,
					pt: 2,
					borderTop: `1px solid ${theme.palette.neutral.altTempBackground}`,
					display: "flex",
					alignItems: "center",
					gap: 1.5,
				}}
			>
				<Box
					sx={{
						bgcolor: theme.palette.neutral.altTempBackground,
						borderRadius: "10px",
						width: 36,
						height: 36,
						display: "flex",
						alignItems: "center",
						justifyContent: "center",
					}}
				>
					<RiceBowlIcon sx={{ color: theme.palette.brand.main, fontSize: "1.1rem" }} />
				</Box>
				<Box sx={{ flex: 1 }}>
					<Typography
						sx={{
							fontFamily: '"DM Sans", sans-serif',
							fontSize: "0.76rem",
							fontWeight: 600,
							color: theme.palette.typography.mainText,
						}}
					>
						Almoço
					</Typography>
					<Typography
						sx={{
							fontFamily: '"DM Sans", sans-serif',
							fontSize: "0.68rem",
							color: theme.palette.typography.secondaryCardText,
						}}
					>
						Salada com frango grelhado
					</Typography>
				</Box>
				<Typography
					sx={{
						fontFamily: '"DM Sans", sans-serif',
						fontSize: "0.76rem",
						fontWeight: 600,
						color: theme.palette.brand.main,
					}}
				>
					480 kcal
				</Typography>
			</Box>
		</Box>
	);
}

export default function HeroSection() {
	const theme = useTheme();
	const scrollY = useScrollY();
	const navigate = useNavigate();

	return (
		<Box
			sx={{
				position: "relative",
				overflow: "hidden",
				bgcolor: theme.palette.neutral.background,
				borderRadius: { xs: "16px", md: "28px" },
				mx: { xs: 1, md: 2 },
				mt: { xs: 1, md: 1.5 },
				minHeight: { xs: "auto", md: "560px" },
				display: "flex",
				alignItems: "center",
				px: { xs: 3, md: 8 },
				py: { xs: 5, md: 7 },
			}}
		>
			{/* Blobs de fundo — parallax */}
			<Box
				sx={{
					position: "absolute",
					top: "-160px",
					right: "-100px",
					width: "520px",
					height: "520px",
					borderRadius: "50%",
					background: `radial-gradient(circle, ${alpha(theme.palette.brand.main, 0.18)} 0%, transparent 70%)`,
					pointerEvents: "none",
					transform: `translateY(${scrollY * 0.25}px)`,
					willChange: "transform",
				}}
			/>
			<Box
				sx={{
					position: "absolute",
					bottom: "-120px",
					left: "25%",
					width: "360px",
					height: "360px",
					borderRadius: "50%",
					background: `radial-gradient(circle, ${alpha(theme.palette.brand.main, 0.1)} 0%, transparent 70%)`,
					pointerEvents: "none",
					transform: `translateY(${scrollY * -0.15}px)`,
					willChange: "transform",
				}}
			/>

			{/* Esquerda: conteúdo textual */}
			<Box sx={{ flex: 1, maxWidth: "480px", position: "relative", zIndex: 1 }}>
				<Box sx={appear("0s")}>
					<Box
						sx={{
							display: "inline-flex",
							alignItems: "center",
							gap: 0.75,
							bgcolor: alpha(theme.palette.brand.main, 0.1),
							border: `1px solid ${alpha(theme.palette.brand.main, 0.2)}`,
							borderRadius: "20px",
							px: 2,
							py: 0.75,
							mb: 3.5,
						}}
					>
						<Box
							sx={{
								width: 7,
								height: 7,
								borderRadius: "50%",
								bgcolor: theme.palette.brand.main,
								flexShrink: 0,
								animation: `${pulse} 2.2s ease-in-out infinite`,
							}}
						/>
						<Typography
							sx={{
								fontFamily: '"DM Sans", sans-serif',
								fontSize: "0.78rem",
								fontWeight: 500,
								color: theme.palette.brand.main,
							}}
						>
							Plataforma nutricional para pacientes e nutricionistas
						</Typography>
					</Box>
				</Box>

				<Box sx={appear("0.1s")}>
					<Typography
						sx={{
							fontFamily: '"DM Sans", sans-serif',
							fontWeight: 300,
							fontSize: { xs: "3.6rem", md: "4.8rem" },
							color: theme.palette.brand.main,
							lineHeight: 1.0,
						}}
					>
						Nutrição
					</Typography>
					<Typography
						sx={{
							fontFamily: '"DM Sans", sans-serif',
							fontWeight: 800,
							fontSize: { xs: "3.6rem", md: "4.8rem" },
							color: theme.palette.typography.mainText,
							lineHeight: 1.0,
							mb: 3,
						}}
					>
						inteligente.
					</Typography>
				</Box>

				<Box sx={appear("0.2s")}>
					<Typography
						sx={{
							fontFamily: '"DM Sans", sans-serif',
							fontSize: "0.95rem",
							color: theme.palette.typography.secondaryText,
							lineHeight: 1.7,
							mb: 4.5,
							maxWidth: "360px",
						}}
					>
						Cadastre refeições, acompanhe macros e conecte-se ao seu nutricionista. Tudo em um só
						lugar, de graça.
					</Typography>
				</Box>

				<Box sx={{ ...appear("0.3s"), display: "flex", gap: 2, flexWrap: "wrap" }}>
					<Button
						onClick={() => navigate("/register")}
						sx={{
							bgcolor: theme.palette.brand.main,
							color: "#FFFFFF",
							fontFamily: '"Inter", sans-serif',
							fontWeight: 600,
							fontSize: "0.95rem",
							borderRadius: "50px",
							px: 4,
							py: 1.5,
							transition: "all 0.25s ease",
							"&:hover": {
								bgcolor: theme.palette.brand.hoverItem,
								transform: "translateY(-2px)",
								boxShadow: `0 10px 28px ${alpha(theme.palette.brand.main, 0.35)}`,
							},
						}}
					>
						COMECE JÁ
					</Button>
				</Box>
			</Box>

			{/* Direita: card de prévia do app */}
			<Box
				sx={{
					flex: 1,
					display: { xs: "none", md: "flex" },
					justifyContent: "center",
					alignItems: "center",
					position: "relative",
					zIndex: 1,
					...appear("0.35s"),
				}}
			>
				<AppPreviewCard />
			</Box>
		</Box>
	);
}
