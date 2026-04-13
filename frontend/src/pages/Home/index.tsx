import Box from "@mui/material/Box";
import FeaturesSection from "../../components/FeaturesSection";
import Footer from "../../components/Footer";
import HeroSection from "../../components/HeroSection";
import HowItWorksSection from "../../components/HowItWorksSection";
import Navbar from "../../components/Navbar";

export default function Home() {
	return (
		<Box sx={{ bgcolor: "#FFFFFF" }}>
			<Navbar />
			<HeroSection />
			<FeaturesSection />
			<HowItWorksSection />
			<Footer />
		</Box>
	);
}
