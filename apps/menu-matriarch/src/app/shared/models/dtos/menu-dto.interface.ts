import { Day } from "../day.type";

export interface MenuDto {
  id: string;
  uid: string;
  name: string;
  favorited: boolean;
  startDay: Day;
  contents: {
    [day in Day]: string[];
  };
}
