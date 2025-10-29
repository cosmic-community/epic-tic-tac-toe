import type { Player, Board } from '@/types'

const WINNING_COMBINATIONS = [
  [0, 1, 2], // Top row
  [3, 4, 5], // Middle row
  [6, 7, 8], // Bottom row
  [0, 3, 6], // Left column
  [1, 4, 7], // Middle column
  [2, 5, 8], // Right column
  [0, 4, 8], // Diagonal top-left to bottom-right
  [2, 4, 6], // Diagonal top-right to bottom-left
]

export function checkWinner(board: Board): { winner: Player; line: number[] } {
  for (const combination of WINNING_COMBINATIONS) {
    const [a, b, c] = combination
    const cellA = board[a]
    const cellB = board[b]
    const cellC = board[c]
    
    if (cellA && cellA === cellB && cellA === cellC) {
      return { winner: cellA, line: combination }
    }
  }
  return { winner: null, line: [] }
}

export function isBoardFull(board: Board): boolean {
  return board.every(cell => cell !== null)
}

export function getAvailableMoves(board: Board): number[] {
  return board
    .map((cell, index) => (cell === null ? index : -1))
    .filter(index => index !== -1)
}

export function minimax(
  board: Board,
  depth: number,
  isMaximizing: boolean,
  aiPlayer: Player,
  humanPlayer: Player
): number {
  const { winner } = checkWinner(board)
  
  if (winner === aiPlayer) return 10 - depth
  if (winner === humanPlayer) return depth - 10
  if (isBoardFull(board)) return 0
  
  if (isMaximizing) {
    let bestScore = -Infinity
    const availableMoves = getAvailableMoves(board)
    
    for (const move of availableMoves) {
      board[move] = aiPlayer
      const score = minimax(board, depth + 1, false, aiPlayer, humanPlayer)
      board[move] = null
      bestScore = Math.max(score, bestScore)
    }
    return bestScore
  } else {
    let bestScore = Infinity
    const availableMoves = getAvailableMoves(board)
    
    for (const move of availableMoves) {
      board[move] = humanPlayer
      const score = minimax(board, depth + 1, true, aiPlayer, humanPlayer)
      board[move] = null
      bestScore = Math.min(score, bestScore)
    }
    return bestScore
  }
}

export function getBestMove(board: Board, aiPlayer: Player): number {
  const humanPlayer: Player = aiPlayer === 'X' ? 'O' : 'X'
  let bestScore = -Infinity
  let bestMove = -1
  const availableMoves = getAvailableMoves(board)
  
  for (const move of availableMoves) {
    board[move] = aiPlayer
    const score = minimax(board, 0, false, aiPlayer, humanPlayer)
    board[move] = null
    
    if (score > bestScore) {
      bestScore = score
      bestMove = move
    }
  }
  
  return bestMove
}