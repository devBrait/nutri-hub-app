import Box from '@mui/material/Box';
import Navbar from '../../components/Navbar';
import HeroSection from '../../components/HeroSection';
import FeaturesSection from '../../components/FeaturesSection';
import HowItWorksSection from '../../components/HowItWorksSection';
import Footer from '../../components/Footer';

export default function Home() {
  return (
    <Box sx={{ bgcolor: '#FFFFFF' }}>
      <Navbar />
      <HeroSection />
      <FeaturesSection />
      <HowItWorksSection />
      <Footer />
    </Box>
  );
}
