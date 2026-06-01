import axios, { AxiosError, AxiosInstance } from 'axios';

import { processErrorHandle } from './process-error-handle';

const { BASE_URL } = import.meta.env;
const MOCK_BASE_URL = '../../mock-api';

const requestTimeout = 5000;

const createAPI = (): AxiosInstance => {
	const api = axios.create({
		baseURL: MOCK_BASE_URL,
		timeout: requestTimeout
	});

	api.interceptors.response.use(
		response => response,
		(error: AxiosError) => {
			if (error.response) {
				processErrorHandle(error.message);
				console.log(error.response);
				console.log(error);
			}
			throw error;
		}
	);

	return api;
};

export default createAPI;
