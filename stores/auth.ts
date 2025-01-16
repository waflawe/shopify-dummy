import { useCookie } from "nuxt/app"
import {
  type UserType,
  type LoginResponseType,
  type CurrentAuthenticatedUserResponseType,
  type UserExtendedDataType,
} from "@/types"
import { Methods, useApi } from "@/composables/useApi.ts"
import { transformResponseToUserExtendedData } from "~/services"

export const useAuthStore = defineStore("authStore", {
  state: () => ({
    user: {
      id: undefined,
      username: undefined,
      firstName: undefined,
      image: undefined,
    } as UserType,
    access: (useCookie("access").value ?? "") as string,
    refresh: (useCookie("refresh").value ?? "") as string,
    isAuth: !!useCookie("access").value as boolean,
  }),
  actions: {
    init() {
      const access = useCookie("access")
      if (access.value) {
        this.user = useCookie("user").value! as UserType
        this.access = access.value!
        this.refresh = useCookie("refresh").value!
        this.isAuth = true
      }
    },

    async login(username: string, password: string): Promise<boolean> {
      const { request } = useApi()
      const { data, status } = await useAsyncData(`login-${Date.now()}`, () =>
        request("/auth/login", Methods.POST, {
          body: { username, password },
          headers: { "Content-Type": "application/json" },
        })
      )

      const response = data.value as LoginResponseType

      if (status.value === "success") {
        this.user.id = response.id
        this.user.username = response.username
        this.user.firstName = response.firstName
        this.user.image = response.image

        this.access = response.accessToken
        this.refresh = response.refreshToken

        const user = useCookie("user")
        user.value = this.user
        const access = useCookie("access")
        access.value = this.access
        const refresh = useCookie("refresh")
        refresh.value = this.refresh

        this.isAuth = true
      }

      return this.isAuth
    },

    async getMe(): Promise<UserExtendedDataType | undefined> {
      const { request } = useApi()
      const { data, status } = await useAsyncData(`getMe-${Date.now()}`, () =>
        request("/users/me", Methods.GET, {
          headers: { "Content-Type": "application/json" },
        })
      )

      const response = data.value as CurrentAuthenticatedUserResponseType

      if (status.value === "success") {
        return transformResponseToUserExtendedData(response)
      }
    },

    logout() {
      if (this.isAuth) {
        this.user = {}
        this.access = ""
        this.refresh = ""
        const user = useCookie("user")
        user.value = null
        const access = useCookie("access")
        access.value = null
        const refresh = useCookie("refresh")
        refresh.value = null
        this.isAuth = false
      }
    },
  },
})
