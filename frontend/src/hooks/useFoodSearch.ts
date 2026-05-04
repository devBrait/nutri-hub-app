import { useEffect, useRef, useState } from "react";
import { searchFoods } from "../lib/api/food.service";
import type { Food } from "../types/diet";

const DEBOUNCE_MS = 400;

export function useFoodSearch(query: string) {
	const [results, setResults] = useState<Food[]>([]);
	const [loading, setLoading] = useState(false);
	const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

	useEffect(() => {
		const trimmed = query.trim();

		if (!trimmed) {
			setResults([]);
			setLoading(false);
			return;
		}

		setLoading(true);

		if (timerRef.current) clearTimeout(timerRef.current);

		timerRef.current = setTimeout(async () => {
			try {
				const token = localStorage.getItem("accessToken") ?? "";
				const foods = await searchFoods(trimmed, token);
				setResults(foods);
			} catch (err) {
				console.error("[useFoodSearch] error:", err);
				setResults([]);
			} finally {
				setLoading(false);
			}
		}, DEBOUNCE_MS);

		return () => {
			if (timerRef.current) clearTimeout(timerRef.current);
		};
	}, [query]);

	return { results, loading };
}
