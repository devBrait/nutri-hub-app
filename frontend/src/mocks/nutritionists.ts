import type { Nutritionist } from "../types/nutritionist";

export const MOCK_NUTRITIONISTS: Nutritionist[] = [
	{
		id: "n-1",
		name: "Dra. Ana Souza",
		avatarEmoji: "👩‍⚕️",
		specialty: "Nutricionista esportiva",
		location: "São Paulo",
		tags: ["Emagrecimento", "Hipertrofia"],
		connected: false,
	},
	{
		id: "n-2",
		name: "Dr. Carlos Lima",
		avatarEmoji: "👨‍⚕️",
		specialty: "Nutrição clínica",
		location: "Campinas",
		tags: ["Saúde intestinal", "Longevidade"],
		connected: false,
	},
	{
		id: "n-3",
		name: "Dra. Mariana Costa",
		avatarEmoji: "👩‍⚕️",
		specialty: "Nutrição funcional",
		location: "Online",
		tags: ["Conectada", "Emagrecimento"],
		connected: true,
	},
];
