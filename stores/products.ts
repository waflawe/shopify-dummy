import { Methods, useApi } from "@/composables/useApi"
import { type ProductType } from "@/types"

type ProductsQuery = {
  search?: string
}

export const useProductsStore = defineStore("productsStore", {
  actions: {
    async getProducts({ search }: ProductsQuery): Promise<ProductType[]> {
      let url = "/products/"
      url = search ? url + `search/?q=${search}&limit=50` : url + "?limit=50"
      const { request } = useApi()
      const response = await request<{
        products: ProductType[]
      }>(url, Methods.GET, {})

      return response.products
    },
    async getCategories(): Promise<string[]> {
      const { request } = useApi()
      return await request<string[]>("/products/category-list", Methods.GET, {})
    },
    async filterByCategory(slug: string): Promise<ProductType[]> {
      const url = `/products/category/${slug}`
      const { request } = useApi()
      const response = await request<{
        products: ProductType[]
      }>(url, Methods.GET, {})

      return response.products
    },
  },
})
