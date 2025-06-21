import axios, { type AxiosRequestConfig, type AxiosResponse } from 'axios'
import { env } from '@/env'

export const apiInstance = axios.create({
  baseURL: env.VITE_BACKEND_URL,
})

type SafeParamsAxiosRequestConfig<Params, Body = void> = Omit<
  AxiosRequestConfig<Body>,
  'params'
> & {
  params?: Params
}

export const api = {
  get: <Res, Params = void>(
    url: string,
    config?: SafeParamsAxiosRequestConfig<Params>
  ) => apiInstance.get<Res, AxiosResponse<Res>>(url, config),

  post: <Body = void, Res = void, Params = void>(
    url: string,
    body?: Body,
    config?: SafeParamsAxiosRequestConfig<Params, Body>
  ) => apiInstance.post<Res, AxiosResponse<Res>, Body>(url, body, config),

  put: <Body = void, Res = void, Params = void>(
    url: string,
    body?: Body,
    config?: SafeParamsAxiosRequestConfig<Params, Body>
  ) => apiInstance.put<Res, AxiosResponse<Res>, Body>(url, body, config),

  patch: <Body = void, Res = void, Params = void>(
    url: string,
    body?: Body,
    config?: SafeParamsAxiosRequestConfig<Params, Body>
  ) => apiInstance.patch<Res, AxiosResponse<Res>, Body>(url, body, config),

  delete: <Res = void, Params = void>(
    url: string,
    config?: SafeParamsAxiosRequestConfig<Params>
  ) => apiInstance.delete<Res, AxiosResponse<Res>>(url, config),
}
