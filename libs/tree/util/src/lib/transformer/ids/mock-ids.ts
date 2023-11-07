import { AFRICA, getId, getChildren } from '../../shared/mock-data';
import { IdsTree } from './ids-tree';

export const MOCK_TREE = new IdsTree(AFRICA, getId, getChildren);
