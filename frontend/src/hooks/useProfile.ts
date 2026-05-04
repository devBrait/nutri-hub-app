import { useCallback, useEffect, useState } from "react";
import { getProfile, type WeightEntryApi } from "../lib/api/patient.service";
import type { UserProfile, WeightEntry } from "../types/profile";

const SEX_TO_GENDER: Record<string, UserProfile["gender"]> = {
	Male: "male", Female: "female", Other: "other",
};
const OBJECTIVE_TO_GOAL: Record<string, UserProfile["goal"]> = {
	LoseWeight: "lose", Maintain: "maintain", GainMuscle: "gain",
};
const ACTIVITY_TO_LEVEL: Record<string, UserProfile["activityLevel"]> = {
	Sedentary: "sedentary", LightlyActive: "light",
	ModeratelyActive: "moderate", VeryActive: "active", Athlete: "very_active",
};

function toWeightEntry(w: WeightEntryApi): WeightEntry {
	return { id: w.id, weightKg: w.weightKg, date: w.recordedAt };
}

export function useProfile() {
	const [profile, setProfile] = useState<UserProfile | null>(null);
	const [loading, setLoading] = useState(true);

	const fetch = useCallback(() => {
		const token = localStorage.getItem("accessToken") ?? "";
		setLoading(true);
		getProfile(token)
			.then((res) => {
				if (res.success && res.output) {
					const o = res.output;
					const initials = o.name
						.split(" ")
						.slice(0, 2)
						.map((w) => w[0]?.toUpperCase() ?? "")
						.join("");
					setProfile({
						id: o.patientId,
						fullName: o.name,
						email: o.email,
						avatarInitials: initials,
						role: "Patient",
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

	useEffect(() => { fetch(); }, [fetch]);

	return { profile, loading, refetch: fetch };
}
