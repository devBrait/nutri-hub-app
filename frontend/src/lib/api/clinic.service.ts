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

export interface MyNutritionistResponse {
	success: boolean;
	message: string | null;
	output: { id: string; name: string; email: string; linkedAt: string } | null;
}

export function getMyNutritionist(accessToken: string): Promise<MyNutritionistResponse> {
	return http<MyNutritionistResponse>("/api/patients/me/nutritionist", {
		method: "GET",
		baseURL: CLINIC_BASE_URL,
		headers: { Authorization: `Bearer ${accessToken}` },
	});
}

export interface UnlinkNutritionistResponse {
	success: boolean;
	message: string | null;
	output: null;
}

export function unlinkNutritionist(accessToken: string): Promise<UnlinkNutritionistResponse> {
	return http<UnlinkNutritionistResponse>("/api/patients/me/nutritionist", {
		method: "DELETE",
		baseURL: CLINIC_BASE_URL,
		headers: { Authorization: `Bearer ${accessToken}` },
	});
}

export interface RequestTrackingResponse {
	success: boolean;
	message: string | null;
	output: { nutritionistId: string; nutritionistName: string } | null;
}

export function requestTracking(
	nutritionistId: string,
	accessToken: string,
): Promise<RequestTrackingResponse> {
	return http<RequestTrackingResponse>(`/api/patients/me/tracking-request/${nutritionistId}`, {
		method: "POST",
		baseURL: CLINIC_BASE_URL,
		headers: { Authorization: `Bearer ${accessToken}` },
	});
}

export interface PatientTrackingRequestItem {
	id: string;
	nutritionistId: string;
	status: "Pending" | "Accepted" | "Rejected";
	createdAt: string;
}

export interface GetPatientTrackingRequestsResponse {
	success: boolean;
	message: string | null;
	output: { requests: PatientTrackingRequestItem[] } | null;
}

export function getMyTrackingRequests(accessToken: string): Promise<GetPatientTrackingRequestsResponse> {
	return http<GetPatientTrackingRequestsResponse>("/api/patients/me/tracking-requests", {
		method: "GET",
		baseURL: CLINIC_BASE_URL,
		headers: { Authorization: `Bearer ${accessToken}` },
	});
}

export interface NutritionistTrackingRequestItem {
	id: string;
	patientId: string;
	patientName: string;
	patientEmail: string;
	status: "Pending" | "Accepted" | "Rejected";
	createdAt: string;
}

export interface GetNutritionistTrackingRequestsResponse {
	success: boolean;
	message: string | null;
	output: { requests: NutritionistTrackingRequestItem[] } | null;
}

export function getNutritionistTrackingRequests(accessToken: string): Promise<GetNutritionistTrackingRequestsResponse> {
	return http<GetNutritionistTrackingRequestsResponse>("/api/nutritionists/me/tracking-requests", {
		method: "GET",
		baseURL: CLINIC_BASE_URL,
		headers: { Authorization: `Bearer ${accessToken}` },
	});
}

export interface RespondTrackingRequestResponse {
	success: boolean;
	message: string | null;
	output: { patientId: string; patientName: string } | null;
}

export function acceptTrackingRequest(requestId: string, accessToken: string): Promise<RespondTrackingRequestResponse> {
	return http<RespondTrackingRequestResponse>(`/api/nutritionists/me/tracking-requests/${requestId}/accept`, {
		method: "POST",
		baseURL: CLINIC_BASE_URL,
		headers: { Authorization: `Bearer ${accessToken}` },
	});
}

export function rejectTrackingRequest(requestId: string, accessToken: string): Promise<RespondTrackingRequestResponse> {
	return http<RespondTrackingRequestResponse>(`/api/nutritionists/me/tracking-requests/${requestId}/reject`, {
		method: "POST",
		baseURL: CLINIC_BASE_URL,
		headers: { Authorization: `Bearer ${accessToken}` },
	});
}
