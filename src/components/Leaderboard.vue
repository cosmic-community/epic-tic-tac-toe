<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { cosmic } from '../lib/cosmic'
import type { LeaderboardEntry, LeaderboardStats, CosmicResponse } from '../types'

const leaderboardData = ref<LeaderboardEntry[]>([])
const loading = ref(true)
const error = ref<string | null>(null)
const sortBy = ref<'wins' | 'winRate'>('wins')

const fetchLeaderboard = async () => {
  try {
    loading.value = true
    error.value = null
    
    const response = await cosmic.objects
      .find({ type: 'leaderboard' })
      .props(['id', 'title', 'metadata']) as CosmicResponse<LeaderboardEntry>
    
    if (response.objects) {
      leaderboardData.value = response.objects
    }
  } catch (err) {
    console.error('Error fetching leaderboard:', err)
    error.value = 'Failed to load leaderboard'
  } finally {
    loading.value = false
  }
}

const leaderboardWithStats = computed<LeaderboardStats[]>(() => {
  return leaderboardData.value.map(entry => ({
    ...entry,
    winRate: entry.metadata.games_played > 0 
      ? (entry.metadata.wins / entry.metadata.games_played) * 100 
      : 0
  }))
})

const sortedLeaderboard = computed(() => {
  const data = [...leaderboardWithStats.value]
  
  if (sortBy.value === 'wins') {
    return data.sort((a, b) => b.metadata.wins - a.metadata.wins)
  } else {
    return data.sort((a, b) => b.winRate - a.winRate)
  }
})

const toggleSort = () => {
  sortBy.value = sortBy.value === 'wins' ? 'winRate' : 'wins'
}

onMounted(() => {
  fetchLeaderboard()
})
</script>

<template>
  <div class="card">
    <div class="flex justify-between items-center mb-6">
      <h2 class="text-2xl font-bold flex items-center gap-2">
        🏆 Leaderboard
      </h2>
      <button
        @click="toggleSort"
        class="text-sm px-3 py-1 bg-accent rounded-lg hover:bg-accent/80 transition-colors"
      >
        Sort by: {{ sortBy === 'wins' ? 'Wins' : 'Win Rate' }}
      </button>
    </div>

    <!-- Loading State -->
    <div v-if="loading" class="flex justify-center py-8">
      <div class="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primary"></div>
    </div>

    <!-- Error State -->
    <div v-else-if="error" class="text-center text-red-400 py-8">
      <p>{{ error }}</p>
      <button @click="fetchLeaderboard" class="btn btn-primary mt-4">
        Retry
      </button>
    </div>

    <!-- Leaderboard List -->
    <div v-else-if="sortedLeaderboard.length > 0" class="space-y-3">
      <div
        v-for="(entry, index) in sortedLeaderboard"
        :key="entry.id"
        class="bg-dark rounded-lg p-4 hover:bg-accent/20 transition-colors"
      >
        <div class="flex items-center justify-between">
          <div class="flex items-center gap-3">
            <div
              :class="[
                'w-8 h-8 rounded-full flex items-center justify-center font-bold',
                index === 0 ? 'bg-yellow-500 text-dark' : 
                index === 1 ? 'bg-gray-400 text-dark' :
                index === 2 ? 'bg-orange-600 text-white' :
                'bg-accent text-white'
              ]"
            >
              {{ index + 1 }}
            </div>
            <div>
              <h3 class="font-semibold">{{ entry.metadata.player_name }}</h3>
              <p class="text-sm text-gray-400">
                {{ entry.metadata.games_played }} games
              </p>
            </div>
          </div>
          <div class="text-right">
            <div class="text-lg font-bold text-primary">
              {{ entry.metadata.wins }} wins
            </div>
            <div class="text-sm text-gray-400">
              {{ entry.winRate.toFixed(1) }}% win rate
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Empty State -->
    <div v-else class="text-center text-gray-400 py-8">
      <p>No leaderboard entries yet.</p>
      <p class="text-sm mt-2">Play some games to get started!</p>
    </div>
  </div>
</template>