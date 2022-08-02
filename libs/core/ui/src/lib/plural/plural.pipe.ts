import { Pipe, PipeTransform } from '@angular/core';
import { pluralize } from '@atocha/core/util';

@Pipe({
  name: 'corePlural',
})
export class PluralPipe implements PipeTransform {
  transform(count: number, name: string, plural?: string): string {
    return pluralize(count, name, plural);
  }
}
