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
		headers: { Authorization: `Bearer ${accessToken}` },
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
