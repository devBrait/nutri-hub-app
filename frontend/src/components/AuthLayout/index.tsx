import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { alpha, useTheme } from "@mui/material/styles";
import type { ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import logoSm from "../../assets/logo-sm.png";

interface AuthLayoutProps {
  children: ReactNode;
}

export default function AuthLayout({ children }: AuthLayoutProps) {
  const theme = useTheme();
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        minHeight: "100vh",
        bgcolor: theme.palette.neutral.background,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Gradiente sutil no topo */}
      <Box
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: "320px",
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
        {/* Coluna esquerda — Voltar */}
        <Box
          onClick={() => navigate("/")}
          sx={{
            flex: 1,
            display: "flex",
            alignItems: "center",
            gap: 0.75,
            cursor: "pointer",
            color: theme.palette.typography.secondaryText,
            transition: "color 0.2s ease",
            "&:hover": { color: theme.palette.brand.main },
          }}
        >
          <ArrowBackIcon sx={{ fontSize: "1rem" }} />
          <Typography sx={{
            fontFamily: '"DM Sans", sans-serif',
            fontSize: "0.85rem",
            fontWeight: 500,
            display: { xs: "none", sm: "block" },
          }}>
            Início
          </Typography>
        </Box>

        {/* Coluna central — Logo */}
        <Box
          component="img"
          src={logoSm}
          alt="nutrihub"
          onClick={() => navigate("/")}
          sx={{
            height: "28px",
            width: "auto",
            objectFit: "contain",
            cursor: "pointer",
            transition: "opacity 0.2s ease",
            "&:hover": { opacity: 0.7 },
          }}
        />

        {/* Coluna direita — simetria */}
        <Box sx={{ flex: 1 }} />
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
            maxWidth: "420px",
            boxShadow: `0 4px 6px ${alpha(theme.palette.brand.main, 0.04)}, 0 16px 40px ${alpha("#000", 0.07)}`,
            border: `1px solid ${alpha(theme.palette.brand.main, 0.08)}`,
          }}
        >
          {children}
        </Box>
      </Box>

      {/* Footer mínimo */}
      <Typography
        sx={{
          fontFamily: '"DM Sans", sans-serif',
          fontSize: "0.75rem",
          color: theme.palette.typography.secondaryCardText,
          pb: 3,
          position: "relative",
          zIndex: 1,
        }}
      >
        © mackbot
      </Typography>
    </Box>
  );
}
