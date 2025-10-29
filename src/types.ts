// Base Cosmic object interface
export interface CosmicObject {
  id: string;
  slug: string;
  title: string;
  content?: string;
  metadata: Record<string, any>;
  type: string;
  created_at: string;
  modified_at: string;
}

// Game Settings interface
export interface GameSettings extends CosmicObject {
  type: 'game-settings';
  metadata: {
    game_title?: string;
    game_description?: string;
    win_message?: string;
    draw_message?: string;
    player_x_color?: string;
    player_o_color?: string;
    enable_sound?: boolean;
  };
}

// Leaderboard Entry interface
export interface LeaderboardEntry extends CosmicObject {
  type: 'leaderboard';
  metadata: {
    player_name: string;
    wins: number;
    games_played: number;
  };
}

// Game state types
export type Player = 'X' | 'O' | null;
export type Board = Player[];
export type GameStatus = 'playing' | 'won' | 'draw';

export interface GameState {
  board: Board;
  currentPlayer: Player;
  status: GameStatus;
  winner: Player;
  winningLine: number[];
}

// API response types
export interface CosmicResponse<T> {
  object?: T;
  objects?: T[];
  total?: number;
}

// Leaderboard stats with calculated win rate
export interface LeaderboardStats extends LeaderboardEntry {
  winRate: number;
}