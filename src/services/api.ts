import axios, { AxiosError, AxiosInstance } from 'axios';
import { toast, Flip } from 'react-toastify';

import { processErrorHandle } from './process-error-handle';

// const { BASE_URL } = import.meta.env;
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
				toast.error(error.message, {
					position: 'bottom-left',
					transition: Flip,
					draggable: true
				});
			} else if (error.request) {
				processErrorHandle(error.message);
				toast.error(`Сервер не отвечает - ${error.message}`, {
					position: 'bottom-left'
				});
			}
			throw error;
		}
	);

	return api;
};

export default createAPI;
