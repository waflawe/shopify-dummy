<template>
  <main class="bg-def text px-20 py-10">
    <input
      type="text"
      class="w-full px-5 py-1.5 bg-def-600 shadow hover:shadow-md focus:shadow-md placeholder:text-gray-500 text-dark-300 rounded z-0 focus:outline-none"
      placeholder="Search anything..."
      v-model="search"
    />
    <div class="flex items-start gap-x-5 mt-5">
      <div class="w-1/4 relative">
        <div class="sticky left-0 top-0 rounded-lg bg-def-600 h-screen overflow-y-auto">
          <div class="cursor-pointer px-3 hover:bg-gray-200 py-1 dark:hover:bg-[#101010]">
            <div class="py-0.5 text-center">All</div>
            <div class="border-b border-gray-300 dark:border-gray-800 w-[90%] mx-auto"></div>
          </div>

          <div
            v-for="category in categories"
            class="cursor-pointer px-3 hover:bg-gray-200 py-1 dark:hover:bg-[#101010]"
            :key="category"
          >
            <div class="py-0.5 text-center">{{ formatCategory(category) }}</div>
            <div class="border-b border-gray-300 dark:border-gray-800 w-[90%] mx-auto"></div>
          </div>
        </div>
      </div>
      <div class="w-3/4 relative">
        <div class="grid grid-cols-3 gap-x-10 gap-y-3">
          <!--          <NuxtLink :to="{name: 'product', params: {'id': product.id}}" class="col-span-1 w-full h-full" v-for="product in products" :key="product.id">-->
          <div class="col-span-1 w-full h-full" v-for="product in products" :key="product.id">
            <div
              class="mx-auto w-full transition-all overflow-hidden rounded-lg bg-def-600 shadow-md duration-300 hover:scale-[1.03] hover:shadow-lg"
            >
              <img
                class="h-48 w-full object-cover object-center"
                :src="product.thumbnail"
                alt="Product Image"
              />
              <div class="p-4">
                <h2 class="mb-2 text-lg font-medium dark:text-white text-gray-900">
                  {{ product.title }}
                </h2>
                <p class="text-sm dark:text-gray-300 text-gray-700">{{ product.description }}</p>
                <p class="text-dark-300 text-sm mb-2">{{ formatCategory(product.category) }}</p>
                <div class="flex items-center">
                  <p class="mr-2 text-lg font-semibold text-gray-900 dark:text-white">
                    ${{ product.price }}
                  </p>
                  <p class="text-base font-medium text-gray-500 line-through dark:text-gray-300">
                    ${{ (product.price * (1 + product.discountPercentage / 100)).toFixed(2) }}
                  </p>
                  <p class="ml-auto text-base font-medium text-green-500">
                    {{ product.discountPercentage }}% off
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<script setup lang="ts">
import { useQuery } from "@pinia/colada"
import { useProductsStore } from "@/stores/products.ts"
import { formatCategory } from "@/services"
import { ref, watch } from "vue"
import { type ProductType } from "@/types"

const productsStore = useProductsStore()
const products = ref([] as ProductType[] | never[])
const search = ref("")

const { data: categories } = useQuery({
  key: ["cats"],
  query: async () => await productsStore.getCategories(),
})

const fetchProducts = async (query: string): Promise<ProductType[]> => {
  if (query || !products.value.length) {
    return await productsStore.getProducts({ search: query })
  }

  const { data } = useQuery({
    key: ["products"],
    query: async () => await productsStore.getProducts({}),
  })

  return data.value ? data.value : []
}

watch(
  search,
  async (newQuery: string) => {
    products.value = await fetchProducts(newQuery)
  },
  { immediate: true }
)
</script>
