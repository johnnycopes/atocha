import { TrackByFunction } from '@angular/core';
import { trackByFactory, trackBySelf } from './track-by';

interface ComplexVeggie {
  id: string;
  name: string;
}
type SimpleVeggie = string;

describe('trackBy', () => {
  describe('trackByFactory', () => {
    it('returns the item itself (a string value) as the key to track by', () => {
      const veggies: ComplexVeggie[] = [
        { id: '1', name: 'broccoli' },
        { id: '2', name: 'spinach' },
        { id: '3', name: 'cucumber' },
      ];
      const defaultTrackByFn: TrackByFunction<ComplexVeggie> = (
        index,
        { id }
      ) => id;
      const idTrackByFn = trackByFactory<ComplexVeggie>(({ id }) => id);

      const trackByFnVeggies = veggies.map((vegetable, index) =>
        defaultTrackByFn(index, vegetable)
      );
      const trackByIdVeggies = veggies.map((vegetable, index) =>
        idTrackByFn(index, vegetable)
      );

      expect(trackByFnVeggies).toEqual(trackByIdVeggies);
    });
  });

  describe('trackBySelf', () => {
    it('returns a specific property of an item (a string value) as the key to track by', () => {
      const veggies = ['broccoli', 'spinach', 'cucumber'];
      const defaultTrackByFn: TrackByFunction<SimpleVeggie> = (
        index: number,
        item: string
      ) => item;

      const trackByFnVeggies = veggies.map((vegetable, index) =>
        defaultTrackByFn(index, vegetable)
      );
      const trackBySelfVeggies = veggies.map((vegetable, index) =>
        trackBySelf(index, vegetable)
      );

      expect(trackByFnVeggies).toEqual(trackBySelfVeggies);
    });
  });
});
