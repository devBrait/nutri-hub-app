import CloseIcon from "@mui/icons-material/Close";
import SearchIcon from "@mui/icons-material/Search";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import OutlinedInput from "@mui/material/OutlinedInput";
import Typography from "@mui/material/Typography";
import { useTheme } from "@mui/material/styles";
import { useState } from "react";
import SectionCard from "../../../components/SectionCard";
import { useFoodSearch } from "../../../hooks/useFoodSearch";
import { useTopbar } from "../../../hooks/useTopbar";
import type { Food } from "../../../types/diet";
import FoodItem from "../components/FoodItem";
import QuantityModal from "../components/QuantityModal";

export default function FoodSearchPage() {
  const theme = useTheme();
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState<Food | null>(null);
  const [addedToday, setAddedToday] = useState<{ food: Food; grams: number }[]>(
    [],
  );
  const { results } = useFoodSearch(query);

  useTopbar("Buscar Alimento");

  const handleConfirm = (grams: number) => {
    if (selected) {
      setAddedToday((prev) => [...prev, { food: selected, grams }]);
    }
    setSelected(null);
  };

  return (
    <Box>
      <Box sx={{ mb: { xs: 2, md: 3 }, display: { xs: "none", md: "block" } }}>
        <Typography
          sx={{
            fontSize: "1.4rem",
            fontWeight: 700,
            color: theme.palette.typography.mainText,
            mb: 0.5,
          }}
        >
          Adicionar alimento
        </Typography>
        <Typography
          sx={{
            fontSize: "0.82rem",
            color: theme.palette.typography.secondaryText,
          }}
        >
          Busque e adicione alimentos às suas refeições.
        </Typography>
      </Box>

      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: { xs: "1fr", lg: "2fr 1fr" },
          gap: 2,
        }}
      >
        <SectionCard
          sx={{
            p: { xs: 0, md: 2.75 },
            bgcolor: { xs: "transparent", md: theme.palette.neutral.card },
            border: { xs: "none", md: `1px solid ${theme.palette.divider}` },
          }}
        >
          {/* Search bar */}
          <OutlinedInput
            fullWidth
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Buscar alimento..."
            startAdornment={
              <SearchIcon
                sx={{
                  fontSize: "1rem",
                  color: theme.palette.typography.secondaryCardText,
                  mr: 1,
                }}
              />
            }
            endAdornment={
              query ? (
                <IconButton size="small" onClick={() => setQuery("")}>
                  <CloseIcon sx={{ fontSize: "0.95rem" }} />
                </IconButton>
              ) : null
            }
            sx={{
              bgcolor: theme.palette.neutral.background,
              borderRadius: "12px",
              mb: 2,
              "& fieldset": { border: `1.5px solid ${theme.palette.divider}` },
              "&.Mui-focused fieldset": {
                border: `1.5px solid ${theme.palette.brand.main} !important`,
              },
              "& input": {
                fontSize: "0.88rem",
                py: 1.25,
              },
            }}
          />

          {/* Results */}
          {results.length === 0 ? (
            <Typography
              sx={{
                textAlign: "center",
                py: 3,
                color: theme.palette.typography.secondaryCardText,
                fontSize: "0.82rem",
              }}
            >
              Nenhum alimento encontrado.
            </Typography>
          ) : (
            results.map((food) => (
              <FoodItem
                key={food.id}
                food={food}
                onClick={() => setSelected(food)}
              />
            ))
          )}
        </SectionCard>

        {/* Adicionados hoje */}
        <SectionCard
          title="Adicionados hoje"
          sx={{ alignSelf: "start", display: { xs: "none", lg: "block" } }}
        >
          {addedToday.length === 0 ? (
            <Typography
              sx={{
                textAlign: "center",
                py: 3,
                color: theme.palette.typography.secondaryCardText,
                fontSize: "0.82rem",
              }}
            >
              Nenhum alimento adicionado ainda.
              <br />
              Use a busca para adicionar.
            </Typography>
          ) : (
            addedToday.map((item, idx) => (
              <Box
                key={`${item.food.id}-${idx}`}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 1.5,
                  p: 1.25,
                  bgcolor: theme.palette.neutral.background,
                  borderRadius: "10px",
                  mb: 1,
                }}
              >
                <Typography sx={{ fontSize: "1.05rem" }}>
                  {item.food.icon}
                </Typography>
                <Box sx={{ flex: 1 }}>
                  <Typography
                    sx={{
                      fontSize: "0.82rem",
                      fontWeight: 600,
                      color: theme.palette.typography.mainText,
                    }}
                  >
                    {item.food.name}
                  </Typography>
                  <Typography
                    sx={{
                      fontSize: "0.68rem",
                      color: theme.palette.typography.secondaryCardText,
                    }}
                  >
                    {item.grams}g
                  </Typography>
                </Box>
              </Box>
            ))
          )}
        </SectionCard>
      </Box>

      <QuantityModal
        food={selected}
        onClose={() => setSelected(null)}
        onConfirm={handleConfirm}
      />
    </Box>
  );
}
