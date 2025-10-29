<script setup lang="ts">
import { ref, onMounted } from 'vue'
import GameBoard from './components/GameBoard.vue'
import Leaderboard from './components/Leaderboard.vue'
import GameStatus from './components/GameStatus.vue'
import CosmicBadge from './components/CosmicBadge.vue'
import { cosmic, bucketSlug } from './lib/cosmic'
import type { GameSettings, CosmicResponse } from './types'

const gameSettings = ref<GameSettings | null>(null)
const loading = ref(true)
const error = ref<string | null>(null)

const fetchGameSettings = async () => {
  try {
    loading.value = true
    error.value = null
    
    const response = await cosmic.objects
      .findOne({
        type: 'game-settings',
        slug: 'tic-tac-toe-configuration'
      })
      .props(['id', 'title', 'metadata']) as CosmicResponse<GameSettings>
    
    if (response.object) {
      gameSettings.value = response.object
    }
  } catch (err) {
    console.error('Error fetching game settings:', err)
    error.value = 'Failed to load game settings'
    // Set default values if fetch fails
    gameSettings.value = {
      id: '',
      slug: '',
      title: 'Epic Tic-Tac-Toe',
      type: 'game-settings',
      created_at: '',
      modified_at: '',
      metadata: {
        game_title: 'Epic Tic-Tac-Toe',
        game_description: 'Challenge your friends or play against the AI!',
        win_message: '🎉 Congratulations! You won!',
        draw_message: '🤝 It\'s a draw! Well played!',
        player_x_color: '#3b82f6',
        player_o_color: '#ef4444',
        enable_sound: false
      }
    }
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  fetchGameSettings()
})
</script>

<template>
  <div class="min-h-screen bg-dark py-8 px-4">
    <div class="max-w-7xl mx-auto">
      <!-- Header -->
      <header class="text-center mb-12">
        <h1 class="text-5xl font-bold mb-4 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
          {{ gameSettings?.metadata?.game_title || 'Epic Tic-Tac-Toe' }}
        </h1>
        <p class="text-gray-400 text-lg max-w-2xl mx-auto">
          {{ gameSettings?.metadata?.game_description || 'Challenge your friends or play against the AI in this classic strategy game.' }}
        </p>
      </header>

      <!-- Loading State -->
      <div v-if="loading" class="flex justify-center items-center py-20">
        <div class="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-primary"></div>
      </div>

      <!-- Error State -->
      <div v-else-if="error" class="card text-center text-red-400 max-w-md mx-auto">
        <p>{{ error }}</p>
        <button @click="fetchGameSettings" class="btn btn-primary mt-4">
          Retry
        </button>
      </div>

      <!-- Main Content -->
      <div v-else class="grid lg:grid-cols-3 gap-8">
        <!-- Game Area -->
        <div class="lg:col-span-2 space-y-6">
          <GameStatus :settings="gameSettings" />
          <GameBoard :settings="gameSettings" />
        </div>

        <!-- Leaderboard -->
        <div class="lg:col-span-1">
          <Leaderboard />
        </div>
      </div>
    </div>

    <!-- Cosmic Badge -->
    <CosmicBadge :bucket-slug="bucketSlug" />
  </div>
</template>