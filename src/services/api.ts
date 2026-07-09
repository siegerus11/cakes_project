import axios, { AxiosError, AxiosInstance } from 'axios';
import { toast, Flip } from 'react-toastify';

import { requestTimeout } from '../constants';
import { processErrorHandle } from './process-error-handle';

const BASE_URL = import.meta.env.VITE_BASE_URL || '/mock-api';

const createAPI = (): AxiosInstance => {
	const api = axios.create({
		baseURL: BASE_URL,
		timeout: requestTimeout
	});

	api.interceptors.response.use(
		response => response,
		(error: AxiosError) => {
			if (error.response || error.request) {
				processErrorHandle(error.message);
				setTimeout(() => {
					toast.error(error.message, {
						position: 'bottom-left',
						transition: Flip,
						draggable: true
					});
				}, 0);
			}
			throw error;
		}
	);

	return api;
};

export default createAPI;
