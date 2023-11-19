/**
 * A class containing a single method used for determining possible combinations of multiple sets of options
 * @param getPossibleCombos Recursively loops through arrays of options to produce all valid combinations
 * @returns An array of every possible valid combination (a combination is an array comprised of one value taken from each array of options)
 */
export class ComboAnalyzer<T> {
  getPossibleCombos<
    T1 extends T,
    T2 extends T,
    T3 extends T,
    T4 extends T,
    T5 extends T,
    T6 extends T,
    T7 extends T,
    T8 extends T,
    T9 extends T,
    T10 extends T
  >(
    allOptions: readonly [
      readonly T1[],
      readonly T2[],
      readonly T3[],
      readonly T4[],
      readonly T5[],
      readonly T6[],
      readonly T7[],
      readonly T8[],
      readonly T9[],
      T10[]
    ],
    isValidCombo?: (
      options: readonly [T1, T2, T3, T4, T5, T6, T7, T8, T9, T10]
    ) => boolean
  ): readonly [T1, T2, T3, T4, T5, T6, T7, T8, T9, T10][];
  getPossibleCombos<
    T1 extends T,
    T2 extends T,
    T3 extends T,
    T4 extends T,
    T5 extends T,
    T6 extends T,
    T7 extends T,
    T8 extends T,
    T9 extends T
  >(
    allOptions: readonly [
      readonly T1[],
      readonly T2[],
      readonly T3[],
      readonly T4[],
      readonly T5[],
      readonly T6[],
      readonly T7[],
      readonly T8[],
      readonly T9[]
    ],
    isValidCombo?: (
      options: readonly [T1, T2, T3, T4, T5, T6, T7, T8, T9]
    ) => boolean
  ): readonly [T1, T2, T3, T4, T5, T6, T7, T8, T9][];
  getPossibleCombos<
    T1 extends T,
    T2 extends T,
    T3 extends T,
    T4 extends T,
    T5 extends T,
    T6 extends T,
    T7 extends T,
    T8 extends T
  >(
    allOptions: readonly [
      readonly T1[],
      readonly T2[],
      readonly T3[],
      readonly T4[],
      readonly T5[],
      readonly T6[],
      readonly T7[],
      readonly T8[]
    ],
    isValidCombo?: (
      options: readonly [T1, T2, T3, T4, T5, T6, T7, T8]
    ) => boolean
  ): readonly [T1, T2, T3, T4, T5, T6, T7, T8][];
  getPossibleCombos<
    T1 extends T,
    T2 extends T,
    T3 extends T,
    T4 extends T,
    T5 extends T,
    T6 extends T,
    T7 extends T
  >(
    allOptions: readonly [
      readonly T1[],
      readonly T2[],
      readonly T3[],
      readonly T4[],
      readonly T5[],
      readonly T6[],
      readonly T7[]
    ],
    isValidCombo?: (options: readonly [T1, T2, T3, T4, T5, T6, T7]) => boolean
  ): readonly [T1, T2, T3, T4, T5, T6, T7][];
  getPossibleCombos<
    T1 extends T,
    T2 extends T,
    T3 extends T,
    T4 extends T,
    T5 extends T,
    T6 extends T
  >(
    allOptions: readonly [
      readonly T1[],
      readonly T2[],
      readonly T3[],
      readonly T4[],
      readonly T5[],
      readonly T6[]
    ],
    isValidCombo?: (options: readonly [T1, T2, T3, T4, T5, T6]) => boolean
  ): readonly [T1, T2, T3, T4, T5, T6][];
  getPossibleCombos<
    T1 extends T,
    T2 extends T,
    T3 extends T,
    T4 extends T,
    T5 extends T
  >(
    allOptions: readonly [
      readonly T1[],
      readonly T2[],
      readonly T3[],
      readonly T4[],
      readonly T5[]
    ],
    isValidCombo?: (options: readonly [T1, T2, T3, T4, T5]) => boolean
  ): readonly [T1, T2, T3, T4, T5][];
  getPossibleCombos<T1 extends T, T2 extends T, T3 extends T, T4 extends T>(
    allOptions: readonly [
      readonly T1[],
      readonly T2[],
      readonly T3[],
      readonly T4[]
    ],
    isValidCombo?: (options: readonly [T1, T2, T3, T4]) => boolean
  ): readonly [T1, T2, T3, T4][];
  getPossibleCombos<T1 extends T, T2 extends T, T3 extends T>(
    allOptions: readonly [readonly T1[], readonly T2[], readonly T3[]],
    isValidCombo?: (options: readonly [T1, T2, T3]) => boolean
  ): readonly [T1, T2, T3][];
  getPossibleCombos<T1 extends T, T2 extends T>(
    allOptions: readonly [readonly T1[], readonly T2[]],
    isValidCombo?: (options: readonly [T1, T2]) => boolean
  ): readonly [T1, T2][];
  getPossibleCombos<T1 extends T>(
    allOptions: readonly [readonly T1[]],
    isValidCombo?: (options: readonly [T1]) => boolean
  ): readonly (readonly [T1])[];
  getPossibleCombos(
    allOptions: readonly (readonly T[])[],
    isValidCombo?: (options: readonly T[]) => boolean
  ): readonly (readonly T[])[];
  getPossibleCombos(
    allOptions: readonly (readonly T[])[],
    isValidCombo?: unknown
  ): readonly (readonly T[])[] {
    return this._getPossibleCombos(
      allOptions,
      isValidCombo as (options: readonly T[]) => boolean
    );
  }

  private _getPossibleCombos(
    allOptionsLibrary: readonly (readonly T[])[],
    isValidCombo: (options: readonly T[]) => boolean = () => true,
    possibleCombos: T[][] = [],
    allOptionsIndex = 0,
    currentCombo: T[] = []
  ): readonly T[][] {
    if (allOptionsIndex === allOptionsLibrary.length) {
      if (isValidCombo(currentCombo)) {
        possibleCombos.push([...currentCombo]);
      }
    } else {
      const options = allOptionsLibrary[allOptionsIndex];

      options.forEach((option) => {
        currentCombo[allOptionsIndex] = option;
        this._getPossibleCombos(
          allOptionsLibrary,
          isValidCombo,
          possibleCombos,
          allOptionsIndex + 1,
          currentCombo
        );
      });
    }

    return possibleCombos;
  }
}
