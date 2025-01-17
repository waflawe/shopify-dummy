<template>
  <Alert
    title="Success"
    message="Account deleted"
    :theme="AlertThemes.SUCCESS"
    :mode="AlertExitModes.AUTO"
    @exited="showDeleteAlert = false"
    v-if="showDeleteAlert"
  />
  <main style="height: calc(100vh - 3.5rem)">
    <div class="h-full relative w-full">
      <img
        src="https://png.pngtree.com/background/20230614/original/pngtree-image-of-shopping-mall-ecommerce-with-an-isometric-background-picture-image_3476197.jpg"
        alt="ecommerce bg"
        class="w-full h-screen object-cover"
      />
      <div class="absolute inset-0 bg-black opacity-75"></div>
      <div class="absolute inset-0 flex pt-36 justify-center puritan z-10 text-white">
        <p class="text-8xl">Welcome to the<br />ShopifyDummy!</p>
      </div>
    </div>
  </main>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted, ref } from "vue"
import { useRoute } from "vue-router"
import { AlertExitModes, AlertThemes } from "~/types"

const showDeleteAlert = ref(false)
const route = useRoute()

onMounted(() => {
  if (route.query.action === "delete-account") showDeleteAlert.value = true
  document.body.style.overflow = "hidden"
})

onUnmounted(() => {
  document.body.style.overflow = ""
})
</script>
