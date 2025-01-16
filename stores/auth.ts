import { useCookie } from "nuxt/app"
import { type UserType, type LoginResponseType } from "@/types"
import { Methods, useApi } from "@/composables/useApi.ts"

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
      const { data, status } = await useAsyncData("login", () =>
        request("/auth/login", Methods.POST, {
          body: { username, password },
          headers: { "Content-Type": "application/json" },
        })
      )

      data.value = data.value as LoginResponseType

      if (status.value === "success") {
        this.user.id = data.value.id
        this.user.username = data.value.username
        this.user.firstName = data.value.firstName
        this.user.image = data.value.image

        this.access = data.value.accessToken
        this.refresh = data.value.refreshToken

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
