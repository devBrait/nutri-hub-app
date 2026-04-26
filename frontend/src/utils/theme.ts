import { createTheme, type PaletteMode, type PaletteOptions } from "@mui/material/styles";

declare module "@mui/material/styles" {
	interface Palette {
		brand: {
			main: string;
			mainAlt: string;
			selectedItem: string;
			hoverItem: string;
			greenCircleBg: string;
			highlight: string;
		};
		green: {
			buttonBg: string;
			altSelectedItem: string;
			roundButtonBg: string;
			cardTitle: string;
			altCardTitle: string;
			text3: string;
		};
		neutral: {
			background: string;
			card: string;
			textFieldBg: string;
			altTempBackground: string;
			selectedGender: string;
		};
		typography: {
			mainText: string;
			secondaryText: string;
			secondaryCardText: string;
			altSecondaryText: string;
			secondaryAltText: string;
			mobileAlt: string;
			macroSecondary: string;
		};
	}
	interface PaletteOptions {
		brand?: Palette["brand"];
		green?: Palette["green"];
		neutral?: Palette["neutral"];
		typography?: Palette["typography"];
	}
}

const lightPalette: PaletteOptions = {
	mode: "light",
	primary: {
		main: "#2E7D4F",
		light: "#4CAF74",
		dark: "#458C63",
	},
	background: {
		default: "#F2F4F3",
		paper: "#FFFFFF",
	},
	brand: {
		main: "#2E7D4F",
		mainAlt: "#458C63",
		selectedItem: "#54946F",
		hoverItem: "#438A61",
		greenCircleBg: "#35955B",
		highlight: "#4CAF74",
	},
	green: {
		buttonBg: "#629E7B",
		altSelectedItem: "#589772",
		roundButtonBg: "#4D9069",
		cardTitle: "#6B7A72",
		altCardTitle: "#ABC497",
		text3: "#88B59B",
	},
	neutral: {
		background: "#F2F4F3",
		card: "#FFFFFF",
		textFieldBg: "#F5F5F5",
		altTempBackground: "#E8F5ED",
		selectedGender: "#E5F2EA",
	},
	typography: {
		mainText: "#111714",
		secondaryText: "#7E7A72",
		secondaryCardText: "#A8B5AE",
		altSecondaryText: "#B2B5B8",
		secondaryAltText: "#A1BFA2",
		mobileAlt: "#BFD1B6",
		macroSecondary: "#947A72",
	},
	text: {
		primary: "#111714",
		secondary: "#7E7A72",
	},
};

const darkPalette: PaletteOptions = {
	mode: "dark",
	primary: {
		main: "#4CAF74",
		light: "#6DC390",
		dark: "#35955B",
	},
	background: {
		default: "#0F1412",
		paper: "#1A211D",
	},
	brand: {
		main: "#2E7D4F",
		mainAlt: "#458C63",
		selectedItem: "#54946F",
		hoverItem: "#438A61",
		greenCircleBg: "#35955B",
		highlight: "#4CAF74",
	},
	green: {
		buttonBg: "#629E7B",
		altSelectedItem: "#589772",
		roundButtonBg: "#4D9069",
		cardTitle: "#6B7A72",
		altCardTitle: "#ABC497",
		text3: "#88B59B",
	},
	neutral: {
		background: "#0F1412",
		card: "#1A211D",
		textFieldBg: "#242B27",
		altTempBackground: "#1F2E25",
		selectedGender: "#1C2620",
	},
	typography: {
		mainText: "#F2F4F3",
		secondaryText: "#9FA8A3",
		secondaryCardText: "#6E7A73",
		altSecondaryText: "#78807F",
		secondaryAltText: "#89A68A",
		mobileAlt: "#7A8E73",
		macroSecondary: "#B89F94",
	},
	text: {
		primary: "#F2F4F3",
		secondary: "#9FA8A3",
	},
};

export function createAppTheme(mode: PaletteMode) {
	return createTheme({
		palette: mode === "dark" ? darkPalette : lightPalette,
		typography: {
			fontFamily: '"DM Sans", sans-serif',
			fontWeightLight: 300,
			fontWeightRegular: 400,
			fontWeightMedium: 500,
			fontWeightBold: 700,
			button: {
				fontFamily: '"Inter", sans-serif',
				fontWeight: 600,
			},
		},
		shape: {
			borderRadius: 12,
		},
		components: {
			MuiButton: {
				styleOverrides: {
					root: {
						textTransform: "none",
						boxShadow: "none",
						fontFamily: '"Inter", sans-serif',
						"&:hover": { boxShadow: "none" },
					},
				},
			},
			MuiAppBar: {
				styleOverrides: {
					root: { boxShadow: "none" },
				},
			},
		},
	});
}

export default createAppTheme("light");
