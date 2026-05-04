import axios from "axios";
import type { Food } from "../../types/diet";

const APP_ID = import.meta.env.VITE_EDAMAM_APP_ID as string | undefined;
const APP_KEY = import.meta.env.VITE_EDAMAM_APP_KEY as string | undefined;

interface EdamamFood {
	foodId: string;
	label: string;
	nutrients: {
		ENERC_KCAL?: number;
		PROCNT?: number;
		FAT?: number;
		CHOCDF?: number;
	};
	image?: string;
}

interface EdamamResponse {
	hints: { food: EdamamFood }[];
}

export async function searchFoods(query: string): Promise<Food[]> {
	if (!APP_ID || !APP_KEY) return [];

	const { data } = await axios.get<EdamamResponse>(
		"https://api.edamam.com/api/food-database/v2/parser",
		{
			params: {
				app_id: APP_ID,
				app_key: APP_KEY,
				ingr: query,
				"nutrition-type": "cooking",
			},
		}
	);

	return data.hints.slice(0, 30).map(({ food }) => ({
		id: food.foodId,
		name: food.label,
		icon: "🍽️",
		caloriesPer100g: food.nutrients.ENERC_KCAL ?? 0,
		macrosPer100g: {
			carbs: food.nutrients.CHOCDF ?? 0,
			protein: food.nutrients.PROCNT ?? 0,
			fat: food.nutrients.FAT ?? 0,
		},
	}));
}
