<script setup lang="ts">
import type { GameSettings } from '../types'

interface Props {
  settings: GameSettings | null
}

defineProps<Props>()
</script>

<template>
  <div class="card">
    <div class="flex items-center justify-between">
      <div>
        <h3 class="text-lg font-semibold mb-1">Current Player</h3>
        <div class="flex items-center gap-3">
          <div class="flex items-center gap-2">
            <span class="text-3xl font-bold" :style="{ color: settings?.metadata?.player_x_color || '#3b82f6' }">
              X
            </span>
            <span class="text-gray-400">vs</span>
            <span class="text-3xl font-bold" :style="{ color: settings?.metadata?.player_o_color || '#ef4444' }">
              O
            </span>
          </div>
        </div>
      </div>
      
      <div class="text-right">
        <div class="text-sm text-gray-400 mb-1">Game Mode</div>
        <div class="text-lg font-semibold">Single Player</div>
      </div>
    </div>
  </div>
</template>