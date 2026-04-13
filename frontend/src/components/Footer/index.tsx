import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import CopyrightIcon from '@mui/icons-material/Copyright';

export default function Footer() {
  return (
    <Box
      component="footer"
      sx={{
        bgcolor: '#EDF2EE',
        borderTop: '1px solid rgba(62,123,91,0.12)',
        px: { xs: 4, md: 10 },
        mt: 8,
        py: 4,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 1.5,
      }}
    >
      <Typography
        sx={{
          fontFamily: '"Fredoka", cursive',
          fontWeight: 700,
          fontSize: '1.7rem',
          color: '#3E7B5B',
          textShadow: '1px 1px 0px rgba(26,61,40,0.2)',
          letterSpacing: '0.5px',
          userSelect: 'none',
        }}
      >
        nutrihub
      </Typography>

      <Box sx={{ width: '40px', height: '1px', bgcolor: 'rgba(62,123,91,0.2)' }} />

      <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
        <CopyrightIcon sx={{ color: '#7a9e8a', fontSize: '0.85rem' }} />
        <Typography
          sx={{
            fontFamily: '"DM Sans", sans-serif',
            fontSize: '0.78rem',
            color: '#7a9e8a',
            fontWeight: 500,
            letterSpacing: '0.02em',
          }}
        >
          mackbot
        </Typography>
      </Box>
    </Box>
  );
}
