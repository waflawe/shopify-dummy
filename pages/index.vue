<template>
  <main class="overflow-hidden" style="height: calc(100vh - 3.5rem)">
    <div class="h-full relative w-full overflow-hidden">
      <img
        src="https://png.pngtree.com/background/20230614/original/pngtree-image-of-shopping-mall-ecommerce-with-an-isometric-background-picture-image_3476197.jpg"
        alt=""
        class="absolute inset-0 w-full h-screen object-cover"
      />
      <div
        class="pt-36 puritan absolute inset-0 z-10 text-white text-center h-full w-full bg-black bg-opacity-75"
      >
        <p class="text-white text-8xl">Welcome to the<br />ShopifyDummy!</p>
      </div>
    </div>
  </main>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted } from "vue"

onMounted(() => {
  document.body.style.overflow = "hidden"
})

onUnmounted(() => {
  document.body.style.overflow = ""
})
</script>
