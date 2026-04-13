import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useScrollY } from '../../hooks/useScrollY';

const NAV_ITEMS = [
  { label: 'Início',           id: 'inicio'         },
  { label: 'Funcionalidades',  id: 'funcionalidades' },
  { label: 'Como funciona',    id: 'como-funciona'   },
];

const NAVBAR_HEIGHT = 72;

function scrollToSection(id: string) {
  if (id === 'inicio') {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    return;
  }
  const el = document.getElementById(id);
  if (!el) return;
  const top = el.getBoundingClientRect().top + window.scrollY - NAVBAR_HEIGHT;
  window.scrollTo({ top, behavior: 'smooth' });
}

export default function Navbar() {
  const scrollY = useScrollY();
  const progress = Math.min(scrollY / 80, 1);

  return (
    <AppBar
      position="sticky"
      sx={{
        top: 0,
        bgcolor: `rgba(255,255,255,${progress * 0.88})`,
        backdropFilter: `blur(${progress * 14}px)`,
        borderBottom: `1px solid rgba(62,123,91,${progress * 0.1})`,
        transition: 'background-color 0.3s ease, border-color 0.3s ease',
        zIndex: 100,
      }}
    >
      <Toolbar sx={{ justifyContent: 'space-between', px: { xs: 3, md: 5 }, py: 1.25 }}>
        <Typography
          onClick={() => scrollToSection('inicio')}
          sx={{
            fontFamily: '"Fredoka", cursive',
            fontWeight: 700,
            fontSize: '2rem',
            color: '#2D5A3D',
            textShadow: '2px 2px 0px rgba(26,61,40,0.35)',
            letterSpacing: '0.5px',
            userSelect: 'none',
            cursor: 'pointer',
            transition: 'transform 0.2s ease',
            '&:hover': { transform: 'scale(1.03)' },
          }}
        >
          nutrihub
        </Typography>

        <Box sx={{ display: 'flex', gap: 4.5 }}>
          {NAV_ITEMS.map((item) => (
            <Typography
              key={item.id}
              onClick={() => scrollToSection(item.id)}
              sx={{
                fontFamily: '"DM Sans", sans-serif',
                fontWeight: 500,
                fontSize: '0.95rem',
                color: '#2a3a30',
                cursor: 'pointer',
                position: 'relative',
                transition: 'color 0.2s ease',
                '&::after': {
                  content: '""',
                  position: 'absolute',
                  bottom: '-2px',
                  left: 0,
                  width: '0%',
                  height: '2px',
                  bgcolor: '#3E7B5B',
                  borderRadius: '2px',
                  transition: 'width 0.25s ease',
                },
                '&:hover': {
                  color: '#3E7B5B',
                  '&::after': { width: '100%' },
                },
              }}
            >
              {item.label}
            </Typography>
          ))}
        </Box>

        <Box sx={{ display: 'flex', gap: 1.5, alignItems: 'center' }}>
          <Button
            sx={{
              bgcolor: '#D4E8DF',
              color: '#3E7B5B',
              fontFamily: '"DM Sans", sans-serif',
              fontWeight: 600,
              fontSize: '0.95rem',
              borderRadius: '12px',
              px: 3.5,
              py: 1.25,
              transition: 'all 0.2s ease',
              '&:hover': {
                bgcolor: '#c0dcd5',
                transform: 'translateY(-1px)',
              },
            }}
          >
            Entrar
          </Button>
          <Button
            sx={{
              bgcolor: '#3E7B5B',
              color: '#FFFFFF',
              fontFamily: '"DM Sans", sans-serif',
              fontWeight: 600,
              fontSize: '0.9rem',
              borderRadius: '12px',
              px: 3,
              py: 0.9,
              lineHeight: 1.4,
              minWidth: '90px',
              transition: 'all 0.2s ease',
              '&:hover': {
                bgcolor: '#2d5a42',
                transform: 'translateY(-1px)',
                boxShadow: '0 6px 18px rgba(62,123,91,0.3)',
              },
            }}
          >
            Criar
            <br />
            Conta&nbsp;→
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
}
