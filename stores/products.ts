import { Methods, useApi } from "@/composables/useApi"
import { type ProductsQuery, type ProductType } from "@/types"

export const useProductsStore = defineStore("productsStore", {
  actions: {
    async getProducts({ search, category, sortBy, order }: ProductsQuery): Promise<ProductType[]> {
      let url =
        "/products/" +
        (search
          ? `search/?q=${search}&limit=50`
          : category
            ? `category/${category}/?limit=50`
            : "?limit=50")
      if (sortBy) url = url + `&sortBy=${sortBy}`
      if (order) url = url + `&order=${order}`

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
  },
})
