import { Methods, useApi } from "@/composables/useApi"
import { type ProductsQuery, type ProductType } from "@/types"

export const useProductsStore = defineStore("productsStore", {
  state: () => ({
    total: 0 as number,
    defaultSortField: "discountPercentage" as string,
    defaultOrder: "desc" as string,
    defaultSort: "discountPercentageDesc" as string,
  }),
  actions: {
    async getProducts({
      search,
      category,
      sortBy,
      order,
      page,
    }: ProductsQuery): Promise<ProductType[]> {
      let url =
        "/products/" +
        (search
          ? `search/?q=${search}&limit=50`
          : category
            ? `category/${category}/?limit=50`
            : "?limit=50")
      if (sortBy) url = url + `&sortBy=${sortBy}`
      else url = url + `&sortBy=${this.defaultSortField}`
      if (order) url = url + `&order=${order}`
      else url = url + `&order=${this.defaultOrder}`
      if (page) url = url + `&skip=${page * 50 - 50}`

      const { request } = useApi()
      const response = await request<{
        products: ProductType[]
        total: number
      }>(url, Methods.GET, {})

      this.total = response.total

      return response.products
    },
    async getCategories(): Promise<string[]> {
      const { request } = useApi()
      return await request<string[]>("/products/category-list", Methods.GET, {})
    },
  },
})
