import EditIcon from "@mui/icons-material/Edit";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { alpha, useTheme } from "@mui/material/styles";
import type { Meal } from "../../../../types/diet";

interface MealRowProps {
  meal: Meal;
  onEdit?: () => void;
  isLast?: boolean;
}

export default function MealRow({
  meal,
  onEdit,
  isLast = false,
}: MealRowProps) {
  const theme = useTheme();
  const progress =
    meal.targetCalories > 0
      ? Math.min(100, (meal.consumedCalories / meal.targetCalories) * 100)
      : 0;
  const trackBg =
    theme.palette.mode === "light"
      ? theme.palette.neutral.altTempBackground
      : alpha(theme.palette.brand.main, 0.18);

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        gap: 2,
        py: 1.75,
        borderBottom: isLast ? "none" : `1px solid ${theme.palette.divider}`,
        pb: isLast ? 0 : 1.75,
      }}
    >
      <Box
        sx={{
          width: 40,
          height: 40,
          borderRadius: "12px",
          bgcolor: theme.palette.neutral.altTempBackground,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: "1.1rem",
          flexShrink: 0,
        }}
      >
        {meal.icon}
      </Box>
      <Box sx={{ flex: 1, minWidth: 0 }}>
        <Typography
          sx={{
            fontSize: "0.88rem",
            fontWeight: 600,
            color: theme.palette.typography.mainText,
            mb: 0.5,
          }}
        >
          {meal.name}
        </Typography>
        <Box
          sx={{
            height: 4,
            borderRadius: "99px",
            bgcolor: trackBg,
            overflow: "hidden",
            mb: 0.5,
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
        <Box sx={{ display: "flex", gap: 1.5 }}>
          <MacroLabel label="Carb" value={`${meal.macros.carbs}g`} />
          <MacroLabel label="Prot" value={`${meal.macros.protein}g`} />
          <MacroLabel label="Fat" value={`${meal.macros.fat}g`} />
        </Box>
      </Box>
      <Box sx={{ textAlign: "right", flexShrink: 0 }}>
        <Typography
          sx={{
            fontSize: "0.92rem",
            fontWeight: 700,
            color: theme.palette.brand.main,
          }}
        >
          {meal.consumedCalories}
        </Typography>
        <Typography
          sx={{
            fontSize: "0.68rem",
            color: theme.palette.typography.secondaryCardText,
          }}
        >
          / {meal.targetCalories} cal
        </Typography>
      </Box>
      <IconButton
        onClick={onEdit}
        sx={{
          width: 34,
          height: 34,
          borderRadius: "50%",
          bgcolor: theme.palette.brand.main,
          color: "#fff",
          flexShrink: 0,
          "&:hover": { bgcolor: theme.palette.brand.hoverItem },
        }}
      >
        <EditIcon sx={{ fontSize: "0.88rem" }} />
      </IconButton>
    </Box>
  );
}

function MacroLabel({ label, value }: { label: string; value: string }) {
  const theme = useTheme();
  return (
    <Typography
      sx={{
        fontSize: "0.66rem",
        color: theme.palette.typography.secondaryCardText,
      }}
    >
      <Box
        component="span"
        sx={{ color: theme.palette.typography.secondaryText, fontWeight: 500 }}
      >
        {label}:
      </Box>{" "}
      {value}
    </Typography>
  );
}
