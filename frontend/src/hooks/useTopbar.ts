import { useEffect, type ReactNode } from "react";
import { useAppLayout } from "../components/AppLayout";

export function useTopbar(title: string, right?: ReactNode) {
	const { setTopbar } = useAppLayout();
	useEffect(() => {
		setTopbar({ title, right });
	}, [title, right, setTopbar]);
}
