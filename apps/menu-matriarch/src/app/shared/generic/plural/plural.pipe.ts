import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'appPlural'
})
export class PluralPipe implements PipeTransform {

  public transform(value: string, length: number, customPluralForm?: string): string {
    return length === 1 ? value : customPluralForm ? customPluralForm : value + 's';
  }

}
