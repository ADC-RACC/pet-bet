interface LeaderboardEntry {
  id: number
  name: string
}

export interface LeaderboardWin extends LeaderboardEntry {
  wins: number
}

export interface LeaderboardLoss extends LeaderboardEntry {
  losses: number
}

export interface LeaderboardRatio extends LeaderboardEntry {
  ratio: number
}

export interface Leaderboard {
  wins: LeaderboardWin[]
  losses: LeaderboardLoss[]
  winsAndLossesRatio: LeaderboardRatio[]
}
