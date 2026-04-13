import { keyframes } from '@emotion/react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import SaladBarIcon from '@mui/icons-material/SaladBar';
import { useScrollY } from '../../hooks/useScrollY';

const fadeUp = keyframes`
  from { opacity: 0; transform: translateY(22px); }
  to   { opacity: 1; transform: translateY(0);    }
`;

const pulse = keyframes`
  0%, 100% { transform: scale(1);   opacity: 1;   }
  50%       { transform: scale(1.5); opacity: 0.6; }
`;

const float = keyframes`
  0%, 100% { transform: translateY(0px);  }
  50%       { transform: translateY(-10px); }
`;

const appear = (delay: string) => ({
  opacity: 0,
  animation: `${fadeUp} 0.65s cubic-bezier(0.22,1,0.36,1) ${delay} forwards`,
});

const MACROS = [
  { label: 'Proteína',      value: 68,  max: 90,  color: '#3E7B5B' },
  { label: 'Carboidratos',  value: 140, max: 200, color: '#7BB58F' },
  { label: 'Gordura',       value: 42,  max: 60,  color: '#B5D4C3' },
];

function AppPreviewCard() {
  return (
    <Box
      sx={{
        bgcolor: '#FFFFFF',
        borderRadius: '24px',
        p: 3,
        width: '268px',
        boxShadow: '0 24px 64px rgba(0,0,0,0.11), 0 4px 16px rgba(62,123,91,0.08)',
        animation: `${float} 5s ease-in-out infinite`,
      }}
    >
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2.5 }}>
        <Typography sx={{ fontFamily: '"DM Sans", sans-serif', fontWeight: 600, fontSize: '0.88rem', color: '#12211A' }}>
          Resumo de hoje
        </Typography>
        <Box sx={{ bgcolor: '#EDF2EE', borderRadius: '8px', px: 1.5, py: 0.4 }}>
          <Typography sx={{ fontFamily: '"DM Sans", sans-serif', fontSize: '0.72rem', color: '#3E7B5B', fontWeight: 600 }}>
            Seg, 12 Abr
          </Typography>
        </Box>
      </Box>

      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3 }}>
        <Box sx={{ position: 'relative', width: 72, height: 72, flexShrink: 0 }}>
          <svg width="72" height="72" viewBox="0 0 72 72">
            <circle cx="36" cy="36" r="28" fill="none" stroke="#EDF2EE" strokeWidth="7" />
            <circle
              cx="36" cy="36" r="28"
              fill="none"
              stroke="#3E7B5B"
              strokeWidth="7"
              strokeLinecap="round"
              strokeDasharray="176"
              strokeDashoffset="50"
              transform="rotate(-90 36 36)"
            />
          </svg>
          <Box
            sx={{
              position: 'absolute',
              inset: 0,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Typography sx={{ fontFamily: '"DM Sans", sans-serif', fontSize: '0.95rem', fontWeight: 700, color: '#12211A', lineHeight: 1 }}>
              1420
            </Typography>
            <Typography sx={{ fontFamily: '"DM Sans", sans-serif', fontSize: '0.58rem', color: '#8a9e94' }}>kcal</Typography>
          </Box>
        </Box>
        <Box>
          <Typography sx={{ fontFamily: '"DM Sans", sans-serif', fontSize: '0.72rem', color: '#8a9e94', mb: 0.25 }}>Meta diária</Typography>
          <Typography sx={{ fontFamily: '"DM Sans", sans-serif', fontSize: '1.05rem', fontWeight: 700, color: '#12211A' }}>1.800 kcal</Typography>
          <Typography sx={{ fontFamily: '"DM Sans", sans-serif', fontSize: '0.7rem', color: '#3E7B5B', fontWeight: 600 }}>380 restantes</Typography>
        </Box>
      </Box>

      {MACROS.map((m) => (
        <Box key={m.label} sx={{ mb: 1.5 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
            <Typography sx={{ fontFamily: '"DM Sans", sans-serif', fontSize: '0.71rem', color: '#5a6b62', fontWeight: 500 }}>{m.label}</Typography>
            <Typography sx={{ fontFamily: '"DM Sans", sans-serif', fontSize: '0.71rem', color: '#12211A', fontWeight: 600 }}>{m.value}g</Typography>
          </Box>
          <Box sx={{ bgcolor: '#EDF2EE', borderRadius: '4px', height: '6px', overflow: 'hidden' }}>
            <Box
              sx={{
                bgcolor: m.color,
                borderRadius: '4px',
                height: '100%',
                width: `${(m.value / m.max) * 100}%`,
                transition: 'width 0.8s ease',
              }}
            />
          </Box>
        </Box>
      ))}

      <Box
        sx={{
          mt: 2.5,
          pt: 2,
          borderTop: '1px solid #EDF2EE',
          display: 'flex',
          alignItems: 'center',
          gap: 1.5,
        }}
      >
        <Box
          sx={{
            bgcolor: '#EDF2EE',
            borderRadius: '10px',
            width: 36,
            height: 36,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <SaladBarIcon sx={{ color: '#3E7B5B', fontSize: '1.1rem' }} />
        </Box>
        <Box sx={{ flex: 1 }}>
          <Typography sx={{ fontFamily: '"DM Sans", sans-serif', fontSize: '0.76rem', fontWeight: 600, color: '#12211A' }}>Almoço</Typography>
          <Typography sx={{ fontFamily: '"DM Sans", sans-serif', fontSize: '0.68rem', color: '#8a9e94' }}>Salada com frango grelhado</Typography>
        </Box>
        <Typography sx={{ fontFamily: '"DM Sans", sans-serif', fontSize: '0.76rem', fontWeight: 600, color: '#3E7B5B' }}>480 kcal</Typography>
      </Box>
    </Box>
  );
}

const STATS = [
  { value: '10k+', label: 'usuários' },
  { value: '500+', label: 'nutricionistas' },
  { value: '100%', label: 'gratuito' },
];

export default function HeroSection() {
  const scrollY = useScrollY();

  return (
    <Box
      sx={{
        position: 'relative',
        overflow: 'hidden',
        bgcolor: '#F4F7F5',
        borderRadius: '28px',
        mx: 2,
        mt: 0.5,
        minHeight: '560px',
        display: 'flex',
        alignItems: 'center',
        px: { xs: 4, md: 8 },
        py: { xs: 6, md: 7 },
      }}
    >
      {/* Background blobs — parallax */}
      <Box
        sx={{
          position: 'absolute',
          top: '-160px',
          right: '-100px',
          width: '520px',
          height: '520px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(62,123,91,0.18) 0%, transparent 70%)',
          pointerEvents: 'none',
          transform: `translateY(${scrollY * 0.25}px)`,
          willChange: 'transform',
        }}
      />
      <Box
        sx={{
          position: 'absolute',
          bottom: '-120px',
          left: '25%',
          width: '360px',
          height: '360px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(62,123,91,0.1) 0%, transparent 70%)',
          pointerEvents: 'none',
          transform: `translateY(${scrollY * -0.15}px)`,
          willChange: 'transform',
        }}
      />

      {/* Left: text content */}
      <Box sx={{ flex: 1, maxWidth: '480px', position: 'relative', zIndex: 1 }}>
        <Box sx={appear('0s')}>
          <Box
            sx={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 0.75,
              bgcolor: 'rgba(62,123,91,0.1)',
              border: '1px solid rgba(62,123,91,0.2)',
              borderRadius: '20px',
              px: 2,
              py: 0.75,
              mb: 3.5,
            }}
          >
            <Box
              sx={{
                width: 7,
                height: 7,
                borderRadius: '50%',
                bgcolor: '#3E7B5B',
                flexShrink: 0,
                animation: `${pulse} 2.2s ease-in-out infinite`,
              }}
            />
            <Typography
              sx={{
                fontFamily: '"DM Sans", sans-serif',
                fontSize: '0.78rem',
                fontWeight: 500,
                color: '#3E7B5B',
              }}
            >
              Plataforma nutricional para pacientes e nutricionistas
            </Typography>
          </Box>
        </Box>

        <Box sx={appear('0.1s')}>
          <Typography
            sx={{
              fontFamily: '"Playfair Display", serif',
              fontWeight: 400,
              fontSize: { xs: '3.6rem', md: '4.8rem' },
              color: '#3E7B5B',
              lineHeight: 1.0,
            }}
          >
            Nutrição
          </Typography>
          <Typography
            sx={{
              fontFamily: '"Playfair Display", serif',
              fontWeight: 700,
              fontSize: { xs: '3.6rem', md: '4.8rem' },
              color: '#12211A',
              lineHeight: 1.0,
              mb: 3,
            }}
          >
            inteligente.
          </Typography>
        </Box>

        <Box sx={appear('0.2s')}>
          <Typography
            sx={{
              fontFamily: '"DM Sans", sans-serif',
              fontSize: '0.95rem',
              color: '#4e6357',
              lineHeight: 1.7,
              mb: 4.5,
              maxWidth: '360px',
            }}
          >
            Regriste refeições, acompanhe macros e conecte-se ao seu nutricionista — tudo em um só lugar, de graça.
          </Typography>
        </Box>

        <Box sx={{ ...appear('0.3s'), display: 'flex', gap: 2, flexWrap: 'wrap', mb: 4 }}>
          <Button
            sx={{
              bgcolor: '#3E7B5B',
              color: '#FFFFFF',
              fontFamily: '"DM Sans", sans-serif',
              fontWeight: 600,
              fontSize: '0.95rem',
              borderRadius: '50px',
              px: 4,
              py: 1.5,
              transition: 'all 0.25s ease',
              '&:hover': {
                bgcolor: '#2d5a42',
                transform: 'translateY(-2px)',
                boxShadow: '0 10px 28px rgba(62,123,91,0.35)',
              },
            }}
          >
            Criar Conta →
          </Button>
          <Button
            sx={{
              bgcolor: 'rgba(62,123,91,0.07)',
              color: '#2D5A42',
              fontFamily: '"DM Sans", sans-serif',
              fontWeight: 500,
              fontSize: '0.95rem',
              borderRadius: '50px',
              px: 4,
              py: 1.5,
              border: '1px solid rgba(62,123,91,0.18)',
              transition: 'all 0.25s ease',
              '&:hover': {
                bgcolor: 'rgba(62,123,91,0.13)',
                transform: 'translateY(-2px)',
              },
            }}
          >
            Já tenho conta
          </Button>
        </Box>

        <Box sx={{ ...appear('0.4s'), display: 'flex', gap: 3 }}>
          {STATS.map((s, i) => (
            <Box key={i}>
              <Typography
                sx={{
                  fontFamily: '"Playfair Display", serif',
                  fontWeight: 700,
                  fontSize: '1.2rem',
                  color: '#3E7B5B',
                  lineHeight: 1,
                }}
              >
                {s.value}
              </Typography>
              <Typography
                sx={{
                  fontFamily: '"DM Sans", sans-serif',
                  fontSize: '0.72rem',
                  color: '#7a9186',
                  fontWeight: 500,
                  mt: 0.25,
                }}
              >
                {s.label}
              </Typography>
            </Box>
          ))}
        </Box>
      </Box>

      {/* Right: app preview card */}
      <Box
        sx={{
          flex: 1,
          display: { xs: 'none', md: 'flex' },
          justifyContent: 'center',
          alignItems: 'center',
          position: 'relative',
          zIndex: 1,
          ...appear('0.35s'),
        }}
      >
        <AppPreviewCard />
      </Box>
    </Box>
  );
}
