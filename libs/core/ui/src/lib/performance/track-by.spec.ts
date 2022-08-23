import { TrackByFunction } from '@angular/core';
import { trackByFactory, trackBySelf } from './track-by';

interface ComplexVeggie {
  id: string;
  name: string;
}
type SimpleVeggie = string;

describe('trackBy', () => {
  describe('trackByFactory', () => {
    it('returns a specific property of an item (a string value) as the key to track by', () => {
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

      const trackByFnVeggies = veggies.map((veggie, index) =>
        defaultTrackByFn(index, veggie)
      );
      const trackByIdVeggies = veggies.map((veggie, index) =>
        idTrackByFn(index, veggie)
      );

      expect(trackByFnVeggies).toEqual(trackByIdVeggies);
    });
  });

  describe('trackBySelf', () => {
    it('returns the item itself (a string value) as the key to track by', () => {
      const veggies: SimpleVeggie[] = ['broccoli', 'spinach', 'cucumber'];

      const defaultTrackByFn: TrackByFunction<SimpleVeggie> = (index, item) =>
        item;

      const trackByFnVeggies = veggies.map((veggie, index) =>
        defaultTrackByFn(index, veggie)
      );
      const trackBySelfVeggies = veggies.map((veggie, index) =>
        trackBySelf(index, veggie)
      );

      expect(trackByFnVeggies).toEqual(trackBySelfVeggies);
    });
  });
});
