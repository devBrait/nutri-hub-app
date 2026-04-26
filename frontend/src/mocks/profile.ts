import type { UserProfile } from "../types/profile";

export const MOCK_PROFILE: UserProfile = {
	id: "u-1",
	fullName: "Vinicius Brait Lorimier",
	email: "vinicius@email.com",
	avatarInitials: "VB",
	role: "patient",
	gender: "male",
	ageYears: 22,
	heightCm: 175,
	initialWeightKg: 130,
	currentWeightKg: 85,
	goalWeightKg: 70,
	activityLevel: "moderate",
	goal: "lose",
	weightHistory: [
		{ id: "w-1", weightKg: 130, date: "2026-01-15" },
		{ id: "w-2", weightKg: 100, date: "2026-04-10" },
		{ id: "w-3", weightKg: 85, date: "2026-07-20" },
	],
};
