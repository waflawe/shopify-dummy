<template>
  <div class="flex items-center justify-center mt-10 space-x-2" v-if="pagesCount > 1">
    <div
      class="bg-def-600 px-2 py-1 sm:px-4 sm:py-2 text rounded-lg hover:filter hover:brightness-[1.25] border border-gray-500"
      @click="() => paginate(activePage - 1)"
      v-if="pagesCount > 3"
    >
      <
    </div>
    <div
      class="bg-def-600 px-2 py-1 sm:px-4 sm:py-2 text rounded-lg hover:filter hover:brightness-[1.25]"
      :class="{
        'border-2 border-emerald-500': activePage === prevPgnBtn,
        'border border-gray-500': activePage !== prevPgnBtn,
      }"
      @click="() => paginate(prevPgnBtn)"
    >
      {{ prevPgnBtn }}
    </div>
    <div
      class="bg-def-600 px-2 py-1 sm:px-4 sm:py-2 text rounded-lg hover:filter hover:brightness-[1.25]"
      :class="{
        'border-2 border-emerald-500': activePage === middlePgnBtn,
        'border border-gray-500': activePage !== middlePgnBtn,
      }"
      @click="() => paginate(middlePgnBtn)"
    >
      {{ middlePgnBtn }}
    </div>
    <div
      class="bg-def-600 px-2 py-1 sm:px-4 sm:py-2 text rounded-lg hover:filter hover:brightness-[1.25]"
      :class="{
        'border-2 border-emerald-500': activePage === nextPgnBtn,
        'border border-gray-500': activePage !== nextPgnBtn,
      }"
      @click="() => paginate(nextPgnBtn)"
      v-if="nextPgnBtn"
    >
      {{ nextPgnBtn }}
    </div>
    <div
      class="bg-def-600 px-2 py-1 sm:px-4 sm:py-2 text rounded-lg hover:filter hover:brightness-[1.25] border border-gray-500"
      @click="() => paginate(activePage + 1)"
      v-if="pagesCount > 3"
    >
      >
    </div>
  </div>
</template>

<script setup lang="ts">
import { useProductsStore } from "@/stores/products"
import { useRoute } from "vue-router"

const emit = defineEmits<{
  (e: "paginate", payload: number): void
}>()

const route = useRoute()
const productsStore = useProductsStore()
const pagesCount = computed(() => Math.ceil(productsStore.total / 50))
const activePage = ref(1)

const pgnBtn = (btn: "prev" | "middle", active: number) => {
  if (active === 1) return btn === "prev" ? 1 : 2
  else if (active === pagesCount.value && active - 2 > 0) return active - (btn === "prev" ? 2 : 1)
  else if (active === pagesCount.value && active - 2 <= 0) return active - (btn === "prev" ? 1 : 0)
  else return active - (btn === "prev" ? 1 : 0)
}

const prevPgnBtn = computed(() => pgnBtn("prev", activePage.value))
const middlePgnBtn = computed(() => pgnBtn("middle", activePage.value))
const nextPgnBtn = computed(() => {
  if (pagesCount.value < 3) return 0
  else if (activePage.value === 1) return activePage.value + 2
  else if (activePage.value === pagesCount.value) return activePage.value
  else return activePage.value + 1
})

const paginate = (page: number) => {
  if (page === activePage.value || page < 1 || page > pagesCount.value) return
  activePage.value = page
  emit("paginate", page)
}

onMounted(() => (activePage.value = route.query.page ? +route.query.page : 1))
</script>
