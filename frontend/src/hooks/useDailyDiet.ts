import { useMemo } from "react";
import { MOCK_DIET } from "../mocks/diet";

export function useDailyDiet(date: string) {
	const diet = useMemo(() => ({ ...MOCK_DIET, date }), [date]);
	return { diet, loading: false };
}
