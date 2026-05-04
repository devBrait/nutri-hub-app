import { useEffect, useState } from "react";
import { getNutritionists } from "../lib/api/clinic.service";
import type { Nutritionist } from "../types/nutritionist";

export function useNutritionists() {
	const [nutritionists, setNutritionists] = useState<Nutritionist[]>([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const token = localStorage.getItem("accessToken") ?? "";
		setLoading(true);
		getNutritionists(token)
			.then((res) => {
				if (res.success && res.output) {
					setNutritionists(
						res.output.items.map((n) => ({
							id: n.id,
							name: n.name,
							avatarEmoji: "👩‍⚕️",
							specialty: "Nutricionista",
							location: "Brasil",
							tags: [],
							connected: false,
						}))
					);
				}
			})
			.catch(() => {})
			.finally(() => setLoading(false));
	}, []);

	return { nutritionists, loading };
}
