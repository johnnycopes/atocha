import { BOARDS } from '../data';
import { BalancedBoardName, Board } from '../types';
import { getOptionsFactory } from './get-options-factory';

export const getBoards = getOptionsFactory<BalancedBoardName, Board>(BOARDS);
