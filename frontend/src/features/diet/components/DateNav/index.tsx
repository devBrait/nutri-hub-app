import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { useTheme } from "@mui/material/styles";
import {
  formatShortDatePtBr,
  shiftDateIsoByDays,
} from "../../../../utils/format";

interface DateNavProps {
  value: string;
  onChange: (next: string) => void;
  maxDate?: string;
}

export default function DateNav({ value, onChange, maxDate }: DateNavProps) {
  const theme = useTheme();
  const isAtMax = maxDate !== undefined && value >= maxDate;

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        bgcolor: theme.palette.neutral.card,
        border: `1px solid ${theme.palette.divider}`,
        borderRadius: "10px",
        overflow: "hidden",
      }}
    >
      <IconButton
        size="small"
        onClick={() => onChange(shiftDateIsoByDays(value, -1))}
        sx={{
          borderRadius: 0,
          color: theme.palette.typography.secondaryText,
        }}
      >
        <ChevronLeftIcon fontSize="small" />
      </IconButton>
      <Typography
        sx={{
          px: 2,
          py: 0.9,
          fontSize: "0.82rem",
          fontWeight: 600,
          color: theme.palette.typography.mainText,
          borderLeft: `1px solid ${theme.palette.divider}`,
          borderRight: `1px solid ${theme.palette.divider}`,
        }}
      >
        {formatShortDatePtBr(value)}
      </Typography>
      <IconButton
        size="small"
        onClick={() => !isAtMax && onChange(shiftDateIsoByDays(value, 1))}
        disabled={isAtMax}
        sx={{
          borderRadius: 0,
          color: isAtMax
            ? theme.palette.action.disabled
            : theme.palette.typography.secondaryText,
        }}
      >
        <ChevronRightIcon fontSize="small" />
      </IconButton>
    </Box>
  );
}
