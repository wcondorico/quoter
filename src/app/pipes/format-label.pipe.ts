import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'formatLabel',
  standalone: true
})
export class FormatLabelPipe implements PipeTransform {

  transform(value: string): string {
    return value
      .replace(/([a-z])([A-Z])/g, '$1 $2')  // Separar camelCase
      .replace(/_/g, ' ')                   // Reemplazar guiones bajos con espacios
      .replace(/\b\w/g, char => char.toUpperCase());
  }

}
