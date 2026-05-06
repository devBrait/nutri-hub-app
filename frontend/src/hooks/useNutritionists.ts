import { useEffect, useState } from "react";
import { getMyNutritionist, getMyTrackingRequests, getNutritionists } from "../lib/api/clinic.service";
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
	const [pendingRequestIds, setPendingRequestIds] = useState<Set<string>>(new Set());
	const [loading, setLoading] = useState(true);

	const fetchAll = () => {
		const token = localStorage.getItem("accessToken") ?? "";
		setLoading(true);

		Promise.all([
			getNutritionists(token),
			getMyNutritionist(token).catch(() => null),
			getMyTrackingRequests(token).catch(() => null),
		])
			.then(([listRes, myRes, requestsRes]) => {
				const linkedId = myRes?.success && myRes.output ? myRes.output.id : null;

				setLinkedNutritionist(myRes?.success && myRes.output ? myRes.output : null);

				const pendingIds = new Set<string>(
					requestsRes?.success && requestsRes.output
						? requestsRes.output.requests
							.filter((r) => r.status === "Pending")
							.map((r) => r.nutritionistId)
						: []
				);
				setPendingRequestIds(pendingIds);

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

	return { nutritionists, linkedNutritionist, pendingRequestIds, loading, refetch: fetchAll };
}
