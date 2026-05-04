import { http } from "./httpClient";

const CLINIC_BASE_URL = "https://nutrihub-clinic.onrender.com";

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
		baseURL: CLINIC_BASE_URL,
		headers: { Authorization: `Bearer ${accessToken}` },
	});
}

export interface NutritionistItemApi {
	id: string;
	name: string;
	email: string;
	createdAt: string;
}

export interface GetNutritionistsResponse {
	success: boolean;
	message: string | null;
	output: { items: NutritionistItemApi[] } | null;
}

export function getNutritionists(accessToken: string): Promise<GetNutritionistsResponse> {
	return http<GetNutritionistsResponse>("/api/nutritionists", {
		method: "GET",
		baseURL: CLINIC_BASE_URL,
		headers: { Authorization: `Bearer ${accessToken}` },
	});
}
