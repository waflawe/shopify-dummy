import { useAuthStore } from "~/stores/auth"
import { Methods, useApi } from "~/composables/useApi"
import type { CartType } from "~/types"

export const useCartsStore = defineStore("cartsStore", {
  actions: {
    async getCarts(): Promise<CartType[] | undefined> {
      const authStore = useAuthStore()
      const id = authStore.user.id
      const { request } = useApi()
      const response = await request<{ carts: CartType[] }>(`/carts/user/${id}`, Methods.GET, {
        headers: { "Content-Type": "application/json" },
      })
      return response.carts
    },
    async deleteCart(id: number) {
      const { request } = useApi()
      await request(`/carts/${id}`, Methods.DELETE, {})
    },
  },
})
