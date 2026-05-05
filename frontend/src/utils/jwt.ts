export interface JwtPayload {
	sub?: string;
	email?: string;
	name?: string;
	role?: string;
}

export function decodeJwt(token: string): JwtPayload | null {
	try {
		const [, payload] = token.split(".");
		const decoded = atob(payload.replace(/-/g, "+").replace(/_/g, "/"));
		return JSON.parse(decoded) as JwtPayload;
	} catch {
		return null;
	}
}
