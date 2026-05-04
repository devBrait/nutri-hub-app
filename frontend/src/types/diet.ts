export type MealType = "breakfast" | "lunch" | "snack" | "dinner";

export interface Macros {
	carbs: number;
	protein: number;
	fat: number;
}

export interface Food {
	id: string;
	name: string;
	icon: string;
	caloriesPer100g: number;
	macrosPer100g: Macros;
}

export interface MealFood {
	id: string;
	food: Food;
	grams: number;
}

export interface MealItem {
	id: string;
	foodName: string;
	quantityG: number;
	calories: number;
	carbsG: number;
	proteinG: number;
	fatG: number;
}

export interface Meal {
	id: string;
	type: MealType;
	name: string;
	icon: string;
	targetCalories: number;
	consumedCalories: number;
	macros: Macros;
	foods: MealFood[];
	items: MealItem[];
}

export interface DailyDiet {
	date: string;
	waterMl: number;
	waterGoalMl: number;
	caloriesConsumed: number;
	caloriesGoal: number;
	macros: Macros;
	macrosGoal: Macros;
	meals: Meal[];
}
