import { useCallback, useEffect, useRef, useState } from "react";
import { getFoods, type FoodPage } from "../lib/api/food.service";

const DEBOUNCE_MS = 400;
const EMPTY_PAGE: FoodPage = { items: [], totalCount: 0, page: 1, pageSize: 20, totalPages: 0 };

export function useFoodSearch(query: string, page = 1) {
	const [data, setData] = useState<FoodPage>(EMPTY_PAGE);
	const [loading, setLoading] = useState(true);
	const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

	const doFetch = useCallback((q: string, p: number) => {
		const token = localStorage.getItem("accessToken") ?? "";
		setLoading(true);
		getFoods(token, q || undefined, p)
			.then(setData)
			.catch(() => setData(EMPTY_PAGE))
			.finally(() => setLoading(false));
	}, []);

	useEffect(() => {
		if (timerRef.current) clearTimeout(timerRef.current);

		if (query.trim()) {
			setLoading(true);
			timerRef.current = setTimeout(() => doFetch(query, page), DEBOUNCE_MS);
		} else {
			doFetch("", page);
		}

		return () => { if (timerRef.current) clearTimeout(timerRef.current); };
	}, [query, page, doFetch]);

	return {
		results: data.items,
		loading,
		totalPages: data.totalPages,
		totalCount: data.totalCount,
		currentPage: data.page,
	};
}
