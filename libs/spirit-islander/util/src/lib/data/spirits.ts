import { ExpansionOption } from './expansions';

export type Spirit = ExpansionOption<SpiritName>;

export type SpiritName =
  | 'A Spread of Rampant Green'
  | 'Bringer of Dreams and Nightmares'
  | 'Devouring Teeth Lurk Underfoot'
  | 'Downpour Drenches the World'
  | 'Eyes Watch From the Trees'
  | 'Fathomless Mud of the Swamp'
  | 'Finder of Paths Unseen'
  | 'Fractured Days Split the Sky'
  | 'Grinning Trickster Stirs Up Trouble'
  | 'Heart of the Wildfire'
  | 'Keeper of the Forbidden Wilds'
  | "Lightning's Swift Strike"
  | 'Lure of the Deep Wilderness'
  | 'Many Minds Move as One'
  | "Ocean's Hungry Grasp"
  | 'Rising Heat of Stone and Sand'
  | 'River Surges in Sunlight'
  | 'Serpent Slumbering Beneath the Island'
  | 'Shadows Flicker Like Flame'
  | 'Sharp Fangs Behind the Leaves'
  | 'Shifting Memory of Ages'
  | 'Shroud of Silent Mist'
  | 'Sun-Bright Whirlwind'
  | 'Starlight Seeks Its Form'
  | "Stone's Unyielding Defiance"
  | 'Thunderspeaker'
  | 'Vengeance as a Burning Plague'
  | 'Vital Strength of the Earth'
  | 'Volcano Looming High';

export const SPIRITS: readonly Spirit[] = [
  { name: 'A Spread of Rampant Green' },
  { name: 'Bringer of Dreams and Nightmares' },
  { name: 'Devouring Teeth Lurk Underfoot', expansion: 'Horizons' },
  { name: 'Downpour Drenches the World', expansion: 'Promo Pack 2' },
  { name: 'Eyes Watch From the Trees', expansion: 'Horizons' },
  { name: 'Fathomless Mud of the Swamp', expansion: 'Horizons' },
  { name: 'Finder of Paths Unseen', expansion: 'Promo Pack 2' },
  { name: 'Fractured Days Split the Sky', expansion: 'Jagged Earth' },
  { name: 'Grinning Trickster Stirs Up Trouble', expansion: 'Jagged Earth' },
  { name: 'Heart of the Wildfire', expansion: 'Promo Pack 1' },
  { name: 'Keeper of the Forbidden Wilds', expansion: 'Branch & Claw' },
  { name: "Lightning's Swift Strike" },
  { name: 'Lure of the Deep Wilderness', expansion: 'Jagged Earth' },
  { name: 'Many Minds Move as One', expansion: 'Jagged Earth' },
  { name: "Ocean's Hungry Grasp" },
  { name: 'Rising Heat of Stone and Sand', expansion: 'Horizons' },
  { name: 'River Surges in Sunlight' },
  { name: 'Serpent Slumbering Beneath the Island', expansion: 'Promo Pack 1' },
  { name: 'Shadows Flicker Like Flame' },
  { name: 'Sharp Fangs Behind the Leaves', expansion: 'Branch & Claw' },
  { name: 'Shifting Memory of Ages', expansion: 'Jagged Earth' },
  { name: 'Shroud of Silent Mist', expansion: 'Jagged Earth' },
  { name: 'Sun-Bright Whirlwind', expansion: 'Horizons' },
  { name: 'Starlight Seeks Its Form', expansion: 'Jagged Earth' },
  { name: "Stone's Unyielding Defiance", expansion: 'Jagged Earth' },
  { name: 'Thunderspeaker' },
  { name: 'Vengeance as a Burning Plague', expansion: 'Jagged Earth' },
  { name: 'Vital Strength of the Earth' },
  { name: 'Volcano Looming High', expansion: 'Jagged Earth' },
];
