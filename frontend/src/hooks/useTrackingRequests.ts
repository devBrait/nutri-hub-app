import { useCallback, useEffect, useState } from "react";
import {
	getNutritionistTrackingRequests,
	type NutritionistTrackingRequestItem,
} from "../lib/api/clinic.service";

export function useTrackingRequests() {
	const [requests, setRequests] = useState<NutritionistTrackingRequestItem[]>([]);
	const [loading, setLoading] = useState(true);

	const fetchRequests = useCallback(() => {
		const token = localStorage.getItem("accessToken") ?? "";
		setLoading(true);
		getNutritionistTrackingRequests(token)
			.then((res) => {
				if (res.success && res.output) setRequests(res.output.requests);
			})
			.catch(() => {})
			.finally(() => setLoading(false));
	}, []);

	useEffect(() => {
		fetchRequests();
	}, [fetchRequests]);

	return { requests, loading, refetch: fetchRequests };
}
