import { useMemo } from "react";
import { MOCK_FOODS } from "../mocks/foods";

export function useFoodSearch(query: string) {
	const results = useMemo(() => {
		const normalized = query.trim().toLowerCase();
		return normalized
			? MOCK_FOODS.filter((f) => f.name.toLowerCase().includes(normalized))
			: MOCK_FOODS;
	}, [query]);

	return { results, loading: false };
}
