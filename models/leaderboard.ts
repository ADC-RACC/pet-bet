export interface Leaderboard {
  wins: [{ name: string; wins: number }]
  losses: [{ name: string; losses: number }]
  winsAndLossesRatio: [{ name: string; wins: number; losses: number }]
}
