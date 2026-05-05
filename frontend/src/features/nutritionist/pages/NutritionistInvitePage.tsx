import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";
import IconButton from "@mui/material/IconButton";
import OutlinedInput from "@mui/material/OutlinedInput";
import Skeleton from "@mui/material/Skeleton";
import Tooltip from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";
import { alpha, useTheme } from "@mui/material/styles";
import { isAxiosError } from "axios";
import { useSnackbar } from "notistack";
import { useState } from "react";
import SectionCard from "../../../components/SectionCard";
import { useMyInvitations } from "../../../hooks/useMyInvitations";
import { useTopbar } from "../../../hooks/useTopbar";
import { invitePatient } from "../../../lib/api/clinic.service";

const FRONTEND_BASE_URL = window.location.origin;

export default function NutritionistInvitePage() {
  const theme = useTheme();
  const { enqueueSnackbar } = useSnackbar();
  const { invitations, loading, refetch } = useMyInvitations();
  const [email, setEmail] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [lastLink, setLastLink] = useState<string | null>(null);

  useTopbar("Convites");

  const handleInvite = async () => {
    if (!email.trim()) return;
    const token = localStorage.getItem("accessToken") ?? "";
    setSubmitting(true);
    try {
      const res = await invitePatient(email.trim(), FRONTEND_BASE_URL, token);
      if (res.success && res.output) {
        setLastLink(res.output.inviteLink);
        setEmail("");
        enqueueSnackbar("Convite criado com sucesso!", { variant: "success" });
        refetch();
      } else {
        enqueueSnackbar(res.message ?? "Não foi possível criar o convite.", { variant: "error" });
      }
    } catch (err) {
      const msg = isAxiosError(err) ? (err.response?.data?.message ?? null) : null;
      enqueueSnackbar(msg ?? "Não foi possível criar o convite.", { variant: "error" });
    } finally {
      setSubmitting(false);
    }
  };

  const copyLink = (link: string) => {
    navigator.clipboard.writeText(link);
    enqueueSnackbar("Link copiado!", { variant: "success" });
  };

  const statusConfig: Record<"Pending" | "Accepted" | "Expired", { label: string; color: string }> = {
    Pending: { label: "Pendente", color: "#f59e0b" },
    Accepted: { label: "Aceito", color: theme.palette.brand.main },
    Expired: { label: "Expirado", color: theme.palette.typography.secondaryCardText },
  };

  return (
    <Box>
      <Box sx={{ mb: { xs: 2, md: 3 }, display: { xs: "none", md: "block" } }}>
        <Typography sx={{ fontSize: "1.4rem", fontWeight: 700, color: theme.palette.typography.mainText, mb: 0.5 }}>
          Convidar Paciente
        </Typography>
        <Typography sx={{ fontSize: "0.82rem", color: theme.palette.typography.secondaryText }}>
          Envie um link de convite para vincular um paciente ao seu consultório.
        </Typography>
      </Box>

      <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", lg: "1fr 1fr" }, gap: 2 }}>
        <Box>
          <SectionCard title="Novo convite">
            <OutlinedInput
              fullWidth
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleInvite()}
              placeholder="email@paciente.com"
              sx={{
                borderRadius: "10px",
                mb: 1.5,
                "& input": { fontSize: "0.88rem", py: 1.25 },
                "& fieldset": { border: `1.5px solid ${theme.palette.divider}` },
                "&.Mui-focused fieldset": { border: `1.5px solid ${theme.palette.brand.main} !important` },
              }}
            />
            <Button
              fullWidth
              disabled={submitting || !email.trim()}
              onClick={handleInvite}
              sx={{
                bgcolor: theme.palette.brand.main,
                color: "#fff",
                borderRadius: "10px",
                py: 1.25,
                fontSize: "0.88rem",
                fontWeight: 600,
                textTransform: "none",
                "&:hover": { bgcolor: theme.palette.brand.hoverItem },
                "&.Mui-disabled": { opacity: 0.65 },
              }}
            >
              {submitting ? <CircularProgress size={20} sx={{ color: "#fff" }} /> : "Gerar link de convite"}
            </Button>

            {lastLink && (
              <Box
                sx={{
                  mt: 2,
                  p: 1.5,
                  borderRadius: "10px",
                  bgcolor: alpha(theme.palette.brand.main, 0.06),
                  border: `1px solid ${alpha(theme.palette.brand.main, 0.2)}`,
                }}
              >
                <Typography sx={{ fontSize: "0.72rem", color: theme.palette.brand.main, fontWeight: 600, mb: 0.75 }}>
                  Link gerado — compartilhe com o paciente:
                </Typography>
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  <Typography
                    sx={{
                      fontSize: "0.72rem",
                      color: theme.palette.typography.secondaryText,
                      wordBreak: "break-all",
                      flex: 1,
                    }}
                  >
                    {lastLink}
                  </Typography>
                  <Tooltip title="Copiar">
                    <IconButton size="small" onClick={() => copyLink(lastLink)}>
                      <ContentCopyIcon sx={{ fontSize: "0.9rem" }} />
                    </IconButton>
                  </Tooltip>
                </Box>
              </Box>
            )}
          </SectionCard>
        </Box>

        <SectionCard title="Histórico de convites" sx={{ alignSelf: "start" }}>
          {loading ? (
            [0, 1, 2].map((i) => (
              <Skeleton key={i} variant="rounded" height={52} sx={{ borderRadius: "10px", mb: 1 }} />
            ))
          ) : invitations.length === 0 ? (
            <Typography sx={{ fontSize: "0.82rem", color: theme.palette.typography.secondaryCardText, py: 2, textAlign: "center" }}>
              Nenhum convite enviado ainda.
            </Typography>
          ) : (
            invitations.map((inv) => {
              const cfg = statusConfig[inv.status] ?? { label: String(inv.status), color: theme.palette.typography.secondaryCardText };
              const inviteLink = `${FRONTEND_BASE_URL}/accept-invite/${inv.token}`;
              return (
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
                    gap: 1,
                  }}
                >
                  <Box sx={{ flex: 1, minWidth: 0 }}>
                    <Typography sx={{ fontSize: "0.82rem", fontWeight: 500, color: theme.palette.typography.mainText, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                      {inv.email}
                    </Typography>
                    <Typography sx={{ fontSize: "0.68rem", color: theme.palette.typography.secondaryCardText }}>
                      {new Date(inv.createdAt).toLocaleDateString("pt-BR")}
                    </Typography>
                  </Box>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 0.75, flexShrink: 0 }}>
                    <Box
                      sx={{
                        px: 1.25,
                        py: 0.3,
                        borderRadius: "99px",
                        fontSize: "0.62rem",
                        fontWeight: 600,
                        bgcolor: alpha(cfg.color, 0.12),
                        color: cfg.color,
                      }}
                    >
                      {cfg.label}
                    </Box>
                    {inv.status === "Pending" && (
                      <Tooltip title="Copiar link">
                        <IconButton size="small" onClick={() => copyLink(inviteLink)}>
                          <ContentCopyIcon sx={{ fontSize: "0.85rem" }} />
                        </IconButton>
                      </Tooltip>
                    )}
                  </Box>
                </Box>
              );
            })
          )}
        </SectionCard>
      </Box>
    </Box>
  );
}
