import axios, { type AxiosRequestConfig } from "axios";

type HttpOptions = AxiosRequestConfig & {
	baseUrl?: string;
};

export async function http<T>(path: string, options: HttpOptions = {}): Promise<T> {
	const { baseUrl, headers, ...rest } = options;

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
