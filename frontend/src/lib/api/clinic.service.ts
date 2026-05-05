import { http } from "./httpClient";

const CLINIC_BASE_URL = "https://nutrihub-clinic.onrender.com";

export interface CreateNutritionistResponse {
	success: boolean;
	message: string | null;
	output: {
		id: string;
		name: string;
		email: string;
		createdAt: string;
	} | null;
}

export function createNutritionist(accessToken: string): Promise<CreateNutritionistResponse> {
	return http<CreateNutritionistResponse>("/api/nutritionists", {
		method: "POST",
		baseURL: CLINIC_BASE_URL,
		headers: { Authorization: `Bearer ${accessToken}` },
	});
}

export interface NutritionistItemApi {
	id: string;
	name: string;
	email: string;
	createdAt: string;
}

export interface GetNutritionistsResponse {
	success: boolean;
	message: string | null;
	output: { items: NutritionistItemApi[] } | null;
}

export function getNutritionists(accessToken: string): Promise<GetNutritionistsResponse> {
	return http<GetNutritionistsResponse>("/api/nutritionists", {
		method: "GET",
		baseURL: CLINIC_BASE_URL,
		headers: { Authorization: `Bearer ${accessToken}` },
	});
}

// Nutritionist "me" endpoints

export interface PatientItemApi {
	id: string;
	name: string;
	email: string;
	linkedAt: string;
}

export interface GetMyPatientsResponse {
	success: boolean;
	message: string | null;
	output: { patients: PatientItemApi[] } | null;
}

export function getMyPatients(accessToken: string): Promise<GetMyPatientsResponse> {
	return http<GetMyPatientsResponse>("/api/nutritionists/me/patients", {
		method: "GET",
		baseURL: CLINIC_BASE_URL,
		headers: { Authorization: `Bearer ${accessToken}` },
	});
}

export interface InvitationItemApi {
	id: string;
	email: string;
	token: string;
	status: "Pending" | "Accepted" | "Expired";
	expirationDate: string;
	createdAt: string;
}

export interface GetMyInvitationsResponse {
	success: boolean;
	message: string | null;
	output: { invitations: InvitationItemApi[] } | null;
}

export function getMyInvitations(accessToken: string): Promise<GetMyInvitationsResponse> {
	return http<GetMyInvitationsResponse>("/api/nutritionists/me/invitations", {
		method: "GET",
		baseURL: CLINIC_BASE_URL,
		headers: { Authorization: `Bearer ${accessToken}` },
	});
}

export interface InvitePatientResponse {
	success: boolean;
	message: string | null;
	output: {
		invitationId: string;
		email: string;
		inviteLink: string;
		expirationDate: string;
	} | null;
}

export function invitePatient(
	email: string,
	frontendBaseUrl: string,
	accessToken: string,
): Promise<InvitePatientResponse> {
	return http<InvitePatientResponse>("/api/nutritionists/me/invitations", {
		method: "POST",
		baseURL: CLINIC_BASE_URL,
		headers: { Authorization: `Bearer ${accessToken}` },
		data: { email, frontendBaseUrl },
	});
}

export interface UpdateNutritionistProfileResponse {
	success: boolean;
	message: string | null;
	output: { id: string; name: string; email: string; crn: string | null } | null;
}

export function updateNutritionistProfile(
	data: { name: string; email: string; crn?: string },
	accessToken: string,
): Promise<UpdateNutritionistProfileResponse> {
	return http<UpdateNutritionistProfileResponse>("/api/nutritionists/me/profile", {
		method: "PUT",
		baseURL: CLINIC_BASE_URL,
		headers: { Authorization: `Bearer ${accessToken}` },
		data,
	});
}

export interface AcceptInvitationResponse {
	success: boolean;
	message: string | null;
	output: { nutritionistId: string; nutritionistName: string } | null;
}

export function acceptInvitation(
	token: string,
	accessToken: string,
): Promise<AcceptInvitationResponse> {
	return http<AcceptInvitationResponse>(`/api/invitations/${token}/accept`, {
		method: "POST",
		baseURL: CLINIC_BASE_URL,
		headers: { Authorization: `Bearer ${accessToken}` },
	});
}
