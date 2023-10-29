export type Json =
  | null
  | boolean
  | string
  | number
  | Json[]
  | { [key: string]: Json };
