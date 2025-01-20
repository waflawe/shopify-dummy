import { Methods, useApi } from "@/composables/useApi.ts"
import { type Product } from "@/types"

type ProductsQuery = {
  search?: string
}

export const useProductsStore = defineStore("productsStore", {
  actions: {
    async getProducts({ search }: ProductsQuery): Promise<Product[]> {
      let url = "/products/"
      url = search ? url + `search/?q=${search}&limit=50` : url + "?limit=50"
      const { request } = useApi()
      const response = await request<{
        products: Product[]
      }>(url, Methods.GET, {})

      return response.products
    },
    async getCategories(): Promise<string[]> {
      const { request } = useApi()
      return await request<string[]>("/products/category-list", Methods.GET, {})
    },
  },
})
