import LinkOffIcon from "@mui/icons-material/LinkOff";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";
import Skeleton from "@mui/material/Skeleton";
import Typography from "@mui/material/Typography";
import { alpha, useTheme } from "@mui/material/styles";
import { isAxiosError } from "axios";
import { useSnackbar } from "notistack";
import { useState } from "react";
import { requestTracking, unlinkNutritionist } from "../../../lib/api/clinic.service";
import { useNutritionists, type LinkedNutritionist } from "../../../hooks/useNutritionists";
import { useTopbar } from "../../../hooks/useTopbar";
import type { Nutritionist } from "../../../types/nutritionist";

export default function NutritionistsPage() {
  const theme = useTheme();
  const { enqueueSnackbar } = useSnackbar();
  const { nutritionists, linkedNutritionist, pendingRequestIds, loading, refetch } = useNutritionists();

  useTopbar("Nutricionistas");

  const [unlinking, setUnlinking] = useState(false);

  const handleUnlink = async () => {
    setUnlinking(true);
    try {
      const token = localStorage.getItem("accessToken") ?? "";
      const res = await unlinkNutritionist(token);
      if (res.success) {
        enqueueSnackbar("Vínculo removido com sucesso.", { variant: "success" });
        refetch();
      } else {
        enqueueSnackbar(res.message ?? "Não foi possível remover o vínculo.", { variant: "error" });
      }
    } catch (err) {
      const msg = isAxiosError(err) ? (err.response?.data?.message ?? null) : null;
      enqueueSnackbar(msg ?? "Não foi possível remover o vínculo.", { variant: "error" });
    } finally {
      setUnlinking(false);
    }
  };

  const gridSx = {
    display: "grid",
    gridTemplateColumns: { xs: "1fr", md: "repeat(2, 1fr)", lg: "repeat(3, 1fr)" },
    gap: { xs: 1.25, md: 2 },
  };

  return (
    <Box>
      <Box sx={{ mb: { xs: 2, md: 3 } }}>
        <Typography
          sx={{
            fontSize: { xs: "1.2rem", md: "1.4rem" },
            fontWeight: 700,
            color: theme.palette.typography.mainText,
            mb: 0.5,
            display: { xs: "none", md: "block" },
          }}
        >
          Nutricionistas
        </Typography>
        <Typography sx={{ fontSize: "0.82rem", color: theme.palette.typography.secondaryText }}>
          Encontre e conecte-se a um profissional.
        </Typography>
      </Box>

      {loading ? (
        <>
          <Skeleton variant="rounded" height={110} sx={{ borderRadius: "16px", mb: 3, bgcolor: theme.palette.neutral.altTempBackground }} />
          <Box sx={gridSx}>
            {[0, 1, 2].map((i) => (
              <Skeleton key={i} variant="rounded" height={180} sx={{ borderRadius: "16px", bgcolor: theme.palette.neutral.altTempBackground }} />
            ))}
          </Box>
        </>
      ) : (
        <>
          {linkedNutritionist && (
            <CurrentNutritionistCard
              nutritionist={linkedNutritionist}
              unlinking={unlinking}
              onUnlink={handleUnlink}
            />
          )}

          {nutritionists.length === 0 ? (
            <Typography sx={{ textAlign: "center", py: 6, fontSize: "0.88rem", color: theme.palette.typography.secondaryCardText }}>
              Nenhum nutricionista disponível.
            </Typography>
          ) : (
            <Box sx={gridSx}>
              {nutritionists.map((n) => (
                <NutritionistCard
                  key={n.id}
                  nutritionist={n}
                  hasPendingRequest={pendingRequestIds.has(n.id)}
                  onLinked={refetch}
                />
              ))}
            </Box>
          )}
        </>
      )}
    </Box>
  );
}

function CurrentNutritionistCard({
  nutritionist,
  unlinking,
  onUnlink,
}: {
  nutritionist: LinkedNutritionist;
  unlinking: boolean;
  onUnlink: () => void;
}) {
  const theme = useTheme();

  return (
    <Box
      sx={{
        bgcolor: alpha(theme.palette.brand.main, 0.06),
        border: `1.5px solid ${theme.palette.brand.main}`,
        borderRadius: "16px",
        p: { xs: 1.75, md: 2.75 },
        mb: 3,
        display: "flex",
        alignItems: { xs: "flex-start", sm: "center" },
        flexDirection: { xs: "column", sm: "row" },
        gap: { xs: 1.5, sm: 2 },
      }}
    >
      <Box
        sx={{
          width: 48,
          height: 48,
          borderRadius: "50%",
          bgcolor: alpha(theme.palette.brand.main, 0.15),
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: "1.4rem",
          flexShrink: 0,
        }}
      >
        👩‍⚕️
      </Box>

      <Box sx={{ flex: 1, minWidth: 0 }}>
        <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 0.25 }}>
          <Typography sx={{ fontSize: "0.95rem", fontWeight: 700, color: theme.palette.typography.mainText }}>
            {nutritionist.name}
          </Typography>
          <Box
            sx={{
              px: 1.25,
              py: 0.3,
              borderRadius: "99px",
              bgcolor: alpha(theme.palette.brand.main, 0.12),
              color: theme.palette.brand.main,
              fontSize: "0.62rem",
              fontWeight: 700,
            }}
          >
            Meu nutricionista
          </Box>
        </Box>
        <Typography sx={{ fontSize: "0.75rem", color: theme.palette.typography.secondaryCardText }}>
          {nutritionist.email} · vinculado em {new Date(nutritionist.linkedAt).toLocaleDateString("pt-BR")}
        </Typography>
      </Box>

      <Button
        disabled={unlinking}
        onClick={onUnlink}
        startIcon={unlinking ? <CircularProgress size={14} /> : <LinkOffIcon sx={{ fontSize: "1rem !important" }} />}
        sx={{
          color: theme.palette.error.main,
          border: `1px solid ${alpha(theme.palette.error.main, 0.4)}`,
          borderRadius: "10px",
          px: 2,
          py: 1,
          fontSize: "0.78rem",
          fontWeight: 600,
          textTransform: "none",
          fontFamily: '"DM Sans", sans-serif',
          alignSelf: { xs: "stretch", sm: "auto" },
          "&:hover": { bgcolor: alpha(theme.palette.error.main, 0.06) },
        }}
      >
        Remover vínculo
      </Button>
    </Box>
  );
}

function NutritionistCard({
  nutritionist,
  hasPendingRequest,
  onLinked,
}: {
  nutritionist: Nutritionist;
  hasPendingRequest: boolean;
  onLinked: () => void;
}) {
  const theme = useTheme();
  const { enqueueSnackbar } = useSnackbar();
  const isConnected = nutritionist.connected;
  const isPending = !isConnected && hasPendingRequest;
  const [loading, setLoading] = useState(false);

  const handleRequest = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("accessToken") ?? "";
      const res = await requestTracking(nutritionist.id, token);
      if (res.success) {
        enqueueSnackbar(`Vinculado a ${res.output?.nutritionistName ?? "nutricionista"} com sucesso!`, { variant: "success" });
        onLinked();
      } else {
        enqueueSnackbar(res.message ?? "Não foi possível solicitar acompanhamento.", { variant: "error" });
      }
    } catch (err) {
      const msg = isAxiosError(err) ? (err.response?.data?.message ?? null) : null;
      enqueueSnackbar(msg ?? "Não foi possível solicitar acompanhamento.", { variant: "error" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        bgcolor: theme.palette.neutral.card,
        border: `1px solid ${isConnected ? theme.palette.brand.main : theme.palette.divider}`,
        borderRadius: "16px",
        p: { xs: 2, md: 2.75 },
        display: "flex",
        flexDirection: { xs: "row", md: "column" },
        alignItems: { xs: "center", md: "stretch" },
        gap: { xs: 1.5, md: 1.5 },
        opacity: isConnected ? 0.65 : 1,
      }}
    >
      <Box
        sx={{
          width: { xs: 48, md: 52 },
          height: { xs: 48, md: 52 },
          borderRadius: "50%",
          bgcolor: theme.palette.neutral.altTempBackground,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: { xs: "1.25rem", md: "1.4rem" },
          flexShrink: 0,
        }}
      >
        {nutritionist.avatarEmoji}
      </Box>

      <Box sx={{ flex: 1, minWidth: 0, display: "flex", flexDirection: "column", gap: 0.5 }}>
        <Box sx={{ display: "flex", alignItems: "center", gap: 0.75, flexWrap: "wrap" }}>
          <Typography sx={{ fontSize: { xs: "0.88rem", md: "0.95rem" }, fontWeight: 700, color: theme.palette.typography.mainText }}>
            {nutritionist.name}
          </Typography>
          {isConnected && <Badge variant="green">Conectado</Badge>}
        </Box>
        <Typography sx={{ fontSize: "0.7rem", color: theme.palette.typography.secondaryCardText }}>
          {nutritionist.specialty} · {nutritionist.location}
        </Typography>
        <Box sx={{ display: { xs: "none", md: "flex" }, gap: 0.75, flexWrap: "wrap", mt: 0.5 }}>
          {nutritionist.tags.map((tag, idx) => (
            <Badge key={tag} variant={idx === 0 ? "green" : "gray"}>{tag}</Badge>
          ))}
        </Box>
      </Box>

      <Button
        disabled={isConnected || isPending || loading}
        onClick={isConnected || isPending ? undefined : handleRequest}
        sx={{
          bgcolor: isConnected || isPending
            ? theme.palette.neutral.altTempBackground
            : theme.palette.brand.main,
          color: isConnected
            ? theme.palette.brand.main
            : isPending
            ? "#f59e0b"
            : "#fff",
          border: isConnected
            ? `1px solid ${theme.palette.brand.main}`
            : isPending
            ? `1px solid #f59e0b`
            : "none",
          borderRadius: "10px",
          px: { xs: 1.75, md: 2 },
          py: { xs: 1, md: 1.25 },
          fontSize: { xs: "0.74rem", md: "0.82rem" },
          fontWeight: 600,
          textTransform: "none",
          fontFamily: '"DM Sans", sans-serif',
          whiteSpace: "nowrap",
          flexShrink: 0,
          width: { xs: "auto", md: "100%" },
          "&:hover": {
            bgcolor: isConnected || isPending
              ? theme.palette.neutral.altTempBackground
              : theme.palette.brand.hoverItem,
          },
          "&.Mui-disabled": { opacity: 0.65 },
        }}
      >
        {loading ? (
          <CircularProgress size={16} sx={{ color: "#fff" }} />
        ) : isConnected ? (
          "Conectado"
        ) : isPending ? (
          "Aguardando aprovação"
        ) : (
          <>
            Solicitar
            <Box component="span" sx={{ display: { xs: "none", md: "inline" }, ml: 0.5 }}>
              acompanhamento
            </Box>
          </>
        )}
      </Button>
    </Box>
  );
}

function Badge({ children, variant }: { children: React.ReactNode; variant: "green" | "gray" }) {
  const theme = useTheme();
  const colors =
    variant === "green"
      ? { bg: theme.palette.neutral.altTempBackground, fg: theme.palette.brand.main }
      : { bg: alpha(theme.palette.typography.secondaryText, 0.12), fg: theme.palette.typography.secondaryText };

  return (
    <Box
      sx={{
        display: "inline-flex",
        alignItems: "center",
        px: 1.25,
        py: 0.4,
        borderRadius: "99px",
        fontSize: "0.66rem",
        fontWeight: 600,
        bgcolor: colors.bg,
        color: colors.fg,
      }}
    >
      {children}
    </Box>
  );
}
