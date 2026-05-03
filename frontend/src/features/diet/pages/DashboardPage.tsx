import RestaurantIcon from "@mui/icons-material/RestaurantOutlined";
import ScaleIcon from "@mui/icons-material/MonitorWeightOutlined";
import SearchIcon from "@mui/icons-material/Search";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { alpha, useTheme } from "@mui/material/styles";
import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import SectionCard from "../../../components/SectionCard";
import { useDailyDiet } from "../../../hooks/useDailyDiet";
import { useProfile } from "../../../hooks/useProfile";
import { useTopbar } from "../../../hooks/useTopbar";
import { todayIso } from "../../../utils/format";
import WeightLogModal from "../../profile/components/WeightLogModal";
import DateNav from "../components/DateNav";
import MacroBar from "../components/MacroBar";
import MealRow from "../components/MealRow";
import ProgressRing from "../components/ProgressRing";
import StatCard from "../components/StatCard";

export default function DashboardPage() {
  const theme = useTheme();
  const navigate = useNavigate();
  const [date, setDate] = useState(todayIso);
  const [weightModalOpen, setWeightModalOpen] = useState(false);
  const { diet } = useDailyDiet(date);
  const { profile } = useProfile();

  useTopbar(
    "Dieta",
    useMemo(() => <DateNav value={date} onChange={setDate} />, [date]),
  );

  if (!diet) return null;

  const waterRemaining = Math.max(0, diet.waterGoalMl - diet.waterMl);
  const caloriesRemaining = Math.max(
    0,
    diet.caloriesGoal - diet.caloriesConsumed,
  );
  const overallProgress =
    diet.caloriesGoal > 0
      ? Math.round((diet.caloriesConsumed / diet.caloriesGoal) * 100)
      : 0;

  return (
    <Box>
      {/* Header */}
      <Box sx={{ mb: { xs: 2, md: 3 } }}>
        <Typography
          sx={{
            fontSize: { xs: "1.2rem", md: "1.4rem" },
            fontWeight: 700,
            color: theme.palette.typography.mainText,
            mb: 0.5,
          }}
        >
          Olá, {profile?.fullName.split(" ")[0] ?? "—"} 👋
        </Typography>
        <Typography
          sx={{
            fontSize: "0.82rem",
            color: theme.palette.typography.secondaryText,
          }}
        >
          Acompanhe sua ingestão de hoje.
        </Typography>
      </Box>

      {/* Stats top row */}
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: {
            xs: "minmax(0, 1fr) minmax(0, 1fr)",
            md: "repeat(3, minmax(0, 1fr))",
          },
          gap: { xs: 1.25, md: 2 },
          mb: 2,
        }}
      >
        <StatCard
          label="Água"
          value={waterRemaining}
          unit="ml restando"
          subtitle={`Meta: ${diet.waterGoalMl} ml`}
          progress={(diet.waterMl / diet.waterGoalMl) * 100}
        />
        <StatCard
          label="Calorias"
          value={caloriesRemaining}
          unit="Cal restando"
          subtitle={`Meta: ${diet.caloriesGoal} Cal`}
          progress={(diet.caloriesConsumed / diet.caloriesGoal) * 100}
        />
        <Box sx={{ gridColumn: { xs: "span 2", md: "auto" } }}>
          <StatCard
            label="Progresso hoje"
            value={`${overallProgress}%`}
            subtitle="da meta diária atingida"
            progress={overallProgress}
            highlight
          />
        </Box>
      </Box>

      {/* Macros + Quick actions */}
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: { xs: "1fr", md: "2fr 1fr" },
          gap: 2,
          mb: 2,
        }}
      >
        <SectionCard
          title="Macronutrientes"
          action={
            <Box
              sx={{
                px: 1.25,
                py: 0.4,
                borderRadius: "99px",
                bgcolor: theme.palette.neutral.altTempBackground,
                color: theme.palette.brand.main,
                fontSize: "0.66rem",
                fontWeight: 600,
              }}
            >
              Hoje
            </Box>
          }
        >
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              gap: 2,
            }}
          >
            <MacroBar
              label="Carboidrato"
              value={diet.macros.carbs}
              goal={diet.macrosGoal.carbs}
            />
            <MacroBar
              label="Proteína"
              value={diet.macros.protein}
              goal={diet.macrosGoal.protein}
            />
            <MacroBar
              label="Gordura"
              value={diet.macros.fat}
              goal={diet.macrosGoal.fat}
            />
          </Box>
        </SectionCard>

        <SectionCard
          title="Ações rápidas"
          highlight
          titleColor={alpha("#fff", 0.6)}
          sx={{ display: { xs: "none", md: "block" } }}
        >
          <QuickActionButton
            icon={<RestaurantIcon sx={{ fontSize: "1.1rem" }} />}
            onClick={() => navigate("/meal")}
          >
            Editar refeição
          </QuickActionButton>
          <QuickActionButton
            icon={<SearchIcon sx={{ fontSize: "1.1rem" }} />}
            onClick={() => navigate("/food-search")}
          >
            Buscar alimento
          </QuickActionButton>
          <QuickActionButton
            icon={<ScaleIcon sx={{ fontSize: "1.1rem" }} />}
            onClick={() => setWeightModalOpen(true)}
          >
            Registrar peso
          </QuickActionButton>
        </SectionCard>
      </Box>

      {/* Meals list */}
      <SectionCard
        title="Refeições de hoje"
        action={
          <Typography
            onClick={() => navigate("/meal")}
            sx={{
              fontSize: "0.74rem",
              fontWeight: 600,
              color: theme.palette.brand.main,
              cursor: "pointer",
            }}
          >
            Ver todas →
          </Typography>
        }
      >
        {diet.meals.map((meal, idx) => (
          <MealRow
            key={meal.id}
            meal={meal}
            isLast={idx === diet.meals.length - 1}
            onEdit={() => navigate("/meal")}
          />
        ))}
      </SectionCard>

      <WeightLogModal
        open={weightModalOpen}
        onClose={() => setWeightModalOpen(false)}
      />
    </Box>
  );
}

function QuickActionButton({
  icon,
  children,
  onClick,
}: {
  icon: React.ReactNode;
  children: React.ReactNode;
  onClick: () => void;
}) {
  return (
    <Button
      fullWidth
      onClick={onClick}
      startIcon={icon}
      sx={{
        justifyContent: "flex-start",
        gap: 1,
        bgcolor: alpha("#fff", 0.15),
        color: "#fff",
        borderRadius: "12px",
        py: 1.4,
        px: 2,
        mb: 1,
        fontSize: "0.82rem",
        fontWeight: 600,
        textTransform: "none",
        fontFamily: '"DM Sans", sans-serif',
        "&:hover": { bgcolor: alpha("#fff", 0.25) },
        "&:last-child": { mb: 0 },
      }}
    >
      {children}
    </Button>
  );
}
