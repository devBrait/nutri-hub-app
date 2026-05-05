import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import ScaleIcon from "@mui/icons-material/MonitorWeightOutlined";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";
import IconButton from "@mui/material/IconButton";
import Skeleton from "@mui/material/Skeleton";
import Tooltip from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";
import { alpha, useTheme } from "@mui/material/styles";
import { isAxiosError } from "axios";
import { useSnackbar } from "notistack";
import { useState } from "react";
import SectionCard from "../../../components/SectionCard";
import { useProfile } from "../../../hooks/useProfile";
import { useTopbar } from "../../../hooks/useTopbar";
import { deleteWeight } from "../../../lib/api/patient.service";
import EditDataModal from "../components/EditDataModal";
import WeightChart from "../components/WeightChart";
import WeightLogModal from "../components/WeightLogModal";

const RANGES = ["3m", "6m", "1a"] as const;

export default function ProfilePage() {
  const theme = useTheme();
  const { enqueueSnackbar } = useSnackbar();
  const { profile, loading, refetch } = useProfile();
  const [range, setRange] = useState<(typeof RANGES)[number]>("3m");
  const [weightModalOpen, setWeightModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  useTopbar("Perfil");

  const initialWeightId = profile?.weightHistory[0]?.id;

  const handleDeleteWeight = async (id: string) => {
    const token = localStorage.getItem("accessToken") ?? "";
    setDeletingId(id);
    try {
      await deleteWeight(id, token);
      enqueueSnackbar("Registro removido com sucesso.", { variant: "success" });
      refetch();
    } catch (err) {
      const msg = isAxiosError(err) ? (err.response?.data?.message ?? null) : null;
      enqueueSnackbar(msg ?? "Não foi possível remover o registro.", { variant: "error" });
    } finally {
      setDeletingId(null);
    }
  };

  if (loading || !profile) return <ProfileSkeleton />;

  return (
    <Box sx={{ mt: { xs: -2, md: 0 } }}>
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: { xs: "1fr", lg: "2fr 1fr" },
          gap: 2,
        }}
      >
        <Box>
          {/* Header verde — full-bleed em mobile */}
          <Box
            sx={{
              bgcolor: theme.palette.brand.main,
              borderRadius: { xs: 0, md: "16px" },
              p: { xs: 2.5, md: 3.5 },
              mb: 2,
              mx: { xs: -2, md: 0 },
            }}
          >
            <Typography
              sx={{
                fontSize: { xs: "1.05rem", md: "1.25rem" },
                fontWeight: 700,
                color: "#fff",
                mb: 2,
              }}
            >
              {profile.fullName}
            </Typography>
            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: "repeat(3, 1fr)",
                gap: 1.5,
                mb: 2.5,
              }}
            >
              <HeaderStat
                value={`${profile.initialWeightKg}kg`}
                label="Peso Inicial"
              />
              <HeaderStat
                value={`${profile.currentWeightKg}kg`}
                label="Peso Atual"
              />
              <HeaderStat
                value={`${profile.goalWeightKg}kg`}
                label="Peso Objetivo"
              />
            </Box>
            <Box sx={{ display: "flex", gap: 1.25 }}>
              <HeaderButton
                icon={<ScaleIcon sx={{ fontSize: "1rem", mr: 0.75 }} />}
                onClick={() => setWeightModalOpen(true)}
              >
                Registrar peso
              </HeaderButton>
              <HeaderButton
                icon={<EditIcon sx={{ fontSize: "1rem", mr: 0.75 }} />}
                onClick={() => setEditModalOpen(true)}
              >
                Editar dados
              </HeaderButton>
            </Box>
          </Box>

          {/* Chart */}
          <SectionCard
            title="Evolução de peso"
            action={
              <Box
                sx={{
                  display: "flex",
                  gap: 0.5,
                  bgcolor: theme.palette.neutral.background,
                  borderRadius: "10px",
                  p: 0.5,
                }}
              >
                {RANGES.map((r) => (
                  <Box
                    key={r}
                    onClick={() => setRange(r)}
                    sx={{
                      px: { xs: 1.5, md: 2 },
                      py: 0.7,
                      borderRadius: "8px",
                      fontSize: "0.74rem",
                      fontWeight: range === r ? 600 : 500,
                      color:
                        range === r
                          ? theme.palette.typography.mainText
                          : theme.palette.typography.secondaryText,
                      bgcolor:
                        range === r
                          ? theme.palette.neutral.card
                          : "transparent",
                      cursor: "pointer",
                      boxShadow:
                        range === r ? "0 1px 4px rgba(0,0,0,0.08)" : "none",
                    }}
                  >
                    {r}
                  </Box>
                ))}
              </Box>
            }
          >
            <WeightChart entries={profile.weightHistory} />
          </SectionCard>
        </Box>

        {/* Histórico */}
        <SectionCard
          title="Histórico de peso"
          action={
            <Typography
              onClick={() => setWeightModalOpen(true)}
              sx={{
                fontSize: "0.74rem",
                fontWeight: 600,
                color: theme.palette.brand.main,
                cursor: "pointer",
              }}
            >
              + Registrar
            </Typography>
          }
          sx={{ alignSelf: "start" }}
        >
          {profile.weightHistory.map((entry) => (
            <Box
              key={entry.id}
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                p: 1.5,
                px: 2,
                bgcolor: theme.palette.neutral.background,
                borderRadius: "12px",
                mb: 1,
              }}
            >
              <Typography
                sx={{
                  fontSize: "0.88rem",
                  fontWeight: 600,
                  color: theme.palette.typography.mainText,
                }}
              >
                Peso: {entry.weightKg}kg
              </Typography>
              <Box sx={{ display: "flex", alignItems: "center", gap: 1.25 }}>
                <Typography
                  sx={{
                    fontSize: "0.74rem",
                    color: theme.palette.typography.secondaryCardText,
                  }}
                >
                  {entry.date.slice(8, 10)}/{entry.date.slice(5, 7)}/
                  {entry.date.slice(0, 4)}
                </Typography>
                {entry.id === initialWeightId ? (
                  <Tooltip title="Peso inicial não pode ser removido" placement="top">
                    <span>
                      <IconButton
                        disabled
                        sx={{
                          width: 30,
                          height: 30,
                          bgcolor: theme.palette.action.disabledBackground,
                          color: theme.palette.action.disabled,
                        }}
                      >
                        <DeleteIcon sx={{ fontSize: "0.85rem" }} />
                      </IconButton>
                    </span>
                  </Tooltip>
                ) : (
                  <IconButton
                    onClick={() => handleDeleteWeight(entry.id)}
                    disabled={deletingId === entry.id}
                    sx={{
                      width: 30,
                      height: 30,
                      bgcolor: theme.palette.error.main,
                      color: "#fff",
                      "&:hover": { bgcolor: theme.palette.error.dark },
                      "&.Mui-disabled": { bgcolor: alpha(theme.palette.error.main, 0.4), color: "#fff" },
                    }}
                  >
                    {deletingId === entry.id
                      ? <CircularProgress size={12} sx={{ color: "#fff" }} />
                      : <DeleteIcon sx={{ fontSize: "0.85rem" }} />}
                  </IconButton>
                )}
              </Box>
            </Box>
          ))}
        </SectionCard>
      </Box>

      <WeightLogModal
        open={weightModalOpen}
        onClose={() => setWeightModalOpen(false)}
      />
      <EditDataModal
        open={editModalOpen}
        onClose={() => setEditModalOpen(false)}
      />
    </Box>
  );
}

function ProfileSkeleton() {
  const theme = useTheme();
  return (
    <Box sx={{ mt: { xs: -2, md: 0 } }}>
      {/* Header block */}
      <Skeleton
        variant="rounded"
        height={160}
        sx={{
          borderRadius: { xs: 0, md: "16px" },
          mb: 2,
          mx: { xs: -2, md: 0 },
          bgcolor: theme.palette.neutral.altTempBackground,
        }}
      />
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: { xs: "1fr", lg: "2fr 1fr" },
          gap: 2,
        }}
      >
        {/* Chart */}
        <Skeleton
          variant="rounded"
          height={280}
          sx={{
            borderRadius: "16px",
            bgcolor: theme.palette.neutral.altTempBackground,
          }}
        />
        {/* History */}
        <Box sx={{ display: { xs: "none", lg: "block" } }}>
          <Skeleton
            variant="rounded"
            height={280}
            sx={{
              borderRadius: "16px",
              bgcolor: theme.palette.neutral.altTempBackground,
            }}
          />
        </Box>
      </Box>
    </Box>
  );
}

function HeaderStat({ value, label }: { value: string; label: string }) {
  return (
    <Box
      sx={{
        bgcolor: alpha("#fff", 0.15),
        borderRadius: "12px",
        p: 1.75,
        textAlign: "center",
      }}
    >
      <Typography sx={{ fontSize: "1.35rem", fontWeight: 700, color: "#fff" }}>
        {value}
      </Typography>
      <Typography
        sx={{ fontSize: "0.7rem", color: alpha("#fff", 0.65), mt: 0.25 }}
      >
        {label}
      </Typography>
    </Box>
  );
}

function HeaderButton({
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
      sx={{
        bgcolor: alpha("#fff", 0.15),
        color: "#fff",
        borderRadius: "10px",
        py: 1.25,
        fontSize: "0.82rem",
        fontWeight: 600,
        textTransform: "none",
        fontFamily: '"DM Sans", sans-serif',
        "&:hover": { bgcolor: alpha("#fff", 0.25) },
      }}
    >
      {icon}
      {children}
    </Button>
  );
}
