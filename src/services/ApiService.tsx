import axios, { AxiosError, AxiosInstance, AxiosResponse } from "axios";
import { askUserForConnection, getApiToken } from "./AuthService";
import { displayCustomToastError } from "./ToastHelper";

const apiUrl = "https://ynov-topics-comments.ld-web.net/";

const axiosInstance: AxiosInstance = axios.create({
    baseURL: apiUrl,
    timeout: 5000
});

axiosInstance.interceptors.request.use((config) => {
    const apiToken = getApiToken();
    if (apiToken) {
        config.headers["Authorization"] = `Bearer ${apiToken}`;
        config.headers["Content-Type"] = "application/json";
    }
    return config;
});

axiosInstance.interceptors.response.use(
    (response: AxiosResponse) => {
        return response;
    },
    (error: AxiosError) => {
        if (error.response?.status === 401) {
            if(window.location.pathname == "/login") {
                displayCustomToastError("Email ou mot de passe incorrect.");
                throw error;
            } else
                askUserForConnection();
        } else {
            return Promise.reject(error);
        }
    }
);

export const api = axiosInstance;

export function createUnauthorizedError(): AxiosError {
    return {
      name: 'Unauthorized',
      message: 'Unauthorized',
      isAxiosError: true,
      toJSON: () => ({}),
      config: {
        headers: {} as any
      },
      response: {
        data: 'Unauthorized',
        status: 401,
        statusText: 'Unauthorized',
        headers: {},
        config: {
            headers: {} as any
        },
      },
    };
  }