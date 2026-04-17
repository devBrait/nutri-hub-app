import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import OutlinedInput from "@mui/material/OutlinedInput";
import Typography from "@mui/material/Typography";
import { alpha, useTheme } from "@mui/material/styles";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthLayout from "../../components/AuthLayout";

export default function Login() {
  const theme = useTheme();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const labelSx = {
    fontFamily: '"DM Sans", sans-serif',
    fontSize: "0.72rem",
    fontWeight: 600,
    color: theme.palette.typography.secondaryText,
    letterSpacing: "0.07em",
    textTransform: "uppercase" as const,
    mb: 0.75,
  };

  const inputSx = {
    bgcolor: theme.palette.neutral.textFieldBg,
    borderRadius: "12px",
    "& fieldset": { border: "none" },
    "&:hover fieldset": { border: "none" },
    "&.Mui-focused fieldset": {
      border: `1.5px solid ${theme.palette.brand.main} !important`,
    },
    "& input": {
      fontFamily: '"DM Sans", sans-serif',
      fontSize: "0.92rem",
      color: theme.palette.typography.mainText,
      py: 1.5,
      px: 2,
    },
    "& input::placeholder": {
      color: theme.palette.typography.secondaryCardText,
      opacity: 1,
    },
  };

  return (
    <AuthLayout>
      {/* Título */}
      <Typography
        sx={{
          fontFamily: '"DM Sans", sans-serif',
          fontWeight: 800,
          fontSize: "1.75rem",
          color: theme.palette.typography.mainText,
          mb: 0.5,
        }}
      >
        Entrar
      </Typography>
      <Typography
        sx={{
          fontFamily: '"DM Sans", sans-serif',
          fontSize: "0.9rem",
          color: theme.palette.typography.secondaryText,
          mb: 4,
        }}
      >
        Bem-vindo de volta
      </Typography>

      {/* E-mail */}
      <Typography sx={labelSx}>E-mail</Typography>
      <OutlinedInput
        fullWidth
        placeholder="seu@email.com"
        type="email"
        sx={{ ...inputSx, mb: 2.5 }}
      />

      {/* Senha */}
      <Typography sx={labelSx}>Senha</Typography>
      <OutlinedInput
        fullWidth
        placeholder="Sua senha"
        type={showPassword ? "text" : "password"}
        sx={{ ...inputSx, mb: 1 }}
        endAdornment={
          <InputAdornment position="end">
            <IconButton
              onClick={() => setShowPassword((v) => !v)}
              edge="end"
              size="small"
              sx={{
                color: theme.palette.typography.secondaryCardText,
                mr: 0.5,
              }}
            >
              {showPassword ? (
                <VisibilityOff fontSize="small" />
              ) : (
                <Visibility fontSize="small" />
              )}
            </IconButton>
          </InputAdornment>
        }
      />

      {/* Esqueci senha */}
      <Box sx={{ display: "flex", justifyContent: "flex-end", mb: 4 }}>
        <Typography
          sx={{
            fontFamily: '"DM Sans", sans-serif',
            fontSize: "0.82rem",
            color: theme.palette.brand.main,
            fontWeight: 500,
            cursor: "pointer",
            "&:hover": { textDecoration: "underline" },
          }}
        >
          Esqueci minha senha
        </Typography>
      </Box>

      {/* CTA */}
      <Button
        fullWidth
        sx={{
          bgcolor: theme.palette.brand.main,
          color: "#FFFFFF",
          fontFamily: '"Inter", sans-serif',
          fontWeight: 600,
          fontSize: "0.95rem",
          borderRadius: "12px",
          py: 1.5,
          mb: 2.5,
          transition: "all 0.2s ease",
          "&:hover": {
            bgcolor: theme.palette.brand.hoverItem,
            boxShadow: `0 8px 24px ${alpha(theme.palette.brand.main, 0.32)}`,
            transform: "translateY(-1px)",
          },
        }}
      >
        Entrar na conta
      </Button>

      {/* Divisor */}
      <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 2.5 }}>
        <Divider
          sx={{
            flex: 1,
            borderColor: alpha(theme.palette.typography.mainText, 0.1),
          }}
        />
        <Typography
          sx={{
            fontFamily: '"DM Sans", sans-serif',
            fontSize: "0.78rem",
            color: theme.palette.typography.secondaryCardText,
          }}
        >
          ou
        </Typography>
        <Divider
          sx={{
            flex: 1,
            borderColor: alpha(theme.palette.typography.mainText, 0.1),
          }}
        />
      </Box>

      {/* Secundário */}
      <Button
        fullWidth
        onClick={() => navigate("/register")}
        sx={{
          bgcolor: "transparent",
          color: theme.palette.typography.mainText,
          fontFamily: '"Inter", sans-serif',
          fontWeight: 500,
          fontSize: "0.92rem",
          borderRadius: "12px",
          py: 1.4,
          border: `1.5px solid ${alpha(theme.palette.typography.mainText, 0.12)}`,
          transition: "all 0.2s ease",
          "&:hover": {
            bgcolor: alpha(theme.palette.brand.main, 0.04),
            borderColor: alpha(theme.palette.brand.main, 0.3),
            color: theme.palette.brand.main,
          },
        }}
      >
        Criar nova conta
      </Button>
    </AuthLayout>
  );
}
