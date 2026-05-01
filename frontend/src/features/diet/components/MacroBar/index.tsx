import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { alpha, useTheme } from "@mui/material/styles";

interface MacroBarProps {
  label: string;
  value: number;
  goal: number;
  unit?: string;
}

export default function MacroBar({
  label,
  value,
  goal,
  unit = "g",
}: MacroBarProps) {
  const theme = useTheme();
  const progress = goal > 0 ? Math.min(100, (value / goal) * 100) : 0;
  const trackBg =
    theme.palette.mode === "light"
      ? theme.palette.neutral.altTempBackground
      : alpha(theme.palette.brand.main, 0.18);

  return (
    <Box>
      <Typography
        sx={{
          fontSize: "0.66rem",
          fontWeight: 600,
          color: theme.palette.typography.secondaryCardText,
          textTransform: "uppercase",
          letterSpacing: "0.05em",
          mb: 0.5,
        }}
      >
        {label}
      </Typography>
      <Typography
        sx={{
          fontSize: "0.92rem",
          fontWeight: 700,
          color: theme.palette.typography.mainText,
          mb: 0.75,
        }}
      >
        {value}
        {unit}{" "}
        <Box
          component="span"
          sx={{
            fontSize: "0.74rem",
            fontWeight: 400,
            color: theme.palette.typography.secondaryCardText,
          }}
        >
          / {goal}
          {unit}
        </Box>
      </Typography>
      <Box
        sx={{
          height: 5,
          borderRadius: "99px",
          bgcolor: trackBg,
          overflow: "hidden",
        }}
      >
        <Box
          sx={{
            height: "100%",
            width: `${progress}%`,
            bgcolor: theme.palette.brand.main,
            borderRadius: "99px",
          }}
        />
      </Box>
    </Box>
  );
}
