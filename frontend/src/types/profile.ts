export type Gender = "male" | "female" | "other";

export type ActivityLevel =
	| "sedentary"
	| "light"
	| "moderate"
	| "active"
	| "very_active";

export type Goal = "lose" | "maintain" | "gain";

export interface WeightEntry {
	id: string;
	weightKg: number;
	date: string;
}

export interface UserProfile {
	id: string;
	fullName: string;
	email: string;
	avatarInitials: string;
	role: "patient" | "nutritionist";
	gender: Gender;
	ageYears: number;
	heightCm: number;
	initialWeightKg: number;
	currentWeightKg: number;
	goalWeightKg: number;
	activityLevel: ActivityLevel;
	goal: Goal;
	weightHistory: WeightEntry[];
}
