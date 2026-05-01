import { http } from "./httpClient";

export type UserRole = "Patient" | "Nutritionist" | "Admin";

export interface RegisterRequest {
	name: string;
	email: string;
	password: string;
	role: UserRole;
}

export interface RegisterResponse {
	success: boolean;
	accessToken: string | null;
	refreshToken: string | null;
	userId: string | null;
	name: string | null;
	role: UserRole | null;
	message: string | null;
	errors: string[];
}

export interface LoginRequest {
	email: string;
	password: string;
}

export interface LoginResponse {
	success: boolean;
	accessToken: string | null;
	refreshToken: string | null;
	userId: string | null;
	name: string | null;
	role: UserRole | null;
	errors: string[];
}

export function register(data: RegisterRequest): Promise<RegisterResponse> {
	return http<RegisterResponse>("/api/auth/register", {
		method: "POST",
		data,
	});
}

export function login(data: LoginRequest): Promise<LoginResponse> {
	return http<LoginResponse>("/api/auth/login", {
		method: "POST",
		data,
	});
}

export function logout(accessToken: string): Promise<void> {
	return http("/api/auth/logout", {
		method: "POST",
		headers: { Authorization: `Bearer ${accessToken}` },
	});
}
