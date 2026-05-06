import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
import GroupIcon from "@mui/icons-material/GroupOutlined";
import MailOutlineIcon from "@mui/icons-material/EmailOutlined";
import PersonAddIcon from "@mui/icons-material/PersonAddOutlined";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import IconButton from "@mui/material/IconButton";
import Skeleton from "@mui/material/Skeleton";
import Typography from "@mui/material/Typography";
import { alpha, useTheme } from "@mui/material/styles";
import { isAxiosError } from "axios";
import { useSnackbar } from "notistack";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import SectionCard from "../../../components/SectionCard";
import { acceptTrackingRequest, rejectTrackingRequest } from "../../../lib/api/clinic.service";
import { useMyInvitations } from "../../../hooks/useMyInvitations";
import { useMyPatients } from "../../../hooks/useMyPatients";
import { useTopbar } from "../../../hooks/useTopbar";
import { useTrackingRequests } from "../../../hooks/useTrackingRequests";

export default function NutritionistDashboardPage() {
  const theme = useTheme();
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const { patients, refetch: refetchPatients } = useMyPatients();
  const { invitations } = useMyInvitations();
  const { requests, loading: requestsLoading, refetch: refetchRequests } = useTrackingRequests();

  useTopbar("Dashboard");

  const pendingInvitations = invitations.filter((i) => i.status === "Pending");

  const handleRespond = async (requestId: string, accept: boolean, patientName: string) => {
    const token = localStorage.getItem("accessToken") ?? "";
    try {
      const res = accept
        ? await acceptTrackingRequest(requestId, token)
        : await rejectTrackingRequest(requestId, token);

      if (res.success) {
        enqueueSnackbar(
          accept
            ? `${patientName} foi vinculado com sucesso!`
            : `Solicitação de ${patientName} recusada.`,
          { variant: accept ? "success" : "info" }
        );
        refetchRequests();
        if (accept) refetchPatients();
      } else {
        enqueueSnackbar(res.message ?? "Erro ao processar solicitação.", { variant: "error" });
      }
    } catch (err) {
      const msg = isAxiosError(err) ? (err.response?.data?.message ?? null) : null;
      enqueueSnackbar(msg ?? "Erro ao processar solicitação.", { variant: "error" });
    }
  };

  return (
    <Box>
      <Box sx={{ mb: { xs: 2, md: 3 }, display: { xs: "none", md: "block" } }}>
        <Typography sx={{ fontSize: "1.4rem", fontWeight: 700, color: theme.palette.typography.mainText, mb: 0.5 }}>
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
        <StatCard
          label="Solicitações"
          value={requests.length}
          icon={<PersonAddIcon sx={{ fontSize: "1.4rem", color: theme.palette.brand.main }} />}
        />
      </Box>

      <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", lg: "1fr 1fr" }, gap: 2 }}>
        {/* Solicitações de acompanhamento */}
        <SectionCard title="Solicitações de acompanhamento">
          {requestsLoading ? (
            [0, 1].map((i) => (
              <Skeleton key={i} variant="rounded" height={56} sx={{ borderRadius: "10px", mb: 1, bgcolor: theme.palette.neutral.altTempBackground }} />
            ))
          ) : requests.length === 0 ? (
            <Typography sx={{ fontSize: "0.82rem", color: theme.palette.typography.secondaryCardText, py: 2, textAlign: "center" }}>
              Nenhuma solicitação pendente.
            </Typography>
          ) : (
            requests.map((req) => (
              <TrackingRequestRow
                key={req.id}
                request={req}
                onRespond={handleRespond}
              />
            ))
          )}
        </SectionCard>

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
                onClick={() => navigate(`/nutritionist/patients/${p.id}`)}
              >
                <Box
                  sx={{
                    width: 34, height: 34, borderRadius: "50%",
                    bgcolor: alpha(theme.palette.brand.main, 0.12),
                    display: "flex", alignItems: "center", justifyContent: "center",
                    fontSize: "0.82rem", fontWeight: 700, color: theme.palette.brand.main, flexShrink: 0,
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
      </Box>
    </Box>
  );
}

function TrackingRequestRow({
  request,
  onRespond,
}: {
  request: { id: string; patientName: string; patientEmail: string; createdAt: string };
  onRespond: (id: string, accept: boolean, name: string) => Promise<void>;
}) {
  const theme = useTheme();
  const [accepting, setAccepting] = useState(false);
  const [rejecting, setRejecting] = useState(false);

  const respond = async (accept: boolean) => {
    if (accept) setAccepting(true); else setRejecting(true);
    await onRespond(request.id, accept, request.patientName);
    setAccepting(false);
    setRejecting(false);
  };

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        gap: 1.5,
        p: 1.25,
        borderRadius: "10px",
        mb: 0.75,
        bgcolor: theme.palette.neutral.background,
      }}
    >
      <Box
        sx={{
          width: 34, height: 34, borderRadius: "50%",
          bgcolor: alpha(theme.palette.brand.main, 0.12),
          display: "flex", alignItems: "center", justifyContent: "center",
          fontSize: "0.82rem", fontWeight: 700, color: theme.palette.brand.main, flexShrink: 0,
        }}
      >
        {request.patientName.slice(0, 1).toUpperCase()}
      </Box>
      <Box sx={{ flex: 1, minWidth: 0 }}>
        <Typography sx={{ fontSize: "0.82rem", fontWeight: 600, color: theme.palette.typography.mainText }}>
          {request.patientName}
        </Typography>
        <Typography sx={{ fontSize: "0.7rem", color: theme.palette.typography.secondaryCardText }}>
          {new Date(request.createdAt).toLocaleDateString("pt-BR")}
        </Typography>
      </Box>
      <Box sx={{ display: "flex", gap: 0.5 }}>
        <IconButton
          size="small"
          disabled={accepting || rejecting}
          onClick={() => respond(true)}
          sx={{
            bgcolor: alpha(theme.palette.brand.main, 0.1),
            color: theme.palette.brand.main,
            "&:hover": { bgcolor: alpha(theme.palette.brand.main, 0.2) },
            width: 32, height: 32,
          }}
        >
          {accepting ? <CircularProgress size={14} color="inherit" /> : <CheckIcon sx={{ fontSize: "1rem" }} />}
        </IconButton>
        <IconButton
          size="small"
          disabled={accepting || rejecting}
          onClick={() => respond(false)}
          sx={{
            bgcolor: alpha(theme.palette.error.main, 0.08),
            color: theme.palette.error.main,
            "&:hover": { bgcolor: alpha(theme.palette.error.main, 0.16) },
            width: 32, height: 32,
          }}
        >
          {rejecting ? <CircularProgress size={14} color="inherit" /> : <CloseIcon sx={{ fontSize: "1rem" }} />}
        </IconButton>
      </Box>
    </Box>
  );
}

function StatCard({ label, value, icon, onClick }: { label: string; value: number; icon: React.ReactNode; onClick?: () => void }) {
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
      <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", mb: 1 }}>{icon}</Box>
      <Typography sx={{ fontSize: "1.8rem", fontWeight: 700, color: theme.palette.typography.mainText }}>
        {value}
      </Typography>
      <Typography sx={{ fontSize: "0.78rem", color: theme.palette.typography.secondaryText, mt: 0.25 }}>
        {label}
      </Typography>
    </Box>
  );
}
