import axios, { AxiosError } from 'axios';

const BASE_URL = 'https://grading.design.pages.academy/v1/balda/';
const requestTimeout = 5000;

type ErrorMessage = {
	type: string;
	message: string;
};

const createAPI = () => {
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
