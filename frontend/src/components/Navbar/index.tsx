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
import { alpha, useTheme } from "@mui/material/styles";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useScrollY } from "../../hooks/useScrollY";
import logoSm from "../../assets/logo-sm.png";
import ThemeToggle from "../ThemeToggle";

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
  const theme = useTheme();
  const navigate = useNavigate();
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
        enableColorOnDark
        sx={{
          top: 0,
          bgcolor: alpha(theme.palette.neutral.card, progress * 0.88),
          backgroundImage: "none",
          backdropFilter: `blur(${progress * 14}px)`,
          borderBottom: `1px solid ${alpha(theme.palette.brand.main, progress * 0.1)}`,
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
          {/* Logo */}
          <Box
            component="img"
            src={logoSm}
            alt="nutrihub"
            onClick={() => handleNavClick("inicio")}
            sx={{
              height: { xs: "18px", md: "22px" },
              width: "auto",
              objectFit: "contain",
              cursor: "pointer",
              userSelect: "none",
              transition: "transform 0.2s ease, opacity 0.2s ease",
              "&:hover": { transform: "scale(1.04)", opacity: 0.88 },
            }}
          />

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
                  color: theme.palette.typography.mainText,
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
                    bgcolor: theme.palette.brand.main,
                    borderRadius: "2px",
                    transition: "width 0.25s ease",
                  },
                  "&:hover": {
                    color: theme.palette.brand.main,
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
            <ThemeToggle size="small" />
            <Button
              onClick={() => navigate("/login")}
              sx={{
                bgcolor: theme.palette.neutral.selectedGender,
                color: theme.palette.brand.main,
                fontFamily: '"Inter", sans-serif',
                fontWeight: 600,
                fontSize: "0.9rem",
                borderRadius: "12px",
                px: 3.5,
                py: 1.25,
                transition: "all 0.2s ease",
                "&:hover": {
                  bgcolor: theme.palette.neutral.altTempBackground,
                  transform: "translateY(-1px)",
                },
              }}
            >
              Entrar
            </Button>
            <Button
              onClick={() => navigate("/register")}
              sx={{
                bgcolor: theme.palette.brand.main,
                color: "#FFFFFF",
                fontFamily: '"Inter", sans-serif',
                fontWeight: 600,
                fontSize: "0.9rem",
                borderRadius: "12px",
                px: 3,
                py: 0.9,
                lineHeight: 1.4,
                minWidth: "90px",
                transition: "all 0.2s ease",
                "&:hover": {
                  bgcolor: theme.palette.brand.hoverItem,
                  transform: "translateY(-1px)",
                  boxShadow: `0 6px 18px ${alpha(theme.palette.brand.main, 0.3)}`,
                },
              }}
            >
              Criar
              <br />
              Conta&nbsp;→
            </Button>
          </Box>

          {/* Ações — mobile */}
          <Box
            sx={{
              display: { xs: "flex", md: "none" },
              alignItems: "center",
              gap: 1,
            }}
          >
            <ThemeToggle size="small" />
            <IconButton
              onClick={() => setDrawerOpen(true)}
              sx={{ color: theme.palette.brand.main }}
            >
              <MenuIcon />
            </IconButton>
          </Box>
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
              bgcolor: theme.palette.neutral.card,
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
          <Box
            component="img"
            src={logoSm}
            alt="nutrihub"
            sx={{
              height: "18px",
              width: "auto",
              objectFit: "contain",
              userSelect: "none",
            }}
          />
          <IconButton
            onClick={() => setDrawerOpen(false)}
            sx={{ color: theme.palette.brand.main }}
          >
            <CloseIcon />
          </IconButton>
        </Box>

        <Divider
          sx={{ borderColor: alpha(theme.palette.brand.main, 0.12), mb: 3 }}
        />

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
                color: theme.palette.typography.mainText,
                cursor: "pointer",
                borderRadius: "10px",
                px: 1.5,
                py: 1.25,
                transition: "background 0.2s ease, color 0.2s ease",
                "&:hover": {
                  bgcolor: alpha(theme.palette.brand.main, 0.07),
                  color: theme.palette.brand.main,
                },
              }}
            >
              {item.label}
            </Typography>
          ))}
        </Box>

        <Divider
          sx={{ borderColor: alpha(theme.palette.brand.main, 0.12), my: 3 }}
        />

        {/* Botões de ação */}
        <Box sx={{ display: "flex", flexDirection: "column", gap: 1.5 }}>
          <Button
            fullWidth
            onClick={() => { setDrawerOpen(false); navigate("/login"); }}
            sx={{
              bgcolor: theme.palette.neutral.selectedGender,
              color: theme.palette.brand.main,
              fontFamily: '"Inter", sans-serif',
              fontWeight: 600,
              fontSize: "0.95rem",
              borderRadius: "12px",
              py: 1.25,
              "&:hover": { bgcolor: theme.palette.neutral.altTempBackground },
            }}
          >
            Entrar
          </Button>
          <Button
            fullWidth
            onClick={() => { setDrawerOpen(false); navigate("/register"); }}
            sx={{
              bgcolor: theme.palette.brand.main,
              color: "#FFFFFF",
              fontFamily: '"Inter", sans-serif',
              fontWeight: 600,
              fontSize: "0.95rem",
              borderRadius: "12px",
              py: 1.25,
              "&:hover": { bgcolor: theme.palette.brand.hoverItem },
            }}
          >
            Criar conta →
          </Button>
        </Box>
      </Drawer>
    </>
  );
}
