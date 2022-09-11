import { Development } from './development.interface';
import { Family } from './family.interface';
import { Leader } from './leader.interface';

export function getDevelopmentId({ id }: Development): string {
  return id.toString();
}

export function getFamilyId({ name }: Family): string {
  return name;
}

export function getLeaderId({ name }: Leader): string {
  return name;
}
