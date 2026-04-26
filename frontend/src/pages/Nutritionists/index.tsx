import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { alpha, useTheme } from "@mui/material/styles";
import { useNutritionists } from "../../hooks/useNutritionists";
import { useTopbar } from "../../hooks/useTopbar";

import type { Nutritionist } from "../../types/nutritionist";

export default function Nutritionists() {
	const theme = useTheme();
	const { nutritionists } = useNutritionists();

	useTopbar("Nutricionistas");

	return (
		<Box>
			<Box sx={{ mb: { xs: 2, md: 3 } }}>
				<Typography
					sx={{
						fontSize: { xs: "1.2rem", md: "1.4rem" },
						fontWeight: 700,
						color: theme.palette.typography.mainText,
						mb: 0.5,
						display: { xs: "none", md: "block" },
					}}
				>
					Nutricionistas
				</Typography>
				<Typography
					sx={{ fontSize: "0.82rem", color: theme.palette.typography.secondaryText }}
				>
					Encontre e conecte-se a um profissional.
				</Typography>
			</Box>

			<Box
				sx={{
					display: "grid",
					gridTemplateColumns: { xs: "1fr", md: "repeat(2, 1fr)", lg: "repeat(3, 1fr)" },
					gap: { xs: 1.25, md: 2 },
				}}
			>
				{nutritionists.map((n) => (
					<NutritionistCard key={n.id} nutritionist={n} />
				))}
			</Box>
		</Box>
	);
}

function NutritionistCard({ nutritionist }: { nutritionist: Nutritionist }) {
	const theme = useTheme();
	const isConnected = nutritionist.connected;

	return (
		<Box
			sx={{
				bgcolor: theme.palette.neutral.card,
				border: `1px solid ${
					isConnected ? theme.palette.brand.main : theme.palette.divider
				}`,
				borderRadius: "16px",
				p: { xs: 2, md: 2.75 },
				display: "flex",
				flexDirection: { xs: "row", md: "column" },
				alignItems: { xs: "center", md: "stretch" },
				gap: { xs: 1.5, md: 1.5 },
			}}
		>
			<Box
				sx={{
					width: { xs: 48, md: 52 },
					height: { xs: 48, md: 52 },
					borderRadius: "50%",
					bgcolor: theme.palette.neutral.altTempBackground,
					display: "flex",
					alignItems: "center",
					justifyContent: "center",
					fontSize: { xs: "1.25rem", md: "1.4rem" },
					flexShrink: 0,
				}}
			>
				{nutritionist.avatarEmoji}
			</Box>

			<Box
				sx={{
					flex: 1,
					minWidth: 0,
					display: "flex",
					flexDirection: "column",
					gap: 0.5,
				}}
			>
				<Box
					sx={{
						display: "flex",
						alignItems: "center",
						gap: 0.75,
						flexWrap: "wrap",
					}}
				>
					<Typography
						sx={{
							fontSize: { xs: "0.88rem", md: "0.95rem" },
							fontWeight: 700,
							color: theme.palette.typography.mainText,
						}}
					>
						{nutritionist.name}
					</Typography>
					{isConnected && <Badge variant="green">Conectada</Badge>}
				</Box>
				<Typography
					sx={{
						fontSize: "0.7rem",
						color: theme.palette.typography.secondaryCardText,
					}}
				>
					{nutritionist.specialty} · {nutritionist.location}
				</Typography>
				<Box
					sx={{
						display: { xs: "none", md: "flex" },
						gap: 0.75,
						flexWrap: "wrap",
						mt: 0.5,
					}}
				>
					{nutritionist.tags.map((tag, idx) => (
						<Badge key={tag} variant={idx === 0 ? "green" : "gray"}>
							{tag}
						</Badge>
					))}
				</Box>
			</Box>

			<Button
				onClick={isConnected ? undefined : () => { /* TODO(backend): solicitar acompanhamento */ }}
				sx={{
					bgcolor: isConnected
						? theme.palette.neutral.altTempBackground
						: theme.palette.brand.main,
					color: isConnected ? theme.palette.brand.main : "#fff",
					border: isConnected ? `1px solid ${theme.palette.brand.main}` : "none",
					borderRadius: "10px",
					px: { xs: 1.75, md: 2 },
					py: { xs: 1, md: 1.25 },
					fontSize: { xs: "0.74rem", md: "0.82rem" },
					fontWeight: 600,
					textTransform: "none",
					fontFamily: '"DM Sans", sans-serif',
					whiteSpace: "nowrap",
					flexShrink: 0,
					width: { xs: "auto", md: "100%" },
					"&:hover": {
						bgcolor: isConnected
							? theme.palette.neutral.altTempBackground
							: theme.palette.brand.hoverItem,
					},
				}}
			>
				{isConnected
					? "Ver perfil"
					: "Solicitar"}
				<Box component="span" sx={{ display: { xs: "none", md: "inline" }, ml: 0.5 }}>
					{isConnected ? "" : " acompanhamento"}
				</Box>
			</Button>
		</Box>
	);
}

function Badge({
	children,
	variant,
}: {
	children: React.ReactNode;
	variant: "green" | "gray";
}) {
	const theme = useTheme();
	const colors =
		variant === "green"
			? {
					bg: theme.palette.neutral.altTempBackground,
					fg: theme.palette.brand.main,
				}
			: {
					bg: alpha(theme.palette.typography.secondaryText, 0.12),
					fg: theme.palette.typography.secondaryText,
				};

	return (
		<Box
			sx={{
				display: "inline-flex",
				alignItems: "center",
				px: 1.25,
				py: 0.4,
				borderRadius: "99px",
				fontSize: "0.66rem",
				fontWeight: 600,
				bgcolor: colors.bg,
				color: colors.fg,
			}}
		>
			{children}
		</Box>
	);
}
