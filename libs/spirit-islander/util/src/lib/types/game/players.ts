export const PLAYERS = [1, 2, 3, 4, 5, 6] as const;

export type Players = typeof PLAYERS[number];
