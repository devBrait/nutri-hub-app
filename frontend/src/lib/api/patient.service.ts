import { http } from "./httpClient";
import type { ActivityLevel, Gender, Goal } from "../../types/profile";

const PATIENT_BASE_URL = "https://nutrihub-patient.onrender.com";

// Mapeamento frontend → backend enums
const SEX_MAP: Record<Gender, string> = {
	male: "Male",
	female: "Female",
	other: "Other",
};

const OBJECTIVE_MAP: Record<Goal, string> = {
	lose: "LoseWeight",
	maintain: "Maintain",
	gain: "GainMuscle",
};

const ACTIVITY_MAP: Record<ActivityLevel, string> = {
	sedentary: "Sedentary",
	light: "LightlyActive",
	moderate: "ModeratelyActive",
	active: "VeryActive",
	very_active: "Athlete",
};

export interface CreatePatientResponse {
	success: boolean;
	message: string | null;
	output: {
		id: string;
		name: string;
		email: string;
		createdAt: string;
	} | null;
}

export interface SaveOnboardingRequest {
	sex: Gender;
	ageYears: number;
	heightCm: number;
	currentWeightKg: number;
	objective: Goal;
	targetWeightKg: number;
	activityLevel: ActivityLevel;
}

export interface SaveOnboardingResponse {
	success: boolean;
	message: string | null;
	output: {
		patientId: string;
		heightCm: number;
		currentWeightKg: number;
		objective: string;
		targetWeightKg: number;
		activityLevel: string;
		dailyCalorieGoal: number;
	} | null;
}

export function createPatient(accessToken: string): Promise<CreatePatientResponse> {
	return http<CreatePatientResponse>("/api/patients", {
		method: "POST",
		baseUrl: PATIENT_BASE_URL,
		headers: { Authorization: `Bearer ${accessToken}` },
	});
}

export interface MealSummary {
	id: string;
	mealType: "Breakfast" | "Lunch" | "Snack" | "Dinner";
	caloriesConsumed: number;
	carbsG: number;
	proteinG: number;
	fatG: number;
}

export interface GetDailySummaryResponse {
	success: boolean;
	message: string | null;
	output: {
		date: string;
		waterMl: number;
		waterGoalMl: number;
		caloriesConsumed: number;
		caloriesGoal: number;
		progressPercent: number;
		carbsG: number;
		proteinG: number;
		fatG: number;
		carbsGoalG: number;
		proteinGoalG: number;
		fatGoalG: number;
		meals: MealSummary[];
	} | null;
}

export interface AddMealItemRequest {
	foodName: string;
	quantityG: number;
	calories: number;
	carbsG: number;
	proteinG: number;
	fatG: number;
	foodId?: string;
}

export interface MealItemDetail {
	id: string;
	foodName: string;
	quantityG: number;
	calories: number;
	carbsG: number;
	proteinG: number;
	fatG: number;
	createdAt: string;
}

export interface AddMealItemResponse {
	success: boolean;
	message: string | null;
	output: MealItemDetail | null;
}

export interface GetMealItemsResponse {
	success: boolean;
	message: string | null;
	output: {
		mealId: string;
		items: MealItemDetail[];
	} | null;
}

export function addMealItem(
	mealId: string,
	data: AddMealItemRequest,
	accessToken: string
): Promise<AddMealItemResponse> {
	return http<AddMealItemResponse>(`/api/patients/meals/${mealId}/items`, {
		method: "POST",
		baseUrl: PATIENT_BASE_URL,
		headers: { Authorization: `Bearer ${accessToken}` },
		data,
	});
}

export function getMealItems(mealId: string, accessToken: string): Promise<GetMealItemsResponse> {
	return http<GetMealItemsResponse>(`/api/patients/meals/${mealId}/items`, {
		method: "GET",
		baseUrl: PATIENT_BASE_URL,
		headers: { Authorization: `Bearer ${accessToken}` },
	});
}

export function getDailySummary(date: string, accessToken: string): Promise<GetDailySummaryResponse> {
	return http<GetDailySummaryResponse>(`/api/patients/daily-summary?date=${date}`, {
		method: "GET",
		baseUrl: PATIENT_BASE_URL,
		headers: { Authorization: `Bearer ${accessToken}` },
	});
}

export function deleteMealItem(
	mealId: string,
	itemId: string,
	accessToken: string
): Promise<{ success: boolean; message: string | null }> {
	return http(`/api/patients/meals/${mealId}/items/${itemId}`, {
		method: "DELETE",
		baseUrl: PATIENT_BASE_URL,
		headers: { Authorization: `Bearer ${accessToken}` },
	});
}

export interface LogWeightRequest {
	weightKg: number;
	recordedAt?: string; // yyyy-MM-dd
	notes?: string;
}

export interface LogWeightResponse {
	success: boolean;
	message: string | null;
	output: { id: string; weightKg: number; recordedAt: string } | null;
}

export function logWeight(data: LogWeightRequest, accessToken: string): Promise<LogWeightResponse> {
	return http<LogWeightResponse>("/api/patients/weight", {
		method: "POST",
		baseUrl: PATIENT_BASE_URL,
		headers: { Authorization: `Bearer ${accessToken}` },
		data,
	});
}

export interface WeightEntryApi {
	id: string;
	weightKg: number;
	recordedAt: string; // DateOnly from backend → "yyyy-MM-dd"
}

export interface ProfileResponse {
	success: boolean;
	message: string | null;
	output: {
		patientId: string;
		name: string;
		email: string;
		sex: string | null;
		ageYears: number | null;
		heightCm: number | null;
		objective: string | null;
		activityLevel: string | null;
		targetWeightKg: number | null;
		dailyCalorieGoal: number | null;
		currentWeightKg: number | null;
		initialWeightKg: number | null;
		weightHistory: WeightEntryApi[];
	} | null;
}

export interface UpdateProfileRequest {
	name: string;
	email: string;
	sex: Gender;
	ageYears: number;
	heightCm: number;
	objective: Goal;
	activityLevel: ActivityLevel;
	targetWeightKg: number;
}

export function getProfile(accessToken: string): Promise<ProfileResponse> {
	return http<ProfileResponse>("/api/patients/profile", {
		method: "GET",
		baseUrl: PATIENT_BASE_URL,
		headers: { Authorization: `Bearer ${accessToken}` },
	});
}

export function updateProfile(data: UpdateProfileRequest, accessToken: string): Promise<ProfileResponse> {
	return http<ProfileResponse>("/api/patients/profile", {
		method: "PUT",
		baseUrl: PATIENT_BASE_URL,
		headers: { Authorization: `Bearer ${accessToken}` },
		data: {
			name: data.name,
			email: data.email,
			sex: SEX_MAP[data.sex],
			ageYears: data.ageYears,
			heightCm: data.heightCm,
			objective: OBJECTIVE_MAP[data.objective],
			activityLevel: ACTIVITY_MAP[data.activityLevel],
			targetWeightKg: data.targetWeightKg,
		},
	});
}

export function saveOnboarding(
	data: SaveOnboardingRequest,
	accessToken: string
): Promise<SaveOnboardingResponse> {
	return http<SaveOnboardingResponse>("/api/patients/onboarding", {
		method: "POST",
		baseUrl: PATIENT_BASE_URL,
		headers: { Authorization: `Bearer ${accessToken}` },
		data: {
			sex: SEX_MAP[data.sex],
			ageYears: data.ageYears,
			heightCm: data.heightCm,
			currentWeightKg: data.currentWeightKg,
			objective: OBJECTIVE_MAP[data.objective],
			targetWeightKg: data.targetWeightKg,
			activityLevel: ACTIVITY_MAP[data.activityLevel],
		},
	});
}
