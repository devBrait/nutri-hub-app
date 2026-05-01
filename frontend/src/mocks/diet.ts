import type { DailyDiet } from "../types/diet";
import { MOCK_FOODS } from "./foods";

export const MOCK_DIET: DailyDiet = {
	date: new Date().toISOString().slice(0, 10),
	waterMl: 1500,
	waterGoalMl: 3000,
	caloriesConsumed: 1000,
	caloriesGoal: 2500,
	macros: { carbs: 120, protein: 60, fat: 12 },
	macrosGoal: { carbs: 240, protein: 120, fat: 112 },
	meals: [
		{
			id: "m-1",
			type: "breakfast",
			name: "Café da Manhã",
			icon: "☕",
			targetCalories: 500,
			consumedCalories: 500,
			macros: { carbs: 90, protein: 30, fat: 20 },
			foods: [
				{ id: "mf-1", food: MOCK_FOODS[5], grams: 60 },
				{ id: "mf-2", food: MOCK_FOODS[3], grams: 100 },
			],
		},
		{
			id: "m-2",
			type: "lunch",
			name: "Almoço",
			icon: "🍱",
			targetCalories: 500,
			consumedCalories: 500,
			macros: { carbs: 90, protein: 30, fat: 20 },
			foods: [
				{ id: "mf-3", food: MOCK_FOODS[0], grams: 120 },
				{ id: "mf-4", food: MOCK_FOODS[1], grams: 150 },
				{ id: "mf-5", food: MOCK_FOODS[2], grams: 100 },
			],
		},
		{
			id: "m-3",
			type: "snack",
			name: "Lanche",
			icon: "🍎",
			targetCalories: 500,
			consumedCalories: 400,
			macros: { carbs: 90, protein: 30, fat: 20 },
			foods: [{ id: "mf-6", food: MOCK_FOODS[4], grams: 120 }],
		},
		{
			id: "m-4",
			type: "dinner",
			name: "Jantar",
			icon: "🍝",
			targetCalories: 500,
			consumedCalories: 300,
			macros: { carbs: 90, protein: 30, fat: 20 },
			foods: [],
		},
	],
};
