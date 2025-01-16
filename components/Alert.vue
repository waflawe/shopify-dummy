<template>
  <div class="relative">
    <div
      class="fixed left-5 top-5 z-50 max-w-xs w-full text-white shadow-lg rounded-lg p-4 flex items-center space-x-3 transition-all transform hover:scale-105"
      :class="{
        'transform translate-x-[-100%] opacity-0': !visible,
        'opacity-100': visible,
        'bg-green-500': theme === AlertThemes.SUCCESS,
        'bg-red-500': theme === AlertThemes.ERROR,
        'bg-gray-500': theme === AlertThemes.LOADING,
      }"
      v-if="visible || isExiting"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="h-6 w-6 text-white"
        viewBox="0 0 20 20"
        fill="currentColor"
      >
        <path
          fill-rule="evenodd"
          d="M16.707 5.293a1 1 0 010 1.414l-8.5 8.5a1 1 0 01-1.414 0l-4.5-4.5a1 1 0 011.414-1.414L8 12.086l7.293-7.293a1 1 0 011.414 0z"
          clip-rule="evenodd"
        />
      </svg>
      <div class="flex-1">
        <p class="font-bold">{{ title }}</p>
        <p class="text-sm">{{ message }}</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineEmits, defineProps, onMounted, ref, onBeforeUnmount } from "vue"
import { AlertThemes, AlertExitModes } from "~/types"

const props = defineProps<{
  title: string
  message: string
  theme: AlertThemes
  mode: AlertExitModes
}>()

const emit = defineEmits<{
  (e: "exited"): void
}>()

const visible = ref(true)
const isExiting = ref(false)
let exitTimeout: NodeJS.Timeout | null = null
let autoExitTimeout: NodeJS.Timeout | null = null

const startAutoExit = () => {
  autoExitTimeout = setTimeout(() => {
    exitAlert()
  }, 4000)
}

const exitAlert = () => {
  isExiting.value = true
  exitTimeout = setTimeout(() => {
    visible.value = false
    emit("exited")
  }, 300)
}

onMounted(() => {
  if (props.mode === AlertExitModes.AUTO) {
    startAutoExit()
  }
})

onBeforeUnmount(() => {
  if (autoExitTimeout) {
    clearTimeout(autoExitTimeout)
  }
  if (exitTimeout) {
    clearTimeout(exitTimeout)
  }

  if (props.mode === AlertExitModes.DEFAULT) {
    exitAlert()
  }
})
</script>
