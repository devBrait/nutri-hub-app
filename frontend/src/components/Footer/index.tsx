import CopyrightIcon from "@mui/icons-material/Copyright";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { alpha, useTheme } from "@mui/material/styles";
import logoLg from "../../assets/logo-lg.png";

export default function Footer() {
  const theme = useTheme();

  return (
    <Box
      component="footer"
      sx={{
        bgcolor: theme.palette.neutral.altTempBackground,
        borderTop: `1px solid ${alpha(theme.palette.brand.main, 0.12)}`,
        px: { xs: 4, md: 10 },
        mt: 8,
        py: 4,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 1.5,
      }}
    >
      <Box
        component="img"
        src={logoLg}
        alt="nutrihub"
        sx={{
          height: "22px",
          width: "auto",
          objectFit: "contain",
          userSelect: "none",
        }}
      />

      <Box
        sx={{
          width: "40px",
          height: "1px",
          bgcolor: alpha(theme.palette.brand.main, 0.2),
        }}
      />

      <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
        <CopyrightIcon
          sx={{ color: theme.palette.green.text3, fontSize: "0.85rem" }}
        />
        <Typography
          sx={{
            fontFamily: '"DM Sans", sans-serif',
            fontSize: "0.78rem",
            color: theme.palette.green.text3,
            fontWeight: 500,
            letterSpacing: "0.02em",
          }}
        >
          mackbot
        </Typography>
      </Box>
    </Box>
  );
}
