import { env } from "../config/env";

type HttpOptions = RequestInit & {
	baseUrl?: string;
};

export async function http<T>(path: string, options: HttpOptions = {}): Promise<T> {
	const { baseUrl = env.authApiUrl, headers, ...rest } = options;
	const response = await fetch(`${baseUrl}${path}`, {
		...rest,
		headers: {
			"Content-Type": "application/json",
			...headers,
		},
	});

	return response.json() as Promise<T>;
}
