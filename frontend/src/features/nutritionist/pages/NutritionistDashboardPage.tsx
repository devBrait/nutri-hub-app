import GroupIcon from "@mui/icons-material/GroupOutlined";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { alpha, useTheme } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import SectionCard from "../../../components/SectionCard";
import { useMyInvitations } from "../../../hooks/useMyInvitations";
import { useMyPatients } from "../../../hooks/useMyPatients";
import { useTopbar } from "../../../hooks/useTopbar";

export default function NutritionistDashboardPage() {
  const theme = useTheme();
  const navigate = useNavigate();
  const { patients } = useMyPatients();
  const { invitations } = useMyInvitations();

  useTopbar("Dashboard");

  const pendingInvitations = invitations.filter((i) => i.status === "Pending");

  return (
    <Box>
      <Box sx={{ mb: { xs: 2, md: 3 }, display: { xs: "none", md: "block" } }}>
        <Typography
          sx={{ fontSize: "1.4rem", fontWeight: 700, color: theme.palette.typography.mainText, mb: 0.5 }}
        >
          Bem-vindo ao NutriHub
        </Typography>
        <Typography sx={{ fontSize: "0.82rem", color: theme.palette.typography.secondaryText }}>
          Gerencie seus pacientes e acompanhe seu consultório.
        </Typography>
      </Box>

      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: { xs: "1fr 1fr", md: "repeat(3, 1fr)" },
          gap: 2,
          mb: 2,
        }}
      >
        <StatCard
          label="Pacientes"
          value={patients.length}
          icon={<GroupIcon sx={{ fontSize: "1.4rem", color: theme.palette.brand.main }} />}
          onClick={() => navigate("/nutritionist/patients")}
        />
        <StatCard
          label="Convites pendentes"
          value={pendingInvitations.length}
          icon={<MailOutlineIcon sx={{ fontSize: "1.4rem", color: theme.palette.brand.main }} />}
          onClick={() => navigate("/nutritionist/invitations")}
        />
      </Box>

      <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", lg: "1fr 1fr" }, gap: 2 }}>
        <SectionCard
          title="Pacientes recentes"
          action={
            <Typography
              onClick={() => navigate("/nutritionist/patients")}
              sx={{ fontSize: "0.74rem", fontWeight: 600, color: theme.palette.brand.main, cursor: "pointer" }}
            >
              Ver todos
            </Typography>
          }
        >
          {patients.length === 0 ? (
            <Typography sx={{ fontSize: "0.82rem", color: theme.palette.typography.secondaryCardText, py: 2, textAlign: "center" }}>
              Nenhum paciente vinculado ainda.
            </Typography>
          ) : (
            patients.slice(0, 5).map((p) => (
              <Box
                key={p.id}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 1.5,
                  p: 1.25,
                  borderRadius: "10px",
                  mb: 0.75,
                  bgcolor: theme.palette.neutral.background,
                  cursor: "pointer",
                  "&:hover": { bgcolor: alpha(theme.palette.brand.main, 0.06) },
                }}
                onClick={() => navigate("/nutritionist/patients")}
              >
                <Box
                  sx={{
                    width: 34,
                    height: 34,
                    borderRadius: "50%",
                    bgcolor: alpha(theme.palette.brand.main, 0.12),
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "0.82rem",
                    fontWeight: 700,
                    color: theme.palette.brand.main,
                    flexShrink: 0,
                  }}
                >
                  {p.name.slice(0, 1).toUpperCase()}
                </Box>
                <Box>
                  <Typography sx={{ fontSize: "0.82rem", fontWeight: 600, color: theme.palette.typography.mainText }}>
                    {p.name}
                  </Typography>
                  <Typography sx={{ fontSize: "0.72rem", color: theme.palette.typography.secondaryCardText }}>
                    {p.email}
                  </Typography>
                </Box>
              </Box>
            ))
          )}
        </SectionCard>

        <SectionCard
          title="Convites recentes"
          action={
            <Typography
              onClick={() => navigate("/nutritionist/invitations")}
              sx={{ fontSize: "0.74rem", fontWeight: 600, color: theme.palette.brand.main, cursor: "pointer" }}
            >
              Gerenciar
            </Typography>
          }
        >
          {invitations.length === 0 ? (
            <Typography sx={{ fontSize: "0.82rem", color: theme.palette.typography.secondaryCardText, py: 2, textAlign: "center" }}>
              Nenhum convite enviado ainda.
            </Typography>
          ) : (
            invitations.slice(0, 5).map((inv) => (
              <Box
                key={inv.id}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  p: 1.25,
                  borderRadius: "10px",
                  mb: 0.75,
                  bgcolor: theme.palette.neutral.background,
                }}
              >
                <Typography sx={{ fontSize: "0.82rem", color: theme.palette.typography.mainText }}>
                  {inv.email}
                </Typography>
                <StatusBadge status={inv.status} />
              </Box>
            ))
          )}
        </SectionCard>
      </Box>
    </Box>
  );
}

function StatCard({
  label,
  value,
  icon,
  onClick,
}: {
  label: string;
  value: number;
  icon: React.ReactNode;
  onClick?: () => void;
}) {
  const theme = useTheme();
  return (
    <Box
      onClick={onClick}
      sx={{
        bgcolor: theme.palette.neutral.card,
        border: `1px solid ${theme.palette.divider}`,
        borderRadius: "16px",
        p: { xs: 2, md: 2.5 },
        cursor: onClick ? "pointer" : "default",
        "&:hover": onClick ? { borderColor: theme.palette.brand.main } : {},
        transition: "border-color 0.15s",
      }}
    >
      <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", mb: 1 }}>
        {icon}
      </Box>
      <Typography sx={{ fontSize: "1.8rem", fontWeight: 700, color: theme.palette.typography.mainText }}>
        {value}
      </Typography>
      <Typography sx={{ fontSize: "0.78rem", color: theme.palette.typography.secondaryText, mt: 0.25 }}>
        {label}
      </Typography>
    </Box>
  );
}

function StatusBadge({ status }: { status: "Pending" | "Accepted" | "Expired" }) {
  const theme = useTheme();
  const config = {
    Pending: { label: "Pendente", color: "#f59e0b" },
    Accepted: { label: "Aceito", color: theme.palette.brand.main },
    Expired: { label: "Expirado", color: theme.palette.typography.secondaryCardText },
  }[status];

  return (
    <Box
      sx={{
        px: 1.25,
        py: 0.3,
        borderRadius: "99px",
        fontSize: "0.66rem",
        fontWeight: 600,
        bgcolor: alpha(config.color, 0.12),
        color: config.color,
      }}
    >
      {config.label}
    </Box>
  );
}
