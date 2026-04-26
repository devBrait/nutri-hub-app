import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import LogoutIcon from "@mui/icons-material/Logout";
import PeopleAltIcon from "@mui/icons-material/PeopleAltOutlined";
import PersonIcon from "@mui/icons-material/Person";
import RestaurantIcon from "@mui/icons-material/RestaurantOutlined";
import SearchIcon from "@mui/icons-material/Search";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { alpha, useTheme } from "@mui/material/styles";
import { NavLink, useNavigate } from "react-router-dom";
import { useProfile } from "../../hooks/useProfile";

const SIDEBAR_WIDTH = 240;

const NAV_MAIN = [
	{ to: "/dieta", label: "Dieta", icon: CalendarTodayIcon },
	{ to: "/perfil", label: "Perfil", icon: PersonIcon },
	{ to: "/nutricionistas", label: "Nutricionistas", icon: PeopleAltIcon },
];

const NAV_MEAL = [
	{ to: "/refeicao", label: "Editar Refeição", icon: RestaurantIcon },
	{ to: "/buscar-alimento", label: "Buscar Alimento", icon: SearchIcon },
];

export default function Sidebar() {
	const theme = useTheme();
	const navigate = useNavigate();
	const { profile } = useProfile();

	return (
		<Box
			component="aside"
			sx={{
				width: SIDEBAR_WIDTH,
				flexShrink: 0,
				bgcolor: theme.palette.brand.main,
				display: { xs: "none", md: "flex" },
				flexDirection: "column",
				position: "sticky",
				top: 0,
				height: "100vh",
				zIndex: 10,
			}}
		>
			{/* Logo */}
			<Box
				sx={{
					px: 3,
					pt: 3.5,
					pb: 3,
					borderBottom: `1px solid ${alpha("#fff", 0.1)}`,
				}}
			>
				<Box sx={{ display: "flex", alignItems: "center", gap: 1.25 }}>
					<Box
						sx={{
							width: 34,
							height: 34,
							borderRadius: "10px",
							bgcolor: alpha("#fff", 0.15),
							display: "flex",
							alignItems: "center",
							justifyContent: "center",
							fontSize: "16px",
						}}
					>
						🥗
					</Box>
					<Typography
						sx={{
							fontFamily: '"DM Serif Display", serif',
							fontSize: "1.4rem",
							color: "#fff",
							letterSpacing: "0.3px",
						}}
					>
						NutriHub
					</Typography>
				</Box>
			</Box>

			{/* User */}
			<Box
				sx={{
					px: 2.5,
					py: 2.25,
					display: "flex",
					alignItems: "center",
					gap: 1.5,
					borderBottom: `1px solid ${alpha("#fff", 0.1)}`,
				}}
			>
				<Box
					sx={{
						width: 38,
						height: 38,
						borderRadius: "50%",
						bgcolor: alpha("#fff", 0.2),
						display: "flex",
						alignItems: "center",
						justifyContent: "center",
						fontWeight: 600,
						fontSize: "0.85rem",
						color: "#fff",
						flexShrink: 0,
					}}
				>
					{profile?.avatarInitials ?? "—"}
				</Box>
				<Box sx={{ overflow: "hidden" }}>
					<Typography
						sx={{
							fontSize: "0.82rem",
							fontWeight: 600,
							color: "#fff",
							whiteSpace: "nowrap",
							overflow: "hidden",
							textOverflow: "ellipsis",
						}}
					>
						{profile?.fullName ?? "Carregando..."}
					</Typography>
					<Typography
						sx={{
							fontSize: "0.7rem",
							color: alpha("#fff", 0.55),
							mt: 0.25,
							textTransform: "capitalize",
						}}
					>
						{profile?.role === "nutritionist" ? "Nutricionista" : "Paciente"}
					</Typography>
				</Box>
			</Box>

			{/* Nav */}
			<Box sx={{ p: 1.5, flex: 1, overflowY: "auto" }}>
				<NavSectionLabel>Principal</NavSectionLabel>
				{NAV_MAIN.map((item) => (
					<NavItem key={item.to} {...item} />
				))}
				<NavSectionLabel sx={{ mt: 1.5 }}>Refeições</NavSectionLabel>
				{NAV_MEAL.map((item) => (
					<NavItem key={item.to} {...item} />
				))}
			</Box>

			{/* Logout */}
			<Box sx={{ p: 1.5, borderTop: `1px solid ${alpha("#fff", 0.1)}` }}>
				<Box
					onClick={() => navigate("/login")}
					sx={navItemSx(false, theme)}
					role="button"
				>
					<LogoutIcon sx={{ fontSize: "1.1rem", opacity: 0.8 }} />
					Sair
				</Box>
			</Box>
		</Box>
	);
}

function NavSectionLabel({
	children,
	sx,
}: {
	children: React.ReactNode;
	sx?: object;
}) {
	return (
		<Typography
			sx={{
				fontSize: "0.62rem",
				fontWeight: 600,
				color: alpha("#fff", 0.4),
				textTransform: "uppercase",
				letterSpacing: "0.08em",
				px: 1.5,
				pt: 1,
				pb: 0.75,
				...sx,
			}}
		>
			{children}
		</Typography>
	);
}

function NavItem({
	to,
	label,
	icon: Icon,
}: {
	to: string;
	label: string;
	icon: typeof CalendarTodayIcon;
}) {
	const theme = useTheme();
	return (
		<NavLink
			to={to}
			style={{ textDecoration: "none" }}
			end={to === "/dieta"}
		>
			{({ isActive }) => (
				<Box sx={navItemSx(isActive, theme)}>
					<Icon sx={{ fontSize: "1.1rem", opacity: isActive ? 1 : 0.8 }} />
					{label}
				</Box>
			)}
		</NavLink>
	);
}

function navItemSx(isActive: boolean, _theme: ReturnType<typeof useTheme>) {
	return {
		display: "flex",
		alignItems: "center",
		gap: 1.25,
		px: 1.5,
		py: 1.25,
		borderRadius: "10px",
		fontSize: "0.82rem",
		fontWeight: isActive ? 600 : 500,
		color: isActive ? "#fff" : alpha("#fff", 0.7),
		bgcolor: isActive ? alpha("#fff", 0.18) : "transparent",
		mb: 0.25,
		cursor: "pointer",
		transition: "all 0.15s",
		fontFamily: '"DM Sans", sans-serif',
		"&:hover": {
			bgcolor: isActive ? alpha("#fff", 0.18) : alpha("#fff", 0.1),
			color: "#fff",
		},
	} as const;
}

export { SIDEBAR_WIDTH };
