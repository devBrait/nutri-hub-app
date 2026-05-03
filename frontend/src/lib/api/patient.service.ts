import { http } from "./httpClient";

export interface CreatePatientResponse {
	success: boolean;
	message: string | null;
	output: {
		id: string;
		name: string;
		email: string;
		createdAt: string;
	} | null;
}

export function createPatient(accessToken: string): Promise<CreatePatientResponse> {
	return http<CreatePatientResponse>("/api/patients", {
		method: "POST",
		headers: { Authorization: `Bearer ${accessToken}` },
	});
}
