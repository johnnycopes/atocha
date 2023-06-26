export interface BatchUpdate {
  endpoint: string;
  id: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: { [key: string]: any };
}
