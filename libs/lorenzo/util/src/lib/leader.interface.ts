export interface Leader {
  name: string;
  requirement: string;
  ability: string;
  type: 'permanent' | 'once per round' | 'action' | 'immediate';
}
