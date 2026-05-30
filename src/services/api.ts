import axios, { AxiosError, AxiosInstance } from 'axios';

const { BASE_URL } = import.meta.env;
const requestTimeout = 5000;

type ErrorMessage = {
	type: string;
	message: string;
};

const createAPI = (): AxiosInstance => {
	const api = axios.create({
		baseURL: BASE_URL,
		timeout: requestTimeout
	});

	api.interceptors.response.use(
		response => response,
		(error: AxiosError<ErrorMessage>) => {
			if (error.response) {
				const errorMessage = error.response.data.message;
				throw new Error(errorMessage);
			}
			throw error;
		}
	);

	return api;
};

export default createAPI;
