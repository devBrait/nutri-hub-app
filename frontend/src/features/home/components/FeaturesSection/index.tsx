import type { SvgIconComponent } from "@mui/icons-material";
import BarChartIcon from "@mui/icons-material/BarChart";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import HealthAndSafetyIcon from "@mui/icons-material/HealthAndSafety";
import RestaurantMenuIcon from "@mui/icons-material/RestaurantMenu";
import TrackChangesIcon from "@mui/icons-material/TrackChanges";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { alpha, useTheme } from "@mui/material/styles";
import { useInView } from "../../../../hooks/useInView";

interface Feature {
  Icon: SvgIconComponent;
  title: string;
  desc: string;
}

const FEATURES: Feature[] = [
  {
    Icon: RestaurantMenuIcon,
    title: "Registro de Refeições",
    desc: "Adicione o que você come de forma rápida com busca inteligente por alimentos e porções.",
  },
  {
    Icon: BarChartIcon,
    title: "Acompanhamento de Macros",
    desc: "Visualize proteínas, carboidratos e gorduras em tempo real com gráficos intuitivos.",
  },
  {
    Icon: HealthAndSafetyIcon,
    title: "Conexão com Nutricionista",
    desc: "Fique em contato direto com seu nutricionista pelo próprio app, sem complicações.",
  },
  {
    Icon: CalendarMonthIcon,
    title: "Planos Alimentares",
    desc: "Receba planos personalizados conforme seus objetivos, restrições e preferências.",
  },
  {
    Icon: TrendingUpIcon,
    title: "Relatórios de Evolução",
    desc: "Acompanhe seu progresso com histórico detalhado e tendências ao longo do tempo.",
  },
  {
    Icon: TrackChangesIcon,
    title: "Metas Personalizadas",
    desc: "Defina e monitore suas metas de saúde com lembretes e feedbacks automáticos.",
  },
];

export default function FeaturesSection() {
  const theme = useTheme();
  const { ref: headerRef, inView: headerInView } = useInView();
  const { ref: gridRef, inView: gridInView } = useInView(0.05);

  const fadeIn = (delay: string, inView: boolean) => ({
    opacity: inView ? 1 : 0,
    transform: inView ? "translateY(0)" : "translateY(28px)",
    transition: `opacity 0.65s ease ${delay}, transform 0.65s ease ${delay}`,
  });

  return (
    <Box
      id="funcionalidades"
      sx={{
        bgcolor: theme.palette.neutral.card,
        px: { xs: 4, md: 10 },
        py: { xs: 7, md: 10 },
      }}
    >
      <Box
        ref={headerRef}
        sx={{ textAlign: "center", mb: 7, ...fadeIn("0s", headerInView) }}
      >
        <Box
          sx={{
            display: "inline-flex",
            alignItems: "center",
            bgcolor: alpha(theme.palette.brand.main, 0.08),
            border: `1px solid ${alpha(theme.palette.brand.main, 0.18)}`,
            borderRadius: "20px",
            px: 2,
            py: 0.6,
            mb: 2.5,
          }}
        >
          <Typography
            sx={{
              fontFamily: '"DM Sans", sans-serif',
              fontSize: "0.78rem",
              fontWeight: 600,
              color: theme.palette.brand.main,
              letterSpacing: "0.04em",
              textTransform: "uppercase",
            }}
          >
            Funcionalidades
          </Typography>
        </Box>
        <Typography
          sx={{
            fontFamily: '"DM Sans", sans-serif',
            fontWeight: 800,
            fontSize: { xs: "2.2rem", md: "2.8rem" },
            color: theme.palette.typography.mainText,
            lineHeight: 1.15,
            mb: 1.5,
          }}
        >
          Tudo o que você precisa,
          <br />
          <Box
            component="span"
            sx={{ color: theme.palette.brand.main, fontWeight: 300 }}
          >
            em um só lugar.
          </Box>
        </Typography>
        <Typography
          sx={{
            fontFamily: '"DM Sans", sans-serif',
            fontSize: "0.95rem",
            color: theme.palette.typography.secondaryText,
            maxWidth: "440px",
            mx: "auto",
            lineHeight: 1.7,
          }}
        >
          Ferramentas pensadas para facilitar sua jornada nutricional do início
          ao fim.
        </Typography>
      </Box>

      <Box
        ref={gridRef}
        sx={{
          display: "grid",
          gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr", md: "1fr 1fr 1fr" },
          gap: 3,
        }}
      >
        {FEATURES.map(({ Icon, title, desc }, i) => (
          <Box
            key={title}
            sx={{
              ...fadeIn(`${i * 0.08}s`, gridInView),
              bgcolor: theme.palette.neutral.card,
              border: `1px solid ${alpha(theme.palette.brand.main, 0.1)}`,
              borderRadius: "20px",
              p: 3.5,
              cursor: "default",
              transition:
                "transform 0.25s ease, box-shadow 0.25s ease, border-color 0.25s ease, opacity 0.65s ease",
              "&:hover": {
                transform: "translateY(-4px)",
                boxShadow: `0 12px 36px ${alpha(theme.palette.brand.main, 0.12)}`,
                borderColor: alpha(theme.palette.brand.main, 0.25),
              },
            }}
          >
            <Box
              sx={{
                width: 48,
                height: 48,
                bgcolor: alpha(theme.palette.brand.main, 0.08),
                borderRadius: "14px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                mb: 2.5,
              }}
            >
              <Icon
                sx={{ color: theme.palette.brand.main, fontSize: "1.4rem" }}
              />
            </Box>
            <Typography
              sx={{
                fontFamily: '"DM Sans", sans-serif',
                fontWeight: 700,
                fontSize: "1rem",
                color: theme.palette.typography.mainText,
                mb: 1,
              }}
            >
              {title}
            </Typography>
            <Typography
              sx={{
                fontFamily: '"DM Sans", sans-serif',
                fontSize: "0.875rem",
                color: theme.palette.typography.secondaryText,
                lineHeight: 1.65,
              }}
            >
              {desc}
            </Typography>
          </Box>
        ))}
      </Box>
    </Box>
  );
}
