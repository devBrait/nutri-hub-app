import { useEffect, useState } from "react";
import { getMyNutritionist, getNutritionists } from "../lib/api/clinic.service";
import type { Nutritionist } from "../types/nutritionist";

export interface LinkedNutritionist {
	id: string;
	name: string;
	email: string;
	linkedAt: string;
}

export function useNutritionists() {
	const [nutritionists, setNutritionists] = useState<Nutritionist[]>([]);
	const [linkedNutritionist, setLinkedNutritionist] = useState<LinkedNutritionist | null>(null);
	const [loading, setLoading] = useState(true);

	const fetchAll = () => {
		const token = localStorage.getItem("accessToken") ?? "";
		setLoading(true);

		Promise.all([
			getNutritionists(token),
			getMyNutritionist(token).catch(() => null),
		])
			.then(([listRes, myRes]) => {
				const linkedId = myRes?.success && myRes.output ? myRes.output.id : null;

				if (myRes?.success && myRes.output) {
					setLinkedNutritionist(myRes.output);
				} else {
					setLinkedNutritionist(null);
				}

				if (listRes.success && listRes.output) {
					setNutritionists(
						listRes.output.items.map((n) => ({
							id: n.id,
							name: n.name,
							avatarEmoji: "👩‍⚕️",
							specialty: "Nutricionista",
							location: "Brasil",
							tags: [],
							connected: n.id === linkedId,
						}))
					);
				}
			})
			.finally(() => setLoading(false));
	};

	useEffect(() => {
		fetchAll();
	}, []);

	return { nutritionists, linkedNutritionist, loading, refetch: fetchAll };
}
