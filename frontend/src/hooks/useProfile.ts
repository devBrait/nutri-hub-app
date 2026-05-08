import { useCallback, useEffect, useState } from "react";
import { getStoredRole } from "../lib/api/auth.service";
import { getProfile, type WeightEntryApi } from "../lib/api/patient.service";
import type { UserProfile, WeightEntry } from "../types/profile";
import { decodeJwt } from "../utils/jwt";

const SEX_TO_GENDER: Record<string, UserProfile["gender"]> = {
	Male: "male",
	Female: "female",
	Other: "other",
};
const OBJECTIVE_TO_GOAL: Record<string, UserProfile["goal"]> = {
	LoseWeight: "lose",
	Maintain: "maintain",
	GainMuscle: "gain",
};
const ACTIVITY_TO_LEVEL: Record<string, UserProfile["activityLevel"]> = {
	Sedentary: "sedentary",
	LightlyActive: "light",
	ModeratelyActive: "moderate",
	VeryActive: "active",
	Athlete: "very_active",
};

function toWeightEntry(w: WeightEntryApi): WeightEntry {
	return { id: w.id, weightKg: w.weightKg, date: w.recordedAt };
}

function buildNutritionistProfile(): UserProfile | null {
	const token = localStorage.getItem("accessToken") ?? "";
	const payload = decodeJwt(token);
	if (!payload) return null;
	const name = payload.name ?? "Nutricionista";
	const initials = name
		.split(" ")
		.slice(0, 2)
		.map((w: string) => w[0]?.toUpperCase() ?? "")
		.join("");
	return {
		id: payload.sub ?? "",
		fullName: name,
		email: payload.email ?? "",
		avatarInitials: initials,
		role: "Nutritionist",
		gender: "other",
		ageYears: 0,
		heightCm: 0,
		initialWeightKg: 0,
		currentWeightKg: 0,
		goalWeightKg: 0,
		activityLevel: "sedentary",
		goal: "maintain",
		weightHistory: [],
	};
}

export function useProfile() {
	const [profile, setProfile] = useState<UserProfile | null>(null);
	const [loading, setLoading] = useState(true);

	const fetch = useCallback(() => {
		const role = getStoredRole();

		if (role === "Nutritionist") {
			setProfile(buildNutritionistProfile());
			setLoading(false);
			return;
		}

		const token = localStorage.getItem("accessToken") ?? "";
		setLoading(true);
		getProfile(token)
			.then((res) => {
				if (res.success && res.output) {
					const o = res.output;
					const initials = o.name
						.split(" ")
						.slice(0, 2)
						.map((w: string) => w[0]?.toUpperCase() ?? "")
						.join("");
					setProfile({
						id: o.patientId,
						fullName: o.name,
						email: o.email,
						avatarInitials: initials,
						role: getStoredRole() ?? "Patient",
						gender: SEX_TO_GENDER[o.sex ?? ""] ?? "other",
						ageYears: o.ageYears ?? 0,
						heightCm: o.heightCm ?? 0,
						initialWeightKg: o.initialWeightKg ?? 0,
						currentWeightKg: o.currentWeightKg ?? 0,
						goalWeightKg: o.targetWeightKg ?? 0,
						activityLevel: ACTIVITY_TO_LEVEL[o.activityLevel ?? ""] ?? "sedentary",
						goal: OBJECTIVE_TO_GOAL[o.objective ?? ""] ?? "maintain",
						weightHistory: o.weightHistory.map(toWeightEntry),
					});
				}
			})
			.catch(() => {})
			.finally(() => setLoading(false));
	}, []);

	useEffect(() => {
		fetch();
	}, [fetch]);

	return { profile, loading, refetch: fetch };
}
