import { MOCK_NUTRITIONISTS } from "../mocks/nutritionists";

export function useNutritionists() {
	return { nutritionists: MOCK_NUTRITIONISTS, loading: false };
}
