import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import OutlinedInput from "@mui/material/OutlinedInput";
import Typography from "@mui/material/Typography";
import { useTheme } from "@mui/material/styles";
import { useState } from "react";
import ResponsiveModal from "../../../../components/ResponsiveModal";
import { todayIso } from "../../../../utils/format";

interface WeightLogModalProps {
  open: boolean;
  onClose: () => void;
}

export default function WeightLogModal({ open, onClose }: WeightLogModalProps) {
  const theme = useTheme();
  const [weight, setWeight] = useState("120");
  const [date, setDate] = useState(todayIso);

  const handleSubmit = () => {
    // TODO(backend): enviar registro de peso para a API
    onClose();
  };

  return (
    <ResponsiveModal open={open} onClose={onClose} title="Registro de peso">
      <FieldRow label="Peso" unit="kg">
        <OutlinedInput
          size="small"
          type="number"
          value={weight}
          onChange={(e) => setWeight(e.target.value)}
          inputProps={{ min: 0 }}
          sx={{ maxWidth: 110 }}
        />
      </FieldRow>
      <FieldRow label="Data">
        <OutlinedInput
          size="small"
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          fullWidth
        />
      </FieldRow>
      <Button
        fullWidth
        disabled={false}
        onClick={handleSubmit}
        sx={{
          bgcolor: theme.palette.brand.main,
          color: "#fff",
          borderRadius: "12px",
          py: 1.5,
          mt: 1,
          fontSize: "0.92rem",
          fontWeight: 700,
          "&:hover": { bgcolor: theme.palette.brand.hoverItem },
        }}
      >
        Confirmar
      </Button>
    </ResponsiveModal>
  );
}

function FieldRow({
  label,
  unit,
  children,
}: {
  label: string;
  unit?: string;
  children: React.ReactNode;
}) {
  const theme = useTheme();
  return (
    <Box sx={{ display: "flex", alignItems: "center", gap: 1.25, mb: 1.75 }}>
      <Typography
        sx={{
          fontSize: "0.82rem",
          fontWeight: 500,
          color: theme.palette.typography.secondaryText,
          width: 110,
          flexShrink: 0,
        }}
      >
        {label}
      </Typography>
      <Box sx={{ flex: 1 }}>{children}</Box>
      {unit ? (
        <Typography
          sx={{
            fontSize: "0.82rem",
            color: theme.palette.typography.secondaryCardText,
            width: 30,
          }}
        >
          {unit}
        </Typography>
      ) : null}
    </Box>
  );
}
