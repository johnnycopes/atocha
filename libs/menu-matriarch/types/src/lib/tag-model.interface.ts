import { Tag } from './entities/tag.interface';

export interface TagModel extends Tag {
  checked: boolean;
}
