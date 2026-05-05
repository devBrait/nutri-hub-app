import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import GroupIcon from "@mui/icons-material/GroupOutlined";
import LogoutIcon from "@mui/icons-material/Logout";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import PeopleAltIcon from "@mui/icons-material/PeopleAltOutlined";
import PersonIcon from "@mui/icons-material/Person";
import RestaurantIcon from "@mui/icons-material/RestaurantOutlined";
import SearchIcon from "@mui/icons-material/Search";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { alpha, useTheme } from "@mui/material/styles";
import { NavLink, useNavigate } from "react-router-dom";
import { clearAuthData, getStoredRole } from "../../lib/api/auth.service";
import { logout } from "../../lib/api/auth.service";
import { useProfile } from "../../hooks/useProfile";

const SIDEBAR_WIDTH = 240;

const NAV_PATIENT = [
	{ to: "/diet", label: "Dieta", icon: CalendarTodayIcon },
	{ to: "/profile", label: "Perfil", icon: PersonIcon },
	{ to: "/nutritionists", label: "Nutricionistas", icon: PeopleAltIcon },
];

const NAV_PATIENT_MEAL = [
	{ to: "/meal", label: "Editar Refeição", icon: RestaurantIcon },
	{ to: "/food-search", label: "Buscar Alimento", icon: SearchIcon },
];

const NAV_NUTRITIONIST = [
	{ to: "/nutritionist/patients", label: "Pacientes", icon: GroupIcon },
	{ to: "/nutritionist/invitations", label: "Convites", icon: MailOutlineIcon },
	{ to: "/nutritionist/profile", label: "Perfil", icon: PersonIcon },
];

export default function Sidebar() {
	const theme = useTheme();
	const navigate = useNavigate();
	const { profile } = useProfile();
	const role = getStoredRole();
	const isNutritionist = role === "Nutritionist";

	async function handleLogout() {
		const accessToken = localStorage.getItem("accessToken") ?? "";
		try {
			if (accessToken) await logout(accessToken);
		} finally {
			clearAuthData();
			navigate("/login");
		}
	}

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
						{isNutritionist ? "Nutricionista" : "Paciente"}
					</Typography>
				</Box>
			</Box>

			{/* Nav */}
			<Box sx={{ p: 1.5, flex: 1, overflowY: "auto" }}>
				{isNutritionist ? (
					<>
						<NavSectionLabel>Principal</NavSectionLabel>
						{NAV_NUTRITIONIST.map((item) => (
							<NavItem key={item.to} {...item} />
						))}
					</>
				) : (
					<>
						<NavSectionLabel>Principal</NavSectionLabel>
						{NAV_PATIENT.map((item) => (
							<NavItem key={item.to} {...item} />
						))}
						<NavSectionLabel sx={{ mt: 1.5 }}>Refeições</NavSectionLabel>
						{NAV_PATIENT_MEAL.map((item) => (
							<NavItem key={item.to} {...item} />
						))}
					</>
				)}
			</Box>

			{/* Logout */}
			<Box sx={{ p: 1.5, borderTop: `1px solid ${alpha("#fff", 0.1)}` }}>
				<Box
					onClick={handleLogout}
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
			end={to === "/diet" || to === "/nutritionist/patients"}
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
