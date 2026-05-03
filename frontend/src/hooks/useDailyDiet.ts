import { useEffect, useState } from "react";
import { getDailySummary, type MealSummary } from "../lib/api/patient.service";
import type { DailyDiet, Meal, MealType } from "../types/diet";

const MEAL_META: Record<MealSummary["mealType"], { type: MealType; name: string; icon: string }> = {
	Breakfast: { type: "breakfast", name: "Café da Manhã", icon: "☕" },
	Lunch:     { type: "lunch",     name: "Almoço",        icon: "🍱" },
	Snack:     { type: "snack",     name: "Lanche",        icon: "🍎" },
	Dinner:    { type: "dinner",    name: "Jantar",        icon: "🍝" },
};

function transformMeal(m: MealSummary, caloriesGoal: number): Meal {
	const meta = MEAL_META[m.mealType] ?? { type: "snack" as MealType, name: m.mealType, icon: "🍽️" };
	return {
		id: m.id,
		type: meta.type,
		name: meta.name,
		icon: meta.icon,
		targetCalories: Math.round(caloriesGoal / 4),
		consumedCalories: m.caloriesConsumed,
		macros: { carbs: m.carbsG, protein: m.proteinG, fat: m.fatG },
		foods: [],
	};
}

export function useDailyDiet(date: string) {
	const [diet, setDiet] = useState<DailyDiet | null>(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		const accessToken = localStorage.getItem("accessToken") ?? "";
		setLoading(true);
		setError(null);

		getDailySummary(date, accessToken)
			.then((response) => {
				if (response.success && response.output) {
					const o = response.output;
					setDiet({
						date: o.date,
						waterMl: o.waterMl,
						waterGoalMl: o.waterGoalMl,
						caloriesConsumed: o.caloriesConsumed,
						caloriesGoal: o.caloriesGoal,
						macros: { carbs: o.carbsG, protein: o.proteinG, fat: o.fatG },
						macrosGoal: { carbs: o.carbsGoalG, protein: o.proteinGoalG, fat: o.fatGoalG },
						meals: o.meals.map((m) => transformMeal(m, o.caloriesGoal)),
					});
				} else {
					setError(response.message ?? "Erro ao carregar dados do dia.");
				}
			})
			.catch(() => setError("Não foi possível conectar ao servidor."))
			.finally(() => setLoading(false));
	}, [date]);

	return { diet, loading, error };
}
