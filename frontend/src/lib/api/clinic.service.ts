import { http } from "./httpClient";

export interface CreateNutritionistResponse {
	success: boolean;
	message: string | null;
	output: {
		id: string;
		name: string;
		email: string;
		createdAt: string;
	} | null;
}

export function createNutritionist(accessToken: string): Promise<CreateNutritionistResponse> {
	return http<CreateNutritionistResponse>("/api/nutritionists", {
		method: "POST",
		headers: { Authorization: `Bearer ${accessToken}` },
	});
}
