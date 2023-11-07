import { AFRICA, getId, getChildren } from '../../shared/mock-data';
import { IdsTree } from './ids';

export const MOCK_IDS = new IdsTree(AFRICA, getId, getChildren);
