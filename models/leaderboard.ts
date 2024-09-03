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

export type Ratio = LeaderboardWin & LeaderboardLoss

export interface Leaderboard {
  wins: LeaderboardWin[]
  losses: LeaderboardLoss[]
  winsAndLossesRatio: Ratio[]
}
