<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import { checkWinner, isBoardFull, getBestMove } from '../lib/gameLogic'
import type { Board, Player, GameStatus as GameStatusType, GameSettings } from '../types'

interface Props {
  settings: GameSettings | null
}

const props = defineProps<Props>()

const board = ref<Board>(Array(9).fill(null))
const currentPlayer = ref<Player>('X')
const gameStatus = ref<GameStatusType>('playing')
const winner = ref<Player>(null)
const winningLine = ref<number[]>([])
const vsAI = ref(true)

const playerXColor = computed(() => props.settings?.metadata?.player_x_color || '#3b82f6')
const playerOColor = computed(() => props.settings?.metadata?.player_o_color || '#ef4444')

const makeMove = (index: number) => {
  if (board.value[index] || gameStatus.value !== 'playing') return
  
  board.value[index] = currentPlayer.value
  checkGameStatus()
  
  if (gameStatus.value === 'playing') {
    currentPlayer.value = currentPlayer.value === 'X' ? 'O' : 'X'
    
    // AI move
    if (vsAI.value && currentPlayer.value === 'O') {
      setTimeout(() => {
        makeAIMove()
      }, 500)
    }
  }
}

const makeAIMove = () => {
  if (gameStatus.value !== 'playing') return
  
  const bestMove = getBestMove([...board.value], 'O')
  if (bestMove !== -1) {
    board.value[bestMove] = 'O'
    checkGameStatus()
    currentPlayer.value = 'X'
  }
}

const checkGameStatus = () => {
  const result = checkWinner(board.value)
  
  if (result.winner) {
    gameStatus.value = 'won'
    winner.value = result.winner
    winningLine.value = result.line
  } else if (isBoardFull(board.value)) {
    gameStatus.value = 'draw'
  }
}

const resetGame = () => {
  board.value = Array(9).fill(null)
  currentPlayer.value = 'X'
  gameStatus.value = 'playing'
  winner.value = null
  winningLine.value = []
}

const toggleMode = () => {
  vsAI.value = !vsAI.value
  resetGame()
}

const getCellColor = (cellValue: Player) => {
  if (cellValue === 'X') return playerXColor.value
  if (cellValue === 'O') return playerOColor.value
  return 'transparent'
}

const isWinningCell = (index: number) => {
  return winningLine.value.includes(index)
}
</script>

<template>
  <div class="card">
    <!-- Mode Toggle -->
    <div class="flex justify-between items-center mb-6">
      <h2 class="text-2xl font-bold">Game Board</h2>
      <button
        @click="toggleMode"
        class="px-4 py-2 bg-accent text-white rounded-lg hover:bg-accent/80 transition-colors"
      >
        {{ vsAI ? '🤖 VS AI' : '👥 VS Player' }}
      </button>
    </div>

    <!-- Game Board Grid -->
    <div class="grid grid-cols-3 gap-3 mb-6">
      <button
        v-for="(cell, index) in board"
        :key="index"
        @click="makeMove(index)"
        :disabled="gameStatus !== 'playing' || (vsAI && currentPlayer === 'O')"
        :class="[
          'aspect-square rounded-lg font-bold text-4xl transition-all duration-200',
          'flex items-center justify-center',
          'hover:scale-105 hover:shadow-lg',
          isWinningCell(index) ? 'ring-4 ring-yellow-400 bg-yellow-400/20' : 'bg-dark',
          cell ? 'cursor-default' : 'cursor-pointer hover:bg-accent/30'
        ]"
        :style="{ color: getCellColor(cell) }"
      >
        {{ cell }}
      </button>
    </div>

    <!-- Game Status Message -->
    <div v-if="gameStatus !== 'playing'" class="text-center mb-4">
      <p class="text-2xl font-bold mb-4">
        <span v-if="gameStatus === 'won'">
          {{ settings?.metadata?.win_message || '🎉 Congratulations! You won!' }}
        </span>
        <span v-else>
          {{ settings?.metadata?.draw_message || '🤝 It\'s a draw! Well played!' }}
        </span>
      </p>
      <p v-if="gameStatus === 'won'" class="text-xl" :style="{ color: getCellColor(winner) }">
        Player {{ winner }} wins!
      </p>
    </div>

    <!-- Reset Button -->
    <button
      @click="resetGame"
      class="w-full btn btn-primary"
    >
      New Game
    </button>
  </div>
</template>