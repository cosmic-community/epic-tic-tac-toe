# 🎮 Epic Tic-Tac-Toe

![App Preview](https://images.unsplash.com/photo-1611996575749-79a3a250f948?w=1200&h=300&fit=crop&auto=format)

A modern, interactive Tic-Tac-Toe game built with Vue.js and powered by Cosmic CMS. Features customizable settings, AI opponent, player statistics, and a competitive leaderboard system.

## ✨ Features

- 🎮 **Interactive Game Board** - Smooth animations and responsive 3x3 grid
- 🤖 **AI Opponent** - Play against a smart computer player
- ⚙️ **Customizable Settings** - Manage game title, colors, messages, and sounds through Cosmic CMS
- 📊 **Player Statistics** - Track wins, games played, and win percentages
- 🏆 **Dynamic Leaderboard** - Real-time player rankings with sortable stats
- 📱 **Responsive Design** - Optimized for all screen sizes
- 🎨 **Theme Customization** - Player colors managed through CMS
- 🔊 **Sound Effects** - Optional audio feedback (toggle via CMS)

## Clone this Project

## Clone this Project

Want to create your own version of this project with all the content and structure? Clone this Cosmic bucket and code repository to get started instantly:

[![Clone this Project](https://img.shields.io/badge/Clone%20this%20Project-29abe2?style=for-the-badge&logo=cosmic&logoColor=white)](https://app.cosmicjs.com/projects/new?clone_bucket=69016192271316ad9f4cb809&clone_repository=690162f5271316ad9f4cb849)

## Prompts

This application was built using the following prompts to generate the content structure and code:

### Content Model Prompt

> "create a tiktaktoe game that I can play online. Make the code as modular as possible."

### Code Generation Prompt

> "Develop a Vue.js application that uses my existing object types and objects"

The app has been tailored to work with your existing Cosmic content structure and includes all the features requested above.

## 🚀 Technologies Used

- **Vue.js 3** - Progressive JavaScript framework with Composition API
- **Vite** - Next-generation frontend build tool
- **TypeScript** - Type-safe JavaScript
- **Tailwind CSS** - Utility-first CSS framework
- **Cosmic SDK** - Headless CMS integration
- **Cosmic CMS** - Content management and leaderboard data

## 📋 Prerequisites

- Node.js 18+ or Bun runtime
- A Cosmic account and bucket
- Basic knowledge of Vue.js and TypeScript

## 🛠️ Installation

1. **Clone the repository**
```bash
git clone <your-repo-url>
cd epic-tic-tac-toe
```

2. **Install dependencies**
```bash
bun install
```

3. **Configure environment variables**

Create a `.env` file in the root directory:

```env
VITE_COSMIC_BUCKET_SLUG=your-bucket-slug
VITE_COSMIC_READ_KEY=your-read-key
VITE_COSMIC_WRITE_KEY=your-write-key
```

4. **Start the development server**
```bash
bun run dev
```

5. **Open your browser**
Navigate to `http://localhost:5173`

## 🎮 Cosmic SDK Examples

### Fetching Game Settings

```typescript
import { cosmic } from './lib/cosmic'

// Get game configuration
const { object: settings } = await cosmic.objects
  .findOne({
    type: 'game-settings',
    slug: 'tic-tac-toe-configuration'
  })
  .props(['id', 'title', 'metadata'])

console.log(settings.metadata.game_title) // "Epic Tic-Tac-Toe"
console.log(settings.metadata.player_x_color) // "#3b82f6"
```

### Fetching Leaderboard Data

```typescript
// Get all leaderboard entries
const { objects: leaderboard } = await cosmic.objects
  .find({ type: 'leaderboard' })
  .props(['id', 'title', 'metadata'])

// Sort by wins
const sortedByWins = leaderboard.sort((a, b) => 
  b.metadata.wins - a.metadata.wins
)
```

### Updating Player Statistics

```typescript
// Update a player's stats
await cosmic.objects.updateOne(playerId, {
  metadata: {
    wins: updatedWins,
    games_played: updatedGamesPlayed
  }
})
```

### Adding New Player to Leaderboard

```typescript
// Create a new leaderboard entry
await cosmic.objects.insertOne({
  type: 'leaderboard',
  title: 'New Player',
  metadata: {
    player_name: 'New Player',
    wins: 0,
    games_played: 0
  }
})
```

## 📊 Cosmic CMS Integration

The application uses two main content types from your Cosmic bucket:

### Game Settings (Singleton)
- **game_title** (text) - Main game title
- **game_description** (textarea) - Game instructions
- **win_message** (text) - Message shown when player wins
- **draw_message** (text) - Message shown on draw
- **player_x_color** (color) - Color for X player marks
- **player_o_color** (color) - Color for O player marks
- **enable_sound** (switch) - Toggle sound effects

### Leaderboard Entries
- **player_name** (text) - Player's display name
- **wins** (number) - Total games won
- **games_played** (number) - Total games played

The app automatically calculates win percentages and sorts players by performance.

## 🚀 Deployment Options

### Deploy to Vercel

```bash
# Install Vercel CLI
bun add -g vercel

# Deploy
vercel

# Set environment variables in Vercel dashboard
```

### Deploy to Netlify

```bash
# Install Netlify CLI
bun add -g netlify-cli

# Deploy
netlify deploy --prod

# Set environment variables in Netlify dashboard
```

### Environment Variables for Production

Set these in your hosting platform's dashboard:
- `VITE_COSMIC_BUCKET_SLUG` - Your Cosmic bucket slug
- `VITE_COSMIC_READ_KEY` - Your Cosmic read key
- `VITE_COSMIC_WRITE_KEY` - Your Cosmic write key (for leaderboard updates)

## 📝 Available Scripts

```bash
# Development server
bun run dev

# Type checking
bun run type-check

# Build for production
bun run build

# Preview production build
bun run preview
```

## 🎨 Customization

All game settings can be customized through your Cosmic CMS dashboard:

1. Navigate to your Cosmic bucket
2. Edit the "Game Settings" singleton object
3. Modify colors, messages, and preferences
4. Changes reflect immediately in the application

## 📄 License

MIT License - feel free to use this project for your own purposes.

<!-- README_END -->