import type { Food } from "../types/diet";

export const MOCK_FOODS: Food[] = [
	{
		id: "f-1",
		name: "Arroz Branco",
		icon: "🍚",
		caloriesPer100g: 100,
		macrosPer100g: { carbs: 90, protein: 30, fat: 20 },
	},
	{
		id: "f-2",
		name: "Frango Grelhado",
		icon: "🍗",
		caloriesPer100g: 165,
		macrosPer100g: { carbs: 0, protein: 31, fat: 3.6 },
	},
	{
		id: "f-3",
		name: "Brócolis Cozido",
		icon: "🥦",
		caloriesPer100g: 55,
		macrosPer100g: { carbs: 11, protein: 3.7, fat: 0.6 },
	},
	{
		id: "f-4",
		name: "Ovo Mexido",
		icon: "🥚",
		caloriesPer100g: 148,
		macrosPer100g: { carbs: 1.6, protein: 10, fat: 11 },
	},
	{
		id: "f-5",
		name: "Banana",
		icon: "🍌",
		caloriesPer100g: 89,
		macrosPer100g: { carbs: 23, protein: 1.1, fat: 0.3 },
	},
	{
		id: "f-6",
		name: "Aveia",
		icon: "🌾",
		caloriesPer100g: 389,
		macrosPer100g: { carbs: 66, protein: 17, fat: 7 },
	},
	{
		id: "f-7",
		name: "Batata Doce",
		icon: "🍠",
		caloriesPer100g: 86,
		macrosPer100g: { carbs: 20, protein: 1.6, fat: 0.1 },
	},
	{
		id: "f-8",
		name: "Salmão",
		icon: "🐟",
		caloriesPer100g: 208,
		macrosPer100g: { carbs: 0, protein: 20, fat: 13 },
	},
];
