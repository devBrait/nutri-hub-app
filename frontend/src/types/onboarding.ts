import type { ActivityLevel, Gender, Goal } from "./profile";

export interface OnboardingData {
	gender: Gender | null;
	ageYears: number | null;
	heightCm: number | null;
	currentWeightKg: number | null;
	goalWeightKg: number | null;
	activityLevel: ActivityLevel | null;
	goal: Goal | null;
}

export const EMPTY_ONBOARDING: OnboardingData = {
	gender: null,
	ageYears: null,
	heightCm: null,
	currentWeightKg: null,
	goalWeightKg: null,
	activityLevel: null,
	goal: null,
};
