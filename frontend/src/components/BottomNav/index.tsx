import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import DashboardOutlinedIcon from "@mui/icons-material/DashboardOutlined";
import MailOutlineIcon from "@mui/icons-material/EmailOutlined";
import GroupIcon from "@mui/icons-material/GroupOutlined";
import PeopleAltIcon from "@mui/icons-material/PeopleAltOutlined";
import PersonIcon from "@mui/icons-material/Person";
import RestaurantIcon from "@mui/icons-material/RestaurantOutlined";
import SearchIcon from "@mui/icons-material/Search";
import Box from "@mui/material/Box";
import { useTheme } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import { NavLink } from "react-router-dom";
import { getStoredRole } from "../../lib/api/auth.service";

const NAV_PATIENT = [
	{ to: "/diet", label: "Dieta", icon: CalendarTodayIcon, end: true },
	{ to: "/meal", label: "Refeição", icon: RestaurantIcon, end: false },
	{ to: "/food-search", label: "Buscar", icon: SearchIcon, end: false },
	{ to: "/nutritionists", label: "Nutri", icon: PeopleAltIcon, end: false },
	{ to: "/profile", label: "Perfil", icon: PersonIcon, end: false },
];

const NAV_NUTRITIONIST = [
	{ to: "/nutritionist/dashboard", label: "Dashboard", icon: DashboardOutlinedIcon, end: true },
	{ to: "/nutritionist/patients", label: "Pacientes", icon: GroupIcon, end: false },
	{ to: "/nutritionist/invitations", label: "Convites", icon: MailOutlineIcon, end: false },
	{ to: "/nutritionist/profile", label: "Perfil", icon: PersonIcon, end: false },
];

export const BOTTOM_NAV_HEIGHT = 64;

export default function BottomNav() {
	const theme = useTheme();
	const isNutritionist = getStoredRole() === "Nutritionist";
	const items = isNutritionist ? NAV_NUTRITIONIST : NAV_PATIENT;

	return (
		<Box
			component="nav"
			sx={{
				position: "fixed",
				bottom: 0,
				left: 0,
				right: 0,
				height: BOTTOM_NAV_HEIGHT,
				bgcolor: theme.palette.neutral.card,
				borderTop: `1px solid ${theme.palette.divider}`,
				display: { xs: "flex", md: "none" },
				alignItems: "center",
				zIndex: 50,
				pb: "env(safe-area-inset-bottom)",
			}}
		>
			{items.map((item) => {
				const Icon = item.icon;
				return (
					<NavLink
						key={item.to}
						to={item.to}
						end={item.end}
						style={{ flex: 1, textDecoration: "none" }}
					>
						{({ isActive }) => (
							<Box
								sx={{
									display: "flex",
									flexDirection: "column",
									alignItems: "center",
									gap: 0.4,
									py: 1.25,
									color: isActive
										? theme.palette.brand.main
										: theme.palette.typography.secondaryCardText,
									transition: "color 0.15s",
								}}
							>
								<Icon sx={{ fontSize: "1.35rem" }} />
								<Typography
									sx={{
										fontSize: "0.62rem",
										fontWeight: 600,
										fontFamily: '"DM Sans", sans-serif',
									}}
								>
									{item.label}
								</Typography>
							</Box>
						)}
					</NavLink>
				);
			})}
		</Box>
	);
}
