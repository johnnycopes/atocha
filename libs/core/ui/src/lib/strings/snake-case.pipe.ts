import { Pipe, PipeTransform } from '@angular/core';

import { snakeCase } from '@atocha/core/util';

@Pipe({
  standalone: true,
  name: 'coreSnakeCase',
})
export class SnakeCasePipe implements PipeTransform {
  transform(str: string): string {
    return snakeCase(str);
  }
}
