import { useCallback, useEffect, useState } from "react";
import { getMyInvitations, type InvitationItemApi } from "../lib/api/clinic.service";

export function useMyInvitations() {
	const [invitations, setInvitations] = useState<InvitationItemApi[]>([]);
	const [loading, setLoading] = useState(true);

	const fetch = useCallback(() => {
		const token = localStorage.getItem("accessToken") ?? "";
		setLoading(true);
		getMyInvitations(token)
			.then((res) => {
				if (res.success && res.output) setInvitations(res.output.invitations);
			})
			.catch(() => {})
			.finally(() => setLoading(false));
	}, []);

	useEffect(() => {
		fetch();
	}, [fetch]);

	return { invitations, loading, refetch: fetch };
}
