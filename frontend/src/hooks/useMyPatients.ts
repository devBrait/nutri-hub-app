import { useCallback, useEffect, useState } from "react";
import { getMyPatients } from "../lib/api/clinic.service";

export interface MyPatient {
	id: string;
	name: string;
	email: string;
	linkedAt: string;
}

export function useMyPatients() {
	const [patients, setPatients] = useState<MyPatient[]>([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	const fetch = useCallback(() => {
		const token = localStorage.getItem("accessToken") ?? "";
		setLoading(true);
		setError(null);
		getMyPatients(token)
			.then((res) => {
				if (res.success && res.output) {
					setPatients(
						res.output.patients.map((p) => ({
							id: p.id,
							name: p.name,
							email: p.email,
							linkedAt: p.linkedAt,
						})),
					);
				}
			})
			.catch(() => setError("Não foi possível carregar os pacientes."))
			.finally(() => setLoading(false));
	}, []);

	useEffect(() => {
		fetch();
	}, [fetch]);

	return { patients, loading, error, refetch: fetch };
}
