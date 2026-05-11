import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import OutlinedInput from "@mui/material/OutlinedInput";
import { alpha, useTheme } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import { isAxiosError } from "axios";
import { useSnackbar } from "notistack";
import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { login, storeAuthData } from "../../../lib/api/auth.service";
import { translateError } from "../../../utils/errorTranslation";
import AuthLayout from "./AuthLayout";

export default function LoginForm() {
	const theme = useTheme();
	const navigate = useNavigate();
	const [searchParams] = useSearchParams();

	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [showPassword, setShowPassword] = useState(false);
	const [loading, setLoading] = useState(false);

	const { enqueueSnackbar } = useSnackbar();
	const [emailError, setEmailError] = useState("");
	const [passwordError, setPasswordError] = useState("");
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

	async function handleLogin() {
		setEmailError("");
		setPasswordError("");
		setShakeEmail(false);
		setShakePassword(false);

		let hasError = false;

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
		}

		if (hasError) {
			setTimeout(() => {
				setShakeEmail(false);
				setShakePassword(false);
			}, 500);
			return;
		}

		setLoading(true);
		try {
			const response = await login({ email, password });
			if (response.success) {
				storeAuthData(response.accessToken ?? "", response.refreshToken ?? "", response.role);
				const redirect = searchParams.get("redirect");
				const destination =
					redirect && response.role === "Patient"
						? redirect
						: response.role === "Nutritionist"
							? "/nutritionist/dashboard"
							: "/diet";
				navigate(destination);
			} else {
				response.errors.forEach((err) => {
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
				enqueueSnackbar("Não foi possível conectar ao servidor. Tente novamente.", {
					variant: "error",
				});
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
				<Typography
					sx={{
						color: theme.palette.error.main,
						fontSize: "0.75rem",
						fontFamily: '"DM Sans", sans-serif',
						mb: 2,
					}}
				>
					{emailError}
				</Typography>
			)}

			<Typography sx={{ ...labelSx, color: labelSx.color }}>Senha</Typography>
			<OutlinedInput
				fullWidth
				placeholder="Sua senha"
				type={showPassword ? "text" : "password"}
				value={password}
				onChange={(e) => {
					setPassword(e.target.value);
					if (passwordError) setPasswordError("");
				}}
				error={!!passwordError}
				sx={{
					...inputSx,
					mb: passwordError ? 0.5 : 1,
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
							{showPassword ? <VisibilityOff fontSize="small" /> : <Visibility fontSize="small" />}
						</IconButton>
					</InputAdornment>
				}
			/>
			{passwordError && (
				<Typography
					sx={{
						color: theme.palette.error.main,
						fontSize: "0.75rem",
						fontFamily: '"DM Sans", sans-serif',
						mb: 1,
					}}
				>
					{passwordError}
				</Typography>
			)}

			<Box sx={{ mb: 4 }} />

			<Button
				fullWidth
				disabled={loading}
				onClick={handleLogin}
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
				{loading ? <CircularProgress size={22} sx={{ color: "#fff" }} /> : "Entrar na conta"}
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
