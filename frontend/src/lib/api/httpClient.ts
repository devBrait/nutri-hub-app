import axios, { type AxiosRequestConfig } from "axios";

type HttpOptions = AxiosRequestConfig & {
	baseUrl?: string;
};

const DEFAULT_BASE_URL = "https://nutrihub-auth.onrender.com";

export async function http<T>(path: string, options: HttpOptions = {}): Promise<T> {
	const { baseUrl = DEFAULT_BASE_URL, headers, ...rest } = options;
	
    const response = await axios.request<T>({
		url: path,
		baseURL: baseUrl,
		headers: {
			"Content-Type": "application/json",
			...headers,
		},
		...rest,
	});

	return response.data;
}
