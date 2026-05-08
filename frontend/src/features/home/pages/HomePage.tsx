import Box from "@mui/material/Box";
import { useTheme } from "@mui/material/styles";
import FeaturesSection from "../components/FeaturesSection";
import Footer from "../components/Footer";
import HeroSection from "../components/HeroSection";
import HowItWorksSection from "../components/HowItWorksSection";
import Navbar from "../components/Navbar";

export default function HomePage() {
	const theme = useTheme();

	return (
		<Box sx={{ bgcolor: theme.palette.neutral.card }}>
			<Navbar />
			<HeroSection />
			<FeaturesSection />
			<HowItWorksSection />
			<Footer />
		</Box>
	);
}
