<template>
  <Alert
    title="Loading"
    message="Please, wait..."
    :theme="AlertThemes.LOADING"
    :mode="AlertExitModes.DEFAULT"
    v-if="loading"
  />
  <Alert
    title="Success"
    :message="successMessage"
    :theme="AlertThemes.SUCCESS"
    :mode="AlertExitModes.AUTO"
    @exited="showSuccessAlert = false"
    v-if="showSuccessAlert"
  />
  <Alert
    title="Error"
    message="Something went wrong :("
    :theme="AlertThemes.ERROR"
    :mode="AlertExitModes.AUTO"
    @exited="showErrorAlert = false"
    v-if="showErrorAlert"
  />
</template>

<script setup lang="ts">
import { ref, nextTick } from "vue"
import { AlertExitModes, AlertThemes } from "~/types"

const emit = defineEmits<{
  (exitDialog: "exitDialog"): void
}>()

const props = defineProps<{
  successMessage: string
}>()

const loading = ref(false)
const showSuccessAlert = ref(false)
const showErrorAlert = ref(false)

const submit = async (callback: () => Promise<boolean>) => {
  showSuccessAlert.value = false
  showErrorAlert.value = false

  loading.value = true
  const status = await callback()
  loading.value = false

  await nextTick()

  if (status) {
    emit("exitDialog")
    await nextTick()
    showSuccessAlert.value = true
  } else {
    showErrorAlert.value = true
  }
}

defineExpose({ submit })
</script>
