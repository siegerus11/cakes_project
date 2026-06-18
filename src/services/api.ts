import axios, { AxiosError, AxiosInstance } from 'axios';

import { requestTimeout } from '../constants';
import { processErrorHandle } from './process-error-handle';

const { BASE_URL } = import.meta.env;
const MOCK_BASE_URL = '../../mock-api';

const createAPI = (): AxiosInstance => {
	const api = axios.create({
		baseURL: MOCK_BASE_URL,
		timeout: requestTimeout
	});

	api.interceptors.response.use(
		response => response,
		(error: AxiosError) => {
			if (error.response || error.request) {
				processErrorHandle(error.message);
			}

			throw error;
		}
	);

	return api;
};

export default createAPI;
