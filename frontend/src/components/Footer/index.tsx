import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import CopyrightIcon from '@mui/icons-material/Copyright';

export default function Footer() {
  return (
    <Box
      component="footer"
      sx={{
        bgcolor: '#0F1D15',
        px: { xs: 4, md: 10 },
        py: 5,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 2,
      }}
    >
      <Typography
        sx={{
          fontFamily: '"Fredoka", cursive',
          fontWeight: 700,
          fontSize: '1.9rem',
          color: '#7BB58F',
          textShadow: '1px 1px 0px rgba(0,0,0,0.35)',
          letterSpacing: '0.5px',
          userSelect: 'none',
        }}
      >
        nutrihub
      </Typography>

      <Box sx={{ width: '48px', height: '1px', bgcolor: 'rgba(255,255,255,0.12)' }} />

      <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
        <CopyrightIcon sx={{ color: 'rgba(255,255,255,0.35)', fontSize: '0.9rem' }} />
        <Typography
          sx={{
            fontFamily: '"DM Sans", sans-serif',
            fontSize: '0.8rem',
            color: 'rgba(255,255,255,0.35)',
            fontWeight: 400,
            letterSpacing: '0.02em',
          }}
        >
          mackbot
        </Typography>
      </Box>
    </Box>
  );
}
