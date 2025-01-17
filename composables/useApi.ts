import { useAuthStore } from "@/stores/auth.ts"
import { useRuntimeConfig } from "nuxt/app"

type BodyType = { [key: string]: string | boolean | number }
type ParamsType = { [key: string]: string | number }
type HeadersType = { [key: string]: string }

export enum Methods {
  GET = "GET",
  POST = "POST",
  DELETE = "DELETE",
}

export const useApi = () => {
  const config = useRuntimeConfig()
  const apiUrl = config.public.API_URL

  const request = async (
    endpoint: string,
    method: Methods,
    { body, params, headers }: { body?: BodyType; params?: ParamsType; headers?: HeadersType }
  ) => {
    const authStore = useAuthStore()
    const authHeaders = authStore.access ? { Authorization: "Bearer " + authStore.access } : {}
    const url = apiUrl + endpoint
    const hdrs = { ...headers, ...authHeaders }

    return await $fetch(url, {
      method,
      params,
      body,
      headers: hdrs,
    })
  }

  return { request }
}
