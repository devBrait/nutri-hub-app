import CloseIcon from "@mui/icons-material/Close";
import MenuIcon from "@mui/icons-material/Menu";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { useState } from "react";
import { useScrollY } from "../../hooks/useScrollY";

const NAV_ITEMS = [
	{ label: "Início", id: "inicio" },
	{ label: "Funcionalidades", id: "funcionalidades" },
	{ label: "Como funciona", id: "como-funciona" },
];

const NAVBAR_HEIGHT = 72;

function scrollToSection(id: string) {
	if (id === "inicio") {
		window.scrollTo({ top: 0, behavior: "smooth" });
		return;
	}
	const el = document.getElementById(id);
	if (!el) return;
	const top = el.getBoundingClientRect().top + window.scrollY - NAVBAR_HEIGHT;
	window.scrollTo({ top, behavior: "smooth" });
}

export default function Navbar() {
	const scrollY = useScrollY();
	const progress = Math.min(scrollY / 80, 1);
	const [drawerOpen, setDrawerOpen] = useState(false);

	const handleNavClick = (id: string) => {
		setDrawerOpen(false);
		setTimeout(() => scrollToSection(id), 150);
	};

	return (
		<>
			<AppBar
				position="sticky"
				sx={{
					top: 0,
					bgcolor: `rgba(255,255,255,${progress * 0.88})`,
					backdropFilter: `blur(${progress * 14}px)`,
					borderBottom: `1px solid rgba(62,123,91,${progress * 0.1})`,
					transition: "background-color 0.3s ease, border-color 0.3s ease",
					zIndex: 100,
				}}
			>
				<Toolbar
					sx={{
						justifyContent: "space-between",
						px: { xs: 2.5, md: 5 },
						py: 1.25,
					}}
				>
					{/* Logotipo */}
					<Typography
						onClick={() => handleNavClick("inicio")}
						sx={{
							fontFamily: '"Fredoka", cursive',
							fontWeight: 700,
							fontSize: { xs: "1.7rem", md: "2rem" },
							color: "#3E7B5B",
							textShadow: "1px 1px 0px rgba(26,61,40,0.2)",
							letterSpacing: "0.5px",
							userSelect: "none",
							cursor: "pointer",
							transition: "transform 0.2s ease",
							"&:hover": { transform: "scale(1.03)" },
						}}
					>
						nutrihub
					</Typography>

					{/* Links de navegação — desktop */}
					<Box sx={{ display: { xs: "none", md: "flex" }, gap: 4.5 }}>
						{NAV_ITEMS.map((item) => (
							<Typography
								key={item.id}
								onClick={() => handleNavClick(item.id)}
								sx={{
									fontFamily: '"DM Sans", sans-serif',
									fontWeight: 500,
									fontSize: "0.95rem",
									color: "#2a3a30",
									cursor: "pointer",
									position: "relative",
									transition: "color 0.2s ease",
									"&::after": {
										content: '""',
										position: "absolute",
										bottom: "-2px",
										left: 0,
										width: "0%",
										height: "2px",
										bgcolor: "#3E7B5B",
										borderRadius: "2px",
										transition: "width 0.25s ease",
									},
									"&:hover": {
										color: "#3E7B5B",
										"&::after": { width: "100%" },
									},
								}}
							>
								{item.label}
							</Typography>
						))}
					</Box>

					{/* Botões de ação — desktop */}
					<Box
						sx={{
							display: { xs: "none", md: "flex" },
							gap: 1.5,
							alignItems: "center",
						}}
					>
						<Button
							sx={{
								bgcolor: "#D4E8DF",
								color: "#3E7B5B",
								fontFamily: '"DM Sans", sans-serif',
								fontWeight: 600,
								fontSize: "0.95rem",
								borderRadius: "12px",
								px: 3.5,
								py: 1.25,
								transition: "all 0.2s ease",
								"&:hover": {
									bgcolor: "#c0dcd5",
									transform: "translateY(-1px)",
								},
							}}
						>
							Entrar
						</Button>
						<Button
							sx={{
								bgcolor: "#3E7B5B",
								color: "#FFFFFF",
								fontFamily: '"DM Sans", sans-serif',
								fontWeight: 600,
								fontSize: "0.9rem",
								borderRadius: "12px",
								px: 3,
								py: 0.9,
								lineHeight: 1.4,
								minWidth: "90px",
								transition: "all 0.2s ease",
								"&:hover": {
									bgcolor: "#2d5a42",
									transform: "translateY(-1px)",
									boxShadow: "0 6px 18px rgba(62,123,91,0.3)",
								},
							}}
						>
							Criar
							<br />
							Conta&nbsp;→
						</Button>
					</Box>

					{/* Ícone hambúrguer — mobile */}
					<IconButton
						onClick={() => setDrawerOpen(true)}
						sx={{
							display: { xs: "flex", md: "none" },
							color: "#3E7B5B",
						}}
					>
						<MenuIcon />
					</IconButton>
				</Toolbar>
			</AppBar>

			{/* Menu lateral — mobile */}
			<Drawer
				anchor="right"
				open={drawerOpen}
				onClose={() => setDrawerOpen(false)}
				slotProps={{
					paper: {
						sx: {
							width: "72vw",
							maxWidth: "300px",
							bgcolor: "#FFFFFF",
							px: 3,
							py: 3,
							display: "flex",
							flexDirection: "column",
						},
					},
				}}
			>
				{/* Cabeçalho do menu */}
				<Box
					sx={{
						display: "flex",
						justifyContent: "space-between",
						alignItems: "center",
						mb: 3,
					}}
				>
					<Typography
						sx={{
							fontFamily: '"Fredoka", cursive',
							fontWeight: 700,
							fontSize: "1.6rem",
							color: "#3E7B5B",
							textShadow: "1px 1px 0px rgba(26,61,40,0.2)",
							userSelect: "none",
						}}
					>
						nutrihub
					</Typography>
					<IconButton
						onClick={() => setDrawerOpen(false)}
						sx={{ color: "#3E7B5B" }}
					>
						<CloseIcon />
					</IconButton>
				</Box>

				<Divider sx={{ borderColor: "rgba(62,123,91,0.12)", mb: 3 }} />

				{/* Itens de navegação */}
				<Box
					sx={{ display: "flex", flexDirection: "column", gap: 0.5, flex: 1 }}
				>
					{NAV_ITEMS.map((item) => (
						<Typography
							key={item.id}
							onClick={() => handleNavClick(item.id)}
							sx={{
								fontFamily: '"DM Sans", sans-serif',
								fontWeight: 500,
								fontSize: "1rem",
								color: "#2a3a30",
								cursor: "pointer",
								borderRadius: "10px",
								px: 1.5,
								py: 1.25,
								transition: "background 0.2s ease, color 0.2s ease",
								"&:hover": {
									bgcolor: "rgba(62,123,91,0.07)",
									color: "#3E7B5B",
								},
							}}
						>
							{item.label}
						</Typography>
					))}
				</Box>

				<Divider sx={{ borderColor: "rgba(62,123,91,0.12)", my: 3 }} />

				{/* Botões de ação */}
				<Box sx={{ display: "flex", flexDirection: "column", gap: 1.5 }}>
					<Button
						fullWidth
						sx={{
							bgcolor: "#D4E8DF",
							color: "#3E7B5B",
							fontFamily: '"DM Sans", sans-serif',
							fontWeight: 600,
							fontSize: "0.95rem",
							borderRadius: "12px",
							py: 1.25,
							"&:hover": { bgcolor: "#c0dcd5" },
						}}
					>
						Entrar
					</Button>
					<Button
						fullWidth
						sx={{
							bgcolor: "#3E7B5B",
							color: "#FFFFFF",
							fontFamily: '"DM Sans", sans-serif',
							fontWeight: 600,
							fontSize: "0.95rem",
							borderRadius: "12px",
							py: 1.25,
							"&:hover": { bgcolor: "#2d5a42" },
						}}
					>
						Comece Já →
					</Button>
				</Box>
			</Drawer>
		</>
	);
}
