import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import MenuItem from "@mui/material/MenuItem";
import OutlinedInput from "@mui/material/OutlinedInput";
import Select from "@mui/material/Select";
import Typography from "@mui/material/Typography";
import { alpha, useTheme } from "@mui/material/styles";
import { isAxiosError } from "axios";
import { useSnackbar } from "notistack";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthLayout from "./AuthLayout";
import { register, type UserRole } from "../../../lib/api/auth.service";
import { createPatient } from "../../../lib/api/patient.service";
import { createNutritionist } from "../../../lib/api/clinic.service";
import { translateError } from "../../../utils/errorTranslation";

const ROLE_MAP: Record<string, UserRole> = {
  PACIENTE: "Patient",
  NUTRICIONISTA: "Nutritionist",
};

export default function RegisterForm() {
  const theme = useTheme();
  const navigate = useNavigate();

  const { enqueueSnackbar } = useSnackbar();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [profile, setProfile] = useState("PACIENTE");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  
  const [nameError, setNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [shakeName, setShakeName] = useState(false);
  const [shakeEmail, setShakeEmail] = useState(false);
  const [shakePassword, setShakePassword] = useState(false);

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

  async function handleRegister() {
    setNameError("");
    setEmailError("");
    setPasswordError("");
    setShakeName(false);
    setShakeEmail(false);
    setShakePassword(false);
    
    let hasError = false;

    if (!name) {
      setNameError("Nome é obrigatório.");
      setShakeName(true);
      hasError = true;
    }
    
    if (!email) {
      setEmailError("E-mail é obrigatório.");
      setShakeEmail(true);
      hasError = true;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setEmailError("Formato de e-mail inválido.");
      setShakeEmail(true);
      hasError = true;
    }
    
    if (!password) {
      setPasswordError("Senha é obrigatória.");
      setShakePassword(true);
      hasError = true;
    } else if (password.length < 8) {
      setPasswordError("A senha deve ter pelo menos 8 caracteres.");
      setShakePassword(true);
      hasError = true;
    } else if (!/[A-Z]/.test(password)) {
      setPasswordError("A senha deve conter pelo menos uma letra maiúscula.");
      setShakePassword(true);
      hasError = true;
    } else if (!/[a-z]/.test(password)) {
      setPasswordError("A senha deve conter pelo menos uma letra minúscula.");
      setShakePassword(true);
      hasError = true;
    } else if (!/[0-9]/.test(password)) {
      setPasswordError("A senha deve conter pelo menos um número.");
      setShakePassword(true);
      hasError = true;
    }

    if (hasError) {
      setTimeout(() => {
        setShakeName(false);
        setShakeEmail(false);
        setShakePassword(false);
      }, 500);
      return;
    }

    setLoading(true);
    try {
      const response = await register({
        name,
        email,
        password,
        role: ROLE_MAP[profile],
      });
      if (response.success) {
        const accessToken = response.accessToken ?? "";
        localStorage.setItem("accessToken", accessToken);
        localStorage.setItem("refreshToken", response.refreshToken ?? "");

        try {
          if (response.role === "Patient") {
            await createPatient(accessToken);
          } else if (response.role === "Nutritionist") {
            await createNutritionist(accessToken);
          }
        } catch {
          enqueueSnackbar("Conta criada, mas houve um erro ao configurar o perfil. Tente novamente mais tarde.", { variant: "warning" });
        }

        enqueueSnackbar("Conta criada com sucesso!", { variant: "success" });
        navigate("/onboarding");
      } else {
        response.errors.forEach(err => {
          enqueueSnackbar(translateError(err), { variant: "error" });
        });
      }
    } catch (error) {
      if (isAxiosError(error) && error.response?.data?.errors) {
        error.response.data.errors.forEach((err: string) => {
          enqueueSnackbar(translateError(err), { variant: "error" });
        });
      } else if (isAxiosError(error) && error.response?.data?.message) {
        enqueueSnackbar(translateError(error.response.data.message), { variant: "error" });
      } else {
        enqueueSnackbar("Não foi possível conectar ao servidor. Tente novamente.", { variant: "error" });
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <AuthLayout>
      <Typography
        sx={{
          fontFamily: '"DM Sans", sans-serif',
          fontWeight: 800,
          fontSize: "1.75rem",
          color: theme.palette.typography.mainText,
          mb: 0.5,
        }}
      >
        Criar conta
      </Typography>
      <Typography
        sx={{
          fontFamily: '"DM Sans", sans-serif',
          fontSize: "0.9rem",
          color: theme.palette.typography.secondaryText,
          mb: 4,
        }}
      >
        Grátis, sem cartão de crédito
      </Typography>

      <Typography sx={{ ...labelSx, color: labelSx.color }}>Nome de usuário</Typography>
      <OutlinedInput
        fullWidth
        placeholder="Seu nome"
        value={name}
        onChange={(e) => {
          setName(e.target.value);
          if (nameError) setNameError("");
        }}
        error={!!nameError}
        sx={{ 
          ...inputSx, 
          mb: nameError ? 0.5 : 2.5,
          animation: shakeName ? "shake 0.4s" : "none",
        }}
      />
      {nameError && (
        <Typography sx={{ color: theme.palette.error.main, fontSize: "0.75rem", fontFamily: '"DM Sans", sans-serif', mb: 2 }}>
          {nameError}
        </Typography>
      )}

      <Typography sx={{ ...labelSx, color: labelSx.color }}>E-mail</Typography>
      <OutlinedInput
        fullWidth
        placeholder="seu@email.com"
        type="email"
        value={email}
        onChange={(e) => {
          setEmail(e.target.value);
          if (emailError) setEmailError("");
        }}
        error={!!emailError}
        sx={{ 
          ...inputSx, 
          mb: emailError ? 0.5 : 2.5,
          animation: shakeEmail ? "shake 0.4s" : "none",
        }}
      />
      {emailError && (
        <Typography sx={{ color: theme.palette.error.main, fontSize: "0.75rem", fontFamily: '"DM Sans", sans-serif', mb: 2 }}>
          {emailError}
        </Typography>
      )}

      <Typography sx={{ ...labelSx, color: labelSx.color }}>Senha</Typography>
      <OutlinedInput
        fullWidth
        placeholder="Mínimo de 8 caracteres"
        type={showPassword ? "text" : "password"}
        value={password}
        onChange={(e) => {
          setPassword(e.target.value);
          if (passwordError) setPasswordError("");
        }}
        error={!!passwordError}
        sx={{ 
          ...inputSx, 
          mb: passwordError ? 0.5 : 2.5,
          animation: shakePassword ? "shake 0.4s" : "none",
        }}
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
      {passwordError && (
        <Typography sx={{ color: theme.palette.error.main, fontSize: "0.75rem", fontFamily: '"DM Sans", sans-serif', mb: 2 }}>
          {passwordError}
        </Typography>
      )}

      <Typography sx={labelSx}>Perfil</Typography>
      <Select
        fullWidth
        value={profile}
        onChange={(e) => setProfile(e.target.value)}
        input={<OutlinedInput />}
        sx={{
          bgcolor: theme.palette.neutral.textFieldBg,
          borderRadius: "12px",
          mb: 4,
          "& fieldset": { border: "none" },
          "&.Mui-focused fieldset": {
            border: `1.5px solid ${theme.palette.brand.main} !important`,
          },
          "& .MuiSelect-select": {
            fontFamily: '"DM Sans", sans-serif',
            fontSize: "0.92rem",
            fontWeight: 500,
            color: theme.palette.typography.mainText,
            py: 1.5,
            px: 2,
          },
        }}
      >
        <MenuItem
          value="PACIENTE"
          sx={{ fontFamily: '"DM Sans", sans-serif', fontSize: "0.92rem" }}
        >
          Paciente
        </MenuItem>
        <MenuItem
          value="NUTRICIONISTA"
          sx={{ fontFamily: '"DM Sans", sans-serif', fontSize: "0.92rem" }}
        >
          Nutricionista
        </MenuItem>
      </Select>

      <Button
        fullWidth
        disabled={loading}
        onClick={handleRegister}
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
          "&:disabled": { opacity: 0.7 },
        }}
      >
        {loading ? (
          <CircularProgress size={22} sx={{ color: "#fff" }} />
        ) : (
          "Continuar →"
        )}
      </Button>

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

      <Button
        fullWidth
        onClick={() => navigate("/login")}
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
        Já tenho conta
      </Button>
    </AuthLayout>
  );
}
