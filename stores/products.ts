import { Methods, useApi } from "@/composables/useApi"
import { type ProductsQuery, type ProductType } from "@/types"

export const useProductsStore = defineStore("productsStore", {
  state: () => ({
    total: 0 as number,
    defaultSortField: "discountPercentage" as string,
    defaultOrder: "desc" as string,
    defaultSort: "discountPercentageDesc" as string,
    productsPerPage: 51 as number,
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
          ? `search/?q=${search}&limit=${this.productsPerPage}`
          : category
            ? `category/${category}/?limit=${this.productsPerPage}`
            : `?limit=${this.productsPerPage}`)
      if (sortBy) url = url + `&sortBy=${sortBy}`
      else url = url + `&sortBy=${this.defaultSortField}`
      if (order) url = url + `&order=${order}`
      else url = url + `&order=${this.defaultOrder}`
      if (page) url = url + `&skip=${page * this.productsPerPage - this.productsPerPage}`

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
