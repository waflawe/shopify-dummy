<template>
  <div
    class="relative inline-block text-left w-64 bg-def-600 rounded"
    :class="{ '': !isOpened, 'outline-none': isOpened }"
    ref="sortDropdown"
  >
    <button class="w-full text-def py-2 px-3 rounded flex bg-def-600" @click="isOpened = !isOpened">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke-width="1.5"
        stroke="currentColor"
        class="my-auto pr-1 size-6"
        v-if="selectedOption.length ? selectedOption.endsWith('Asc') : defaultSort === 'asc'"
      >
        <path stroke-linecap="round" stroke-linejoin="round" d="m4.5 15.75 7.5-7.5 7.5 7.5" />
      </svg>

      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke-width="1.5"
        stroke="currentColor"
        class="my-auto pr-1 size-6"
        v-if="selectedOption.length ? selectedOption.endsWith('Desc') : defaultSort === 'desc'"
      >
        <path stroke-linecap="round" stroke-linejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
      </svg>
      <span>{{ options[selectedOption.length ? selectedOption : defaultOption] }}</span>
    </button>

    <div
      class="transition ease-out duration-200 absolute z-50 mt-2 w-full rounded-md shadow-lg border bg-def-600 border-gray-300 dark:border-gray-800"
      v-if="isOpened"
    >
      <div
        class="py-1 text-def text-base"
        role="menu"
        aria-orientation="vertical"
        aria-labelledby="options-menu"
      >
        <div
          class="px-2 py-2 hover:bg-transparent/30 cursor-pointer flex"
          v-for="option in optionsKeys"
          :key="option"
          role="menuitem"
          @click="changeOption(option)"
        >
          <div class="pr-1">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="my-auto size-6"
              v-if="option.endsWith('Asc')"
            >
              <path stroke-linecap="round" stroke-linejoin="round" d="m4.5 15.75 7.5-7.5 7.5 7.5" />
            </svg>

            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="my-auto size-6"
              v-if="option.endsWith('Desc')"
            >
              <path stroke-linecap="round" stroke-linejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
            </svg>
          </div>
          {{ options[option] }}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from "vue"
import type { ProductSortOptionsType } from "~/types"

const props = defineProps<{
  options: ProductSortOptionsType
  defaultOption: string
  defaultSort?: string
}>()

const emit = defineEmits<{
  (e: "optionChanged", payload: string): void
}>()

const isOpened = ref(false)
const selectedOption = ref("")
const sortDropdown = ref(null)

const changeOption = (option: string) => {
  selectedOption.value = option
  emit("optionChanged", option)
  isOpened.value = false
}

const optionsKeys = computed(() => Object.keys(props.options))

const checkDropdownClose = (event: Event) => {
  if (!(sortDropdown.value && sortDropdown.value.contains(event.target)) && isOpened.value)
    isOpened.value = false
}

onMounted(() => document.body.addEventListener("click", checkDropdownClose))
onUnmounted(() => document.body.removeEventListener("click", checkDropdownClose))
</script>
