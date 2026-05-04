import { http } from "./httpClient";
import type { Food } from "../../types/diet";

const PATIENT_BASE_URL = "https://nutrihub-patient.onrender.com";

interface FoodApiItem {
	id: string; // Guid
	name: string;
	caloriesPer100g: number;
	macrosPer100g: {
		carbs: number;
		protein: number;
		fat: number;
	};
}

interface SearchFoodsResponse {
	success: boolean;
	output: FoodApiItem[];
}

export async function searchFoods(query: string, accessToken: string): Promise<Food[]> {
	const response = await http<SearchFoodsResponse>(
		`/api/foods?query=${encodeURIComponent(query)}`,
		{
			method: "GET",
			baseUrl: PATIENT_BASE_URL,
			headers: { Authorization: `Bearer ${accessToken}` },
		}
	);

	if (!response.success || !response.output) return [];

	return response.output.map((item) => ({
		id: item.id,
		name: item.name,
		icon: "🍽️",
		caloriesPer100g: item.caloriesPer100g,
		macrosPer100g: {
			carbs: item.macrosPer100g.carbs,
			protein: item.macrosPer100g.protein,
			fat: item.macrosPer100g.fat,
		},
	}));
}
