import { PLAYERS } from '../data';
import { Players } from '../types';

export function getPlayers(): readonly Players[] {
  return PLAYERS;
}
