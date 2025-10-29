<script setup lang="ts">
import { ref, onMounted } from 'vue'

interface Props {
  bucketSlug: string
}

const props = defineProps<Props>()

const isVisible = ref(false)

onMounted(() => {
  const isDismissed = localStorage.getItem('cosmic-badge-dismissed')
  if (!isDismissed) {
    setTimeout(() => {
      isVisible.value = true
    }, 1000)
  }
})

const handleDismiss = () => {
  isVisible.value = false
  localStorage.setItem('cosmic-badge-dismissed', 'true')
}
</script>

<template>
  <a
    v-if="isVisible"
    :href="`https://www.cosmicjs.com?utm_source=bucket_${bucketSlug}&utm_medium=referral&utm_campaign=app_badge&utm_content=built_with_cosmic`"
    target="_blank"
    rel="noopener noreferrer"
    class="fixed bottom-5 right-5 flex items-center gap-2 text-white text-sm font-medium no-underline transition-colors duration-200 z-50 hover:bg-opacity-90"
    style="
      position: fixed;
      background-color: #11171A;
      border-radius: 8px;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
      padding: 12px 16px;
      width: 180px;
    "
  >
    <button
      @click.prevent.stop="handleDismiss"
      class="absolute -top-2 -right-2 w-6 h-6 bg-gray-600 hover:bg-gray-700 text-white rounded-full flex items-center justify-center text-sm font-bold transition-colors duration-200 z-10"
      style="
        position: absolute;
        top: -8px;
        right: -8px;
        width: 24px;
        height: 24px;
        background: #6b7280;
        border: none;
        border-radius: 50%;
        color: white;
        font-size: 16px;
        font-weight: bold;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        transition: background-color 0.2s;
      "
      aria-label="Dismiss badge"
    >
      ×
    </button>
    
    <img 
      src="https://cdn.cosmicjs.com/b67de7d0-c810-11ed-b01d-23d7b265c299-logo508x500.svg" 
      alt="Cosmic Logo" 
      class="w-5 h-5"
    />
    Built with Cosmic
  </a>
</template>