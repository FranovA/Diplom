import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'value'
})
export class ValuePipe implements PipeTransform {

  transform(value: any, ...args: unknown[]): any {
    let titles = [];
    for (const key in value)
    {
      titles.push({'key': key, 'value': value[key]['value']})
    }
    return titles;
  }

}
