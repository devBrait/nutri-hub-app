import { http } from "./httpClient";
import type { Food } from "../../types/diet";

const PATIENT_BASE_URL = "https://nutrihub-patient.onrender.com";

interface FoodApiItem {
	id: string;
	name: string;
	caloriesPer100g: number;
	macrosPer100g: { carbs: number; protein: number; fat: number };
}

interface FoodPageResponse {
	success: boolean;
	output: {
		items: FoodApiItem[];
		totalCount: number;
		page: number;
		pageSize: number;
		totalPages: number;
	} | null;
}

export interface FoodPage {
	items: Food[];
	totalCount: number;
	page: number;
	pageSize: number;
	totalPages: number;
}

function toFood(item: FoodApiItem): Food {
	return {
		id: item.id,
		name: item.name,
		icon: "🍽️",
		caloriesPer100g: item.caloriesPer100g,
		macrosPer100g: {
			carbs: item.macrosPer100g.carbs,
			protein: item.macrosPer100g.protein,
			fat: item.macrosPer100g.fat,
		},
	};
}

export async function getFoods(
	accessToken: string,
	query?: string,
	page = 1,
	pageSize = 20
): Promise<FoodPage> {
	const params = new URLSearchParams({ page: String(page), pageSize: String(pageSize) });
	if (query?.trim()) params.set("query", query.trim());

	const response = await http<FoodPageResponse>(`/api/foods?${params}`, {
		method: "GET",
		baseUrl: PATIENT_BASE_URL,
		headers: { Authorization: `Bearer ${accessToken}` },
	});

	if (!response.success || !response.output)
		return { items: [], totalCount: 0, page, pageSize, totalPages: 0 };

	return {
		items: response.output.items.map(toFood),
		totalCount: response.output.totalCount,
		page: response.output.page,
		pageSize: response.output.pageSize,
		totalPages: response.output.totalPages,
	};
}
